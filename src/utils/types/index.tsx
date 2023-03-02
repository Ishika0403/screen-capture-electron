import { type } from 'os';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'renderer/store';

/* eslint-disable @typescript-eslint/no-namespace */
export interface FormControlOptions {
  /**
   The form control will be required
   */
  isRequired?: boolean;
  /**
   The form control will be disabled.
   */
  isDisabled?: boolean;
  /**
   *The form control will be invalid.

   */
  isInvalid?: boolean;
  /**
   * The form control will be readonly
   */
  isReadOnly?: boolean;
}

/**
 * typescript
 * Reaplaced  {} with Record<string, unknown>
 */
export type Merge<T, P> = P & Omit<T, keyof P>;

export type UnionStringArray<T extends Readonly<string[]>> = T[number];

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type LiteralUnion<T extends U, U extends any = string> =
  | T
  | (U & { _?: never });

export type AnyFunction<T = any> = (...args: T[]) => any;

export type FunctionArguments<T extends Function> = T extends (
  ...args: infer R
) => any
  ? R
  : never;

export type Dict<T = any> = Record<string, T>;

export type Booleanish = boolean | 'true' | 'false';
export type StringOrNumber = string | number;

export type EventKeys =
  | 'ArrowDown'
  | 'ArrowUp'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Enter'
  | 'Space'
  | 'Tab'
  | 'Backspace'
  | 'Control'
  | 'Meta'
  | 'Home'
  | 'End'
  | 'PageDown'
  | 'PageUp'
  | 'Delete'
  | 'Escape'
  | ' '
  | 'Shift';

/**
 * types for color
 */

type ThemeColor = 'primary' | 'secondary' | 'whiteAlpha' | 'blackAlpha';

type Quote = 'close-quote' | 'no-close-quote' | 'no-open-quote' | 'open-quote';

export type Color = DataType.NamedColor | ThemeColor;

/**
 * CSS - HTML Properties
 */
export type Globals =
  | '-moz-initial'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'unset';

export namespace Property {
  export type Variant = 'contained' | 'outline';
  export type DisplayDirection = 'rtl' | 'ltr';

  /**
   * types for Size
   */
  /**Note- "fluid" is only for Modal and Container component **/
  export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'fluid';

  export type BorderRadius<TLength = (string & {}) | 0> =
    | Globals
    | TLength
    | number
    | (string & {});

  export type Margin<TLength = (string & {}) | 0> =
    | Globals
    | TLength
    | (string & {});

  export type ContentDistribution = 'around' | 'between' | 'evenly' | 'stretch';

  export type ContentList = Quote | 'contents' | (string & {});

  export type ContentPosition = 'center' | 'end' | 'start';

  export type CubicBezierTimingFunction =
    | 'ease'
    | 'ease-in'
    | 'ease-in-out'
    | 'ease-out'
    | (string & {});

  export type AlignContent =
    | DataType.ContentDistribution
    | DataType.ContentPosition
    | 'baseline';

  export type AlignItems = DataType.SelfPosition | 'baseline' | 'stretch';
  export type AlignItem = DataType.AlignPosition | 'baseline' | 'stretch';

  export type AlignSelf =
    | DataType.AlignPosition
    | 'auto'
    | 'baseline'
    | 'normal'
    | 'stretch'
    | (string & {});

  export type FlexDirection =
    | 'row'
    | 'column'
    | 'row-reverse'
    | 'column-reverse';

  export type FlexWrap = Globals | DataType.ContentWrap;
  export type whiteSpace = 'nowrap' | 'break-spaces' | 'normal';
  export type wordBreak = 'break-word' | 'break-all';
  export type FontStyle =
    | Globals
    | 'italic'
    | 'normal'
    | 'oblique'
    | (string & {});

  export type Height<TLength = (string & {}) | 0> =
    | Globals
    | TLength
    | '-moz-max-content'
    | '-moz-min-content'
    | 'auto'
    | 'max-content'
    | 'min-content'
    | (string & {});

  export type JustifyContent =
    | DataType.ContentDistribution
    | DataType.ContentPosition;

  export type JustifyElemnent =
    | DataType.ContentJustification
    | DataType.AlignPosition;

  export type JustifyItems =
    | Globals
    | DataType.SelfPosition
    | 'baseline'
    | 'left'
    | 'legacy'
    | 'normal'
    | 'right'
    | 'stretch'
    | (string & {});

  export type JustifySelf =
    | Globals
    | DataType.SelfPosition
    | 'auto'
    | 'baseline'
    | 'left'
    | 'normal'
    | 'right'
    | 'stretch'
    | (string & {});
  export type FlexBasis = Globals | 'auto' | 'number' | (string & {});

