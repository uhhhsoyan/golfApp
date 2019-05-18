import _ from 'lodash';
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Button, 
    Platform, 
    ScrollView, 
    StyleSheet, 
    Keyboard, 
    TouchableWithoutFeedback 
} from 'react-native';
import RoundForm from '../components/RoundForm';
import { AppButton, AppDialog } from '../components/common';
import { connect } from 'react-redux';
import { roundUpdate, roundSave, roundDelete } from '../actions';

class EditScreen extends Component {
    state = { showDeleteModal: false };
    componentWillMount() {
        const { navigation, roundUpdate } = this.props;
        _.each(navigation.state.params.round, (value, prop) => {
            roundUpdate({ prop, value });
        });
    }

    onSaveButtonPress = () => {
        const { score, course, date, slope, rating, diff } = this.props;
        const roundID = this.props.navigation.state.params.round.uid;
        this.props.roundSave({ score, course, date, slope, rating, diff, roundID });
    }
    
    onDeleteButtonPress = () => {
        this.setState({ showDeleteModal: true })
    }

    onDeleteDialogCancel = () => {
        this.setState({ showDeleteModal: false })
    }

    onDeleteDialogConfirm = () => {
        const roundID = this.props.navigation.state.params.round.uid;
        this.props.roundDelete({ roundID });
    }

    render() {
        return (
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <RoundForm />
                        <View style={styles.formControl}>
                            <AppButton
                                accessibilityLabel="Save round data"
                                disabled={this.props.processing}
                                icon="ios-checkmark-circle-outline"
                                loading={this.props.processing}
                                onPress={this.onSaveButtonPress}
                                title="Save Changes"
                            />
                        </View>
                        <View style={styles.formControl}>
                            <AppButton
                                accessibilityLabel="Delete round data"
                                disabled={this.props.processing}
                                icon="ios-remove-circle-outline"
                                loading={this.props.processing}
                                onPress={this.onDeleteButtonPress}
                                title="Delete Round"
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <AppDialog
                    visible={this.state.showDeleteModal}
                    onCancel={this.onDeleteDialogCancel}
                    onConfirm={this.onDeleteDialogConfirm}>
                    <Text style={styles.deleteDialogText}>
                        Please confirm, are you sure you want to delete this round?
                    </Text>
                </AppDialog>
            </ScrollView>
        )
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
    },
    deleteDialogText: {
        color: '#565555',
        fontSize: 18,
        //fontFamily: 'Roboto-Regular'
    }
});

const mapStateToProps = (state) => {
    const { score, course, date, slope, rating } = state.roundForm;
    return { score, course, date, slope, rating };
};

export default connect(mapStateToProps, { roundUpdate, roundSave, roundDelete })(EditScreen);
