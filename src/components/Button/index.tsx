import styled from '@emotion/styled';
import { isObjectEmpty } from '../../utils/helpers';
import React from 'react';
import { defaultTheme, Theme } from '../../context/ThemeProvider';
import { cx as classNames } from '@emotion/css';
import { alpha } from '../../utils/Theme/colorManipulator';
import { Property } from '../../utils/types';
import { spacing, fontSizes } from '../../utils/units';
import { PropTypes } from '../../utils/propType';

export interface ButtonPropType<C extends React.ElementType>
  extends Omit<PropTypes, Exclude<keyof PropTypes, HTMLDivElement> | 'as'>,
    Pick<PropTypes, 'id' | 'className' | 'style' | 'disable' | 'colorScheme'> {
  /**
   * To override the purpose of default HTML tag.
   * @property
   *
   */
  as?: C;

  /**
   * 4 types of Button variations : 'solid - filled layout', 'link - text link layout ' and 'outline - bordered layout' , 'text -  Text link style with hover layout
   * @property {string}
   *
   **/
  variant?: 'solid' | 'outline' | 'text' | 'link';

  /**
   * To add shadow effect
   * @property {boolean}
   *
   **/
  elevation?: boolean;

  /**
   * 3 types Button sizes : 'sm - small view of button size' , 'md - medium view of button size' and 'lg - large view of button size
   * @property {string}
   *
   **/
  size?: 'sm' | 'md' | 'lg';

  /**
   * Custom icon placed before text
   * @property {JSX.Element}
   *
   **/
  startIcon?: JSX.Element;

  /**
   * Custom icon placed after text
   * @property {JSX.Element}
   *
   **/
  endIcon?: JSX.Element;

  /**
   * Rounds the corners of Button's outer border edge
   * @property {number}
   *
   **/
  borderRadius?: number;

  /**
   * Additonal width of button
   * @property
   *
   **/
  minWidth?: Property.MinWidth;

  /**
   * Alignment of item inside button
   * @property
   *
   **/
  alignItems?: Property.AlignItem;

  /**
   * To define a string that describes the current element
   * @property {string}
   *
   **/
  'aria-label'?: string;

  /**
   * Justify position for elements inside button
   * @property
   *
   **/
  justifyContent?: Property.JustifyElemnent;

  /**
   * used to set fullwidth of the button
   * @property {boolean}
   *
   **/
  fullWidth?: boolean;

  /**
   * @property {React.Ref<HTMLDivElement>} Ref - provide a way to access DOM nodes
   *
   **/
  myRef?: React.Ref<HTMLButtonElement>;

  /**
   * space for icon
   * @property {string}
   *
   */
  spaceBetween?: string;
}

/**
 * @object buttonSizeProps
 * This object is used to define the size of the button
 */

const buttonSizeProps = {
  sm: {
    fontSize: fontSizes['xs'],
    padding: `${spacing['xxs']} ${spacing['sm']}`,
  },
  md: {
    fontSize: fontSizes['sm'],
    padding: `${spacing['xs']} ${spacing['md']}`,
  },
  lg: {
    fontSize: fontSizes['md'],
    padding: `${spacing['sm']} ${spacing['lg']}`,
  },
};

/**
 * @function getPropsByVariant
 * This function is used to pass the color scheme, variant and the emotion theme
 */

const getPropsByVariant = ({ variant, colorScheme, theme }) => {
  const colorInPalette = theme.palette[colorScheme];
  const variants = {
    outline: colorInPalette && {
      main: {
        border: `1px solid ${colorInPalette.main}`,
        backgroundColor: theme.palette.common.transparent,
        color: colorInPalette.main,
      },
      hover: {
        backgroundColor: alpha(
          colorInPalette.main,
          theme.palette.action.hoverOpacity
        ),
      },
    },

    solid: colorInPalette && {
      main: {
        border: `1px solid ${colorInPalette.main}`,
        backgroundColor: colorInPalette.main,
        color: colorInPalette.contrastText,
      },

      hover: {
        borderColor: colorInPalette.hover,
        transition: colorInPalette.transition,
        backgroundColor: colorInPalette.hover,
      },
    },

    text: colorInPalette && {
      main: {
        border: 'none',
        backgroundColor: theme.palette.common.transparent,
        color: colorInPalette.main,
      },
      hover: {
        backgroundColor: alpha(
          colorInPalette.main,
          theme.palette.action.hoverOpacity
        ),
      },
    },

    link: colorInPalette && {
      main: {
        backgroundColor: theme.palette.common.transparent,
        color: colorInPalette.main,
        border: 'none',
        padding: '0',
      },
      hover: {
        textDecoration: 'underline',
        color: colorInPalette.main,
      },
    },
  };

  return variants[variant] || variants.solid;
};

type ButtonProps<C extends React.ElementType> = ButtonPropType<C> &
  Omit<React.ComponentPropsWithRef<C>, keyof ButtonPropType<C>>;

