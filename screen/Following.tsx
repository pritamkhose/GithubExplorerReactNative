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

import {BASE_URL} from '../components/Constants';
import {Props, StateList, UserLoginItem} from '../model/models';
import Loading from '../components/Loading';

class Following extends React.Component<Props, StateList> {
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
      BASE_URL + 'users/' + this.state.username + '/following?per_page=100';
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

  openDetails(txt: string, url: string) {
    this.props.navigation.navigate('UserDetails', {
      username: txt,
      avatar_url: url,
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
        {this.state.aList.map((item: UserLoginItem, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => this.openDetails(item.login, item.avatar_url)}>
            <View style={styles.carditem}>
              <Image
                style={styles.iconImg}
                source={{uri: item.avatar_url}}
                onError={() =>
                  require('../assets/images/no_image_placeholder.png')
                }
              />
              <Text style={styles.iconText}>{item.login}</Text>
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
  carditem: {
    flexDirection: 'row',
    marginVertical: 5,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  iconImg: {
    width: 50,
    height: 50,
  },
  iconText: {
    padding: 10,
    color: 'black',
    fontSize: 16,
  },
});

export default Following;
