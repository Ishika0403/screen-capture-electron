import styled from "@emotion/styled";
import { isObjectEmpty } from "../../utils/helpers";
import React from "react";
import { defaultTheme, Theme } from "../../context/ThemeProvider";
import { PropTypes } from "../../utils/propType";
import { cx as classNames } from "@emotion/css";

export interface PaperPropType extends PropTypes {
    /**
     * 2 types of Paper variations: 'solid - filled layout' and 'outline - bordered layout
     * @property {string}
     **/
    variant?: "solid" | "outline";

    /**
     * To add box shadow effect on hover.
     * @property {boolean}
     **/
    elevation?: boolean;

    /**
     * To change the background color of paper
     * @property {string}
     **/
    backgroundColor?: string;

    /**
     * To add border to the page
     * @property {string}
     **/
    border?: string;
}

/**
 * @function getPropsByVariant
 * This function is used to pass the color scheme, variant and the emotion theme
 */

const getPropsByVariant = ({ variant, theme, backgroundColor, border }) => {
    const variants = {
        solid: {
            main: {
                backgroundColor: backgroundColor
                    ? backgroundColor
                    : theme.palette.paper.background,
                boxShadow: theme.palette.paper.shadow,
            },
        },
        outline: {
            main: {
                backgroundColor: backgroundColor
                    ? backgroundColor
                    : theme.palette.paper.background,
                border: border ? border : theme.palette.paper.border,
            },
        },
    };

    return variants[variant] || variants.solid;
};

export type PaperProps = {
    theme?: Theme;
    overrideStyle?: PropTypes["style"];
} & Partial<PaperPropType>;

/**
 * @function StyledPaper
 * This function  takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledPaper = ({
    variant,
    elevation,
    disable,
    theme,
    backgroundColor,
    border,
    overrideStyle,
}: PaperProps) => {
    if (isObjectEmpty(theme)) {
        theme = defaultTheme;
    }

    const propsByVariant = getPropsByVariant({
        variant,
        theme,
        backgroundColor,
        border,
    });
    return {
        display: "flex",
        alignItems: "center",
        opacity: disable && theme?.palette?.action?.disabledOpacity,
        border: border ? border : theme?.palette?.paper?.border,
        boxShadow: elevation && theme?.shadows[1],
        backgroundColor: theme?.palette?.paper?.background,
        color: theme?.palette?.typography?.primary,
        ...(propsByVariant && propsByVariant.main),
        "&:hover": !disable && {
            boxShadow: elevation && theme?.shadows[2],
            ...(propsByVariant && propsByVariant.hover),
        },
        ...overrideStyle,
    };
};

/**
 * @function EmotionPaper
 * This function is used define the style of EmotionPaper Component
 */

export const EmotionPaper = styled("div", {
    shouldForwardProp: (props: string) =>
        ![
            "elevation",
            "colorScheme",
            "disable",
            "overrideStyle",
            "fullWidth",
            "justifyContent",
            "alignItems",
            "active",
            "backgroundColor",
            "borderRadius",
            "reverse",
            "Zindex",
            "as",
        ].includes(props),
})(StyledPaper);

/**
 * Paper Component
 */
export const Paper = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<PaperPropType>
>(
    (
        {
            children,
            style,
            className,
            backgroundColor,
            border,
            colorScheme,
            variant,
            ...props
        },
        ref,
    ) => {
        return (
            <EmotionPaper
                colorScheme={colorScheme}
                variant={variant}
                backgroundColor={backgroundColor}
                border={border}
                {...props}
                ref={ref}
                className={classNames(className)}
                overrideStyle={style}
            >
                {children}
            </EmotionPaper>
        );
    },
);

/**
 * defaultProps - To define default values for component props
 */
Paper.defaultProps = {
    variant: "solid",
    colorScheme: "primary",
    elevation: false,
};
