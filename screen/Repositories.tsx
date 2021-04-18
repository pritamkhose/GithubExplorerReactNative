import React from 'react';
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';

import {BASE_URL, APP_COLOR} from '../components/Constants';
import {Props, StateList, RepoItem} from '../model/models';
import Loading from '../components/Loading';

class Repositories extends React.Component<Props, StateList> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: props.route.params.username,
      isLoading: true,
      errorMsg: '',
      aList: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    var baseURL =
      BASE_URL +
      'users/' +
      this.state.username +
      '/repos?per_page=100&sort=updated';
    try {
      fetch(baseURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            this.showAlertRetry(
              'Error - ' + response.status,
              JSON.stringify(response),
            );
            return null;
          }
        })
        .then(responseJson => {
          if (responseJson && responseJson.length !== 0) {
            this.setState({
              isLoading: false,
              aList: responseJson,
            });
          } else {
            this.setState({
              isLoading: false,
              aList: [],
              errorMsg: 'Nothing Found',
            });
          }
        })
        .catch(networkError =>
          this.setState({
            isLoading: false,
            aList: [],
            errorMsg: 'Something is wrong with the server!',
          }),
        );
    } catch (e) {
      this.setState({isLoading: false});
    }
  }

  showAlertRetry(title: string, msg: string) {
    Alert.alert(
      title,
      msg,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Retry',
          onPress: () => {
            this.getData();
          },
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <Loading />
        ) : this.state.aList == 0 ? (
          <Text>{this.state.errorMsg}</Text>
        ) : (
          this.showList()
        )}
      </View>
    );
  }

  openDetails(txt: string) {
    console.log(txt);
    Linking.openURL(txt);
  }

  _onRefresh = () => {
    this.getData();
  };

  showList() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={this._onRefresh}
          />
        }>
        {this.state.aList.map((item: RepoItem, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => this.openDetails(item.html_url)}>
            <View style={styles.carditem}>
              <Text style={{paddingBottom: 5, color: APP_COLOR, fontSize: 20}}>
                {item.name}
              </Text>
              {item.description && item.description.length > 1 ? (
                <Text style={{paddingBottom: 5, color: 'black', fontSize: 14}}>
                  {item.description}
                </Text>
              ) : null}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'stretch',
                }}>
                <Text
                  style={{paddingBottom: 5, color: APP_COLOR, fontSize: 14}}>
                  {item.language}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={styles.iconImg}
                    source={require('../assets/images/star80.png')}
                  />
                  <Text style={styles.textblack}>
                    {item.stargazers_count}
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
  textblack: {
    color: 'black',
    fontSize: 14,
    paddingLeft: 4,
  },
  iconImg: {
    marginLeft: 10,
    width: 20,
    height: 20,
  },
  carditem: {
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  }
});

export default Repositories;
