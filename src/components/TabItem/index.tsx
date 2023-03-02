import * as React from 'react';
import classNames from 'classnames';
import { PropTypes } from '../../utils/propType';
import styled from '@emotion/styled';
import { ButtonPropType, Button } from '../Button';
import { isObjectEmpty } from '../../utils/helpers';
import { defaultTheme, Theme } from '../../context/ThemeProvider';
import { TabContext } from '../Tab/tabContext';
import { Property } from '../../utils/types';

interface TabItemPropType
  extends PropTypes,
    Omit<ButtonPropType<React.ElementType>, 'variant'> {
  /**  To style the tabItem element - Solid: "for filled layout" and bordered: "for border layout" */
  variant?: 'solid' | 'bordered';

  /** To display content for activate tab panel, value should be provided in number **/
  index?: number;

  /** To provide value in number to show active tab **/
  active?: boolean;

  /** To show vertical orientation */
  vertical?: boolean;

  /** To display Tab Icon */
  icon?: JSX.Element;
}

/**
 * @function getPropsByVariant
 * This function is used to pass the color scheme, variant and the emotion theme
 */

const getPropsByVariant = ({ variant, colorScheme, theme, vertical }) => {
  const colorInPalette = theme.palette[colorScheme];
  const variants = {
    bordered: colorInPalette && {
      main: {
        border: 0,
        color: theme.palette.paper.text,
        backgroundColor: theme.palette.common.transparent,
      },
      hover: {
        border: 0,
        color: colorInPalette.main,
        backgroundColor: 'transparent',
      },
      after: {
        backgroundColor: colorInPalette.main,
      },
    },

    solid: colorInPalette && {
      main: {
        borderColor: `1px solid ${theme.palette.paper.hover}`,
        backgroundColor: theme.palette.paper.background,
        color: theme.palette.paper.text,
      },

      hover: {
        borderColor: `${colorInPalette.main}`,
        transition: colorInPalette.transition,
        backgroundColor: colorInPalette.main,
        color: colorInPalette.contrastText,
      },
      after: {
        backgroundColor: theme.palette.common.transparent,
      },
    },
  };

  return variants[variant] || variants.solid;
};

/**
 * @function useColorVariant
 *  This function is use to provide, theme, colorscheme, variant
 */
const useColorVariant = (theme, variant, colorScheme, vertical) => {
  if (isObjectEmpty(theme)) {
    theme = defaultTheme;
  }
  return getPropsByVariant({
    variant,
    colorScheme,
    theme,
    vertical,
  });
};

/**
 * @function EmotionTabItem
 * This function is used to wrap the component for style
 */
export const EmotionTabItem = styled(
  Button as React.FC<ButtonPropType<React.ElementType>>,
  {
    shouldForwardProp: (props: string) => {
      return ![
        'errorMessage',
        'colorScheme',
        'borderRadius',
        'maxheight',
        'disable',
        'alignItems',
        'size',
        'vertical',
        'active',
        'variant',
        'as',
      ].includes(props);
    },
  }
)(
  ({
    overrideStyle,
    theme,
    variant,
    colorScheme,
    active,
    disable,
    vertical,
  }: TabItemPropType & {
    overrideStyle?: PropTypes['style'];
    theme?: Theme;
  }) => {
    if (isObjectEmpty(theme)) {
      theme = defaultTheme;
    }
    return {
      display: vertical ? 'flex' : 'inline-flex',
      width: vertical ? '100%' : 'auto',
      padding: 20,
      border: 0,
      borderRadius: 0,
      position: 'relative' as Property.Position,
      '> *': {
        pointerEvents: 'none',
      },
      ...(colorScheme &&
        useColorVariant(theme, variant, colorScheme, vertical).main),
      '&:hover': {
        ...(colorScheme &&
          useColorVariant(theme, variant, colorScheme, vertical).hover),
        '&::after': {
          ...(!vertical &&
            colorScheme &&
            useColorVariant(theme, variant, colorScheme, vertical).after),
        },
        '&::before': {
          content: vertical && `""`,
          position: 'absolute',
          height: '100%',
          right: 0,
          top: 0,
          bottom: 0,
          width: 2,
          ...(colorScheme &&
            useColorVariant(theme, variant, colorScheme, vertical).after),
          ...(active && {
            ...(colorScheme &&
              useColorVariant(theme, variant, colorScheme, vertical).after),
          }),
        },
      },
      '&::before': {
        content: vertical && `""`,
        position: 'absolute',
        height: '100%',
        right: 0,
        top: 0,
        bottom: 0,
        width: 2,

        ...(active && {
          ...(colorScheme &&
            useColorVariant(theme, variant, colorScheme, vertical).after),
        }),
      },
      ...(active && {
        ...(colorScheme &&
          useColorVariant(theme, variant, colorScheme, vertical).hover),
      }),
      '&::after': {
        content: `""`,
        position: 'absolute',
        height: 2,
        bottom: -1,
        left: 0,
        right: 0,
        backgroundColor:
          variant === 'bordered' && `${theme?.palette?.paper?.background}`,

        ...(!vertical &&
          active && {
            ...(colorScheme &&
              useColorVariant(theme, variant, colorScheme, vertical).after),
          }),
      },
      ...(disable && {
        pointerEvents: 'none',
        opacity: theme?.palette?.action?.disableOpacity,
      }),
      ...overrideStyle,
    };
  }
);

export const TabItem = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<TabItemPropType>
>(
  (
    {
      id,
      children,
      className,
      variant,
      disable,
      colorScheme,
      index,
      vertical,
      icon,
      style,
      ...props
    },
    ref
  ) => {
    const tabActiveValue = React.useContext(TabContext);
    return (
      <>
        <EmotionTabItem
          id={id}
          disable={disable}
          className={classNames(className)}
          overrideStyle={style}
          index={index}
          vertical={tabActiveValue?.vertical || vertical}
          variant={(tabActiveValue?.variant || variant) as 'solid'}
          active={index === tabActiveValue?.value}
          colorScheme={tabActiveValue?.colorScheme || colorScheme}
          data-tab-active={
            index === tabActiveValue?.value ? 'active' : 'inactive'
          }
          startIcon={icon}
          myRef={ref}
          {...props}
        >
          {children}
        </EmotionTabItem>
      </>
    );
  }
);

/**
 * defaultProps - To define default values for component props
 */
TabItem.defaultProps = {
  id: 'TabItem_component',
  variant: 'solid',
  colorScheme: 'primary',
  disable: false,
  vertical: false,
};
