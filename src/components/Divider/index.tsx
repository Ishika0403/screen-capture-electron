import React from "react";
import styled from "@emotion/styled";
import { isObjectEmpty } from "../../utils/helpers";
import { defaultTheme, Theme, useThemeMode } from "../../context/ThemeProvider";
import { Property } from "../../utils/types";
import { PropTypes } from "../../utils/propType";
import { cx as classNames } from "@emotion/css";

interface DividerPropType
    extends Omit<PropTypes<HTMLHRElement>, "as" | "onClick" | "disable"> {
    /**
     * Add Width for the Border Prop
     * @property
     *
     **/
    width?: Property.Width;

    /**
     * Add height for the Border Prop
     * @property
     *
     **/
    height?: Property.Height;

    /**
     * Add Width to the Border of Border Prop
     * @property {string}
     *
     **/
    borderWidth?: string;

    /**
     * Diffrent style types for border prop
     * @property {string}
     *
     **/
    variant?: "solid" | "dashed" | "dotted";

    /**
     * To set direction for the Border
     * @property {string}
     *
     **/
    orientation?: "horizontal" | "vertical";

    /**
     * To pass the centered text in divider
     * @property
     *
     **/
    content?: any;

    /**
     * To pass spacing between divider and content
     * @property
     *
     **/
    spaceBetween?: string;
}

/**
 * @function getPropsByVariant
 * This function is used to pass the color scheme, variant and the emotion theme
 */

const getPropsByVariant = ({ variant, colorScheme, orientation, theme }) => {
    const colorInPalette = theme.palette[colorScheme];

    const variants = {
        solid: colorInPalette && {
            main: {
                borderStyle: `solid`,
                borderColor: `${colorInPalette.main}`,
            },
        },
        dashed: colorInPalette && {
            main: {
                borderStyle: `dashed`,
                borderColor: `${colorInPalette.main}`,
            },
        },
        dotted: colorInPalette && {
            main: {
                borderStyle: `dotted`,
                borderColor: `${colorInPalette.main}`,
            },
        },
    };
    const orientations = {
        horizontal: {
            main: {
                borderTopWidth: `0px`,
                borderRightWidth: `0px`,
                borderLeftWidth: `0px`,
            },
        },
        vertical: {
            main: {
                display: "inline-flex",
                margin: `0 5px`,
                alignItems: "center",
                width: "fit-content",
                borderTopWidth: `0px`,
                borderRightWidth: `0px`,
                borderBottomWidth: `0px`,
            },
        },
    };

    return {
        borderStyle: variants[variant]?.main,
        orientationStyle: orientations[orientation]?.main,
    };
};

type StyledDividerProps = {
    theme?: Theme;
    overrideStyle?: PropTypes["style"];
} & Partial<DividerPropType>;

/**
 * @function StyledDivider
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledDivider = ({
    colorScheme,
    width,
    height,
    borderWidth,
    variant,
    orientation,
    theme,
    overrideStyle,
    content,
    spaceBetween,
}: StyledDividerProps) => {
    if (isObjectEmpty(theme)) {
        theme = defaultTheme;
    }
    const propsByVariant = getPropsByVariant({
        variant,
        colorScheme,
        orientation,
        theme,
    });
    const { themeMode } = useThemeMode();

    return {
        width,
        height,
        borderWidth,
        ...(propsByVariant && propsByVariant.borderStyle),
        ...(propsByVariant && propsByVariant.orientationStyle),
        ...(content && {
            position: "relative",
            color: "black",
            textAlign: "center",
            outline: 0,
            border: 0,
            "&:before": {
                content: '""',
                position: "absolute",
                borderWidth: borderWidth,
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderColor: `${
                    colorScheme && theme?.palette[colorScheme]?.main
                }`,
                borderStyle: `${variant && variant}`,
                left: 0,
                top: "50%",
                width: "100%",
                height: 1,
                Transform: "translate(-50%)",
            },

            "&:after": {
                content: content,
                position: "relative",
                display: "inline-block",
                paddingLeft: spaceBetween,
                paddingRight: spaceBetween,
                color: colorScheme && theme?.palette[colorScheme]?.main,
                backgroundColor: themeMode === "light" ? "#fff" : "#121212",
            },
        }),

        ...overrideStyle,
    };
};

/**
 * @function EmotionDivider
 * This function is used to wrap the component for style
 */
export const EmotionDivider = styled("hr")(StyledDivider);

/**
 * @function Divider
 * This function is used to create Divider Component in which we wrap EmotionDivider
 */
export const Divider = React.forwardRef<
    HTMLHRElement,
    React.PropsWithChildren<DividerPropType>
>(({ className, content, style, ...props }, ref) => {
    return (
        <EmotionDivider
            content={content}
            className={classNames(className)}
            ref={ref}
            overrideStyle={style}
            {...props}
        />
    );
});

/**
 * defaultProps - To define default values for component props
 */
Divider.defaultProps = {
    variant: "solid",
    orientation: "horizontal",
    colorScheme: "primary",
    width: "100%",
    height: "initial",
    id: "divider_component",
    borderWidth: "1px",
    spaceBetween: "5px",
};
