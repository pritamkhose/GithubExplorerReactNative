import React, {useEffect, useState} from 'react';
import {Alert, BackHandler, Linking, StyleSheet, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {WebView} from 'react-native-webview';
import Loading from '../components/Loading';

const WebScreen = () => {
  const uri = 'https://pritamkhose.github.io/GithubExplorerReactNativeWeb/';
  const [userAgent, setUserAgent] = useState('');

  useEffect(() => {
    DeviceInfo.getUserAgent().then(agent => {
      setUserAgent(agent);
    });
    const backhandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );
    return () => {
      backhandler.remove();
    };
  }, []);

  return (
    <View style={styles.containerWeb}>
      <WebView
        startInLoadingState={true}
        renderLoading={() => (
          <Loading />
        )}
        source={{uri}}
        userAgent={userAgent}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
        onShouldStartLoadWithRequest={event => {
          if (event.url.startsWith(uri)) {
            return true;
          } else {
            Linking.openURL(event.url);
            return false;
          }
        }}
        onHttpError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          Alert.alert('Something went wrong.', nativeEvent.statusCode + ' - ' + nativeEvent.url + ' ' + nativeEvent.description, [
            {text: 'Cancel', style: 'cancel'},
          ]);
        }}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          Alert.alert('Something went wrong.', nativeEvent.code + ' - ' + nativeEvent.url + ' ' + nativeEvent.description, [
            {text: 'Cancel', style: 'cancel'},
          ]);
        }}
        style={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerWeb: {
    flex: 1,
  },
});

export default WebScreen;
