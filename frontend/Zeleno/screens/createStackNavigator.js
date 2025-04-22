import { createStackNavigator } from '@react-navigation/stack';
import ManualCreateScreen from './ManualCreateScreen';
import BatchConfirmationScreen from './BatchConfirmationScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ManualCreate" component={ManualCreateScreen} />
      <Stack.Screen name="BatchConfirmation" component={BatchConfirmationScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;