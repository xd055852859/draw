import { combineReducers } from 'redux';
import { auth } from './auth';
import { common } from './common';
import { draw } from './draw';
export const rootReducer = combineReducers({
  auth: auth,
  common: common,
  draw:draw
});

export type RootState = ReturnType<typeof rootReducer>;
