import React from 'react';
import { Modal, StyleSheet, View, DatePickerIOS } from 'react-native';
import { AppButton } from './AppButton';

const DatePickModal = ({ visible, onConfirm, onCancel, onDateChange, chosenDate }) => (
    <Modal
        animationType="slide"
        onRequestClose={onCancel}
        transparent
        visible={visible}>
        <View style={styles.container}>
            <View style={styles.body}>
                <DatePickerIOS
                    mode='date'
                    date={chosenDate}
                    onDateChange={onDateChange}
                />
            </View>
            <View style={styles.footer}>
                <AppButton
                    accessibilityLabel="Cancel"
                    icon="ios-close-circle-outline"
                    onPress={onCancel}
                    title="Cancel"
                />
                <AppButton
                    accessibilityLabel="Confirm"
                    icon="ios-checkmark-circle-outline"
                    onPress={onConfirm}
                    title="Confirm"
                />
            </View>
        </View>
    </Modal>
);

export { DatePickModal };

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        flex: 1,
        position: 'relative',
        justifyContent: 'flex-end'
    },
    body: {
        backgroundColor: '#fff',
        padding: 20
    },
    footer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    }
});