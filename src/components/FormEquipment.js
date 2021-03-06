import React from 'react';
import {StyleSheet, TextInput, Text, View, Alert} from 'react-native';
import {Button, ScrollView} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

import {
  CREATE_CLIENT,
  CREATE_EQUIPMENT,
  FIND_BY_ID_CLIENT,
  FIND_EQUIPMENT_BY_CLIENT,
  UPDATE_CLIENT,
} from '../util/urls';
import {
  createNewClient,
  createNewEquipment,
  updateCliente,
  updateEquipment,
} from '../actions/callApi';
import ListEquipment from './ListEquipment';
import {useEffect} from 'react';

const FormEquipment = ({route, navigate}) => {
  console.log(route.params.paramKey);
  const [name, setName] = React.useState();
  const [telefone, setTelefone] = React.useState();
  const [id, setId] = React.useState();
  const [idEquipment, setIdEquipment] = React.useState();
  const [email, setEmail] = React.useState();
  const [cpf, setCpf] = React.useState();
  const [preco, setPreco] = React.useState();
  const [defect_for_repair, setDefeito] = React.useState();
  const navigation = useNavigation();
  const [equipamento, setEquipamento] = React.useState();
  const [brand, setBrand] = React.useState();
  const [pronto, setPronto] = React.useState(false);
  const [autorizado, setAutorizado] = React.useState(false);
  const [entregue, setEntregue] = React.useState(false);

  const listEquipment = () => {
    // navigation.navigate('ListEquipment', {paramKey: route.params.paramKey});
  };
  const findClient = async id => {
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

    if (json.id != null && json.id != 0) {
      setName(json.name);
      setEmail(json.email);
      setCpf(json.cpf);
      setId(json.id);
      setTelefone(json.telefone);

      const responseT = await fetch(FIND_EQUIPMENT_BY_CLIENT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      const jsonEquipment = await responseT.json();
      setIdEquipment(jsonEquipment.id);
      setBrand(jsonEquipment.brand);
      setDefeito(jsonEquipment.defect_for_repair);
      setEquipamento(jsonEquipment.model);
      setPronto(jsonEquipment.pronto);
      setEntregue(jsonEquipment.entregue);
      console.log('aquiii maiquel');
      var valor = jsonEquipment.cost_value;
      valor = valor.replace('0000000000', '');
      valor = valor.replace('.', '');
      console.log(jsonEquipment.cost_value);
      console.log(valor);
      setPreco(valor);
    }
  };

  useEffect(() => {
    console.log('I have been mounted');
    if (route.params.paramKey != 0 && route.params.paramKey != null)
      findClient(route.params.paramKey);
  }, [route.params.paramKey]);
  // findClient(route.params.paramKey);
  const createClient = async () => {
    var idClient = id;
    var aparelhoEntregue = null;
    if (entregue == true) {
      const d = new Date();
      d.getTime();
      aparelhoEntregue = d.toISOString().substring(0, 10);
    }

    //if com opcao de edicao
    if (id != null && id != 0) {
      idClient = await updateCliente(id, name, email, cpf, telefone);
      console.log('valor de pronto ------- ');
      console.log(pronto);
      await updateEquipment(
        idEquipment,
        brand,
        entregue,
        defect_for_repair,
        preco,
        aparelhoEntregue,
        equipamento,
        pronto,
      );
    } else {
      //se nao cria cliente
      idClient = await createNewClient(name, email, cpf, telefone);
      await createNewEquipment(
        idClient,
        brand,
        entregue,
        defect_for_repair,
        preco,
        aparelhoEntregue,
        equipamento,
      );
      setName('');
      setEmail('');
      setBrand('');
      setCpf('');
      setTelefone('');
      setPreco('');
      setDefeito('');
      setEquipamento('');
      setEntregue(false);
      setPronto(false);
      alert('Cadastro realizado com sucesso!');
    }
  };
  return (
    <>
      <ScrollView keyboardShouldPersistTaps="always">
        <TextInput
          style={styles.input}
          editable={!entregue}
          placeholder="Nome"
          value={name}
          onChangeText={name => setName(name)}
          defaultValue={name}
        />
        <TextInput
          editable={!entregue}
          style={styles.input}
          value={telefone}
          placeholder="Telefone"
          onChangeText={telefone => setTelefone(telefone)}
          defaultValue={telefone}
        />
        <TextInput
          editable={!entregue}
          style={styles.input}
          value={email}
          placeholder="Email"
          onChangeText={email => setEmail(email)}
          defaultValue={email}
        />
        <TextInput
          editable={!entregue}
          style={styles.input}
          value={cpf}
          placeholder="Cpf"
          onChangeText={cpf => setCpf(cpf)}
          defaultValue={cpf}
        />
        <TextInput
          editable={!entregue}
          style={styles.input}
          value={brand}
          placeholder="Marca"
          onChangeText={newBrand => setBrand(newBrand)}
          defaultValue={brand}
        />
        <TextInput
          editable={!entregue}
          style={styles.input}
          value={equipamento}
          placeholder="Equipamento"
          onChangeText={equipamento => setEquipamento(equipamento)}
          defaultValue={equipamento}
        />
        <TextInput
          editable={!entregue}
          style={styles.input}
          value={preco}
          placeholder="Preco"
          onChangeText={newPreco => setPreco(newPreco)}
          defaultValue={preco}
        />
        <TextInput
          editable={!entregue}
          style={styles.input}
          value={defect_for_repair}
          placeholder="Defeito"
          onChangeText={defect_for_repair => setDefeito(defect_for_repair)}
          defaultValue={defect_for_repair}
        />
        <View style={styles1.checkboxContainer}>
          <CheckBox
            editable={!entregue}
            style={styles1.checkbox}
            value={pronto}
            onValueChange={value => setPronto(value)}
          />
          <Text style={styles1.label}>Aparelho pronto!</Text>
        </View>
        <View style={styles1.checkboxContainer}>
          <CheckBox
            editable={!entregue}
            style={styles1.checkbox}
            value={entregue}
            onValueChange={value => setEntregue(value)}
          />
          <Text style={styles1.label}>Aparelho entregue!</Text>
        </View>

        <View style={{marginVertical: 10}}>
          <Button title="Enviar" onPress={createClient} />
        </View>
        <View style={{marginVertical: 10}}>
          <Button
            disabled={entregue}
            style={stylesButton}
            title="Mostrar lista de equipamento"
            onPress={() => listEquipment()}
          />
        </View>
      </ScrollView>
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
