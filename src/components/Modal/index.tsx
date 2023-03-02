import * as React from "react";
import { cx as classNames } from "@emotion/css";
import { X } from "react-feather";
import { Property } from '../../utils/types';
import { PropTypes } from "../../utils/propType";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Paper } from "../Paper";
import { BreakPoints } from "../../utils/units";
import { useThemeMode } from "../../context/ThemeProvider";

interface ModalPropType
    extends Omit<
        PropTypes<HTMLDivElement | HTMLButtonElement>,
        "as" | "disable"
    > {
    /**
     * To add Border radius to modal box
     * @property {number}
     **/
    borderRadius?: number;

    /**
     * To add box shaddow effect to the modal box
     * @property {boolean}
     **/
    elevation?: boolean;

    /**
     * Variations for placement of modal along the screen
     * @property {void}
     **/
    position?: Property.ModalPosition;

    /**
     * Additional background color to modal overlay
     * @property {string}
     **/
    overlayColor?: string;

    /**
     * Additional background color to modal box
     * @property {string}
     **/
    backgroundColor?: string;

    /**
     * Icon to close the modal
     * @property {JSX.Element}
     **/
    closeIcon?: JSX.Element | string;

    /**
     * To provide greater z-stack order of element
     * @property {number}
     **/
    zIndex?: number;

    /**
     * To hidebackdrop styling
     * @property {boolean}
     **/
    hideBackdrop?: boolean;

    /**
     * To add sizes for modal
     * @property {string}
     **/
    size?: "sm" | "md" | "lg" | "xl" | "fullscreen";
}

/**
 * @function getPropsByPosition
 * This function is used to pass position variant to modal box
 */
const getPropsByPosition = ({ position }) => {
    const positions = {
        middle: {
            top: "0",
            left: "0",
            minHeight: "calc(100% - (20px * 2))",
            margin: "20px auto",
        },
        topLeft: {
            marginLeft: "15px",
            marginTop: 20,
            marginBottom: 20,
            marginRight: "auto",
        },
        topRight: {
            marginRight: "15px",
            left: "unset",
            marginTop: 20,
            marginBottom: 20,
            marginLeft: "auto",
        },
        bottomLeft: {
            position: "absolute" as Property.Position,
            left: "15px",
            bottom: "15px",
        },
        bottomRight: {
            position: "absolute" as Property.Position,
            right: "15px",
            bottom: "15px",
        },
    };
    return positions[position] || positions.middle;
};
/**
 * @function getPropsBySize
 * This function is used to pass size variant to modal box
 */
