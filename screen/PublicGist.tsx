import moment from 'moment';
import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {
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
import {GistItem, Props} from '../model/models';
import styles from './Styles.styles';

const PublicGist = ({route}: Props) => {
  const { t } = useTranslation();
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
          setErrorMsg(t('nothingFound'));
        }
      })
      .catch(() => {
        setLoading(false);
        setErrorMsg(t('wentWrong'));
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
          {aList.map((item: GistItem, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => Linking.openURL(item.html_url)}
            >
              <View style={styles.carditem_2}>
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

export default PublicGist;
