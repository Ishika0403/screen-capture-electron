import * as React from "react";

interface TableContextProps {
    /** Variation for layout of table : bordered - show border style layout and  striped -  show odd even color layout**/
    variant: "bordered" | "striped";

    /** Additional sizes */
    size: "sm" | "md" | "lg";
}
export const TableContext = React.createContext<TableContextProps | undefined>(
    null,
);
