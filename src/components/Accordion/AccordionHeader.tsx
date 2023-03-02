import React, { useContext } from "react";
import { PropTypes } from "../../utils/propType";
import styled from "@emotion/styled";
import { Property } from "../../utils/types";
import { Theme } from "../../context/ThemeProvider";
import { AccordionItemContext } from "./AccordionItem";
import { useThemeMode } from "../../context/ThemeProvider";
import { cx as classNames } from "@emotion/css";

export interface AccordionHeaderPropType extends Omit<PropTypes, "as"> {
    /**
     * Alignment of the icons in specific direction(eg. left,right,center)
     * @property {Property.DisplayDirection}
     */
    iconAlignment?: Property.DisplayDirection;
}

const ICON_CHANGE_DELAY_DURATION = 200; // delay duration in ms
/**
 * @function EmotionAccordionContent
 * This function is used to style Accordion Content
 */
const EmotionAccordionContent = styled("div")(
    ({
        iconAlignment,
        theme,
        disable,
        overrideStyle,
    }: {
        theme?: Theme;
        iconAlignment: AccordionHeaderPropType["iconAlignment"];
        overrideStyle: PropTypes["style"];
        disable: boolean;
    }) => {
        return {
            display: "flex",
            cursor: "pointer",
            padding: "26px 20px",
            transition: `all ${ICON_CHANGE_DELAY_DURATION * 3}ms ease-in-out`,
            flexDirection: iconAlignment === "rtl" ? "row-reverse" : "row",
            backgroundColor: theme?.palette?.paper?.background,
            ...(iconAlignment && {
                justifyContent: "space-between",
            }),
            ...(disable && {
                opacity: "0.6",
                cursor: "not-allowed",
            }),
            ...overrideStyle,
        };
    },
);

/** AccordionHeader Component */

export const AccordionHeader = React.forwardRef<
    HTMLDivElement,
    AccordionHeaderPropType
>(({ id, children, className, iconAlignment, disable, style }, ref) => {
    const itemCtx = useContext(AccordionItemContext);
    const isMount = React.useRef(true);
    const { themeMode } = useThemeMode();
    const getIcon = () =>
        itemCtx?.isExpanded
            ? itemCtx?.icon?.expandedIconDetails
            : itemCtx?.icon?.collapsedIconDetails;
    const [CurrentIcon, setCurrentIcon] = React.useState(getIcon);

    React.useEffect(() => {
        let timmer;
        if (!isMount.current) {
            timmer = setTimeout(() => {
                setCurrentIcon(getIcon());
            }, ICON_CHANGE_DELAY_DURATION);
        }
        return () => {
            isMount.current = false;
            timmer && clearTimeout(timmer);
        };
    }, [itemCtx?.isExpanded, themeMode]);

    return (
        <EmotionAccordionContent
            id={id}
            ref={ref}
            className={classNames(className)}
            overrideStyle={style}
            iconAlignment={iconAlignment}
            disable={disable}
            onClick={disable ? undefined : () => itemCtx?.toggleExpand()}
            data-options={itemCtx?.isExpanded ? true : false}
        >
            {children}
            <div
                style={
                    iconAlignment === "rtl"
                        ? { marginRight: "auto", display: "inline-flex" }
                        : { marginLeft: "auto", display: "inline-flex" }
                }
            >
                {CurrentIcon}
            </div>
        </EmotionAccordionContent>
    );
});
