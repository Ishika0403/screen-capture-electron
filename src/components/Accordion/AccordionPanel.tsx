import React, { useContext } from "react";
import { PropTypes } from "../../utils/propType";
import styled from "@emotion/styled";
import { AccordionItemContext } from "./AccordionItem";
import { cx as classNames } from "@emotion/css";

export type AccordionPanelPropType = Omit<PropTypes, "as">;

/**
 *  EmotionAccordionContentPanel component
 */
const EmotionAccordionContentPanel = styled("div")(
    ({
        isExpanded,
        overrideStyle,
    }: {
        isExpanded: boolean;
        overrideStyle: PropTypes["style"];
        className: PropTypes["className"];
    }) => {
        return {
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            marginTop: isExpanded && "10px",
            maxHeight: 0,
            transition: "all 200ms ease-in-out",
            willChange: "max-height",
            ...overrideStyle,
        };
    },
);
const ICON_CHANGE_DELAY_DURATION = 200; // delay duration in ms

/**
 * AccordionPanel component
 */

export const AccordionPanel: React.FC<AccordionPanelPropType> = ({
    id,
    children,
    style,
    className,
}) => {
    const ctx = useContext(AccordionItemContext);
    const accordionPanelRef = React.useRef<HTMLDivElement>();
    const isMount = React.useRef<boolean>(true);

    React.useEffect(() => {
        let timmer;
        if (!isMount.current) {
            const isOpen = ctx?.isExpanded;
            const accordion_panel = accordionPanelRef.current;
            if (isOpen) {
                accordion_panel.style.maxHeight = `${accordion_panel.scrollHeight}px`;
            } else {
                accordion_panel.style.maxHeight = `${accordion_panel.scrollHeight}px`;
            }

            timmer = setTimeout(
                (open) => {
                    if (open) {
                        accordion_panel.style.overflow = "visible";
                        accordion_panel.style.maxHeight = "none";
                    } else {
                        accordion_panel.style.overflow = "hidden";
                        accordion_panel.style.maxHeight = `0`;
                    }
                },
                ICON_CHANGE_DELAY_DURATION,
                isOpen,
            );
        }
        return () => {
            isMount.current = false;
            timmer && clearTimeout(timmer);
        };
    }, [ctx?.isExpanded]);

    return (
        <EmotionAccordionContentPanel
            id={id}
            isExpanded={ctx?.isExpanded}
            ref={accordionPanelRef}
            overrideStyle={style}
            className={classNames(className)}
        >
            {children}
        </EmotionAccordionContentPanel>
    );
};
