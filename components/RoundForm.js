import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { AppCard, AppInput, DatePickModal } from './common';
import { roundUpdate } from '../actions';
import { colors } from '../styling/colors';
var data = require('../data/SteveEssoyanLast20.json');

class RoundForm extends Component {
    state = { showDateModal: false, chosenDate: new Date() };
    onDateDialogPress = () => {
        this.setState({ showDateModal: true })
    }
    onDateDialogCancel = () => {
        this.setState({ chosenDate: new Date(), showDateModal: false })
    }
    onDateDialogConfirm = () => {
        const { chosenDate } = this.state;
        let month = chosenDate.getMonth() + 1;
        let day = chosenDate.getDate();
        let year = chosenDate.getFullYear();
        let dateString = `${month}/${day}/${year}`
        this.props.roundUpdate({ prop: 'date', value: dateString })
        this.setState({ showDateModal: false })
    }
    onDateChange = (newDate) => {
        this.setState({ chosenDate: newDate })
    }
    renderText = () => {
        if (this.props.date) {
            return (
                <Text style={styles.input}>
                    {this.props.date}
                </Text>
            )
        } else {
            return (
                <Text style={styles.placeholderInput}>
                    MM/DD/YYY
                </Text>
            )
        }
    }

    render() {
        return (
            <View>
                <AppCard>
                    <View style={styles.formControl}>
                        <Text style={styles.inputLabel}>
                            Score
                        </Text>
                        <AppInput 
                            value={this.props.score}
                            placeholder="72"
                            onValueChange={value => 
                                this.props.roundUpdate({ prop: 'score', value })}
                            keyboardType="numeric"
                            label={{ text: '', icon: '' }}
                        />
                    </View>
                    <View style={styles.formControl}>
                        <Text style={styles.inputLabel}>
                            Course
                        </Text>
                        <AppInput 
                            value={this.props.course}
                            placeholder="TPC Sawgrass"
                            onValueChange={value => 
                                this.props.roundUpdate({ prop: 'course', value })}
                            autoCapitalize={'words'}
                            label={{ text: '', icon: '' }}
                        />
                    </View>
                    <View style={styles.formControl}>
                        <Text style={styles.inputLabel}>
                            Date
                        </Text>
                        <TouchableOpacity
                            onPress={() => this.setState({ showDateModal: true })}
                            style={styles.inputContainer}
                        >
                        <Text style={styles.input}>
                            {this.props.date ? this.props.date : 'MM/DD/YYY'}
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formControl}>
                        <Text style={styles.inputLabel}>
                            Slope
                        </Text>
                        <AppInput 
                            value={this.props.slope}
                            placeholder="113"
                            onValueChange={value => 
                                this.props.roundUpdate({ prop: 'slope', value })}
                            keyboardType="numeric"
                            label={{ text: '', icon: '' }}
                        />
                    </View>
                    <View style={styles.formControl}>
                        <Text style={styles.inputLabel}>
                            Rating
                        </Text>
                        <AppInput 
                            value={this.props.rating}
                            placeholder="72.0"
                            onValueChange={value => 
                                this.props.roundUpdate({ prop: 'rating', value })}
                            keyboardType="numeric"
                            label={{ text: '', icon: '' }}
                        />
                    </View>
                </AppCard>
                <DatePickModal
                    visible={this.state.showDateModal}
                    chosenDate={this.state.chosenDate}
                    onDateChange={this.onDateChange}
                    onCancel={this.onDateDialogCancel}
                    onConfirm={this.onDateDialogConfirm}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    formControl: {
        marginBottom: 15
    },
    inputLabel: {
        color: '#FFF',
        marginBottom: 5
    },
    inputContainer: {
        backgroundColor: colors.borderColor,
        borderColor: colors.borderColor,
        borderRadius: 4,
        borderWidth: 1,
        flex: 0,
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === 'ios' ? 10 : 0
    },
    input: {
        color: colors.whiteColor,
        flex: 1,
        height: Platform.OS === 'ios' ? 26 : 40,
        marginTop: Platform.OS === 'ios' ? 6 : 0
    },
    placeholderInput: {
        color: colors.placeHolderColor,
        flex: 1,
        height: Platform.OS === 'ios' ? 26 : 40,
        marginTop: Platform.OS === 'ios' ? 6 : 0
    }

});

const mapStateToProps = (state) => {
    const { score, course, date, slope, rating } = state.roundForm;
    return { score, course, date, slope, rating };
};

export default connect(mapStateToProps, { roundUpdate })(RoundForm);
