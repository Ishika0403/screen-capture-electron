import * as React from "react";
import { cx as classNames } from "@emotion/css";
import { useOnClickOutside } from "../../utils/hooks/useOnOutsideClick";
import { PropTypes } from "../../utils/propType";
import styled from "@emotion/styled";
import { isObjectEmpty } from "../../utils/helpers";
import { defaultTheme, Theme } from "../../context/ThemeProvider";
import { alpha } from "../../utils/Theme/colorManipulator";
import { fontSizes, spacing } from "../../utils/units";
import { useBoolean } from "../../utils/hooks/useBoolean";
import { ChevronDown } from "react-feather";

export interface SelectPropType extends Omit<PropTypes, "onChange"> {
  /**
   * @property {string} placeholder - to define placeholder text
   *
   **/
  placeholder?: string;

  /**
   * @property {number} BorderRadius - To add Input border radius
   *
   **/
  borderRadius?: number;

  /**
   * @property {void} onChange - Trigger an action when click on dropdown
   *
   **/
  onChange?: (val: string) => void;

  /**
   * @property {string} defaultSelected - selected item's id to show in placeholdar currently
   *
   **/
  defaultSelected?: string;

  /**
   * @property {string} ErrorMessage - show error message **/
  errorMessage?: string;

  /**
   * @property {void} Variant - three types of TextArea variation: 'solid - filled layout',  'outline - bordered layout','ghost - to show transculant style layout'
   *
   **/
  variant?: "solid" | "outline" | "ghost";

  /**
   * @property {JSX.Element} startIcon - Add icon at the start of select component
   *
   **/
  startIcon?: JSX.Element;

  /**
   * @property {JSX.Element} endIcon - Add icon at the end of select component
   *
   **/
  endIcon?: JSX.Element;

  /**
   * @property {string | JSX.Element} label - Add caption to provide information of field
   *
   **/
  label?: string | JSX.Element;

  /**
   * @property {void} Size - Three types of Input sizes: 'sm - small view of Input size' , 'md - medium view of Input size' and 'lg - large view of Input size
   *
   **/
  size?: "sm" | "md" | "lg";

  isOpenDropdown?: boolean;
}

interface selectContextType {
  onOptionSelect: (value: string) => void;
  selectedOption: string;
}

const SelectContext = React.createContext<selectContextType | null>(null);
export const useSelectContext = (): selectContextType =>
  React.useContext(SelectContext);

/**
 * @object SelectSizeProps
 * used to define the sizes of Input
 */

const SelectSizeProps = {
  label: {
    sm: {
      fontSize: fontSizes["sm"],
    },
    md: {
      fontSize: fontSizes["md"],
    },
    lg: {
      fontSize: fontSizes["lg"],
    },
  },
  input: {
    sm: {
      fontSize: fontSizes["xs"],
      padding: `${spacing["xs"]} ${spacing["sm"]}`,
    },
    md: {
      fontSize: fontSizes["sm"],
      padding: `${spacing["sm"]} ${spacing["md"]}`,
    },
    lg: {
      fontSize: fontSizes["md"],
      padding: `${spacing["md"]} ${spacing["lg"]}`,
    },
  },
};
/**
 * @function getPropsByVariant
 * used to pass the color scheme, variant and the emotion theme to the select component
 */
const getPropsByVariant = ({ variant, colorScheme, theme }) => {
  const colorInPalette = theme.palette[colorScheme];

  const variants = colorInPalette && {
    outline: {
      main: {
        border: `1px solid ${colorInPalette.main}`,
      },

      hover: {
        border: `1px solid ${alpha(colorInPalette.main, 0.8)}`,
      },
      textContrast: {
        color: theme.palette.typography.primary,
      },
      textOpacity: {
        color: `${alpha(theme.palette.typography.primary, 0.7)}`,
      },
      error: {
        border: `1px solid ${theme.palette.error.main}`,
        color: theme.palette.error.main,
        "&::placeholder": {
          color: theme.palette.error.main,
        },
      },
    },
    solid: {
      main: {
        border: `1px solid ${colorInPalette.main}`,
        backgroundColor: colorInPalette.main,
        color: theme.palette.common.white,
      },
      hover: {
        backgroundColor: alpha(colorInPalette.main, 0.8),
      },
      textContrast: {
        color: theme.palette.common.white,
      },
      textOpacity: {
        color: `${alpha(theme.palette.common.white, 0.9)}`,
      },
      error: {
        backgroundColor: theme.palette.error.main,
        color: colorInPalette.contrastText,
        border: "none",
      },
    },
    ghost: {
      main: {
        border: `1px solid ${colorInPalette.main}`,
        backgroundColor: alpha(colorInPalette.main, 0.2),
        color: colorInPalette.main,
      },
      hover: {
        backgroundColor: alpha(colorInPalette.main, 0.4),
        borderColor: `${colorInPalette.main}`,
      },
      textContrast: {
        color: colorInPalette.main,
      },
      textOpacity: {
        color: `${alpha(colorInPalette.main, 0.7)}`,
      },
      error: {
        backgroundColor: alpha(theme.palette.error.main, 0.2),
        border: `1px solid ${theme.palette.error.main}`,
        color: theme.palette.error.main,
      },
    },
  };

  return colorInPalette && variants[variant];
};

