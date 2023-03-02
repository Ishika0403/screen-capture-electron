import * as React from "react";
import { cx as classNames } from "@emotion/css";
import { Property } from "../../utils/types";
import { PropTypes } from "../../utils/propType";
import styled from "@emotion/styled";
import { alpha } from "../../utils/Theme/colorManipulator";
import { defaultTheme, Theme } from "../../context/ThemeProvider";
import { isObjectEmpty } from "../../utils/assertion";
import { fontSizes, spacing } from "../../utils/units";

interface TextAreaPropType
    extends Omit<
        PropTypes<HTMLTextAreaElement>,
        "as" | "onClick" | "onChange"
    > {
    /**
     * To add the TextArea name
     * @property {string}
     *
     **/
    name?: string;

    /**
     * To add the TextArea Value
     * @property {string}
     **/
    value: string;

    /**
     * Provide caption for the information of field
     * @property {string | JSX.Element}
     *
     **/
    label?: string | JSX.Element;

    /**
     * Provide caption for placeholder inside the textarea
     * @property {string}
     *
     **/
    placeholder?: string;

    /**
     * Restrict the character length
     * @property {number}
     **/
    maxLength?: number;

    /**
     * To define a string that labels the current element
     * @property {string}
     *
     **/
    ariaDescribedby?: string;

    /**
     * Event occurs for change value of an element
     * @property {void}
     *
     **/
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

    /**
     * Variations for resize the textarea:   'horizontal' | 'vertical' | 'none'
     * @property {Property.Resize}
     *
     **/
    resize?: Property.Resize;

    /**
     * Add custom border radius
     * @property {number}
     *
     **/
    borderRadius?: number;

    /**
     * No. of rows for enter the text and fixed length of textarea
     * @property {number}
     *
     **/
    minRows: number;

    /**
     * User can read the text only and can't perform action
     * @property {boolean}
     *
     **/
    isReadOnly?: boolean;

    /**
     * This field must be required
     * @property {boolean}
     *
     **/
    isRequired?: boolean;

    /**
     * Display error message and error styling
     * @property {string}
     **/
    errorMessage?: string;

    /**
     * Textarea variations can be of 3 types: 'solid - filled layout',  'outline - bordered layout', 'ghost - to show faded style layout'
     * @property {string}
     *
     **/
    variant?: "solid" | "outline" | "ghost";

    /**
     * Textarea  sizes can be of 3 types: 'sm - small view of Textarea  size' , 'md - medium view of Textarea  size' and 'lg - large view of Textarea  size
     * @property {string}
     *
     **/
    size?: "sm" | "md" | "lg";
}
/**
 * @object Textarea SizeProps
 * This object is used define the sizes of Textarea
 */

const TextAreaSizeProps = {
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
                    color: theme.palette.typography.primary,
                },
            },
            error: {
                border: `1px solid ${theme.palette.error.main}`,
                color: theme.palette.error.main,
                "&::placeholder": {
                    color: theme.palette.error.main,
                },
            },
        },
        solid: {
            main: {
                border: `1px solid ${colorInPalette.main}`,
                backgroundColor: colorInPalette.main,
                color: colorInPalette.contrastText,
                "&::placeholder": {
                    color: colorInPalette.contrastText,
                },
            },
            error: {
                backgroundColor: theme.palette.error.main,
                color: colorInPalette.contrastText,
                border: "none",
                "&::placeholder": {
                    color: colorInPalette.contrastText,
                },
            },
        },

        ghost: {
            main: {
                backgroundColor: alpha(colorInPalette.main, 0.2),
                color: colorInPalette.main,
                borderColor: alpha(colorInPalette.main, 0.5),
                "&::placeholder": {
                    color: colorInPalette.main,
                },
            },
            error: {
                backgroundColor: alpha(theme.palette.error.main, 0.2),
                borderColor: `1px solid ${theme.palette.error.main}`,
                color: theme.palette.error.main,
                "&::placeholder": {
                    color: theme.palette.error.main,
                },
            },
        },
    };

    return colorInPalette && variants[variant];
};

