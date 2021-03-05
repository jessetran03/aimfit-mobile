import React, { useEffect, useState } from 'react';
import { ActionSheetIOS, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import ApiService from '../services/api-service';
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider } from '../components/Utils/Utils';
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
    if (!weight) {
      alert('Please Enter Weight');
      return 0;
    }
    return 1;
  }

  function getExerciseLog(id) {
    ApiService.getExerciseLog(id)
      .then((exerciseLog) => setExerciseLog(exerciseLog))
      .catch(error => console.error({ error }))
  }

  function handleAddEntry(id, set, rep, weight) {
    if (!checkInput()) {
      return;
    }
    ApiService.addLogEntry(id, set, rep, weight)
      .then(entry => getExerciseLog(route.params.id))
      .catch(error => console.error({ error }))
  };

  useEffect(() => {
    getExerciseLog(route.params.id)
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
        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleAddEntry(route.params.id, set, rep, weight)}>
          <Text style={styles.buttonText}>
            + Add Entry
          </Text>
        </TouchableOpacity>
      </View>
      <Divider />
      {exerciseLog.length === 0 &&
        <Text style={styles.empty}>No entries have been added yet.</Text>
      }
      <FlatList
        data={exerciseLog}
        renderItem={({ item }) =>
          <LogEntry item={item} getData={() => getExerciseLog(route.params.id)} />
        }
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

function LogEntry(props) {
  const { getData, item } = props
  const { id, date_logged, weight_count, set_count, rep_count } = item

  function deleteEntry(id) {
    ApiService.deleteLogEntry(id)
      .then(() => getData())
      .catch(error => console.error({ error }))
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

  return (
    <>
      <View style={styles.exerciseLog}>
        <View>
          <Text>{moment(date_logged).format('MM-DD-YYYY')}</Text>
          <Text>{moment(date_logged).format('dddd')}</Text>
        </View>
        <View style={styles.set}>
          <Text style={styles.weightCount}>{weight_count} lb</Text>
          <Text style={styles.setCount}>{set_count}x{rep_count}</Text>
        </View>
        <Icon
          onPress={() => onPress(id)}
          size={20}
          name="ellipsis-vertical" />
      </View>
      <Divider />
    </>
  )
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
});
