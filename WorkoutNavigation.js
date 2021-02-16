import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import WorkoutTabScreen from './screens/WorkoutTabScreen'
import WorkoutScreen from './screens/WorkoutScreen'

const Stack = createStackNavigator();

export default function WorkoutNavigation() {
  return (
    <Stack.Navigator initialRouteName="Workouts">
      <Stack.Screen
        name="Workouts"
        component={WorkoutTabScreen}
      />
      <Stack.Screen
        name="WorkoutScreen"
        component={WorkoutScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
