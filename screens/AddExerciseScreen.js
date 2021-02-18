import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TokenService from '../services/token-service';
import config from '../config'

export default function AddExerciseScreen({ route, navigation }) {

  const [exercises, setExercises] = useState([
    {
      "exercise_name": "--------------",
      "id": 1,
      "muscle": "Chest",
    },
  ]);

  async function handleAddExercise(exerciseId, workoutId) {
    const newWorkoutExercise = {
      workout_id: workoutId,
      exercise_id: exerciseId,
    }
    fetch(`${config.API_ENDPOINT}/workout_exercises`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${await TokenService.getToken()}`
      },
      body: JSON.stringify(newWorkoutExercise),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(workoutExercise => {
        navigation.goBack()
      })
      .catch(error => {
        console.error({ error })
      })
  }

  useEffect(() => {
    fetch(`${config.API_ENDPOINT}/exercises`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then((exercises) => {
        setExercises(exercises)
      })
      .catch(error => {
        console.error({ error })
      })
  }, []);

  return (
    <View style={styles.container}>
      <Text>Exercises</Text>
      <FlatList
        data={exercises}
        renderItem={({ item }) =>
          <TouchableHighlight
            onPress={() => console.log('Hi')}
            underlayColor="#ccc"
          >
            <View
              style={styles.exercise}
            >
              <Text style={styles.item}>{item.exercise_name}</Text>
              <Icon
                onPress={() => handleAddExercise(item.id, route.params.workoutId)}
                style={{ alignSelf: 'flex-end' }}
                size={20}
                name="add" />
            </View>
          </TouchableHighlight>
        }
        keyExtractor={(item) => item.id.toString()}
      />
      <Text>End of Exercises</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  exercise: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#777777',
    padding: 20,
  },
  item: {
    padding: 0,
  }
});
