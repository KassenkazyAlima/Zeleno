import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const JournalScreen = ({ route }) => {
  const navigation = useNavigation(); // Hook to access navigation

  // Hardcoded plantData for testing
  const plantData = [
    {
      plantName: 'Arugula',
      plantDescription: 'Peppery, fast-growing, great for beginners',
      sowingDate: '14/03/2025',
      harvestDate: '21/04/2025',
      daysUntilHarvest: 35,
      image: require('../assets/basil.png'),
    },
    {
      plantName: 'Hydrangea',
      plantDescription: 'Peppery, fast-growing, great for beginners',
      sowingDate: '01/03/2025',
      harvestDate: '24/04/2025',
      daysUntilHarvest: 11,
      image: require('../assets/hydrangea.png'),
    },
    {
      plantName: 'Tomato',
      plantDescription: 'Rich in flavor, easy to grow',
      sowingDate: '05/03/2025',
      harvestDate: '15/06/2025',
      daysUntilHarvest: 90,
      image: require('../assets/tomato.png'),
    },
    // Add more plants as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.title}>ZELENO</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <MaterialCommunityIcons name="bell" size={24} color="#DF6D14" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Display plant cards */}
        {plantData.map((plant, index) => (
          <TouchableOpacity
            key={index}
            style={styles.plantCard}
            onPress={() => navigation.navigate('PlantInfo', { plant })} // Navigate to PlantInfoScreen with plant data
          >
            <View style={styles.cardContent}>
              <View style={styles.plantInfo}>
                <Text style={styles.plantName}>{plant.plantName}</Text>
                <Text style={styles.plantDescription}>{plant.plantDescription}</Text>
              </View>
              <Image source={plant.image} style={styles.plantImage} />
            </View>
            <View style={styles.cardDetails}>
              <Text style={styles.detailLabel}>Sowing Date:</Text>
              <Text style={styles.detailValue}>{plant.sowingDate}</Text>
            </View>
            <View style={styles.cardDetails}>
              <Text style={styles.detailLabel}>Harvest Date:</Text>
              <Text style={styles.detailValue}>{`${plant.harvestDate} (${plant.daysUntilHarvest} days later)`}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.uploadButton}>
                <Text style={styles.uploadButtonText}>upload picture</Text>
              </TouchableOpacity>
              <View style={styles.spacer} /> {/* Spacer to push delete button to the right */}
              <TouchableOpacity style={styles.deleteButton}>
                <MaterialCommunityIcons name="delete" size={24} color="#DF6D14" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5E9',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DF6D14',
    marginTop: -8,
  },
  notificationIcon: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8F5E9',
    overflow: 'hidden',
    marginTop: -8,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80, // Space for FAB and bottom navigation
    paddingHorizontal: 16,
  },
  plantCard: {
    backgroundColor: 'rgba(223, 109, 20, 0.29)', // DF6D14 with 29% opacity
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  plantInfo: {
    flex: 1,
  },
  plantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DF6D14',
  },
  plantDescription: {
    fontSize: 16,
    color: '#DF6D14',
    marginTop: 8,
  },
  plantImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#DF6D14',
    marginRight: 8,
  },
  detailValue: {
    fontSize: 16,
    color: '#DF6D14',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  uploadButton: {
    backgroundColor: 'rgba(223, 109, 20, 0.71)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  spacer: {
    flex: 1,
  },
});

export default JournalScreen;