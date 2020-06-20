/* eslint-disable react-native/no-inline-styles */
import React, {Component, BackHandler} from 'react';
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
  Keyboard,
} from 'react-native';

import {BASE_URL, APP_COLOR} from './Constants';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Github Explorer',
    headerStyle: {
      backgroundColor: APP_COLOR,
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          console.log('exit');
        }}>
        <Image
          style={styles.iconHeader}
          source={require('../assets/images/exit.svg')}
        />
      </TouchableOpacity>
    ),
  };

  // this.doExit()

  constructor(props) {
    super(props);
    this.state = {
      serachTxt: 'android',
      isLoading: false,
      aList: [],
    };
    this.getData();
  }

  doExit() {
    BackHandler.exitApp();
    return true;
  }

  backPressed = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
  };

  getSearch() {
    // Hide that keyboard!
    Keyboard.dismiss();
    console.log('get ' + this.state.serachTxt);
    if (this.state.serachTxt.length === 0) {
      this.showAlert('Enter valid input for search');
    } else {
      this.getData();
    }
  }

  getData() {
    var baseURL =
      BASE_URL + 'search/users?q=' + this.state.serachTxt + '&page=1';
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
          if (responseJson && responseJson.total_count !== 0) {
            this.setState({
              isLoading: false,
              aList: responseJson.items,
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'stretch',
            }}>
            <TextInput
              style={styles.textInput}
              placeholder="Please Enter some text for Serarch"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({serachTxt: text})}
              value={this.state.text}
              returnKeyType="down"
              onSubmitEditing={this.SubmitEdit}
            />
            <TouchableOpacity onPress={() => this.getSearch()}>
              <Image
                style={styles.iconImg}
                source={require('../assets/images/search80.png')}
              />
            </TouchableOpacity>
          </View>
          <>
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
          </>
        </View>
      </>
    );
  }

  SubmitEdit = () => {
    this.getData();
  };

  openDetails(navigate, txt, avatar_url) {
    console.log(txt);
    this.props.navigation.navigate('UserDetails', {
      username: txt,
      avatar_url: avatar_url,
    });
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
            onPress={() =>
              this.openDetails(navigate, item.login, item.avatar_url)
            }>
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

//  <FlatList
// data={this.state.aList}
// renderItem={({item}) => (
//   <Text style={styles.item}>{item.login}</Text>
// )}
// />

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
    flex: 1,
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
