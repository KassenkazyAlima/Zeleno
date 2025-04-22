import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomNavigationBar = ({ navigation, state }) => {
  const isFocused = (routeName) => state?.routes[state.index]?.name === routeName;

  return (
    <View style={styles.container}>
      {/* Journal Tab */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Journal')}
      >
        <MaterialCommunityIcons
          name="book-open-variant"
          size={32}
          color={isFocused('Journal') ? '#DF6D14' : '#A5846B'}
        />
        <Text style={[styles.label, isFocused('Journal') && styles.activeText]}>
          Journal
        </Text>
      </TouchableOpacity>

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Create', { screen: 'CreateNewBatch' })}
      >
        <MaterialCommunityIcons name="plus" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Explore Tab */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Explore')}
      >
        <MaterialCommunityIcons
          name="earth"
          size={32}
          color={isFocused('Explore') ? '#DF6D14' : '#A5846B'}
        />
        <Text style={[styles.label, isFocused('Explore') && styles.activeText]}>
          Explore
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    zIndex: 10,
  },
  iconContainer: {
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#A5846B',
  },
  activeText: {
    color: '#DF6D14',
  },
  fab: {
    width: 95,
    height: 95,
    borderRadius: 50,
    backgroundColor: '#DF6D14',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -30,
    left: '55%',
    transform: [{ translateX: -47.5 }],
    zIndex: 20,
    elevation: 4,
  },
});

export default CustomNavigationBar;