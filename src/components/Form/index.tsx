import * as React from "react";
import { cx as classNames } from "@emotion/css";
import styled from "@emotion/styled";
import { PropTypes } from "../../utils/propType";

interface FormPropType
    extends Omit<PropTypes<HTMLFormElement>, "as" | "disable" | "onClick"> {
    /**
     * Trigger an action while submitting form data
     * @property {void}
     **/
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;

    /**
     *  To specify where the form data should be sent  when the form is submitted
     * @property {string}
     **/
    action?: string;

    /**
     * Form method types
     * @property
     **/
    method?: "POST" | "GET";
}

/**
 * @function StyledForm
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledForm = ({ overrideStyle }) => {
    return {
        width: "100%",
        ...overrideStyle,
    };
};

/**
 * @function EmotionForm
 * This function is used to wrap the form component for style
 */
export const EmotionForm = styled("form")(StyledForm);

export const Form = React.forwardRef<
    HTMLFormElement,
    React.PropsWithChildren<FormPropType>
>(({ id, children, style, onSubmit, className, ...props }, ref) => {
    return (
        <EmotionForm
            id={id}
            className={classNames(className)}
            overrideStyle={style}
            {...props}
            ref={ref}
            onSubmit={onSubmit}
        >
            {children}
        </EmotionForm>
    );
});

/**
 * defaultProps - To define default values for component props
 */
Form.defaultProps = {
    id: "Form-component",
};
