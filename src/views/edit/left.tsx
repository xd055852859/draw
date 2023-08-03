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
} from "@/components/config/config";
import CustomIcon from "./customIcon";
import Set from "../set/set";
import {
  changeActiveState,
  changeUsedArray,
} from "@/redux/actions/commonActions";
import baseSvg from "@/assets/icon/base.svg";
import customSvg from "@/assets/icon/custom.svg";
import baseWSvg from "@/assets/icon/baseW.svg";
import customWSvg from "@/assets/icon/customW.svg";
import { setSelectNode } from "@/redux/actions/drawActions";
import { spaceData } from "@/redux/reducer/draw";
const Left: React.FC = (props) => {
  const dispatch = useDispatch();
  const { drawCanvas, selectNode } = useTypedSelector((state) => state.draw);
  const { activeState, styleType, usedArray, dragState } = useTypedSelector(
    (state) => state.common
  );
  const [chooseIndex, setChooseIndex] = useState<number>(0);

  useEffect(() => {
    if (!dragState) {
      if (
        drawCanvas?.activeLayer.pens &&
        drawCanvas?.activeLayer.pens.length > 0
      ) {
        setChooseIndex(0);
        dispatch(changeActiveState(drawCanvas?.activeLayer.pens[0].type + 1));
      } else {
        // setChooseIndex(0);
        if (activeState !== -1) {
          dispatch(changeActiveState(0));
        }
      }
    }
  }, [drawCanvas?.activeLayer.pens]);

  const onDrag = (event: any, node: any) => {
    let arr = [...usedArray];
    node.data = {
      ...node.data,
      lineWidth: styleType?.lineWidth,
      font: { color: styleType?.fontColor },
      fillStyle: styleType?.bgColor,
      strokeStyle: styleType?.borderColor,
    };
    if (node.data.type === 1) {
      node.data.strokeStyle = styleType.lineColor;
    }
    dispatch(changeUsedArray(node));
    event.dataTransfer.setData("Topology", JSON.stringify(node.data));
  };

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
              style={
                chooseIndex === 1
                  ? { backgroundColor: "#1677ff", color: "#fff" }
                  : {}
              }
            >
              <img src={chooseIndex === 1 ? baseWSvg : baseSvg} alt="" />
              <div>组件库</div>
            </div>
            <div
              onClick={() => {
                setChooseIndex(2);
              }}
              onMouseEnter={() => {
                setChooseIndex(2);
              }}
              style={
                chooseIndex === 2
                  ? { backgroundColor: "#1677ff", color: "#fff" }
                  : {}
              }
            >
              <img
                src={chooseIndex === 2 ? customWSvg : customSvg}
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
              <div style={{ marginTop: "5px" }}>图标库</div>
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
          <Set />
        </div>
      </div>
      {chooseIndex ? (
        <div
          className="left-dialog"
          onMouseLeave={() => {
            setChooseIndex(0);
          }}
        >
          <div className="left-dialog-base">
            {chooseIndex === 1 ? (
              <Collapse
                items={collapseItems}
                defaultActiveKey={["1", "2", "3", "4"]}
              />
            ) : (
              <CustomIcon onDrag={onDrag} />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Left;
