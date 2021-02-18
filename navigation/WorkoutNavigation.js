import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WorkoutListScreen from '../screens/WorkoutListScreen'
import WorkoutScreen from '../screens/WorkoutScreen'
import ExerciseLogScreen from '../screens/ExerciseLogScreen'
import AddExerciseScreen from '../screens/AddExerciseScreen'

const Stack = createStackNavigator();

export default function WorkoutNavigation() {
  return (
    <Stack.Navigator initialRouteName="Workouts">
      <Stack.Screen
        name="Workouts"
        component={WorkoutListScreen}
      />
      <Stack.Screen
        name="WorkoutScreen"
        component={WorkoutScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="ExerciseLogScreen"
        component={ExerciseLogScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="AddExerciseScreen"
        component={AddExerciseScreen}
      />
    </Stack.Navigator>
  );
}
