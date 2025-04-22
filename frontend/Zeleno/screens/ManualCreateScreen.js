import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';

const ManualCreateScreen = ({ navigation }) => {
  const [plantName, setPlantName] = useState('Arugula');
  const [plantDescription, setPlantDescription] = useState('Peppery, fast-growing, great for beginners');
  const [sowingDate, setSowingDate] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [dateType, setDateType] = useState(null); // To track which date is being edited
  const [substrateType, setSubstrateType] = useState('coconut'); // Default value: Coconut
  const [userDescription, setUserDescription] = useState(''); // New state for user-entered description
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image

  // Substrate type options
  const [openSubstrateDropdown, setOpenSubstrateDropdown] = useState(false);
  const substrateOptions = [
    { label: 'Coconut', value: 'coconut' },
    { label: 'Soil Mix', value: 'soil-mix' },
    { label: 'Potting Soil', value: 'potting-soil' },
  ];

  const showDatePicker = (type) => {
    setDateType(type);
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleDatePicked = (date) => {
    if (dateType === 'sowing') {
      setSowingDate(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    } else if (dateType === 'harvest') {
      setHarvestDate(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    }
    hideDatePicker();
  };

  // Handle image selection
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access media library was denied');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  // Handle "Create" button press
  const handleCreateBatch = () => {
    // Navigate to the confirmation screen with the provided data
    navigation.navigate('BatchConfirmation', {
      plantName,
      plantDescription,
      sowingDate,
      harvestDate,
      substrateType,
      selectedImage,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.plantInfoContainer}>
          {/* Editable Plant Name */}
          <View style={styles.editableField}>
            <TextInput
              style={[styles.editableInput, styles.plantName]}
              value={plantName}
              onChangeText={setPlantName}
              placeholder="Enter plant name"
            />
            <MaterialCommunityIcons name="pencil" size={24} color="#DF6D14" />
          </View>

          {/* Editable Plant Description */}
          <View style={styles.editableField}>
            <TextInput
              style={[styles.editableInput, styles.plantDescription]}
              value={plantDescription}
              onChangeText={setPlantDescription}
              placeholder="Enter plant description"
            />
            <MaterialCommunityIcons name="pencil" size={24} color="#DF6D14" />
          </View>
        </View>

        {/* Selected Image Preview */}
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        ) : (
          <Image
            source={{ uri: 'https://source.unsplash.com/random/100x100/?arugula' }}
            style={styles.plantImage}
          />
        )}
      </View>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        {/* Sowing Date */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Sowing Date:</Text>
          <TouchableOpacity onPress={() => showDatePicker('sowing')}>
            <View style={styles.datePickerContainer}>
              <Text style={styles.dateInput}>{sowingDate || 'DD/MM/YYYY'}</Text>
              <MaterialCommunityIcons name="calendar" size={24} color="#DF6D14" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Substrate Type */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Substrate Type:</Text>
          <DropDownPicker
            items={substrateOptions}
            open={openSubstrateDropdown}
            value={substrateType}
            setOpen={setOpenSubstrateDropdown}
            setValue={setSubstrateType}
            containerStyle={styles.dropdownContainer}
            style={styles.dropdownInput}
            itemStyle={styles.dropdownItem}
            dropDownStyle={styles.dropdownMenu}
            placeholder="Select substrate type"
            arrowColor="#DF6D14"
            listMode="SCROLLVIEW"
            zIndex={1000}
          />
        </View>

        {/* Harvest Date */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Harvest Date:</Text>
          <TouchableOpacity onPress={() => showDatePicker('harvest')}>
            <View style={styles.datePickerContainer}>
              <Text style={styles.dateInput}>{harvestDate || 'DD/MM/YYYY'}</Text>
              <MaterialCommunityIcons name="calendar" size={24} color="#DF6D14" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Description and Upload Picture */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description:</Text>
          <View style={styles.descriptionAndUploadContainer}>
            <TextInput
              style={[styles.descriptionInput, styles.editableInput]}
              value={userDescription}
              onChangeText={setUserDescription}
              placeholder="Please add a brief comment (substrate, special conditions)"
              multiline={true}
              numberOfLines={4}
            />
            <View style={styles.uploadSection}>
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Text style={styles.uploadButtonText}>upload picture</Text>
              </TouchableOpacity>
              {selectedImage ? (
                <Text style={styles.uploadStatus}>Image selected</Text>
              ) : (
                <Text style={styles.uploadStatus}>No file selected</Text>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Create Batch Button */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateBatch}>
        <Text style={styles.createButtonText}>Create</Text>
      </TouchableOpacity>

      {/* Cancel Button */}
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <View style={styles.cancelIconContainer}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#DF6D14" />
          <Text style={styles.cancelText}>cancel</Text>
        </View>
      </TouchableOpacity>

      {/* Calendar Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDatePicked}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5E9',
    padding: 16,
    paddingTop: '20%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  plantInfoContainer: {
    flex: 1,
  },
  editableField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  editableInput: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
    color: '#DF6D14',
    borderBottomWidth: 1,
    borderColor: '#DF6D14',
  },
  plantName: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  plantDescription: {
    fontSize: 16,
  },
  plantImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 8,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
    flexDirection: 'column',
  },
  label: {
    fontSize: 16,
    color: '#DF6D14',
    marginBottom: 8,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dateInput: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
    color: '#DF6D14',
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dropdownInput: {
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#DF6D14',
  },
  dropdownItem: {
    fontSize: 16,
    color: '#DF6D14',
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DF6D14',
    borderWidth: 1,
  },
  descriptionInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#DF6D14',
    borderWidth: 1,
    borderColor: '#DF6D14',
    minHeight: 100,
    flex: 1,
  },
  descriptionAndUploadContainer: {
    position: 'relative',
  },
  uploadSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  uploadButton: {
    backgroundColor: '#FDEBD0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    maxWidth: 200,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DF6D14',
  },
  uploadStatus: {
    fontSize: 14,
    color: '#DF6D14',
    marginLeft: 8,
  },
  createButton: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    backgroundColor: '#DF6D14',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cancelButton: {
    position: 'absolute',
    bottom: 50,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelIconContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DF6D14',
  },
});

export default ManualCreateScreen;