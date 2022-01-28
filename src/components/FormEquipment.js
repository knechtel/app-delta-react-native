import React, {Component} from 'react';
import {Node} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Button, SafeAreaView, Alert, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';
import {CREATE_CLIENT} from '../util/urls';
const FormEquipment = () => {
  const handleClick = () => {
    // do something
    creaateClient();
    alert('Cliente cadastrado com sucesso!');
  };
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const creaateClient = () => {
    axios({
      method: 'post',
      url: CREATE_CLIENT,
      headers: {
        'Content-type': 'application/json',
      },
      data: {
        name: name,
        email: email,
      },
    });
  };
  return (
    <>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={newName => setName(newName)}
          defaultValue={name}
        />
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          onChangeText={newEmail => setEmail(newEmail)}
          defaultValue={email}
        />

        <Button title="Press me" onPress={handleClick} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
export default FormEquipment;
