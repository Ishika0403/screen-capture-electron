import React, { ReactElement } from "react";
import { PropTypes } from "../../utils/propType";
import { cx as classNames } from "@emotion/css";
import styled from "@emotion/styled";

interface Props<C extends React.ElementType>
    extends Pick<PropTypes, "className" | "style"> {
    /**
     * To override the purpose of default HTML tag.
     * @property {string}
     */
    as?: C;

    /**
     * To pass child inside the component
     * @property {void}
     */
    children?: React.ReactNode;
}

type ImageProps<C extends React.ElementType> = Props<C> &
    Omit<React.ComponentPropsWithoutRef<C>, keyof Props<C>>;

/**
 * @function StyledContainer
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledImage = ({ overrideStyle }) => {
    return {
        ...overrideStyle,
    };
};

/**
 * @function EmotionContainer
 * This function is used to wrap the component for style
 */
export const EmotionImage = styled("img", {
    shouldForwardProp: (props: string) => {
        return !["overrideStyle", "as"].includes(props);
    },
})(StyledImage);

export const Image = <C extends React.ElementType = "img">({
    as,
    children,
    className,
    style,
    ...other
}: ImageProps<C>): ReactElement | null => {
    return (
        <EmotionImage
            as={as}
            overrideStyle={style}
            className={classNames(className)}
            {...other}
        >
            {children}
        </EmotionImage>
    );
};
