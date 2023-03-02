import * as React from "react";
import { cx as classNames } from "@emotion/css";
import styled from "@emotion/styled";
import { PropTypes } from "../../utils/propType";
import { Theme } from "../../context/ThemeProvider";

export interface BreadcrumbLinkPropType
    extends Pick<PropTypes, "className" | "style" | "colorScheme"> {
    /**
     * Specific id to identify the element when linking, scripting or styling.
     * @property {string}
     *
     **/
    id: string;

    /**
     * Used to provide URL/Link
     * @property {string}
     *
     **/
    to: string;

    /**
     * The target attribute specifies where to open the li nked document.
     * @property {string}
     *
     **/
    target?: string;

    /**
     * To set the size of text in BreadcrumbLink
     * @property {string}
     *
     **/
    fontSize?: string;
}
export type StyledFlexProps = {
    theme?: Theme;
    /**overrideStyle is used to override the default style */
    overrideStyle?: PropTypes["style"];
} & Partial<BreadcrumbLinkPropType>;

/**
 * @function EmotionBreadcrumbLink
 * This function is used to wrap the component for style
 */
export const EmotionBreadcrumbLink = styled("a")(
    ({ overrideStyle, fontSize, theme, colorScheme }: StyledFlexProps) => ({
        fontSize,
        textDecoration: "none",
        display: "inline-flex",
        textUnderlineOffset: 8,
        color: colorScheme
            ? theme?.palette[colorScheme]?.main
            : theme?.palette?.paper?.text,
        "&:hover": {
            textDecoration: "underline",
            display: "-webkit-box",
            WebkitTextDecorationColor: colorScheme
                ? theme?.palette[colorScheme]?.main
                : theme?.palette?.paper?.text,
            textDecorationColor: colorScheme
                ? theme?.palette[colorScheme]?.main
                : theme?.palette?.paper?.text,
        },
        ...overrideStyle,
    }),
);

/**
 * BreadcrumbLink Component
 */
export const BreadcrumbLink = React.forwardRef<
    HTMLAnchorElement,
    React.PropsWithChildren<BreadcrumbLinkPropType>
>(({ id, className, children, to, target, style, ...props }, ref) => {
    return (
        <EmotionBreadcrumbLink
            id={id}
            key={id}
            href={to}
            target={target}
            overrideStyle={style}
            className={classNames(className)}
            {...props}
            ref={ref}
        >
            {children}
        </EmotionBreadcrumbLink>
    );
});

/**
 * defaultProps - To define default values for component props
 */
BreadcrumbLink.defaultProps = {
    id: "breadcrumblink",
    fontSize: "16px",
    to: "#",
};
