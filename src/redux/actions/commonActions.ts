export const actionTypes = {
  SET_TOKEN: "SET_TOKEN",
  SET_TITLE: "SET_TITLE",
  SET_CONTENT: "SET_CONTENT",
  SET_API: "SET_API",
  SET_HEADER_VISIBLE: "SET_HEADER_VISIBLE",
  SET_USED_ARRAY: "SET_USED_ARRAY",

  CHANGE_EDIT_STATE: "CHANGE_EDIT_STATE",
  CHANGE_STYLE_OBJECT: "CHANGE_STYLE_OBJECT",
  CHANGE_ACTIVE_STATE: "CHANGE_ACTIVE_STATE",
  CHANGE_USED_ARRAY: "CHANGE_USED_ARRAY",
  CHANGE_DRAG_STATE: "CHANGE_DRAG_STATE",
  CHANGE_SAVE_STATE: "CHANGE_SAVE_STATE",
};
export function setToken(token: string | null) {
  return { type: actionTypes.SET_TOKEN, token };
}
export function setTitle(title: string) {
  return { type: actionTypes.SET_TITLE, title };
}
export function setContent(content: string) {
  return { type: actionTypes.SET_CONTENT, content };
}
export function setApi(apiObj) {
  return { type: actionTypes.SET_API, apiObj };
}
export function setHeaderVisible(headerVisible: boolean) {
  return { type: actionTypes.SET_HEADER_VISIBLE, headerVisible };
}
export function setUsedArray(usedArray: any) {
  return { type: actionTypes.SET_USED_ARRAY, usedArray };
}

export function changeEditState(editState: boolean) {
  return { type: actionTypes.CHANGE_EDIT_STATE, editState };
}
export function changeStyleObject(styleObject: any) {
  return { type: actionTypes.CHANGE_STYLE_OBJECT, styleObject };
}
export function changeActiveState(activeState: number) {
  return { type: actionTypes.CHANGE_ACTIVE_STATE, activeState };
}
export function changeUsedArray(used: any) {
  return { type: actionTypes.CHANGE_USED_ARRAY, used };
}
export function changeDragState(dragState: boolean) {
  return { type: actionTypes.CHANGE_DRAG_STATE, dragState };
}
export function changeSaveState(saveState: boolean) {
  return { type: actionTypes.CHANGE_SAVE_STATE, saveState };
}
