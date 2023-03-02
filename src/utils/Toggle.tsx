import React, { useCallback } from "react";

export default function useToggle(
    initial = false,
): [boolean, (iOpen?: boolean) => void] {
    const [isOpen, setIsOpen] = React.useState(initial);

    const onToggle = useCallback(
        (iOpen?: boolean) => {
            iOpen === undefined
                ? setIsOpen((current) => !current)
                : setIsOpen(iOpen);
        },
        [isOpen],
    );

    return [isOpen, onToggle];
}