export type StyledButtonProps<C extends React.ElementType> = {
  isChildrenNull?: boolean;
  theme?: Theme;
  overrideStyle?: PropTypes['style'];
} & Partial<ButtonProps<C>>;

/**
 * @function StyledButton
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */

function StyledButton<C extends React.ElementType = 'button'>({
  theme,
  overrideStyle,
  colorScheme,
  variant,
  elevation,
  disable,
  alignItems,
  borderRadius,
  size,
  justifyContent,
  minWidth,
  fullWidth,
}: StyledButtonProps<C>) {
  if (isObjectEmpty(theme)) {
    theme = defaultTheme;
  }

  const fontSizeBySize = buttonSizeProps[size]?.fontSize;
  const paddingBySize = buttonSizeProps[size]?.padding;
  const propsByVariant = getPropsByVariant({
    variant,
    theme,
    colorScheme,
  });
  return {
    display: 'flex',
    textDecoration: 'none',
    alignItems: `${alignItems}`,
    justifyContent: `${justifyContent}`,
    fontWeight: 500,
    opacity: disable ? theme?.palette?.action?.disabledOpacity : 1,
    padding: buttonSizeProps.md.padding,
    fontSize: buttonSizeProps.md.fontSize,
    borderRadius: borderRadius ?? theme?.shape?.borderRadius,
    boxShadow: elevation && theme?.shadows[1],
    width: fullWidth ? '100%' : 'auto',
    minWidth,
    pointerEvents: disable ? 'none' : '',
    cursor: disable ? theme?.palette?.action.cursor : 'pointer',
    ...(propsByVariant && propsByVariant.main),
    ...(paddingBySize && { padding: paddingBySize }),
    ...(fontSizeBySize && { fontSize: fontSizeBySize }),
    '&:hover': !disable && {
      boxShadow: elevation ? theme?.shadows[2] : undefined,
      ...(propsByVariant && propsByVariant.hover),
    },
    '&:focus-visible': {
      outline: 'none',
    },
    appearence: 'none',

    ...overrideStyle,
  };
}

enum MarginDirection {
  left = 'Left',
  right = 'Right',
}
/**
 * @function StyledButtonIcon
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledButtonIcon = ({
  marginSide,
  spaceBetween,
}: {
  marginSide: MarginDirection;
  spaceBetween: string;
}) => {
  return {
    margin: 0,
    [`margin${marginSide}`]: spaceBetween || 10,
    display: 'inline-flex',
  };
};

/**
 * @function EmotionButton
 * This function is used to wrap the component for style
 */

const EmotionButton = styled('button', {
  shouldForwardProp: (props: string) => {
    return ![
      'colorScheme',
      'variant',
      'elevation',
      'disable',
      'alignItems',
      'borderRadius',
      'size',
      'justifyContent',
      'minWidth',
      'fullWidth',
      'overrideStyle',
      'spaceBetween',
      'as',
    ].includes(props);
  },
})(StyledButton);

/**
 * @function EmotionButtonIcon
 * This function is used to wrap the component for style
 */
export const EmotionButtonIcon = styled('span')(StyledButtonIcon);

/**
 *
it returns icon as jsx element
 */
const getButtonIcon = (
  icon: JSX.Element,
  marginSide: MarginDirection,
  spaceBetween: string
): JSX.Element => (
  <EmotionButtonIcon marginSide={marginSide} spaceBetween={spaceBetween}>
    {icon}
  </EmotionButtonIcon>
);

const ButtonComponent = <C extends React.ElementType = 'button'>(
  {
    children,
    startIcon,
    endIcon,
    id,
    'aria-label': ariaLabel,
    colorScheme,
    variant,
    className,
    style,
    elevation,
    spaceBetween,
    ...props
  }: ButtonProps<C>,
  myRef?: React.ForwardedRef<HTMLButtonElement>
): React.ReactElement | null => {
  return (
    <EmotionButton
      colorScheme={colorScheme}
      variant={variant}
      id={id}
      ref={myRef}
      elevation={elevation}
      type="button"
      {...props}
      aria-label={ariaLabel}
      className={classNames(className)}
      spaceBetween={spaceBetween}
      overrideStyle={style}
    >
      {startIcon &&
        getButtonIcon(startIcon, MarginDirection.right, spaceBetween)}
      {children}
      {endIcon && getButtonIcon(endIcon, MarginDirection.left, spaceBetween)}
    </EmotionButton>
  );
};

const ButtonRef = React.forwardRef(ButtonComponent);

type buttonWithRefProps<C extends React.ElementType = 'button'> =
  ButtonProps<C> & {
    mRef?: React.Ref<HTMLButtonElement>;
  };

export const Button = <C extends React.ElementType = 'button'>({
  myRef,
  ...props
}: buttonWithRefProps<C> & {
  myRef?: React.Ref<HTMLButtonElement>;
}): React.ReactElement | null => <ButtonRef {...props} ref={myRef} />;

Button.defaultProps = {
  colorScheme: 'primary',
  variant: 'outline' as const,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: false,
  'aria-label': 'button',
  fullWidth: false,
};
