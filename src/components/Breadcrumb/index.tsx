import React from "react";
import { cx as classNames } from "@emotion/css";
import styled from "@emotion/styled";
import { defaultTheme, Theme } from "../../context/ThemeProvider";
import { isObjectEmpty } from "../../utils/helpers";
import { getValidChildren } from "../../utils/children";
import { PropTypes } from "../../utils/propType";
export interface BreadcrumbPropType
    extends Omit<
        PropTypes<HTMLLIElement | HTMLOListElement>,
        "as" | "onClick" | "ref"
    > {
    /**
     * Separator used to separate the elements
     * @property {string | React.ReactElement}
     *
     **/
    separator?: string | React.ReactElement;
    /**
     * To provide custom color to the seprator.
     * @property {string}
     *
     **/
    separatorColor?: string;
}

/**
 * @function StyledBreadcrumbProps
 * This function is to add the additional props to the interface
 */
type StyledBreadcrumbProps = {
    theme?: Theme;
    overrideStyle: PropTypes["style"];
} & Partial<BreadcrumbPropType>;

/**
 * @constant styledBreadcrumb To style the breadcrumb using |theme |overrideStyle |colorScheme |
 **/
const styledBreadcrumb = ({
    theme,
    overrideStyle,
    colorScheme,
}: StyledBreadcrumbProps) => {
    if (isObjectEmpty(theme)) {
        theme = defaultTheme;
    }

    return {
        display: "flex",
        listStyle: "none",
        alignItems: "center",
        padding: "0",
        " & a:last-child": {
            pointerEvents: `none` as `none`,
            fontWeight: `bold` as `bold`,
        },
        color: colorScheme && theme?.palette[colorScheme]?.main,
        ...overrideStyle,
    };
};

/**
 * @function EmotionBreadcrumb
 * This function is to wrap the breadcrumb styled component
 */

export const EmotionBreadcrumb = styled.ol(styledBreadcrumb);

/**
 * @function BreadcrumbChildOptions
 * This function used to add additional props to breadcrumb child options
 */
export interface BreadcrumbChildOptions
    extends Omit<BreadcrumbPropType, "className"> {
    children: React.ReactNode;
}
/**
 * @function withSeparator
 * This function is to add separator to the breadcrumbs
 */
const withSeparator =
    (
        lastIndex: number,
        separator: string | React.ReactElement,
        separatorColor: string,
    ) =>
    (acc: Array<any>, child: React.ReactNode, index: number) => {
        const notLast = index < lastIndex;
        if (notLast) {
            acc.push(
                child,
                <BreadcrumbSeparator
                    separatorColor={separatorColor}
                    key={`breadcrumb_sep${index}`}
                >
                    {separator}
                </BreadcrumbSeparator>,
            );
        } else {
            acc.push(child);
        }
        return acc;
    };
/**
 * @function withSeparator
 * This function is to wrap beadcrumb and it's child into the one wrapper
 */
export const Breadcrumb = React.forwardRef<
    HTMLOListElement,
    React.PropsWithChildren<BreadcrumbPropType>
>(({ className, separator, separatorColor, style, ...props }, ref) => {
    const validChildren = getValidChildren(props.children);

    const totalItems = validChildren.length;
    const lastIndex = totalItems - 1;

    let children = validChildren.map((child) => toBreadcrumbItem(child));

    children = validChildren.reduce(
        withSeparator(lastIndex, separator, separatorColor),
        [],
    );

    return (
        <EmotionBreadcrumb
            overrideStyle={style}
            ref={ref}
            {...props}
            className={classNames(className)}
        >
            {children}
        </EmotionBreadcrumb>
    );
});

/**
 * @function EmotionBreadcrumbSeparatorli
 * This function is to wrap li to breadcrumb item
 */
export const EmotionBreadcrumbSeparatorli = styled("li")();
/**
 * @function BreadcrumbItem
 * This function is to add breadcrumb items
 */
const BreadcrumbItem = ({ children }: BreadcrumbChildOptions) => (
    <EmotionBreadcrumbSeparatorli>{children}</EmotionBreadcrumbSeparatorli>
);

/**
 * @function styledBreadcrumbSeparator
 * This function is to style breadcrumb separator
 */
const styledBreadcrumbSeparator = ({
    separatorColor,
    colorScheme,
    theme,
}: StyledBreadcrumbProps) => {
    if (isObjectEmpty(theme)) {
        theme = defaultTheme;
    }

    return {
        color: separatorColor
            ? separatorColor
            : colorScheme && theme?.palette[colorScheme]?.main,
        margin: "auto 5px",
        overflow: "hidden",
    };
};

/**
 * @function EmotionBreadcrumbWithSeparatorli
 * This function is used to style breadcrumb separator with li
 */

export const EmotionBreadcrumbWithSeparatorli = styled("li")(
    styledBreadcrumbSeparator,
);

/**
 * @function BreadcrumbSeparator
 * This function is used to wrap breadcrumb separator and li
 */
const BreadcrumbSeparator = ({
    children,
    style,
    ...props
}: BreadcrumbChildOptions) => (
    <EmotionBreadcrumbWithSeparatorli {...props} overrideStyle={style}>
        {children}
    </EmotionBreadcrumbWithSeparatorli>
);
/*** end breadcrumbli with seperator ****/

/**
 * @function toBreadcrumbItem
 * This function is used to display breadcrumb item
 */
const toBreadcrumbItem = (child: React.ReactElement) => (
    <BreadcrumbItem>{child}</BreadcrumbItem>
);

Breadcrumb.defaultProps = {
    separator: "/",
    colorScheme: "primary",
};
