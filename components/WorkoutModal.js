import React, { useEffect, useState } from 'react';
import { ActionSheetIOS, StyleSheet, Text, TextInput, View, FlatList, Button, TouchableHighlight, TouchableOpacity, Modal } from 'react-native';
import TokenService from '../services/token-service';
import config from '../config'
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import Spinner from 'react-native-loading-spinner-overlay';

export default function WorkoutModal(props) {

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [workoutName, setWorkoutName] = useState('New Workout')
  const [workoutDay, setWorkoutDay] = useState('Sunday')
  const [workouts, setWorkouts] = useState([]);

  console.log(props)

  return (
    <Modal
      animationType="fade"
      visible={props.visible}
      transparent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Icon
            onPress={() => props.setModalVisible(false)}
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
            defaultValue={props.item.title}
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
          <TouchableOpacity style={styles.modalButtonContainer} onPress={() => handleEditWorkout(props.item.id, props.item.title, workoutName, workoutDay)}>
            <Text style={styles.modalButtonText}>
              Edit Workout
                    </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    margin: 10,
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
