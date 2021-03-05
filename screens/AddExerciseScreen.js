import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableHighlight, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ApiService from '../services/api-service';
import { Divider } from '../components/Utils/Utils'

export default function AddExerciseScreen({ route, navigation }) {

  const [exercises, setExercises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [muscleFilter, setMuscleFilter] = useState('All');

  function handleAddExercise(exerciseId, workoutId) {
    ApiService.addExercise(exerciseId, workoutId)
      .then(workoutExercise => navigation.goBack())
      .catch(error => console.error({ error }))
  }

  useEffect(() => {
    ApiService.getExercises()
      .then((exercises) => setExercises(exercises))
      .catch(error => console.error({ error }))
  }, []);

  function handleFilter(muscle) {
    setMuscleFilter(muscle)
    setModalVisible(false);
  }

  const muscles = ['All', 'Chest', 'Back', 'Triceps', 'Biceps', 'Shoulders', 'Traps', 'Quads', 'Hamstrings', 'Calves']

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
        data={muscleFilter === 'All'
          ? exercises
          : exercises.filter(exercise => exercise.muscle === muscleFilter)
        }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          <>
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
            <Divider />
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  exercise: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor: '#39A9DB',
    borderStyle: 'solid',
    borderColor: '#50B0DC',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'stretch',
    padding: 8,
    marginVertical: 12,
    marginHorizontal: 100,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
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
    backgroundColor: '#53B3DF',
    alignSelf: 'stretch',
    padding: 8,
  },
  modalButtonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
