import { actionTypes as commonActionTypes } from "../actions/commonActions";
export interface CommonType {
  token: string | null;
  title: string;
  content: string;
  headerVisible: boolean;
  apiObj: any;
  editState: boolean;
  styleType: any;
  activeState: number;
  usedArray: any;
  dragState: boolean;
  saveState: boolean;
}
const defaultState: CommonType = {
  token: null,
  title: "",
  content: "",
  headerVisible: true,
  apiObj: null,
  editState: false,
  styleType: {},
  activeState: -1,
  usedArray: [],
  dragState: false,
  saveState: false,
};
export const common = (state = defaultState, action: any) => {
  switch (action.type) {
    case commonActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case commonActionTypes.SET_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case commonActionTypes.SET_CONTENT:
      return {
        ...state,
        content: action.content,
      };

    case commonActionTypes.SET_API:
      return {
        ...state,
        apiObj: action.apiObj,
      };
    case commonActionTypes.SET_HEADER_VISIBLE:
      return {
        ...state,
        headerVisible: action.headerVisible,
      };

    case commonActionTypes.CHANGE_EDIT_STATE:
      localStorage.setItem("isEdit", action.editState ? "2" : "1");
      console.log(action.editState);
      return {
        ...state,
        editState: action.editState,
      };
    case commonActionTypes.CHANGE_STYLE_OBJECT:
      return {
        ...state,
        styleObject: action.styleObject,
      };
    case commonActionTypes.CHANGE_ACTIVE_STATE:
      return {
        ...state,
        activeState: action.activeState,
      };
    case commonActionTypes.SET_USED_ARRAY:
      console.log(action.usedArray);
      return {
        ...state,
        usedArray: action.usedArray,
      };

    case commonActionTypes.CHANGE_USED_ARRAY:
      let arr = [...state.usedArray];
      let statusIndex = -1;
      arr.forEach((item, index) => {
        if (action.used.key) {
          if (item.key === action.used.key) {
            statusIndex = index;
          }
        } else {
          if (item.name === action.used.name) {
            statusIndex = index;
          }
        }
      });
      if (statusIndex === -1) {
        // arr.splice(statusIndex, 1);
        arr.unshift(action.used);
        localStorage.setItem("used", JSON.stringify(arr));
      }

      return {
        ...state,
        usedArray: arr,
      };
    case commonActionTypes.CHANGE_DRAG_STATE:
      return {
        ...state,
        dragState: action.dragState,
      };
    case commonActionTypes.CHANGE_SAVE_STATE:
      return {
        ...state,
        saveState: action.saveState,
      };
    default:
      return state;
  }
};
