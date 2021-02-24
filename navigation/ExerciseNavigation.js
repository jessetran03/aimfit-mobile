import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExerciseTabScreen from '../screens/ExerciseTabScreen'
import ExerciseScreen from '../screens/ExerciseScreen'
import ExerciseLogScreen from '../screens/ExerciseLogScreen'

const Stack = createStackNavigator();

export default function ExerciseNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Exercises"
      screenOptions={{
        headerTintColor: '#39A9DB',
        headerTitleStyle: { color: 'black'},
      }}
    >
      <Stack.Screen
        name="Exercises"
        component={ExerciseTabScreen}
      />
      <Stack.Screen
        name="ExerciseScreen"
        component={ExerciseScreen}
      />
      <Stack.Screen
        name="ExerciseLogScreen"
        component={ExerciseLogScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
}