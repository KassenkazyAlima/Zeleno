import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import JournalScreen from './screens/JournalScreen';
import ExploreScreen from './screens/ExploreScreen';
import CreateNewBatchScreen from './screens/CreateNewBatchScreen';
import IndoorScreen from './screens/IndoorScreen';
import ManualCreateScreen from './screens/ManualCreateScreen';
import PlantDetailScreen from './screens/PlantDetailScreen';
import BatchConfirmationScreen from './screens/BatchConfirmationScreen';
import PlantInfoScreen from './screens/PlantInfoScreen'; // Import PlantInfoScreen

// Components
import CustomNavigationBar from './components/CustomNavigationBar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Empty Screen for Placeholder
const EmptyScreen = () => null;

// Explore Stack Navigator
const ExploreStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ExploreHome" component={ExploreScreen} />
    <Stack.Screen name="PlantDetail" component={PlantDetailScreen} />
  </Stack.Navigator>
);

// Create Stack Navigator
const CreateStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CreateNewBatch" component={CreateNewBatchScreen} />
    <Stack.Screen name="Indoor" component={IndoorScreen} />
    <Stack.Screen name="ManualCreate" component={ManualCreateScreen} />
    <Stack.Screen name="BatchConfirmation" component={BatchConfirmationScreen} />
  </Stack.Navigator>
);

// Main Tabs Navigator
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}
    tabBar={(props) => <CustomNavigationBar {...props} />}
  >
    {/* Journal Screen */}
    <Tab.Screen name="Journal" component={JournalScreen} />

    {/* Create Stack */}
    <Tab.Screen name="Create" component={CreateStack} />

    {/* Explore Stack */}
    <Tab.Screen name="Explore" component={ExploreStack} />
  </Tab.Navigator>
);

// App Stack Navigator
const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* Main Tabs */}
    <Stack.Screen name="MainTabs" component={MainTabs} />

    {/* Direct Access to Journal Screen */}
    <Stack.Screen name="Journal" component={JournalScreen} />

    {/* PlantInfoScreen */}
    <Stack.Screen name="PlantInfo" component={PlantInfoScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}