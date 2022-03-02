import React, {Component} from 'react';
import {Text} from 'react-native';
import axios from 'axios';

import {FIND_ALL_EQUIPMENT_BY_CLIENT} from '../util/urls';
class ListEquipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipment: [],
      refreshing: false,
    };
  }
  componentDidMount() {
    axios.get(FIND_ALL_EQUIPMENT_BY_CLIENT).then(response => {
      this.setState({
        equipment: response.data,
      });
    });
  }

  render() {
    return (
      <>
        <Text>Aparelho entregue!</Text>
      </>
    );
  }
}

export default ListEquipment;