/**
 * This component is a root Emotion component for the Select component
 */
const EmotionSelectContainer = styled("div")(
  /**
   * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
   */
  ({ overrideStyle }: { overrideStyle: PropTypes["style"] }) => ({
    width: "100%",
    ...overrideStyle,
  })
);

/**
 *
 * This component is a wrapper for selection and options
 */
const EmotionSelectContainerWrapper = styled("div")(() => ({
  position: "relative",
}));

/**
 * @function useColorVariant
 *  This function is used to provide, theme, colorscheme, variant
 */
const useColorVariant = (theme, variant, colorScheme) => {
  if (isObjectEmpty(theme)) {
    theme = defaultTheme;
  }
  return getPropsByVariant({
    variant,
    colorScheme,
    theme,
  });
};
/**
 * @type StyledSelectInputProps
 */
type StyledSelectInputProps = {
  theme?: Theme;
} & Partial<SelectPropType>;
/**
 * Selection component
 */
const EmotionSelectInput = styled("div")(
  ({
    theme,
    errorMessage,
    colorScheme,
    variant,
    size,
    ...props
  }: StyledSelectInputProps) => {
    if (isObjectEmpty(theme)) {
      theme = defaultTheme;
    }
    const fontSizeBySize = SelectSizeProps?.input[size]?.fontSize;
    const paddingBySize = SelectSizeProps?.input[size]?.padding;
    return {
      backgroundColor: "transparent",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      padding: SelectSizeProps.input.md.padding,
      fontSize: SelectSizeProps.input.md.fontSize,
      border: theme?.palette?.paper?.border,
      "&::placeholder": {
        color: "#5555",
      },
      color: `${theme?.palette?.paper?.text}`,
      ...(colorScheme && useColorVariant(theme, variant, colorScheme)?.main),

      "&:focus": {
        border: "1px solid #d81313",
      },
      cursor: "pointer",

      ...(props.disable && {
        opacity: 0.6,
        pointerEvents: "none",
      }),
      ...(errorMessage && {
        border: `1px solid ${theme?.palette?.error?.main}`,
        color: theme?.palette?.error?.main,
        ...useColorVariant(theme, variant, colorScheme)?.error,
      }),
      ...(paddingBySize && { padding: paddingBySize }),
      ...(fontSizeBySize && { fontSize: fontSizeBySize }),
    };
  }
);

/**
 * Selection text component
 */
const EmotionSelectText = styled("span")(
  ({
    theme,
    variant,
    colorScheme,
    errorMessage,
    size,
    defaultSelected,
  }: {
    errorMessage: string;
    theme?: Theme;
    colorScheme;
    size: SelectPropType["size"];
    variant: SelectPropType["variant"];
    defaultSelected: SelectPropType["defaultSelected"];
  }) => {
    if (isObjectEmpty(theme)) {
      theme = defaultTheme;
    }

    return {
      fontSize: SelectSizeProps?.input[size]?.fontSize,
      display: "inline-flex",
      minWidth: 0,
      overflow: "hidden",
      whiteSpace: "nowrap",
      flex: 1,
      color: defaultSelected
        ? theme?.palette?.typography?.primary
        : `${alpha(theme?.palette?.paper?.text, 0.7)}`,
      ...(colorScheme &&
        (defaultSelected
          ? useColorVariant(theme, variant, colorScheme)?.textContrast
          : useColorVariant(theme, variant, colorScheme)?.textOpacity)),
      ...(errorMessage && {
        color: variant === "solid" ? "#fff" : theme?.palette?.error?.main,
        "&::placeholder": {
          color: theme?.palette?.error?.main,
        },
      }),
    };
  }
);

enum MarginDirection {
  left = "Left",
  right = "Right",
}

/**
 * Icon component
 */
const EmotionSelectIcon = styled("div")(
  ({ marginSide }: { marginSide: MarginDirection }) => ({
    margin: 0,
    [`margin${marginSide}`]: 10,
    display: "inline-flex",
    flexShrink: 0,
  })
);

/**
 * @type StyledSelectLabelProps
 */
type StyledSelectLabelProps = {
  theme?: Theme;
  errorMessage?: string;
} & Partial<SelectPropType>;

/**
 * @function EmotionSelectLabel
 * used to wrap the Label Item for style
 */
export const EmotionSelectLabel = styled.label(
  ({ theme, errorMessage, size }: StyledSelectLabelProps) => {
    return {
      paddingBottom: "10px",
      fontSize: SelectSizeProps?.label[size]?.fontSize,
      display: "inline-flex",
      color:
        errorMessage && errorMessage !== ""
          ? theme?.palette?.error?.main
          : theme?.palette?.typography?.primary,
    };
  }
);

