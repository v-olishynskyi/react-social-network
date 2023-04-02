import { themeSelector } from '@store/ui/selectors';
import { colors, spacing } from './constants';
import { useRecoilValue } from 'recoil';

export const useTheme = () => {
  const theme = useRecoilValue(themeSelector);

  return { colors: colors[theme ?? 'light'], spacing };
};
