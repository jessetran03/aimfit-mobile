import React, { useEffect, useState } from 'react';
import { ActionSheetIOS, StyleSheet, Text, TextInput, View, FlatList, TouchableHighlight, TouchableOpacity, Modal } from 'react-native';
import ApiService from '../services/api-service';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { Divider, Button } from '../components/Utils/Utils'
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

  const getWorkouts = () => {
    ApiService.getWorkouts()
      .then(workouts => {setWorkouts(workouts)})
      .catch(error => console.error({ error }))
  }

  const handleAddWorkout = (name, day) => {
    ApiService.addWorkout(name, day)
      .then(workout => {
        setModalVisible(!modalVisible)
        setWorkoutName('New Workout')
        setWorkoutDay('Sunday')
        getWorkouts()
      })
      .catch(error => console.error({ error }))
  };

  const handleEditWorkout = (id, title, day) => {
    ApiService.editWorkout(id, title, day)
      .then(() => {
        setEditModalVisible(false)
        setWorkoutName('New Workout')
        setWorkoutDay('Sunday')
        getWorkouts()
      })
      .catch(error => console.error({ error }))
  }

  const deleteWorkout = (id) => {
    ApiService.deleteWorkout(id)
      .then(() => getWorkouts())
      .catch(error => console.error({ error }))
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
      {workouts.length === 0 &&
        <Text style={styles.empty}>Create a new workout to begin!</Text>
      }
      <FlatList
        data={workouts}
        renderItem={({ item }) =>
          <>
            <Workout
              navigation={navigation}
              item={item}
              onPress={() => onPress(item.id, item.title, item.day)}
            />
            <Divider />

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
                  <DayPicker
                    selectedValue={workoutDay}
                    onValueChange={(itemValue, itemIndex) => setWorkoutDay(itemValue)}
                  />
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
              autoFocus={true}
              placeholder="Workout Name"
            />
            <Text style={styles.modalText}>Workout Day</Text>
            <DayPicker
              selectedValue={workoutDay}
              onValueChange={(itemValue, itemIndex) => setWorkoutDay(itemValue)}
            />
            <TouchableOpacity style={styles.modalButtonContainer} onPress={() => handleAddWorkout(workoutName, workoutDay)}>
              <Text style={styles.modalButtonText}>
                + Create New Workout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Button text='+ Create New Workout' onPress={() => setModalVisible(true)} />
    </View>
  );
}

function DayPicker(props) {
  return (
    <Picker
      selectedValue={props.selectedValue}
      style={styles.picker}
      itemStyle={styles.pickerItem}
      onValueChange={(itemValue, itemIndex) => props.onValueChange(itemValue)}>
      <Picker.Item label="Sunday" value="Sunday" />
      <Picker.Item label="Monday" value="Monday" />
      <Picker.Item label="Tuesday" value="Tuesday" />
      <Picker.Item label="Wednesday" value="Wednesday" />
      <Picker.Item label="Thursday" value="Thursday" />
      <Picker.Item label="Friday" value="Friday" />
      <Picker.Item label="Saturday" value="Saturday" />
    </Picker>
  )
}

function Workout(props) {
  const { item, onPress, navigation } = props
  const { id, title, day } = item
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('WorkoutScreen', { id, title })}
      underlayColor="#777777"
    >
      <View style={styles.workout}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.day}>{day}</Text>
        </View>
        <Icon
          onPress={() => onPress(id, title, day)}
          style={styles.icon}
          size={20}
          name="ellipsis-vertical"
        />
      </View>
    </TouchableHighlight>
  )
}


function AddModal(props) {
  <Modal
        animationType="slide"
        visible={props.visible}
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon
              onPress={() => props.setModalVisible(!modalVisible)}
              style={styles.close}
              size={24}
              name="close"
            />
            <Text style={styles.modalText}>Name of Workout</Text>
            <TextInput
              style={styles.modalInput}
              onChangeText={text => props.setWorkoutName(text)}
              autoCapitalize='none'
              autoCorrect={false}
              autoFocus={true}
              placeholder="Workout Name"
            />
            <Text style={styles.modalText}>Workout Day</Text>
            <DayPicker
              selectedValue={workoutDay}
              onValueChange={(itemValue, itemIndex) => props.setWorkoutDay(itemValue)}
            />
            <TouchableOpacity style={styles.modalButtonContainer} onPress={() => props.handleAddWorkout(workoutName, workoutDay)}>
              <Text style={styles.modalButtonText}>
                + Create New Workout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
}

const styles = StyleSheet.create({
  close: {
    alignSelf: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  empty: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 12,
    fontStyle: 'italic'
  },
  modalButtonContainer: {
    backgroundColor: '#53B3DF',
    borderStyle: 'solid',
    borderColor: '#50B0DC',
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: 'stretch',
    padding: 8,
    margin: 10,
  },
  modalButtonText: {
    alignSelf: 'center',
    color: 'white',
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
    backgroundColor: 'white',
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