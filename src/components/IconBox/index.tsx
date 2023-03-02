import * as React from "react";
import { cx as classNames } from "@emotion/css";
import styled from "@emotion/styled";
import { PropTypes } from "../../utils/propType";
import { defaultTheme, Theme } from "../../context/ThemeProvider";
import { isObjectEmpty } from "../../utils/assertion";
import { Tooltip } from "../Tooltip";
import { ToolTipPropType } from "../Tooltip";
import { Box } from "react-feather";

interface IconBoxPropType
    extends Omit<PropTypes, "as">,
        Pick<ToolTipPropType, "label" | "placement"> {
    /**
     * Add custom icon or image in the element.
     * @property {JSX.Element}
     **/
    icon?: JSX.Element;

    /**
     * Provide variations for style: contained - filled layout and  outline -  bordered layout
     * @property {string}
     **/
    variant?: "outline" | "solid";

    /**
     * To define a string that labels the current element
     * @property {string}
     **/
    "aria-label": string;

    /**
     * Rounds the corners of IconBox's outer border edge
     * @property {string}
     **/
    borderRadius?: number;
}

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
                backgroundColor: colorInPalette.main,
                color: colorInPalette.contrastText,
            },
        },
    };

    return variants[variant] || variants.solid;
};
/**
 * @function StyledIconProps
 * This function that takes all props and added the additional props
 */
type StyledIconProps = {
    theme?: Theme;
    overrideStyle?: PropTypes["style"];
} & Partial<IconBoxPropType>;

/**
 * @function StyledIconBox
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledIconBox = ({
    theme,
    disable,
    borderRadius,
    variant,
    colorScheme,
    overrideStyle,
}: StyledIconProps) => {
    if (isObjectEmpty(theme)) {
        theme = defaultTheme;
    }

    const propsByVariant = getPropsByVariant({
        variant,
        theme,
        colorScheme,
    });
    return {
        borderRadius,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: disable ? theme?.palette?.action?.disabledOpacity : 1,
        cursor: disable ? theme?.palette?.action?.cursor : "pointer",
        width: variant && colorScheme && "26px",
        height: variant && colorScheme && "26px",
        ...(propsByVariant && propsByVariant.main),
        ...overrideStyle,
    };
};

/**
 * @function EmotionIconBox
 * This function is used to wrap the component for style
 */
export const EmotionIconBox = styled("div")(StyledIconBox);

export const IconBox = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<IconBoxPropType>
>(
    (
        {
            id,
            title,
            "aria-label": ariaLabel,
            placement,
            label,
            className,
            disable,
            variant,
            icon,

            style,
            onClick,
            ...props
        },
        ref,
    ) => {
        return title && title ? (
            <Tooltip
                className={classNames(className)}
                label={label}
                placement={placement}
                size="sm"
            >
                <EmotionIconBox
                    id={id}
                    role="presentation"
                    onClick={disable ? undefined : onClick}
                    variant={variant}
                    disable={disable}
                    overrideStyle={style}
                    {...props}
                    ref={ref}
                >
                    {icon && icon !== null ? (
                        icon
                    ) : (
                        <Box size="16px" color="#fff" />
                    )}
                </EmotionIconBox>
            </Tooltip>
        ) : (
            <EmotionIconBox
                id={id}
                disable={disable}
                role="presentation"
                ref={ref}
                aria-label={ariaLabel}
                onClick={disable ? undefined : onClick}
                variant={variant}
                overrideStyle={style}
                className={classNames(className)}
                {...props}
            >
                {icon && icon !== null ? (
                    icon
                ) : (
                    <Box size="16px" color="#fff" />
                )}
            </EmotionIconBox>
        );
    },
);

/**
 * defaultProps - To define default values for component props
 */
IconBox.defaultProps = {
    id: "iconBox",
    placement: "top",
    borderRadius: 0,
    disable: false,
    colorScheme: "primary",
};
