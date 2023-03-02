import * as React from "react";
import styled from "@emotion/styled";
import { PropTypes } from "../../utils/propType";
import { cx as classNames } from "@emotion/css";
import { Property } from "../../utils/types";
import { getResponsiveCssProperty } from "../../utils/getBreakpoint";
interface FlexItemPropType extends Omit<PropTypes, "as" | "disable"> {
    /**
     * Order property controls the order(position) to appear in the flex container
     * @property {number}
     *
     **/
    order?: number;

    /**
     * Types to align the items
     * @property
     *
     **/
    alignSelf?:
        | {
              xs?: Property.AlignSelf;
              sm?: Property.AlignSelf;
              md?: Property.AlignSelf;
              lg?: Property.AlignSelf;
              xl?: Property.AlignSelf;
              xxl?: Property.AlignSelf;
          }
        | Property.AlignSelf;

    /**
     * Specify how much the flexible item will grow
     * @property
     **/
    flexGrow?:
        | {
              xs?: Property.FlexGrow;
              sm?: Property.FlexGrow;
              md?: Property.FlexGrow;
              lg?: Property.FlexGrow;
              xl?: Property.FlexGrow;
              xxl?: Property.FlexGrow;
          }
        | Property.FlexGrow;

    /**
     * Specify how much the flexible item will shrink
     * @property
     *
     **/
    flexShrink?:
        | {
              xs?: number;
              sm?: number;
              md?: number;
              lg?: number;
              xl?: number;
              xxl?: number;
          }
        | Property.FlexShrink;

    /**
     * Specify the initial length of a flexible item
     * @property
     **/
    flexBasis?:
        | {
              xs?: Property.FlexBasis;
              sm?: Property.FlexBasis;
              md?: Property.FlexBasis;
              lg?: Property.FlexBasis;
              xl?: Property.FlexBasis;
              xxl?: Property.FlexBasis;
          }
        | Property.FlexBasis;
}

/**
 * @function StyledFlexItemPropType
 * This function to add partial prop types
 */
type StyledFlexItemProps = {
    overrideStyle?: PropTypes["style"];
} & Partial<FlexItemPropType>;

/**
 * @function StyledFlexItem
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledFlexItem = ({
    flexGrow,
    flexShrink,
    flexBasis,
    order,
    alignSelf,
    overrideStyle,
}: StyledFlexItemProps) => {
    return {
        ...((flexBasis || flexGrow || flexShrink || alignSelf) &&
            getResponsiveCssProperty({
                flexBasis,
                maxWidth: flexBasis,
                flexGrow,
                alignSelf,
                flexShrink,
            })),
        order,
        ...overrideStyle,
    };
};

/**
 * @function EmotionFlexItem
 * This function is used to style the component
 */
export const EmotionFlexItem = styled("div")(StyledFlexItem);
export const FlexItem = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<FlexItemPropType>
>(({ id, children, className, style, ...props }, ref) => {
    return (
        <EmotionFlexItem
            id={id}
            ref={ref}
            className={classNames(className)}
            overrideStyle={style}
            {...props}
        >
            {children}
        </EmotionFlexItem>
    );
});

/**
 * defaultProps - To define default values for component props
 */
FlexItem.defaultProps = {
    id: "flexitem",
    flexGrow: {
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        xxl: 1,
    },
    flexShrink: {
        xs: 0,
        sm: 0,
        md: 0,
        lg: 0,
        xl: 0,
        xxl: 0,
    },
    flexBasis: {
        xs: "auto",
        sm: "auto",
        md: "auto",
        lg: "auto",
        xl: "auto",
        xxl: "auto",
    },
    alignSelf: {
        xs: "flex-start",
        sm: "flex-start",
        md: "flex-start",
        lg: "flex-start",
        xl: "flex-start",
        xxl: "flex-start",
    },
};
