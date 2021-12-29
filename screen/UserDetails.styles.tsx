import {StyleSheet} from 'react-native';
import Constants from '../app/Constants';

const UserDetails = StyleSheet.create({
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
    flexGrow: 1,
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
    color: Constants.APP_COLOR,
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
  iconImg: {
    width: 120,
    height: 120,
    marginBottom: 8,
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
  flexGrow: {
    flexGrow: 1,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
});

export default UserDetails;
