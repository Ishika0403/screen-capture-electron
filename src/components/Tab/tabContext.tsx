import * as React from "react";
import { PropTypes } from "../../utils/propType";
import { Theme } from "../../context/ThemeProvider";
interface TabContextProps extends Omit<PropTypes, "as"> {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    variant?: "bordered" | "solid";
    theme?: Theme;
    vertical?: boolean;
    value?: number;
    isResponsive?: boolean;
}
export const TabContext = React.createContext<TabContextProps | undefined>(
    null,
);
