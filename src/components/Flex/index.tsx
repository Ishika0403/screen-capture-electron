import React from "react";
import styled from "@emotion/styled";
import { Property } from "../../utils/types";
import { cx as classNames } from "@emotion/css";
import { PropTypes } from "../../utils/propType";
import { getResponsiveCssProperty } from "../../utils/getBreakpoint";
interface FlexPropType extends Omit<PropTypes, "colorScheme" | "disable"> {
    /**
     * Alignment of items in specific direction(eg. left , right , center)
     * @property
     **/
    alignItems?:
        | {
              xs?: Property.AlignItem;
              sm?: Property.AlignItem;
              md?: Property.AlignItem;
              lg?: Property.AlignItem;
              xl?: Property.AlignItem;
              xxl?: Property.AlignItem;
          }
        | Property.AlignItem;

    /**
     * To distribute extra  space leftover in the cross axis
     * @property
     **/
    justifyContent?:
        | {
              xs?: Property.ContentJustification;
              sm?: Property.ContentJustification;
              md?: Property.ContentJustification;
              lg?: Property.ContentJustification;
              xl?: Property.ContentJustification;
              xxl?: Property.ContentJustification;
          }
        | Property.ContentJustification;

    /** Types to add direction of the elements */
    flexDirection?:
        | {
              xs?: Property.FlexDirection;
              sm?: Property.FlexDirection;
              md?: Property.FlexDirection;
              lg?: Property.FlexDirection;
              xl?: Property.FlexDirection;
              xxl?: Property.FlexDirection;
          }
        | Property.FlexDirection;

    /** whether to wrap flexible items or not */
    flexWrap?:
        | {
              xs?: Property.FlexWrap;
              sm?: Property.FlexWrap;
              md?: Property.FlexWrap;
              lg?: Property.FlexWrap;
              xl?: Property.FlexWrap;
              xxl?: Property.FlexWrap;
          }
        | Property.FlexWrap;
}

export type StyledFlexProps = {
    overrideStyle?: PropTypes["style"];
} & Partial<FlexPropType>;

/**
 * @function StyledFlex
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */

const StyledFlex = ({
    alignItems,
    justifyContent,
    flexDirection,
    flexWrap,
    overrideStyle,
}: StyledFlexProps) => {
    return {
        alignItems: alignItems as Property.AlignItem,
        justifyContent: justifyContent as Property.ContentJustification,

        ...(flexDirection &&
            getResponsiveCssProperty({
                flexDirection: flexDirection,
                flexWrap: flexWrap,
            })),

        display: "flex",
        ...overrideStyle,
    };
};

/**
 * @function EmotionFlex
 * This function is used to wrap the component for style
 */
export const EmotionFlex = styled("div", {
    shouldForwardProp: (props: string) => {
        return ![
            "alignItems",
            "flexDirection",
            "justifyContent",
            "flexWrap",
            "overrideStyle",
            "as",
        ].includes(props);
    },
})(StyledFlex);

/**
 * @function Flex
 * This function is used to create Flex Component for wrapping EmotionFlex
 */
export const Flex = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<FlexPropType>
>(
    (
        {
            alignItems,
            justifyContent,
            flexDirection,
            flexWrap,
            children,
            className,
            style,
            ...props
        },
        ref,
    ) => {
        return (
            <EmotionFlex
                className={classNames(className)}
                alignItems={alignItems}
                justifyContent={justifyContent}
                flexDirection={flexDirection}
                flexWrap={flexWrap}
                overrideStyle={style}
                ref={ref}
                {...props}
            >
                {children}
            </EmotionFlex>
        );
    },
);

/**
 * defaultProps - To define default values for component props
 */
Flex.defaultProps = {
    id: "Flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: {
        xs: "row",
        sm: "row",
        md: "row",
        lg: "row",
        xl: "row",
        xxl: "row",
    },
    flexWrap: `wrap`,
};
