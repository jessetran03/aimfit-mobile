import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

export function Button(props) {
  const { color, text, onPress } = props
  return (
    <TouchableHighlight
      style={color === 'dark' ? styles.darkButtonContainer : styles.buttonContainer}
      underlayColor={color === 'dark' ? '#242A30' : '#5CC9FB'}
      onPress={() => onPress()}
    >
      <Text style={styles.buttonText}>
        {text}
      </Text>
    </TouchableHighlight>
  )
}

export function Divider() {
  return <View style={styles.divider} />
}

const styles = StyleSheet.create({
  darkButtonContainer: {
    backgroundColor: '#141A20',
    borderRadius: 10,
    alignSelf: 'stretch',
    padding: 10,
    margin: 12,
  },
  buttonContainer: {
    backgroundColor: '#39A9DB',
    borderRadius: 10,
    alignSelf: 'stretch',
    padding: 10,
    margin: 12,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  divider: {
    borderBottomWidth: 0.5,
    borderColor: '#777777',
    marginHorizontal: 15,
  },
});
