import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import Services from '../api/Services';
import Constants from '../components/Constants';
import FastImageLoad from '../components/FastImageLoad';
import Loading from '../components/Loading';
import { UserLoginItem } from '../model/models';

type Props = {
  route: any;
};

const Following = ({ route }: Props) => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [username, setUsername] = useState('');
  const [aList, setList] = useState<UserLoginItem[]>([]);

  useEffect(() => {
    setUsername(route.params.username)
    getData(route.params.username);
  }, [route]);

  function getData(name: string) {
    Services.getUserFollowing(name)
      .then((response: any) => {
        setLoading(false);
        if (response && response.length !== 0) {
          setErrorMsg('');
          setList(response);
        } else {
          setErrorMsg('Nothing Found!');
        }
      }).catch((error: any) => {
        setLoading(false);
        setErrorMsg('Something is wrong with the server!');
      });
  }

  return (
    <View style={styles.container}>
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
              onRefresh={() => getData(username)}
            />
          }>
          {aList.map((item: UserLoginItem, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => openDetails(item.login, item.avatar_url)}>
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
    navigation.dispatch(
      CommonActions.navigate({
        name: Constants.NAVIGATE_SCREEN.UserDetails,
        params: {
          username: username, avatar_url: url
        },
      })
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carditem: {
    flexDirection: 'row',
    marginVertical: 5,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  iconImg: {
    width: 50,
    height: 50,
  },
  iconText: {
    padding: 10,
    color: 'black',
    fontSize: 16,
  },
});

export default Following;
