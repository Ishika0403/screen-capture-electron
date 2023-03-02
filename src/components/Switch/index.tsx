import * as React from "react";
import { cx as classNames } from "@emotion/css";
import { PropTypes } from "../../utils/propType";
import { Property } from "../../utils/types";
import styled from "@emotion/styled";
import { defaultTheme, Theme } from "../../context/ThemeProvider";
import { fontSizes } from "../../utils/units";
import { isObjectEmpty } from "../../utils/helpers";
import { Text } from "../Text";

interface SwitchPropType extends Omit<PropTypes, "as"> {
    /**
     * To add left side label
     * @property {string}
     *
     **/
    leftLabel?: string;

    /**
     * To add right side label
     * @property {string}
     *
     **/
    rightLabel?: string;

    /**
     * To add custom Style of switch
     * @property
     *
     **/
    styleSwitch?: PropTypes["style"];

    /**
     * To add custom style of Toggle
     * @property
     *
     **/
    styleToggle?: PropTypes["style"];

    /** To add toggle functionality in switch **/
    toggled?: boolean;

    /**
     * Size of switch component
     * @property {string}
     *
     **/
    size?: "sm" | "md" | "lg";

    /**
     * Variants of Switch Component
     * @property {string}
     *
     **/
    variant?: "solid" | "outline";

    /**
     * Space between titles and switch element.
     * @property {string}
     *
     **/
    spaceBetween?: string;

    /**
     * To add custom radius to switch ball
     * @property {string}
     *
     **/
    ballRadius?: string;

    /**
     * To add active color to switch
     * @property {string}
     *
     **/
    activeColor?: string;

    /**
     * To add inactive color to switch
     * @property {string}
     *
     **/
    inactiveColor?: string;

    /**
     * To add border radius on the element.
     * @property {string}
     *
     **/
    borderRadius?: string;

    /**
     * To add styling with custom class to child element
     * @property {string}
     *
     **/
    classesChild?: string;

    /**
     * To paasing default state of component
     * @property {boolean}
     *
     **/
    defaultToggled?: boolean;

    /**
     * To show title in left or right direction
     * @property
     *
     **/
    direction?: Property.DisplayDirection;
}

/**
 * @object SwitchSizeProps
 * This object is used define the sizes of Checkbox size
 */
const SwitchSizeProps = {
    Switch: {
        sm: {
            width: "28px",

            height: "16px",
        },

        md: {
            width: "32px",

            height: "18px",
        },

        lg: {
            width: "38px",

            height: "20px",
        },
    },

    SwitchToggle: {
        sm: {
            width: 10,

            height: 10,
        },

        md: {
            width: 12,

            height: 12,
        },

        lg: {
            width: 16,

            height: 16,
        },
    },
    Switchlabel: {
        sm: {
            fontSize: fontSizes["xs"],
        },
        md: {
            fontSize: fontSizes["sm"],
        },
        lg: {
            fontSize: fontSizes["md"],
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
                border: `1px solid  ${colorInPalette.main}`,
                backgroundColor: colorInPalette.main,
                color: theme.palette.common.white,
            },
        },
    };

    return variants[variant] || variants.solid;
};

/**
 * @function getPropsByVariantBowl
 * This function is used to pass the color scheme, variant and the emotion theme
 */
const getPropsByVariantBowl = ({ variant, colorScheme, theme }) => {
    const colorInPalette = theme.palette[colorScheme];
    const variants = {
        outline: colorInPalette && {
            main: {
                border: `1px solid ${colorInPalette.main}`,
                backgroundColor: theme.palette.common.transparent,
            },
            inActive: {
                backgroundColor: theme.palette.common.transparent,
                border: `1px solid ${theme.palette.action.inActive}`,
            },
        },

        solid: colorInPalette && {
            main: {
                border: `1px solid ${theme.palette.common.white}`,
                backgroundColor: theme.palette.common.white,
            },
        },
    };

    return variants[variant] || variants.solid;
};

/* Additional style props */
type StyledMainProps = {
    overrideStyle?: PropTypes["style"];
    theme?: Theme;
} & Partial<SwitchPropType>;

/*** Switch Main Container  ****/

const EmotionMainDiv = styled("div")(
    ({
        colorScheme,
        variant,
        theme,
        borderRadius,
        direction,
        overrideStyle,
    }: StyledMainProps) => {
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
            display: "flex",
            alignItems: "center",
            width: "max-content",
            flexDirection: direction === "ltr" ? "row-reverse" : "row",
            ...(propsByVariant && propsByVariant.main),

            ...overrideStyle,
        };
    },
);

/* Additional style props */
type StyledToggleProps = {
    overrideStyle?: PropTypes["style"];
    theme?: Theme;
} & Partial<SwitchPropType>;

/**
 * StyledSwitchWrapper Component
 */

const StyledSwitchWrapper = () => {
    return {
        flexShrink: 0,
        display: "inline-flex",
    };
};

/**
 * @function EmotionStyledSwitchWrapper
 * This function is used to style for title
 */
const EmotionStyledSwitchWrapper = styled("div")(StyledSwitchWrapper);

/* Emotion Toggle */
const EmotionToggle = styled("div")(
    ({
        toggled,
        ballRadius,
        size,
        overrideStyle,
        theme,
        variant,
        colorScheme,
    }: StyledToggleProps) => {
        if (isObjectEmpty(theme)) {
            theme = defaultTheme;
        }

        const propsByVariant = getPropsByVariantBowl({
            variant,
            theme,
            colorScheme,
        });

        const toggleSize = SwitchSizeProps.SwitchToggle[size];
        const leftSize = toggleSize.width + 2;
        return {
            width: "20px",
            height: "20px",
            background: "#fff",
            border: "1px solid #ddd",
            position: "absolute" as Property.Position,
            left: toggled ? `calc(100% - ${leftSize}px)` : "2px",
            borderRadius: ballRadius || "50%",
            top: "50%",
            transform: "translateY(-50%)",
            transition: ".5s ease",

            ...(propsByVariant &&
                (toggled ? propsByVariant.main : propsByVariant.inActive)),
            ...SwitchSizeProps.SwitchToggle[size],
            ...overrideStyle,
        };
    },
);

