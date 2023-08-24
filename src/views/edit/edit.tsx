import "./edit.scss";
import { useTypedSelector } from "@/redux/reducer/RootState";
import { useDispatch } from "react-redux";
import { setDrawCanvas, setSelectNode } from "@/redux/actions/drawActions";
import { register as registerFlow } from "@topology/flow-diagram"; // 流程图
import { register as registerActivity } from "@topology/activity-diagram"; // 活动图
import { register as registerClass } from "@topology/class-diagram"; // 类图
import { register as registerSequence } from "@topology/sequence-diagram"; // 时序图
import { register as registerMyself } from "@/components/customized-diagram";
import { changeUsedArray } from "@/redux/actions/commonActions";
import { useMount } from "@/hooks/common";
import { Options, Topology } from "@topology/core";
import Header from "@/components/header/header";
import EventEmitter from "@/components/common/event";
import Left from "./left";
import { selectType, spaceData } from "@/redux/reducer/draw";
import { message } from "antd";
import {
  changeDragState,
  changeSaveState,
} from "@/redux/actions/commonActions";
const initialState = {
  mouseX: 0,
  mouseY: 0,
};

const Edit: React.FC= (props) => {
  const { content, headerVisible, editState, styleObject, dragState } =
    useTypedSelector((state) => state.common);
  const { drawCanvas, selectNode } = useTypedSelector((state) => state.draw);
  const dispatch = useDispatch();
  const [mousestate, setMouseState] = useState<{
    mouseX: number;
    mouseY: number;
  }>(initialState);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  // const dispatch = useDispatch();
  // const location = useLocation();
  const selectedRef = useRef<selectType>();
  const pageRef = useRef<any>();
  const [shortcutVisible, setShortcutVisible] = useState(false);

  useEffect(() => {
    if (dragState && drawCanvas) {
      drawCanvas.activeLayer.clear();
      drawCanvas.hoverLayer.clear();
      console.log(drawCanvas);
      dispatch(setSelectNode(spaceData));
      drawCanvas?.render();
      dispatch(changeDragState(false));
    }
  }, [dragState]);

  const reload = () => {
    setTimeout(() => {
      if (drawCanvas) {
        drawCanvas.resize();
        drawCanvas.canvasPos =
          drawCanvas.divLayer.canvas.getBoundingClientRect();
      }
    }, 200);
  };
  const clearActive = (e) => {
    if (e.keyCode === 27) {
      //esc
      dispatch(changeDragState(true));
    }
  };
  const onMessage = (event: any, data: any) => {
    /*  const setLineAnimation = (line: Line, switchStart: boolean = true) => {
        line.animateStart = switchStart ? new Date().getTime() : 0;
        line.animateDotSize = 4;
        line.animatePlay = true;
        line.animatePos = 168;
        line.animateSpan = 1;
        line.animateType = 'dot';
      }
    */
    switch (event) {
      case "node": // 节点
        /*   canvas.data.pens.forEach((pen) => {
            //@ts-ignore
            if (pen.type === 1 && pen.from.id === data.id) {
              setLineAnimation(pen as Line, true);
              //@ts-ignore
            } else if (pen.type === 1 && pen.from.id !== data.id) {
              setLineAnimation(pen as Line, false);
            }
          }); */
        // console.log(event, data);
        // dispatch(editArticleSaveStatus(-1));
        if (selectedRef.current?.pen?.id !== data.id) {
          dispatch(
            setSelectNode({
              type: 0,
              pen: data,
              multi: false,
              nodes: undefined,
              locked: data.locked,
            })
          );
        }
        break;
      case "addNode":
        // dispatch(editArticleSaveStatus(-1));
        // if (selectedRef.current?.pen?.id !== data.id) {
        //   dispatch(
        //     setSelectNode({
        //       type: 0,
        //       pen: data,
        //       multi: false,
        //       nodes: undefined,
        //       locked: data.locked,
        //     })
        //   );
        // dispatch(setSelectNode(spaceData));
        // }
        dispatch(changeDragState(true));
        dispatch(changeSaveState(true));
        break;
      case "line": // 连线
      case "addLine":
        // console.log(event, data,canvas?.activeLayer);
        let distance =
          (data.from.x - data.to.x) * (data.from.x - data.to.x) +
          (data.from.y - data.to.y) * (data.from.y - data.to.y);
        if (
          !data.to.id &&
          distance < 4000 &&
          drawCanvas?.activeLayer?.pens[0]?.type === 1
        ) {
          drawCanvas.delete();
        }
        if (drawCanvas) {
          if (data.from.id && !drawCanvas.find(data.from.id)) {
            data.from.id = null;
            drawCanvas.updateProps();
          }
          if (data.to.id && !drawCanvas.find(data.to.id)) {
            data.to.id = null;
            drawCanvas.updateProps();
          }
        }
        // dispatch(editArticleSaveStatus(-1));
        if (event === "addLine") {
          dispatch(setSelectNode(spaceData));
          dispatch(changeDragState(true));
          dispatch(changeSaveState(true));
        } else if (selectedRef.current?.pen?.id !== data.id) {
          dispatch(
            setSelectNode({
              type: 1,
              pen: data,
              multi: false,
              nodes: undefined,
              locked: data.locked,
            })
          );
        }
        break;
      case "space": // 空白处
        console.log(selectedRef.current);
        if (
          selectedRef.current?.pen?.id ||
          (selectedRef.current?.nodes && selectedRef.current.nodes.length > 0)
        ) {
          dispatch(setSelectNode(spaceData));
          dispatch(changeSaveState(true));
        }
        setMenuVisible(false);
        setMouseState({ mouseX: 0, mouseY: 0 });
        /*  canvas.data.pens.forEach((pen) => {
            //@ts-ignore
            if (pen.type === 1) {
              setLineAnimation(pen as Line, false);
            }
          }); */
        break;
      case "multi":
        // dispatch(editArticleSaveStatus(-1));
        dispatch(
          setSelectNode({
            type: 2,
            pen: undefined,
            multi: true,
            nodes: data,
            locked: undefined,
          })
        );
        break;
      case "move":
        // dispatch(editArticleSaveStatus(-1));
        break;
      case "scale":
        break;
      case "copy":
        if (data.pens.length === 0) {
          message.error("请选择复制图形");
        }
        break;
      case "paste":
        //@ts-ignore
        navigator.clipboard.read().then((value) => {
          if (value[0].types.includes("image/png")) {
            if (drawCanvas) {
              drawCanvas.delete([data]);
            }
          }
        });
        dispatch(changeSaveState(true));
        break;
      case "delete":
        dispatch(changeSaveState(true));
        break;
      // data.TID;
      default:
        break;
    }
  };

  // dispatch

  //   useEffect(() => {
  //     if (drawCanvas?.options && drawCanvas.data && styleType) {
  //       drawCanvas.options.color = styleType.lineColor;
  //       drawCanvas.updateProps();
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [styleType]);

  useEffect(() => {
    console.log(editState);
    const canvasOptions: Options = {
      rotateCursor: "/rotate.cur",
      activeColor: "rgba(255,0,0,0.3)",
      autoAnchor: true,
      translateKey: 4,
    };
    canvasOptions.on = onMessage;
    canvasRegister();
    let canvas = new Topology("edit", canvasOptions);
    canvas.data.grid = true;
    canvas.data.gridColor = "#f6f6f6";
    canvas.data.gridSize = 15;

    canvas.data.lineName = localStorage.getItem("lineName")
      ? (localStorage.getItem("lineName") as string)
      : "curve";
    canvas.fitView(140);
    canvas.render();
    dispatch(setDrawCanvas(canvas));
    pageRef.current.addEventListener("reload", reload);
    pageRef.current.addEventListener("keydown", clearActive);
    return () => {
      canvas.destroy();
      pageRef.current.removeEventListener("reload", reload);
      pageRef.current.removeEventListener("keydown", clearActive);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    selectedRef.current = selectNode;
  }, [selectNode]);

  // 加载绘图数据
  useEffect(() => {
    if (drawCanvas && content) {
      drawCanvas.open(content);
      drawCanvas.render();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawCanvas, content]);
  // useEffect(() => {
  //   // if (canvas && canvas.data) {
  //   //   setBackGrid(!!canvas.data.grid);
  //   // }
  //   console.log(canvas.data);
  // },[canvas]);
  /**
   * 注册图形库
   */

  const canvasRegister = () => {
    registerFlow();
    // activity
    registerActivity();
    // class
    registerClass();
    // sequence
    registerSequence();
    // 注册自定义组件
    registerMyself();
    // registerNode('myShape', myShapeData, myShapeDataAnchors, myShapeDataIconRect, myShapeDataTextRect);
  };
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!selectNode.pen) return;
    console.log(selectNode.pen);
    setMouseState({ mouseX: event.clientX - 2, mouseY: event.clientY - 4 });
    setMenuVisible(true);
  };
  const handleLayer = (type) => {
    if (drawCanvas?.activeLayer?.pens && drawCanvas.activeLayer.pens[0]) {
      switch (type) {
        case "top":
          drawCanvas.top(drawCanvas.activeLayer.pens[0]);
          break;
        case "bottom":
          drawCanvas.bottom(drawCanvas.activeLayer.pens[0]);
          break;
        case "up":
          drawCanvas.up(drawCanvas.activeLayer.pens[0]);
          break;
        case "down":
          drawCanvas.down(drawCanvas.activeLayer.pens[0]);
          break;
      }
      setMenuVisible(false);
    }
  };
  const onDrag = (event: any, node: any) => {
    node.data = {
      ...node.data,
    };
    if (node.data.type === 1) {
      node.data.name = styleObject.name;
    }
    dispatch(changeUsedArray(node));
    event.dataTransfer.setData("Topology", JSON.stringify(node.data));
  };

  return (
    <>
      {headerVisible ? <Header /> : null}
      <div className="page" ref={pageRef}>
        <Left onDrag={onDrag}/>

        <div className="edit" onContextMenu={handleClick}>
          <div
            id="edit"
            style={{ cursor: "context-menu", height: "100%", width: "100%" }}
          />
          {/* <Tooltip title="查看快捷键">
            <IconButton
              style={{ position: "absolute", bottom: "24px", right: "24px" }}
              onClick={() => setShortcutVisible(true)}
            >
              <KeyboardOutlinedIcon />
            </IconButton>
          </Tooltip> */}
          {menuVisible ? (
            <div
              className="edit-menu"
              style={{ top: mousestate.mouseY, left: mousestate.mouseX }}
            >
              <div
                className="menu-item"
                onClick={() => {
                  handleLayer("up");
                }}
              >
                上一图层
              </div>
              <div
                className="menu-item"
                onClick={() => {
                  handleLayer("down");
                }}
              >
                下一图层
              </div>
              <div
                className="menu-item"
                onClick={() => {
                  handleLayer("top");
                }}
              >
                置顶
              </div>
              <div
                className="menu-item"
                onClick={() => {
                  handleLayer("bottom");
                }}
              >
                置底
              </div>
            </div>
          ) : null}
        </div>

        {/* <DrawShortcutPanel
          visible={shortcutVisible}
          handleClose={() => setShortcutVisible(false)}
        /> */}
      </div>
    </>
  );
};
export default Edit;
