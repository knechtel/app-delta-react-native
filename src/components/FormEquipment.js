import React from 'react';
import {StyleSheet, TextInput, Text, View, Alert} from 'react-native';
import {Button, SafeAreaView} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

import {CREATE_CLIENT, CREATE_EQUIPMENT, FIND_BY_ID_CLIENT} from '../util/urls';
import ListEquipment from './ListEquipment';

const FormEquipment = ({route, navigate}) => {
  console.log(route.params.paramKey);
  const [name, setName] = React.useState();
  const [id, setId] = React.useState();
  const [email, setEmail] = React.useState();
  const [cpf, setCpf] = React.useState();
  const [preco, setPreco] = React.useState();
  const navigation = useNavigation();
  const [brand, setBrand] = React.useState();
  const [pronto, setPronto] = React.useState(false);
  const [autorizado, setAutorizado] = React.useState(false);
  const [entregue, setEntregue] = React.useState(false);

  const listEquipment = () => {
    navigation.navigate('ListEquipment', {paramKey: route.params.paramKey});
  };
  const findClient = async id => {
    console.log('Meu deus estou aqui !!!' + id);

    const response = await fetch(FIND_BY_ID_CLIENT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    const json = await response.json();
    console.log('Meu deus estou aqui **********!!!' + json.id);
    console.log('Meu deus estou aqui **********123!!!' + json.name);

    if (json.id != null && json.id != 0) {
      setName(json.name);
      setEmail(json.email);
      setCpf(json.cpf);
      setId(json.id);
      console.log('Olhar aquiiiiii');
      console.log(json.id);
    }
  };
  findClient(route.params.paramKey);
  const createClient = async () => {
    var idClient = id;
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

    // await axios({
    //   method: 'post',
    //   url: CREATE_EQUIPMENT,
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   data: {
    //     idClient: idClient,
    //     brand: brand,
    //     entregue: aparelhoEntregue,
    //   },
    // });

    console.log('Maiquel passei aqui...' + idClient);
  };
  return (
    <>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={name => setName(name)}
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
        <TextInput
          style={styles.input}
          value={preco}
          placeholder="Preco"
          onChangeText={preco => setPreco(preco)}
          defaultValue={preco}
        />
        <View style={styles1.checkboxContainer}>
          <CheckBox
            style={styles1.checkbox}
            value={pronto}
            onValueChange={value => setPronto(value)}
          />
          <Text style={styles1.label}>Aparelho pronto!</Text>
        </View>
        <View style={styles1.checkboxContainer}>
          <CheckBox
            style={styles1.checkbox}
            value={entregue}
            onValueChange={value => setEntregue(value)}
          />
          <Text style={styles1.label}>Aparelho entregue!</Text>
        </View>
        <View style={styles1.checkboxContainer}>
          <CheckBox
            style={styles1.checkbox}
            value={autorizado}
            onValueChange={value => setAutorizado(value)}
          />
          <Text style={styles1.label}>Aparelho autorizado!</Text>
        </View>

        <View style={{marginVertical: 10}}>
          <Button title="Enviar" onPress={createClient} />
        </View>
        <View style={{marginVertical: 10}}>
          <Button
            style={stylesButton}
            title="Mostrar lista de equipamento"
            onPress={() => listEquipment()}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const stylesButton = StyleSheet.create({
  button: {
    marginBottom: 20,
    padding: 30,
  },
});

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
