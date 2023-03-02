import * as React from "react";
import { cx as classNames } from "@emotion/css";
import styled from "@emotion/styled";
import { PropTypes } from "../../utils/propType";
import { isObjectEmpty } from "../../utils/helpers";
import { defaultTheme, Theme } from "../../context/ThemeProvider";
import { Property, FormControlOptions } from "../../utils/types";
import { InputPropType as inputType, InputWrapper } from "../InputWrapper";
import { Text } from "../Text";
import { fontSizes } from "../../utils/units";

interface CheckBoxPropType
    extends Omit<inputType<"checkbox">, "icon">,
        Pick<
            PropTypes<HTMLInputElement>,
            "colorScheme" | "disable" | "className" | "style"
        > {
    /**
     * To represent caption of checkbox element.
     * @property {string}
     *
     **/
    label?: string;

    /**
     * If true, set the element checked and add icon for checked item
     * @property {boolean}
     *
     **/
    checked?: boolean;

    /**
     * Set default state as checked
     * @property {boolean}
     *
     **/
    defaultChecked?: boolean;

    /**
     * Add size to checked icon in px | %
     * @property {string}
     *
     **/
    iconSize?: string;

    /**
     * 3 types of Checkbox sizes : 'sm - small size view' , 'md - medium size view' and 'lg - large size view.
     * @property
     *
     **/

    size?: "sm" | "md" | "lg";

    /**
     * Add space between the checkbox and label in px | %
     * @property
     *
     **/
    spaceBetween?: Property.Margin;

    /**
     * To show error for checkbox
     * @property {boolean}
     *
     **/
    error?: boolean;

    /**
     * To show label in left or right direction
     * @property
     *
     **/
    direction?: Property.DisplayDirection;

    /**
     * Rounds the corners of CheckBox's outer border edge
     * @property {number}
     *
     **/
    borderRadius?: number;

    /**
     * Add Icon as a background image
     * @property {string}
     *
     **/
    icon?: string;
}
export type StyledInputBoxProps = {
    theme?: Theme;
    isRequired?: boolean;
} & Partial<CheckBoxPropType>;

export type StyledCheckboxInputProps = {
    theme?: Theme;

    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<Partial<CheckBoxPropType>, "onChange">;

type CheckboxProps = CheckBoxPropType & FormControlOptions;

/**
 * @object  CheckboxSizeProps
 * This object is used to define the sizes of Checkbox size
 */

type StyledCheckboxProps = {
    theme?: Theme;
};

const CheckboxSizeProps = {
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
            width: "14px",
            height: "14px",
            backgroundSize: "6px",
        },
        md: {
            width: "16px",
            height: "16px",
            backgroundSize: "8px",
        },
        lg: {
            width: "18px",
            height: "18px",
            backgroundSize: "10px",
        },
    },
};

/**
 * @function getPropsByVariant
 * This function is used to pass the color scheme, variant and the emotion theme
 */

const getPropsByVariant = ({ variant, colorScheme, theme, ownerState }) => {
    const colorInPalette = theme.palette[colorScheme];
    const variants = {
        outline: colorInPalette && {
            main: {
                borderColor: colorInPalette.main,
                backgroundColor: theme.palette.common.transparent,
            },
        },

        solid: colorInPalette && {
            main: {
                borderColor: colorInPalette.main,
                ...(ownerState.checked && {
                    backgroundColor: colorInPalette.main,
                }),
            },
        },
    };
    return variants[variant] || variants.solid;
};

const StyledCheckBoxContainer = ({ overrideStyle }) => {
    /**
     * @function StyledCheckBoxContainer
     * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
     */
    return {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        ...overrideStyle,
    };
};

/**
 * @function EmotionCheckboxError
 * This function is used to wrap the error message for style
 */
const EmotionCheckboxError = styled.div((props: StyledCheckboxProps) => ({
    color: props?.theme?.palette?.error?.main,
    fontSize: "14px",
    lineHeight: "10px",
    marginTop: "5px",
}));

/**
 * StyledLabelWraper component
 */

const StyledLabelWraper = () => {
    return {
        display: "flex",
        alignItems: "center",
    };
};

/**
 * StyledLabel component
 */

const StyledLabel = ({ size, spaceBetween, direction }) => {
    return {
        fontSize: CheckboxSizeProps.label[size]?.fontSize,
        lineHeight: CheckboxSizeProps.label[size]?.fontSize,
        flexWrap: "wrap" as Property.FlexWrap,
        display: "inline-flex",
        ...(direction === "rtl"
            ? { marginLeft: spaceBetween }
            : { marginRight: spaceBetween }),
    };
};

/**
 * StyledCheckboxInput component
 */

const StyledCheckboxInput = ({
    theme,
    colorScheme,
    checked,
}: StyledCheckboxInputProps) => {
    if (isObjectEmpty(theme)) {
        theme = defaultTheme;
    }
    const colorInPalette = theme?.palette[colorScheme];
    return {
        display: "none",
        ...(checked && {
            backgroundRepeat: " no-repeat",
            backgroundSize: "6px",
            backgroundPosition: "center",
            backgroundColor: colorInPalette?.main,
            borderColor: colorInPalette?.main,
        }),
    };
};

