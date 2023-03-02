import styled from "@emotion/styled";
import { isObjectEmpty } from "../../utils/helpers";
import React from "react";
import { defaultTheme, Theme } from "../../context/ThemeProvider";
import { Size } from "../../utils/theme";
import { Property } from "../../utils/types";
import { spacing, fontSizes } from "../../utils/units";
import { PropTypes } from "../../utils/propType";
import { cx as classNames } from "@emotion/css";
interface TagPropType extends Omit<PropTypes, "onClick" | "as" | "disable"> {
    /**
     * Add custom BorderRadius in tag should be in px or %
     * @property {Property.BorderRadius}
     **/
    borderRadius?: Property.BorderRadius;

    /**
     * Tag sizes can be of 3 types: 'sm - small view of tag size' , 'md - medium view of tag size' and 'lg - large view of tag size
     * @property {string}
     * **/
    size: Size;

    /**
     * Add custom icon before text in tag component
     * @property {JSX.Element}
     * **/
    startIcon?: JSX.Element;

    /**
     * Add custom icon after text in tag component
     * @property {JSX.Element}
     *
     **/
    endIcon?: JSX.Element;

    /**
     * Add custom icon at the end of tag component to close tag
     * @property {JSX.Element}
     **/
    closeIcon?: JSX.Element;

    /**
     * Variation for layout of  Tag: contained - filled layout, outline -  bordered layout
     * @property {string}
     **/
    variant: "contained" | "outline";
    /**
     * To provide the spacing between icon and element content.
     * @property {string}
     *
     */
    spaceBetween?: string;
}

/**
 * @function tagSizeProps
 * This function is used to pass the Button Size
 */
const tagSizeProps = {
    sm: {
        fontSize: fontSizes["xs"],
        padding: `${spacing["xxs"]} ${spacing["sm"]}`,
    },
    md: {
        fontSize: fontSizes["sm"],
        padding: `${spacing["xxs"]} ${spacing["md"]}`,
    },
    lg: {
        fontSize: fontSizes["md"],
        padding: `${spacing["xs"]} ${spacing["lg"]}`,
    },
};

/**
 * @function getPropsByVariant
 * This function is used to pass the color scheme, variant and the emotion theme
 */
const getPropsByVariant = ({ variant, colorScheme, theme }) => {
    const colorInPalette = theme.palette[colorScheme];
    const variants = {
        contained: colorInPalette && {
            main: {
                backgroundColor: colorInPalette.main,
                border: `1px solid ${colorInPalette.main}`,
                color: colorInPalette.contrastText,
            },
        },
        outline: colorInPalette && {
            main: {
                border: `1px solid ${colorInPalette.main}`,
                color: colorInPalette.main,
            },
        },
    };

    return variants[variant] || variants.contained;
};
/**
 * @function StyledTagProps
 * This function that to pass additional props
 */
type StyledTagProps = {
    theme?: Theme;
    overrideStyle?: PropTypes["style"];
} & Partial<TagPropType>;
/**
 * @function StyledBadge
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledTag = ({
    colorScheme = "primary",
    variant,
    borderRadius,
    theme,
    size,
    overrideStyle,
}: StyledTagProps) => {
    if (isObjectEmpty(theme)) {
        theme = defaultTheme;
    }
    const fontSizeBySize = tagSizeProps[size]?.fontSize;
    const paddingBySize = tagSizeProps[size]?.padding;
    const propsByVariant = getPropsByVariant({
        variant,
        theme,
        colorScheme,
    });
    return {
        display: "inline-flex",
        textDecoration: "none",
        padding: tagSizeProps.md.padding,
        fontSize: tagSizeProps.md.fontSize,
        borderRadius: borderRadius ?? theme?.shape?.borderRadius,
        textAlign: "center",
        color: "grey",
        border: "1px solid red",
        transition: "all 0.5s ease",
        alignItems: "center",
        cursor: "default",
        ...(propsByVariant && propsByVariant.main),
        ...(paddingBySize && { padding: paddingBySize }),
        ...(fontSizeBySize && { fontSize: fontSizeBySize }),
        ...overrideStyle,
    };
};

/**
 * @MarginDirection Constant used for declaration of margin to image
 **/
enum MarginDirection {
    left = "Left",
    right = "Right",
}
/**
 * @function StyledTagImage
 * This function that takes all props and theme(passed by the emotion itself) as a argument returns object of its types
 */
const StyledTagImage = ({
    marginSide,
    spaceBetween,
}: {
    marginSide: MarginDirection;
    spaceBetween: string;
}) => {
    return {
        margin: 0,
        [`margin${marginSide}`]: spaceBetween || 10,
        width: "20px",
    };
};
/**
 * @function EmotionTagImage
 * This function is used to wrap the right icon style of tag
 */
export const EmotionTagImage = styled("span")(StyledTagImage);

/**
 * 
 

 * @description Takes image as a JSX.Element.
 */
const getTagImage = (
    icon: JSX.Element,
    marginSide: MarginDirection,
    spaceBetween: string,
): JSX.Element => (
    <EmotionTagImage marginSide={marginSide} spaceBetween={spaceBetween}>
        {icon}
    </EmotionTagImage>
);

/**
 * @function EmotionTag
 * This function is used to wrap the component for style
 */
export const EmotionTag = styled("div")(StyledTag);

/**
 * @function Tag
 * This function is used to create Tag Component
 */
export const Tag = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<TagPropType>
>(
    (
        {
            children,
            colorScheme,
            variant,
            startIcon,
            className,
            endIcon,
            closeIcon,
            id,
            style,
            spaceBetween,
            ...props
        },
        ref,
    ) => {
        return (
            <EmotionTag
                colorScheme={colorScheme}
                variant={variant}
                borderRadius={"50px"}
                overrideStyle={style}
                {...props}
                ref={ref}
                id={id}
                className={classNames(className)}
                spaceBetween={spaceBetween}
            >
                {startIcon &&
                    getTagImage(startIcon, MarginDirection.right, spaceBetween)}
                {children}
                {endIcon &&
                    getTagImage(endIcon, MarginDirection.left, spaceBetween)}
                {closeIcon &&
                    getTagImage(closeIcon, MarginDirection.left, spaceBetween)}
            </EmotionTag>
        );
    },
);

/**
 * defaultProps - To define default values for component props
 */
Tag.defaultProps = {
    variant: "contained",
    colorScheme: "primary",
    borderRadius: "20px",
    size: "md",
    id: "tag_component",
};
