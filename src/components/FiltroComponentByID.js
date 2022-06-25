import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button, ScrollView} from 'react-native';

const FiltroComponentByID = ({navigation}) => {
  const [id, setId] = React.useState();

  const callId = () => {
    navigation.navigate('FormEquipment', {paramKey: id});
  };

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="always">
        <TextInput
          style={styles.input}
          value={id}
          placeholder="ID"
          onChangeText={id => setId(id)}
          defaultValue={id}
        />

        <View style={{marginVertical: 10}}>
          <Button title="Enviar" onPress={() => callId()} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default FiltroComponentByID;
