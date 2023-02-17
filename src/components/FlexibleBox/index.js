import React, {useState} from 'react';

import {Modal, Text, View, TouchableOpacity} from 'react-native';


export default function CustomAlert({
  displayTitle,
  displayMsg,
  visibility,
  dismissAlert,
}) {
  return (
    <View>
      <Modal
        visible={visibility}
        animationType={'fade'}
        transparent={true}
        animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'white',
              marginVertical:10,
              width: '90%',
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 7,
              elevation: 10,
            }}>
            <View style={{alignItems: 'center', margin: 10}}>
              <Text style={{fontSize: 18, marginTop: 5}}>
                {displayMsg}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

