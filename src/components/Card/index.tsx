import * as React from "react";
import { cx as classNames } from "@emotion/css";
import { Property } from "../../utils/types";
import styled from "@emotion/styled";
import { isObjectEmpty } from "../../utils/assertion";
import { defaultTheme, Theme } from "../../context/ThemeProvider";
import { alpha } from "../../utils/Theme/colorManipulator";
import { PropTypes } from "../../utils/propType";

/**
 * @interface
 */
interface CardPropType extends Omit<PropTypes, "ref"> {
    /**
     * Header for Card
     * @property {string | JSX.Element}
     *
     **/
    header?: string | JSX.Element;

    /**
     * types of Card Variation: 'solid - filled layout' and 'outline - bordered layout,'ghost - to show faded style layout'
     * @property {void} Variant
     **/
    variant?: "solid" | "outline" | "ghost";

    /**
     * Footer for Card
     * @property {string | JSX.Element}
     *
     **/
    footer?: string | JSX.Element;

    /**
     * Variations for vertical alignment of content inside card container
     *  @property {Property.AlignItem}
     *
     **/
    alignItems?: Property.AlignItem;

    /**
     * Variations for horizontal alignment of content inside card container
     * @property {Property.JustifyElemnent}
     *
     **/
    justifyContent?: Property.JustifyElemnent;

    /**
     * To override the background color of component
     * @property {string}
     *
     **/
    backgroundColor?: string;

    /**
     * To define the minimum height of component
     * @property {Property.minHeight}
     *
     **/
    minHeight?: Property.minHeight;

    /**
     * Add hover effect to the card
     * @property {boolean}
     *
     **/
    isHover?: boolean;

    /**
     * Add border-radius to the component
     * @property {number}
     *
     **/
    borderRadius?: number;

    /**
     *  Add border to the Card
     * @property {boolean}
     *
     **/
    border?: boolean;

    /**
     * Applied Box shadow to the card component
     * @property {boolean}
     *
     **/
    elevation?: boolean;

    /**
     * align row or column vertically
     * @property {boolean}
     *
     **/
    vertical?: boolean;
}

/**
 * @function getPropsByVariant - used to pass the color scheme, variant and the emotion theme to the component
 *
 **/
const getPropsByVariant = ({ variant, colorScheme, theme }) => {
    const colorInPalette = theme.palette[colorScheme];

    const variants = {
        outline: colorInPalette && {
            main: {
                border: `1px solid ${colorInPalette.main}`,
                backgroundColor: theme.palette.common.transparent,
                color: colorInPalette.main,
            },
        },
        solid: colorInPalette && {
            main: {
                backgroundColor: colorInPalette.main,
                color: colorInPalette.contrastText,
            },
        },
        dot: colorInPalette && {
            main: {
                backgroundColor: colorInPalette.main,
            },
        },
        ghost: colorInPalette && {
            main: {
                backgroundColor: alpha(colorInPalette.main, 0.2),
                color: colorInPalette.main,
            },
        },
    };

    return variants[variant] || variants.solid;
};

/**
 * @type StyledCardProps
 */

type StyledCardProps = {
    theme?: Theme;
    hide?: boolean;
    overrideStyle?: PropTypes["style"];
} & Partial<CardPropType>;

/**
 * @function EmotionCard - used to wrap the component for style
 *
 **/
export const EmotionCard = styled("div", {
    shouldForwardProp: (props: string) =>
        ![
            "elevation",
            "colorScheme",
            "disable",
            "overrideStyle",
            "fullWidth",
            "justifyContent",
            "alignItems",
            "border",
            "vertical",
            "backgroundColor",
            "isHover",
            "borderRadius",
            "minHeight",
            "as",
        ].includes(props),
})(
    ({
        theme,
        border,
        elevation,
        justifyContent,
        vertical,
        variant,
        colorScheme,
        hide,
        isHover,
        alignItems,
        borderRadius,
        overrideStyle,
        backgroundColor,
        minHeight,
    }: StyledCardProps) => {
        if (isObjectEmpty(theme)) {
            theme = defaultTheme;
        }

        const colorInPalette = theme?.palette[colorScheme];
        const propsByVariant = getPropsByVariant({
            variant,
            theme,
            colorScheme,
        });
        return {
            backgroundColor: backgroundColor
                ? backgroundColor
                : theme.palette.paper.background,
            display: `${hide ? "none" : "flex"}`,
            flexDirection: `${vertical ? "row" : "column"}`,
            flexWrap: "wrap",

            border: `${
                border && colorScheme
                    ? `1px solid ${theme?.palette[colorScheme]?.main}`
                    : ` ${theme?.palette?.paper?.border}`
            }`,
            borderRadius: borderRadius ? borderRadius : 0,
            boxShadow: elevation ? `${theme?.shadows[3]}` : "",
            alignItems: alignItems,
            justifyContent: justifyContent,
            minHeight: minHeight ? minHeight : 0,
            alignContent: "center",
            ...(propsByVariant && propsByVariant.main),
            "&:hover": isHover && {
                backgroundColor: theme?.palette?.paper?.hover,
            },
            ...(colorScheme && {
                "&:hover": isHover && {
                    backgroundColor: `${alpha(colorInPalette?.main, 0.2)}`,
                },
            }),
            cursor: isHover && "pointer",
            ...overrideStyle,
        };
    },
);

export const Card = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<CardPropType>
>(
    (
        {
            id,
            header,
            style,
            footer,
            children,
            className,
            backgroundColor,
            ...props
        },
        ref,
    ) => {
        return (
            <EmotionCard
                id={id}
                overrideStyle={style}
                role="presentation"
                ref={ref}
                className={classNames(className)}
                backgroundColor={backgroundColor}
                {...props}
            >
                {header}
                {children}
                {footer}
            </EmotionCard>
        );
    },
);

Card.defaultProps = {
    elevation: false,
    vertical: false,
    disable: false,
    isHover: false,
    border: false,
    borderRadius: 0,
};
