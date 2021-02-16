import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableHighlight } from 'react-native';

export default function ExerciseScreen({ navigation }) {

  const [exercises, setExercises] = useState([
    {
      "exercise_name": "--------------",
      "id": 1,
      "muscle": "Chest",
    },
    {
      "exercise_name": "---------------",
      "id": 2,
      "muscle": "Back",
    },
  ]);

  useEffect(() => {
    fetch(`https://shrouded-cliffs-68019.herokuapp.com/api/exercises`)
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
            onPress={() => navigation.navigate('ExerciseScreen')}
            underlayColor="#ccc"
          >
            <View
              style={styles.exercise}
            >
              <Text style={styles.item}>{item.exercise_name}</Text>
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
    marginTop: 40,
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
