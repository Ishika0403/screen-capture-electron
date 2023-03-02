import React from "react";
import styled from "@emotion/styled";
import { cx as classNames } from "@emotion/css";
import { PropTypes } from "../../utils/propType";
import { Paper } from "../Paper";
import {
    getResponsiveCssProperty,
    getResponsivePropertyFromProps,
    ResponsiveProperty,
} from "../../utils/getBreakpoint";

interface GridItemType
    extends Omit<PropTypes, "disable" | "colorScheme" | "ref"> {
    /**
     * Rows in the template
     * @property
     **/
    rowSpan?:
        | {
              xs?: number;
              sm?: number;
              lg?: number;
              md?: number;
              xl?: number;
              xxl?: number;
          }
        | number;
    /**
     * Columns in the template
     * @property
     **/
    colSpan?:
        | {
              xs?: number;
              sm?: number;
              lg?: number;
              md?: number;
              xl?: number;
              xxl?: number;
          }
        | number;
}

export type StyledGridItemProps = {
    overrideStyle?: PropTypes["style"];
} & Partial<GridItemType>;

/** to calculate span with breakpoint */
const getGridSpan = (property: ResponsiveProperty) => {
    return {
        xs: `span ${getResponsivePropertyFromProps(
            property,
            "xs",
        )} / span ${getResponsivePropertyFromProps(property, "xs")}`,
        sm: `span ${getResponsivePropertyFromProps(
            property,
            "sm",
        )} / span ${getResponsivePropertyFromProps(property, "sm")}`,
        md: `span ${getResponsivePropertyFromProps(
            property,
            "md",
        )} / span ${getResponsivePropertyFromProps(property, "md")}`,
        lg: `span ${getResponsivePropertyFromProps(
            property,
            "lg",
        )} / span ${getResponsivePropertyFromProps(property, "lg")}`,
    };
};

/**
 * @function StyledFlex
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledGridItem = ({
    overrideStyle,
    rowSpan,
    colSpan,
}: StyledGridItemProps) => {
    return {
        padding: 0,
        ...((rowSpan || colSpan) &&
            getResponsiveCssProperty({
                gridRow: getGridSpan(rowSpan),
                gridColumn: getGridSpan(colSpan),
            })),
        ...overrideStyle,
    };
};

/**
 * @function EmotionFlex
 * This function is used to wrap the component for style
 */
export const EmotionGridItem = styled(Paper, {
    shouldForwardProp: (props: string) => {
        return ![
            "alignItems",
            "flexDirection",
            "justifyContent",
            "flexWrap",
            "overrideStyle",
            "rowSpan",
            "colSpan",
            "variant",
            "as",
        ].includes(props);
    },
})(StyledGridItem);

/**
 * @function Flex
 * This function is used to create Flex Component to EmotionFlex
 */
export const GridItem = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<GridItemType>
>(({ id, children, className, rowSpan, colSpan, style, ...props }, ref) => {
    return (
        <EmotionGridItem
            id={id}
            className={classNames(className)}
            overrideStyle={style}
            rowSpan={rowSpan}
            colSpan={colSpan}
            ref={ref}
            {...props}
        >
            {children}
        </EmotionGridItem>
    );
});

/**
 * defaultProps - To define default values for component props
 */
GridItem.defaultProps = {
    id: "Grid",
};
