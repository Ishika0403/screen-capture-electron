import React, { createContext } from "react";

export interface AccordionProps {
    /**
     * icon is used to expand and collapse the accordian content
     * @property
     **/
    icon?: AccordionContextType["icon"];
}
interface AccordionContextType {
    icon: {
        expandedIconDetails: JSX.Element;
        collapsedIconDetails: JSX.Element;
    };
}

export const AccordionContext = createContext<AccordionContextType | null>(
    null,
);

export const Accordion: React.FC<AccordionProps> = ({
    children,
    icon = null,
}) => {
    return (
        <AccordionContext.Provider value={{ icon }}>
            {children}
        </AccordionContext.Provider>
    );
};
