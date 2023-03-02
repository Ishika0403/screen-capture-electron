// import visaIcon from '../images/visaIcon.svg';
// import mastercardIcon from '../images/mastercardIcon.svg';
// import discoverIcon from '../images/discoverIcon.png';
// import gPayIcon from '../images/gPayIcon.svg';
// import applePayIcon from '../images/applePayIcon.svg';
// import interacIcon from '../images/interacIcon.svg';
// import americanExpression from '../images/americanExpressIcon.svg';
// import demo1 from '../images/demo1.svg';
// import demo2 from '../images/demo2.svg';

// export const enum STORAGEKEYS {
//   // USER = "user",
//   // ORDERID = "orderId",
//   // TRANID = "tranId",
//   // TOKENS = "tokens",
//   // SELECTEDSTORE = "selectedStore",
//   // REMEMBER_ME = "remember_me",
//   STORE_TOKEN = 'store_token',
//   STORE_ID = 'storeId',
//   CART_ID = 'cartId',
//   STORE_SETTINGS = 'store_settings',
//   LEGAL_AGE = 'legal_age',
//   HST_NUMBER = 'hst_number',
//   // for main.ts file kiosk_settings param used
//   KIOSK_SETTINGS = 'kiosk_settings',
//   STORE_ADDRESS = 'store_address',
//   KIOSK_ID = 'kiosk_id',
//   WHATS_NEW = 'whatsNew',
//   ON_SALE = 'onSale',
//   BASE_URL = 'BASE_URL',
// }

// export const HSTNUMBER = '12098 9330 RT0001';

// export const enum PAYMENT_TYPE {
//   CREDIT_CARD = 'creditCard',
//   GIFT_CARD = 'gitftCard',
// }

// export const enum NOTIFTYPE {
//   ERROR = 'error',
//   INFO = 'info',
//   SUCCESS = 'success',
// }

// export type SettingsFormValue = {
//   storeNumber: string;
//   kiosk: string;
//   ipAddress: string;
//   macAddress: string;
//   username: string;
//   password: string;
//   terminalId: string;
//   printName: string;
//   hostIp: string;
//   hostPort: string;
//   logFiles: string;
//   logsDescription: string;
//   hst: string;
// };

// export const cardData = [
//   {
//     id: '1',
//     icon: visaIcon,
//   },
//   {
//     id: '2',
//     icon: mastercardIcon,
//   },
//   {
//     id: '3',
//     icon: americanExpression,
//   },
//   {
//     id: '4',
//     icon: interacIcon,
//   },
//   {
//     id: '5',
//     icon: applePayIcon,
//   },
//   {
//     id: '6',
//     icon: gPayIcon,
//   },
//   {
//     id: '7',
//     icon: discoverIcon,
//   },
// ];
// export interface CategoryItem {
//   display: string;
//   id: number;
//   meta_description: string;
//   name: string;
// }
// export interface Category {
//   category: string;
//   data: CategoryItem[];
//   display: string;
//   index: number;
// }

// export interface ReceiptData {
//   orderNumber: string;
//   orderDetails: {
//     productName: string;
//     quantity: string;
//     price: string;
//   }[];
//   subTotal: string;
//   hst: string;
//   deposit: string;
//   total: string;
// }
// export interface PinpadResponse {
//   // receiptData: ReceiptData;
//   paymentDetails: {
//     paymentDate: string; // date
//     paymentTime: string; // time
//     accountNumber: string; // AccountNumber
//     cardType: string; //CardBrand
//     emvaId: string; //EmvAID
//     // bankAccNo: string;  //EmvAID
//     bankName: string; // EmvAppLabel
//     traceId: string; // Trace
//     inv: string; // Invoice
//     auth: string; // AuthCode
//     RRNumber: string; // RRN
//     paymentStatus: string; // TranStatusMerch
//   };
//   kioskDetails: {
//     storeNumber: string;
//     storeAddress1: string;
//     storeAdress2: string;
//     merchantNumber: string;
//     terminalId: string;
//     accountNumber: string; //AccountNumber
//     hst: string;
//     serialNumber: string;
//     dateString: string;
//   };
// }

// export enum DELETE_MODAL_TITLE {
//   DELETE_ITEM = 'Are you sure you would like to remove this item from the cart?',
//   DELETE_CART = 'Are you sure you want to clear the cart?',
// }

// export enum ORDER_STEPS_ERR_MSG {
//   PRINTER_ERR = 'Unfortunately we have an issue with printer. Try again later.',
//   PAYMENT_ERR = 'Unfortunately we have an issue with payment. Try again later.',
//   ORDER_PLACE_ERR = 'Unfortunately we have an issue placing your order. Try again later.',
//   PINPAD_ERR = 'Unfortunately we have an issue with pinpad settings. Try again later.',
//   ORDER_FAIL_ERROR = 'Sorry, there was an issue submitting your order. Please take the receipt below to the front counter for a refund. ',
// }

// export enum PINPAD_REQUEST_TYPE {
//   PURCHASE = 'Purchase',
//   GIFTCARD_BALANCE = 'GCBalance',
//   GIFTCARD_REDEMPTION = 'GCRedemption',
// }

// export const somethingWrongErrMsg = 'Something went wrong, please try again.';

// export const internetNotFoundErrMsg = 'No internet connection.';
// export const notSufficientStockErr =
//   'Product does not have sufficient stock. Please reduce the quantity.';

// export const retryText = 'Retry';
// export const receiptErrMsg =
//   'Your order has been cancelled. Please go to the front counter to receive a refund.';

// export const numbersOnly = /^([1-9][0-9][0-9]+$)/i;

// export const alphaNumeric = /[^a-zA-Z0-9.-\s]/gi;

// export const ICE_VARIANT_ID = '1111111';

// export const ICE_PRODUCT_ID = '1111111';

// export const TRAN_ID = '001';

// // 438
// export const whatsNewCode = process.env.REACT_APP_WHATS_NEW;
// // 346
// export const onSaleCode = process.env.REACT_APP_ON_SALE;
// export interface KioskPayment {
//   ccType: string;
//   accountNumber: string;
//   checkoutId: string;
//   storeNumber: string;
//   kioskNumber: string;
//   tranId: string;
//   authCode: string;
//   terminalId: string;
//   orderStatus: number;
//   paidAmount: number;
//   totalAmount: number;
//   refundAmount: number;
//   orderNumber: number;
//   id?: number;
// }
