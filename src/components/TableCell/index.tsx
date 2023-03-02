/* eslint-disable prettier/prettier */
import * as React from "react";
import { Property } from "../../utils/types";
import styled from "@emotion/styled";
import { PropTypes } from "../../utils/propType";
import { cx as classNames } from "@emotion/css";
interface TableCellPropType extends PropTypes<HTMLTableCellElement> {
    /**
     * Number of columns a cell should span
     * @property {number}
     */
    colSpan?: number;

    /**
     * Number of rows a cell should span
     * @property {number}
     */
    rowSpan?: number;

    /**
     * Alignment of the content inside the cell
     * @property {Property.TextAlign}
     */
    textAlign?: Property.TextAlign;

    /**
     * Align the positions of item vertically
     * @property {Property.TextAlign}
     */
    verticalAlign: Property.Alignment;

    /**
     * Variations to add cell type -  th stands for table head and td - stands for table data
     * @property {string}
     */
    as: "th" | "td";
}
/**
 * @function StyledTableCellProps
 * This function is to add the additional props
 */
export type StyledTableCellProps = {
    overrideStyle?: PropTypes["style"];
} & Partial<TableCellPropType>;
/**
 * @function StyledTableCell
 * To style the table head and td
 */
export const EmotionTableCell = styled("th")(
    ({ textAlign, verticalAlign, overrideStyle }: StyledTableCellProps) => {
        return {
            textAlign,
            verticalAlign,
            display: "table-cell",
            ...overrideStyle,
        };
    },
);

/**
 * @function TableCell
 * To get the props and return the component with style
 */
export const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.PropsWithChildren<StyledTableCellProps>
>(({ children, colSpan, rowSpan, as, className, style, ...props }, ref) => {
    return (
        <EmotionTableCell
            colSpan={colSpan}
            rowSpan={rowSpan}
            ref={ref}
            as={as}
            className={classNames(className)}
            overrideStyle={style}
            {...props}
        >
            {children}
        </EmotionTableCell>
    );
});

/**
 * defaultProps - To define default values for component props
 */
TableCell.defaultProps = {
    colSpan: undefined,
    rowSpan: undefined,
    as: "td",
    textAlign: "left",
    verticalAlign: "middle",
};
