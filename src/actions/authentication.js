import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import {ServerAddress} from "./server";

/*
  Auth Functions
*/


/*
  Call the Api for registering the user and get the feed back
*/
export const registerUser = (user, history) => dispatch => {
    //alert(ServerAddress+'/api/users/register');
    axios.post(ServerAddress+'/api/users/register', user)
            .then(res => history.push('/login'))    // Redirect to Login page after a Successful register
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

/*
  Call the Api for Logging the user in and get the feed back
*/
export const loginUser = (user) => dispatch => {
    axios.post(ServerAddress+'/api/users/login', user)
            .then(res => {
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

//Action Creator to handle login and logout

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

/*
  Call the Api for Logging out user in and get the feed back
*/
export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    if (history) {
        history.push('/login');
    }
};
