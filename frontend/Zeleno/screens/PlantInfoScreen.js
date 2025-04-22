import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const PlantInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { plant } = route.params;

  // State for observation entry fields
  const [observationDate, setObservationDate] = useState('');
  const [visualChanges, setVisualChanges] = useState('');
  const [height, setHeight] = useState('');
  const [lightingNotes, setLightingNotes] = useState('');
  const [humidity, setHumidity] = useState('');

  // Hardcoded previous entries for demonstration
  const previousEntries = [
    {
      date: 'March 27',
      details:
        'Sprouts doubled in size. Watered in morning.\nLight: windowsill, 12 hrs\nHumidity: 58%',
      image: require('../assets/basil.png'),
    },
    {
      date: 'April 5',
      details:
        'Leaves started unfolding. Fertilized.\nLight: balcony, 8 hrs\nHumidity: 60%',
      image: require('../assets/hydrangea.png'),
    },
  ];

  // State for selected date in Compare Growth section
  const [selectedDate, setSelectedDate] = useState(new Date());

  // State for health check upload
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  // Function to save the observation entry
  const handleSaveEntry = () => {
    console.log('Saving observation entry:', {
      date: observationDate,
      visualChanges,
      height,
      lightingNotes,
      humidity,
    });
    // Implement saving logic here (e.g., store in state or API)
  };

  // Function to open the image picker and send the image to the backend API
  const pickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera roll permissions to make this work!'
      );
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);

      // Send the image to the backend API
      const formData = new FormData();
      formData.append('file', {
        uri: result.uri,
        name: 'plant_image.jpg',
        type: 'image/jpeg',
      });

      try {
        const apiResponse = await axios.post(
          'http://localhost:4567/api/predict', // Replace with your machine's IP if testing on a physical device
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        // Handle the API response
        const { prediction } = apiResponse.data;
        setPredictionResult(prediction);
      } catch (error) {
        console.error('Error uploading image:', error);

        // Enhanced error handling
        if (error.response) {
          Alert.alert(
            'Upload Failed',
            `Server Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`
          );
        } else if (error.request) {
          Alert.alert(
            'Upload Failed',
            'No response from the server. Check your internet connection.'
          );
        } else {
          Alert.alert(
            'Upload Failed',
            'An unexpected error occurred. Please try again later.'
          );
        }
      }
    }
  };

  // State to track active tab
  const [activeTab, setActiveTab] = useState('info'); // Default to 'info'

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Cancel Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#DF6D14" />
          <Text style={styles.cancelText}>cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Plant Image */}
      <Image source={plant.image} style={styles.plantImage} />

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navButton, activeTab === 'info' && styles.activeNavButton]}
          onPress={() => setActiveTab('info')}
        >
          <MaterialCommunityIcons
            name="information"
            size={24}
            color={activeTab === 'info' ? '#FFFFFF' : '#DF6D14'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, activeTab === 'chart' && styles.activeNavButton]}
          onPress={() => setActiveTab('chart')}
        >
          <MaterialCommunityIcons
            name="chart-line"
            size={24}
            color={activeTab === 'chart' ? '#FFFFFF' : '#DF6D14'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, activeTab === 'file' && styles.activeNavButton]}
          onPress={() => setActiveTab('file')}
        >
          <MaterialCommunityIcons
            name="file-document"
            size={24}
            color={activeTab === 'file' ? '#FFFFFF' : '#DF6D14'}
          />
        </TouchableOpacity>
      </View>

      {/* Render Content Based on Active Tab */}
      {activeTab === 'info' && (
        <>
          {/* Plant Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.plantName}>{plant.plantName}</Text>
            <Text style={styles.plantDetails}>Sown on: {plant.sowingDate}</Text>
            <Text style={styles.plantDetails}>
              Expected Harvest: {plant.harvestDate} ({plant.daysUntilHarvest} days later)
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(100 - plant.daysUntilHarvest / 365 * 100)}%` },
                ]}
              ></View>
            </View>
            <Text style={styles.progressText}>76% to harvest</Text>
          </View>

          {/* Observation Entry Form */}
          <View style={styles.observationForm}>
            <Text style={styles.sectionTitle}>Add Observation Entry</Text>
            <TextInput
              style={styles.inputField}
              placeholder="14/03/2025"
              value={observationDate}
              onChangeText={setObservationDate}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Visual changes (e.g., leaves unfolded)"
              value={visualChanges}
              onChangeText={setVisualChanges}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Height (cm)"
              value={height}
              onChangeText={setHeight}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Lighting notes"
              value={lightingNotes}
              onChangeText={setLightingNotes}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Humidity (%)"
              value={humidity}
              onChangeText={setHumidity}
            />
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>upload picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveEntry}>
              <Text style={styles.saveButtonText}>Save Entry</Text>
            </TouchableOpacity>
          </View>

          {/* Previous Entries */}
          <View style={styles.previousEntriesSection}>
            <Text style={styles.sectionTitle}>Previous Entries</Text>
            {previousEntries.map((entry, index) => (
              <View key={index} style={styles.previousEntryCard}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryDate}>{entry.date}</Text>
                  <Image source={entry.image} style={styles.entryImage} />
                </View>
                <Text style={styles.entryDetails}>{entry.details}</Text>
              </View>
            ))}
          </View>

          {/* Compare Growth */}
          <View style={styles.compareGrowthSection}>
            <Text style={styles.sectionTitle}>Compare Growth</Text>
            <View style={styles.compareGrowthContent}>
              <Text style={styles.subsectionTitle}>Newest</Text>
              <Image
                source={require('../assets/newest_growth.png')}
                style={styles.growthImage}
              />
            </View>
            <View style={styles.compareGrowthContent}>
              <Text style={styles.subsectionTitle}>Selected date</Text>
              <Text style={styles.selectedDateText}>
                {selectedDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                onChange={(event, date) => {
                  if (date) {
                    setSelectedDate(date);
                  }
                }}
                style={styles.datePicker}
              />
              <Image
                source={require('../assets/selected_growth.png')}
                style={styles.growthImage}
              />
            </View>
          </View>
        </>
      )}

      {activeTab === 'chart' && (
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Chart Data</Text>
          <Text style={styles.chartText}>This is where chart data will be displayed.</Text>
        </View>
      )}

      {activeTab === 'file' && (
        <View style={styles.healthCheckContainer}>
          <Text style={styles.title}>Plant Health Check</Text>
          <Text style={styles.subtitle}>Please upload a picture of the plant.</Text>
          {/* Image Upload Area */}
          <TouchableOpacity onPress={pickImage} style={styles.uploadArea}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            ) : (
              <>
                <MaterialCommunityIcons name="cloud-upload" size={64} color="#8B572A" />
                <Text style={styles.uploadText}>Drip and Drop</Text>
              </>
            )}
          </TouchableOpacity>
          {/* Display Prediction Result */}
          {predictionResult && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Prediction Result:</Text>
              <Text style={styles.resultText}>
                Disease: {predictionResult.name}
              </Text>
              <Text style={styles.resultText}>
                Confidence: {predictionResult.confidence.toFixed(2)}%
              </Text>
              <Text style={styles.resultText}>
                Description: {predictionResult.description}
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5E9',
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 60,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DF6D14',
    marginLeft: 8,
  },
  plantImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F2D6B3',
    borderRadius: 24,
    paddingVertical: 8,
    marginVertical: 8,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  activeNavButton: {
    backgroundColor: '#DF6D14',
  },
  detailsContainer: {
    backgroundColor: '#F2D6B3',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  plantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DF6D14',
    marginTop: 16,
  },
  plantDetails: {
    fontSize: 16,
    color: '#DF6D14',
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ECE1D8',
    marginTop: 16,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#DF6D14',
  },
  progressText: {
    fontSize: 14,
    color: '#DF6D14',
    textAlign: 'right',
    marginTop: 8,
  },
  observationForm: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DF6D14',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#DF6D14',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    backgroundColor: '#FFF',
  },
  uploadButton: {
    backgroundColor: '#DF6D14',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#DF6D14',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  previousEntriesSection: {
    marginTop: 24,
  },
  previousEntryCard: {
    backgroundColor: '#F2D6B3',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DF6D14',
  },
  entryDetails: {
    fontSize: 16,
    color: '#DF6D14',
    marginTop: 8,
  },
  entryImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  compareGrowthSection: {
    marginTop: 24,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DF6D14',
    marginBottom: 8,
  },
  compareGrowthContent: {
    marginBottom: 24,
  },
  growthImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 8,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#DF6D14',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#FFF',
    marginBottom: 8,
  },
  selectedDateText: {
    fontSize: 16,
    color: '#DF6D14',
    marginTop: 8,
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  chartText: {
    fontSize: 16,
    color: '#DF6D14',
    marginTop: 8,
  },
  healthCheckContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DF6D14',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#DF6D14',
    marginBottom: 24,
  },
  uploadArea: {
    width: '100%',
    height: 200,
    borderWidth: 2,
    borderColor: '#8B572A',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  uploadText: {
    fontSize: 16,
    color: '#8B572A',
    marginTop: 8,
  },
  resultContainer: {
    backgroundColor: '#F2D6B3',
    borderRadius: 8,
    padding: 16,
    width: '100%',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DF6D14',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    color: '#DF6D14',
    marginBottom: 4,
  },
});

export default PlantInfoScreen;