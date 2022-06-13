/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import ClientList from './components/ClientList';
import FormEquipment from './components/FormEquipment';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListEquipment from './components/ListEquipment';
import FormOnlyEquipment from './components/FormOnlyEquipment';
import FiltroComponent from './components/FiltroComponent';
const Stack = createNativeStackNavigator();

const App = () => {
  const flagComponent = true;

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="filtroComponent"
            component={FiltroComponent}
            options={{title: 'Eletrônica Delta'}}
          />
          <Stack.Screen
            name="ClientList"
            component={ClientList}
            options={{title: 'Eletrônica Delta'}}
          />
          <Stack.Screen
            name="FormEquipment"
            component={FormEquipment}
            options={{title: 'Cadastrar Equipamento'}}
          />
          <Stack.Screen
            name="ListEquipment"
            component={ListEquipment}
            options={{title: 'Cadastrar Equipamento'}}
          />
          <Stack.Screen
            name="FormOnlyEquipment"
            component={FormOnlyEquipment}
            options={{title: 'Cadastrar Equipamento'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
