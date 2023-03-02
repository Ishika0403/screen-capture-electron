import * as React from "react";
import styled from "@emotion/styled";
import { alpha } from "../../utils/Theme/colorManipulator";
import { isObjectEmpty } from "../../utils/assertion";
import { defaultTheme, Theme } from "../../context/ThemeProvider";
import { InputPropType as inputType, InputWrapper } from "../InputWrapper";
import { PropTypes } from "../../utils/propType";
import { cx as classNames } from "@emotion/css";
import { fontSizes, spacing } from "../../utils/units";
import { Property } from "../../utils/types";

interface InputPropType
    extends Omit<
            inputType<"password" | "text" | "email" | "tel">,
            "isChecked" | "ref"
        >,
        Pick<
            PropTypes<HTMLInputElement>,
            "className" | "style" | "colorScheme"
        > {
    /**
     * Rounds the corners of Input's outer border edge
     * @property {number}
     **/
    borderRadius?: number;

    /**
     * To repersent caption of the element
     * @property {string | JSX.Element}
     **/
    label?: string | JSX.Element;

    /**
     * 3 types Input sizes : 'sm - small size view' , 'md - medium size view' and 'lg - large size view
     * @property {string}
     **/
    size?: "sm" | "md" | "lg";

    /**
     * To add child element on left
     * @property {JSX.Element}
     **/
    inputLeftChildren?: JSX.Element;

    /**
     * To add child element on right
     * @property {JSX.Element}
     **/
    inputRightChildren?: JSX.Element;

    /**
     * Space between icon and Input field
     * @property {void}
     **/
    iconSpacing?: Property.Width;
}

/**
 * @object InputSizeProps
 * This object is used define the sizes of Input
 */

const InputSizeProps = {
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
            fontSize: fontSizes["xs"],
            padding: `${spacing["xs"]} ${spacing["sm"]}`,
        },
        md: {
            fontSize: fontSizes["sm"],
            padding: `${spacing["sm"]} ${spacing["md"]}`,
        },
        lg: {
            fontSize: fontSizes["md"],
            padding: `${spacing["md"]} ${spacing["lg"]}`,
        },
    },
};

/**
 * @function getPropsByVariant
 * This function is used to pass the color scheme, variant and the emotion theme
 */
const getPropsByVariant = ({ variant, colorScheme, theme }) => {
    const colorInPalette = theme.palette[colorScheme];

    const variants = colorInPalette && {
        outline: {
            main: {
                border: `1px solid ${colorInPalette.main}`,
                backgroundColor: theme.palette.common.transparent,
                color: theme.palette.typography.primary,
                "&::placeholder": {
                    color: `${alpha(theme.palette.typography.primary, 0.5)}`,
                },
            },
            error: {
                border: `1px solid ${theme.palette.error.main}`,
                color: theme.palette.error.main,
                "&::placeholder": {
                    color: `${alpha(theme.palette.error.main, 0.5)}`,
                },
            },
        },
        solid: {
            main: {
                border: `1px solid ${colorInPalette.main}`,
                backgroundColor: colorInPalette.main,
                color: colorInPalette.contrastText,
                "&::placeholder": {
                    color: `${alpha(colorInPalette.contrastText, 0.9)}`,
                },
            },
            error: {
                backgroundColor: theme.palette.error.main,
                color: colorInPalette.contrastText,
                border: "none",
            },
        },

        ghost: {
            main: {
                backgroundColor: alpha(colorInPalette.main, 0.2),
                color: colorInPalette.main,
                border: `1px solid ${alpha(colorInPalette.main, 0.5)}`,
                "&::placeholder": {
                    color: `${alpha(colorInPalette.main, 0.7)}`,
                },
            },
            error: {
                backgroundColor: alpha(theme.palette.error.main, 0.2),
                border: `1px solid ${theme.palette.error.main}`,
                color: theme.palette.error.main,
                "&::placeholder": {
                    color: `${alpha(theme.palette.error.main, 0.7)}`,
                },
            },
        },
    };

    return colorInPalette && variants[variant];
};

