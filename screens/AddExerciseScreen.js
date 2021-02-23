import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableHighlight, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TokenService from '../services/token-service';
import { Picker } from '@react-native-picker/picker';
import config from '../config'

export default function AddExerciseScreen({ route, navigation }) {

  const [exercises, setExercises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [muscleFilter, setMuscleFilter] = useState('Chest');

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

  function handleFilter(muscle) {
    setMuscleFilter(muscle)
    setModalVisible(false);
  }

  const muscles = ['Chest', 'Back', 'Triceps', 'Biceps', 'Shoulders', 'Traps', 'Quads', 'Hamstrings', 'Calves']

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.buttonText}>
          {muscleFilter}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
      >
        <View style={styles.centeredView}>

          <View style={styles.modalView}>
            {muscles.map(muscle => (
              <TouchableOpacity key={muscle} style={styles.modalButtonContainer} onPress={() => handleFilter(muscle)}>
                <Text style={styles.modalButtonText}>
                  {muscle}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <FlatList
        data={exercises.filter(exercise => exercise.muscle === muscleFilter)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          <TouchableHighlight onPress={() => console.log('Feature to be added')} underlayColor="#ccc">
            <View style={styles.exercise}>
              <Text style={styles.item}>{item.exercise_name}</Text>
              <Icon
                onPress={() => handleAddExercise(item.id, route.params.workoutId)}
                size={22}
                color='#555'
                name="add-circle-outline" />
            </View>
          </TouchableHighlight>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  exercise: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#777777',
    paddingHorizontal: 30,
    paddingVertical: 18,
  },
  exercises: {
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#999',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 18,
  },
  item: {
    padding: 0,
    color: '#555'
  },
  buttonContainer: {
    backgroundColor: '#eee',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'stretch',
    padding: 8,
    marginVertical: 12,
    marginHorizontal: 100,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'stretch',
    marginHorizontal: 100,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 103
  },
  modalButtonContainer: {
    backgroundColor: '#eee',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'stretch',
    padding: 8,
  },
  modalButtonText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
