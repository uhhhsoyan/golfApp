import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Button, Platform, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { roundsFetch, calcIndex } from '../actions';
import ListItem from '../components/ListItem';

class DashScreen extends Component {
    componentWillMount() {
        this.props.roundsFetch();  
    }

    calcIndex = () => {
        const { rounds } = this.props
        if ( rounds.length >= 20 ) {

        }
        let scoresTotal = _.sumBy(this.props.rounds, value => { return parseInt(value.score) })
        let numRounds = rounds.length;
        let index = scoresTotal/numRounds;
        return index;
    }

    sortByDate = () => {

    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Dashboard',
        headerRight: (
            <Button 
                title="Upload"
                onPress={() => navigation.navigate('upload')}
            />
        ),
        style: {
            marginTop: Platform.OS === 'android' ? 24 : 0
        }
    })

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerText}>
                    <Text style={{ fontSize: 48 }}>
                        {this.calcIndex()}
                    </Text>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={this.props.rounds}
                        renderItem={round => <ListItem round={round.item} />}
                        keyExtractor={round => round.uid}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        marginTop: 10,
        paddingHorizontal: 10
    },
    headerText: {
        flex: 3,
        fontSize: 36,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listContainer: {
        flex: 7
    }
})

const mapStateToProps = (state) => {
    const rounds = _.map(state.rounds, (values, uid) => ({ ...values, uid }));
    return { rounds };
};

export default connect(mapStateToProps, { roundsFetch, calcIndex })(DashScreen);