  export type FlexShrink = Globals | (number & {});

  export type FlexGrow = Globals | (number & {});
  export type TooltipPlacement =
    | 'left'
    | 'leftEnd'
    | 'leftStart'
    | 'bottom'
    | 'bottomEnd'
    | 'bottomStart'
    | 'right'
    | 'rightEnd'
    | 'rightStart'
    | 'top'
    | 'topEnd'
    | 'topStart'
    | (string & {});
  export type MaxHeight<TLength = (string & {}) | 0> =
    | Globals
    | TLength
    | '-moz-max-content'
    | '-moz-min-content'
    | '-webkit-max-content'
    | '-webkit-min-content'
    | 'max-content'
    | 'min-content'
    | 'none'
    | (string & {});

  export type MaxWidth<TLength = (string & {}) | 0> =
    | Globals
    | TLength
    | '-moz-max-content'
    | '-moz-min-content'
    | '-webkit-max-content'
    | '-webkit-min-content'
    | 'intrinsic'
    | 'max-content'
    | 'min-content'
    | 'none'
    | (string & {});

  export type MinHeight<TLength = (string & {}) | 0> =
    | Globals
    | TLength
    | '-moz-max-content'
    | '-moz-min-content'
    | '-webkit-max-content'
    | '-webkit-min-content'
    | 'auto'
    | 'max-content'
    | 'min-content'
    | (string & {});

  export type MinWidth<TLength = (string & {}) | 0> =
    | Globals
    | TLength
    | '-moz-max-content'
    | '-moz-min-content'
    | '-webkit-max-content'
    | '-webkit-min-content'
    | 'auto'
    | 'intrinsic'
    | 'max-content'
    | 'min-content'
    | 'min-intrinsic'
    | (string & {});

  export type Width<TLength = (string & {}) | 0> =
    | Globals
    | TLength
    | '-moz-max-content'
    | '-moz-min-content'
    | '-webkit-max-content'
    | 'auto'
    | 'intrinsic'
    | 'max-content'
    | 'min-content'
    | 'min-intrinsic'
    | (string & {});

  export type Opacity = Globals | (string & {}) | (number & {});

  export type OverflowX =
    | Globals
    | '-moz-hidden-unscrollable'
    | 'auto'
    | 'clip'
    | 'hidden'
    | 'scroll'
    | 'visible';

  export type OverflowY =
    | Globals
    | '-moz-hidden-unscrollable'
    | 'auto'
    | 'clip'
    | 'hidden'
    | 'scroll'
    | 'visible';

  export type Padding<TLength = (string & {}) | 0> =
    | Globals
    | TLength
    | (string & {});

  export type Position =
    | Globals
    | '-webkit-sticky'
    | 'absolute'
    | 'fixed'
    | 'relative'
    | 'static'
    | 'sticky';

  export type Placement = Globals | 'top' | 'bottom' | 'left' | 'right';
  export type Alignment = 'middle' | 'top' | 'bottom' | 'baseline';
  export type LinkRelation = 'nofollow' | 'nopener' | 'noopener' | 'external';
  export type Redirection = '_self' | '_blank' | '_parent' | '_top';
  export type ModalPosition =
    | 'middle'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight';
  export type Tag =
    | 'div'
    | 'p'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'span'
    | 'ins'
    | 'del';

  export type Resize = 'horizontal' | 'vertical' | 'auto' | 'none';
  export type variantDvider = 'solid' | 'dashed' | 'dotted';

  export type TextAlign = 'center' | 'justify' | 'left' | 'right';

  export type TextDecoration<TLength = (string & {}) | 0> =
    | Globals
    | Color
    | TLength
    | 'auto'
    | 'blink'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'from-font'
    | 'grammar-error'
    | 'line-through'
    | 'none'
    | 'overline'
    | 'solid'
    | 'spelling-error'
    | 'underline'
    | 'wavy'
    | (string & {});

  /** Text */
  export type TextDecorationLine =
    | Globals
    | 'blink'
    | 'grammar-error'
    | 'line-through'
    | 'none'
    | 'overline'
    | 'spelling-error'
    | 'underline'
    | (string & {});

  export type TextDecorationSkip =
    | Globals
    | 'box-decoration'
    | 'edges'
    | 'leading-spaces'
    | 'none'
    | 'objects'
    | 'spaces'
    | 'trailing-spaces'
    | (string & {});

  export type TextDecorationSkipInk = Globals | 'all' | 'auto' | 'none';

  export type TextDecorationStyle =
    | Globals
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'solid'
    | 'wavy';

