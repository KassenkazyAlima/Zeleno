import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const PlantHealthCheckScreen = ({ route }) => {
  const { plant } = route.params; // Get the plant data passed from JournalScreen

  const [selectedImage, setSelectedImage] = useState(null);

  // Function to open the image picker
  const pickImage = async () => {
    // Request permissions (if needed)
    await ImagePicker.requestMediaLibraryPermissionsAsync();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
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
});

export default PlantHealthCheckScreen;