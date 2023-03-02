import React from "react";
import { useSelectContext } from "./index";
import { ListItem, ListItemPropType } from "../ListItem";

interface SelectOptionPropType
    extends Omit<ListItemPropType, "isSelected" | "onClick" | "ref"> {
    /**To get selected value from ListItem */
    value: string;
}
/**
 * selectOptions is used to pass as children in our select component,basically it will render as ListItem component
 * it will contain value prop which describes that which label is selected
 * rest is for spreding our all select props
 **/
export const SelectOptions: React.FC<SelectOptionPropType> = ({
    children,
    value,
    ...rest
}) => {
    const selectState = useSelectContext();
    return (
        <ListItem
            isSelected={value === selectState.selectedOption}
            data-item-selected={value === selectState.selectedOption}
            onClick={() => selectState.onOptionSelect(value)}
            {...rest}
        >
            {children}
        </ListItem>
    );
};
