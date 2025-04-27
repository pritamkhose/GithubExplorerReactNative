import {StyleSheet} from 'react-native';
import Constants from '../app/Constants';

const Styles = StyleSheet.create({
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
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 18,
    borderWidth: 0.5,
    padding: 10,
  },
  iconSearchImg: {
    width: 50,
    height: 50,
    marginTop: -5,
  },
  iconImgInfo: {
    width: 40,
    height: 40,
  },
  iconImg: {
    width: 50,
    height: 50,
  },
  carditem: {
    flexDirection: 'row',
    marginVertical: 5,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  login: {
    padding: 10,
    color: 'black',
    fontSize: 16,
  },

  containerCenter: {
    flex: 1,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    padding: 10,
    color: 'black',
    fontSize: 16,
  },

  titleText: {
    color: Constants.APP_COLOR,
    fontSize: 16,
    paddingBottom: 4,
  },
  textblack: {
    color: 'black',
    fontSize: 14,
  },
  // Gist
  carditem_2: {
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  emptySpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },

  // Repo
  iconImgRepo: {
    marginLeft: 10,
    width: 18,
    height: 18,
  },
  cardItemRepo: {
    margin: 4,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  viewLang: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingTop: 4,
  },
  textLang: {
    paddingBottom: 4,
    color: Constants.APP_COLOR,
    fontSize: 14,
  },
  textTitle: {
    paddingBottom: 4,
    color: Constants.APP_COLOR,
    fontSize: 18,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
});

export default Styles;
