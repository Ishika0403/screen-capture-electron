import React from "react";
import styled from "@emotion/styled";
import { PropTypes } from "../../utils/propType";
import { cx as classNames } from "@emotion/css";
/**
 * @function StyledTableRowProps
 * This function is to add the additional props
 */
export type StyledTableRowProps = {
    overrideStyle?: PropTypes["style"];
} & Partial<PropTypes<HTMLTableRowElement>>;

/**
 * @function EmotionTableRow
 * styled table row
 */
export const EmotionTableRow = styled("tr")(
    (props: Partial<StyledTableRowProps>) => ({
        display: "table-row",
        ...props.overrideStyle,
    }),
);

/**
 * @function TableRow
 * To get all the props and return the component
 */
export const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.PropsWithChildren<StyledTableRowProps>
>(({ children, className, style, ...props }, ref) => {
    return (
        <EmotionTableRow
            {...props}
            ref={ref}
            overrideStyle={style}
            className={classNames(className)}
        >
            {children}
        </EmotionTableRow>
    );
});

/**
 * defaultProps - To define default values for component props
 */
TableRow.defaultProps = {
    id: "table-row",
};
