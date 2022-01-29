import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import {FIND_ALL_CLIENT} from '../util/urls';

class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: [],
      refreshing: false,
    };
  }
  redirectToHome = () => {
    const {navigation} = this.props;
    navigation.navigate('FormEquipment');
  };
  _onRefresh = () => {
    this.setState({refreshing: true});
    axios.get(FIND_ALL_CLIENT).then(response => {
      this.setState({
        client: response.data,
      });
      this.setState({refreshing: false});
      console.log(response.data);
    });
  };

  componentDidMount() {
    axios.get(FIND_ALL_CLIENT).then(response => {
      this.setState({
        client: response.data,
      });
      console.log(response.data);
    });
  }
  alertItemName = item => {
    alert(item.name);
    this.setState({refreshing: false});
    this.redirectToHome();
  };
  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
        {this.state.client.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.container}
            onPress={() => this.alertItemName(item)}>
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

export default ClientList;

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
