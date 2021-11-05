import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from "react-native-modal";

type NoInternetModalProps = {
    show: Boolean;
};

const NoInternetModal = ({ show }: NoInternetModalProps) => (
    <Modal isVisible={show == true} style={styles.modal} animationInTiming={600}>
        <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Connection Error</Text>
            <Text style={styles.modalText}>
                Oops! Looks like your device is not connected to the Internet.
            </Text>
        </View>
    </Modal>
);

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
    },
    modalText: {
        fontSize: 18,
        color: '#555',
        marginTop: 14,
        textAlign: 'center',
        marginBottom: 10,
    }
});

export default NoInternetModal;
