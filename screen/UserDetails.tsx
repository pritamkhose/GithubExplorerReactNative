import {CommonActions, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useContext, useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Linking,
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
import {Props, UserDetailObject} from '../model/models';
import styles from './UserDetails.styles';

const UserDetails = ({route}: Props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [searchUser, setSearchUser] = useContext(AppContext);

  const [isLoading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [username, setUsername] = useState('');
  const [avatar_url, setAvatarURL] = useState('');
  const [aObj, setObj] = useState<UserDetailObject>();

  useEffect(() => {
    console.log('searchUser >>> ', JSON.stringify(searchUser));
    setUsername(route.params.username);
    setSearchUser(route.params.username);
    setAvatarURL(route.params.avatar_url);
    getData(route.params.username, route.params.avatar_url);
  }, [route, searchUser, setSearchUser]);

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
          setErrorMsg(t('nothingFound'));
        }
      })
      .catch(() => {
        setLoading(false);
        setErrorMsg(t('wentWrong'));
      });
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        [
          aObj === null ? (
            <Text key="Text">{errorMsg}</Text>
          ) : (
            <ScrollView
              key="ScrollView"
              contentContainerStyle={styles.flexGrow}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={() => getData(username, avatar_url)}
                />
              }
            >
              <>
                <View style={styles.carditem}>
                  <View style={styles.flexDirectionRow}>
                    <FastImageLoad style={styles.iconImg} uri={avatar_url} />
                    <View
                      style={[
                        aObj?.name == null
                          ? styles.cardDataMinHight
                          : styles.cardData,
                      ]}
                    >
                      <Text style={styles.textblue}>{aObj?.name}</Text>
                      <View style={styles.flexDirectionRow}>
                        <Text style={styles.textblack}>{aObj?.bio}</Text>
                      </View>
                      <Text style={styles.textblack}>{aObj?.location}</Text>
                    </View>
                  </View>
                  {[
                    aObj?.email != null ? (
                      <View style={styles.rowData} key="email">
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
                                t('appName') +
                                '&body=' +
                                `Hi ${username},\n\nThanks & Regards,\n\n`,
                            )
                          }
                        >
                          <Text style={styles.textblack}>{aObj.email}</Text>
                        </TouchableOpacity>
                      </View>
                    ) : null,
                  ]}
                  {[
                    aObj?.blog ? (
                      <View style={styles.rowData} key="blog">
                        <Image
                          style={styles.iconSize}
                          source={require('../assets/images/info80.png')}
                        />
                        <TouchableOpacity
                          onPress={() => Linking.openURL(aObj.blog)}
                        >
                          <Text style={styles.textblack}>{aObj.blog}</Text>
                        </TouchableOpacity>
                      </View>
                    ) : null,
                  ]}
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
                    style={styles.carditem}
                  >
                    <Text style={styles.textCount}>{aObj?.followers}</Text>
                    <View style={styles.imgtxt}>
                      <Image
                        style={styles.iconSize}
                        source={require('../assets/images/adduser80.png')}
                      />
                      <Text>{t('Follower')}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => openDetails('o', aObj?.following)}
                    style={styles.carditem}
                  >
                    <Text style={styles.textCount}>{aObj?.following}</Text>
                    <View style={styles.imgtxt}>
                      <Image
                        style={styles.iconSize}
                        source={require('../assets/images/checkeduser80.png')}
                      />
                      <Text>{t('Following')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.flexDirectionRow}>
                  <TouchableOpacity
                    onPress={() => openDetails('g', aObj?.public_gists)}
                    style={styles.carditem}
                  >
                    <Text style={styles.textCount}>{aObj?.public_gists}</Text>
                    <View style={styles.imgtxt}>
                      <Image
                        style={styles.iconSize}
                        source={require('../assets/images/code80.png')}
                      />
                      <Text>{t('PublicGist')}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => openDetails('r', aObj?.public_repos)}
                    style={styles.carditem}
                  >
                    <Text style={styles.textCount}>{aObj?.public_repos}</Text>
                    <View style={styles.imgtxt}>
                      <Image
                        style={styles.iconSize}
                        source={require('../assets/images/repository80.png')}
                      />
                      <Text>{t('Repositories')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            </ScrollView>
          ),
        ]
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

export default UserDetails;
