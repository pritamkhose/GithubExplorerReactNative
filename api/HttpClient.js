import axios from 'axios';
import { Alert } from 'react-native';

// import { Config } from 'react-native-config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const getToken = async () => await AsyncStorage.getItem("access-token")

// Create an Axios Client with defaults
const client = axios.create({
    baseURL: 'https://api.github.com/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 1000 * 10, // Wait for 10 seconds
    // auth: { Authorization: 'Bearer ' + { getToken } }
});

// Request Wrapper with default success/error actions

// Intercept all requests
client.interceptors.request.use(
    config => {
        console.log(config.method.toUpperCase(), config.baseURL, config.url);
        return config;
    }, error => Promise.reject(error));

// Intercept all responses
client.interceptors.response.use(
    async response => {
        // console.debug('Request Successful!', response);
        return response.data;
    },
    error => {
        if (error.response.status === 429) {
            showAlert('Error', 'Too many requests. Please try again later.');
        } else if (error.response) {
            // Request was made but server responded with something other than 2xx
            console.error('Status: ', error.response.status, ' Data: ', JSON.stringify(error.response.data));
            // console.error('Headers:', error.response.headers);
            showAlert('Error - ' + error.response.status, JSON.stringify(error.response));
        } else {
            // Something else happened while setting up the request triggered the error
            console.error('Error Message:', error.message);
            showAlert('Something is wrong with the server! - ' + error.response.status, JSON.stringify(error));
        }
        // return Promise.reject(error);
        return Promise.reject(error.response || error.message);
    },
);

function showAlert(title, msg) {
    Alert.alert(
        title,
        msg,
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
        ],
        { cancelable: false },
    );
}


export default client;
