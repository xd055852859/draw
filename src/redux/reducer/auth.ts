import { actionTypes } from "../actions/authActions";

export interface AuthType {
  userInfo: any;
  upToken: string;
}

const defaultState: AuthType = {
  userInfo: null,
  upToken: "",
};

export const auth = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_USERINFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case actionTypes.SET_UPLOAD_TOKEN:
      return {
        ...state,
        upToken: action.upToken,
      };

    default:
      return state;
  }
};
