/* eslint-disable react-hooks/exhaustive-deps */
import {CommonActions, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Services from '../api/Services';
import {AppContext} from '../app/AppContext';
import Constants from '../app/Constants';
import FastImageLoad from '../components/FastImageLoad';
import Loading from '../components/Loading';
import {Props, UserDetailObject} from '../model/models';

const UserDetails = ({route}: Props) => {
  const navigation = useNavigation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchUser, setSearchUser] = useContext(AppContext);

  const [isLoading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [username, setUsername] = useState('');
  const [avatar_url, setAvatarURL] = useState('');
  const [aObj, setObj] = useState<UserDetailObject>();

  useEffect(() => {
    setUsername(route.params.username);
    setSearchUser(route.params.username);
    setAvatarURL(route.params.avatar_url);
    getData(route.params.username, route.params.avatar_url);
  }, [route]);

  function getData(name: string, url: string) {
    setLoading(true);
    console.log(url);
    Services.getUserDetails(name)
      .then((response: any) => {
        setLoading(false);
        if (response) {
          setErrorMsg('');
          setObj(response);
        } else {
          setErrorMsg('Nothing Found!');
        }
      })
      .catch(() => {
        setLoading(false);
        setErrorMsg('Something is wrong with the server!');
      });
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : aObj === null ? (
        <Text>{errorMsg}</Text>
      ) : (
        <ScrollView
          contentContainerStyle={styles.flexGrow}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => getData(username, avatar_url)}
            />
          }>
          <>
            <View style={styles.carditem}>
              <View style={styles.flexDirectionRow}>
                <FastImageLoad style={styles.iconImg} uri={avatar_url} />
                <View
                  style={
                    aObj?.name == null
                      ? styles.cardDataMinHight
                      : styles.cardData
                  }>
                  <Text style={styles.textblue}>{aObj?.name}</Text>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.textblack}>{aObj?.bio}</Text>
                  </View>
                  <Text style={styles.textblack}>{aObj?.location}</Text>
                </View>
              </View>
              {aObj?.email != null ? (
                <View style={styles.rowData}>
                  <Image
                    style={styles.iconSize}
                    source={require('../assets/images/email96.png')}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        'mailto:' +
                          aObj.email +
                          '?subject=' +
                          Constants.APP_NAME +
                          '&body=' +
                          `Hi ${username},\n\nThanks & Regards,\n\n`,
                      )
                    }>
                    <Text style={styles.textblack}>{aObj.email}</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              {aObj?.blog ? (
                <View style={styles.rowData}>
                  <Image
                    style={styles.iconSize}
                    source={require('../assets/images/info80.png')}
                  />
                  <TouchableOpacity onPress={() => Linking.openURL(aObj.blog)}>
                    <Text style={styles.textblack}>{aObj.blog}</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              <View style={styles.rowData}>
                <Image
                  style={styles.iconSize}
                  source={require('../assets/images/create80.png')}
                />
                <Text style={styles.textblack}>
                  Joined at :{' '}
                  {moment(aObj?.created_at).format('DD:MM:YYYY HH:mm A')}
                </Text>
              </View>
              <View style={styles.rowData}>
                <Image
                  style={styles.iconSize}
                  source={require('../assets/images/clock80.png')}
                />
                <Text style={styles.textblack}>
                  Updated at :{' '}
                  {moment(aObj?.updated_at).format('DD:MM:YYYY HH:mm A')}
                </Text>
              </View>
            </View>
            <View style={styles.flexDirectionRow}>
              <TouchableOpacity
                onPress={() => openDetails('f', aObj?.followers)}
                style={styles.carditem}>
                <Text style={styles.textCount}>{aObj?.followers}</Text>
                <View style={styles.imgtxt}>
                  <Image
                    style={styles.iconSize}
                    source={require('../assets/images/adduser80.png')}
                  />
                  <Text>{Constants.TEXT.Follower}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openDetails('o', aObj?.following)}
                style={styles.carditem}>
                <Text style={styles.textCount}>{aObj?.following}</Text>
                <View style={styles.imgtxt}>
                  <Image
                    style={styles.iconSize}
                    source={require('../assets/images/checkeduser80.png')}
                  />
                  <Text>{Constants.TEXT.Following}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.flexDirectionRow}>
              <TouchableOpacity
                onPress={() => openDetails('g', aObj?.public_gists)}
                style={styles.carditem}>
                <Text style={styles.textCount}>{aObj?.public_gists}</Text>
                <View style={styles.imgtxt}>
                  <Image
                    style={styles.iconSize}
                    source={require('../assets/images/code80.png')}
                  />
                  <Text>{Constants.TEXT.PublicGist}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openDetails('r', aObj?.public_repos)}
                style={styles.carditem}>
                <Text style={styles.textCount}>{aObj?.public_repos}</Text>
                <View style={styles.imgtxt}>
                  <Image
                    style={styles.iconSize}
                    source={require('../assets/images/repository80.png')}
                  />
                  <Text>{Constants.TEXT.Repositories}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        </ScrollView>
      )}
    </View>
  );

  function openDetails(screen: string, count: any) {
    if (count != null && count !== 0) {
      if (screen === 'r') {
        navigation.dispatch(
          CommonActions.navigate({
            name: Constants.NAVIGATE_SCREEN.Repositories,
            params: {
              username: username,
            },
          }),
        );
      } else if (screen === 'g') {
        navigation.dispatch(
          CommonActions.navigate({
            name: Constants.NAVIGATE_SCREEN.PublicGist,
            params: {
              username: username,
            },
          }),
        );
      } else if (screen === 'f') {
        navigation.dispatch(
          CommonActions.navigate({
            name: Constants.NAVIGATE_SCREEN.Follower,
            params: {
              username: username,
            },
          }),
        );
      } else if (screen === 'o') {
        navigation.dispatch(
          CommonActions.navigate({
            name: Constants.NAVIGATE_SCREEN.Following,
            params: {
              username: username,
            },
          }),
        );
      }
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carditem: {
    flex: 1,
    margin: 6,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  cardData: {
    flexDirection: 'column',
    paddingVertical: 4,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  cardDataMinHight: {
    flexDirection: 'column',
    paddingVertical: 4,
    paddingHorizontal: 20,
    maxHeight: 60,
  },
  textblack: {
    color: 'black',
    fontSize: 14,
    padding: 4,
    flex: 1,
  },
  textblue: {
    color: Constants.APP_COLOR,
    fontSize: 20,
    padding: 4,
  },
  rowData: {
    flexDirection: 'row',
    paddingBottom: 4,
    alignItems: 'center',
  },
  iconSize: {
    width: 20,
    height: 20,
    marginEnd: 4,
  },
  iconImg: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
  textCount: {
    fontSize: 20,
    textAlign: 'center',
  },
  imgtxt: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 4,
    justifyContent: 'center',
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
});

export default UserDetails;