/**
 * @function StyledInputLabelProps
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
type StyledInputLabelProps = {
    theme?: Theme;
    errorMessage?: string;
} & Partial<InputPropType>;

/**
 * @function StyledInputProps
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
type StyledInputProps = {
    theme?: Theme;
    errorMessage?: string;
    inputLeftChildren?: JSX.Element;
    inputRightChildren?: JSX.Element;
    childWidth?: Property.Width;
} & Partial<InputPropType>;

/**
 * @function StyledInputWrapperProps
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
type StyledInputWrapperProps = {
    overrideStyle?: PropTypes["style"];
} & Partial<InputPropType>;

/**
 * @function useColorVariant
 *  This function is use to provide, theme, colorscheme, variant
 */
const useColorVariant = (theme, variant, colorScheme) => {
    if (isObjectEmpty(theme)) {
        theme = defaultTheme;
    }
    return getPropsByVariant({
        variant,
        colorScheme,
        theme,
    });
};

/**
 * @function EmotionInput
 * This function is used to wrap the Inner Item for style
 */
export const EmotionInput = styled(InputWrapper)(
    ({
        theme,
        variant,
        colorScheme,
        errorMessage,
        inputLeftChildren,
        inputRightChildren,
        iconSpacing,
        size,
        ...props
    }: StyledInputProps) => {
        const fontSizeBySize = InputSizeProps?.input[size]?.fontSize;
        const paddingBySize = InputSizeProps?.input[size]?.padding;
        return {
            padding: InputSizeProps.input.md.padding,
            paddingInlineStart:
                inputLeftChildren && iconSpacing ? iconSpacing : "",
            paddingInlineEnd:
                inputRightChildren && iconSpacing ? iconSpacing : "",
            fontSize: InputSizeProps.input.md.fontSize,
            width: "100%",
            borderRadius: props.borderRadius,
            outline: "none",
            border: theme?.palette?.paper?.border,
            backgroundColor:
                variant === "solid"
                    ? `${theme?.palette?.paper?.background}`
                    : "transparent",
            color: `${theme?.palette?.paper?.text}`,
            "&::placeholder": {
                color: `${alpha(theme?.palette?.paper?.text, 0.7)}`,
            },
            cursor: props.isReadOnly ? "default" : "text",
            pointerEvents: props.disable && "none",
            ...(colorScheme &&
                useColorVariant(theme, variant, colorScheme).main),
            opacity: props.disable ? "0.5" : "1",
            "&:focus": {
                outline: "none",
            },
            ...(errorMessage && {
                border: `1px solid ${theme?.palette?.error?.main}`,
                color: theme?.palette?.error?.main,
                ...useColorVariant(theme, variant, colorScheme)?.error,
            }),
            ...(paddingBySize && { padding: paddingBySize }),
            ...(fontSizeBySize && { fontSize: fontSizeBySize }),
        };
    },
);

/**
 * @function EmotionInputWrapper
 * This function is used to wrap the Inner Input Items for style
 */
export const EmotionInputWrapper = styled.div(
    ({ overrideStyle }: StyledInputWrapperProps) => ({
        position: "relative",
        width: "100%",
        ...overrideStyle,
    }),
);

/**
 * @function EmotionInputIcon
 * This function is used to wrap the Icon Item for style
 */
export const EmotionInputIcon = styled.div((props) => ({
    position: "absolute",
    top: "50%",
    right: "20px",
    transform: "translateY(-50%)",
    width: "20px",
    display: "flex",
}));

/**
 * @function EmotionErrorInput
 * This function is used to wrap the Inner Input Field for style
 */
export const EmotionErrorInput = styled.div((props: StyledInputProps) => ({
    color: props?.theme?.palette.error.main,
    fontSize: InputSizeProps?.label[props.size]?.fontSize,
    marginTop: "5px",
}));

