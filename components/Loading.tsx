import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Constant from './Constants';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={Constant.APP_COLOR} />
    <Text style={styles.centerText}>Loading ...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  centerText: {
    marginTop: 4,
    textAlign: 'center',
  },
});

export default Loading;