const getPropsBySize = ({ size }) => {
    const sizes = {
        sm: {
            maxWidth: "100%",
            [`@media ${BreakPoints.tabletS}`]: {
                maxWidth: "450px",
            },
        },
        md: {
            maxWidth: "90%",
            [`@media ${BreakPoints.mobileL}`]: {
                maxWidth: "450px",
            },
            [`@media ${BreakPoints.tabletS}`]: {
                maxWidth: "600px",
            },
        },
        lg: {
            maxWidth: "90%",
            [`@media ${BreakPoints.mobileL}`]: {
                maxWidth: "450px",
            },
            [`@media ${BreakPoints.tabletS}`]: {
                maxWidth: "600px",
            },
            [`@media ${BreakPoints.laptop}`]: {
                maxWidth: "800px",
            },
        },
        xl: {
            maxWidth: "90%",
            [`@media ${BreakPoints.tabletS}`]: {
                maxWidth: "500",
            },
            [`@media ${BreakPoints.tablet}`]: {
                maxWidth: "800px",
            },
            [`@media ${BreakPoints.laptop}`]: {
                maxWidth: "1040px",
            },
        },
        fullscreen: {
            maxWidth: "100%",
            margin: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
    };
    return sizes[size] || sizes.fullscreen;
};

/**
 * @function StyledModalProps
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
type StyledModalProps = {
    zIndex?: number;
    overrideStyle?: PropTypes["style"];
} & Partial<ModalPropType>;

/**
 * @function StyledModal
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledModal = ({ zIndex, overlayColor }: ModalPropType) => {
    const fadeInFromNone = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
    `;
    return {
        position: "fixed" as Property.Position,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: overlayColor,
        animation: `${fadeInFromNone} 500ms ease-in-out`,
        zIndex,
        overflowY: "auto" as Property.OverflowY,
    };
};

/**
 * @function StyledModalWrapper
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledModalWrapper = ({
    size,
    position,
    overrideStyle,
}: StyledModalProps) => {
    const propsByPosition = getPropsByPosition({
        position,
    });
    const propsBySize = getPropsBySize({
        size,
    });
    return {
        position: "relative" as Property.Position,
        transform: "none",
        width: "100%",
        display: "flex",
        alignItems: "center",
        ...propsByPosition,
        ...propsBySize,
        ...overrideStyle,
    };
};

/**
 * @function StyledModalInner
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledModalInner = ({ borderRadius }: ModalPropType) => {
    return {
        position: "relative" as Property.Position,
        width: "100%",
        flexDirection: "column" as Property.FlexDirection,
        alignItems: "flex-start",
        padding: "15px 20px",
        borderRadius: borderRadius,
    };
};

/**
 * @function StyledModalIcon
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledModalIcon = () => {
    return {
        display: "inline-flex",
        position: "absolute" as Property.Position,
        right: "15px",
        top: "15px",
        cursor: "pointer",
    };
};

/**
 * @function EmotionModal
 * This function is used to wrap the Inner styling
 */
export const EmotionModal = styled("div")(StyledModal);

/**
 * @function EmotionModalInner
 * This function is used to add style for modal box
 */
export const EmotionModalInner = styled(Paper)(StyledModalInner);

/**
 * @function EmotionModalWrapper
 * This function is used to add style for modal box
 */
export const EmotionModalWrapper = styled("div")(StyledModalWrapper);

/**
 * @function EmotionModalIcon
 * This function is used to add style for modal close icon
 */
export const EmotionModalIcon = styled("div")(StyledModalIcon);

export const Modal = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<ModalPropType>
>(
    (
        {
            id,
            children,
            closeIcon,
            className,
            elevation,
            hideBackdrop,
            onClick,
            style,
            zIndex,
            overlayColor,
            position,
            size,
            backgroundColor,
            ...props
        },
        ref,
    ) => {
        React.useEffect(() => {
            const bodyElem = document.querySelector("body");
            if (bodyElem) {
                bodyElem.style.overflowY = "hidden";
            }
            return () => {
                if (bodyElem) {
                    bodyElem.style.overflowY = "";
                }
            };
        }, []);
        const onCloseClick = (e) => {
            const bodyElem = document.querySelector("body");
            if (bodyElem) {
                bodyElem.style.overflowY = "";
            }
            onClick(e);
        };

        const { themeMode } = useThemeMode();
        return (
            <EmotionModal
                id={id}
                overlayColor={overlayColor}
                zIndex={zIndex}
                onClick={
                    hideBackdrop
                        ? (
                              e:
                                  | React.MouseEvent<
                                        HTMLButtonElement,
                                        MouseEvent
                                    >
                                  | React.MouseEvent<
                                        HTMLDivElement,
                                        MouseEvent
                                    >,
                          ) => {
                              /** close modal when outside of modal is clicked*/
                              onCloseClick(e);
                          }
                        : undefined
                }
            >
                <EmotionModalWrapper
                    position={position}
                    size={size}
                    overrideStyle={style}
                    data-wrapper
                >
                    <EmotionModalInner
                        elevation={elevation}
                        {...props}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        backgroundColor={backgroundColor}
                        ref={ref}
                        className={classNames(className)}
                    >
                        {children}

                        <EmotionModalIcon onClick={onCloseClick} data-close>
                            {closeIcon === "" ? (
                                ""
                            ) : closeIcon ? (
                                closeIcon
                            ) : themeMode === "light" ? (
                                <X size="16px" />
                            ) : (
                                <X size="16px" color="#fff" />
                            )}
                        </EmotionModalIcon>
                    </EmotionModalInner>
                </EmotionModalWrapper>
            </EmotionModal>
        );
    },
);

/**
 * defaultProps - To define default values for component props
 */
Modal.defaultProps = {
    id: "modal",
    borderRadius: 3,
    elevation: false,
    position: "middle",
    zIndex: 9999,
    overlayColor: "rgba(0, 0, 0, 0.3)",
    hideBackdrop: true,
    backgroundColor: "",
    children: "Modal Component",
    size: "sm",
};
