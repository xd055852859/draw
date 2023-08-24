import "./left.scss";
import { useTypedSelector } from "@/redux/reducer/RootState";
import { useDispatch } from "react-redux";
import type { CollapseProps, TabsProps } from "antd";
import { Collapse, Divider, Tabs, Tooltip } from "antd";
import {
  basicShape,
  flowChart,
  activeDiagram,
  timeDiagram,
  imgTool,
  IconList,
  commonShape,
} from "@/components/config/config";
import CustomIcon from "./customIcon";
import Set from "../set/set";
import { changeActiveState } from "@/redux/actions/commonActions";
import baseSvg from "@/assets/icon/base.svg";
import customSvg from "@/assets/icon/custom.svg";
import baseWSvg from "@/assets/icon/baseW.svg";
import customWSvg from "@/assets/icon/customW.svg";
import rightPinSvg from "@/assets/icon/rightPin.svg";
import pinSvg from "@/assets/icon/pin.svg";

import { setSelectNode } from "@/redux/actions/drawActions";
import { spaceData } from "@/redux/reducer/draw";
interface LeftProps {
  onDrag: (ev: any, item: any) => void;
}
const Left: React.FC<LeftProps> = (props) => {
  const { onDrag } = props;
  const dispatch = useDispatch();
  const { drawCanvas, selectNode } = useTypedSelector((state) => state.draw);
  const { activeState, usedArray, dragState } = useTypedSelector(
    (state) => state.common
  );
  const [chooseIndex, setChooseIndex] = useState<number>(0);
  const [pinState, setPinState] = useState<boolean>(false);
  const [commonVisible, setCommonVisible] = useState<boolean>(false);
  const commonImage = {
    name: "logo",
    key: "2199464824",
    url: "https://cdn-icare.qingtime.cn/1646464474956.svg",
    icon: "icon-image",
    data: {
      text: "",
      rect: {
        width: 100,
        height: 100,
      },
      name: "image",
      image: "https://cdn-icare.qingtime.cn/1646464474956.svg",
    },
  };
  useEffect(() => {
    if (!dragState) {
      if (
        drawCanvas?.activeLayer.pens &&
        drawCanvas?.activeLayer.pens.length > 0
      ) {
        setChooseIndex(0);
        dispatch(changeActiveState(drawCanvas?.activeLayer.pens[0].type + 1));
        // //@ts-ignore
        // if (drawCanvas?.activeLayer.pens[0]?.image) {
        //   setCommonVisible(true);
        // } else {
        //   setCommonVisible(false);
        // }
      } else {
        // setChooseIndex(0);
        if (activeState !== -1) {
          dispatch(changeActiveState(0));
        }
      }
    }
  }, [drawCanvas?.activeLayer.pens]);
  const collapseItems: CollapseProps["items"] = [
    {
      key: "1",
      label: "基础形状",
      children: (
        <div className="left-icon-box">
          {basicShape.map((item: any, index: any) => (
            <Tooltip title={item.name} key={"basicShape" + index}>
              <div
                className="left-icon-item"
                draggable
                onDragStart={(ev) => onDrag(ev, item)}
              >
                <i
                  className={"iconfont " + item.icon}
                  style={{ fontSize: 25, color: "#333" }}
                ></i>
              </div>
            </Tooltip>
          ))}
        </div>
      ),
    },
    {
      key: "2",
      label: "流程图",
      children: (
        <div className="left-icon-box">
          {flowChart.map((item: any, index: any) => (
            <Tooltip title={item.name} key={"flowChart" + index}>
              <div
                className="left-icon-item"
                draggable
                onDragStart={(ev) => onDrag(ev, item)}
              >
                <i
                  className={"iconfont " + item.icon}
                  style={{ fontSize: 25, color: "#333" }}
                ></i>
              </div>
            </Tooltip>
          ))}
        </div>
      ),
    },
    {
      key: "3",
      label: "活动图",
      children: (
        <div className="left-icon-box">
          {activeDiagram.map((item: any, index: any) => (
            <Tooltip title={item.name} key={"activeDiagram" + index}>
              <div
                className="left-icon-item"
                draggable
                onDragStart={(ev) => onDrag(ev, item)}
              >
                <i
                  className={"iconfont " + item.icon}
                  style={{ fontSize: 25, color: "#333" }}
                ></i>
              </div>
            </Tooltip>
          ))}
        </div>
      ),
    },
    {
      key: "4",
      label: "时序图和类图",
      children: (
        <div className="left-icon-box">
          {timeDiagram.map((item: any, index: any) => (
            <Tooltip title={item.name} key={"timeDiagram" + index}>
              <div
                className="left-icon-item"
                title={item.name}
                draggable
                onDragStart={(ev) => onDrag(ev, item)}
              >
                <i
                  className={"iconfont " + item.icon}
                  style={{ fontSize: 25, color: "#333" }}
                ></i>
              </div>
            </Tooltip>
          ))}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="left">
        <div
          className="left-box"
          style={
            activeState !== -1
              ? {
                  animation:
                    activeState === 0
                      ? "toLeft 0.5s forwards"
                      : "toRight 0.5s forwards",
                }
              : {}
          }
        >
          <div className="left-base">
            <div
              onClick={() => {
                setChooseIndex(1);
              }}
              onMouseEnter={() => {
                setChooseIndex(1);
              }}
              style={chooseIndex === 1 ? { backgroundColor: "#f0f0f0" } : {}}
            >
              <img src={baseSvg} alt="" />
              <div>组件库</div>
            </div>
            <div
              onClick={() => {
                setChooseIndex(2);
              }}
              onMouseEnter={() => {
                setChooseIndex(2);
              }}
              style={chooseIndex === 2 ? { backgroundColor: "#f0f0f0" } : {}}
            >
              <img
                src={customSvg}
                alt=""
                style={{ width: "35px", height: "35px" }}
              />
              <div style={{ marginTop: "0px" }}>图标库</div>
            </div>
            <Divider dashed />
            <div className="left-common">
              {commonShape.map((item, index) => {
                return (
                  <Tooltip title={item.name} key={"basicShape" + index}>
                    <div
                      className="left-used-item"
                      draggable
                      onDragStart={(ev) => onDrag(ev, item)}
                    >
                      <i
                        className={"iconfont " + item.icon}
                        style={{ fontSize: 30, color: "#333" }}
                      ></i>
                    </div>
                  </Tooltip>
                );
              })}
              <div
                className="left-used-item"
                draggable
                onDragStart={(ev) => onDrag(ev, commonImage)}
              >
                <img src={commonImage.url} alt={"默认图标"} className="" />
              </div>
            </div>
            <Divider dashed />
            <div className="left-used">
              {usedArray.map((item, index) => {
                return item.key ? (
                  <div
                    className="left-used-item"
                    key={index}
                    draggable
                    onDragStart={(ev) => onDrag(ev, item)}
                  >
                    <img src={item.url} alt={item.name} className="" />
                  </div>
                ) : (
                  <Tooltip title={item.name} key={"basicShape" + index}>
                    <div
                      className="left-used-item"
                      draggable
                      onDragStart={(ev) => onDrag(ev, item)}
                    >
                      <i
                        className={"iconfont " + item.icon}
                        style={{ fontSize: 30, color: "#333" }}
                      ></i>
                    </div>
                  </Tooltip>
                );
              })}
            </div>
          </div>
          <Set setCommonVisible={setCommonVisible} />
        </div>
      </div>
      {pinState ||
      (chooseIndex && activeState !== 1) ||
      (commonVisible && activeState === 1) ? (
        // commonVisible && activeState === 1 ? "right-dialog" : "left-dialog"
        <div
          className={"left-dialog"}
          onMouseLeave={() => {
            if (!pinState) {
              setChooseIndex(0);
            }
            setCommonVisible(false);
          }}
        >
          <div className="left-dialog-base">
            {chooseIndex === 1 && !commonVisible ? (
              <Collapse
                items={collapseItems}
                defaultActiveKey={["1", "2", "3", "4"]}
              />
            ) : (
              <CustomIcon onDrag={onDrag} />
            )}
            <div
              className="left-dialog-pin"
              onClick={() => {
                setPinState(!pinState);
              }}
            >
              <img src={pinState ? pinSvg : rightPinSvg} alt="" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Left;
