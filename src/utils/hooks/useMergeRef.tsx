/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

type ReactRef<T> = React.Ref<T> | React.MutableRefObject<T>;

export function assignRef<T = any>(
    ref: ReactRef<T> | undefined,
    value: T,
): ReactRef<T> {
    if (ref == null) return;

    if (typeof ref === "function") {
        ref(value);
        return;
    }

    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref.current = value;
    } catch (error) {
        throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
    }
}

/**
 * @example
 * import React from "react";
 * import { useMergeRefs } from `@chakra-ui/hooks`;
 *
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useMergeRefs(internalRef, ref)} />;
 * });
 */
export function useMergeRefs<T>(
    ...refs: (ReactRef<T> | undefined)[]
): ReactRef<T> {
    return React.useMemo(() => {
        if (refs.every((ref) => ref == null)) {
            return null;
        }
        return (node: T) => {
            refs.forEach((ref) => {
                if (ref) assignRef(ref, node);
            });
        };
    }, refs);
}
