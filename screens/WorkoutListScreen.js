import React, { useEffect, useState } from 'react';
import { ActionSheetIOS, StyleSheet, Text, TextInput, View, FlatList, Button, TouchableHighlight, Modal } from 'react-native';
import TokenService from '../services/token-service';
import config from '../config'
import Icon from 'react-native-vector-icons/Ionicons';

export default function WorkoutListScreen({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [workoutName, onChangeWorkoutName] = React.useState('New Workout')
  const [workoutDay, onChangeWorkoutDay] = React.useState('Sunday')
  const [workouts, setWorkouts] = useState([
    {
      "title": "--------------",
      "id": 1,
      "day": "Monday",
    },
  ]);

  function onPress(id) {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Delete"],
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          deleteWorkout(id)
        }
      }
    )
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
        getWorkouts();
        setModalVisible(!modalVisible)
      })
      .catch(error => {
        console.error({ error })
      })
  };

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

  useEffect(() => {
    getWorkouts()
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        renderItem={({ item }) =>
          <TouchableHighlight
            onPress={() => navigation.navigate('WorkoutScreen', {
              id: item.id,
              title: item.title,
            })}
            underlayColor="#ccc"
          >
            <View style={styles.workout}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.day}>{item.day}</Text>
              </View>
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
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
      >
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Button
            title="Cancel"
            onPress={() => setModalVisible(!modalVisible)}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => onChangeWorkoutName(text)}
            autoCapitalize='none'
            autoCorrect={false}
            placeholder="Workout Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => onChangeWorkoutDay(text)}
            autoCapitalize='none'
            autoCorrect={false}
            placeholder="Day of Week"
          />
          <Button
            title="+ Add Workout"
            onPress={() => handleAddWorkout(workoutName, workoutDay)}
          />
        </View>
        </View>
      </Modal>
      <Button
        title="+ Add Workout (initial)"
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  workout: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eee',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#777777',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  day: {
    fontSize: 14,
  },
  input: {
    alignSelf: 'center',
    width: 200,
    marginBottom: 10,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  }
});
