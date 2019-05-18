import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import NavigationService from '../NavigationService';
import { CardSection } from './common';


class ListItem extends Component {
    onRowPress() {
        NavigationService.navigate('edit', { round: this.props.round });
    }
    
    render() {
        const { course } = this.props.round;
        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>
                            {course}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

export default ListItem;