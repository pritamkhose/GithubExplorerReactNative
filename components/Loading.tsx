import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Constant from '../app/Constants';

const Loading = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Constant.APP_COLOR} />
      <Text style={styles.centerText}>{t('loading')} ...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  centerText: {
    marginTop: 4,
    textAlign: 'center',
  },
});

export default Loading;
