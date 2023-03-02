import React from "react";
import styled from "@emotion/styled";
import { Property } from "../../utils/types";
import { PropTypes } from "../../utils/propType";
import { Paper } from "../Paper";
import { cx as classNames } from "@emotion/css";

interface RowPropType extends Omit<PropTypes, "as" | "disable" | "ref"> {
    /**
     * Reverse the order of items
     * @property {boolean}
     *
     **/
    reverse?: boolean;

    /**
     * Types to align the items
     * @property
     **/
    alignItems?: Property.AlignItem;

    /**
     * Types to place the content
     * @property
     *
     **/
    justifyContent?: Property.ContentJustification;

    /**
     * Additional background color for row
     * @property {string}
     *
     **/
    backgroundColor?: string;

    /**
     * Additional border radius to round the corner of element in number
     * @property {number}
     *
     **/
    borderRadius?: number;
}

/**
 * @function StyledRowProps
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */

/**
 * @function EmotionRow
 * This function is used to wrap the component for style
 */
export const EmotionRow = styled(Paper)(
    ({
        overrideStyle,
        alignItems,
        justifyContent,
        reverse,
    }: {
        overrideStyle: PropTypes["style"];
        alignItems?: RowPropType["alignItems"];
        justifyContent?: RowPropType["justifyContent"];
        reverse?: RowPropType["reverse"];
        borderRadius?: RowPropType["borderRadius"];
    }) => ({
        alignItems: alignItems,
        justifyContent: justifyContent,
        flexWrap: "wrap",
        marginLeft: " -15px",
        marginRight: "-15px",
        border: 0,
        flexDirection: reverse ? "row-reverse" : "row",
        ...overrideStyle,
    }),
);

/**
 * @function Row
 * This function is used to create Row Component
 */
export const Row = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<RowPropType>
>(
    (
        {
            id,
            children,
            alignItems,
            className,
            style,
            justifyContent,
            borderRadius,
            backgroundColor,
            ...props
        },
        ref,
    ) => {
        return (
            <EmotionRow
                id={id}
                ref={ref}
                backgroundColor={backgroundColor}
                borderRadius={borderRadius}
                className={classNames(className)}
                alignItems={alignItems}
                justifyContent={justifyContent}
                overrideStyle={style}
                {...props}
            >
                {children}
            </EmotionRow>
        );
    },
);

/**
 * defaultProps - To define default values for component props
 */
Row.defaultProps = {
    id: "row_component",
    justifyContent: "flex-start",
    alignItems: "center",
    reverse: false,
    backgroundColor: "unset",
    borderRadius: 0,
};
