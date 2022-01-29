import React, {Component} from 'react';
import {Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';
import {FIND_ALL_CLIENT} from '../util/urls';
class ClientList extends Component {
  state = {
    client: [],
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
  };
  render() {
    return (
      <ScrollView>
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
