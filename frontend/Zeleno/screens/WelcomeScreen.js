// screens/WelcomeScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  // Animation to fade in the text
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Final value for opacity: 1
      duration: 1000, // Duration of the animation
      useNativeDriver: true,
    }).start(() => {
      // After the animation completes, navigate to the Journal screen
      setTimeout(() => {
        navigation.navigate('Journal');
      }, 1000); // Wait an additional second before navigating
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Animated ZELENO Text */}
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>ZELENO</Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5E9',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#DF6D14',
    textAlign: 'center',
  },
});

export default WelcomeScreen;