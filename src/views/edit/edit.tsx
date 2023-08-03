import "./edit.scss";
import { useTypedSelector } from "@/redux/reducer/RootState";
import { useDispatch } from "react-redux";
import { setDrawCanvas, setSelectNode } from "@/redux/actions/drawActions";
import { register as registerFlow } from "@topology/flow-diagram"; // 流程图
import { register as registerActivity } from "@topology/activity-diagram"; // 活动图
import { register as registerClass } from "@topology/class-diagram"; // 类图
import { register as registerSequence } from "@topology/sequence-diagram"; // 时序图
import { register as registerMyself } from "@/components/customized-diagram";
import { useMount } from "@/hooks/common";
import { Options, Topology } from "@topology/core";
import Header from "@/components/header/header";
import EventEmitter from "@/components/common/event";
import Left from "./left";
import { selectType, spaceData } from "@/redux/reducer/draw";
import { message } from "antd";
import { setDragState } from "@/redux/actions/commonActions";

const Edit: React.FC = (props) => {
  const {} = props;
  const { content, headerVisible, styleType, editState, dragState } =
    useTypedSelector((state) => state.common);
  const { drawCanvas, selectNode } = useTypedSelector((state) => state.draw);
  const dispatch = useDispatch();
  const [] = useState<number[]>([]);
  // const dispatch = useDispatch();
  // const location = useLocation();
  const selectedRef = useRef<selectType>();
  const [shortcutVisible, setShortcutVisible] = useState(false);

  useEffect(() => {
    if (dragState && drawCanvas) {
      drawCanvas.activeLayer.clear();
      drawCanvas.hoverLayer.clear();
      console.log(drawCanvas);
      dispatch(setSelectNode(spaceData));
      drawCanvas?.render();
      dispatch(setDragState(false));
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
        dispatch(setDragState(true));
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
        if (selectedRef.current?.pen?.id !== data.id && event !== "addLine") {
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
        dispatch(setSelectNode(spaceData));
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
        break;
      case "delete":
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
    canvas.fitView(140);
    canvas.render();
    dispatch(setDrawCanvas(canvas));
    EventEmitter.on("reload", reload);
    return () => {
      canvas.destroy();
      EventEmitter.remove("reload", reload);
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

  return (
    <>
      {headerVisible ? <Header /> : null}
      <div className="page">
        <Left />

        <div className="edit">
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
