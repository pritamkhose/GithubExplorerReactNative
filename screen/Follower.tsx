import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Services from '../api/Services';
import {AppContext} from '../app/AppContext';
import Constants from '../app/Constants';
import FastImageLoad from '../components/FastImageLoad';
import Loading from '../components/Loading';
import {Props, UserLoginItem} from '../model/models';
import styles from './Styles.styles';

const Follower = ({route}: Props) => {
  const navigation = useNavigation();
  const [searchUser, setSearchUser] = useContext(AppContext);

  const [isLoading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [aList, setList] = useState<UserLoginItem[]>([]);

  useEffect(() => {
    getData(searchUser);
  }, [route, searchUser]);

  function getData(name: string) {
    Services.getUserFollowers(name)
      .then((response: any) => {
        setLoading(false);
        if (response && response.length !== 0) {
          setErrorMsg('');
          setList(response);
        } else {
          setErrorMsg(Constants.NothingFound);
        }
      })
      .catch(() => {
        setLoading(false);
        setErrorMsg(Constants.WentWrong);
      });
  }

  return (
    <View style={styles.containerCenter}>
      {isLoading ? (
        <Loading />
      ) : aList === undefined ? (
        <Text>{errorMsg}</Text>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => getData(searchUser)}
            />
          }
        >
          {aList.map((item: UserLoginItem, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => openDetails(item.login, item.avatar_url)}
            >
              <View style={styles.carditem}>
                <FastImageLoad style={styles.iconImg} uri={item.avatar_url} />
                <Text style={styles.iconText}>{item.login}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );

  function openDetails(username: string, url: string) {
    setSearchUser(username);
    navigation.dispatch(
      CommonActions.navigate({
        name: Constants.NAVIGATE_SCREEN.UserDetails,
        params: {
          username: username,
          avatar_url: url,
        },
      }),
    );
  }
};

export default Follower;
