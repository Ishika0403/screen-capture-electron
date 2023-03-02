import * as React from "react";
import classNames from "classnames";
import { PropTypes } from "../../utils/propType";
import styled from "@emotion/styled";
import { TabContext } from "../Tab/tabContext";
import { TabItem } from "../TabItem";
import { BreakPoints } from "../../utils/units";
import { Property } from "../../utils/types";
import { FlexItem } from "../FlexItem";
import { ChevronDown, ChevronUp } from "react-feather";
interface TabPanelPropType
    extends Omit<PropTypes, "onClick" | "disable" | "as"> {
    /**
     * To display content for activate tab panel, value should be provided in number
     * @property {number}
     **/
    index?: number;

    /**
     * Add label to the tab in mobile view
     * @property {string}
     */
    label: string;

    /**
     * Disable the tab panel for the particular tab
     * @property {boolean}
     */
    disable?: boolean;

    /**
     * Add and display the Tab Icon
     * @property {JSX.Element}
     **/
    icon?: JSX.Element;

    /**
     * Add and display the Responsive Accordian Expand Icon
     * @property {JSX.Element}
     **/
    toggleDownIcon?: JSX.Element;

    /**
     * Add and display the Responsive Accordian Collapse Icon
     * @property {JSX.Element}
     **/
    toggleUpIcon?: JSX.Element;
}

/**
 * @function StyledTabPanelLabel
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledTabPanelLabel = () => {
    return {
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "left" as Property.TextAlign,
        [`@media ${BreakPoints.mobileL}`]: {
            width: "100%",
            display: "none",
        },
    };
};

/**
 * @function StyledTabPanel
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledTabPanel = ({ overrideStyle }) => {
    return {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        padding: 20,
        ...overrideStyle,
    };
};

/**
 * @function StyledTabToggle
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledTabToggle = () => {
    return {
        marginLeft: 10,
        flexShrink: 0,
    };
};

/**
 * @function EmotionTabPanel
 * This function is used to wrap the component for style
 */
export const EmotionTabPanel = styled("div")(StyledTabPanel);

/**
 * @function EmotionTabToggle
 * This function is used to wrap the component for style
 */
export const EmotionTabToggle = styled("div")(StyledTabToggle);

/**
 * @function EmotionTabPanelLabel
 * This function is used to wrap the component for style
 */
export const EmotionTabPanelLabel = styled(TabItem)(StyledTabPanelLabel);

export const TabPanel = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<TabPanelPropType>
>(
    (
        {
            id,
            children,
            className,
            style,
            index,
            label,
            icon,
            toggleDownIcon,
            toggleUpIcon,
            disable,
            ...props
        },
        ref,
    ) => {
        const tabValue = React.useContext(TabContext);
        return (
            <>
                {label && tabValue?.isResponsive && (
                    <EmotionTabPanelLabel
                        icon={icon}
                        index={index}
                        disable={disable}
                    >
                        <FlexItem
                            flexShrink="unset"
                            flexGrow={1}
                            alignSelf="flex-start"
                        >
                            {label}
                        </FlexItem>
                        <EmotionTabToggle>
                            {index === tabValue?.value
                                ? toggleDownIcon || <ChevronDown />
                                : toggleUpIcon || <ChevronUp />}
                        </EmotionTabToggle>
                    </EmotionTabPanelLabel>
                )}
                {index === tabValue?.value && (
                    <EmotionTabPanel
                        id={id}
                        className={classNames(className)}
                        overrideStyle={style}
                        ref={ref}
                        {...props}
                    >
                        {children}
                    </EmotionTabPanel>
                )}
            </>
        );
    },
);

/**
 * defaultProps - To define default values for component props
 */
TabPanel.defaultProps = {
    id: "tabpanel_component",
    label: "Tab1",
};
