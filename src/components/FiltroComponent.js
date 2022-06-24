import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {FIND_ALL_EQUIPMENT_BY_CLIENT} from '../util/urls';

class FiltroComponent extends Component {
  numeroOS = () => {
    const {navigation} = this.props;
    navigation.navigate('filtroComponentByID');
  };
  dataEntrada = () => {
    const {navigation} = this.props;
    navigation.navigate('FiltroComponentDataEntrada');
    console.log('ola');
  };
  listClient = () => {
    const {navigation} = this.props;
    navigation.navigate('ClientList');
  };
  render() {
    return (
      <>
        <Text>Aparelho do cliente _</Text>
        <ScrollView>
          <View style={{marginVertical: 10}}>
            <Button title="All Clients" onPress={() => this.listClient()} />
          </View>
          <View style={{marginVertical: 10}}>
            <Button title="por numero de os " onPress={() => this.numeroOS()} />
          </View>
          <View style={{marginVertical: 10}}>
            <Button
              title="por data de entrada "
              onPress={() => this.dataEntrada()}
            />
          </View>
        </ScrollView>
      </>
    );
  }
}

export default FiltroComponent;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 3,
    backgroundColor: '#d9f9b1',
    alignItems: 'center',
  },
  text: {
    color: '#4f603c',
  },
});
