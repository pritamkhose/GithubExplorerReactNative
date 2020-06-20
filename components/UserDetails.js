/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  Text,
  TextInput,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Card,
  Button,
  Image,
  Icon,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {BASE_URL, APP_COLOR} from './Constants';

export default class UserDetails extends React.Component {
  static navigationOptions = {
    title: 'Github User Details',
    headerStyle: {
      backgroundColor: APP_COLOR,
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.navigation.getParam('username', ''),
      avatar_url: this.props.navigation.getParam('avatar_url', null),
      isLoading: false,
      aObj: {},
    };
    this.getData();
  }

  onSelect = data => {
    this.state = {
      username: this.props.navigation.getParam('username', ''),
      isLoading: false,
      aObj: {},
    };
    this.getData();
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#1970B6" />
        <View style={styles.container}>
          {this.state && !this.state.aObj ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {this.state.isLoading ? (
                <Text>Nothing Found</Text>
              ) : (
                <Text>Loading ...</Text>
              )}
            </View>
          ) : (
            this.showData(navigate)
          )}
        </View>
      </>
    );
  }

  _onRefresh = () => {
    this.getData();
  };

  showData(navigate) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={this._onRefresh}
          />
        }>
        <>
          <View style={styles.carditem}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 120, height: 120}}
                source={{uri: this.state.avatar_url}}
                alt={require('../assets/images/no_image_placeholder.png')}
              />
              <View style={styles.cardData}>
                <Text style={styles.textblue}>{this.state.aObj.name}</Text>
                <Text style={styles.textblack}>{this.state.aObj.bio}</Text>
                <Text style={styles.textblack}>{this.state.aObj.location}</Text>
              </View>
            </View>
            {this.state && this.state.aObj.email != null ? (
              <View style={styles.rowData}>
                <Image
                  style={styles.iconSize}
                  source={require('../assets/images/email96.png')}
                />
                <Text style={styles.textblack}>{this.state.aObj.email}</Text>
              </View>
            ) : null}
            {this.state && this.state.aObj.blog ? (
              <View style={styles.rowData}>
                <Image
                  style={styles.iconSize}
                  source={require('../assets/images/info80.png')}
                />
                <Text style={styles.textblack}>{this.state.aObj.blog}</Text>
              </View>
            ) : null}
            <View style={styles.rowData}>
              <Image
                style={styles.iconSize}
                source={require('../assets/images/create80.png')}
              />
              <Text style={styles.textblack}>
                Joined at : {this.state.aObj.created_at}
              </Text>
            </View>
            <View style={styles.rowData}>
              <Image
                style={styles.iconSize}
                source={require('../assets/images/clock80.png')}
              />
              <Text style={styles.textblack}>
                Last updated at : {this.state.aObj.updated_at}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => this.openDetails(navigate, 'f')}
              style={styles.carditem}>
              <Text style={styles.textCount}>{this.state.aObj.followers}</Text>
              <View style={styles.imgtxt}>
                <Image
                  style={styles.iconSize}
                  source={require('../assets/images/adduser80.png')}
                />
                <Text>Followers</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openDetails(navigate, 'o')}
              style={styles.carditem}>
              <Text style={styles.textCount}>{this.state.aObj.following}</Text>
              <View style={styles.imgtxt}>
                <Image
                  style={styles.iconSize}
                  source={require('../assets/images/checkeduser80.png')}
                />
                <Text>Following</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.carditem}>
              <Text style={styles.textCount}>
                {this.state.aObj.public_gists}
              </Text>
              <View style={styles.imgtxt}>
                <Image
                  style={styles.iconSize}
                  source={require('../assets/images/code80.png')}
                />
                <Text>Public Gists</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => this.openDetails(navigate, 'r')}
              style={styles.carditem2}>
              <Text style={styles.textCount}>
                {this.state.aObj.public_repos}
              </Text>
              <View style={styles.imgtxt}>
                <Image
                  style={styles.iconSize}
                  source={require('../assets/images/repository80.png')}
                />
                <Text>Repositories</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      </ScrollView>
    );
  }

  openDetails(navigate, screen) {
    if (screen === 'r') {
      this.props.navigation.navigate('RepoScreen', {
        username: this.state.username,
      });
    } else if (screen === 'f') {
      this.props.navigation.navigate('FollowerScreen', {
        username: this.state.username,
      });
    } else if (screen === 'o') {
      this.props.navigation.navigate('FollowingScreen', {
        username: this.state.username,
      });
    }
  }

  getData() {
    var baseURL = BASE_URL + 'users/' + this.state.username;
    this.setState({
      isLoading: true,
    });
    try {
      const response = fetch(baseURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson) {
            this.setState({
              isLoading: false,
              aObj: responseJson,
            });
          } else {
            this.setState({isLoading: false, aObj: {}});
            Alert.alert(
              'Error - ' + response.status,
              JSON.stringify(responseJson),
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Retry',
                  onPress: () => {
                    console.log('Ask me later pressed');
                    this.getData();
                  },
                },
              ],
              {cancelable: false},
            );
          }
        });
    } catch (e) {
      this.setState({loading: false});
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  carditem: {
    flex: 1,
    marginVertical: 5,
    padding: 15,
    marginRight: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  carditem2: {
    flex: 1,
    marginVertical: 5,
    padding: 15,
    marginLeft: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  cardData: {
    flexDirection: 'column',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  textblack: {
    color: 'black',
    fontSize: 14,
    padding: 5,
  },
  textblue: {
    color: APP_COLOR,
    fontSize: 20,
    padding: 5,
  },
  rowData: {
    flexDirection: 'row',
    paddingBottom: 5,
    alignItems: 'center',
  },
  iconSize: {
    width: 20,
    height: 20,
    marginEnd: 5,
  },
  textCount: {
    fontSize: 20,
    textAlign: 'center',
  },
  imgtxt: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 5,
    justifyContent: 'center',
  },
});