/**
 *  StyledInputBox component
 */
const StyledInputBox = ({
    theme,
    checked,
    error,
    isRequired,
    borderRadius,
    iconSize,
    icon,
    variant,
    colorScheme,
    size,
    disable,
}: StyledInputBoxProps) => {
    if (isObjectEmpty(theme)) {
        theme = defaultTheme;
    }
    const ownerState = { checked };
    const propsByVariant = getPropsByVariant({
        variant,
        theme,
        colorScheme,
        ownerState,
    });

    return {
        width: "16px",
        height: "16px",
        cursor: "pointer",
        borderStyle: "solid",
        borderWidth: "1px",
        display: "inline-flex",
        flexShrink: 0,

        backgroundImage: checked ? `url(${icon})` : "",
        borderRadius: borderRadius,
        backgroundSize: iconSize || 8,
        backgroundRepeat: "no-repeat",
        ...(propsByVariant && propsByVariant.main),
        ...CheckboxSizeProps.input[size],
        ...(checked && {
            backgroundPosition: "center",
        }),
        ...(disable && {
            opacity: 0.6,
            borderColor: theme?.palette?.action?.disabled,
            pointerEvents: "none",
        }),
        ...(error && {
            borderColor: theme?.palette?.error?.main,
        }),
        ...(isRequired && {
            borderColor: theme?.palette?.error?.main,
            backgroundColor: theme?.palette?.error?.main,
        }),
    };
};

/**
 * EmotionCheckboxLabel component
 */

const EmotionCheckboxLabel = styled("label")(
    ({ direction }: { direction: Property.DisplayDirection }) => ({
        display: "flex",
        alignItems: "center",
        flexDirection: direction === "ltr" ? "row-reverse" : "row",
        position: "relative",
    }),
);
/**
 * @function EmotionCheckboxInput
 * This function is used to style input of checkbox
 */
const EmotionCheckboxInput = styled(InputWrapper)(StyledCheckboxInput);

/**
 * @function EmotionStyledCheckBoxContainer
 * This function is used to style container of checkbox
 */
const EmotionStyledCheckBoxContainer = styled("div")(StyledCheckBoxContainer);
/**
 * @function EmotionStyledLabelWrapper
 * This function is used to style label wrapper
 */
const EmotionStyledLabelWrapper = styled("div")(StyledLabelWraper);

/**
 * @function EmotionStyledLabel
 * This function is used to style for label
 */
const EmotionStyledLabel = styled(Text)(StyledLabel);

/**
 * @function EmotionStyledInputBox
 * This function is used to style input box(checkbox UI)
 */
const EmotionStyledInputBox = styled("div")(StyledInputBox);

/**
 * Checkbox component
 */
export const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
    (
        {
            id,
            name,
            value,
            className,
            disable,
            checked,
            size,
            isReadOnly,
            colorScheme,
            onChange,
            label,
            style,
            direction,
            spaceBetween,
            defaultChecked,
            variant,
            errorMessage,
            ...props
        },
        ref,
    ) => {
        const [isLocalChecked, setIsLocalChecked] = React.useState(
            checked || defaultChecked || false,
        );

        /**
         * @function onCheck
         * this make checkbox uncontrolled
         */
        const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (disable || isReadOnly) return;
            const { checked: localChecked } = e.target;
            onChange && onChange(e);
            checked === undefined && setIsLocalChecked(localChecked);
        };
        const isChecked = checked === undefined ? isLocalChecked : checked;

        return (
            <EmotionStyledCheckBoxContainer
                ref={ref}
                className={classNames(className)}
                overrideStyle={style}
            >
                <EmotionStyledLabelWrapper>
                    <EmotionCheckboxLabel htmlFor={id} direction={direction}>
                        <EmotionCheckboxInput
                            aria-checked={isChecked}
                            type="checkbox"
                            id={`${id}`}
                            name={name}
                            value={value}
                            checked={isChecked}
                            colorScheme={colorScheme}
                            onChange={onCheck}
                        />

                        <EmotionStyledInputBox
                            data-checked={
                                isChecked ? "data-checked" : "data-unchecked"
                            }
                            size={size}
                            variant={variant}
                            checked={isChecked}
                            isReadOnly={isReadOnly}
                            disable={disable}
                            colorScheme={colorScheme}
                            role="checkbox"
                            {...props}
                        />

                        {label && (
                            <EmotionStyledLabel
                                as="span"
                                size={size}
                                direction={direction}
                                spaceBetween={spaceBetween}
                            >
                                {label}
                            </EmotionStyledLabel>
                        )}
                    </EmotionCheckboxLabel>
                </EmotionStyledLabelWrapper>
                {errorMessage && (
                    <EmotionCheckboxError data-invalid={true}>
                        {errorMessage}
                    </EmotionCheckboxError>
                )}
            </EmotionStyledCheckBoxContainer>
        );
    },
);

/**
 * defaultProps - To define default values for component props
 */

Checkbox.defaultProps = {
    spaceBetween: "5px",
    error: false,
    variant: "outline",
    defaultChecked: false,
    colorScheme: "primary",
    direction: "rtl",
    borderRadius: 3,
};
