import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Buttons = ({ titleback, titlenext, pressback, pressnext, backgroundColor }) => {
  return (
    <View>
      <View style={{ width: '100%' }}>
        <TouchableOpacity
          onPress={pressnext}
          style={{
            backgroundColor: backgroundColor,
            fontSize: 20,
            alignSelf: 'center',
            textAlign: 'center',
            color: ' ',
            marginTop: 40,
            marginBottom: 30,
            padding: 12,
            borderRadius: 30,
            width: '50%',
            elevation: 5,
          }}>
            <Text>
          {titlenext}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({});
