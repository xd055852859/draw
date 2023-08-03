import React, { useState, useEffect } from "react";
import { Topology } from "@topology/core";
import "./preview.scss";
import { useTypedSelector } from "@/redux/reducer/RootState";
import { is_mobile } from "@/services/util";
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
