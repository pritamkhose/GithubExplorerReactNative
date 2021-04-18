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

import {BASE_URL, APP_COLOR} from '../components/Constants';
import {Props, StateObj} from '../model/models';
import Loading from '../components/Loading';

class UserDetails extends React.Component<Props, StateObj> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: props.route.params.username,
      avatar_url: props.route.params.avatar_url,
      isLoading: true,
      errorMsg: '',
      aObj: null,
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
          <Loading />
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
                onError={() =>
                  require('../assets/images/no_image_placeholder.png')
                }
              />
              <View
                style={
                  this.state.aObj?.name == null
                    ? styles.cardDataMinHight
                    : styles.cardData
                }>
                <Text style={styles.textblue}>{this.state.aObj?.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textblack}>{this.state.aObj?.bio}</Text>
                </View>
                <Text style={styles.textblack}>
                  {this.state.aObj?.location}
                </Text>
              </View>
            </View>
            {this.state && this.state.aObj?.email != null ? (
              <View style={styles.rowData}>
                <Image
                  style={styles.iconSize}
                  source={require('../assets/images/email96.png')}
                />
                <Text style={styles.textblack}>{this.state.aObj.email}</Text>
              </View>
            ) : null}
            {this.state && this.state.aObj?.blog ? (
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
                Joined at : {this.state.aObj?.created_at}
              </Text>
            </View>
            <View style={styles.rowData}>
              <Image
                style={styles.iconSize}
                source={require('../assets/images/clock80.png')}
              />
              <Text style={styles.textblack}>
                Last updated at : {this.state.aObj?.updated_at}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => this.openDetails('f', this.state.aObj?.followers)}
              style={styles.carditem}>
              <Text style={styles.textCount}>{this.state.aObj?.followers}</Text>
              <View style={styles.imgtxt}>
                <Image
                  style={styles.iconSize}
                  source={require('../assets/images/adduser80.png')}
                />
                <Text>Followers</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openDetails('o', this.state.aObj?.following)}
              style={styles.carditem}>
              <Text style={styles.textCount}>{this.state.aObj?.following}</Text>
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
            <TouchableOpacity
              onPress={() =>
                this.openDetails('g', this.state.aObj?.public_gists)
              }
              style={styles.carditem}>
              <Text style={styles.textCount}>
                {this.state.aObj?.public_gists}
              </Text>
              <View style={styles.imgtxt}>
                <Image
                  style={styles.iconSize}
                  source={require('../assets/images/code80.png')}
                />
                <Text>Public Gists</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.openDetails('r', this.state.aObj?.public_repos)
              }
              style={styles.carditem}>
              <Text style={styles.textCount}>
                {this.state.aObj?.public_repos}
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

  openDetails(screen: string, count: any) {
    if (count != null && count != 0) {
      if (screen === 'r') {
        this.props.navigation.navigate('RepositoriesScreen', {
          username: this.state.username,
        });
      } else if (screen === 'g') {
        this.props.navigation.navigate('PublicGistScreen', {
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
            Alert.alert(
              'Error - ' + response.status,
              JSON.stringify(response),
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
            this.setState({isLoading: false, aObj: null});
          }
        });
    } catch (e) {
      this.setState({isLoading: false});
    }
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
    color: APP_COLOR,
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
});

export default UserDetails;
