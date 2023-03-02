import styled from "@emotion/styled";
import { cx as classNames } from "@emotion/css";
import React from "react";
import isPropValid from "@emotion/is-prop-valid";
import { defaultTheme, Theme } from "../../context/ThemeProvider";
import { fontSizes } from "../../utils/units";
import { isObjectEmpty } from "../../utils/helpers";
import { PropTypes } from "../../utils/propType";
import { TableContext } from "./tabelContext";

interface TablePropType
    extends Omit<
        PropTypes<HTMLTableElement>,
        "as" | "onClick" | "colorScheme"
    > {
    /**
     * Add TableCell and TableRow from the outside to show header of the table
     * @property {JSX.Element | React.ReactNode}
     */
    header?: JSX.Element | React.ReactNode;

    /**
     * Add TableCell and TableRow from the outside to show body content of the table
     * @property {JSX.Element | React.ReactNode}
     */
    body?: JSX.Element | React.ReactNode;

    /**
     * Add custom max height
     * @property {string}
     */
    maxHeight?: string;

    /**
     * To define a string that labels the current element
     * @property {string}
     */
    "aria-label"?: string;

    /**
     * To define a string that describe the current element
     * @property {string}
     */
    "aria-describedby"?: string;

    /**
     * Variation for layout of table : bordered - show border style layout and  striped -  show odd even color layout
     * @property {string}
     */
    variant?: "bordered" | "striped";

    /**
     * To add diffrent sizes
     * @property {string}
     */
    size: "sm" | "md" | "lg";
}
/**
 * @function tableSizeVariants
 * This function is to get the font sizes on the base of size props
 */
const tableSizeVariants = {
    sm: {
        fontSize: fontSizes["sm"],
    },
    md: {
        fontSize: fontSizes["md"],
    },
    lg: {
        fontSize: fontSizes["lg"],
    },
};
/**
 * @function tableStyleVariants
 * This function is to get variant prop and return style on bases of that
 */
const tableStyleVariants = (variant, theme) => {
    const variants = {
        bordered: {
            main: {
                border: `${theme.palette.paper.border}`,
                cursor: "pointer",
                "& thead": {
                    "& th": {
                        border: "0",
                        borderBottom: `${theme.palette.paper.border}`,
                        padding: "15px",
                    },
                    "& td": {
                        border: "0",
                        borderBottom: `${theme.palette.paper.border}`,
                    },
                },
                "& tbody": {
                    "& th": {
                        border: "0",
                        borderBottom: `${theme.palette.paper.border}`,
                    },
                    "& td": {
                        border: "0",
                        borderBottom: `${theme.palette.paper.border}`,
                        padding: "15px",
                    },
                    "& tr": {
                        "&:hover": {
                            backgroundColor: theme.palette.paper.hover,
                        },
                    },
                },
            },
        },
        striped: {
            main: {
                border: `${theme.palette.paper.border}`,
                "& thead": {
                    "& th": {
                        border: "0",
                        padding: "15px",
                        borderBottom: `${theme.palette.paper.border}`,
                    },
                    "& td": {
                        border: "0",
                    },
                },
                "& tbody": {
                    "& tr": {
                        "&:nth-of-type(odd)": {
                            backgroundColor: theme.palette.paper.background,
                            color: theme.palette.paper.text,
                        },
                        "&:nth-of-type(even)": {
                            backgroundColor: "transparent",
                        },
                    },
                    "& th": {
                        border: "0",
                    },
                    "& td": {
                        border: "0",
                        padding: "15px",
                        borderBottom: `none`,
                    },
                },
            },
        },
    };

    return variants[variant] || variants.bordered;
};

/**
 * @function TableWrapperProps
 * This function is to add the additional props
 */
interface TableWrapperProps extends TablePropType {
    overrideStyle?: PropTypes["style"];
}

/**
 * @function EmotionTextAreaError
 * This function is used to wrap the error message for style
 */
export const EmotionTableWrapper = styled.div(
    (props: Partial<TableWrapperProps>) => ({
        overflowX: "auto",
        ...props.overrideStyle,
    }),
);

/**
 * @function TableRootProps
 * This function is to add the additional props
 */
interface TableRootProps extends TablePropType {
    theme?: Theme;
    overrideStyle?: PropTypes["style"];
}
/**
 * @function TableRootProps
 * This function to get all props and return style on bases of that
 */
const EmotionTable = styled("table", {
    shouldForwardProp: (props: string) => isPropValid(props),
})((props: Partial<TableRootProps>) => {
    if (isObjectEmpty(props.theme)) {
        props.theme = defaultTheme;
    }
    const propsByVariant = tableStyleVariants(props.variant, props.theme);
    return {
        maxHeight: props.maxHeight,
        textAlign: "left",
        width: "100%",
        display: "table",
        borderCollapse: "collapse",
        fontSize: tableSizeVariants[props.size]?.fontSize,
        ...(propsByVariant && propsByVariant.main),
    };
});
/**
 * @function Table
 * Main table component
 */
export const Table = React.forwardRef<
    HTMLTableElement,
    React.PropsWithChildren<TablePropType>
>(
    (
        { header, body, style, className, variant, size, maxHeight, ...props },
        ref,
    ) => {
        const table = React.useMemo(
            () => ({ variant, size, maxHeight }),
            [variant, size, maxHeight],
        );
        return (
            <>
                <TableContext.Provider value={table}>
                    <EmotionTableWrapper overrideStyle={style}>
                        <EmotionTable
                            ref={ref}
                            variant={variant}
                            size={size}
                            maxHeight={maxHeight}
                            {...props}
                            className={classNames(className)}
                        >
                            <thead>{header}</thead>
                            <tbody>{body}</tbody>
                        </EmotionTable>
                    </EmotionTableWrapper>
                </TableContext.Provider>
            </>
        );
    },
);
/** Default props for table */
Table.defaultProps = {
    id: "Table",
    "aria-label": "mainTable",
    maxHeight: "500px",
    variant: "bordered",
    size: "lg",
};