/**
 * @function StyledTextAreaLabelProps
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
type StyledTextAreaLabelProps = {
    theme?: Theme;
    errorMessage?: string;
} & Partial<TextAreaPropType>;

/**
 * @function StyledTextAreaProps
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */

type StyledTextAreaProps = {
    theme?: Theme;
    errorMessage?: string;
} & Partial<TextAreaPropType>;

/**
 * @function StyledTextAreaProps
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */

type StyledTextAreaWrapperProps = {
    overrideStyle?: PropTypes["style"];
} & Partial<TextAreaPropType>;

/**
 * @function EmotionTextAreaWrapper
 * This function is used to wrap the input element style
 */

export const EmotionTextAreaWrapper = styled.div(
    ({ overrideStyle }: StyledTextAreaWrapperProps) => ({
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        ...overrideStyle,
        "&.reached_limit_error  textarea": {
            borderColor: "#d7322d",
        },
    }),
);

/**
 * @function EmotionTextAreaLabel
 * This function is used to wrap the label for style
 */
export const EmotionTextAreaLabel = styled.label(
    ({ theme, errorMessage, size }: StyledTextAreaLabelProps) => ({
        paddingBottom: "10px",
        fontSize: TextAreaSizeProps.label[size]?.fontSize,
        color:
            errorMessage !== ""
                ? theme?.palette?.error?.main
                : theme?.palette?.typography?.primary,
        display: "inline-flex",
    }),
);

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
 * @function EmotionTextAsrea
 * This function is used to wrap the textArea field for style
 */

export const EmotionTextArea = styled("textarea")(
    ({ theme, variant, colorScheme, size, ...props }: StyledTextAreaProps) => {
        const fontSizeBySize = TextAreaSizeProps?.input[size]?.fontSize;
        const paddingBySize = TextAreaSizeProps?.input[size]?.padding;
        return {
            borderRadius: props.borderRadius,
            fontSize: TextAreaSizeProps.input[size]?.fontSize,
            width: "100%",
            padding: TextAreaSizeProps.input[size]?.padding,
            outline: "none",
            overflowY: "auto",
            minWidth: "100px",
            minHeight: "100px",
            border: theme?.palette?.paper?.border,
            backgroundColor:
                variant === "solid"
                    ? `${theme?.palette?.paper?.background}`
                    : "transparent",
            color: `${theme?.palette?.paper?.text}`,
            "&::placeholder": {
                color: `${theme?.palette?.paper?.text}`,
            },

            resize: props.resize,
            ...(colorScheme &&
                useColorVariant(theme, variant, colorScheme).main),
            ...(props.errorMessage && {
                border: `1px solid ${theme?.palette?.error?.main}`,
                color: theme?.palette?.error?.main,
                "&::placeholder": {
                    color: theme?.palette?.error?.main,
                },
                ...useColorVariant(theme, variant, colorScheme)?.error,
            }),

            "&:read-only": {
                cursor: "text",
                PointerEvent: "none",
            },

            "&:required": {
                cursor: "text",
            },
            "&:disabled": {
                cursor: "not-allowed",
                PointerEvents: "none",
                opacity: 0.5,
            },
            ...(paddingBySize && { padding: paddingBySize }),
            ...(fontSizeBySize && { fontSize: fontSizeBySize }),
        };
    },
);

/**
 * @function EmotionTextAreaError
 * This function is used to wrap the error message for style
 */
export const EmotionTextAreaError = styled.div(
    (props: StyledTextAreaProps) => ({
        color: props?.theme?.palette?.error?.main,
        fontSize: TextAreaSizeProps?.label[props.size]?.fontSize,
        marginTop: "5px",
    }),
);

/**
 * @function EmotionTextAreaInfo
 * This function is used to wrap the Info message for style
 */
export const EmotionTextAreaInfo = styled.div((props: StyledTextAreaProps) => ({
    color: props?.theme?.palette?.common?.black,
    fontSize: "12px",
    marginTop: "5px",
}));

