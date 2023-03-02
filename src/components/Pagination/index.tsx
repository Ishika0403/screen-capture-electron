import * as React from "react";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "react-feather";
import { defaultTheme, Theme, useThemeMode } from "../../context/ThemeProvider";
import { isObjectEmpty } from "../../utils/helpers";
import { cx as classNames } from "@emotion/css";
import { PropTypes } from "../../utils/propType";
import styled from "@emotion/styled";
import { alpha } from "../../utils/Theme/colorManipulator";
import { Text } from "../Text";
import { BreakPoints, fontSizes, PaginationSize } from "../../utils/units";

export interface PaginationPropType extends PropTypes {
    /**
     * To set Current active page
     * @property {number}
     **/
    currentPage: number;

    /**
     * To set total number of pages
     * @property {number}
     **/
     totalPages: number;

     /**
      * The number of pages shown
      * @property {number}
      **/
     pageSize?: number;

    /**
     * event to get the next page
     * @property {void}
     **/
    goToNextPage: () => void;

    /**
     * Event to get the previous page
     * @property {void}
     **/
    goToPreviousPage: () => void;

    /** event to change  page */
    changePage: (pageIndex: number) => void;

    /**
     * variants for pagination
     * @property {string}
     **/
    variant?: "solid" | "outline" | "ghost";

    /**
     * Size variants for pagination
     * @property {string}
     **/
    size?: "small" | "medium" | "large";

    /**
     * to add icon for jumping on first page
     * @property {JSX.Element}
     **/
    firstIcon?: JSX.Element;

    /**
     * to add icon for jumping on last page
     * @property {JSX.Element}
     **/
    lastIcon?: JSX.Element;

    /**
     * to add icon for going to previous page
     * @property {JSX.Element}
     **/
    prevIcon?: JSX.Element;

    /**
     * to add icon for going to next page
     * @property {JSX.Element}
     **/
    nextIcon?: JSX.Element;
}

/**
 * @function getPropsByVariant
 * This function is used to pass the color scheme, variant and the emotion theme
 */

const getPropsByVariant = ({ variant, colorScheme, theme }) => {
    const colorInPalette = theme.palette[colorScheme];
    const variants = {
        solid: colorInPalette && {
            main: {
                color: colorInPalette.main,
                border: "none",
            },

            hover: {
                backgroundColor: alpha(
                    theme.palette.paper.hover,
                    theme.palette.action.hoverOpacity,
                ),
                color: theme.palette.typography?.primary,
            },
            selected: {
                backgroundColor: colorInPalette.main,
                color: colorInPalette.contrastText,
                "&:hover": {
                    backgroundColor: colorInPalette.main,
                    color: colorInPalette.contrastText,
                },
            },
        },
        outline: colorInPalette && {
            main: {
                border: `1px solid ${alpha(theme.palette.action.hover, 0.5)}`,
                backgroundColor: theme.palette.common.transparent,
                color: theme.palette.typography.primary,
            },
            hover: {
                backgroundColor: alpha(
                    theme.palette.action.hover,
                    theme.palette.action.hoverOpacity,
                ),
                "&:hover": {
                    backgroundColor: alpha(
                        theme.palette.action.hover,
                        theme.palette.action.hoverOpacity,
                    ),
                },
            },
            selected: {
                backgroundColor: theme.palette.common.transparent,
                border: `1px solid ${colorInPalette.main}`,
                color: colorInPalette.main,
                "&:hover": {
                    backgroundColor: theme.palette.common.transparent,
                },
            },
        },
        ghost: {
            main: {
                backgroundColor: "transparent",
                color: theme.palette.typography.primary,
                border: `1px solid ${alpha(theme.palette.action.hover, 0.5)}`,
            },
            hover: {
                backgroundColor: alpha(
                    theme.palette.action.hover,
                    theme.palette.action.hoverOpacity,
                ),
            },
            selected: {
                backgroundColor: alpha(
                    colorInPalette.main,
                    theme.palette.action.hoverOpacity,
                ),
                "&:hover": {
                    backgroundColor: alpha(
                        colorInPalette.main,
                        theme.palette.action.hoverOpacity,
                    ),
                },
                color: theme.palette.typography?.primary,
                borderColor: colorInPalette.main,
            },
        },
    };

    return variants[variant] || variants.solid;
};

