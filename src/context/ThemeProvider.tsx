import React from 'react';
import {
  Global,
  css,
  ThemeProvider as EmotionThemeProver,
  Theme as EmotionThemeType,
} from '@emotion/react';

import AllTheme from './CustomTheme.json';

import { useLocalStorage } from '../utils/hooks/useLocalStorage';

export interface Theme extends EmotionThemeType {
  [key: string]: any;
}

// const { sobeysTheme, thebeerstoreTheme } = AllTheme;

/** Default Theme * */
export const { defaultTheme } = AllTheme;
export const { beerStoreTheme } = AllTheme;

type ThemeMode = 'light' | 'dark';
interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
}
const ThemeContext = React.createContext<ThemeContextType>({
  themeMode: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setThemeMode: (_mode: 'light' | 'dark') => {},
  toggleThemeMode: () => {},
});
const ThemeProvider: React.FC<{ theme?: Theme }> = ({ children, theme }) => {
  /**
   * For Deafult Theme Please Use This themeName => defaultTheme
   * For Sobeys Theme Please Use This themeName => sobeysTheme
   * For Thebeestore Theme Please Use This themeName => thebeestoreTheme
   * */
  const selectedTheme = theme || beerStoreTheme;
  const [themeMode, setThemeMode] = useLocalStorage<'light' | 'dark'>(
    'themeMode',
    selectedTheme.mode
  );
  const selectedPalette = {
    ...selectedTheme.palette.mode[themeMode],
    common: selectedTheme.palette.common,
  };
  const selectedLightTheme = {
    ...selectedTheme,
    palette: selectedPalette,
    mode: 'light',
  };
  const selectedDarkTheme = {
    ...selectedTheme,
    palette: selectedPalette,
    mode: 'dark',
  };

  const toggleThemeMode = React.useCallback(() => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  }, [themeMode]);
  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, toggleThemeMode }}>
      <EmotionThemeProver
        theme={themeMode === 'light' ? selectedLightTheme : selectedDarkTheme}
      >
        <Global
          styles={css`
            body {
              background-color: ${themeMode === 'light'
                ? selectedTheme.palette.common.white
                : selectedTheme.palette.common.black};
            }
          `}
        />
        {children}
      </EmotionThemeProver>
    </ThemeContext.Provider>
  );
};
export const useThemeMode = (): ThemeContextType =>
  React.useContext(ThemeContext);

export default ThemeProvider;