/**
 * @function EmotionInputLabel
 * This function is used to wrap the Label Item for style
 */
export const EmotionInputLabel = styled.label(
    ({ theme, errorMessage, size }: StyledInputLabelProps) => {
        return {
            paddingBottom: "10px",
            fontSize: InputSizeProps?.label[size]?.fontSize,
            display: "inline-flex",
            color:
                errorMessage !== ""
                    ? theme?.palette?.error?.main
                    : theme?.palette?.typography?.primary,
        };
    },
);

/**
 * @function StyledColProps
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
type StyledChildElementProps = {
    iconSpacing?: Property.Width;
} & Partial<InputPropType>;

/**
 * @function EmotionInputLeftElement
 * This function is used to wrap the left child element of input
 */
export const EmotionInputLeftElement = styled.div(
    ({ iconSpacing }: StyledChildElementProps) => {
        return {
            position: "absolute" as Property.Position,
            left: 0,
            top: 0,
            bottom: 0,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            width: iconSpacing,
        };
    },
);

/**
 * @function EmotionInputRightElement
 * This function is used to wrap the right child element of input
 */
export const EmotionInputRightElement = styled.div(
    ({ iconSpacing }: StyledChildElementProps) => {
        return {
            position: "absolute" as Property.Position,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            width: iconSpacing,
        };
    },
);

export const Input = React.forwardRef<
    HTMLInputElement,
    React.PropsWithChildren<InputPropType>
>(
    (
        {
            id,
            errorMessage,
            name,
            value,
            type,
            onChange,
            onKeyUp,
            placeholder,
            isRequired,
            label,
            disable,
            className,
            style,
            size,
            iconSpacing,
            inputLeftChildren,
            inputRightChildren,
            children,
            ...props
        },
        ref,
    ) => {
        return (
            <EmotionInputWrapper
                className={classNames(className)}
                overrideStyle={style}
            >
                <div
                    data-content={errorMessage ? "data-error" : "data-content"}
                >
                    {label && (
                        <EmotionInputLabel
                            size={size}
                            errorMessage={errorMessage}
                        >
                            {label}
                            {`${isRequired ? "*" : ""}`}
                        </EmotionInputLabel>
                    )}
                    <EmotionInputWrapper>
                        {inputLeftChildren && (
                            <EmotionInputLeftElement iconSpacing={iconSpacing}>
                                {inputLeftChildren}
                            </EmotionInputLeftElement>
                        )}
                        <EmotionInput
                            id={id}
                            ref={ref}
                            value={value}
                            name={name}
                            type={type}
                            size={size}
                            placeholder={placeholder}
                            isReadOnly
                            disable={disable}
                            onChange={disable ? undefined : onChange}
                            onKeyUp={disable ? undefined : onKeyUp}
                            isRequired={isRequired}
                            inputRightChildren={inputRightChildren}
                            inputLeftChildren={inputLeftChildren}
                            iconSpacing={iconSpacing}
                            errorMessage={errorMessage}
                            data-input-error={
                                errorMessage !== "" ? true : false
                            }
                            {...props}
                        />
                        {children}
                        {inputRightChildren && (
                            <EmotionInputRightElement iconSpacing={iconSpacing}>
                                {inputRightChildren}
                            </EmotionInputRightElement>
                        )}
                    </EmotionInputWrapper>
                    {errorMessage && (
                        <EmotionErrorInput size={size} data-invalid={true}>
                            {errorMessage}
                        </EmotionErrorInput>
                    )}
                </div>
            </EmotionInputWrapper>
        );
    },
);

/**
 * defaultProps - To define default values for component props
 */
Input.defaultProps = {
    id: "input",
    variant: "solid",
    borderRadius: 4,
    isReadOnly: false,
    disable: false,
    value: "",
    name: "",
    errorMessage: "",
    size: "md",
};
