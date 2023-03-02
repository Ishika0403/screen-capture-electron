import React, { useState } from "react";
import styled from "@emotion/styled";
import { usePopper } from "react-popper";
import type { Placement } from "@popperjs/core";
import { PropTypes } from "../../utils/propType";
import { Theme, defaultTheme } from "../../context/ThemeProvider";
import { isObjectEmpty } from "../../utils/helpers";
import { cx as classNames } from "@emotion/css";
import { spacing, fontSizes } from "../../utils/units";

export interface ToolTipPropType extends PropTypes {
    /**
     * To represent caption of the tooltip element.
     * @property {string}
     **/
    label?: string;

    /**
     * To provide position to the Tooltip
     * @property {string}
     **/
    placement?: Placement;

    /**
     * 3 types of sizes: 'sm - small size view' , 'md - medium size view' and 'lg - large size view
     * @property {string}
     **/
    size?: "sm" | "md" | "lg";

    /**
     * If true, tooltip shows by default.
     * @property {boolean}
     **/
    show?: boolean;

    /**
     * to show arrow for tooltip
     * @property {boolean}
     **/
    arrow?: boolean;

    /**
     * To provide custom Color to arrow bordor of Tooltip
     * @property {string}
     **/
    borderColor?: string;
}

/**
 * @object tootipSizeProps
 * This object is used to define the sizes of tooltip
 */

const tooltipSizeProps = {
    sm: {
        fontSize: "12px",
        padding: `${spacing["xxs"]} ${spacing["sm"]}`,
    },
    md: {
        fontSize: fontSizes["sm"],
        padding: `${spacing["xs"]} ${spacing["md"]}`,
    },
    lg: {
        fontSize: fontSizes["md"],
        padding: `${spacing["sm"]} ${spacing["lg"]}`,
    },
};

/**
 * @function EmotionTooltip
 * This function is used define the style of EmotionTooltip Component
 */

const EmotionTooltip = styled("div")(
    ({
        overrideStyle,
        size,
        theme,
        colorScheme,
        borderColor,
    }: {
        overrideStyle: PropTypes["style"];
        className: PropTypes["className"];
        size: ToolTipPropType["size"];
        colorScheme: PropTypes["colorScheme"];
        theme?: Theme;
        show?: ToolTipPropType["show"];
        arrow?: ToolTipPropType["arrow"];
        borderColor?: ToolTipPropType["borderColor"];
    }) => {
        const paddingBySize = tooltipSizeProps[size]?.padding;
        if (isObjectEmpty(theme)) {
            theme = defaultTheme;
        }
        return {
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            borderRadius: "5px",
            padding: tooltipSizeProps.md.padding,
            fontSize: tooltipSizeProps.md.fontSize,
            border: "1px solid grey",
            textAlign: "center",
            zIndex: 9999,
            position: "absolute",
            backgroundColor: colorScheme
                ? theme?.palette[colorScheme]?.main
                : theme?.palette?.paper?.background,
            color: colorScheme
                ? theme?.palette[colorScheme]?.contrastText
                : theme?.palette?.paper?.text,
            ...(paddingBySize && { padding: paddingBySize }),

            ...overrideStyle,
            ".arrow": {
                position: "absolute",
                width: "8px",
                height: "8px",
                background: "inherit",
                visibility: "hidden",

                "&:after": {
                    content: '""',
                    transform: "rotate(45deg)",
                    position: "absolute",
                    width: "8px",
                    height: "8px",
                    background: "inherit",
                    visibility: "visible",
                },
            },
            " &[data-popper-placement^='top'] > .arrow ": {
                bottom: "-4px",
                "&:after": {
                    borderBottom: borderColor
                        ? `1px solid ${borderColor}`
                        : "1px solid grey",
                    borderRight: borderColor
                        ? `1px solid ${borderColor}`
                        : "1px solid grey",
                },
            },
            " &[data-popper-placement^='bottom'] > .arrow ": {
                top: "-5px",
                "&:after": {
                    borderTop: borderColor
                        ? `1px solid ${borderColor}`
                        : "1px solid grey",
                    borderLeft: borderColor
                        ? `1px solid ${borderColor}`
                        : "1px solid grey",
                },
            },
            " &[data-popper-placement^='left'] > .arrow ": {
                right: "0px",
                "&:after": {
                    borderTop: borderColor
                        ? `1px solid ${borderColor}`
                        : "1px solid grey",
                    borderRight: borderColor
                        ? `1px solid ${borderColor}`
                        : "1px solid grey",
                },
            },
            " &[data-popper-placement^='right'] > .arrow ": {
                left: "-9px",
                "&:after": {
                    borderBottom: borderColor
                        ? `1px solid ${borderColor}`
                        : "1px solid grey",
                    borderLeft: borderColor
                        ? `1px solid ${borderColor}`
                        : "1px solid grey",
                },
            },
        };
    },
);

const EmotionTooltipLabel = styled("p")(
    ({ size }: { size: ToolTipPropType["size"] }) => {
        const fontSizeBySize = tooltipSizeProps[size]?.fontSize;
        return {
            margin: 0,
            ...(fontSizeBySize && { fontSize: fontSizeBySize }),
        };
    },
);

/**Tooltip Component */
export const Tooltip = React.forwardRef<HTMLDivElement, ToolTipPropType>(
    (
        {
            id,
            className,
            colorScheme,
            style,
            children,
            label,
            placement,
            size,
            show,
            borderColor,
            arrow,
            ...props
        },
        ref,
    ) => {
        const [popperRef, setPopperRef] = useState(null);
        const [targetElement, setTargetElement] = useState(null);
        const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>(null);
        const [isVisible, setIsVisible] = useState(show);
        const { styles, attributes } = usePopper(targetElement, popperRef, {
            placement,
            modifiers: [
                {
                    name: "arrow",
                    options: {
                        element: arrowRef,
                    },
                },
                {
                    name: "offset",
                    options: {
                        offset: [0, 10],
                    },
                },
            ],
        });

        return (
            <>
                <span
                    ref={setTargetElement}
                    onMouseEnter={() => !show && setIsVisible(true)}
                    onMouseLeave={() => !show && setIsVisible(false)}
                >
                    {children}
                </span>
                {isVisible && (
                    <EmotionTooltip
                        id={id}
                        ref={(r) => {
                            setPopperRef(r);
                            if (ref) {
                                if (typeof ref === "function") ref(r);
                                else {
                                    ref.current = r;
                                }
                            }
                        }}
                        className={classNames(className)}
                        colorScheme={colorScheme}
                        size={size}
                        show={show}
                        borderColor={borderColor}
                        arrow={arrow}
                        style={styles.popper}
                        {...attributes.popper}
                        {...props}
                        overrideStyle={style}
                    >
                        {arrow && (
                            <div
                                data-popper-arrow
                                ref={setArrowRef}
                                style={styles.arrow}
                                className="arrow"
                            ></div>
                        )}

                        <EmotionTooltipLabel size={size}>
                            {label}
                        </EmotionTooltipLabel>
                    </EmotionTooltip>
                )}
            </>
        );
    },
);

/**
 * defaultProps - To define default values for component props
 */
Tooltip.defaultProps = {
    colorScheme: "primary",
    size: "md",
    placement: "right",
    label: "",
    show: false,
};
