import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableHighlight } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const getToken = () => {
  return SecureStore.getItemAsync('secure_token');
};

export default function WorkoutScreen({ navigation }) {

  const [workouts, setWorkouts] = useState([
    {
      "title": "--------------",
      "id": 1,
      "day": "Monday",
    },
  ]);

  async function getWorkouts() {
    fetch(`https://shrouded-cliffs-68019.herokuapp.com/api/workouts`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${await getToken()}`
        }
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
        .then((workouts) => {
          setWorkouts(workouts)
        })
        .catch(error => {
          console.error({ error })
        })
  }

  useEffect(() => {
    getWorkouts()
  }, []);

  return (
    <View style={styles.container}>
      <Text>Workouts</Text>
      <FlatList
        data={workouts}
        renderItem={({ item }) =>
          <TouchableHighlight
            onPress={() => navigation.navigate('WorkoutScreen')}
            underlayColor="#ccc"
          >
            <View
              style={styles.workout}
            >
              <Text style={styles.item}>{item.title}</Text>
            </View>
          </TouchableHighlight>
        }
        keyExtractor={(item) => item.id.toString()}
      />
      <Text>End of Workouts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    paddingTop: 10,
  },
  workout: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#777777',
    padding: 20,
  },
  item: {
    padding: 0,
  }
});
