import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Button,
} from 'react-native';

import axios from 'axios';
import {FIND_ALL_CLIENT, FIND_BY_ID_CLIENT} from '../util/urls';

class ClientListById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {},
      refreshing: false,
    };
  }
  redirectToHome = () => {
    const {navigation} = this.props;
    navigation.navigate('FormEquipment', {paramKey: 0}, navigation);
  };
  redirectToEdit = id => {
    const {navigation} = this.props;
    navigation.navigate('FormEquipment', {paramKey: id});
  };
  _onRefresh = () => {
    this.setState({refreshing: true});
    axios.get(FIND_BY_ID_CLIENT).then(response => {
      this.setState({
        client: response.data,
      });
      this.setState({refreshing: false});
      console.log(response.data);
    });
  };

  async componentDidMount() {
    console.log('componentDidMount1234');
    console.log('componentDidMount');
    var valor = this.props.route.params;

    await axios({
      method: 'post',
      url: FIND_BY_ID_CLIENT,
      headers: {
        'Content-type': 'application/json',
      },
      data: {id: Number(valor)},
    }).then(response => {
      console.log(response.data.cpf);
    });
    // axios.post(FIND_BY_ID_CLIENT, {id: valor}).then(response => {
    //   this.setState({
    //     client: response.data,
    //   });
    //   console.log(response.data);
    // });
  }
  alertItemName = item => {
    alert(item.name);
    this.setState({refreshing: false});
    this.redirectToEdit(item.id);
  };
  render() {
    return (
      <>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <TouchableOpacity
            key={this.state.client.id}
            style={styles.container}
            onPress={() => this.alertItemName(this.state.client)}>
            <Text style={styles.text}>
              {this.state.client.name} - {this.state.client.id}{' '}
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <Button
          onPress={this.redirectToHome}
          title="Adicionar equipamento"
          color="#841584"
        />
      </>
    );
  }
}

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
