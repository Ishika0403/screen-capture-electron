import { useBreakPoint } from "./hooks/useBreakpoint";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export type ResponsiveProperty =
    | Partial<Record<Breakpoint, string | number>>
    | string
    | number
    // eslint-disable-next-line @typescript-eslint/ban-types
    | {};

export const getResponsivePropertyFromProps = (
    property: ResponsiveProperty,
    breakpoints: Breakpoint,
): string | number | undefined => {
    if (!property) return;
    return typeof property === "string" || typeof property === "number"
        ? property
        : (property as any)[breakpoints];
};

export const getResponsiveCssProperty = (
    ob: Partial<Record<string, ResponsiveProperty>>,
): Record<
    string,
    Partial<Record<keyof React.CSSProperties, string | number>>
> => {
    return ["xs", "sm", "md", "lg", "xl", "xxl"].reduce((acc, cur: string) => {
        return {
            ...acc,
            [`${useBreakPoint(cur as Breakpoint)}`]: {
                ...Object.entries(ob).reduce((ac, [key, val]) => {
                    if (!val) return ac;
                    return {
                        ...ac,
                        [key]: getResponsivePropertyFromProps(
                            val,
                            cur as Breakpoint,
                        ),
                    };
                }, {}),
            },
        };
    }, {});
};
