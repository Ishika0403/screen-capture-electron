import * as React from "react";
import { cx as classNames } from "@emotion/css";
import { Property } from "../../utils/types";
import styled from "@emotion/styled";
import { PropTypes } from "../../utils/propType";
import { isObjectEmpty, isUndefined } from "../../utils/assertion";
import { defaultTheme, Theme } from "../../context/ThemeProvider";

interface TextPropType extends Omit<PropTypes, "disable"> {
    /**
     * Add custom font size in (px)
     * @property {string}
     *
     **/
    fontSize?: string;

    /**
     * Add custom font weight(boldness) in between 100-900
     * @property {number}
     *
     **/
    fontWeight?: number;

    /**
     * Add custom text decoration properties
     * @property {Property.TextDecoration}
     *
     **/
    textDecoration?: Property.TextDecoration;

    /**
     * Add custom text transformation properties
     * @property
     *
     **/
    textTransform?: Property.TextTransform;

    /**
     * No. of line to hide within ...dots
     * @property {string}
     *
     **/
    lineClamp?: string;

    /**
     * For text clipping - When using inside the flex, min-width should be define within the element
     * @property {boolean}
     *
     **/
    isTruncate?: boolean;

    /**
     * To set the alignment of the content inside the container
     * @property
     *
     **/
    textAlign?: Property.TextAlign;

    /**
     * To characterize text(using different fontstyles)
     * @property
     *
     **/
    fontStyle?: Property.FontStyle;

    /**
     * To unwrap the text
     * @property {boolean}
     *
     **/
    noWrap?: boolean;

    /**
     * To add Word Break Property
     * @property
     *
     **/
    wordBreak?: Property.wordBreak;

    /**
     * Provides Line Height to the Text
     * @property {string}
     *
     **/
    lineHeight?: string;
}

type StyledTextProps = {
    theme?: Theme;
    overrideStyle?: PropTypes["style"];
} & Partial<TextPropType>;

export const EmotionText = styled("div")(
    ({
        textAlign,
        fontSize,
        fontWeight,
        fontStyle,
        textDecoration,
        textTransform,
        wordBreak,
        lineHeight,
        colorScheme,
        isTruncate,
        noWrap,
        lineClamp,
        theme,
        overrideStyle,
    }: StyledTextProps) => {
        if (isObjectEmpty(theme)) {
            theme = defaultTheme;
        }
        return {
            textAlign,
            fontStyle,
            fontSize,
            fontWeight,
            textDecoration,
            textTransform,
            wordBreak,
            lineHeight,
            color: colorScheme
                ? theme?.palette[colorScheme]?.main
                : theme?.palette?.typography?.primary,
            whiteSpace:
                isTruncate || noWrap
                    ? ("nowrap" as Property.whiteSpace)
                    : ("normal" as Property.whiteSpace),
            textOverflow: isTruncate && "ellipsis",
            overflow: (isTruncate || !isUndefined(lineClamp)) && "hidden",
            ...(lineClamp && {
                display: "-webkit-box", // Note - Neccessary to add "-webkit-box" while using lineClamp property

                WebkitLineClamp: lineClamp,

                WebkitBoxOrient: "vertical",

                textOverflow: "ellipsis",

                overflow: "hidden",
            }),
            ...overrideStyle,
        };
    },
);
export const Text = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<TextPropType>
>(({ id, className, onClick, as, children, style, ...props }, ref) => {
    return (
        <EmotionText
            id={id}
            overrideStyle={style}
            onClick={onClick}
            className={classNames(className)}
            as={as}
            ref={ref}
            {...props}
        >
            {children}
        </EmotionText>
    );
});

/**
 * defaultProps - To define default values for component props
 */
Text.defaultProps = {
    id: "text",
    textAlign: "left",
    noWrap: false,
    isTruncate: false,
    lineClamp: undefined,
    as: "div",
    lineHeight: "normal",
};
