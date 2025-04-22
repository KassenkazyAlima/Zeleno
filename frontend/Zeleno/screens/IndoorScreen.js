import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; // Ensure correct import

const IndoorScreen = ({ navigation }) => {
  const scrollViewRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    setScrollPosition(contentOffset.y);
  };

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height);
  };

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    setContentHeight(contentHeight);
  };

  // Calculate the maximum scroll position
  const maxScrollPosition = Math.max(0, contentHeight - containerHeight);

  // Calculate the scroll thumb position
  const thumbPosition = Math.min(
    Math.max(0, (scrollPosition / maxScrollPosition) * containerHeight),
    containerHeight - containerHeight * 0.2 // Limit the thumb to stay within bounds
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Create new batch</Text>
        <Text style={styles.subtitle}>Identify the type or search for common name, scientific name, or variety</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <MaterialCommunityIcons name="magnify" size={28} color="#DF6D14" /> {/* Increased icon size */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#DF6D14"
        />
      </View>

      {/* Manual Addition Prompt */}
      <View style={styles.manualPromptContainer}>
        <Text style={styles.manualPromptText}>Didn't find your plant? Add manually!</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('ManualCreate')} // Navigate to ManualCreateScreen
        >
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Plant Options */}
      <View style={styles.scrollWrapper} onLayout={handleLayout}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onContentSizeChange={handleContentSizeChange}
        >
          {/* Arugula */}
          <TouchableOpacity style={[styles.option, styles.shadow]} onPress={() => console.log('Arugula selected')}>
            <View style={styles.plantImageContainer}>
              <MaterialCommunityIcons name="leaf" size={50} color="#4CAF50" />
            </View>
            <View style={styles.plantInfo}>
              <Text style={styles.plantName}>Arugula</Text>
              <Text style={styles.plantDescription}>Peppery, fast-growing, great for beginners</Text>
            </View>
          </TouchableOpacity>

          {/* Cress */}
          <TouchableOpacity style={[styles.option, styles.shadow]} onPress={() => console.log('Cress selected')}>
            <View style={styles.plantImageContainer}>
              <MaterialCommunityIcons name="leaf" size={50} color="#4CAF50" />
            </View>
            <View style={styles.plantInfo}>
              <Text style={styles.plantName}>Cress</Text>
              <Text style={styles.plantDescription}>Fresh, tangy, very fast germination</Text>
            </View>
          </TouchableOpacity>

          {/* Basil */}
          <TouchableOpacity style={[styles.option, styles.shadow]} onPress={() => console.log('Basil selected')}>
            <View style={styles.plantImageContainer}>
              <MaterialCommunityIcons name="leaf" size={50} color="#4CAF50" />
            </View>
            <View style={styles.plantInfo}>
              <Text style={styles.plantName}>Basil</Text>
              <Text style={styles.plantDescription}>Aromatic, slow germination, loves warmth</Text>
            </View>
          </TouchableOpacity>

          {/* Additional Plant Options */}
          <TouchableOpacity style={[styles.option, styles.shadow]} onPress={() => console.log('Tomato selected')}>
            <View style={styles.plantImageContainer}>
              <MaterialCommunityIcons name="leaf" size={50} color="#4CAF50" />
            </View>
            <View style={styles.plantInfo}>
              <Text style={styles.plantName}>Tomato</Text>
              <Text style={styles.plantDescription}>Rich in vitamins, easy to grow</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.option, styles.shadow]} onPress={() => console.log('Carrot selected')}>
            <View style={styles.plantImageContainer}>
              <MaterialCommunityIcons name="leaf" size={50} color="#4CAF50" />
            </View>
            <View style={styles.plantInfo}>
              <Text style={styles.plantName}>Carrot</Text>
              <Text style={styles.plantDescription}>Nutritious, grows well in cool weather</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.option, styles.shadow]} onPress={() => console.log('Lettuce selected')}>
            <View style={styles.plantImageContainer}>
              <MaterialCommunityIcons name="leaf" size={50} color="#4CAF50" />
            </View>
            <View style={styles.plantInfo}>
              <Text style={styles.plantName}>Lettuce</Text>
              <Text style={styles.plantDescription}>Fast-growing, ideal for salads</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* Scroll Indicator */}
        <View style={styles.scrollIndicator}>
          <View
            style={[
              styles.scrollThumb,
              {
                transform: [
                  {
                    translateY: thumbPosition, // Dynamic position with limits
                  },
                ],
              },
            ]}
          ></View>
        </View>
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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDEBD0',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginVertical: 24, // Increased vertical margin for more spacing
    height: 56, // Increased height for a larger search bar
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 18, // Increased font size
    color: '#DF6D14',
    paddingVertical: 12, // Added vertical padding for better alignment
  },
  manualPromptContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  manualPromptText: {
    fontSize: 16,
    color: '#DF6D14',
  },
  createButton: {
    backgroundColor: '#FDEBD0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DF6D14',
  },
  scrollWrapper: {
    flex: 1,
    position: 'relative',
    marginBottom: 100, // Ensure space for the cancel button
  },
  scrollContent: {
    flexGrow: 1,
  },
  option: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android
  },
  plantImageContainer: {
    marginRight: 16,
  },
  plantInfo: {
    flex: 1,
  },
  plantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DF6D14',
  },
  plantDescription: {
    fontSize: 16,
    color: '#DF6D14',
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
  scrollIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 4, // Width of the scroll indicator
    height: '100%',
    backgroundColor: '#F8F5E9',
    zIndex: 1,
  },
  scrollThumb: {
    backgroundColor: '#DF6D14',
    borderRadius: 2,
    width: 4,
    height: '20%', // Initial height of the scroll thumb
    alignSelf: 'flex-start',
  },
});

export default IndoorScreen;