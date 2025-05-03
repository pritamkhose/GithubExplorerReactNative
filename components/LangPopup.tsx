import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import i18n from '../app/i18n';
import Constants from '../app/Constants';

type LangPopupProps = {
  onClose: () => void;
};

const LangPopup = ({ onClose }: LangPopupProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>{t('selectLang')}</Text>
      <FlatList
        style={styles.list}
        data={[
          { code: 'en', title: t('english') },
          { code: 'es', title: t('spanish') },
          { code: 'hi', title: t('hindi') },
          { code: 'mr', title: t('marathi') },
        ]}
        keyExtractor={item => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.setItem('currentLanguage', item.code);
              await i18n.changeLanguage(item.code);
              onClose();
            }}
            style={styles.carditem}>
            <Text style={styles.modalText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.modalText}>{t('cancel')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#555',
    marginVertical: 4,
    textAlign: 'center',
  },
  carditem: {
    marginVertical: 4,
    padding: 4,
    borderColor: Constants.APP_COLOR,
    borderRadius: 5,
    borderWidth: 1,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: Constants.APP_COLOR,
  },
  list:{
     width: '100%',
  },
});

export default LangPopup;
