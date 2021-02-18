import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkoutNavigation from './navigation/WorkoutNavigation';
import LoginScreen from './screens/LoginScreen'
import LogoutScreen from './screens/LogoutScreen'
import ExerciseNavigation from './navigation/ExerciseNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TokenService from './services/token-service'

const BottomTab = createBottomTabNavigator();

export default function App() {

  const [hasToken, setHasToken] = useState();

  function renderLogin() {
    return (
      <>
        <LoginScreen 
          onLogin={handleTokenState}
        />
      </>
    )
  }

  function renderMain() {
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
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
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
            children={() => <LogoutScreen onLogout={handleTokenState} />}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    );
  }

  function handleTokenState(bool) {
    setHasToken(bool)
  }

  useEffect(() => {
    TokenService.hasToken().then(hasToken => setHasToken(hasToken))
  }) 

  return (
    <>
      {
      hasToken != undefined &&
      (hasToken
        ? renderMain()
        : renderLogin())
      }
    </>
  );
}