/* Type Of Emotion switch */
type StyledSwitchProps = {
    theme?: Theme;
    overrideStyle?: PropTypes["style"];
} & Partial<SwitchPropType>;

/**
 * @MarginDirection Constant used for declaration of margin to left/right label
 **/
enum MarginDirection {
    left = "Left",
    right = "Right",
}
/**
 * @function StyledTagImage
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledTitle = ({
    size,
    spaceBetween,
    marginSide,
}: {
    marginSide: MarginDirection;
} & StyledSwitchProps) => {
    return {
        fontSize: "16px",
        lineHeight: "16px",
        ...SwitchSizeProps.Switchlabel[size],
        margin: 0,
        [`margin${marginSide}`]: spaceBetween,
    };
};
/**
 * @function EmotionStyledTitle
 * This function is used to style for title
 */
const EmotionStyledTitle = styled(Text)(StyledTitle);

/**
 *
 * @param label
 * @returns JSX.Element
 * @description Take label for switch title and return label for left and right position
 */
const getSwitchLabel = (
    label: string,
    marginSide: MarginDirection,
    spaceBetween: string,
): JSX.Element => (
    <EmotionStyledTitle
        as="label"
        spaceBetween={spaceBetween}
        marginSide={marginSide}
    >
        {label}
    </EmotionStyledTitle>
);

/**
 * @function EmotionSwitch
 * This function is used to style switch
 */
const EmotionSwitch = styled("div")(
    ({
        theme,
        variant,
        toggled,
        colorScheme,
        activeColor,
        inactiveColor,
        borderRadius,
        size,
        overrideStyle,
        disable,
    }: StyledSwitchProps) => {
        const propsByVariant = getPropsByVariant({
            variant,
            theme,
            colorScheme,
        });

        return {
            display: "inline-block",
            verticalAlign: "middle",
            width: "52px",
            height: "30px",
            backgroundColor: `${
                toggled
                    ? activeColor || propsByVariant.main.backgroundColor
                    : inactiveColor ||
                      (variant === "solid" && theme?.palette?.action?.inActive)
            }`,
            position: `relative` as Property.Position,
            borderRadius: borderRadius,
            cursor: "pointer",
            border: toggled
                ? (activeColor && `1px solid ${activeColor}`) ||
                  propsByVariant.main.border
                : (inactiveColor && `1px solid ${inactiveColor}`) ||
                  `1px solid ${theme?.palette?.action?.inActive} `,
            ...(disable && {
                opacity: 0.6,
                pointerEvents: "none",
            }),
            ...SwitchSizeProps.Switch[size],

            ...overrideStyle,
        };
    },
);

/* Switch Copmonent */
export const Switch = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<SwitchPropType>
>(
    (
        {
            onClick,
            disable,
            ballRadius,
            borderRadius,
            className,
            activeColor,
            inactiveColor,
            style,
            styleSwitch,
            styleToggle,
            classesChild,
            toggled,
            defaultToggled,
            leftLabel,
            rightLabel,
            size,
            variant,
            colorScheme,
            spaceBetween,
            ...props
        },
        ref,
    ) => {
        const [isLocalSwitchChecked, setIsLocalSwitchChecked] = React.useState(
            toggled || defaultToggled || false,
        );

        /**
         * @function onToggle
         * this make switch uncontrolled
         */
        const onToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            onClick && onClick(e);
            toggled === undefined &&
                setIsLocalSwitchChecked(!isLocalSwitchChecked);
        };

        React.useEffect(()=>{
            setIsLocalSwitchChecked(defaultToggled)
        }, [defaultToggled])
        return (
            <EmotionMainDiv
                {...props}
                overrideStyle={style}
                className={classNames(className)}
                ref={ref}
            >
                {leftLabel &&
                    getSwitchLabel(
                        leftLabel,
                        MarginDirection.right,
                        spaceBetween,
                    )}
                <EmotionStyledSwitchWrapper>
                    <EmotionSwitch
                        size={size}
                        variant={variant}
                        disable={disable}
                        colorScheme={colorScheme}
                        toggled={isLocalSwitchChecked}
                        activeColor={activeColor}
                        inactiveColor={inactiveColor}
                        onClick={!disable ? onToggle : undefined}
                        aria-checked={isLocalSwitchChecked}
                        borderRadius={borderRadius}
                        overrideStyle={styleSwitch}
                        className={classNames(classesChild)}
                    >
                        <EmotionToggle
                            colorScheme={colorScheme}
                            variant={variant}
                            size={size}
                            role="toggle"
                            toggled={isLocalSwitchChecked}
                            data-toggled-checked={defaultToggled}
                            ballRadius={ballRadius}
                            overrideStyle={styleToggle}
                        />
                    </EmotionSwitch>
                </EmotionStyledSwitchWrapper>
                {rightLabel &&
                    getSwitchLabel(
                        rightLabel,
                        MarginDirection.left,
                        spaceBetween,
                    )}
            </EmotionMainDiv>
        );
    },
);

/*** Default props for switch component ****/

Switch.defaultProps = {
    variant: "solid",
    size: "md",
    borderRadius: "20px",
    defaultToggled: false,
    direction: "rtl",
    spaceBetween: "5px",
    colorScheme: "primary",
};
