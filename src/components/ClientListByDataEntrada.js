import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Button,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {
  FIND_ALL_CLIENT,
  FIND_BY_ID_CLIENT,
  EQUIPMENT_FIND_DATA_ENTRADA,
} from '../util/urls';

const ClientListByDataEntrada = () => {
  const [clientList1, setClientList1] = React.useState([]);
  const [clientId, setClientId] = React.useState();
  const navigation = useNavigation();
  const [name, setName] = React.useState();
  const route = useRoute();
  //var client = {id: 1, name: 'maiquel'};

  const _onRefresh = (name1, id1) => {
    console.log('');
  };
  const redirectToEdit = id => {
    navigation.navigate('FormEquipment', {paramKey: id});
  };
  const alertItemName = item => {
    alert(item.name);

    redirectToEdit(item.id);
  };
  useEffect(() => {
    console.log('I have been mounted');

    const params2 = route.params.data_entrada;
    console.log('componentDidMount1234');
    console.log('componentDidMount');

    //console.log('valor = ' + params1);

    axios({
      method: 'post',
      url: EQUIPMENT_FIND_DATA_ENTRADA,
      headers: {
        'Content-type': 'application/json',
      },
      data: {data_entrada: params2},
    }).then(response1 => {
      //doIt(response.data.id, response.data.name);
      console.log('response1  -  ');
      console.log(response1.data);
      console.log('foi');
      for (let i = 0; i < response1.data.length; i++) {
        console.log(response1.data[i].client_id);
        console.log('end');
        setClientId(response1.data.client_id);

        axios({
          method: 'post',
          url: FIND_BY_ID_CLIENT,
          headers: {
            'Content-type': 'application/json',
          },
          data: {id: Number(response1.data[i].client_id)},
        }).then(response => {
          console.log(response.data);
          setClientList1([response.data]);
          //doIt(response.data.id, response.data.name);
        });
      }
    });

    // axios.post(FIND_BY_ID_CLIENT, {id: valor}).then(response => {
    //   this.setState({
    //     client: response.data,
    //   });
    //   console.log(response.data);
    // });
  }, [route.params.data_entrada, clientId]);

  // redirectToHome = () => {
  //   const {navigation} = this.props;
  //   navigation.navigate('FormEquipment', {paramKey: 0}, navigation);
  // };
  // redirectToEdit = id => {
  //   const {navigation} = this.props;
  //   navigation.navigate('FormEquipment', {paramKey: id});
  // };

  // //   console.log("maiqul")
  //   //   // this.setState({refreshing: true});
  //   //   // axios.get(FIND_BY_ID_CLIENT).then(response => {
  //   //   //   this.setState({
  //   //   //     client: response.data,
  //   //   //   });
  //   //   //   this.setState({refreshing: false});
  //   //   //   console.log(response.data);
  //   //   // });
  // };
  // alertItemName = item => {
  //   alert(item.name);
  //   this.setState({refreshing: false});
  //   this.redirectToEdit(item.id);
  // };

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this._onRefreshing}
            onRefresh={this._onRefresh}
          />
        }>
        {clientList1.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.container}
            onPress={() => alertItemName(item)}>
            <Text style={styles.text}>
              {item.name} - {item.id}{' '}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Button
        onPress={this.redirectToHome}
        title="Adicionar equipamento"
        color="#841584"
      />
    </>
  );
};

export default ClientListByDataEntrada;

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
