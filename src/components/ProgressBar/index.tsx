import React from "react";
import styled from "@emotion/styled";
import { defaultTheme, Theme } from "../../context/ThemeProvider";
import { PropTypes } from "../../utils/propType";
import { cx as classNames } from "@emotion/css";
import { fontSizes } from "../../utils/units";
import { isObjectEmpty } from "../../utils/assertion";

interface ProgressBarPropType
    extends Omit<PropTypes<HTMLProgressElement>, "ref"> {
    /**
     * To set the label for progressBar
     * @property {string | number}
     **/
    label?: string | number;

    /**
     * To set value upto which progressBar vary
     * @property {number}
     **/
    value?: number;

    /**
     * To add custom background color of completed value of progressbar
     * @property {string}
     **/
    secondaryColor?: string;

    /**
     * To add custom background color of the progressbar
     * @property {string}
     **/
    primaryColor?: string;

    /**
     * If true, to indicate the selected and unselected steps
     * @property {boolean}
     **/
    showSteps?: boolean;

    /**
     * To display segements with selected and unselected values
     * @property {array}
     **/
    segments?: [number, string][];

    /**
     * To display selected icon for seleceted segment values
     * @property {string}
     **/
    icon?: string;

    /**
     * 3 types ProgessBar sizes : 'sm - small size view' , 'md - medium size view' and 'lg - large size view
     * @property {string}
     **/
    size?: "sm" | "md" | "lg";
}

/**
 * @object ProgessBarSizeProps
 * This object is used define the sizes of ProgessBar
 */

