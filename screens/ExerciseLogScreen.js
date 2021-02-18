import React, { useEffect, useState } from 'react';
import { ActionSheetIOS, StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';
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
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeSet(text)}
        autoCapitalize='none'
        placeholder="Set"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeRep(text)}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder="Rep"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeWeight(text)}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder="Weight"
      />
      <Button
        title="+ Add Entry"
        onPress={() => handleAddEntry(set, rep, weight)}
      />
      {exerciseLog.length === 0 &&
        <Text>No entries have been added yet.</Text>
      }
      <FlatList
        data={exerciseLog}
        renderItem={({ item }) =>
          <View style={styles.exerciseLog} >
            <Text>{moment(item.date_logged).format('MM-DD-YYYY')}</Text>
            <Text>{item.weight_count} lb</Text>
            <Text>{item.set_count}x{item.rep_count}</Text>
            <Icon
              onPress={() => onPress(item.id)}
              style={{ alignSelf: 'flex-end' }}
              size={20}
              name="ellipsis-vertical" />
          </View>
        }
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  exerciseLog: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#777777',
    padding: 20,
  },
  item: {
    padding: 0,
  }
});
