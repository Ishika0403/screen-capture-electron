import * as React from "react";
import { cx as classNames } from "@emotion/css";
import styled from "@emotion/styled";
import { Property } from "../../utils/types";
import { PropTypes } from "../../utils/propType";
import { isObjectEmpty } from "../../utils/helpers";
import { defaultTheme, Theme } from "../../context/ThemeProvider";
import { Paper } from "../Paper";
export interface ListItemPropType
    extends Omit<
        PropTypes<HTMLLIElement | HTMLDivElement>,
        "colorScheme" | "disable" | "onMouseEnter"
    > {
    /**
     * Types to align the items
     * @property {void}
     **/
    alignItems?: Property.AlignItem;

    /**
     * Types to place the content
     * @property {void}
     **/
    justifyContent?: Property.JustifyElemnent;

    /**
     * for showing selected List Item
     * @property {boolean}
     **/
    isSelected?: boolean;

    /**
     * Radius to rounds the corners of an element from outer border edge
     * @property {number}
     **/
    borderRadius?: number;
}
type ListItemProps = {
    borderRadius: number;
    theme?: Theme;
    overrideStyle?: PropTypes["style"];
} & Partial<ListItemPropType>;

/**
 * @function EmotionListItem
 * This function is used to wrap the component for style
 */
const EmotionListItem = styled(Paper, {
    shouldForwardProp: (props: string) => {
        return ![
            "isSelected",
            "elevation",
            "colorScheme",
            "disable",
            "overrideStyle",
            "borderRadius",
            "maxHeight",
            "scrollable",
            "alignItems",
            "justifyContent",
            "as",
        ].includes(props);
    },
})(
    ({
        alignItems,
        justifyContent,
        isSelected,
        theme,
        borderRadius,
        overrideStyle,
    }: ListItemProps) => {
        if (isObjectEmpty(theme)) {
            theme = defaultTheme;
        }

        return {
            cursor: "pointer",
            display: "flex",
            border: 0,
            alignItems: alignItems,
            alignContent: justifyContent,
            fontSize: "14px",
            borderRadius: borderRadius ? borderRadius : 0,
            padding: 5,
            ...(isSelected && {
                backgroundColor: theme?.palette?.action?.selected,
            }),
            "&:hover": !isSelected && {
                backgroundColor: !isSelected && theme?.palette?.action?.hover,
            },
            ...overrideStyle,
        };
    },
);

/**
 * ListItem Component
 */
export const ListItem = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<ListItemPropType>
>(({ id, className, children, style, borderRadius, ...props }, ref) => {
    return (
        <EmotionListItem
            id={id}
            key={id}
            borderRadius={borderRadius}
            overrideStyle={style}
            className={classNames(className)}
            {...props}
            ref={ref}
        >
            {children}
        </EmotionListItem>
    );
});

/**
 * defaultProps - To define default values for component props
 */
ListItem.defaultProps = {
    justifyContent: "center",
    alignItems: "center",
    isSelected: false,
};
