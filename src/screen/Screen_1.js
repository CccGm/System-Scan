import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default class App extends Component {
  state = {
    result: '',
    command: '',
  };

  render() {
    const {result} = this.state;
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        <Text style={styles.welcome}>Android Shell example</Text>
        <Text style={styles.instructions}>RESULT: {result}</Text>
        <TextInput
          style={styles.formCommand}
          onChangeText={x => this.setState({command: x})}
          keyboardType="default"
          onSubmitEditing={() => this.onPressEnter()}
          placeholder="Enter your command"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  formCommand: {
    paddingLeft: 6,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    width: 300,
    height: 40,
  },
});
