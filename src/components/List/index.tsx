import * as React from "react";
import { cx as classNames } from "@emotion/css";
import { Property } from "../../utils/types";
import { PropTypes } from "../../utils/propType";
import { Theme } from "../../context/ThemeProvider";
import styled from "@emotion/styled";
import { Paper } from "../Paper";
export interface ListPropType
    extends Omit<
        PropTypes<HTMLDivElement, "ul" | "ol">,
        "colorScheme" | "disable" | "onClick"
    > {
    /**
     * Additional max height
     * @property {void}
     **/
    maxHeight?: Property.MaxHeight;

    /**
     * For providing className in Parent Component
     * @property {string}
     **/
    parentClass?: string;

    /**
     * To Make List Scrollable
     * @property {boolean}
     **/
    scrollable?: boolean;

    /**
     * Radius to rounds the corners of an element from outer border edge
     * @property {number}
     **/
    borderRadius?: number;
}

type ListParentProps = {
    theme?: Theme;
    overrideStyle?: PropTypes["style"];
} & Partial<ListPropType>;

/**
 * @function StyledList
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledList = () => {
    return {
        width: "100%",
        margin: "0",
        padding: "0",
        listStyle: "none",
    };
};

/**
 * @function EmotionListParent
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 * it is used to style the parent div element in list
 */
const EmotionListParent = styled(Paper, {
    shouldForwardProp: (props: string) => {
        return ![
            "colorScheme",
            "overrideStyle",
            "errorMessage",
            "disable",
            "borderRadius",
            "scrollable",
            "maxHeight",
            "alignItems",
            "as",
        ].includes(props);
    },
})(
    ({
        maxHeight,
        scrollable,
        borderRadius,
        overrideStyle,
    }: ListParentProps) => {
        return {
            width: "100%",
            maxHeight,
            border:0,
            borderRadius,
            ...(scrollable && { overflowY: "auto" }),
            ...overrideStyle,
        };
    },
);

/**
 * @function EmotionList
 * This function is used to style the ul element of list
 */
const EmotionList = styled("ul", {
    shouldForwardProp: (props: string) => {
        return ![
            "alignItems",
            "colorScheme",
            "overrideStyle",
            "errorMessage",
            "disable",
            "borderRadius",
            "scrollable",
            "maxHeight",
            "as",
        ].includes(props);
    },
})(StyledList);

/**
 * List Component
 */
export const List = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<ListPropType>
>(({ id, parentClass, className, style, children, ...props }, ref) => (
    <>
        <EmotionListParent
            id={id}
            borderRadius={0}
            className={classNames(parentClass)}
            {...props}
            ref={ref}
            overrideStyle={style}
        >
            <EmotionList key={"listKey"} className={classNames(className)}>
                {children}
            </EmotionList>
        </EmotionListParent>
    </>
));

/**
 * defaultProps - To define default values for component props
 */

List.defaultProps = {
    scrollable: false,
    maxHeight: "400px",
};
