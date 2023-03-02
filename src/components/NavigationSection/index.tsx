import * as React from "react";
import { cx as classNames } from "@emotion/css";
import { PropTypes } from "../../utils/propType";
import styled from "@emotion/styled";
import { Property } from "../../utils/types";
import { Paper } from "../Paper";

/**
 * @type navigationSectionType
 * used as a header or footer
 */
type navigationSectionType = "header" | "footer";

type OmitProps = "onClick" | "disable" | "ref";

export interface NavigationSectionPropType
    extends Omit<
        PropTypes<navigationSectionType | HTMLDivElement | HTMLElement>,
        OmitProps
    > {
    /**
     * To add custom color to the background of element.
     * @property {string}
     *
     **/
    backgroundColor?: string;

    /**
     * To add custom style
     **/
    overrideStyle?: PropTypes["style"];
}
/**
 * @function StyledNavigationSection - used to apply override style as well as additional CSS styles on component.
 *
 **/
const StyledNavigationSection = ({
    overrideStyle,
    backgroundColor,
}: NavigationSectionPropType) => {
    return {
        display: "flex" as Property.DisplayInside,
        flexDirection: "column" as Property.FlexDirection,
        padding: "20px" as Property.Padding,
        backgroundColor,
        ...overrideStyle,
    };
};

/**
 * @function EmotionNavigationSection - used to wrap the component for style
 *
 **/
export const EmotionNavigationSection = styled(Paper, {
    shouldForwardProp: (props: string) =>
        ![
            "elevation",
            "colorScheme",
            "disable",
            "overrideStyle",
            "fullWidth",
            "justifyContent",
            "alignItems",
            "backgroundColor",
            "borderRadius",
            "as",
        ].includes(props),
})(StyledNavigationSection);

export const NavigationSection = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<NavigationSectionPropType>
>(({ id, children, className, style, as, ...props }, ref) => {
    return (
        <EmotionNavigationSection
            id={id}
            as={as}
            className={classNames(className)}
            overrideStyle={style}
            {...props}
            ref={ref}
        >
            {children}
        </EmotionNavigationSection>
    );
});

/**
 * defaultProps - To define default values for component props
 */
NavigationSection.defaultProps = {
    id: "navigation_section",
    backgroundColor: "transparent",
    as: "header",
};
