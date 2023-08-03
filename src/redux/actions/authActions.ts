import { User } from "@/interface/User";

export const actionTypes = {
  SET_USERINFO: "SET_USERINFO",
  SET_UPLOAD_TOKEN: "SET_UPLOAD_TOKEN",
};

export function setUserInfo(userInfo?: User) {
  return {
    type: actionTypes.SET_USERINFO,
    userInfo: userInfo,
  };
}

export function setUploadToken(upToken: string) {
  return {
    type: actionTypes.SET_UPLOAD_TOKEN,
    upToken: upToken,
  };
}
