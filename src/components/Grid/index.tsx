import React from "react";
import styled from "@emotion/styled";
import { cx as classNames } from "@emotion/css";
import { PropTypes } from "../../utils/propType";
import { getResponsiveCssProperty } from "../../utils/getBreakpoint";

interface GridPropType extends Omit<PropTypes, "disable" | "colorScheme"> {
    /**
     * Rows in the template
     * @property
     *
     **/
    templateRows?:
        | {
              xs?: string;
              sm?: string;
              md?: string;
              lg?: string;
              xl?: string;
              xxl?: string;
          }
        | string;
    /**
     * Columns in the template
     * @property
     **/
    templateColumns?:
        | {
              xs?: string;
              sm?: string;
              md?: string;
              lg?: string;
              xl?: string;
              xxl?: string;
          }
        | string;

    /**
     * Gap between the grid(row and column wise)
     * @property
     **/
    gap?: number;
}

export type StyledGridProps = {
    overrideStyle?: PropTypes["style"];
} & Partial<GridPropType>;

/**
 * @function StyledFlex
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledGrid = ({
    overrideStyle,
    templateRows,
    templateColumns,
    gap,
}: StyledGridProps) => {
    return {
        display: "grid",
        ...((templateRows || templateColumns) &&
            getResponsiveCssProperty({
                gridTemplateRows: templateRows,
                gridTemplateColumns: templateColumns,
            })),

        ...(gap && {
            gridGap: gap,
        }),
        ...overrideStyle,
    };
};

/**
 * @function EmotionFlex
 * This function is used to wrap the component for style
 */
export const EmotionGrid = styled("div", {
    shouldForwardProp: (props: string) => {
        return ![
            "alignItems",
            "flexDirection",
            "justifyContent",
            "flexWrap",
            "overrideStyle",
            "gap",
            "templateRows",
            "templateColumns",
            "as",
        ].includes(props);
    },
})(StyledGrid);

/**
 * @function Flex
 * This function is used to create Flex Component to wrap EmotionFlex
 */
export const Grid = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<GridPropType>
>(
    (
        {
            id,
            children,
            className,
            templateRows,
            templateColumns,
            style,
            ...props
        },
        ref,
    ) => {
        return (
            <EmotionGrid
                id={id}
                templateRows={templateRows}
                templateColumns={templateColumns}
                className={classNames(className)}
                overrideStyle={style}
                ref={ref}
                {...props}
            >
                {children}
            </EmotionGrid>
        );
    },
);

/**
 * defaultProps - To define default values for component props
 */
Grid.defaultProps = {
    id: "Grid",
    gap: 5,
};
