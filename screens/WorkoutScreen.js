import React, { useEffect, useState } from 'react';
import { ActionSheetIOS, StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ApiService from '../services/api-service';
import { Divider, Button } from '../components/Utils/Utils'

export default function Workout({ navigation, route }) {

  const [exercises, setExercises] = useState([]);

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

  function getWorkoutExercises(id) {
    ApiService.getWorkoutExercises(id)
      .then((exercises) => setExercises(exercises))
      .catch(error => console.error({ error }))
  }

  function removeExercise(id) {
    ApiService.deleteWorkoutExercise(id)
      .then(() => getWorkoutExercises(route.params.id))
      .catch(error => console.error({ error }))
  }

  useEffect(() => {
    navigation.addListener('focus', payload =>
      getWorkoutExercises(route.params.id)
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
          <>
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
            <Divider />
          </>
        }
        keyExtractor={(item) => item.id.toString()}
      />
      <Button 
        text='+ Add Exercise'
        onPress={() => navigation.navigate('AddExerciseScreen', {
          workoutId: route.params.id,
          workoutName: route.params.title
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 12,
    fontStyle: 'italic'
  },
  exercise: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 18,
  },
  item: {
    padding: 0,
    fontSize: 16,
  },
});
