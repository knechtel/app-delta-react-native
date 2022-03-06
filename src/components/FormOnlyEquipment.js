import React, {Component} from 'react';
import {Button, SafeAreaView, TextInput, StyleSheet, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Text} from 'react-native';
import axios from 'axios';
import {FIND_BY_ID_EQUIPMENT} from '../util/urls';
class FormOnlyEquipment extends Component {
  state = {
    serial: 'hello world',
    model: '',
    defeito: '',
    pronto: false,
    autorizado: false,
    entregue: false,
  };
  componentDidMount() {
    const {navigation, route} = this.props;
    console.log('doChamada()');
    console.log(route.params.paramKey);
  }
  saveEquipment = () => {
    console.log('mais um teste');
  };
  render() {
    const {state} = this;
    const setSerial = serial => this.setState(serial);
    const setModel = model => this.setState(model);
    const setDefeito = defeito => this.setState(defeito);
    const setPronto = pronto => this.setState(pronto);
    const setAutorizado = autorizado => this.setState(autorizado);
    const setEntregue = entregue => this.setState(entregue);
    const {route} = this.props;
    axios
      .post(FIND_BY_ID_EQUIPMENT, {
        id: route.params.paramKey,
      })
      .then(response => {
        console.log(response.data.listEquipment);
        this.setState({
          model: response.data.model,
        });
      });
    return (
      <>
        <SafeAreaView>
          <TextInput
            placeholder="Serial"
            value={state.serial}
            onChangeText={serial => setSerial(serial)}
            defaultValue={state.serial}
          />
          <TextInput
            value={state.model}
            placeholder="model"
            onChangeText={model => setModel(model)}
            defaultValue={state.model}
          />
          <TextInput
            value={state.defeito}
            placeholder="Defeito"
            onChangeText={defeito => setDefeito(defeito)}
            defaultValue={state.defeito}
          />
          <View style={styles1.checkboxContainer}>
            <CheckBox
              style={styles1.checkbox}
              value={this.pronto}
              onValueChange={value => setPronto(value)}
            />
            <Text style={styles1.label}>Aparelho pronto!</Text>
          </View>
          <View style={styles1.checkboxContainer}>
            <CheckBox
              style={styles1.checkbox}
              value={this.autorizado}
              onValueChange={value => setAutorizado(value)}
            />
            <Text style={styles1.label}>Aparelho autorizado!</Text>
          </View>
          <View style={styles1.checkboxContainer}>
            <CheckBox
              style={styles1.checkbox}
              value={this.entregue}
              onValueChange={value => setEntregue(value)}
            />
            <Text style={styles1.label}>Aparelho entregue!</Text>
          </View>
          <Button title="Enviar" onPress={this.saveEquipment} />
        </SafeAreaView>
      </>
    );
  }
}

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

export default FormOnlyEquipment;
