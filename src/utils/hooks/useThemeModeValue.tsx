import React from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useThemeMode } from "../../context/ThemeProvider";
export const useThemeModeValue = (Dark, Light): ReactJSXElement => {
    const { themeMode } = useThemeMode();
    const themeValue = (themeMode) => {
        if (themeMode === "dark") {
            if (Dark instanceof Object) {
                return <Dark></Dark>;
            } else {
                return Dark;
            }
        } else {
            if (Light instanceof Object) {
                return <Light></Light>;
            } else {
                return Light;
            }
        }
    };
    const renderedOutput = React.useMemo(() => {
        return themeMode && themeValue(themeMode);
    }, [themeMode]);

    return renderedOutput;
};