  export type TextDecorationThickness<TLength = (string & {}) | 0> =
    | Globals
    | TLength
    | 'auto'
    | 'from-font'
    | (string & {});

  export type TextEmphasis =
    | Globals
    | Color
    | 'circle'
    | 'dot'
    | 'double-circle'
    | 'filled'
    | 'none'
    | 'open'
    | 'sesame'
    | 'triangle'
    | (string & {});

  export type TextEmphasisColor = Globals | Color;

  export type TextEmphasisPosition = Globals | (string & {});

  export type TextEmphasisStyle =
    | Globals
    | 'circle'
    | 'dot'
    | 'double-circle'
    | 'filled'
    | 'none'
    | 'open'
    | 'sesame'
    | 'triangle'
    | (string & {});

  export type TextIndent<TLength = (string & {}) | 0> =
    | Globals
    | TLength
    | (string & {});

  export type TextJustify =
    | Globals
    | 'auto'
    | 'inter-character'
    | 'inter-word'
    | 'none';

  export type TextOrientation = Globals | 'mixed' | 'sideways' | 'upright';

  export type TextOverflow = Globals | 'clip' | 'ellipsis' | (string & {});

  export type TextRendering =
    | Globals
    | 'auto'
    | 'geometricPrecision'
    | 'optimizeLegibility'
    | 'optimizeSpeed';

  export type TextShadow = Globals | 'none' | (string & {});

  export type TextSizeAdjust = Globals | 'auto' | 'none' | (string & {});

  export type TextTransform =
    | Globals
    | 'capitalize'
    | 'lowercase'
    | 'uppercase';

  export type TextUnderlineOffset<TLength = (string & {}) | 0> =
    | Globals
    | TLength
    | 'auto'
    | (string & {});

  export type TextUnderlinePosition =
    | Globals
    | 'auto'
    | 'from-font'
    | 'left'
    | 'right'
    | 'under'
    | (string & {});

  export type DisplayInside =
    | '-ms-flexbox'
    | '-ms-grid'
    | '-webkit-flex'
    | 'flex'
    | 'flow'
    | 'flow-root'
    | 'grid'
    | 'ruby'
    | 'table';

  export type ContentJustification =
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | 'stretch'
    | 'flex-end'
    | 'flex-start'
    | 'center';
}

/**
 * DataType
 */
declare namespace DataType {
  type AbsoluteSize =
    | 'large'
    | 'medium'
    | 'small'
    | 'x-large'
    | 'x-small'
    | 'xx-large'
    | 'xx-small'
    | 'xxx-large';

  type AnimateableFeature = 'contents' | 'scroll-position' | (string & {});

  type Attachment = 'fixed' | 'local' | 'scroll';

  type BgPosition<TLength> =
    | TLength
    | 'bottom'
    | 'center'
    | 'left'
    | 'right'
    | 'top'
    | (string & {});

  type BgSize<TLength> = TLength | 'auto' | 'contain' | 'cover' | (string & {});

  type BlendMode =
    | 'color'
    | 'color-burn'
    | 'color-dodge'
    | 'darken'
    | 'difference'
    | 'exclusion'
    | 'hard-light'
    | 'hue'
    | 'lighten'
    | 'luminosity'
    | 'multiply'
    | 'normal'
    | 'overlay'
    | 'saturation'
    | 'screen'
    | 'soft-light';

  type Box = 'border-box' | 'content-box' | 'padding-box';

  type CompatAuto =
    | 'button'
    | 'checkbox'
    | 'listbox'
    | 'menulist'
    | 'meter'
    | 'progress-bar'
    | 'push-button'
    | 'radio'
    | 'searchfield'
    | 'slider-horizontal'
    | 'square-button'
    | 'textarea';

  type CompositeStyle =
    | 'clear'
    | 'copy'
    | 'destination-atop'
    | 'destination-in'
    | 'destination-out'
    | 'destination-over'
    | 'source-atop'
    | 'source-in'
    | 'source-out'
    | 'source-over'
    | 'xor';

  type CompositingOperator = 'add' | 'exclude' | 'intersect' | 'subtract';

  type ContentDistribution = 'around' | 'between' | 'evenly' | 'stretch';
  type ContentJustification =
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | 'stretch';
  type ContentWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

  type ContentList = Quote | 'contents' | (string & {});

  type ContentPosition = 'center' | 'end' | 'start';
  type ContentDirection = 'row' | 'column' | 'row_reverse' | 'column_reverse';

  type CubicBezierTimingFunction =
    | 'ease'
    | 'ease-in'
    | 'ease-in-out'
    | 'ease-out'
    | (string & {});

  type Dasharray<TLength> = TLength | (string & {}) | (number & {});

