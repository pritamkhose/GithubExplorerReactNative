import React from 'react';
import {
  Alert,
  Image,
  Keyboard,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Services from '../api/Services';
import Constants from '../app/Constants';
import FastImageLoad from '../components/FastImageLoad';
import Loading from '../components/Loading';
import styles from './Styles.styles';

export interface Props {
  navigation: any;
}

export interface State {
  serachTxt: string;
  isLoading: boolean;
  errorMsg: string;
  aList: [];
}

export interface UserItem {
  login: string;
  avatar_url: string;
}

export class Home extends React.Component<Props, State> {
  constructor(props: Props) {
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
    Services.getUserSearch(this.state.serachTxt, 1)
      .then((response: any) => {
        if (response && response.total_count !== 0) {
          this.setState({
            isLoading: false,
            aList: response.items,
          });
        } else {
          this.setState({
            isLoading: false,
            aList: [],
            errorMsg: 'Nothing Found',
          });
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          aList: [],
          errorMsg: Constants.WentWrong,
        });
      });
  }

  showAlert(msg: string) {
    Alert.alert(
      '',
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
    return (
      <>
        {/* <StatusBar barStyle="dark-content" backgroundColor="#1970B6" /> */}
        <View style={styles.container}>
          <View style={styles.searchrow}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter text for search user"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({serachTxt: text})}
              onSubmitEditing={this.SubmitEdit}
            />
            <TouchableOpacity onPress={() => this.getSearch()}>
              <Image
                style={styles.iconSearchImg}
                source={require('../assets/images/search80.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            {this.state.isLoading ? (
              <Loading />
            ) : this.state.aList && this.state.aList.length > 0 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.isLoading}
                    onRefresh={this._onRefresh}
                  />
                }>
                {this.state.aList.map((item: UserItem, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      this.openDetails(item.login, item.avatar_url)
                    }>
                    <View style={styles.carditem}>
                      <FastImageLoad
                        style={styles.iconImg}
                        uri={item.avatar_url}
                      />
                      <Text style={styles.login}>{item.login}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <Text>{this.state.errorMsg}</Text>
            )}
          </View>
        </View>
      </>
    );
  }

  SubmitEdit = () => {
    this.getData();
  };

  openDetails(txt: string, avatar_url: string) {
    console.log(txt);
    this.props.navigation.navigate(Constants.NAVIGATE_SCREEN.UserDetails, {
      username: txt,
      avatar_url: avatar_url,
    });
  }

  _onRefresh = () => {
    this.getData();
  };
}

export default Home;
