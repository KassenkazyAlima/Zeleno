import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; // Ensure correct import

const CreateNewBatchScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Create new batch</Text>
        <Text style={styles.subtitle}>Choose growing environment</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {/* Indoor Option */}
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Indoor')}>
          <Text style={styles.optionTitle}>Indoor</Text>
          <Text style={styles.optionDescription}>Grown on windowsills, shelves, or under grow lights.</Text>
        </TouchableOpacity>

        {/* Outdoor Option */}
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Outdoor')}>
          <Text style={styles.optionTitle}>Outdoor</Text>
          <Text style={styles.optionDescription}>Grown on balconies, terraces, or garden beds.</Text>
        </TouchableOpacity>
      </View>

      {/* Cancel Button */}
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <View style={styles.cancelIconContainer}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#DF6D14" />
          <Text style={styles.cancelText}>cancel</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5E9',
    padding: 16,
    paddingTop: '20%', // Add padding to move the header down
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DF6D14',
  },
  subtitle: {
    fontSize: 16,
    color: '#DF6D14',
    marginTop: 8,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center', // Align options to the center vertically
    alignItems: 'center', // Center horizontally
    flexDirection: 'column', // Stack options vertically
    marginTop: 32, // Add some space after the header
  },
  option: {
    backgroundColor: '#DF6D14', // Set the background color
    borderRadius: 8,
    padding: 24,
    marginBottom: 100, // Reduced from 32 to 16 to shrink the gap
    width: '80%', // Reduce width to center the boxes
    height: '25%', // Set a fixed height for the option boxes
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  optionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Text color for title
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: 16,
    color: '#FFFFFF', // Text color for description
    textAlign: 'center',
    marginTop: 8,
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
    flexDirection: 'row', // Align arrow and text horizontally
    alignItems: 'center',
  },
  cancelText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DF6D14',
  },
});

export default CreateNewBatchScreen;