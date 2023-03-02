export const useBreakPoint = (
    point: "xs" | "sm" | "md" | "lg" | "xl" | "xxl",
): string => {
    const points = {
        xs: "@media(max-width:767px)",
        sm: "@media(min-width:768px)",
        md: "@media(min-width:992px)",
        lg: "@media(min-width:1200px)",
        xl: "@media(min-width:1400px)",
        xxl: "@media(min-width:1600px)",
    };
    return points[point];
};
