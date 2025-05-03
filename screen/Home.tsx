import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  BackHandler,
  Image,
  Keyboard,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Services from '../api/Services';
import Constants from '../app/Constants';
import FastImageLoad from '../components/FastImageLoad';
import LangPopup from '../components/LangPopup';
import Loading from '../components/Loading';
import styles from './Styles.styles';

export interface Props {
  navigation: any;
}

export interface State {
  serachTxt: string;
  isLoading: boolean;
  errorMsg: string;
  aList: [];
}

export interface UserItem {
  login: string;
  avatar_url: string;
}

const Home = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [state, setState] = useState({
    serachTxt: 'android',
    isLoading: true,
    errorMsg: '',
    aList: [],
  });
  const [isLangPopup, setLangPopup] = useState(false);

  useEffect(() => {
    getData();
  }, [navigation, t]);

  const getSearch = () => {
    // Hide that keyboard!
    Keyboard.dismiss();
    if (state.serachTxt.length === 0) {
      showAlert(t('inputSearchValid'));
    } else {
      getData();
    }
  };

  const getData = () => {
    Services.getUserSearch(state.serachTxt, 1)
      .then((response: any) => {
        if (response && response.total_count !== 0) {
          setState({
            ...state,
            isLoading: false,
            aList: response.items,
          });
          setState({
            ...state,
            isLoading: false,
            aList: [],
            errorMsg: t('nothingFound'),
          });
        }
        setState({
          ...state,
          isLoading: false,
          aList: [],
          errorMsg: t('nothingFound'),
        });
      });
  };

  const showAlert = (msg: string) => {
    Alert.alert(
      '',
      msg,
      [
        {
          text: t('cancel'),
          onPress: () => '',
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  const openDetails = (txt: string, avatar_url: string) => {
    console.log('openDetails -->', txt);
    navigation.dispatch(
      CommonActions.navigate({
        name: Constants.NAVIGATE_SCREEN.UserDetails,
        params: {
          username: txt,
          avatar_url: avatar_url,
        },
      }),
    );
  };

  return (
    <>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#1970B6" /> */}
      <View style={styles.container}>
        <View style={styles.searchrow}>
          <TextInput
            style={styles.textInput}
            placeholder={t('inputSearch')}
            underlineColorAndroid="transparent"
            onChangeText={text => setState({ ...state, serachTxt: text })}
            onSubmitEditing={getData}
          />
          <TouchableOpacity onPress={() => getSearch()}>
            <Image
              style={styles.iconSearchImg}
              source={require('../assets/images/search80.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.dispatch(
              CommonActions.navigate({
                name: Constants.NAVIGATE_SCREEN.WebScreen,
              }),
            );
          }}>
            <Image
              style={styles.iconImgInfo}
              source={require('../assets/images/info80.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setLangPopup(!isLangPopup);
          }}>
            <Image
              style={styles.iconImgLang}
              source={require('../assets/images/globe.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          {state.isLoading ? (
            <Loading />
          ) : state.aList && state.aList.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={state.isLoading}
                  onRefresh={getData}
                />
              }
            >
              {state.aList.map((item: UserItem, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    openDetails(item.login, item.avatar_url)
                  }
                >
                  <View style={styles.carditem}>
                    <FastImageLoad
                      style={styles.iconImg}
                      uri={item.avatar_url}
                    />
                    <Text style={styles.login}>{item.login}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Text>{state.errorMsg}</Text>
          )}
        </View>
        {isLangPopup && <LangPopup onClose={() => setLangPopup(false)} />}
      </View>
    </>
  );
};

export default Home;
