import React, { createContext, useContext } from "react";
import useToggle from "../../utils/Toggle";
import { PropTypes } from "../../utils/propType";
import styled from "@emotion/styled";
import { ChevronDown, ChevronUp } from "react-feather";
import { AccordionContext } from "./Accordion";
import { useThemeMode } from "../../context/ThemeProvider";
import { cx as classNames } from "@emotion/css";
export interface AccordionItemPropType extends Omit<PropTypes, "as"> {
    /**
     * To show the content of accordian
     * @property {JSX.Element}
     *
     **/
    expandIcon?: JSX.Element;

    /**
     * To hide the content of Accordion
     * @property {JSX.Element}
     *
     **/
    collapseIcon?: JSX.Element;

    /**
     * Property to provide spacing between accordians from bottom
     * @property {boolean}
     *
     **/
    spacing?: boolean;
}

export const AccordionItemContext = createContext<{
    isExpanded: boolean;
    toggleExpand: () => void;
    icon: {
        expandedIconDetails: JSX.Element;
        collapsedIconDetails: JSX.Element;
    };
} | null>(null);

/**
 * @function StyledAccordionContainer
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledAccordionContainer = ({ overrideStyle, spacing }) => {
    return {
        ":first-of-type": {
            borderTop: "1px solid #d0d0d0",
        },
        borderRight: " 1px solid #d0d0d0",
        borderBottom: " 1px solid #d0d0d0",
        borderLeft: "1px solid #d0d0d0",
        ...(spacing && {
            marginBottom: "10px",
        }),
        ...overrideStyle,
    };
};
/**
 * @function EmotionAccordionContainer
 * This function is used to style the component
 */
const EmotionAccordionContainer = styled("div")(StyledAccordionContainer);

/*AccordionItem Component */
export const AccordionItem = React.forwardRef<
    HTMLDivElement,
    AccordionItemPropType
>(
    (
        { id, children, spacing, style, className, expandIcon, collapseIcon },
        ref,
    ) => {
        const [isExpanded, toggleExpand] = useToggle(false);
        const accordionCtx = useContext(AccordionContext);
        const { themeMode } = useThemeMode();

        return (
            <AccordionItemContext.Provider
                value={{
                    isExpanded,
                    toggleExpand,
                    icon: {
                        collapsedIconDetails: collapseIcon ||
                            accordionCtx?.icon?.collapsedIconDetails || (
                                <ChevronDown
                                    color={
                                        themeMode === "light" ? "#555" : "#fff"
                                    }
                                />
                            ),
                        expandedIconDetails: expandIcon ||
                            accordionCtx?.icon?.expandedIconDetails || (
                                <ChevronUp
                                    color={
                                        themeMode === "light" ? "#555" : "#fff"
                                    }
                                />
                            ),
                    },
                }}
            >
                <EmotionAccordionContainer
                    id={`accordion_${id}`}
                    spacing={spacing}
                    overrideStyle={style}
                    ref={ref}
                    role="presentation"
                    className={classNames(className)}
                >
                    {children}
                </EmotionAccordionContainer>
            </AccordionItemContext.Provider>
        );
    },
);
