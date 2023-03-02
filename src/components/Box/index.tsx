import * as React from "react";
import { cx as classNames } from "@emotion/css";
import styled from "@emotion/styled";
import { PropTypes } from "../../utils/propType";
import { Property } from "../../utils/types";

/**
 * @interface
 */
interface BoxPropType extends PropTypes {
    /**
     * @property To add additional width of Box
     *
     */
    width?: Property.Width;

    /**
     * @property  To provide height to the Box
     *
     */
    height?: Property.Height;

    /**
     * @property To create space around Box's content, inside of any defined borders.
     *
     */
    padding?: Property.Padding;

    /**
     * @property To provide a background color to the Box
     *
     */
    backgroundColor?: string;

    /**
     * @property To fit the content in the Box by clipping or adding scrollbar
     *
     */
    overflow?: Property.OverflowX | Property.OverflowY;

    /**
     * @property To provide diffrent colors to the text of the box
     *
     */
    color?: string;

    /**
     * @property To rounds the corners of outer border of the Box
     *
     */
    borderRadius?: string | number;

    /**
     * @property To set a width of border for the Box
     *
     */
    borderWidth?: string;

    /**
     * @property To style the border(line) of the box
     *
     */
    borderStyle?: string;

    /**
     * @property To provide diffrent colors to border of the box
     *
     */
    borderColor?: string;

    /**
     * @property To set fontsize of the content inside the Box
     *
     */
    fontSize?: string;

    /**
     * @property To set the distance/height between the lines of text in the Box
     *
     */
    lineHeight?: string;

    /**
     * @property To specify the horizontal alignment of text in the Box
     *
     */
    textAlign?: Property.TextAlign;

    /**
     * Add custom text transformation properties
     * @property
     *
     **/
    textTransform?: Property.TextTransform;

    /**
     * For text clipping - When using inside the flex, min-width should be define within the element
     * @property {boolean}
     *
     **/
    isTruncate?: boolean;

    /**
     * For change the display view of element
     * @property {boolean}
     *
     **/
    display?: Property.DisplayInside;

    /**
     * Alignment of items in specific direction(eg. left , right , center)
     * @property
     *
     **/
    alignItems?: Property.AlignItem;

    /**
     * To distribute extra  space leftover in the cross axis
     * @property
     *
     **/
    justifyContent?: Property.ContentJustification;

    /**
     * Types to add direction of the elements
     * @property
     *
     **/
    flexDirection?: Property.FlexDirection;
}

/**
 * @type StyledBoxProps
 */

type StyledBoxProps = {
    overrideStyle?: PropTypes["style"];
} & Partial<BoxPropType>;

/**
 * @function EmotionBox - used to wrap the component for style
 *
 **/
export const EmotionBox = styled("div")(
    ({
        overrideStyle,
        width,
        height,
        padding,
        backgroundColor,
        overflow,
        color,
        borderRadius,
        borderStyle,
        borderWidth,
        borderColor,
        textAlign,
        fontSize,
        lineHeight,
        isTruncate,
        textTransform,
        display,
        alignItems,
        justifyContent,
        flexDirection,
    }: StyledBoxProps) => {
        return {
            display,
            alignItems,
            justifyContent,
            flexDirection,
            width,
            height,
            padding,
            backgroundColor,
            color,
            borderRadius,
            borderStyle,
            borderWidth,
            borderColor,
            lineHeight,
            fontSize,
            textAlign,
            textTransform,
            whiteSpace: isTruncate
                ? ("nowrap" as Property.whiteSpace)
                : ("normal" as Property.whiteSpace),
            textOverflow: isTruncate && "ellipsis",
            overflow: isTruncate ? "hidden" : overflow,
            ...overrideStyle,
        };
    },
);

export const Box = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<BoxPropType>
>(
    (
        {
            id,
            style,
            children,
            className,

            ...props
        },
        ref,
    ) => {
        return (
            <EmotionBox
                id={id}
                overrideStyle={style}
                ref={ref}
                className={classNames(className)}
                {...props}
            >
                {children}
            </EmotionBox>
        );
    },
);

Box.defaultProps = {
    id: "box",
};
