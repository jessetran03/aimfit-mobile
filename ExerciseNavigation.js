import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import ExerciseTabScreen from './screens/ExerciseTabScreen'
import ExerciseScreen from './screens/ExerciseScreen'

const Stack = createStackNavigator();

export default function ExerciseNavigation() {
  return (
    <Stack.Navigator initialRouteName="Exercises">
      <Stack.Screen
        name="Exercises"
        component={ExerciseTabScreen}
      />
      <Stack.Screen
        name="ExerciseScreen"
        component={ExerciseScreen}
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
