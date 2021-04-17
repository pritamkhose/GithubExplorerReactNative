/* eslint-disable react-native/no-inline-styles */
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
import {BASE_URL, APP_COLOR} from './Constants';

export default class RepoScreen extends React.Component {
  constructor(props) {
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
      this.setState({loading: false});
    }
  }

  showAlertRetry(title, msg) {
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
          <Text>Loading ...</Text>
        ) : this.state.aList == 0 ? (
          <Text>{this.state.errorMsg}</Text>
        ) : (
          this.showList()
        )}
      </View>
    );
  }

  openDetails(txt) {
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
        {this.state.aList.map((item, index) => (
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
                    style={{width: 20, height: 20}}
                    source={require('../assets/images/star80.png')}
                  />
                  <Text style={styles.textblack}>
                    {item.stargazers_count}{'  '}
                  </Text>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../assets/images/clock80.png')}
                  />
                  <Text style={styles.textblack}> {item.watchers_count}  </Text>
                  <Image
                    style={{width: 20, height: 20}}
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
    flexDirection: 'column',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  textInput: {
    height: 40,
    fontSize: 18,
    borderWidth: 0.5,
    padding: 10,
  },
  iconImg: {
    width: 50,
    height: 50,
    marginTop: -5,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  carditem: {
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  cardData: {
    flexDirection: 'column',
    padding: 5,
  },
});
