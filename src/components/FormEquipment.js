import React, {Component} from 'react';
import {Node} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Button, SafeAreaView, Alert, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CREATE_CLIENT from '../util/urls';

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

  function creaateClient() {
    try {
      const response = fetch(CREATE_CLIENT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      });

      const json = response.json();

      console.log(json.id);
    } catch (err) {
      throw err;
      console.log(err);
    }
  }
  return (
    <>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          onChangeText={setEmail}
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
