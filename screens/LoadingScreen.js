import React, { Component } from 'react';
import { View, Image } from 'react-native';

class LoadingScreen extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('auth')
        }, 1500)
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Image 
                    source={require('../img/baseline_golf_course_white_48dp.png')}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'rgb(57, 150, 10)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 24,
        padding: 20
    },
    logoStyle: {

    }
}

export default LoadingScreen;
