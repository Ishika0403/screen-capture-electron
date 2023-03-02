import React from "react";
import { PropTypes } from "../../utils/propType";
import { cx as classNames } from "@emotion/css";
import styled from "@emotion/styled";
import { RadioContext } from "./radioContext";
import { Text } from "../Text";

export interface RadioProp extends Omit<PropTypes, "as" | "disable"> {
    /**
     * To represent caption of the Radio group
     * @property {string}
     **/
    title?: string;

    /**
     * If true, display radio buttons vertically.
     * @property {boolean}
     **/
    vertical?: boolean;

    /**
     * Two types of variation : outline - show bordered layout and  solid -  show filled layout
     * @property {string}
     **/
    variant?: "outline" | "solid";

    /**
     * Default value for radio button
     * @property {string | number}
     **/
    value?: string | number;

    /**
     * on change event for radio button group
     * @property {void}
     **/
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    /**
     * To add custom class
     * @property {string}
     **/
    className?: string;
}

/**
 * function used to define the style of Emotionlabel
 * @function EmotionLabel
 **/
const EmotionLabel = styled(Text)((props) => {
    return {
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "row",
    };
});

/**
 * @function StyledRadioWrapper
 * styled radio wrapper additional props
 * */
export type StyledRadioWrapper = {
    overrideStyle?: PropTypes["style"];
} & Partial<RadioProp>;

/**
 * @function RadioWrapper
 * This function is used define the style of EmotionRadio Component
 *
 **/
const RadioWrapper = styled("div")(({ ...props }: StyledRadioWrapper) => ({
    flexDirection: props.vertical ? "column" : "row",
    display: "flex",
    ...props.overrideStyle,
}));

export const RadioGroup = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<RadioProp>
>(
    (
        {
            children,
            title,
            variant,
            onChange,
            value,
            colorScheme,
            className,
            style,
            vertical,
            id,
            ...props
        },
        ref,
    ) => {
        const [valueRG, setValue] = React.useState(value);

        const handleChange = (event) => {
            setValue(event.target.value);
            if (onChange) {
                onChange(event.target.value);
            }
        };

        return (
            <RadioContext.Provider
                value={{
                    onChange: handleChange,
                    value: valueRG,
                    variant,
                    colorScheme,
                    vertical,
                }}
            >
                <RadioWrapper
                    {...props}
                    className={classNames(className)}
                    overrideStyle={style}
                    vertical={vertical}
                    id={id}
                    ref={ref}
                >
                    <EmotionLabel>{title}</EmotionLabel>
                    {children}
                </RadioWrapper>
            </RadioContext.Provider>
        );
    },
);

/** Default props for the radio group */
RadioGroup.defaultProps = {
    variant: "outline",
    colorScheme: "primary",
    vertical: false,
};
