import React, { useEffect, useState } from 'react';
import {
  Image, Linking, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import Services from '../api/Services';
import Constants from '../components/Constants';
import Loading from '../components/Loading';
import { RepoItem } from '../model/models';

type Props = {
  route: any;
};

const Repositories = ({ route }: Props) => {
  const [isLoading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [username, setUsername] = useState('');
  const [aList, setList] = useState<RepoItem[]>([]);

  useEffect(() => {
    setUsername(route.params.username)
    getData(route.params.username);
  }, [route]);

  function getData(name: string) {
    Services.getUserRepos(name)
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
          {aList.map((item: RepoItem, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => Linking.openURL(item.html_url)}>
              <View style={styles.carditem}>
                <Text style={styles.textTitle}>
                  {item.name}
                </Text>
                {item.description && item.description.length > 1 ? (
                  <Text style={styles.textblack}>
                    {item.description}
                  </Text>
                ) : null}
                <View
                  style={styles.viewLang}>
                  <Text
                    style={styles.textLang}>
                    {item.language}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      style={styles.iconImg}
                      source={require('../assets/images/star80.png')}
                    />
                    <Text style={styles.textblack}>
                      {' '}{item.stargazers_count}
                    </Text>
                    <Image
                      style={styles.iconImg}
                      source={require('../assets/images/clock80.png')}
                    />
                    <Text style={styles.textblack}>
                      {' '}
                      {item.watchers_count}
                    </Text>
                    <Image
                      style={styles.iconImg}
                      source={require('../assets/images/codefork96.png')}
                    />
                    <Text style={styles.textblack}> {item.forks}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textblack: {
    color: 'black',
    fontSize: 14,
  },
  iconImg: {
    marginLeft: 10,
    width: 18,
    height: 18,
  },
  carditem: {
    margin: 4,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  viewLang: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingTop: 4,
  },
  textLang: {
    paddingBottom: 4,
    color: Constants.APP_COLOR,
    fontSize: 14
  },
  textTitle: {
    paddingBottom: 4,
    color: Constants.APP_COLOR,
    fontSize: 18
  }
});

export default Repositories;
