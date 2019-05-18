import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import RoundForm from '../components/RoundForm';
import { AppButton } from '../components/common';
import { connect } from 'react-redux';
import { roundCreate } from '../actions';

class UploadScreen extends Component {
    onCreateButtonPress = () => {
        const { score, course, date, slope, rating } = this.props;
        const diff = ((score - rating) * 113 / slope).toString();
        this.props.roundCreate({ score, course, date, slope, rating, diff});
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <RoundForm />
                    <View style={styles.formControl}>
                        <AppButton
                            accessibilityLabel="Save round data"
                            disabled={this.props.processing}
                            icon="ios-checkmark-circle-outline"
                            loading={this.props.processing}
                            onPress={this.onCreateButtonPress}
                            title="Save Round"
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20
    },
    formControl: {
        marginBottom: 15
    }
});

const mapStateToProps = (state) => {
    const { score, course, date, slope, rating } = state.roundForm;
    return { score, course, date, slope, rating };
};

export default connect(mapStateToProps, { roundCreate })(UploadScreen);
