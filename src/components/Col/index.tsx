import * as React from "react";
import { cx as classNames } from "@emotion/css";
import styled from "@emotion/styled";
import { Property } from "../../utils/types";
import { PropTypes } from "../../utils/propType";
import { BreakPoints } from "../../utils/units";

interface ColPropType extends Omit<PropTypes, "as" | "disable"> {
    /**
     * Specify (1-12) number for extra small device width
     * @property {number}
     *
     **/
    xs?: number;

    /**
     * Specify (1-12) number for small device width
     * @property {number}
     *
     **/
    sm?: number;

    /**
     * Specify (1-12) number for medium device width
     * @property {number}
     *
     **/
    md?: number;

    /**
     * Specify (1-12) number for large device width
     * @property {number}
     *
     **/
    lg?: number;

    /**
     * Specify (1-12) number to push columns over for more spacing on extra small view
     * @property {number}
     *
     **/
    xsOffset?: number;

    /**
     * Specify (1-12) number to push columns over for more spacing on small view
     * @property {number}
     *
     **/
    smOffset?: number;

    /**
     * Specify (1-12) number to push columns over for more spacing on medium view
     * @property {number}
     *
     **/
    mdOffset?: number;

    /**
     * Specify (1-12) number to push columns over for more spacing on large view
     * @property {number}
     *
     **/
    lgOffset?: number;

    /**
     * Alignment of content (eg. left , right , center)
     * @property
     **/
    textAlign?: Property.TextAlign;
}

/**
 * @function StyledColProps
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
type StyledColProps = {
    overrideStyle?: PropTypes["style"];
} & Partial<ColPropType>;

/**
 * @function StyledCol
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledCol = ({
    textAlign,
    overrideStyle,
    xs,
    sm,
    md,
    lg,
    xsOffset,
    smOffset,
    mdOffset,
    lgOffset,
}: StyledColProps) => {
    return {
        textAlign,
        position: "relative" as Property.Position,
        minHeight: "1px",
        paddingRight: "15px",
        paddingLeft: "15px",
        ...overrideStyle,
        width: "100%",
        flex: `0 0 auto`,

        ...(xs && {
            width: `calc((100% * ${xs}) / 12)`,
        }),

        ...(xsOffset && {
            marginLeft: `calc((100% * ${xsOffset}) / 12)`,
        }),
        /** Media for small tablets */
        [`@media ${BreakPoints.tabletS}`]: {
            ...(sm && {
                width: `calc((100% * ${sm}) / 12)`,
            }),
            ...(smOffset && {
                marginLeft: `calc((100% * ${smOffset}) / 12)`,
            }),
        },
        /** Media for large tablet views */
        [`@media ${BreakPoints.tablet}`]: {
            ...(md && {
                width: `calc((100% * ${md}) / 12)`,
            }),
            ...(mdOffset && {
                marginLeft: `calc((100% * ${mdOffset}) / 12)`,
            }),
        },
        /** Media for laptops and desktop up views */
        [`@media ${BreakPoints.laptop}`]: {
            ...(lg && {
                width: `calc((100% * ${lg}) / 12)`,
            }),
            ...(lgOffset && {
                marginLeft: `calc((100% * ${lgOffset}) / 12)`,
            }),
        },
    };
};

/**
 * @function EmotionCol
 * This function is used to wrap the column component for style
 */
export const EmotionCol = styled("div")(StyledCol);
export const Col = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<StyledColProps>
>(({ id, style, children, className, ...props }, ref) => {
    return (
        <EmotionCol
            id={id}
            ref={ref}
            className={classNames(className)}
            overrideStyle={style}
            {...props}
        >
            {children}
        </EmotionCol>
    );
});

/**
 * defaultProps - To define default values for component props
 */
Col.defaultProps = {
    id: "col",
    xs: 0,
    sm: 0,
    md: 0,
    lg: 0,
    xsOffset: 0,
    smOffset: 0,
    mdOffset: 0,
    lgOffset: 0,
    textAlign: "left",
};
