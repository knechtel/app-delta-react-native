import React, {Component} from 'react';
import {Button, SafeAreaView, TextInput, StyleSheet} from 'react-native';
import {Text} from 'react-native';
class FormOnlyEquipment extends Component {
  state = {serial: 'hello world', model: '', defeito: ''};
  componentDidMount() {
    const {navigation, route} = this.props;
    console.log('doChamada()');
    console.log(route.params.paramKey);
  }
  render() {
    const {state} = this;
    const setSerial = serial => this.setState(serial);
    const setModel = model => this.setState(model);
    const setDefeito = defeito => this.setState(defeito);
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
        </SafeAreaView>
      </>
    );
  }
}

export default FormOnlyEquipment;
