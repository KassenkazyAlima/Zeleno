import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';





const ExploreScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const navigation = useNavigation();

  const filters = ['All', 'Beginner-friendly', 'Fast-growing', 'Indoor'];

  const plants = [
    {
      name: 'Basil',
      description: 'Spicy, grows in 5–7 days',
      image: require('../assets/basil.png'),
    },
    {
      name: 'Hydrangea',
      description: 'A mature bloom will easily last 7–14 days in the vase.',
      image: require('../assets/hydrangea.png'),
    },
    {
      name: 'Hydrangea',
      description: 'A mature bloom will easily last 7–14 days in the vase.',
      image: require('../assets/hydrangea.png'),
    },
    {
      name: 'Basil',
      description: 'Spicy, grows in 5–7 days',
      image: require('../assets/basil.png'),
    },
    {
      name: 'Hydrangea',
      description: 'A mature bloom will easily last 7–14 days in the vase.',
      image: require('../assets/hydrangea.png'),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
       {/* Top Bar */}
       <View style={styles.topBar}>
        <Text style={styles.title}>ZELENO</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <MaterialCommunityIcons name="bell" size={24} color="#DF6D14" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.subheader}>Explore Microgreens</Text>

      <TextInput
        placeholder="Search by name..."
        placeholderTextColor="#a5846b"
        style={styles.searchBar}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.activeFilter,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter && styles.activeFilterText,
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.cardList}>
        {plants.map((plant, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('PlantDetail', { plant })}
          >
            <Image source={plant.image} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.plantName}>{plant.name}</Text>
              <Text style={styles.description}>{plant.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
//F8F5E9, FFF8EB
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F5E9',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0D7D1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DF6D14',
  },
  notificationIcon: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8F5E9',
    overflow: 'hidden',
  },
  subheader: {
    fontSize: 20,
    fontWeight: '600',
    paddingLeft: 12,
    color: '#A5846B',
    marginTop: 12,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#F2D6B3',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  filterContainer: {
    marginBottom: 24,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: '#ECE1D8',
    borderRadius: 20,
  },
  filterText: {
    color: '#A5846B',
    fontWeight: '500',
  },
  activeFilter: {
    backgroundColor: '#DF6D14',
  },
  activeFilterText: {
    color: '#fff',
  },
  cardList: {
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 24,
    flexDirection: 'row',
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 20,
  },
  cardContent: {
    flex: 1,
  },
  plantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DF6D14',
  },
  description: {
    fontSize: 15,
    color: '#A5846B',
    marginTop: 6,
  },
  scrollContent: {
    paddingBottom: 140, // enough space for bottom nav + FAB
  },  
});

export default ExploreScreen;
