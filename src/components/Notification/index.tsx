import React from "react";
import styled from "@emotion/styled";
import { defaultTheme, Theme, useThemeMode } from "../../context/ThemeProvider";
import { Property } from "../../utils/types";
import { PropTypes } from "../../utils/propType";
import { isObjectEmpty } from "../../utils/helpers";
import { alpha } from "../../utils/Theme/colorManipulator";
import { cx as classNames } from "@emotion/css";
import { X } from "react-feather";

interface NotificationPropType extends Omit<PropTypes, "as" | "disable"> {
    /**
     * Add border radius in px | %
     * @property {void}
     **/
    borderRadius?: Property.BorderRadius;

    /**
     * Add custom icon before text from outside the component
     * @property {JSX.Element}
     **/
    startIcon?: JSX.Element;

    /**
     * Add custom icon after text from outside the component
     * @property {JSX.Element}
     **/
    endIcon?: JSX.Element;

    /**
     *  Close icon used to dismiss notification
     * @property {JSX.Element}
     **/
    closeIcon?: JSX.Element | string;

    /**
     * Types to align the items
     * @property {void}
     **/
    alignItems?: Property.AlignItem;

    /**
     * Used to distribute extra  space leftover in the cross-axis
     * @property {void}
     **/
    justifyContent: Property.JustifyElemnent;

    /**
     * Variations for notification layout: contained- filled layout,  outline- bordered layout ,ghost - faded layout
     * @property {string}
     **/
    variant: "contained" | "outline" | "ghost";
    /**
     * To provide the spacing between icon and element content.
     * @property {string}
     *
     */
    spaceBetween?: string;
}

const getPropsByVariant = ({ variant, colorScheme, theme }) => {
    const colorInPalette = theme.palette[colorScheme];
    const variants = {
        contained: colorInPalette && {
            main: {
                backgroundColor: `${colorInPalette.main}`,
                border: `1px solid ${colorInPalette.main}`,
                color: colorInPalette.contrastText,
            },
        },
        outline: colorInPalette && {
            main: {
                backgroundColor: ` transparent`,
                border: `1px solid ${colorInPalette.main}`,
                color: colorInPalette.main,
            },
        },
        ghost: {
            main: {
                backgroundColor: alpha(colorInPalette.main, 0.2),
                color: colorInPalette.main,
                border: `1px solid ${alpha(colorInPalette.main, 0.5)}`,
                "&::placeholder": {
                    color: colorInPalette.main,
                },
            },
        },
    };

    return variants[variant];
};

export type StyledNotificationProps = {
    theme?: Theme;
    overrideStyle?: PropTypes["style"];
} & Partial<NotificationPropType>;

/**
 * @function StyledNotification
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledNotification = ({
    alignItems,
    justifyContent,
    variant = "outline",
    borderRadius,
    theme,
    colorScheme,
    overrideStyle,
}: StyledNotificationProps) => {
    if (isObjectEmpty(theme)) {
        theme = defaultTheme;
    }
    const propsByVariant = getPropsByVariant({
        variant,
        colorScheme,
        theme,
    });
    return {
        alignItems,
        justifyContent,
        borderRadius,
        padding: 15,
        position: "relative" as Property.Position,
        display: "flex",
        ...(propsByVariant && propsByVariant.main),
        ...overrideStyle,
    };
};

/**
 * Constant used for declaration for direction of margin to image
 **/
enum MarginDirection {
    left = "Left",
    right = "Right",
}

/**
 * @function StyledNotificationLeftImage
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledNotificationImage = ({
    marginSide,
    spaceBetween,
}: {
    marginSide: MarginDirection;
    spaceBetween: string;
}) => {
    return {
        margin: 0,
        [`margin${marginSide}`]: spaceBetween || 10,
        display: "inline-flex",
        alignSelf: "center",
    };
};

/**
 * @function EmotionNotificationImage
 * This function is used to wrap the component style for Image
 */
export const EmotionNotificationImage = styled("span")(StyledNotificationImage);

/**
 * it returns icon as jsx element
 *
 **/
const getNotificationImage = (
    icon: JSX.Element,
    marginSide: MarginDirection,
    spaceBetween: string,
): JSX.Element => (
    <EmotionNotificationImage
        marginSide={marginSide}
        spaceBetween={spaceBetween}
    >
        {icon}
    </EmotionNotificationImage>
);

/**
 * @function StyledNotificationIcon
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledNotificationIcon = () => {
    return {
        display: "inline-flex",
        position: "absolute" as Property.Position,
        right: "5px",
        top: "5px",
        cursor: "pointer",
    };
};

/**
 * @function EmotionNotification
 * This function is used to wrap the component style for Notification
 */
export const EmotionNotification = styled("div")(StyledNotification);

/**
 * @function EmotionNotificationIcon
 * This function is used to add style for modal close icon
 */
export const EmotionNotificationIcon = styled("div")(StyledNotificationIcon);

/**
 * @function Notification
 * This function is used to create Notification Component in which we wrap EmotionNotification
 */
export const Notification = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<NotificationPropType>
>(
    (
        {
            children,
            startIcon,
            endIcon,
            closeIcon,
            className,
            style,
            onClick,
            spaceBetween,
            ...props
        },
        ref,
    ) => {
        const { themeMode } = useThemeMode();
        return (
            <EmotionNotification
                className={classNames(className)}
                ref={ref}
                {...props}
                spaceBetween={spaceBetween}
                overrideStyle={style}
            >
                {startIcon &&
                    getNotificationImage(
                        startIcon,
                        MarginDirection.right,
                        spaceBetween,
                    )}
                {children}
                {endIcon &&
                    getNotificationImage(
                        endIcon,
                        MarginDirection.left,
                        spaceBetween,
                    )}

                <EmotionNotificationIcon onClick={onClick} data-close>
                    {closeIcon === "" ? (
                        ""
                    ) : closeIcon ? (
                        closeIcon
                    ) : themeMode === "light" ? (
                        <X size="16px" />
                    ) : (
                        <X size="16px" color="#fff" />
                    )}
                </EmotionNotificationIcon>
            </EmotionNotification>
        );
    },
);

/**
 * defaultProps - To define default values for component props
 */
Notification.defaultProps = {
    variant: "outline",
    justifyContent: "flex-start",
    alignItems: "center",
    colorScheme: "primary",
    borderRadius: 5,
    id: "notification_component",
};
