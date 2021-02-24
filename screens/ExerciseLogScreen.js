import React, { useEffect, useState } from 'react';
import { ActionSheetIOS, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import TokenService from '../services/token-service';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../config'
import moment from 'moment';

export default function ExerciseLog({ route }) {

  const [exerciseLog, setExerciseLog] = useState([]);
  const [set, onChangeSet] = useState(0);
  const [rep, onChangeRep] = useState(0);
  const [weight, onChangeWeight] = useState(0);

  const checkInput = () => {
    if (!set) {
      alert('Please Enter Set Count');
      return 0;
    }
    if (!rep) {
      alert('Please Enter Rep Count');
      return 0;
    }
    return 1;
  }

  async function getExerciseLog() {
    fetch(`${config.API_ENDPOINT}/exercise_log/${route.params.id}`, {
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
      .then((exerciseLog) => {
        setExerciseLog(exerciseLog)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  async function handleAddEntry(set, rep, weight) {
    if (!checkInput()) {
      return;
    }
    const newEntry = {
      set_count: set,
      rep_count: rep,
      weight_count: weight,
    }
    fetch(`${config.API_ENDPOINT}/exercise_log/${route.params.id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${await TokenService.getToken()}`
      },
      body: JSON.stringify(newEntry),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(entry => {
        getExerciseLog()
      })
      .catch(error => {
        console.error({ error })
      })
  };

  async function deleteEntry(id) {
    fetch(`${config.API_ENDPOINT}/exercise_log/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${await TokenService.getToken()}`
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res
      })
      .then(() => {
        getExerciseLog()
      })
      .catch(error => {
        console.error({ error })
      })
  }

  function onPress(id) {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Delete"],
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          deleteEntry(id)
        }
      }
    )
  }

  useEffect(() => {
    getExerciseLog()
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.addEntry}>
        <TextInput
          style={styles.input}
          onChangeText={text => onChangeSet(text)}
          autoCapitalize='none'
          placeholder="Set"
          keyboardType="number-pad"
          maxLength={2}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => onChangeRep(text)}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder="Rep"
          keyboardType="number-pad"
          maxLength={2}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => onChangeWeight(text)}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder="Weight"
          keyboardType="number-pad"
          maxLength={4}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleAddEntry(set, rep, weight)}>
          <Text style={styles.buttonText}>
            + Add Entry
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.border} />
      {exerciseLog.length === 0 &&
        <Text style={styles.empty}>No entries have been added yet.</Text>
      }
      <FlatList
        data={exerciseLog}
        renderItem={({ item }) =>
          <>
            <View style={styles.exerciseLog}>
              <View>
                <Text>{moment(item.date_logged).format('MM-DD-YYYY')}</Text>
                <Text>{moment(item.date_logged).format('dddd')}</Text>
              </View>
              <View style={styles.set}>
                <Text style={styles.weightCount}>{item.weight_count} lb</Text>
                <Text style={styles.setCount}>{item.set_count}x{item.rep_count}</Text>
              </View>
              <Icon
                onPress={() => onPress(item.id)}
                size={20}
                name="ellipsis-vertical" />
            </View>
            <View style={styles.border} />
          </>
        }
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  addEntry: {
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#53B3DF',
    borderStyle: 'solid',
    borderColor: '#50B0DC',
    borderWidth: 2,
    borderRadius: 12,
    padding: 8,
    margin: 15,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  empty: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 12,
    fontStyle: 'italic',
    paddingBottom: 12,
  },
  exerciseLog: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  input: {
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginTop: 5,
  },
  item: {
    padding: 0,
  },
  setCount: {
    fontSize: 20,
  },
  weightCount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  border: {
    borderBottomWidth: 0.5,
    borderColor: '#777777',
    marginHorizontal: 15,
  },
});