/**
 * @function tooltipSizeProps
 * This function is used to change sizes
 */

const propsBySize = {
    small: {
        fontSize: fontSizes["xsmall"],
        width: PaginationSize.small,
        height: PaginationSize.small,
    },

    medium: {
        fontSize: fontSizes["small"],
        width: PaginationSize.medium,
        height: PaginationSize.medium,
    },

    large: {
        fontSize: fontSizes["medium"],
        width: PaginationSize.large,
        height: PaginationSize.large,
    },
};

/**
 * @function getPaginationRecords
 * Render the output according to the data
 */
const getPaginationRecords = (
    totalPages: number,
    changePage: (index: number) => void,
    selectedIndex: number,
    pageSize: number,
    colorScheme,
    variant,
    size,
    disable,
): JSX.Element[] => {
    return getPaginationOptions(pageSize, selectedIndex, totalPages).map(
        ({ label, value }) => {
            return (
                <EmotionRootLi
                    variant={variant}
                    colorScheme={colorScheme}
                    disable={disable}
                    selected={value === selectedIndex}
                    onClick={() => {
                        value !== selectedIndex && changePage(value);
                    }}
                    size={size}
                    key={label}
                >
                    {label}
                </EmotionRootLi>
            );
        },
    );
};

/**
 * @function getPaginationOptions
 * Logic for pagination genration
 */
const getPaginationOptions = (listLength = 10, currentPage = 0, totalPages) => {
    const offset = Math.ceil(listLength / 2);
    let start = currentPage - offset;
    let end = currentPage + offset;
    start = end - start > listLength ? start + 1 : start;

    if (totalPages <= listLength) {
        start = 0;
        end = totalPages;
    } else if (currentPage <= offset) {
        start = 0;
        end = listLength;
    } else if (currentPage + offset >= totalPages) {
        start = totalPages - listLength;
        end = totalPages;
    }

    return range(start, end).map((value) => ({
        label: value + 1,
        value,
    }));
};

function range(start: number, end: number): number[] {
    return Array.from({ length: end - start }).map((_, i) => i + start);
}

/**
 * @function StyledPaginationProps
 * this fuction is used to add additional props
 */
type StyledPaginationProps = {
    overrideStyle?: PropTypes["style"];
} & Partial<PaginationPropType>;

/**
 * @function EmotionPaginationContainer
 * this fuction is used to take all props and return the styled container
 */
const EmotionPaginationContainer = styled("div")(
    ({ ...props }: StyledPaginationProps) => {
        return {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 50,
            ...props.overrideStyle,
        };
    },
);
/**
 * @function EmotionPaginationLable
 * this fuction is used to diaplay number of pages text
 */
const EmotionPaginationLable = styled(Text)(() => {
    return {
        fontSize: "16px",
        fontFamily: "sans-serif",
        flexShrink: 0,
        marginBottom: 15,
        [`@media ${BreakPoints.mobileL}`]: {
            marginBottom: 0,
        },
    };
});

/**
 * @function EmotionPagination
 * this fuction is used to get all props and return the style for pagination
 */
const EmotionPagination = styled("ul")(() => {
    return {
        margin: 0,
        padding: 0,
        listStyle: "none",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        [`@media ${BreakPoints.mobileL}`]: {
            paddingLeft: "40px",
        },
    };
});
const EmotionRootLi = styled("li")(
    ({
        theme,
        variant,
        colorScheme,
        disable,
        selected,
        size,
    }: {
        theme?: Theme;
        variant?: PaginationPropType["variant"];
        colorScheme?: PropTypes["colorScheme"];
        disable?: PropTypes["disable"];
        selected?: boolean;
        size?: PaginationPropType["size"];
    }) => {
        if (isObjectEmpty(theme)) {
            theme = defaultTheme;
        }
        const propsByVariant = getPropsByVariant({
            variant,
            theme,
            colorScheme,
        });
        const SizeProps = propsBySize[size];
        return {
            userSelect: "none",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: "1px solid rgb(206, 206, 206)",
            margin: " 0 0.2rem",
            color: "#fff",
            transition: "all 200ms ease-in-out",
            fontFamily: "Courier New",
            "&:active,&:hover": {
                ...(propsByVariant && propsByVariant.hover),
            },
            ...SizeProps,
            ...(propsByVariant && propsByVariant.main),
            ...(selected && propsByVariant.selected),
            ...(disable && {
                pointerEvents: "none",
                color: "grey",
                opacity: 0.6,
                "&:hover": {
                    background: "unset",
                    color: theme?.palette?.paper?.hover,
                },
            }),
        };
    },
);

