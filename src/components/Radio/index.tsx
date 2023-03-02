import React from "react";
import styled from "@emotion/styled";
import { RadioContext } from "../RadioGroup/radioContext";
import { defaultTheme, Theme } from "../../context/ThemeProvider";
import { isObjectEmpty } from "../../utils/assertion";
import { Text } from "../Text";
import { InputPropType as inputType, InputWrapper } from "../InputWrapper";
import { PropTypes } from "../../utils/propType";
import createChainedFunction from "../RadioGroup/createChainedFunction";
import { fontSizes } from "../../utils/units";
import { cx as classNames } from "@emotion/css";

export interface RadioProp
    extends Omit<
            inputType<"radio">,
            "as" | "borderRadius" | "onChange" | "variant" | "ref"
        >,
        Pick<
            PropTypes<HTMLInputElement>,
            "colorScheme" | "className" | "style"
        > {
    /**If true, radio button is checked by default */
    checked?: boolean;

    /**
     * To show error radio button
     * @property {boolean}
     **/
    error?: boolean;

    /**
     * onChange event for radio button
     * @property {void}
     **/
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

    /**
     * 2 types of variants: 'outline - bordered layout', 'solid - filled layout'.
     * @property {string}
     **/
    variant?: "outline" | "solid";

    /**
     * If true, radio buttons display vertically.
     * @property {boolean}
     **/
    vertical?: boolean;

    /**
     * To repersent caption of the element.
     * @property {string}
     **/
    title?: string;

    /**
     * 3 types of Radio sizes : 'sm - small size view of Radio' , 'md - medium size view of Radio' and 'lg - large size view of Radio
     * @property {string}
     **/
    size?: "sm" | "md" | "lg";
}

type StyledRadioProp = {
    overrideStyle?: PropTypes["style"];
} & Partial<RadioProp>;

/**
 * @object  RadioSizeProps
 * This object is used define the sizes of Radio size
 */
const RadioSizeProps = {
    label: {
        sm: {
            fontSize: fontSizes["sm"],
        },
        md: {
            fontSize: fontSizes["md"],
        },
        lg: {
            fontSize: fontSizes["lg"],
        },
    },
    input: {
        sm: {
            width: 14,
            height: 14,
        },
        md: {
            width: 16,
            height: 16,
        },
        lg: {
            width: 18,
            height: 18,
        },
    },
    selected: {
        sm: {
            width: 6,
            height: 6,
        },
        md: {
            width: 8,
            height: 8,
        },
        lg: {
            width: 11,
            height: 11,
        },
    },
};

/**
 * @function getPropsByVariant
 * This function is used to pass the color scheme, variant and the emotion theme
 */
const getPropsByVariant = ({ variant, colorScheme, theme }) => {
    const colorInPalette = theme.palette[colorScheme];
    const variants = {
        outline: colorInPalette && {
            main: {
                border: `1px solid ${colorInPalette.main}`,
                backgroundColor: theme.palette.common.transparent,
                color: colorInPalette.main,
            },
        },
        solid: colorInPalette && {
            main: {
                border: `1px solid ${colorInPalette.main}`,
                // backgroundColor: colorInPalette.main,
                color: colorInPalette.contrastText,
            },
        },
    };

    return variants[variant];
};

/**
 * @function StyledText
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledText = ({ size }) => {
    return {
        flexGrow: 1,
        fontSize: RadioSizeProps?.label[size]?.fontSize,
        display: "inline-flex",
    };
};
/**
 * @function EmotionText
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns with style
 */
export const EmotionText = styled(Text)(StyledText);

export const Radio = React.forwardRef<
    HTMLInputElement,
    React.PropsWithChildren<RadioProp>
>(
    (
        {
            value,
            onChange,
            id,
            checked,
            style,
            className,
            title,
            size,
            ...props
        },
        ref,
    ) => {
        const radioGroup = React.useContext(RadioContext);
        const { colorScheme, variant, vertical } = radioGroup
            ? radioGroup
            : props;
        const onChangeProp = createChainedFunction(
            onChange,
            radioGroup && radioGroup.onChange,
        );

        type StyledProps = {
            theme?: Theme;
            overrideStyle?: PropTypes["style"];
            disable?: boolean;
        };
        const styledRadioInput = ({
            error,
            theme,
            disable,
        }: Omit<StyledRadioProp, "className"> & StyledProps) => {
            if (isObjectEmpty(theme)) {
                theme = defaultTheme;
            }
            const propsByVariant = getPropsByVariant({
                theme,
                colorScheme,
                variant,
            });
            return {
                width: RadioSizeProps?.input[size]?.width,
                height: RadioSizeProps?.input[size]?.height,
                cursor: "pointer",
                display: "inline-flex",
                position: "relative",
                flexShrink: 0,
                margin: 0,
                marginRight: "5px",
                WebkitAppearance: "none",
                borderRadius: "50%",
                ...(propsByVariant && propsByVariant.main),
                ...(error && { borderColor: "red" }),
                " &:before": {
                    content: '" "',
                    display: "inline-block",
                    verticalAlign: "baseline",
                    margin: variant === "solid" ? "0 auto" : "0 auto",
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                    width:
                        variant === "solid"
                            ? RadioSizeProps?.input[size]?.width
                            : RadioSizeProps?.selected[size]?.width,
                    height:
                        variant === "solid"
                            ? RadioSizeProps?.input[size]?.height
                            : RadioSizeProps?.selected[size]?.height,
                    borderRadius: "50%",
                    ...(disable && {
                        opacity: 0.6,
                        borderColor: theme.palette.action.disabled,
                        pointerEvents: "none",
                    }),
                },
                ...(disable && {
                    opacity: 0.6,
                    borderColor: theme.palette.action.disabled,

                    pointerEvents: "none",
                }),
                "&:checked": {
                    "&:before": {
                        backgroundColor:
                            colorScheme && theme?.palette[colorScheme]?.main,
                        opacity: "1",
                        transition: "opacity 1s ease",
                        ...(error && { backgroundColor: "red" }),
                    },
                },
            };
        };
        /**
         * @function EmotionRadioInput
         * This function is used define the style of EmotionRadioInput Component
         */
        const EmotionRadioInput = styled(InputWrapper)(styledRadioInput);

        /**  Emotion label  */
        const EmotionLabel = styled("label")(
            ({ theme, overrideStyle }: StyledProps) => {
                if (isObjectEmpty(theme)) {
                    theme = defaultTheme;
                }
                return {
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    ...overrideStyle,
                };
            },
        );
        return (
            <EmotionLabel
                className={classNames(className)}
                overrideStyle={style}
            >
                <EmotionRadioInput
                    checked={
                        (radioGroup && radioGroup.value === value) || checked
                    }
                    value={value}
                    type="radio"
                    id={id}
                    ref={ref}
                    size={size}
                    onChange={onChangeProp}
                    {...props}
                />
                <EmotionText as="span" size={size}>
                    {title}
                </EmotionText>
            </EmotionLabel>
        );
    },
);

/** Default props for the radio group */
Radio.defaultProps = {
    checked: false,
    error: false,
    colorScheme: "primary",
    variant: "solid",
    size: "lg",
};
