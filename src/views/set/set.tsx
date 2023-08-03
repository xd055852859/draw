import React, { useState, useEffect } from "react";
import "./set.scss";
import { useTypedSelector } from "@/redux/reducer/RootState";
import { useDispatch } from "react-redux";
import { setDrawCanvas, setSelectNode } from "@/redux/actions/drawActions";
import { ColorPicker, Divider } from "antd";
import { useMount } from "@/hooks/common";
import { ArrowType, DashType, LineType } from "@/interface/Line";
import lineSvg from "@/assets/svg/line.svg";
import dashlineSvg from "@/assets/svg/dashline.svg";
import longlineSvg from "@/assets/svg/longline.svg";
import dotlineSvg from "@/assets/svg/dotline.svg";

import fontSizeSvg from "@/assets/icon/fontSize.svg";
import boldSvg from "@/assets/icon/bold.svg";
import leftArrowSvg from "@/assets/icon/leftArrow.svg";
import boldChooseSvg from "@/assets/icon/boldChoose.svg";
import italicSvg from "@/assets/icon/italic.svg";
import italicChooseSvg from "@/assets/icon/italicChoose.svg";
import fontColorSvg from "@/assets/icon/fontColor.svg";
import lineColorSvg from "@/assets/icon/lineColor.svg";
import fillColorSvg from "@/assets/icon/fillColor.svg";
import lineWidthSvg from "@/assets/icon/lineWidth.svg";

