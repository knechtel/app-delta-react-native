import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Button, SafeAreaView, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RadioButton} from 'react-native-paper';
import axios from 'axios';

import {CREATE_CLIENT} from '../util/urls';

const FormEquipment = () => {
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [cpf, setCpf] = React.useState();

  const [brand, setBrand] = React.useState();
  const [checked, setChecked] = React.useState(false);
  const [autorizado, setAutorizado] = React.useState(false);
  const [entregue, setEntregue] = React.useState(false);

  const createClient = () => {
    axios({
      method: 'post',
      url: CREATE_CLIENT,
      headers: {
        'Content-type': 'application/json',
      },
      data: {
        name: name,
        email: email,
        cpf: cpf,
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
        <TextInput
          style={styles.input}
          value={cpf}
          placeholder="Cpf"
          onChangeText={newCpf => setCpf(newCpf)}
          defaultValue={cpf}
        />
        <TextInput
          style={styles.input}
          value={brand}
          placeholder="Marca"
          onChangeText={newBrand => setBrand(newBrand)}
          defaultValue={brand}
        />
        <RadioButton.Group
          onValueChange={value => setChecked(value)}
          value={checked}>
          <RadioButton.Item label="Pronto" value="first" />
        </RadioButton.Group>
        <RadioButton.Group
          onValueChange={value => setAutorizado(value)}
          value={checked}>
          <RadioButton.Item label="Autorizado" value="first" />
        </RadioButton.Group>
        <RadioButton.Group
          onValueChange={value => setEntregue(value)}
          value={checked}>
          <RadioButton.Item label="Entregue" value="first" />
        </RadioButton.Group>
        <Button title="Enviar" onPress={createClient} />
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
