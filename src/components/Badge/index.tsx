import * as React from 'react';
import styled from '@emotion/styled';
import { cx as classNames } from '@emotion/css';
import { isObjectEmpty } from '../../utils/assertion';
import { defaultTheme, Theme } from '../../context/ThemeProvider';
import { PropTypes } from '../../utils/propType';
import { alpha } from '../../utils/Theme/colorManipulator';

interface BadgePropType extends Omit<PropTypes, 'disable'> {
  /**
   * Add text and count to display badge
   * @property {string | number}
   *
   * */
  content: string | number;

  /**
   * Rounds the corners of Badge's outer border edge
   * @property {number}
   *
   * */
  borderRadius?: number;

  /**
   * Weather to show badge or not
   * @property {boolean}
   *
   * */
  show?: boolean;

  /**
   * To show the max count on badge
   * @property {number}
   *
   * */
  max?: number;

  /**
   * types of badge variations: 'solid - filled layout', 'dot - dot info style layout' and 'outline - bordered layout', 'ghost - to show transculant style layout'
   * @property {string}
   *
   * */
  variant?: 'solid' | 'dot' | 'outline' | 'ghost';
}

type StyleBadgeProps = {
  isChildrenNull?: boolean;
  theme?: Theme;
  overrideStyle?: PropTypes['style'];
} & Partial<BadgePropType>;

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
    },
    solid: colorInPalette && {
      main: {
        backgroundColor: colorInPalette.main,
        color: colorInPalette.contrastText,
      },
    },
    dot: colorInPalette && {
      main: {
        backgroundColor: colorInPalette.main,
      },
    },
    ghost: colorInPalette && {
      main: {
        backgroundColor: alpha(colorInPalette.main, 0.2),
        color: colorInPalette.main,
      },
    },
  };

  return variants[variant] || variants.solid;
};

/**
 * @function EmotionBadge
 * This function is used to wrap the badge component for style
 */
export const EmotionBadge = styled('div', {
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
      'show',
      'isChildrenNull',
      'as',
    ].includes(props);
  },
})(
  ({
    borderRadius,
    show,
    theme,
    variant,
    colorScheme,
    isChildrenNull,
    overrideStyle,
  }: StyleBadgeProps) => {
    if (isObjectEmpty(theme)) {
      theme = defaultTheme;
    }

    const propsByVariant = getPropsByVariant({
      variant,
      theme,
      colorScheme,
    });
    return {
      borderRadius,
      display: `${show ? 'inline-flex' : 'none'}`,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      fontSize: 10,
      height: borderRadius * 2,
      minWidth: borderRadius * 2,
      padding: `${variant !== 'dot' ? '0 6px' : ''}`,
      textAlign: 'center',
      verticalAlign: 'baseline',
      ...(propsByVariant && propsByVariant.main),

      position: `${isChildrenNull ? 'absolute' : 'relative'}`,
      right: `${isChildrenNull ? '0' : 'unset'}`,
      top: `${isChildrenNull ? '0' : 'unset'}`,
      transform: `${
        isChildrenNull ? 'scale(1) translate(50%, -50%)' : 'unset'
      }`,
      ...overrideStyle,
    };
  }
);

export const Badge = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<BadgePropType>
>(
  (
    { id, children, className, show, max, content, variant, style, ...props },
    ref
  ) => {
    return (
      <div
        style={{
          display: 'inline-flex',
          position: 'relative',
        }}
        className={classNames(className)}
      >
        <EmotionBadge
          id={id}
          ref={ref}
          show={show}
          isChildrenNull
          variant={variant}
          overrideStyle={style}
          {...props}
        >
          {variant !== 'dot' && content && Number(content) > max
            ? `${max}+`
            : content}
        </EmotionBadge>
        {children}
      </div>
    );
  }
);

/**
 * defaultProps - To define default values for component props
 */
Badge.defaultProps = {
  show: true,
  borderRadius: 10,
  variant: 'solid',
  content: 'Tag',
};
