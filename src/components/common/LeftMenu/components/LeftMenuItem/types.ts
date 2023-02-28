import { Route } from '@components/common/LeftMenu/types';

export type LeftMenuItemProps = {
  isActive: boolean;
  route: Route;
  onPress: VoidFunction;
};
