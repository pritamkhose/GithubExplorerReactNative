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
} from 'react-native';
import {BASE_URL, APP_COLOR} from './Constants';

export default class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.route.params.username,
      avatar_url: props.route.params.avatar_url,
      isLoading: true,
      errorMsg: '',
      aObj: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    if (this.props.route.params.username !== this.state.username) {
      this.setState(
        {
          username: this.props.route.params.username,
          avatar_url: this.props.route.params.avatar_url,
        },
        () => {
          console.log(this.state.username, this.state.avatar_url);
          this.getData();
        },
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <Text>Loading ...</Text>
        ) : this.state && !this.state.aObj ? (
          <Text>{this.state.errorMsg}</Text>
        ) : (
          this.showData()
        )}
      </View>
    );
  }

  _onRefresh = () => {
    this.getData();
  };

  showData() {
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
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textblack}>{this.state.aObj.bio}</Text>
                </View>
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
              onPress={() => this.openDetails('f', this.state.aObj.followers)}
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
              onPress={() => this.openDetails('o', this.state.aObj.following)}
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
              onPress={() =>
                this.openDetails('r', this.state.aObj.public_repos)
              }
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

  openDetails(screen, count) {
    if (count != 0) {
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
  }

  getData() {
    var baseURL = BASE_URL + 'users/' + this.state.username;
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
            return null;
          }
        })
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
    padding: 4,
    flexDirection: 'column',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1,
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
