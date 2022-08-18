import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {ScrollView, StyleSheet, Linking} from 'react-native';
import {PDF_BY_ID} from '../util/urls';

class FiltroComponent extends Component {
  handleClick = id => {
    Linking.canOpenURL(PDF_BY_ID + id).then(supported => {
      if (supported) {
        Linking.openURL(PDF_BY_ID + id);
      } else {
        console.log("Don't know how to open URI: ");
      }
    });
  };
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
          <View style={{marginVertical: 10}}>
            <Button title="PDF" onPress={() => this.numeroOS()} />
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
