import React, { useEffect, useState } from 'react';
import { ActionSheetIOS, StyleSheet, Text, View, FlatList, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TokenService from '../services/token-service';
import Spinner from 'react-native-loading-spinner-overlay';
import config from '../config'

export default function Workout({ navigation, route }) {

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  function onPress(id) {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Remove"],
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          removeExercise(id)
        }
      }
    )
  }

  async function getWorkoutExercises() {
    fetch(`${config.API_ENDPOINT}/workouts/${route.params.id}/exercises`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${await TokenService.getToken()}`
        }
      })
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
  }

  async function removeExercise(id) {
    fetch(`${config.API_ENDPOINT}/workout_exercises/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${await TokenService.getToken()}`
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return
      })
      .then(() => {
        getWorkoutExercises()
      })
      .catch(error => {
        console.error({ error })
      })
  }

  useEffect(() => {
    navigation.addListener('focus', payload =>
      getWorkoutExercises()
    )
  }, []);

  return (
    
    <View style={styles.container}>
      {exercises.length === 0 &&
        <Text style={styles.empty}>No exercises have been added yet.</Text>
      }
      <FlatList
        data={exercises}
        renderItem={({ item }) =>
          <TouchableHighlight
            onPress={() => navigation.navigate('ExerciseLogScreen', {
              id: item.exercise_id,
              name: item.exercise_name,
            })}
            underlayColor="#ccc"
          >
            <View style={styles.exercise}>
              <Text style={styles.item}>{item.exercise_name}</Text>
              <Icon
                onPress={() => onPress(item.id)}
                style={{ alignSelf: 'flex-end' }}
                size={20}
                name="ellipsis-vertical" />
            </View>
          </TouchableHighlight>
        }
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity 
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('AddExerciseScreen', {
          workoutId: route.params.id,
          workoutName: route.params.title
        })}>
        <Text style={styles.buttonText}>
          + Add Exercise
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#eee',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: 'stretch',
    padding: 8,
    margin: 8,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  empty: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 12,
    fontStyle: 'italic'
  },
  exercise: {
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#777777',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 18,
  },
  item: {
    padding: 0,
    fontSize: 16,
  }
});