import verticallySvg from "@/assets/icon/align-vertically.svg";
import topSvg from "@/assets/icon/align-top.svg";
import bottomSvg from "@/assets/icon/align-bottom.svg";
import justifySvg from "@/assets/icon/align-justify.svg";
import leftSvg from "@/assets/icon/align-left.svg";
import rightSvg from "@/assets/icon/align-right.svg";
import verticallyWSvg from "@/assets/icon/align-vertically-w.svg";
import topWSvg from "@/assets/icon/align-top-w.svg";
import bottomWSvg from "@/assets/icon/align-bottom-w.svg";
import justifyWSvg from "@/assets/icon/align-justify-w.svg";
import leftWSvg from "@/assets/icon/align-left-w.svg";
import rightWSvg from "@/assets/icon/align-right-w.svg";
import { changeActiveState, changeDragState, changeSaveState } from "@/redux/actions/commonActions";
const Set: React.FC = (props) => {
  const {} = props;
  const { activeState } = useTypedSelector((state) => state.common);
  const { drawCanvas, selectNode } = useTypedSelector((state) => state.draw);
  const dispatch = useDispatch();
  const [propsState, setPropsState] = useState<boolean>(false);
  const [showVisible, setShowVisible] = useState<boolean>(false);
  const [showState, setsShowState] = useState<any>(null);
  const [propsType, setPropsType] = useState<string>("");
  const [fragment, setFragment] = useState<any>(null);

  const [penData, setPenData] = useState<any>({
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    fontColor: "#222",
    strokeStyle: "#111111",
    fillStyle: "",
    textAlign: "center",
    textBaseline: "middle",
    lineWidth: 1,
    dash: 0,
    name: "curve",
    fromArrow: "null",
    toArrow: "triangleSolid",
  });
  // const [fontSize, setFontSize] = useState<number>(12);
  // const [fontWeight, setFontWeight] = useState<string>("normal");
  // const [fontStyle, setFontStyle] = useState<string>("normal");
  // const [fontColor, setFontColor] = useState<string>("#222");
  // const [strokeStyle, setStrokeStyle] = useState<string>("#111111");
  // const [fillStyle, setFillStyle] = useState<string>("");
  // const [textAlign, setTextAlign] = useState<string>("center");
  // const [textBaseline, setTextBaseline] = useState<string>("middle");
  // const [lineWidth, setLineWidth] = useState<number>(1);
  // const [dash, setDash] = useState<number>(0);
  // const [lineName, setLineName] = useState<string>("");
  // const [fromArrow, setFromArrow] = useState<string>("null");
  // const [toArrow, setToArrow] = useState<string>("triangleSolid");
  const dashArray = [lineSvg, dashlineSvg, longlineSvg, dotlineSvg];
  const textAlignArray = [justifySvg, leftSvg, rightSvg];
  const textAlignWArray = [justifyWSvg, leftWSvg, rightWSvg];
  const textAlignTextArray = ["center", "left", "right"];

  const textBaselineArray = [verticallySvg, topSvg, bottomSvg];
  const textBaselineWArray = [verticallyWSvg, topWSvg, bottomWSvg];
  const textBaselineTextArray = ["middle", "top", "bottom"];

  useEffect(() => {
    if (drawCanvas && propsState) {
      drawCanvas.updateProps();
      setPropsState(false);
      dispatch(changeSaveState(true));
    }
  }, [propsState]);
  useEffect(() => {
    if (selectNode.type !== -1) {
      if (selectNode.pen) {
        let newData = selectNode.pen;
        setPenData({
          fontSize: newData.fontSize,
          fontWeight: newData.fontWeight,
          fontStyle: newData.fontStyle,
          fontColor: newData.fontColor,
          strokeStyle: newData.strokeStyle,
          fillStyle: newData.fillStyle,
          textAlign: newData.textAlign,
          textBaseline: newData.textBaseline,
          lineWidth: newData.lineWidth,
          dash: newData.dash,
          name: newData.name,
          //@ts-ignore
          fromArrow: newData.fromArrow,
          //@ts-ignore
          toArrow: newData.toArrow,
        });
      }
    } else {
      setShowVisible(false);
    }
  }, [selectNode]);
  useEffect(() => {
    let newFragment: any = null;
    switch (propsType) {
      case "fontSize":
        setsShowState({ top: "65px", height: "400px" });
        newFragment = Array(28)
          .fill(0)
          .map((item, index) => (
            <div
              className="set-dialog-item"
              onClick={() => changeProps("fontSize", index + 8)}
              key={"fontSize" + index}
              style={
                penData.fontSize === index + 8
                  ? { backgroundColor: "#1677ff", color: "#fff" }
                  : {}
              }
            >
              {index + 8}
            </div>
          ));
        break;
      case "lineWidth":
        setsShowState({ top: "330px", height: "400px" });
        newFragment = Array(12)
          .fill(0)
          .map((item, index) => (
            <div
              className="set-dialog-item"
              onClick={() => changeProps("lineWidth", index + 1)}
              key={"fontSize" + index}
              style={
                penData.lineWidth === index + 1
                  ? { backgroundColor: "#1677ff", color: "#fff" }
                  : {}
              }
            >
              {index + 1}
            </div>
          ));
        break;
      case "textAlign":
        setsShowState({ top: "470px", height: "120px" });
        newFragment = textAlignArray.map((item, index) => (
          <div
            className="set-dialog-item"
            onClick={() => changeProps("textAlign", textAlignTextArray[index])}
            key={"textAlign" + index}
            style={
              penData.textAlign === textAlignTextArray[index]
                ? { backgroundColor: "#1677ff", color: "#fff" }
                : {}
            }
          >
            <img
              src={
                penData.textAlign === textAlignTextArray[index]
                  ? textAlignWArray[index]
                  : item
              }
              alt=""
            />
          </div>
        ));
        break;
      case "textBaseline":
        setsShowState({ top: "560px", height: "120px" });
        newFragment = textBaselineArray.map((item, index) => (
          <div
            className="set-dialog-item"
            onClick={() =>
              changeProps("textBaseline", textBaselineTextArray[index])
            }
            key={"textBaseline" + index}
            style={
              penData.textBaseline === textBaselineTextArray[index]
                ? { backgroundColor: "#1677ff", color: "#fff" }
                : {}
            }
          >
            <img
              src={
                penData.textBaseline === textBaselineTextArray[index]
                  ? textBaselineWArray[index]
                  : item
              }
              alt=""
            />
          </div>
        ));
        break;
      case "name":
        setsShowState({ top: "570px", height: "160px" });
        newFragment = Object.keys(LineType).map((item, index) => (
          <div
            onClick={() => changeProps("name", item)}
            key={"name" + index}
            className="set-dialog-item"
            style={
              penData.name === item
                ? { backgroundColor: "#1677ff", color: "#fff" }
                : {}
            }
          >
            <i
              data-v-6e40022c=""
              className={`t-icon t-${
                item === "curve" ? "curve2" : item
              } arrowIcon`}
            ></i>
          </div>
        ));
        break;
      case "dash":
        setsShowState(
          activeState === 1
            ? { top: "620px", height: "160px" }
            : { top: "520px", height: "160px" }
        );
        newFragment = dashArray.map((item, index) => (
          <div
            onClick={() => changeProps("dash", index)}
            key={"dash" + index}
            className="set-dialog-item"
            style={
              penData.dash === index
                ? { backgroundColor: "#1677ff", color: "#fff" }
                : {}
            }
          >
            <img src={item} alt="" />
          </div>
        ));
        break;
      case "from":
      case "to":
        setsShowState(
          propsType === "from"
            ? { top: "300px", height: "400px" }
            : { top: "350px", height: "400px" }
        );
        newFragment = Object.keys(ArrowType).map((item, index) => (
          <div
            onClick={() => changeProps(propsType + "Arrow", item)}
            key={propsType + index}
            className="set-dialog-item"
            style={
              penData[propsType + "Arrow"] === item
                ? { backgroundColor: "#1677ff", color: "#fff" }
                : {}
            }
          >
            <i
              data-v-6e40022c=""
              className={`t-icon t-${
                index ? `${propsType}-${item}` : "line"
              } arrowIcon`}
            ></i>
          </div>
        ));
        break;
    }
    setFragment(newFragment);
  }, [penData, propsType]);
  const changeProps = (key: string, value: any) => {
    // setPenData({
    //   ...penData,
    //   [key]: value,
    // });

    let canvas = drawCanvas;
    if (canvas?.activeLayer) {
      if (!canvas.activeLayer.pens.length) {
        return;
      }
      canvas.activeLayer.pens.forEach((item, index) => {
        item[key] = value;
      });
      dispatch(
        setSelectNode({
          ...selectNode,
          pen: canvas.activeLayer.pens[0],
        })
      );
      dispatch(setDrawCanvas(canvas));
      setPropsState(true);
    }
  };
  const chooseProps = (type) => {
    setPropsType(type);
    setShowVisible(true);
  };
  const backBase = () => {
    dispatch(changeActiveState(0));
    dispatch(changeDragState(true));
  };
  // lineWidth = 1,
  // strokeStyle = "#111111",
  // dash = 0,
  // fromArrow = "null",
  // toArrow = "triangleSolid",
  // // font = initFont,
  // fillStyle,
  // name = "line",
  // fontColor = "#222",
  // fontFamily = '"Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial',
  // fontSize = 12,
  // lineHeight = 1.5,
  // fontStyle = "normal",
  // fontWeight = "normal",
  // textAlign = "center",
  // textBaseline = "middle",
  return (
    <>
      <div className="set">
        <div className="set-back" onClick={backBase}>
          <img src={leftArrowSvg} alt="" />
        </div>
        <Divider dashed />
        <div
          onMouseEnter={() => chooseProps("fontSize")}
          onClick={() => chooseProps("fontSize")}
        >
          <img src={fontSizeSvg} alt="" />
          <div>字体 ({parseInt(penData.fontSize)})</div>
        </div>
        <div
          onClick={() => {
            changeProps(
              "fontWeight",
              penData.fontWeight === "normal" ? "bold" : "normal"
            );
          }}
          onMouseEnter={() => {
            changeProps(
              "fontWeight",
              penData.fontWeight === "normal" ? "bold" : "normal"
            );
          }}
          style={penData.fontWeight === "bold" ? { color: "#1677ff" } : {}}
        >
          <img
            src={penData.fontWeight === "bold" ? boldChooseSvg : boldSvg}
            alt=""
          />
          <div>粗体</div>
        </div>
        <div
          onClick={() => {
            changeProps(
              "fontStyle",
              penData.fontStyle === "normal" ? "italic" : "normal"
            );
          }}
          onMouseEnter={() => {
            changeProps(
              "fontStyle",
              penData.fontStyle === "normal" ? "italic" : "normal"
            );
          }}
          style={penData.fontStyle === "italic" ? { color: "#1677ff" } : {}}
        >
          <img
            src={penData.fontStyle === "italic" ? italicChooseSvg : italicSvg}
            alt=""
          />
          <div>斜体</div>
        </div>
        <Divider dashed />

        <div>
          {/* <img src={fontColorSvg} alt="" /> */}
          <ColorPicker
            value={penData.fontColor}
            onChangeComplete={(value) => {
              changeProps(
                "fontColor",
                typeof value === "string" ? value : value.toHexString()
              );
            }}
          >
            <div className="set-color">
              <img src={fontColorSvg} alt="" />
              <div>文本</div>
              <div
                className="set-color-div"
                style={{ backgroundColor: penData.fontColor }}
              ></div>
            </div>
          </ColorPicker>
        </div>
        {/*@ts-ignore*/}
        {!selectNode?.pen?.image ? (
          <>
            <div>
              {/* <img src={lineColorSvg} alt="" /> */}
              <ColorPicker
                value={penData.strokeStyle}
                onChangeComplete={(value) => {
                  changeProps(
                    "strokeStyle",
                    typeof value === "string" ? value : value.toHexString()
                  );
                }}
              >
                <div className="set-color">
                  <img src={lineColorSvg} alt="" />
                  <div>{activeState === 2 ? "连线" : "边框"}</div>
                  <div
                    className="set-color-div"
                    style={{ backgroundColor: penData.strokeStyle }}
                  ></div>
                </div>
              </ColorPicker>
            </div>
            {activeState === 1 ? (
              <>
                <div>
                  <ColorPicker
                    value={penData.fillStyle}
                    onChangeComplete={(value) => {
                      changeProps(
                        "fillStyle",
                        typeof value === "string" ? value : value.toHexString()
                      );
                    }}
                  >
                    <div className="set-color">
                      <img src={fillColorSvg} alt="" />
                      <div>背景</div>
                      <div
                        className="set-color-div"
                        style={{
                          backgroundColor: penData.fillStyle,
                          top: "28px",
                        }}
                      ></div>
                    </div>
                  </ColorPicker>
                </div>

                <Divider dashed />
                <div
                  onClick={() => chooseProps("textAlign")}
                  onMouseEnter={() => chooseProps("textAlign")}
                >
                  {/* textAlign */}
                  <img
                    src={
                      textAlignArray[
                        textAlignTextArray.indexOf(penData.textAlign)
                      ]
                    }
                    alt=""
                  />
                  <div>水平</div>
                </div>
                <div
                  onClick={() => chooseProps("textBaseline")}
                  onMouseEnter={() => chooseProps("textBaseline")}
                >
                  {/* textBaseline top middle bottom */}
                  <img
                    src={
                      textBaselineArray[
                        textBaselineTextArray.indexOf(penData.textBaseline)
                      ]
                    }
                    alt=""
                  />
                  <div>垂直</div>
                </div>
              </>
            ) : null}
            <Divider dashed />
            <div
              onClick={() => chooseProps("lineWidth")}
              onMouseEnter={() => chooseProps("lineWidth")}
            >
              {/* lineWidth */}
              <img src={lineWidthSvg} alt="" />
              <div>
                {activeState === 2 ? "线宽" : "边宽"} (
                {parseInt(penData.lineWidth)})
              </div>
            </div>
            <div
              onClick={() => chooseProps("dash")}
              onMouseEnter={() => chooseProps("dash")}
            >
              <img src={dashArray[penData.dash]} alt="" />
              <div>{activeState === 2 ? "连线" : "边框"}</div>
            </div>
            {activeState === 2 ? (
              <>
                <div
                  onClick={() => chooseProps("name")}
                  onMouseEnter={() => chooseProps("name")}
                >
                  <i
                    data-v-6e40022c=""
                    className={`t-icon t-${
                      penData.name === "curve" ? "curve2" : penData.name
                    } arrowIcon`}
                  ></i>
                  <div>连线类型</div>
                </div>
                <div
                  onClick={() => chooseProps("from")}
                  onMouseEnter={() => chooseProps("from")}
                >
                  <i
                    data-v-6e40022c=""
                    className={`t-icon ${
                      penData.fromArrow === "null"
                        ? "t-line"
                        : `t-from-${penData.fromArrow}`
                    } arrowIcon`}
                  ></i>
                  <div>开始箭头</div>
                </div>
                <div
                  onClick={() => chooseProps("to")}
                  onMouseEnter={() => chooseProps("to")}
                >
                  <i
                    data-v-6e40022c=""
                    className={`t-icon ${
                      penData.toArrow === "null"
                        ? "t-line"
                        : `t-to-${penData.toArrow}`
                    } arrowIcon`}
                  ></i>
                  <div>结束箭头</div>
                </div>
              </>
            ) : null}
          </>
        ) : null}
      </div>
      {showVisible ? (
        <div className="set-mask" onMouseLeave={() => setShowVisible(false)}>
          <div className="set-dialog" style={showState}>
            {fragment}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Set;
