from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from typing import Optional
import torch
import json
import os
import pickle
import pandas as pd
import numpy as np
from PIL import Image
from plant_disease_classifier import PlantDiseaseModel, predict_image
import warnings
import io
import matplotlib.pyplot as plt
import base64

warnings.filterwarnings("ignore")

app = FastAPI(
    title="Plant Disease Classifier API",
    description="API for classifying plant diseases from leaf images",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Load model and resources
def load_model_resources():
    try:
        # Load model configuration
        with open("models/model_config.json", "r") as f:
            config = json.load(f)

        # Load class names
        with open(config["class_names_path"], "r") as f:
            class_names = json.load(f)

        # Load label encoder
        with open(config["label_encoder_path"], "rb") as f:
            label_encoder = pickle.load(f)

        # Load image transformation
        with open(config["transform_path"], "rb") as f:
            transform = pickle.load(f)

        # Initialize model
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model = PlantDiseaseModel(num_classes=len(class_names))
        model.load_state_dict(torch.load(
            config["model_path"], map_location=device))
        model.to(device)
        model.eval()

        return model, transform, label_encoder, class_names, device, config
    except Exception as e:
        raise RuntimeError(f"Model loading failed: {str(e)}")

# Load resources at startup
try:
    model, transform, label_encoder, class_names, device, config = load_model_resources()
    MODEL_LOADED = True
except Exception as e:
    MODEL_LOADED = False
    print(f"Failed to load model: {e}")

# Helper functions
def format_class_name(name):
    return name.replace("_", " ").title().replace("  ", " ").replace("  ", " ")

def create_prediction_chart(top_classes, top_probabilities):
    # Create DataFrame for visualization
    prediction_df = pd.DataFrame({
        "Disease": top_classes,
        "Confidence": top_probabilities
    })

    # Create bar chart
    fig, ax = plt.subplots(figsize=(10, 5))
    colors = plt.cm.Greens(np.linspace(0.6, 0.95, len(prediction_df)))
    bars = ax.barh(prediction_df["Disease"], prediction_df["Confidence"], color=colors)
    
    # Customize chart
    ax.set_xlabel("Confidence (%)")
    ax.set_ylabel("Disease")
    ax.set_title("Top 5 Predictions")
    ax.grid(axis='x', linestyle='--', alpha=0.7)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    
    # Add percentage labels
    for bar in bars:
        ax.text(bar.get_width() + 1, bar.get_y() + bar.get_height()/2,
                f"{bar.get_width():.2f}%", va='center')
    
    # Save to bytes
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', dpi=100)
    plt.close()
    buf.seek(0)
    return base64.b64encode(buf.read()).decode('utf-8')

# API endpoints
@app.post("/api/predict", response_class=JSONResponse)
async def predict_disease(file: UploadFile = File(...)):
    if not MODEL_LOADED:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        # Read and process image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Save temporarily for prediction
        temp_path = "temp_upload.jpg"
        image.save(temp_path)
        
        # Make prediction
        class_name, confidence, all_probs = predict_image(
            model, temp_path, transform, device, label_encoder
        )
        
        # Get top 5 predictions
        class_indices = np.argsort(all_probs)[::-1][:5]
        top_classes = [format_class_name(label_encoder.inverse_transform([idx])[0]) 
                      for idx in class_indices]
        top_probabilities = [all_probs[idx] * 100 for idx in class_indices]
        
        # Generate chart
        chart_base64 = create_prediction_chart(top_classes, top_probabilities)
        
        # Get disease info
        disease_info = {
            "name": format_class_name(class_name),
            "confidence": float(confidence),
            "description": f"Information about {format_class_name(class_name)}"
        }
        
        # Clean up
        os.remove(temp_path)
        
        return {
            "status": "success",
            "prediction": disease_info,
            "top_predictions": [
                {"disease": cls, "confidence": float(conf)} 
                for cls, conf in zip(top_classes, top_probabilities)
            ],
            "chart": chart_base64,
            "class_names": [format_class_name(name) for name in class_names]
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction failed: {str(e)}")

# Example disease data (simplified)
disease_db = {
    "Pepper Bell Bacterial Spot": {
        "description": "Bacterial spot causes dark lesions on leaves and fruit.",
        "treatment": "Copper-based bactericides",
        "prevention": "Use disease-free seeds"
    },
    # Add more diseases as needed
}

@app.get("/api/disease/{disease_name}", response_class=JSONResponse)
async def get_disease_info(disease_name: str):
    formatted_name = disease_name.replace("-", " ")
    if formatted_name in disease_db:
        return disease_db[formatted_name]
    raise HTTPException(status_code=404, detail="Disease not found")

# Health check endpoint
@app.get("/api/health", response_class=JSONResponse)
async def health_check():
    return {
        "status": "healthy" if MODEL_LOADED else "unhealthy",
        "model_loaded": MODEL_LOADED,
        "service": "Plant Disease Classifier API",
        "version": "1.0.0"
    }

# Root endpoint
@app.get("/", response_class=JSONResponse)
async def root():
    return {
        "message": "Plant Disease Classifier API",
        "endpoints": {
            "predict": "/api/predict (POST)",
            "disease_info": "/api/disease/{disease_name} (GET)",
            "health_check": "/api/health (GET)",
            "documentation": "/api/docs"
        }
    }