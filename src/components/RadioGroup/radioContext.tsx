import * as React from "react";
import { PropTypes } from "../../utils/propType";
import { Theme } from "../../context/ThemeProvider";
interface RadioContextProps extends PropTypes {
    value?: string | number;

    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    variant?: "outline" | "solid";
    theme?: Theme;
    vertical?: boolean;
}
export const RadioContext = React.createContext<RadioContextProps | undefined>(
    null,
);