/**
 * Select options component
 */
const EmotionSelectOptions = styled("div", {
  shouldForwardProp: (props: string) => {
    return ![
      "errorMessage",
      "colorScheme",
      "borderRadius",
      "maxheight",
      "scrollable",
      "disable",
      "alignItems",
      "as",
    ].includes(props);
  },
})(({ theme }) => {
  if (isObjectEmpty(theme)) {
    theme = defaultTheme;
  }

  return {
    position: "absolute",
    top: "100%",
    width: "100%",
    padding: 0,
    margin: 0,
    marginTop: 5,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    zIndex: 1,
    left: 0,
    right: 0,
    borderRadius: "5px",
    background: "#fff",
    li: {
      borderRadius: 0,
    },

    "li:last-child": {
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    },
    "li:first-of-type": {
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
    },
  };
});

/**
 * Select Error component
 */
const EmotionSelecErrorBox = styled("div")(({ theme }: { theme?: Theme }) => {
  if (isObjectEmpty(theme)) {
    theme = defaultTheme;
  }
  return {
    color: theme?.palette.error.main,
    fontSize: "14px",
    lineHeight: "14px",
    marginTop: "5px",
    fontFamily: "sans-serif",
  };
});

/**
 * it returns icon as jsx element
 */

const getDropdownIcon = (
  icon: JSX.Element,
  marginSide: MarginDirection
): JSX.Element => {
  return <EmotionSelectIcon marginSide={marginSide}>{icon}</EmotionSelectIcon>;
};

/**
 * Select Component
 */
export const Select = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<SelectPropType>
>(
  (
    {
      placeholder,
      onChange,
      defaultSelected: selected,
      errorMessage,
      className,
      style,
      disable,
      colorScheme,
      variant,
      children,
      startIcon,
      endIcon,
      size,
      as,
      label,
      isOpenDropdown,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isDropdownOpen, { off: closeDropdown, toggle: toggelDropdown }] =
      useBoolean(false);
    const elementRef = React.useRef<HTMLDivElement | null>(null);

    const [selectedOption, setSelectedOption] = React.useState(selected); //initial state  for selected option

    useOnClickOutside(elementRef, closeDropdown);

    /**
     * @function function to find selected option
     *
     */
    const onOptionSelect = (value: string) => {
      if (selectedOption !== value) {
        setSelectedOption(value);
        onChange(value);

      }
      closeDropdown();
    };
    //combining our states to pass as value for our provider
    const selectState = {
      onOptionSelect,
      selectedOption,
    };

    React.useEffect(() => {
      if (isOpenDropdown) {
        closeDropdown();
      }
    }, [isOpenDropdown, closeDropdown]);


    React.useEffect(() => {
      setSelectedOption(selected);
    }, [selected]);

    const onToggleOptionClick = (e) => {
      if (isOpenDropdown) {
        onClick(e);
      }
      toggelDropdown();
    };
    return (
      <EmotionSelectContainer
        className={classNames(className)}
        overrideStyle={style}
        ref={elementRef}
        as={as}
      >
        <div data-content={errorMessage ? "data-error" : "data-content"}>
          {label && (
            <EmotionSelectLabel size={size} errorMessage={errorMessage}>
              {label}
            </EmotionSelectLabel>
          )}
          <EmotionSelectContainerWrapper
            ref={ref}
            data-selected={selectedOption ? "data-selected" : "data-unselected"}
          >
            <EmotionSelectInput
              aria-selected={selectedOption ? true : false}
              data-select-input="select-input"
              data-options={isDropdownOpen ? true : false}
              variant={variant}
              colorScheme={colorScheme}
              disable={disable}
              onClick={onToggleOptionClick}
              errorMessage={errorMessage}
              size={size}
              {...props}
            >
              {startIcon && getDropdownIcon(startIcon, MarginDirection.right)}
              <EmotionSelectText
                colorScheme={colorScheme}
                variant={variant}
                size={size}
                defaultSelected={selectedOption}
                errorMessage={errorMessage}
              >
                {selectedOption ? selectedOption : placeholder}
              </EmotionSelectText>

              {endIcon && getDropdownIcon(endIcon, MarginDirection.left)}
            </EmotionSelectInput>
            <SelectContext.Provider value={selectState}>
              {isDropdownOpen && (
                <EmotionSelectOptions data-option-selected={"option"}>
                  {children}
                </EmotionSelectOptions>
              )}
            </SelectContext.Provider>
          </EmotionSelectContainerWrapper>
        </div>
        {errorMessage && (
          <EmotionSelecErrorBox data-invalid={true}>
            {errorMessage}
          </EmotionSelecErrorBox>
        )}
      </EmotionSelectContainer>
    );
  }
);

/**
 * defaultProps - To define default values for component props
 */
Select.defaultProps = {
  placeholder: "Please Select",
  endIcon: <ChevronDown size={20} />,
  size: "md",
  colorScheme: "primary",
};
