// src/redux/user/userActions.ts

import { createAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const setUser = (user: User) => ({
    type: SET_USER,
    payload: user,
})

export const logoutUser = createAction(LOGOUT_USER);

