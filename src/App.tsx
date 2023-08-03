import "./App.scss";
import request from "@/services/api";
import { useMount } from "./hooks/common";
import { useDispatch } from "react-redux";
import { getSearchParamValue } from "./services/util";
import {
  changeEditState,
  changeUsedArray,
  setApi,
  setHeaderVisible,
  setTitle,
  setToken,
  setUsedArray,
} from "./redux/actions/commonActions";
import Home from "@/views/home";

const App: React.FC = () => {
  const dispatch = useDispatch();
  useMount(() => {
    init();
  });
  const init = () => {
    let token =
      getSearchParamValue(window.location.search, "token") ||
      localStorage.getItem("token");
    console.log(token);
    if (token) {
      request.setToken(token);
      dispatch(setToken(token));
    }
    const getDataApi = JSON.parse(
      (getSearchParamValue(window.location.search, "getDataApi") as string) ||
        (localStorage.getItem("getDataApi") as string)
    );

    const patchDataApi = JSON.parse(
      (getSearchParamValue(window.location.search, "patchDataApi") as string) ||
        (localStorage.getItem("patchDataApi") as string)
    );

    const getUptokenApi = JSON.parse(
      (getSearchParamValue(
        window.location.search,
        "getUptokenApi"
      ) as string) || (localStorage.getItem("getUptokenApi") as string)
    );
    if (getDataApi || patchDataApi || getUptokenApi) {
      dispatch(
        setApi({
          getDataApi: getDataApi,
          patchDataApi: patchDataApi,
          getUptokenApi: getUptokenApi,
        })
      );
    }

    let isEdit =
      (getSearchParamValue(window.location.search, "isEdit") as string) ||
      (localStorage.getItem("isEdit") as string);
    dispatch(changeEditState(isEdit === "2" ? true : false));

    if (getSearchParamValue(window.location.search, "title")) {
      dispatch(
        setTitle(getSearchParamValue(window.location.search, "title") as string)
      );
    }
    if (getSearchParamValue(window.location.search, "hideHead")) {
      dispatch(setHeaderVisible(true));
    }
    if (localStorage.getItem("used")) {
      dispatch(
        setUsedArray(JSON.parse(localStorage.getItem("used") as string))
      );
    }
  };
  return (
    <div id="app">
      <Home />
    </div>
  );
};
export default App;
