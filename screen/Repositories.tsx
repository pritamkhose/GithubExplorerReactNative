import React, {useEffect, useState} from 'react';
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
import Constants from '../app/Constants';
import Loading from '../components/Loading';
import {Props, RepoItem} from '../model/models';
import styles from './Styles.styles';

const Repositories = ({route}: Props) => {
  const [isLoading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [username, setUsername] = useState('');
  const [aList, setList] = useState<RepoItem[]>([]);

  useEffect(() => {
    setUsername(route.params.username);
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
              onRefresh={() => getData(username)}
            />
          }
        >
          {aList.map((item: RepoItem, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => Linking.openURL(item.html_url)}
            >
              <View style={styles.cardItemRepo}>
                <Text style={styles.textTitle}>{item.name}</Text>
                {item.description && item.description.length > 1 ? (
                  <Text style={styles.textblack}>{item.description}</Text>
                ) : null}
                <View style={styles.viewLang}>
                  <Text style={styles.textLang}>{item.language}</Text>
                  <View style={styles.flexDirectionRow}>
                    <Image
                      style={styles.iconImgRepo}
                      source={require('../assets/images/star80.png')}
                    />
                    <Text style={styles.textblack}>
                      {' '}
                      {item.stargazers_count}
                    </Text>
                    <Image
                      style={styles.iconImgRepo}
                      source={require('../assets/images/clock80.png')}
                    />
                    <Text style={styles.textblack}> {item.watchers_count}</Text>
                    <Image
                      style={styles.iconImgRepo}
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
};

export default Repositories;
