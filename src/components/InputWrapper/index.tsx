import * as React from 'react';
import styled from '@emotion/styled';
import { DetailedHTMLProps } from '../../utils/types';

export interface InputPropType<T>
  extends Omit<DetailedHTMLProps<HTMLInputElement>, 'className' | 'type'> {
  /**
   * Input type
   * @property {void}
   **/
  type?: T;

  /**
   * Display error message and error styling
   * @property {string}
   **/
  errorMessage?: string;

  /**
   * Input value
   * @property {string | number}
   **/
  value?: string | number;

  /**
   * Input name
   * @property {string}
   **/
  name?: string;

  /**
   * User can only read text  and can't make changes action
   * @property {boolean}
   **/
  isReadOnly?: boolean;

  /**
   * Whether the Field is Require or not
   * @property {boolean}
   **/
  isRequired?: boolean;

  /**
   * If true, checked for the checkbox and radio input type
   * @property {boolean}
   **/
  isChecked?: boolean;

  /**
   * define onChange event to pass fixed Event Target Issue
   * @property {void}
   **/
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Icon allows the end user to input data with the help of a hint
   * @property {JSX.Element}
   **/
  icon?: JSX.Element;

  /**
   * To add Input border radius
   * @property {number}
   **/
  borderRadius?: number;

  /**
   * Caption for the information of field
   * @property {string | JSX.Element}
   **/
  label?: string | JSX.Element;

  /**
   * 3 types Input variations: 'solid - filled layout',  'outline - bordered layout', 'ghost - to show faded style layout'
   * @property {string}
   **/
  variant?: 'solid' | 'outline' | 'ghost';

  /**
   * Aria Invalid used to show invalid data
   * @property {boolean}
   **/
  ariaInvalid?: boolean;

  /**
   * Aria describedby used for input to describe the purpose of Input
   * @property {string}
   **/
  ariaDescribedby?: string;

  /**
   * To disable input field
   * @property {boolean}
   **/
  disable?: boolean;

  /**
   * Input maxLength
   * @property {number}
   **/
  maxlength?: number;
}

/**
 * @function EmotionInput
 * This function is used to wrap the Inner Item for style
 */
export const EmotionInput = styled('input')(``);

export const InputWrapper = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<
    InputPropType<'text' | 'email' | 'password' | 'radio' | 'checkbox' | 'tel'>
  >
>(
  (
    {
      id,
      name,
      value,
      type,
      onChange,
      onKeyUp,
      maxlength,
      placeholder,
      isRequired,
      disable,
      isReadOnly,
      ariaInvalid,
      ariaDescribedby,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <EmotionInput
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedby}
          id={id}
          value={value}
          maxLength={maxlength}
          ref={ref}
          name={name}
          type={type}
          placeholder={placeholder}
          readOnly={isReadOnly}
          disabled={disable}
          onChange={disable ? undefined : onChange}
          onKeyUp={disable ? undefined : onKeyUp}
          required={isRequired}
          {...props}
        />
      </>
    );
  }
);

/**
 * defaultProps - To define default values for component props
 */
InputWrapper.defaultProps = {
  id: 'input',
  type: 'text',
  variant: 'solid',
  isReadOnly: false,
  disable: false,
  isRequired: false,
  value: '',
  name: '',
};
