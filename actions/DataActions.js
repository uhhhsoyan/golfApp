import NavigationService from '../NavigationService';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

import {
    CALC_INDEX,
    ROUND_UPDATE,
    ROUND_CREATE,
    ROUNDS_FETCH_SUCCESS,
    ROUND_SAVE_SUCCESS
} from './types';

// Needs to be fixed...
export const calcIndex = ({ rounds }) => {
    const index = 10;
    return {
        type: CALC_INDEX,
        payload: { index }
    }    
}

export const roundUpdate = ({ prop, value }) => {
    return {
        type: ROUND_UPDATE,
        payload: { prop, value }
    };
};

export const roundCreate = ({ score, course, date, slope, rating, diff }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/rounds`)
            .push({ score, course, date, slope, rating, diff })
            .then(() => {
                dispatch({ type: ROUND_CREATE });
                NavigationService.navigate('dashboard');
            });           
    };
}

export const roundSave = ({ score, course, date, slope, rating, diff, roundID }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/rounds/${roundID}`)
            .set({ score, course, date, slope, rating, diff })
            .then(() => {
                dispatch({ type: ROUND_SAVE_SUCCESS });
                NavigationService.navigate('dashboard');
            });
    };
};

export const roundDelete = ({ roundID }) => {
    const { currentUser } = firebase.auth();
    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/rounds/${roundID}`)
            .remove()
            .then(() => {
                NavigationService.navigate('dashboard');
            });
    };
};

export const roundsFetch = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/rounds`)
            .on('value', snapshot => {
                dispatch({ type: ROUNDS_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const bulkUpload = ({ data }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        for (var i = 0; i < data.length; i++) {
            let diff = ((data[i].Score - data[i].Rating) * 113 / data[i].Slope).toString();
            let course = data[i].Location;
            let date = data[i].Date
            let score = data[i].Score.toString();
            let slope = data[i].Slope.toString();
            let rating = data[i].Rating.toString();
            firebase.database().ref(`/users/${currentUser.uid}/rounds`)
                .push({ score, course, date, slope, rating, diff })
                .then(() => {
                    dispatch({ type: BULK_UPLOAD });
                });
        }         
    };
}