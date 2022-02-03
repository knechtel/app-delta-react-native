import React from 'react';
import {StyleSheet, TextInput, Text, View} from 'react-native';
import {Button, SafeAreaView, useColorScheme} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RadioButton} from 'react-native-paper';
import axios from 'axios';

import {CREATE_CLIENT, CREATE_EQUIPMENT} from '../util/urls';

const FormEquipment = () => {
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [cpf, setCpf] = React.useState();

  const [brand, setBrand] = React.useState();
  const [checked, setChecked] = React.useState(false);
  const [autorizado, setAutorizado] = React.useState(false);
  const [entregue, setEntregue] = React.useState(false);

  const createClient = async () => {
    var idClient;
    var aparelhoEntregue = null;
    if (entregue == true) {
      const d = new Date();
      d.getTime();
      aparelhoEntregue = d.toISOString().substring(0, 10);
    }
    console.log('Valor esperado =  ' + entregue);
    await axios({
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
    }).then(response => {
      idClient = response.data.id;
      console.log('idClient  = ' + idClient + ' entregue ' + aparelhoEntregue);
    });

    await axios({
      method: 'post',
      url: CREATE_EQUIPMENT,
      headers: {
        'Content-type': 'application/json',
      },
      data: {
        idClient: idClient,
        brand: brand,
        entregue: aparelhoEntregue,
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
        <View style={styles1.checkboxContainer}>
          <CheckBox
            style={styles1.checkbox}
            value={entregue}
            onValueChange={value => setEntregue(value)}
          />
          <Text style={styles1.label}>Aparelho entregue!</Text>
        </View>
        <Button title="Enviar" onPress={createClient} />
      </SafeAreaView>
    </>
  );
};

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

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
