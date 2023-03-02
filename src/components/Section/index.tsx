import {
    EmotionNavigationSection,
    NavigationSectionPropType,
} from "../NavigationSection";
import { cx as classNames } from "@emotion/css";

const EmotionSection = EmotionNavigationSection.withComponent("section");

export const Section: React.FC<
    Omit<NavigationSectionPropType, "backgroundColor">
> = ({ children, style, id, className, ...props }) => {
    return (
        <EmotionSection
            id={id}
            as="section"
            className={classNames(className)}
            overrideStyle={style}
            {...props}
        >
            {children}
        </EmotionSection>
    );
};
