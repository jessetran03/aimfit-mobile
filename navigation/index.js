import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkoutNavigation from './WorkoutNavigation';
import LogoutScreen from '../screens/LogoutScreen'
import ExerciseNavigation from './ExerciseNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomTab = createBottomTabNavigator();

export default function Navigation(props) {
    return (
      <NavigationContainer>
        <BottomTab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Workouts') {
                iconName = focused ? 'ios-list' : 'list-outline';
              } else if (route.name === 'Exercises') {
                iconName = focused ? 'barbell' : 'barbell-outline';
              } else if (route.name === 'Logout') {
                iconName = focused ? 'power' : 'power-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />
            }
          })}
          tabBarOptions={{
            activeTintColor: '#39A9DB',
            inactiveTintColor: '#BBBBBB',
          }}
        >
          <BottomTab.Screen
            name="Workouts"
            component={WorkoutNavigation}
          />
          <BottomTab.Screen
            name="Exercises"
            component={ExerciseNavigation}
          />
          <BottomTab.Screen
            name="Logout"
            children={() => <LogoutScreen onLogout={props.onLogout()} />}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    )
}