/**
 * @function Pagination
 * this fuction is used to get all props and return the final pagination component
 */

export const Pagination = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<PaginationPropType>
>(
    (
        {
            totalPages,
            goToNextPage,
            goToPreviousPage,
            changePage,
            firstIcon,
            lastIcon,
            prevIcon,
            nextIcon,
            currentPage,
            colorScheme,
            variant,
            pageSize,
            size,
            disable,
            style,
            className,
            id,
        },
        ref,
    ) => {
        const { themeMode } = useThemeMode();
        return (
            <EmotionPaginationContainer
                id={id}
                className={classNames(className)}
                overrideStyle={style}
                ref={ref}
            >
                <EmotionPaginationLable>
                    PAGE {currentPage + 1} OF {totalPages}
                </EmotionPaginationLable>
                <EmotionPagination>
                    <EmotionRootLi
                        colorScheme={colorScheme}
                        variant={variant}
                        disable={currentPage === 0 || disable}
                        onClick={() => changePage(0)}
                        size={size}
                        key="first"
                    >
                        {firstIcon && firstIcon !== null ? (
                            firstIcon
                        ) : themeMode === "light" ? (
                            <ChevronsLeft color="#222" />
                        ) : (
                            <ChevronsLeft color="#fff" />
                        )}
                        {/* first */}
                    </EmotionRootLi>

                    <EmotionRootLi
                        colorScheme={colorScheme}
                        variant={variant}
                        disable={currentPage === 0 || disable}
                        onClick={goToPreviousPage}
                        size={size}
                        key="previous"
                    >
                        {prevIcon && prevIcon !== null ? (
                            prevIcon
                        ) : themeMode === "light" ? (
                            <ChevronLeft color="#222" />
                        ) : (
                            <ChevronLeft color="#fff" />
                        )}
                    </EmotionRootLi>
                    {/**prev */}
                    {getPaginationRecords(
                        totalPages,
                        changePage,
                        currentPage,
                        pageSize,
                        colorScheme,
                        variant,
                        size,
                        disable,
                    )}

                    <EmotionRootLi
                        colorScheme={colorScheme}
                        variant={variant}
                        disable={currentPage === totalPages - 1 || disable}
                        onClick={goToNextPage}
                        size={size}
                        key="next"
                    >
                        {nextIcon && nextIcon !== null ? (
                            nextIcon
                        ) : themeMode === "light" ? (
                            <ChevronRight color="#222" />
                        ) : (
                            <ChevronRight color="#fff" />
                        )}
                    </EmotionRootLi>
                    {/**Next */}

                    <EmotionRootLi
                        colorScheme={colorScheme}
                        variant={variant}
                        disable={currentPage === totalPages - 1 || disable}
                        onClick={() => changePage(totalPages - 1)}
                        size={size}
                        key="last"
                    >
                        {lastIcon && lastIcon !== null ? (
                            lastIcon
                        ) : themeMode === "light" ? (
                            <ChevronsRight color="#222" />
                        ) : (
                            <ChevronsRight color="#fff" />
                        )}
                    </EmotionRootLi>
                    {/**Last */}
                </EmotionPagination>
            </EmotionPaginationContainer>
        );
    },
);

/**
 * defaultProps - To define default values for component props
 */
Pagination.defaultProps = {
    colorScheme: "primary",
    variant: "solid",
    size: "small",
    pageSize: 3,
};
