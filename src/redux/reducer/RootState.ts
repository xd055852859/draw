import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { AuthType } from './auth';
import { CommonType } from './common';
import { DrawType } from './draw';
interface RootState {
  auth: AuthType;
  common: CommonType;
  draw:DrawType
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
