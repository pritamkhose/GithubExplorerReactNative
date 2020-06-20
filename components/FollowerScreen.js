/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  Text,
  StatusBar,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {BASE_URL, APP_COLOR} from './Constants';

export default class FollowerScreen extends React.Component {
  static navigationOptions = {
    title: 'Followers',
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
      username: props.navigation.getParam('username', ''),
      isLoading: false,
      aList: [],
    };
    this.getData();
  }

  getData() {
    var baseURL =
      BASE_URL + 'users/' + this.state.username + '/followers?per_page=100';
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
          if (responseJson && responseJson.length !== 0) {
            this.setState({
              isLoading: false,
              aList: responseJson,
            });
          } else {
            this.setState({isLoading: false, aList: []});
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

  showAlert(msg) {
    Alert.alert(
      null,
      msg,
      [
        {
          text: 'Cancel',
          onPress: () => '',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#1970B6" />
        <View style={styles.container}>
          {this.state.aList < 1 ? (
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
            this.showList(navigate)
          )}
        </View>
      </>
    );
  }

  openDetails(navigate, txt) {
    console.log(txt);
    this.props.navigation.navigate('UserDetails', {username: txt});
    // const {navigation} = this.props;
    // navigation.navigate({username: txt});
    // navigation.goBack();
  }

  _onRefresh = () => {
    this.getData();
  };

  showList(navigate) {
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
            onPress={() => this.openDetails(navigate, item.login)}>
            <View style={styles.carditem}>
              <Image
                style={{width: 50, height: 50}}
                source={{uri: item.avatar_url}}
                alt={require('../assets/images/no_image_placeholder.png')}
              />
              <Text style={{padding: 10, color: 'black', fontSize: 16}}>
                {item.login}
              </Text>
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
    padding: 10,
    flexDirection: 'column',
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
    flexDirection: 'row',
    marginVertical: 5,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  cardData: {
    flexDirection: 'column',
    padding: 5,
  },
});