const ProgessBarSizeProps = {
    text: {
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
    dot: {
        sm: {
            fontSize: fontSizes["sm"],
            width: "35px",
            height: "35px",
            margin: "20px",
        },
        md: {
            fontSize: fontSizes["md"],
            width: "45px",
            height: "45px",
            margin: "25px",
        },
        lg: {
            fontSize: fontSizes["lg"],
            width: "55px",
            height: "55px",
            margin: "30px",
        },
    },
    bar: {
        sm: {
            height: "10px",
        },
        md: {
            height: "12px",
        },
        lg: {
            height: "14px",
        },
    },
    label: {
        sm: {
            fontSize: fontSizes["lg"],
        },
        md: {
            fontSize: fontSizes["xl"],
        },
        lg: {
            fontSize: fontSizes["xxl"],
        },
    },
};

export const EmotionProgressBar = styled("progress", {
    shouldForwardProp: (props: string) => {
        return ![
            "overrideStyle",
            "as",
            "barHeight",
            "secondaryColor",
            "primaryColor",
        ].includes(props);
    },
})(({ secondaryColor, size, primaryColor }: ProgressBarPropType) => {
    const heightBySize = ProgessBarSizeProps?.bar[size]?.height;
    return {
        width: "100%",
        position: "relative",
        alignSelf: "center",
        ...(heightBySize && {
            height: heightBySize,
        }),

        WebkitAppearance: "none",
        "::-webkit-progress-bar": {
            borderRadius: 20,
            backgroundColor: primaryColor,
            ...(heightBySize && {
                height: heightBySize,
            }),
        },
        "::-webkit-progress-value": {
            borderRadius: 20,
            backgroundColor: secondaryColor,
            ...(heightBySize && {
                height: heightBySize,
            }),
        },
    };
});

type StyledContainerProps = {
    overrideStyle?: PropTypes["style"];
} & Partial<ProgressBarPropType>;

const EmotionContainer = styled("div")(
    ({ overrideStyle, size }: StyledContainerProps) => {
        const fontSizeBySize = ProgessBarSizeProps?.text[size]?.fontSize;
        return {
            display: "flex",
            flexDirection: "column",
            position: "relative",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            paddingLeft: "20px",
            paddingRight: "20px",
            fontSize: 14,
            ...(fontSizeBySize && { fontSize: fontSizeBySize }),
            ...overrideStyle,
        };
    },
);

type StyledProgressDotProps = {
    theme?: Theme;
} & Partial<ProgressBarPropType>;

const EmotionProgressDot = styled("div")(
    ({ size, primaryColor, theme }: StyledProgressDotProps) => {
        if (isObjectEmpty(theme)) {
            theme = defaultTheme;
        }
        const fontSizeBySize = ProgessBarSizeProps?.text[size]?.fontSize;
        const heightBySize = ProgessBarSizeProps?.dot[size]?.height;
        const widthBySize = ProgessBarSizeProps?.dot[size]?.width;
        return {
            borderRadius: "50%",
            backgroundSize: `15px`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `center`,
            fontSize: "12px",
            fontWeight: 400,
            color: theme?.palette?.typography?.primary,
            backgroundColor: primaryColor,
            position: "relative",
            ...(fontSizeBySize && { fontSize: fontSizeBySize }),
            ...(widthBySize && {
                width: widthBySize,
            }),
            ...(heightBySize && {
                height: heightBySize,
            }),
        };
    },
);

/**
 * @function EmotionWrapper
 * This function is used to wrap the EmotionProgressBar Component for style
 */
export const EmotionWrapper = styled.div(() => {
    return {
        position: "relative",
        width: "100%",
        display: "flex",
    };
});

/**
 * @function EmotionDotWrapper
 * This function is used to wrap the EmotionProgressDot and EmotionDotLabel for style
 */
export const EmotionDotWrapper = styled.div(() => {
    return {
        display: "flex",
        justifyContent: "space-between",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: 0,
        right: 0,
    };
});

/**
 * @function EmotionDotLabel
 * This function is used to wrap the Label for EmotionDot for style
 */
export const EmotionDotLabel = styled("div")(
    ({ size }: ProgressBarPropType) => {
        const fontSizeBySize = ProgessBarSizeProps?.text[size]?.fontSize;
        const marginSizeBySize = ProgessBarSizeProps?.dot[size]?.margin;
        return {
            position: "absolute",
            top: "100%",
            transform: "translateY(-100%)",
            fontSize: 14,
            marginTop: "20px",
            ...(fontSizeBySize && { fontSize: fontSizeBySize }),
            ...(marginSizeBySize && { marginTop: marginSizeBySize }),
        };
    },
);

/**
 * @function EmotionProgressLabel
 * This function is used to wrap the EmotionProgressLabel for style
 */

type StyledProgressLabelProps = {
    theme?: Theme;
} & Partial<ProgressBarPropType>;

export const EmotionProgressLabel = styled.label(
    ({ size, theme }: StyledProgressLabelProps) => {
        if (isObjectEmpty(theme)) {
            theme = defaultTheme;
        }
        const fontSizeBySize = ProgessBarSizeProps?.label[size]?.fontSize;
        return {
            paddingBottom: "25px",
            display: "inline-flex",
            justifyContent: "center",
            color: theme?.palette?.typography?.primary,
            ...(fontSizeBySize && { fontSize: fontSizeBySize }),
        };
    },
);

export const ProgressBar = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<ProgressBarPropType>
>(
    (
        {
            id,
            children,
            className,
            showSteps,
            label,
            value,
            style,
            secondaryColor,
            primaryColor,
            segments,
            icon,
            size,
            ...props
        },
        ref,
    ) => {
        return (
            <EmotionContainer
                id={id}
                className={classNames(className)}
                ref={ref}
                overrideStyle={style}
                size={size}
            >
                {label && (
                    <EmotionProgressLabel size={size}>
                        {label}
                    </EmotionProgressLabel>
                )}
                <EmotionWrapper>
                    <EmotionProgressBar
                        value={value}
                        max={100}
                        secondaryColor={secondaryColor}
                        primaryColor={primaryColor}
                        size={size}
                        data-progress="data-progress"
                        {...props}
                    />
                    <EmotionDotWrapper>
                        {showSteps &&
                            (segments.length === 0 || segments.length > 1) &&
                            segments.map((_item, index) => {
                                return (
                                    <EmotionProgressDot
                                        key={segments[index][0]}
                                        secondaryColor={secondaryColor}
                                        primaryColor={primaryColor}
                                        icon={icon}
                                        style={{
                                            ...(value === 0
                                                ? value >
                                                      index *
                                                          (100 /
                                                              (segments.length -
                                                                  1)) && {
                                                      backgroundColor:
                                                          secondaryColor,
                                                      backgroundImage: `url(${icon})`,
                                                  }
                                                : value >=
                                                      index *
                                                          (100 /
                                                              (segments.length -
                                                                  1)) && {
                                                      backgroundColor:
                                                          secondaryColor,
                                                      backgroundImage: `url(${icon})`,
                                                  }),
                                        }}
                                        size={size}
                                        data-dot="data-dot"
                                    >
                                        <EmotionDotLabel
                                            size={size}
                                            data-label="data-label"
                                        >
                                            {segments[index][1]}
                                        </EmotionDotLabel>
                                    </EmotionProgressDot>
                                );
                            })}
                    </EmotionDotWrapper>
                </EmotionWrapper>
                {children}
            </EmotionContainer>
        );
    },
);

ProgressBar.defaultProps = {
    value: 70,
    showSteps: true,
    segments: [
        [1, "Step-1"],
        [2, "Step-2"],
        [3, "Step-3"],
    ],
    size: "md",
    primaryColor: "#eee",
    secondaryColor: "#1d78f3",
};
