import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { AppInput, AppButton, AppAlert } from '../components/common';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import { 
    emailChanged,
    passwordChanged,
    loginUser 
} from '../actions';

class AuthScreen extends Component {
    onEmailChange = (text) => {
        this.props.emailChanged(text);
    }

    onPasswordChange = (text) => {
        this.props.passwordChanged(text);
    }

    onLoginPressButton = () => {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }

    // DEVELOPMENT PURPOSES ONLY
    onDevPressButton = () => {
        this.props.loginUser({ email: 'test@test.com', password: 'pwd123' })
    }
    
    onError() {
        const { error } = this.props;
        if (error) {
            return <AppAlert alert={error.message} type="error" />;
        }
        return;
    }

    render() {
        const formStyle = [styles.form];
        const formControlStyle = [styles.formControl];
        const gradientStyle = [styles.gradient];
        
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <LinearGradient
                    style={gradientStyle}
                    colors={['#448CF0', '#6D2DD8']}>
                    <View style={formStyle}>
                        <View style={formControlStyle}>
                            <AppInput
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                keyboardType="email-address"
                                label={{ text: '', icon: 'ios-mail' }}
                                onValueChange={this.onEmailChange}
                                placeholder="email@domain.com"
                                value={this.props.email}
                            />
                        </View>
                        <View style={formControlStyle}>
                            <AppInput
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                label={{ text: '', icon: 'ios-key' }}
                                onValueChange={this.onPasswordChange}
                                placeholder="password"
                                secureTextEntry
                                value={this.props.password}
                            />
                        </View>
                        <View style={formControlStyle}>
                            <AppButton
                                accessibilityLabel="Login to your account"
                                disabled={this.props.processing}
                                icon="ios-unlock"
                                loading={this.props.processing}
                                onPress={this.onLoginPressButton}
                                title="LOGIN"
                                type="inverse"
                            />
                        </View>
                        <View style={formControlStyle}>
                            <AppButton
                                accessibilityLabel="Login to your account"
                                disabled={this.props.processing}
                                icon="ios-settings"
                                loading={this.props.processing}
                                onPress={this.onDevPressButton}
                                title="DEV LOGIN"
                                type="inverse"
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 100, paddingHorizontal: 40 }}>
                        {this.onError()}
                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        flexDirection: 'column'
    },
    form: {
        marginTop: 200,
        paddingHorizontal: 40
    },
    formControl: {
        marginBottom: 15
    }
});

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading
    };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(AuthScreen);