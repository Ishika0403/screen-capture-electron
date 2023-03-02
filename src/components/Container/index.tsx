import React from "react";
import { PropTypes } from "../../utils/propType";
import { cx as classNames } from "@emotion/css";
import styled from "@emotion/styled";
import { BreakPoints } from "../../utils/units";

interface ContainerPropType extends Omit<PropTypes, "as" | "disable"> {
    /**
     * Sizes  for the container width
     * @property {string}
     *
     **/
    size?: "sm" | "md" | "lg" | "fluid";
}

/**
 * @function getPropsByPosition
 * This function is used to pass position variant to modal box
 */
const getPropsBySizes = ({ size }) => {
    const Sizes = {
        sm: {
            /** Media for mobiles */
            [`@media ${BreakPoints.mobileL}`]: {
                maxWidth: "540px",
            },

            /** Media for small tablets */
            [`@media ${BreakPoints.tabletS}`]: {
                maxWidth: "720px",
            },
            /** Media for large tablets */
            [`@media ${BreakPoints.tablet}`]: {
                maxWidth: "960px",
            },

            /** Media for laptop view */
            [`@media ${BreakPoints.laptop}`]: {
                maxWidth: "1140px",
            },
            /** Media for large laptops and desktop up views */
            [`@media ${BreakPoints.laptopL}`]: {
                maxWidth: "1320px",
            },
        },
        md: {
            /** Media for small tablets */
            [`@media ${BreakPoints.tabletS}`]: {
                maxWidth: "720px",
            },
            /** Media for large tablets */
            [`@media ${BreakPoints.tablet}`]: {
                maxWidth: "960px",
            },
            /** Media for laptop view */
            [`@media ${BreakPoints.laptop}`]: {
                maxWidth: "1140px",
            },
            /** Media for laptop Large and desktop up views */
            [`@media ${BreakPoints.laptopL}`]: {
                maxWidth: "1320px",
            },
        },
        lg: {
            /** Media for laptop views */
            [`@media ${BreakPoints.laptop}`]: {
                maxWidth: "1140px",
            },
            /** Media for laptop and desktop up views */
            [`@media ${BreakPoints.laptopL}`]: {
                maxWidth: "1340px",
            },
            /** Media for desktop views */
            [`@media ${BreakPoints.desktop}`]: {
                maxWidth: "1440px",
            },
        },
        fluid: {
            maxWidth: "100%",
        },
    };
    return Sizes[size] || Sizes.fluid;
};

/**
 * @function StyledContainer
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledContainer = ({ overrideStyle, size }) => {
    const sizeByProps = getPropsBySizes({ size });

    return {
        width: "100%",
        paddingLeft: "15px",
        paddingRight: "15px",
        marginRight: "auto",
        marginLeft: "auto",
        ...overrideStyle,
        ...sizeByProps,
    };
};

/**
 * @function EmotionContainer
 * This function is used to wrap the component for style
 */
export const EmotionContainer = styled("div")(StyledContainer);

/**
 * @function Container
 * This function is used to create Container Component in which we wrap EmotionContainer
 */
export const Container = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<ContainerPropType>
>(({ className, id, children, style, size, ...props }, ref) => {
    return (
        <EmotionContainer
            id={id}
            size={size}
            className={classNames(className)}
            ref={ref}
            overrideStyle={style}
            {...props}
        >
            {children}
        </EmotionContainer>
    );
});

/**
 * defaultProps - To define default values for component props
 */
Container.defaultProps = {
    id: "container_component",
    size: "fluid",
};
