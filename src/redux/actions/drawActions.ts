import { Topology } from "@topology/core";
import { selectType } from "../reducer/draw";

export const actionTypes = {
  SET_DRAW_CANVAS: "SET_DRAW_CANVAS",
  SET_SELECT_NODE: "SET_SELECT_NODE",
  };

  export function setDrawCanvas(drawCanvas:Topology) {
    return {
      type: actionTypes.SET_DRAW_CANVAS,
      drawCanvas: drawCanvas,
    };
  }
  export function setSelectNode(selectNode:selectType) {
    return {
      type: actionTypes.SET_SELECT_NODE,
      selectNode: selectNode,
    };
  }
  