  // type DisplayInside =
  //     | "-ms-flexbox"
  //     | "-ms-grid"
  //     | "-webkit-flex"
  //     | "flex"
  //     | "flow"
  //     | "flow-root"
  //     | "grid"
  //     | "ruby"
  //     | "table";

  type DisplayLegacy =
    | '-ms-inline-flexbox'
    | '-ms-inline-grid'
    | '-webkit-inline-flex'
    | 'inline-block'
    | 'inline-flex'
    | 'inline-grid'
    | 'inline-list-item'
    | 'inline-table';

  type DisplayOutside = 'block' | 'inline' | 'run-in';

  type EasingFunction =
    | CubicBezierTimingFunction
    | StepTimingFunction
    | 'linear';

  type EastAsianVariantValues =
    | 'jis04'
    | 'jis78'
    | 'jis83'
    | 'jis90'
    | 'simplified'
    | 'traditional';

  type FinalBgLayer<TLength> =
    | Color
    | BgPosition<TLength>
    | RepeatStyle
    | Attachment
    | Box
    | 'none'
    | (string & {});

  type FontStretchAbsolute =
    | 'condensed'
    | 'expanded'
    | 'extra-condensed'
    | 'extra-expanded'
    | 'normal'
    | 'semi-condensed'
    | 'semi-expanded'
    | 'ultra-condensed'
    | 'ultra-expanded'
    | (string & {});

  type FontWeightAbsolute = 'bold' | 'normal' | (number & {});

  type GenericFamily =
    | 'cursive'
    | 'fantasy'
    | 'monospace'
    | 'sans-serif'
    | 'serif';

  type GeometryBox =
    | Box
    | 'fill-box'
    | 'margin-box'
    | 'stroke-box'
    | 'view-box';

  type GridLine = 'auto' | (string & {}) | (number & {});

  type LineStyle =
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'hidden'
    | 'inset'
    | 'none'
    | 'outset'
    | 'ridge'
    | 'solid';

  type LineWidth<TLength> = TLength | 'medium' | 'thick' | 'thin';

  type MaskLayer<TLength> =
    | Position<TLength>
    | RepeatStyle
    | GeometryBox
    | CompositingOperator
    | MaskingMode
    | 'no-clip'
    | 'none'
    | (string & {});

  type MaskingMode = 'alpha' | 'luminance' | 'match-source';

  type NamedColor =
    | 'blue'
    | 'royalblue'
    | 'purple'
    | 'lightblue'
    | 'teal'
    | 'green'
    | 'pink'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'linkedin'
    | 'facebook'
    | 'messenger'
    | 'twitter'
    | 'telegram'
    | 'whatsapp'
    | 'instagram';

  type Paint =
    | Color
    | 'child'
    | 'context-fill'
    | 'context-stroke'
    | 'none'
    | (string & {});

  type Position<TLength> =
    | TLength
    | 'bottom'
    | 'center'
    | 'left'
    | 'right'
    | 'top'
    | (string & {});

  type Quote =
    | 'close-quote'
    | 'no-close-quote'
    | 'no-open-quote'
    | 'open-quote';

  type RepeatStyle =
    | 'no-repeat'
    | 'repeat'
    | 'repeat-x'
    | 'repeat-y'
    | 'round'
    | 'space'
    | (string & {});

  type SelfPosition = 'center' | 'end' | 'start';
  type AlignPosition = 'center' | 'flex-end' | 'flex-start';
  type SingleAnimation<TTime> =
    | EasingFunction
    | SingleAnimationDirection
    | SingleAnimationFillMode
    | TTime
    | 'infinite'
    | 'none'
    | 'paused'
    | 'running'
    | (string & {})
    | (number & {});

  type SingleAnimationDirection =
    | 'alternate'
    | 'alternate-reverse'
    | 'normal'
    | 'reverse';

  type SingleAnimationFillMode = 'backwards' | 'both' | 'forwards' | 'none';

  type SingleTransition<TTime> =
    | EasingFunction
    | TTime
    | 'all'
    | 'none'
    | (string & {});

  type StepTimingFunction = 'step-end' | 'step-start' | (string & {});

  type TrackBreadth<TLength> =
    | TLength
    | 'auto'
    | 'max-content'
    | 'min-content'
    | (string & {});

  type ViewportLength<TLength> = TLength | 'auto' | (string & {});
}

/**To get detailed props of HTML element */
export type DetailedHTMLProps<T> = Omit<
  React.DetailedHTMLProps<
    React.HTMLAttributes<T>, //to use all the supported props for an element,define props like this.
    T
  >,
  'style'
>;

export type DispatchType =  ThunkDispatch<RootState, unknown, AnyAction>;
