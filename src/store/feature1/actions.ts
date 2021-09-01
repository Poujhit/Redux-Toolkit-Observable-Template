import { createAction } from '@reduxjs/toolkit';

// These actions are for epics.

export const retrieveUsers = createAction<any>('@@FEATURE_1/RETRIEVE_USERS');
