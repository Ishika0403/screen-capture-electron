import { isNumber } from "./assertion";

function analyzeCSSValue(value: number | string) {
    const num = parseFloat(value.toString());
    const unit = value.toString().replace(String(num), "");
    return { unitless: !unit, value: num, unit };
}

export function px(value: number | string | null): string | null {
    if (value == null) return null;
    const { unitless } = analyzeCSSValue(value);
    return unitless || isNumber(value) ? `${value}px` : value;
}
