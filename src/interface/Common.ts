import { User } from "./User";

export interface ResultProps {
  msg: string;
  data: any;
  status: number;
  pageNum?: number;
  totalNum?: number;
  total?: number;
}
export interface ApiData {
  url: string;
  params: object;
  docDataName?: string[];
}