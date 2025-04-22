import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import CustomNavigationBar from '../components/CustomNavigationBar';

const PlantDetailScreen = ({ route, navigation }) => {
  const { plant } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF8EB' }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Back Button */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#DF6D14" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>{plant.name}</Text>

        {/* Image */}
        <Image source={require('../assets/bazil_2.png')} style={styles.image} />

        {/* Details */}
        <View style={styles.row}><MaterialCommunityIcons name="leaf" size={24} color="#DF6D14" /><Text style={styles.rowText}>Germination Time: 2–3 days</Text></View>
        <View style={styles.row}><MaterialCommunityIcons name="leaf" size={24} color="#DF6D14" /><Text style={styles.rowText}>Harvest Time: 7–10 days</Text></View>
        <View style={styles.row}><MaterialCommunityIcons name="leaf" size={24} color="#DF6D14" /><Text style={styles.rowText}>Growth Speed: Fast</Text></View>
        <View style={styles.row}><MaterialCommunityIcons name="leaf" size={24} color="#DF6D14" /><Text style={styles.rowText}>Difficulty: Easy</Text></View>
        <View style={styles.row}><MaterialCommunityIcons name="leaf" size={24} color="#DF6D14" /><Text style={styles.rowText}>Best For: Indoor, beginners</Text></View>

        {/* Description */}
        <Text style={styles.description}>
            Basil microgreens are highly aromatic and prized for their sweet, clove-like flavor that adds depth to salads, pasta, and garnishes. They’re a bit slower to grow compared to other microgreens but are well worth the wait due to their intense taste and attractive appearance. With small, tender leaves and a pleasant scent, basil microgreens are popular among home growers and chefs alike. They're also rich in vitamins A, C, and K, as well as essential antioxidants, making them both a flavorful and nutritious choice.
        </Text>

        {/* Environment Box */}
        <View style={styles.envBox}>
            <FontAwesome5 name="temperature-high" size={24} color="#DF6D14" />
            <Text style={styles.envTitle}>Temperature</Text>
            <Text style={styles.envValue}>20–25°C</Text>
        </View>
        <View style={styles.envBox}>
            <FontAwesome5 name="sun" size={24} color="#DF6D14" />
            <Text style={styles.envTitle}>Lighting</Text>
            <Text style={styles.envValue}>Strong light, 16 hrs/day</Text>
        </View>
        <View style={styles.envBox}>
            <FontAwesome5 name="burn" size={24} color="#DF6D14" />
            <Text style={styles.envTitle}>Humidity</Text>
            <Text style={styles.envValue}>Between 70% and 40%</Text>
        </View>


        {/* Tips */}
        <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>Tips</Text>
            <View style={styles.tipRow}>
            <MaterialCommunityIcons name="alert-circle-outline" size={18} color="#DF6D14" />
            <Text style={styles.tipText}>Don’t overseed — crowded trays = mold risk</Text>
        </View>

        <View style={styles.tipRow}>
            <MaterialCommunityIcons name="alert-circle-outline" size={18} color="#DF6D14" />
            <Text style={styles.tipText}>Water from below, avoid leaf wetting</Text>
        </View>

        <View style={styles.tipRow}>
            <MaterialCommunityIcons name="alert-circle-outline" size={18} color="#DF6D14" />
            <Text style={styles.tipText}>Let substrate dry slightly between waterings</Text>
        </View>

        <View style={styles.tipRow}>
            <MaterialCommunityIcons name="alert-circle-outline" size={18} color="#DF6D14" />
            <Text style={styles.tipText}>Too much humidity + warmth = mold risk</Text>
        </View>
        </View>

      </ScrollView>

      <CustomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 180,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    marginBottom: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:6,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#DF6D14',
    fontWeight: '500',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#DF6D14',
    marginBottom: 10,
    paddingLeft: 10,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rowText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#6E6042',
  },
  description: {
    fontSize: 15,
    color: '#6E6042',
    marginVertical: 20,
    lineHeight: 22,
    paddingBottom:10,
  },
  envBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6D1A9',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  
  envTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#DF6D14',
    marginLeft: 12,
  },
  
  envValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#DF6D14',
  },
  
  tipBox: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#FFF3E0',
    paddingBottom:30,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DF6D14',
    marginBottom: 12,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#6E6042',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  
});

export default PlantDetailScreen;
