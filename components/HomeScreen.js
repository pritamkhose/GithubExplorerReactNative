/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  Text,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import {BASE_URL} from './Constants';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serachTxt: 'android',
      isLoading: true,
      errorMsg: '',
      aList: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

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
      BASE_URL + 'search/users?q=' + this.state.serachTxt + '&page=1'; // &per_page=100
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
          if (responseJson && responseJson.total_count !== 0) {
            this.setState({
              isLoading: false,
              aList: responseJson.items,
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
      <>
        {/* <StatusBar barStyle="dark-content" backgroundColor="#1970B6" /> */}
        <View style={styles.container}>
          <View style={styles.searchrow}>
            <TextInput
              style={styles.textInput}
              placeholder="Please Enter some text for Serarch"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({serachTxt: text})}
              onSubmitEditing={this.SubmitEdit}
            />
            <TouchableOpacity onPress={() => this.getSearch()}>
              <Image
                style={styles.iconImg}
                source={require('../assets/images/search80.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            {this.state.isLoading ? (
              <Text>Loading ...</Text>
            ) : this.state.aList == 0 ? (
              <Text>{this.state.errorMsg}</Text>
            ) : (
              this.showList()
            )}
          </View>
        </View>
      </>
    );
  }

  SubmitEdit = () => {
    this.getData();
  };

  openDetails(txt, avatar_url) {
    console.log(txt);
    this.props.navigation.navigate('UserDetails', {
      username: txt,
      avatar_url: avatar_url,
    });
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
            onPress={() =>
              this.openDetails(item.login, item.avatar_url)
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
  },
  center: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchrow: {
    flexDirection: 'row',
    alignItems: 'stretch',
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
