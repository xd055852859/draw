import { Line, Node, Pen, Topology } from "@topology/core";
import { actionTypes } from "../actions/drawActions";

export interface selectType {
  type: number;
  multi?: boolean;
  pen?: Pen | Node | Line;
  nodes?: Pen[];
  locked?: boolean;
}
export interface DrawType {
  drawCanvas: Topology | null;
  selectNode: selectType;
}
export const spaceData = {
  type: -1,
  multi: false,
  pen: undefined,
  nodes: undefined,
  locked: false,
};
const defaultState: DrawType = {
  drawCanvas: null,
  selectNode: spaceData,
};

export const draw = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_DRAW_CANVAS:
      return {
        ...state,
        drawCanvas: action.drawCanvas,
      };
    case actionTypes.SET_SELECT_NODE:
      return {
        ...state,
        selectNode: action.selectNode,
      };
    default:
      return state;
  }
};
