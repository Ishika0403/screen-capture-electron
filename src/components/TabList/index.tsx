import * as React from "react";
import classNames from "classnames";
import { PropTypes } from "../../utils/propType";
import styled from "@emotion/styled";
import { defaultTheme, Theme } from "../../context/ThemeProvider";
import { isObjectEmpty } from "../../utils/assertion";
import { TabContext } from "../Tab/tabContext";
import { BreakPoints } from "../../utils/units";
interface TabListPropType
    extends Omit<PropTypes, "onClick" | "disable" | "as"> {
    /**
     * To style the tabItem element - Solid: "for filled layout" and bordered: "for the border layout"
     * @property {string}
     */
    variant?: "solid" | "bordered";

    /**
     * To show the vertical orientation
     * @property {boolean}
     */
    vertical?: boolean;
}

/**
 * @function getPropsByVariant
 * This function is used to pass the color scheme, variant and the emotion theme
 */

const getPropsByVariant = ({ variant, colorScheme, theme }) => {
    const colorInPalette = theme.palette[colorScheme];
    const variants = {
        bordered: colorInPalette && {
            main: {
                borderBottom: `1px solid ${theme.palette.paper.background}`,
            },
        },

        solid: colorInPalette && {
            main: {
                border: 0,
            },
        },
    };
    return variants[variant] || variants.solid;
};

/**
 * @function useColorVariant
 *  This function is use to provide, theme, colorscheme, variant
 */
const useColorVariant = (theme, variant, colorScheme) => {
    if (isObjectEmpty(theme)) {
        theme = defaultTheme;
    }
    return getPropsByVariant({
        variant,
        colorScheme,
        theme,
    });
};

type StyledTabListProps = {
    theme?: Theme;
    overrideStyle?: PropTypes["style"];
    isResponsive?: boolean;
} & Partial<TabListPropType>;

/**
 * @function StyledTabList
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledTabList = ({
    overrideStyle,
    colorScheme,
    variant,
    theme,
    vertical,
    isResponsive,
}: StyledTabListProps) => {
    const colorVariant = useColorVariant(theme, variant, colorScheme).main;

    return {
        display: isResponsive && "none",
        [`@media ${BreakPoints.mobileL}`]: {
            display: "flex",
            flexDirection: vertical ? "column" : "row",
            width: vertical ? "250px" : "auto",
            alignItems: "flex-start",
            ...(colorScheme && colorVariant),
            border: vertical && 0,
            ...overrideStyle,
        },
    };
};

/**
 * @function EmotionTabList
 * This function is used to wrap the component for style
 */
export const EmotionTabList = styled("div")(StyledTabList);

export const TabList = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<TabListPropType>
>(
    (
        {
            id,
            children,
            className,
            colorScheme,
            variant,
            vertical,
            style,
            ...props
        },
        ref,
    ) => {
        const tabActiveValue = React.useContext(TabContext);

        return (
            <>
                <EmotionTabList
                    id={id}
                    variant={tabActiveValue?.variant || variant}
                    className={classNames(className)}
                    overrideStyle={style}
                    isResponsive={tabActiveValue?.isResponsive}
                    vertical={tabActiveValue?.vertical || vertical}
                    colorScheme={tabActiveValue?.colorScheme || colorScheme}
                    ref={ref}
                    {...props}
                >
                    {children}
                </EmotionTabList>
            </>
        );
    },
);

/**
 * defaultProps - To define default values for component props
 */
TabList.defaultProps = {
    id: "TabList_component",
    variant: "bordered",
    colorScheme: "primary",
    vertical: false,
};
