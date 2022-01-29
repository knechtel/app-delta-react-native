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

const App = () => {
  const flagComponent = true;
  return <>{flagComponent ? <ClientList /> : <FormEquipment />}</>;
};

export default App;
