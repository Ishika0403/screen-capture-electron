import * as React from "react";
import classNames from "classnames";
import { PropTypes } from "../../utils/propType";
import styled from "@emotion/styled";
import { TabContext } from "./tabContext";
import { Property } from "../../utils/types";
import { BreakPoints } from "../../utils/units";

interface TabPropType
    extends Pick<
        PropTypes<HTMLDivElement>,
        "id" | "className" | "style" | "ref" | "colorScheme"
    > {
    /**
     * provide a way to access DOM nodes
     * @property
     *
     **/
    ref?: React.Ref<HTMLDivElement>;

    /**
     * To show initial selected item of tab element
     * @property {number}
     *
     **/
    selected?: number;

    /**
     * To style the tab element - Solid: "for filled layout" and bordered: "for border layout"
     * @property {string}
     *
     **/
    variant?: "solid" | "bordered";

    /**
     * To show vertical orientation
     * @property {boolean}
     *
     **/
    vertical?: boolean;

    /**
     * To enable Responsive tab
     * @property {boolean}
     *
     **/
    isResponsive?: boolean;
}

type StyledTabProps = {
    overrideStyle?: PropTypes["style"];
} & Partial<TabPropType>;

/**
 * @function StyledTab
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledTab = ({ overrideStyle, vertical }: StyledTabProps) => {
    return {
        display: "flex",
        margin: "0px",
        flexDirection: "column" as Property.FlexDirection,
        "& > div > button:last-child": {
            "&:after": vertical ? { background: "transparent" } : ``,
        },
        [`@media ${BreakPoints.mobileL}`]: {
            flexDirection: (vertical
                ? "row"
                : "column") as Property.FlexDirection,
        },
        ...overrideStyle,
    };
};

/**
 * @function EmotionTab
 * This function is used to wrap the right icon style of tag
 */
export const EmotionTab = styled("div")(StyledTab);

export const Tab = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<TabPropType>
>(
    (
        {
            children,
            className,
            style,
            selected,
            colorScheme,
            vertical,
            variant,
            isResponsive,
            ...props
        },
        ref,
    ) => {
        const [indexValue, setIndexData] = React.useState(selected);
        const onHandleClick = (event: React.SyntheticEvent) => {
            const eventTarget = event.target as HTMLButtonElement;
            if (
                eventTarget &&
                eventTarget.tagName.toLocaleLowerCase() === "button" &&
                eventTarget.hasAttribute("index") &&
                eventTarget?.getAttribute("index") !== undefined
            ) {
                const indexData = eventTarget?.getAttribute("index");
                setIndexData(parseInt(indexData));
            }
        };

        return (
            <TabContext.Provider
                value={{
                    value: indexValue,
                    variant: variant,
                    colorScheme: colorScheme,
                    vertical: vertical,
                    isResponsive: isResponsive,
                }}
            >
                <EmotionTab
                    {...props}
                    ref={ref}
                    vertical={vertical}
                    onClick={onHandleClick}
                    className={classNames(className)}
                    overrideStyle={style}
                >
                    {children}
                </EmotionTab>
            </TabContext.Provider>
        );
    },
);

/**
 * defaultProps - To define default values for component props
 */

Tab.defaultProps = {
    id: "tab_component",
    variant: "solid",
    colorScheme: "primary",
    vertical: false,
    isResponsive: false,
};
