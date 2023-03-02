import { useState } from "react";

const useBreadcrumb = (initialState = true) => {
    const [expanded, setExpanded] = useState(initialState);

    const open = () => setExpanded(true);

    return {
        expanded,
        open,
    };
};

export default useBreadcrumb;
