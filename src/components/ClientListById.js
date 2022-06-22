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
import axios from 'axios';
import {FIND_ALL_CLIENT, FIND_BY_ID_CLIENT} from '../util/urls';

const ClientListById = () => {
  const [clientList1, setClientList1] = React.useState([
    {name: 'Maiquel', id: 1},
  ]);
  const [name, setName] = React.useState();
  const route = useRoute();
  //var client = {id: 1, name: 'maiquel'};

  const _onRefresh = (name1, id1) => {
    console.log('');
  };

  useEffect(() => {
    console.log('I have been mounted');
    const params1 = route.params.id;
    console.log('componentDidMount1234');
    console.log('componentDidMount');

    console.log('valor = ' + params1);
    axios({
      method: 'post',
      url: FIND_BY_ID_CLIENT,
      headers: {
        'Content-type': 'application/json',
      },
      data: {id: Number(params1)},
    }).then(response => {
      console.log(response.data);
      setClientList1([response.data]);
      //doIt(response.data.id, response.data.name);
    });
    // axios.post(FIND_BY_ID_CLIENT, {id: valor}).then(response => {
    //   this.setState({
    //     client: response.data,
    //   });
    //   console.log(response.data);
    // });
  }, [route.params.id]);

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
          <TouchableOpacity key={item.id} style={styles.container}>
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

export default ClientListById;

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
