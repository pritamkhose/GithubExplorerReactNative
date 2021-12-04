import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Services from '../api/Services';
import Constants from '../app/Constants';
import Loading from '../components/Loading';
import {GistItem, Props} from '../model/models';

const PublicGist = ({route}: Props) => {
  const [isLoading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [username, setUsername] = useState('');
  const [aList, setList] = useState<GistItem[]>([]);

  useEffect(() => {
    setUsername(route.params.username);
    getData(route.params.username);
  }, [route]);

  function getData(name: string) {
    Services.getUserGist(name)
      .then((response: any) => {
        setLoading(false);
        if (response && response.length !== 0) {
          setErrorMsg('');
          setList(response);
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
          {aList.map((item: GistItem, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => Linking.openURL(item.html_url)}>
              <View style={styles.carditem}>
                {item.description && item.description.length > 1 ? (
                  <Text style={styles.titleText}>{item.description}</Text>
                ) : (
                  <Text style={styles.textblack}>NA</Text>
                )}
                <Text style={styles.textblack}>
                  Updated at :{' '}
                  {moment(item.updated_at).format('DD:MM:YYYY HH:mm A')}
                </Text>
                <View style={styles.emptySpace} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: Constants.APP_COLOR,
    fontSize: 16,
    paddingBottom: 4,
  },
  textblack: {
    color: 'black',
    fontSize: 14,
  },
  carditem: {
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  emptySpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
});

export default PublicGist;
