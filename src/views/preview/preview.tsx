import React, { useState, useEffect } from "react";
import { Topology } from "@topology/core";
import "./preview.scss";
import { useTypedSelector } from "@/redux/reducer/RootState";
import { is_mobile } from "@/services/util";
import { register as registerFlow } from "@topology/flow-diagram"; // 流程图
import { register as registerActivity } from "@topology/activity-diagram"; // 活动图
import { register as registerClass } from "@topology/class-diagram"; // 类图
import { register as registerSequence } from "@topology/sequence-diagram"; // 时序图
import { register as registerMyself } from "@/components/customized-diagram";
import { useMount } from "@/hooks/common";
import { Button, Tooltip } from "antd";
import {
  PicCenterOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import Header from "@/components/header/header";

const Preview: React.FC = (props) => {
  const { content, headerVisible } = useTypedSelector((state) => state.common);
  const { drawCanvas } = useTypedSelector((state) => state.draw);
  const [scaleNumber, setScaleNumber] = useState<number>(1);
  const [previewCanvas, setPreviewCanvas] = useState<Topology | null>(null);
  const contentRef = useRef(null);

  useMount(() => {
    setPreviewCanvas(new Topology("preview"));
    canvasRegister();
    return () => {
      if (previewCanvas) {
        previewCanvas.destroy();
        setPreviewCanvas(null);
      }
    };
  });

  // 加载绘图数据
  useEffect(() => {
    if (previewCanvas && content) {
      previewCanvas.open(content);
      previewCanvas.fitView(80);
      previewCanvas.lock(1);
    }
  }, [previewCanvas, content]);

  const scaleZoomOut = () => {
    if (scaleNumber < 5 && previewCanvas) {
      setScaleNumber(scaleNumber + 0.5);
      previewCanvas.scaleTo(scaleNumber + 0.5);
    }
  };

  /**
   * 缩小画布
   */
  const scaleZoomIn = () => {
    if (scaleNumber > 0.5 && previewCanvas) {
      setScaleNumber(scaleNumber - 0.5);
      previewCanvas.scaleTo(scaleNumber - 0.5);
    }
  };
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
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
    <div className="preview">
      {headerVisible ? <Header /> : null}
      <div
        id="preview"
        ref={contentRef}
        style={{
          height: headerVisible ? "calc(100% - 55px)" : "100%",
          width: "100%",
          backgroundColor: "white",
        }}
        onContextMenu={handleClick}
      />
      <div
        className="preview-controlls"
        onDoubleClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Tooltip title="放大">
          <Button
            shape="circle"
            size="large"
            onClick={scaleZoomOut}
            icon={<ZoomInOutlined />}
          />
        </Tooltip>
        <Tooltip title="放大">
          <Button
            shape="circle"
            size="large"
            onClick={scaleZoomIn}
            icon={<ZoomOutOutlined />}
          />
        </Tooltip>

        <Tooltip title="自适应居中" placement="top">
          <Button
            shape="circle"
            size="large"
            onClick={() => drawCanvas?.fitView(80)}
            icon={<PicCenterOutlined />}
          ></Button>
        </Tooltip>
      </div>
    </div>
  );
};
export default Preview;
