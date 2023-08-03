import {
  changeEditState,
  setContent,
  setTitle,
} from "@/redux/actions/commonActions";
import "./header.scss";
import * as FileSaver from "file-saver";
import { useTypedSelector } from "@/redux/reducer/RootState";
import { useDispatch } from "react-redux";
import type { MenuProps } from "antd";
import { Button, Dropdown, Input, message } from "antd";
import {
  CopyOutlined,
  DownloadOutlined,
  FileAddOutlined,
  FileImageOutlined,
  FileOutlined,
  FolderOpenOutlined,
  ScissorOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import fileSvg from "@/assets/svg/file.svg";
import editSvg from "@/assets/svg/edit.svg";
import undoSvg from "@/assets/svg/undo.svg";
import redoSvg from "@/assets/svg/redo.svg";
import pngSvg from "@/assets/svg/png.svg";
import svgSvg from "@/assets/svg/svg.svg";
import api from "@/services/api";
import "@/components/common/canvas2svg";
import { useMount } from "@/hooks/common";

const Header: React.FC = (props) => {
  const {} = props;
  const { token, apiObj, title, editState } = useTypedSelector(
    (state) => state.common
  );
  const { drawCanvas } = useTypedSelector((state) => state.draw);

  const dispatch = useDispatch();
  const [] = useState<number[]>([]);
  useMount(() => {
    if (editState) {
      // window.onbeforeunload = function (e) {
      //   //@ts-ignore
      //   e = e | window.event;
      //   if (e) {
      //     e.returnValue = "请确定修改内容是否保存";
      //   }
      //   return false;
      // };
      // setInterval(()=>{
      //   saveData();
      // },60000)
    }
  });
  const onHandleImportJson = () => {
    if (drawCanvas) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".tdraw";
      input.onchange = (event) => {
        const elem: any = event.srcElement || event.target;
        if (elem.files && elem.files[0]) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const text = e.target.result + "";
            try {
              const data = JSON.parse(text);
              drawCanvas.open(data);
            } catch (e) {
              return false;
            } finally {
            }
          };
          reader.readAsText(elem.files[0]);
        }
      };
      input.click();
    }
  };
  /**
   * 保存为svg
   */

  const onHandleSaveToSvg = () => {
    if (drawCanvas) {
      const rect = drawCanvas.getRect();
      //@ts-ignore
      let ctx = new window.C2S(rect.ex + 100, rect.ey + 100);
      if (drawCanvas.data.pens) {
        for (const item of drawCanvas.data.pens) {
          item.render(ctx);
        }
      }
      let mySerializedSVG = ctx.getSerializedSvg();
      mySerializedSVG = mySerializedSVG.replace(
        "<defs/>",
        `<defs>
      <style type="text/css">
        @font-face {
          font-family: 'topology';
          src: url('http://at.alicdn.com/t/font_1331132_h688rvffmbc.ttf?t=1569311680797') format('truetype');
        }
      </style>
    </defs>`
      );
      mySerializedSVG = mySerializedSVG.replace(/--le5le--/g, "&#x");
      const urlObject = window.URL || window;
      const export_blob = new Blob([mySerializedSVG]);
      const url = urlObject.createObjectURL(export_blob);
      const a = document.createElement("a");
      a.setAttribute("download", `${title || "无标题"}.svg`);
      a.setAttribute("href", url);
      const evt = document.createEvent("MouseEvents");
      evt.initEvent("click", true, true);
      a.dispatchEvent(evt);
    }
  };
  const onHandleSelect = async (key) => {
    if (drawCanvas) {
      // console.log(data)
      switch (key) {
        case "create_new":
          //eslint-disable-next-line
          drawCanvas.open("");
          break;
        case "import_json":
          onHandleImportJson();
          break;
        case "save_json":
          if (!title) {
            alert("请输入标题");
            return;
          }
          FileSaver.saveAs(
            new Blob([JSON.stringify(drawCanvas.pureData())], {
              type: "text/plain;charset=utf-8",
            }),
            `时光绘图${title ? "-" + title : ""}.tdraw`
          );
          break;
        case "save_png":
          drawCanvas.saveAsImage(`${title || "无标题"}.png`);
          break;
        case "save_svg":
          onHandleSaveToSvg();
          break;
        case "undo":
          drawCanvas.undo();
          break;
        case "redo":
          drawCanvas.redo();
          break;
        case "copy":
          drawCanvas.copy();
          break;
        case "cut":
          drawCanvas.cut();
          break;
        case "paste":
          drawCanvas.paste();
          break;
        case "all":
          drawCanvas.getRect();
          break;
        case "delete":
          drawCanvas.delete();
          break;
        default:
          break;
      }
    }
  };
  const saveData = async (state?: string) => {
    if (!title && !state) {
      message.error("请输入绘图标题");
      return;
    }
    if (!drawCanvas || !drawCanvas.pureData()) {
      return;
    }
    if (drawCanvas.pureData().pens.length === 0) {
      message.error("请添加图形,再保存");
      return;
    }
    let drawObj = {
      token: token,
      // ...drawInfo,
      ...apiObj.patchDataApi.params,
      [apiObj.patchDataApi.docDataName[0]]: JSON.stringify(
        drawCanvas.pureData()
      ),
      [apiObj.patchDataApi.docDataName[1]]: title,
    };

    const drawRes: any = await api.request.patch(
      apiObj.patchDataApi.url,
      drawObj
    );
    if (drawRes.msg === "OK") {
      if (!state) {
        message.success("保存成功");
      }
      // dispatch(setContent(JSON.stringify(drawCanvas.pureData())));
    }
  };
  const fileClick: MenuProps["onClick"] = ({ key }) => {
    onHandleSelect(key);
  };
  const editClick: MenuProps["onClick"] = ({ key }) => {
    onHandleSelect(key);
  };
  const fileMenu: MenuProps["items"] = [
    // {
    //   key: "create_new",
    //   label: "新建文件",
    //   icon: <FileAddOutlined style={{ fontSize: 16 }} />,
    // },
    {
      key: "import_json",
      label: "打开本地文件",
      icon: <FolderOpenOutlined style={{ fontSize: 16 }} />,
    },
    {
      key: "save_json",
      label: "下载绘图",
      icon: <FileImageOutlined style={{ fontSize: 16 }} />,
    },
    {
      key: "save_png",
      label: "下载png",
      icon: <img src={pngSvg} alt="" />,
    },
    {
      key: "save_svg",
      label: "下载svg",
      icon: <img src={svgSvg} alt="" />,
    },
  ];
  const editMenu: MenuProps["items"] = [
    {
      key: "undo",
      label: "撤销",
      icon: <img src={undoSvg} alt="" />,
    },
    {
      key: "redo",
      label: "恢复",
      icon: <img src={redoSvg} alt="" />,
    },
    {
      key: "copy",
      label: "复制",
      icon: <CopyOutlined style={{ fontSize: 16 }} />,
    },
    {
      key: "cut",
      label: "剪切",
      icon: <ScissorOutlined style={{ fontSize: 16 }} />,
    },
    {
      key: "paste",
      label: "粘贴",
      icon: <SnippetsOutlined style={{ fontSize: 16 }} />,
    },
  ];
  return (
    <>
      <div className="header">
        <div className="header-left">
          {editState ? (
            <>
              <Dropdown menu={{ items: fileMenu, onClick: fileClick }}>
                <div className="header-left-icon-box">
                  <img className="header-left-icon" src={fileSvg} alt="" />
                  <div className="header-left-title">文件</div>
                </div>
              </Dropdown>

              <Dropdown menu={{ items: editMenu, onClick: editClick }}>
                <div className="header-left-icon-box">
                  <img className="header-left-icon" src={editSvg} alt="" />
                  <div className="header-left-title">编辑</div>
                </div>
              </Dropdown>
            </>
          ) : (
            title
          )}
        </div>
        {editState ? (
          <div className="header-center">
            <Input
              placeholder="请输入标题"
              bordered={false}
              value={title}
              onChange={(e) => dispatch(setTitle(e.target.value))}
              style={{ fontSize: "18px", fontWeight: "500" }}
              onBlur={(e) => {
                if (window.opener) {
                  window.opener.postMessage(
                    {
                      eventName: "children-title-change",
                      data: {
                        title: title,
                        key: Object.values(apiObj.getDataApi.params)[0],
                      },
                    },
                    "*"
                  );
                } else if (window.parent) {
                  window.parent.postMessage(
                    {
                      eventName: "children-title-change",
                      data: {
                        title: title,
                        key: Object.values(apiObj.getDataApi.params)[0],
                      },
                    },
                    "*"
                  );
                }
              }}
            />
          </div>
        ) : null}
        <div className="header-right">
          {editState ? (
            <div>
              <Button type="primary" onClick={() => saveData()}>
                保存
              </Button>
            </div>
          ) : (
            <div>
              <Button
                type="primary"
                onClick={() => {
                  dispatch(changeEditState(true));
                }}
              >
                编辑
              </Button>
              {/* <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => dispatch(togglePublicShareModal(true))}
              >
                公开分享
              </Button> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
