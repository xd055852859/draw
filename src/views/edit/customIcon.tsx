import React, { useState, useEffect } from "react";
import "./customIcon.scss";
import { useTypedSelector } from "@/redux/reducer/RootState";
import { useDispatch } from "react-redux";
import { useMount } from "@/hooks/common";
import api from "@/services/api";
import { ResultProps } from "@/interface/Common";
import { Tag } from "antd";
import { setDrawCanvas } from "@/redux/actions/drawActions";

interface LeftProps {
  onDrag: (ev: any, item: any) => void;
}
const CustomIcon: React.FC<LeftProps> = (props) => {
  // const  = useTypedSelector((state) => state.auth.);
  const { onDrag } = props;
  const { drawCanvas } = useTypedSelector((state) => state.draw);
  const dispatch = useDispatch();
  const [iconList, setIconList] = useState<any>(null);
  const [tagList, setTagList] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [tagKey, setTagKey] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [chooseIndex, setChooseIndex] = useState<number>(0);
  useMount(() => {
    // getIconData();
    getIconTree();
  });
  useEffect(() => {
    if (
      drawCanvas?.activeLayer.pens &&
      drawCanvas?.activeLayer.pens.length > 0 &&
      //@ts-ignore
      drawCanvas?.activeLayer.pens[0]?.image
    ) {
      drawCanvas.updateProps();
    }
    //@ts-ignore
  }, [drawCanvas?.activeLayer.pens]);

  useEffect(() => {
    console.log(page);
    if (page === 1) {
      setIconList([]);
    } else {
      getIconData();
    }
  }, [page]);
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    } else {
      setIconList([]);
    }
  }, [tagKey]);
  useEffect(() => {
    if (iconList && iconList.length === 0) {
      getIconData();
    }
  }, [iconList]);
  const getIconData = async () => {
    const iconRes = (await api.request.get(
      "https://icondata.qingtime.cn/icon",
      { tagKey: tagKey, page: page, limit: 200 }
    )) as ResultProps;
    if (iconRes.msg === "OK") {
      let arr = iconRes.data.map((item) => {
        let newItem = {
          name: "logo",
          key: item._key,
          url: item.url,
          icon: "icon-image",
          data: {
            text: "",
            rect: {
              width: 100,
              height: 100,
            },
            name: "image",
            image: item.url,
          },
        };
        return newItem;
      });
      setIconList([...iconList, ...arr]);
      setTotal(iconRes.totalNum as number);
    }
  };
  const getIconTree = async () => {
    const iconRes = (await api.request.get(
      "https://icondata.qingtime.cn/tag/tree"
    )) as ResultProps;
    if (iconRes.msg === "OK") {
      let arr = Object.values(iconRes.data);
      arr.splice(0, 1);
      setTagList(arr);
    }
  };
  const scrollIcon = (e) => {
    let newPage = page;
    //文档内容实际高度（包括超出视窗的溢出部分）
    let scrollHeight = e.target.scrollHeight;
    //滚动条滚动距离
    let scrollTop = e.target.scrollTop;
    //窗口可视范围高度
    let height = e.target.clientHeight;
    console.log(iconList.length);
    console.log(total);
    console.log(iconList.length < total);

    if (height + scrollTop >= scrollHeight && iconList.length < total) {
      newPage++
      setPage(newPage);
    }
  };

  const changeIcon = (url: string) => {
    let canvas: any = drawCanvas;
    if (
      canvas &&
      canvas.activeLayer.pens.length === 1 &&
      canvas.activeLayer.pens[0].type === 0
    ) {
      //@ts-ignore
      canvas.activeLayer.pens[0].image = url;
      dispatch(setDrawCanvas(canvas));
    }
  };
  return (
    <>
      <div className="tag-box">
        <div
          className="tag-item"
          onClick={() => {
            setTagKey("");
            setChooseIndex(0);
          }}
        >
          <Tag color={chooseIndex === 0 ? "blue" : "default"}>所有</Tag>
        </div>
        {tagList.map((item: any, index: any) => (
          <div
            className="tag-item"
            key={index}
            onClick={() => {
              setTagKey(item._key);
              setChooseIndex(index + 1);
            }}
          >
            <Tag color={chooseIndex === index + 1 ? "blue" : "default"}>
              {item.name}
            </Tag>
          </div>
        ))}
      </div>
      <div className="custom-icon-box" onScroll={scrollIcon}>
        {iconList
          ? iconList.map((item: any, index: any) => (
              <div
                className="custom-icon-item"
                key={index}
                draggable
                onDragStart={(ev) => onDrag(ev, item)}
                onClick={() => changeIcon(item.url)}
              >
                <img
                  src={item.url}
                  alt={item.name}
                  className="custom-icon-img"
                />
              </div>
            ))
          : null}
      </div>
    </>
  );
};
export default CustomIcon;
