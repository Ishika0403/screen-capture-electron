import * as React from "react";
import { cx as classNames } from "@emotion/css";
import { PropTypes } from "../../utils/propType";
import styled from "@emotion/styled";
import { Theme } from "../../context/ThemeProvider";

interface ButtonGroupPropType extends Omit<PropTypes, "as" | "disable"> {
    /**
     * 4 types Button Group variations: 'solid - filled layout', 'link - linked layout ' and 'outline - bordered layout' , 'text -  Text style with hover layout
     * @property {string}
     *
     **/
    variant?: "solid" | "outline" | "text" | "link";

    /**
     * Rounds the corners of ButtonGroup's outer border edge
     * @property {number}
     *
     **/
    borderRadius: number;

    /**
     * If true, button group show column wise vertically.
     * @property {boolean}
     *
     **/
    vertical: boolean;

    /**
     * To apply custom color to the border.
     * @property {string}
     *
     **/
    borderColor?: string;
}

type StyledButtonGroupProps = {
    theme?: Theme;
    overrideStyle?: PropTypes["style"];
} & Partial<ButtonGroupPropType>;

const EmotionButtonGroupParent = styled.div(
    ({
        vertical,
        borderRadius,
        borderColor,
        overrideStyle,
    }: StyledButtonGroupProps) => ({
        display: "inline-flex",
        flexDirection: vertical ? "column" : "row",
        ...overrideStyle,
        ["& .groupclass"]: {
            borderRadius: borderRadius,
            minWidth: "100px",
            boxShadow: "none",
            borderColor: borderColor,
            ":hover": {
                boxShadow: "none",
            },
            "&:not(:last-of-type)": {
                borderTopRightRadius: vertical ? "" : 0,
                borderBottomLeftRadius: vertical && 0,
                borderBottomRightRadius: 0,
                borderRightColor: vertical ? "" : "transparent",
                borderBottomColor: vertical && "transparent",
            },
            "&:not(:first-of-type)": {
                borderTopLeftRadius: 0,
                borderTopRightRadius: vertical && 0,
                borderBottomLeftRadius: vertical ? "" : 0,
            },
        },
    }),
);

export const ButtonGroup = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<StyledButtonGroupProps>
>(({ id, variant, className, style, children, ...props }, ref) => {
    return (
        <EmotionButtonGroupParent
            id={id}
            role="buttonGroup"
            className={classNames(className)}
            ref={ref}
            {...props}
            overrideStyle={style}
        >
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) {
                    return null;
                }
                return React.cloneElement(child, {
                    variant,
                    className: "groupclass",
                });
            })}
        </EmotionButtonGroupParent>
    );
});
ButtonGroup.defaultProps = {
    id: "buttongroup",
    variant: "solid",
    colorScheme: "primary",
    borderRadius: 4,
    vertical: false,
};
