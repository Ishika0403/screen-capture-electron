/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-nested-ternary */
import * as React from "react";
export function useControllableProp<T>(prop: T | undefined, state: T) {
    const isControlled = prop !== undefined;
    const value = isControlled && typeof prop !== "undefined" ? prop : state;
    return [isControlled, value] as const;
}

export interface UseControllableStateProps<T> {
    /**
     * The value to used in controlled mode
     */
    value?: T;
    /**
     * The initial value to be used, in uncontrolled mode
     */
    defaultValue?: T | (() => T);
    /**
     * The callback fired when the value changes
     */
    onChange?: (value: T) => void;
    /**
     * The function that determines if the state should be updated
     */
    shouldUpdate?: (prev: T, next: T) => boolean;
}
function useCallbackRef<T extends (...args: any[]) => any>(
    fn: T | undefined,
    deps: React.DependencyList = [],
): T {
    const ref = React.useRef(fn);
    ref.current = fn;
    return React.useCallback(((...args) => ref.current?.(...args)) as T, deps);
}

export const runIfFn = (T, U) => {
    return typeof T === "function" ? T(...U) : U;
};
/**
 * React hook for using controlling component state.
 * @param props
 */
export function useControllableState<T>(props: UseControllableStateProps<T>) {
    const {
        value: valueProp,
        defaultValue,
        onChange,
        shouldUpdate = (prev, next) => prev !== next,
    } = props;
    const onChangeProp = useCallbackRef(onChange);
    const shouldUpdateProp = useCallbackRef(shouldUpdate);

    const [valueState, setValue] = React.useState(defaultValue as T);

    const isControlled = valueProp !== undefined;
    const value = isControlled ? (valueProp as T) : valueState;

    const updateValue = React.useCallback(
        (next: React.SetStateAction<T>) => {
            const nextValue = runIfFn(next, value);

            if (!shouldUpdateProp(value, nextValue)) {
                return;
            }

            if (!isControlled) {
                setValue(nextValue);
            }

            onChangeProp(nextValue);
        },
        [isControlled, onChangeProp, value, shouldUpdateProp],
    );

    return [value, updateValue] as [T, React.Dispatch<React.SetStateAction<T>>];
    //return;
}
