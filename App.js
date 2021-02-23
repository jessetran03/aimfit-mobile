import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InitialScreen from './screens/InitialScreen'
import LoginScreen from './screens/LoginScreen'
import TokenService from './services/token-service'
import Navigation from './navigation/index'

const BottomTab = createBottomTabNavigator();

export default function App() {

  const [hasToken, setHasToken] = useState();

  function handleTokenState(bool) {
    setHasToken(bool)
  }

  useEffect(() => {
    TokenService.hasToken().then(hasToken => setHasToken(hasToken))
  })

  return (
    <>
      {hasToken != undefined && (hasToken
        ? <Navigation onLogout={() => handleTokenState} />
        : <InitialScreen onLogin={handleTokenState} />
      )}
    </>
  );
}

