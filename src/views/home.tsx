import "./home.scss";
import { useTypedSelector } from "@/redux/reducer/RootState";
import { useDispatch } from "react-redux";
import { useMount } from "@/hooks/common";
import { is_mobile } from "@/services/util";
import { setContent, setTitle } from "@/redux/actions/commonActions";
import api from "@/services/api";
import { setUploadToken } from "@/redux/actions/authActions";
import Edit from "./edit/edit";
import Preview from "./preview/preview";
const Home: React.FC = (props) => {
  const dispatch = useDispatch();
  const { apiObj, token, editState } = useTypedSelector(
    (state) => state.common
  );
  const [isPhone, setIsPhone] = useState(false);
  //获取绘图数据
  useEffect(() => {
    if (token) {
      getData();
      getUpToken();
      if (is_mobile()) {
        setIsPhone(true);
      }
      window.addEventListener("message", handlerIframeEvent);
      return () => {
        window.removeEventListener("message", handlerIframeEvent);
      };
    }
  }, [token]);
  const handlerIframeEvent = (e: any) => {
    switch (e.data.eventName) {
      case "parent-title-change":
        dispatch(setTitle(e.data.data));
        break;
    }
  };
  const getData = async () => {
    let obj: any = { ...apiObj.getDataApi.params };
    if (token) {
      obj.token = token;
    }
    const drawRes: any = await api.request.get(apiObj.getDataApi.url, {
      ...obj,
    });
    if (drawRes.msg === "OK") {
      let result = drawRes.result || drawRes.data;
      dispatch(setContent(result[apiObj.patchDataApi.docDataName[0]]));
      dispatch(setTitle(result[apiObj.patchDataApi.docDataName[1]]));
    }
  };
  const getUpToken = async () => {
    const upTokenRes: any = await api.request.get(apiObj.getUptokenApi.url, {
      token: token,
      ...apiObj.getUptokenApi.params,
    });
    if (upTokenRes.msg === "OK") {
      dispatch(setUploadToken(upTokenRes.result));
    }
  };
  return (
    <div className="home">
      {editState  ? <Edit /> : <Preview />}
    </div>
  );
};
export default Home;