export const TextArea = React.forwardRef<
    HTMLTextAreaElement,
    React.PropsWithChildren<TextAreaPropType>
>(
    (
        {
            id,
            name,
            value,
            minRows,
            onChange,
            maxLength,
            className,
            style,
            disable,
            isReadOnly,
            isRequired,
            ariaDescribedby,
            errorMessage,
            children,
            label,
            size,
            placeholder,
            ...props
        },
        ref,
    ) => {
        React.useEffect(() => {
            if (maxLength && maxLength > 0) {
                const limitCharacter = document.getElementById(
                    `character_length_${id}`,
                );

                if (limitCharacter) {
                    limitCharacter.textContent = `Maximum ${maxLength} characters`;
                }
            }
        }, [maxLength]);
        /**
         * @function onkeyUp
         * @description - onkeyup event occurs when the user releases a key (on the keyboard) and
         * calculate the max character length and show limit for remainning text.
         * @param {Event} e - keyboard event
         */
        const onKeyUp = (e: React.KeyboardEvent) => {
            const { id } = e.target as HTMLTextAreaElement;
            const maxLen = maxLength;
            if (maxLen) {
                const counter =
                    maxLen - (e.target as HTMLTextAreaElement).value.length;
                const remainingText = document.getElementById(
                    `character_length_${id}`,
                );
                if (remainingText) {
                    if (maxLen > 0 && counter === maxLen) {
                        remainingText.textContent = `Maximum ${maxLength} characters`;
                        remainingText.parentElement?.classList.remove(
                            "reached_limit_error",
                        );
                        remainingText.style.color = "";
                    } else if (counter > 0) {
                        remainingText.textContent = `Maximum ${maxLength} characters (${counter} remaining)`;

                        remainingText.parentElement?.classList.remove(
                            "reached_limit_error",
                        );
                        remainingText.style.color = "";
                    } else {
                        if (maxLen === -1) {
                            return;
                        }

                        remainingText.parentElement?.classList.add(
                            "reached_limit_error",
                        );

                        remainingText.textContent = `Maximum limit reached.`;
                        remainingText.style.color = "#d7322d";
                    }
                }
            }
        };

        return (
            <EmotionTextAreaWrapper
                className={classNames(className)}
                overrideStyle={style}
            >
                <EmotionTextAreaWrapper
                    data-content={errorMessage ? "data-error" : "data-content"}
                >
                    {label && (
                        <EmotionTextAreaLabel
                            size={size}
                            errorMessage={errorMessage}
                        >
                            {label}
                            {`${isRequired ? "*" : ""}`}
                        </EmotionTextAreaLabel>
                    )}
                    <EmotionTextArea
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        aria-describedby={ariaDescribedby}
                        value={value}
                        maxLength={maxLength}
                        onChange={disable ? undefined : onChange}
                        disabled={disable}
                        readOnly={isReadOnly}
                        required={isRequired}
                        errorMessage={errorMessage}
                        rows={minRows}
                        size={size}
                        onKeyUp={maxLength ? onKeyUp : undefined}
                        ref={ref}
                        {...props}
                    ></EmotionTextArea>
                    {children}
                </EmotionTextAreaWrapper>
                {maxLength && (
                    <EmotionTextAreaInfo id={`character_length_${id}`} />
                )}
                {errorMessage && (
                    <EmotionTextAreaError data-invalid={true} size={size}>
                        {errorMessage}
                    </EmotionTextAreaError>
                )}
            </EmotionTextAreaWrapper>
        );
    },
);

/**
 * defaultProps - To define default values for component props
 */

TextArea.defaultProps = {
    id: "TextAreaComponent",
    ariaDescribedby: "TextArea description",
    borderRadius: 0,
    name: "",
    variant: "solid",
    isReadOnly: false,
    isRequired: false,
    disable: false,
    placeholder: "Description...",
    errorMessage: "",
    resize: "vertical",
    size: "md",
};
