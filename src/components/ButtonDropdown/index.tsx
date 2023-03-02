import * as React from "react";
import { cx as classNames } from "@emotion/css";
import { StyledButtonProps, Button } from "../Button";
import styled from "@emotion/styled";
import { Theme } from "../../context/ThemeProvider";
import { useOnClickOutside } from "../../utils/hooks/useOnOutsideClick";
import { PaperPropType, Paper } from "../Paper";
import { ChevronUp, ChevronDown } from "react-feather";
import { PropTypes } from "../../utils/propType";
interface Position {
    vertical: "bottom" | "top";
    horizontal: "right" | "left";
}
export interface ButtonDropdownPropType
    extends StyledButtonProps<React.ElementType> {
    /**
     * Event on Button Toogle
     * @property {void}
     *
     **/
    onButtonToggle?: (on: boolean) => void;

    /**
     * To disable the action and styling of element.
     * @property {boolean}
     *
     **/
    disable?: boolean;

    /**
     * To add styling with custom card class on dropdown element.
     * @property {string}
     *
     **/
    cardClasses?: string;

    /**
     * To reperesent the caption of the element.
     * @property {string}
     *
     **/
    label: string;

    /**
     * To place the dropdown option box with vertical and horizontal position.
     * @property
     **/
    position?: Position;

    /**
     * To render content include between the opening and closing tags when invoking a component
     * @property {React.ReactNode}
     *
     **/
    children?: React.ReactNode;

    /**
     * To add box shadow effect on element
     * @property {boolean}
     *
     **/
    elevation?: boolean;

    /**
     * Rounds the corners of ButtonDropdown's outer border edge
     * @property {number}
     *
     **/
    borderRadius?: number;

    /**
     * Add icon when dropdown is closed
     * @property {JSX.Element}
     *
     **/
    toggleUp?: JSX.Element;

    /**
     * Add icon when dropdown is opened
     * @property {JSX.Element}
     *
     **/
    toggleDown?: JSX.Element;

    /**
     * If true, show dropdown list on click action.
     * @property {boolean}
     *
     */
    showListOnClick?: boolean;
}

/** ButtonProps for buttondropdown*/

export type ButtonDropDownProps = {
    /** id is used to point & manipulate the element with the specific id*/
    id: string;
} & Pick<ButtonDropdownPropType, "disable" | "style">;

/** PaperProps for buttondropdown*/

export type PaperProps = {
    theme?: Theme;
    overrideStyle?: PropTypes["style"];
    children: React.ReactNode;
    elevation?: boolean;
    borderRadius?: number;
} & Partial<PaperPropType>;

export interface DropdownIcon {
    onClose: string;
    onOpen: string;
}

/**
 * @function ButtonDropdownConatiner
 * This function is used to style the container of the component
 */

const ButtonDropdownConatiner = styled("div")(
    ({ overrideStyle }: { overrideStyle?: PropTypes["style"] }) => {
        return {
            position: "relative",
            height: "fit-content",
            ...overrideStyle,
        };
    },
);

/**
 * @function EmotionButtonPaper
 * This function is used style the background of buttonDropdown
 */

const EmotionButtonPaper = styled(Paper, {
    shouldForwardProp: (props) => !["position"].includes(props as string),
})(({ position, elevation, theme }: PaperProps & { position: Position }) => {
    return {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        width: "100%",
        top: position.vertical === "bottom" ? "100%" : 0,
        [position.horizontal]: 0,
        boxShadow: elevation && theme?.shadows[1],
        padding: 0,
        border: 0,
        zIndex: 99,
        margin: 0,
        borderRadius: 0,
    };
});

/**
 * @function EmotionButtonDropdown
 * This function is used to style the button
 */
const EmotionButtonDropdown = styled(
    Button as React.FC<StyledButtonProps<React.ElementType>>,
)(() => {
    return {
        whiteSpace: "nowrap",
    };
});

/**
 * * The Trailing comma in `<T,>` is added due to contraints of the `.tsx` file extention.
 * * You can read about this here
 * * https://wanago.io/2020/02/17/typescript-generics-discussing-naming-conventions/#:~:text=identity(%27Hello%20world!%27)%3B-,Arrow%20functions,-We%20can%20also
 */
const ButtonDropdownComponent = (
    {
        id,
        className,
        onButtonToggle,
        children,
        cardClasses,
        label,
        position,
        elevation,
        toggleDown,
        showListOnClick,
        toggleUp,
        ...otherProps
    }: ButtonDropdownPropType,
    Btnref: React.ForwardedRef<HTMLDivElement>,
) => {
    /** Created a ref that we add to the element for which we want to detect outside clicks */
    const ref: React.RefObject<HTMLDivElement> = React.useRef();

    /** States for our ButtonDropdown */
    const [isOpen, setToggle] = React.useState(false);

    const toggleMenuOpen = () => {
        onButtonToggle && onButtonToggle(!isOpen);
        setToggle(!isOpen);
    };

    const insdeClick = (e) => {
        if (e.target.id === "Dropdown_button_id") {
            return;
        }
    };

    useOnClickOutside(
        ref,
        () => isOpen && toggleMenuOpen(),
        (e) => insdeClick(e),
    );

    return (
        <ButtonDropdownConatiner
            id={id}
            className={classNames(className)}
            ref={ref}
            overrideStyle={otherProps.style}
        >
            <div
                onMouseEnter={
                    otherProps.disable
                        ? undefined
                        : () => !showListOnClick && toggleMenuOpen()
                }
                onMouseLeave={
                    otherProps.disable
                        ? undefined
                        : () => !showListOnClick && toggleMenuOpen()
                }
                onClick={
                    otherProps.disable
                        ? undefined
                        : () => showListOnClick && toggleMenuOpen()
                }
            >
                <EmotionButtonDropdown
                    id="Dropdown_button_id"
                    endIcon={isOpen ? toggleUp : toggleDown}
                    {...otherProps}
                    type={"button"}
                >
                    {label}
                </EmotionButtonDropdown>
                {isOpen && (
                    <EmotionButtonPaper
                        id="Button_dropdown_list_id"
                        key="testid"
                        ref={Btnref}
                        className={classNames(cardClasses)}
                        elevation={elevation}
                        position={position}
                    >
                        {children}
                    </EmotionButtonPaper>
                )}
            </div>
        </ButtonDropdownConatiner>
    );
};

/**
 * This helper interface is created to make the Component Generic with Forword Ref support
 */
interface TypesafeForwordRefComponent {
    (
        props: ButtonDropdownPropType & {
            ref?: React.ForwardedRef<HTMLDivElement>;
        },
    ): ReturnType<typeof ButtonDropdownComponent>;
    defaultProps?: Partial<ButtonDropdownPropType> | undefined;
}

/**
 * ButtonDropdown Component
 */
export const ButtonDropdown = React.forwardRef(
    ButtonDropdownComponent,
    /**
     * Type assessertion is Required for Generic component
     * For more info visit https://fettblog.eu/typescript-react-generic-forward-refs/
     **/
) as unknown as TypesafeForwordRefComponent;

/**
 * defaultProps - To define default values for component props
 */
ButtonDropdown.defaultProps = {
    variant: "solid",
    label: "DropdownList",
    position: {
        vertical: "bottom",
        horizontal: "left",
    },
    elevation: true,
    borderRadius: 0,
    toggleUp: <ChevronUp size={16} />,
    toggleDown: <ChevronDown size={16} />,
    showListOnClick: false,
};
