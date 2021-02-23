import React, { useEffect, useState } from 'react';
import { ActionSheetIOS, StyleSheet, Text, TextInput, View, FlatList, TouchableHighlight, TouchableOpacity, Modal } from 'react-native';
import TokenService from '../services/token-service';
import config from '../config'
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import WorkoutModal from '../components/WorkoutModal';

export default function WorkoutListScreen({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [workoutId, setWorkoutId] = useState(0)
  const [workoutName, setWorkoutName] = useState('New Workout')
  const [workoutDay, setWorkoutDay] = useState('Sunday')

  function onPress(id, title, day) {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Edit", "Delete"],
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 2) {
          deleteWorkout(id)
        } else if (buttonIndex === 1) {
          handleEditModal(id, title, day)
        }
      }
    )
  }

  function handleEditModal(id, title, day) {
    setWorkoutId(id)
    setWorkoutName(title)
    setWorkoutDay(day)
    setEditModalVisible(true)
  }

  async function getWorkouts() {
    fetch(`${config.API_ENDPOINT}/workouts`, {
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
      .then((workouts) => {
        setWorkouts(workouts)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  async function handleAddWorkout(name, day) {
    const newWorkout = {
      title: name,
      day: day,
    }
    fetch(`${config.API_ENDPOINT}/workouts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${await TokenService.getToken()}`
      },
      body: JSON.stringify(newWorkout),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(workout => {
        setModalVisible(!modalVisible)
        setWorkoutName('New Workout')
        setWorkoutDay('Sunday')
        getWorkouts();
      })
      .catch(error => {
        console.error({ error })
      })
  };

  async function handleEditWorkout(id, title, day) {
    const workoutToBeUpdated = {
      title: title,
      day: day,
    }
    fetch(`${config.API_ENDPOINT}/workouts/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${await TokenService.getToken()}`
      },
      body: JSON.stringify(workoutToBeUpdated),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return
      })
      .then(() => {
        setEditModalVisible(false)
        setWorkoutName('New Workout')
        setWorkoutDay('Sunday')
        getWorkouts()
      })
      .catch(error => {
        console.error({ error })
      })
  }

  async function deleteWorkout(id) {
    fetch(`${config.API_ENDPOINT}/workouts/${id}`, {
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
        getWorkouts()
      })
      .catch(error => {
        console.error({ error })
      })
  }

  function closeEditModal() {
    setEditModalVisible(false)
    setWorkoutName(null);
    setWorkoutDay(null);
  }

  useEffect(() => {
    getWorkouts()
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        renderItem={({ item }) =>
          <>
            <TouchableHighlight
              onPress={() => navigation.navigate('WorkoutScreen', {
                id: item.id,
                title: item.title,
              })}
              underlayColor="#777"
            >
              <View style={styles.workout}>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.day}>{item.day}</Text>
                </View>
                <Icon
                  onPress={() => onPress(item.id, item.title, item.day)}
                  style={styles.icon}
                  size={20}
                  name="ellipsis-vertical"
                />
              </View>
            </TouchableHighlight>

            <Modal
              animationType="fade"
              visible={editModalVisible}
              transparent={true}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Icon
                    onPress={() => closeEditModal()}
                    style={styles.close}
                    size={24}
                    name="close"
                  />
                  <Text style={styles.modalText}>Name of Workout</Text>
                  <TextInput
                    style={styles.modalInput}
                    onChangeText={text => setWorkoutName(text)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    defaultValue={workoutName}
                  />
                  <Text style={styles.modalText}>Workout Day</Text>
                  <Picker
                    selectedValue={workoutDay}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    onValueChange={(itemValue, itemIndex) => setWorkoutDay(itemValue)}>
                    <Picker.Item label="Sunday" value="Sunday" />
                    <Picker.Item label="Monday" value="Monday" />
                    <Picker.Item label="Tuesday" value="Tuesday" />
                    <Picker.Item label="Wednesday" value="Wednesday" />
                    <Picker.Item label="Thursday" value="Thursday" />
                    <Picker.Item label="Friday" value="Friday" />
                    <Picker.Item label="Saturday" value="Saturday" />
                  </Picker>
                  <TouchableOpacity style={styles.modalButtonContainer} onPress={() => handleEditWorkout(workoutId, workoutName, workoutDay)}>
                    <Text style={styles.modalButtonText}>
                      Edit Workout
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </>

        }
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.close}
              size={24}
              name="close"
            />
            <Text style={styles.modalText}>Name of Workout</Text>
            <TextInput
              style={styles.modalInput}
              onChangeText={text => setWorkoutName(text)}
              autoCapitalize='none'
              autoCorrect={false}
              placeholder="Workout Name"
            />
            <Text style={styles.modalText}>Workout Day</Text>
            <Picker
              selectedValue={workoutDay}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={(itemValue, itemIndex) => setWorkoutDay(itemValue)}>
              <Picker.Item label="Sunday" value="Sunday" />
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
            </Picker>
            <TouchableOpacity style={styles.modalButtonContainer} onPress={() => handleAddWorkout(workoutName, workoutDay)}>
              <Text style={styles.modalButtonText}>
                + Create New Workout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>
          + Create New Workout
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
    borderRadius: 10,
    alignSelf: 'stretch',
    padding: 8,
    margin: 12,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  close: {
    alignSelf: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalButtonContainer: {
    backgroundColor: '#eee',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: 'stretch',
    padding: 8,
    margin: 10,
  },
  modalButtonText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalInput: {
    alignSelf: 'stretch',
    marginBottom: 20,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  modalText: {
    color: '#999',
    marginBottom: 5,
    alignSelf: 'flex-start'
  },
  workout: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eee',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#777777',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  day: {
    fontSize: 14,
    color: '#555',
  },
  picker: {
    height: 100,
    width: 300,
  },
  pickerItem: {
    height: 100
  }
});


/*export function EditModal(props) {
  const { visible, setModalVisible, item } = props

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      onShow={() => console.log(item)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>{item.title}</Text>
          <Text style={styles.modalText}>Workout Day</Text>

          <TouchableOpacity style={styles.modalButtonContainer} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalButtonText}>
              Edit Workout
                    </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

*/