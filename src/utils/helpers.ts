import {
  Category,
  PinpadResponse,
  ReceiptData,
  receiptErrMsg,
  SettingsFormValue,
  STORAGEKEYS,
} from './constants';
import redCheck from '../images/redCheck.svg';
import greenCheck from '../images/greenCheck.svg';
import iceIcon from '../images/demo2.svg';
const XMLParser = require('react-xml-parser');


export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const storeValue = (variableName: STORAGEKEYS, value: string) => {
  localStorage.setItem(variableName, value);
};

export const fetchStoredValue = (variableName: STORAGEKEYS) => {
  return localStorage.getItem(variableName);
};

export const removeStoredValue = (variableName: STORAGEKEYS) => {
  localStorage.removeItem(variableName);
};

city: 'Brampton';
postalCode: 'L6V 1B7';
province: 'ON';
street: 'Queen St. E.';
streetNo: '198';

export const setStoreSettings = (data: any) => {
  localStorage.setItem(STORAGEKEYS.STORE_SETTINGS, JSON.stringify(data));
};

export const getStoreSettings = (): SettingsFormValue | null => {
  try {
    const settingsStr = fetchStoredValue(STORAGEKEYS.STORE_SETTINGS);
    if (settingsStr) {
      return JSON.parse(settingsStr);
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const sortCategories = (categoriesList: Category[]) => {
  try {
    if (Array.isArray(categoriesList) && categoriesList.length > 0) {
      return categoriesList.map((category) => {
        if (category.index !== 0) {
          return {
            ...category,
            data: sortList(category.data, 'display', false),
          };
        }
        return category;
      });
    }
    return categoriesList;
  } catch (err) {
    return categoriesList;
  }
};

export const formattedDate = (OrderSuccess = true) => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (OrderSuccess) {
    return `${year}${month}${day}`;
  }
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  return `${year}${month}${day}${minutes}${seconds}`;
};

export const sortList = (
  arr: any[],
  fieldName: string,
  isAscending = false
) => {
  return !isAscending
    ? arr.sort((a, b) => a[fieldName].localeCompare(b[fieldName]))
    : arr.sort((a, b) => b[fieldName].localeCompare(a[fieldName]));
};

export const singleDigitPercent = (percentStr: string) => {
  try {
    const percent = percentStr.replaceAll('%', '');
    return `${parseFloat(percent).toFixed(1)}%`;
  } catch (err) {
    return percentStr;
  }
};

export const enum PAYMENTSTEPS {
  PAYMENT_METHOD = 1,
  MODE_SELECTED = 2, // send req to pinpad
  FOLLOW_STEPS = 3, // display amount wait for 5 sec
  MODE_OF_PAYMENT = 4, // display mode of payment
  PAYMENT_SUCCESS = 5, // on response from pinpad --> success --> place order
  PAYMENT_FAILURE = 31, // failure --> goto step 2 with err msg
  PAYMENT_NO_ACTION = '', // display no option selection for 10 sec
  ORDER_NUMBER = 6, // on response from order place success --> hit receipt print
  ORDER_FAILURE = 32, // on failure   -> unclear for err msg
  RECEIPT_PRINT = 7, // on success from printer --> wait for 3sec
  RECEIPT_PRINT_FAILURE = 33, // on printer failure -> unclear for err msg
  DISPLAY_STEPS = 9, // wait for 3 sec
  START_NEW_ORDER = 10, // display new order button

  GIFT_CARD_BALANCE_INS = 20,
  GIFT_CARD_BALANCE_ERROR = 34,
}

/**
 *
 * @param delay in seconds
 * @returns  resolves when completed
 */
export const setDelay = (delay: number) => {
  const delayInMillisec = delay * 1000;
  return new Promise((resolve, reject) => {
    if (isNaN(delay)) {
      reject(false);
    } else {
      setTimeout(() => {
        resolve(true);
      }, delayInMillisec);
    }
  });
};

export const getListData = (
  paymentStep: PAYMENTSTEPS,
  isCreditCard: boolean
) => {
  const paymentText = isCreditCard
    ? ' Credit or Debit payments'
    : ' Gift Card payment';
  if (paymentStep === PAYMENTSTEPS.MODE_OF_PAYMENT) {
    return [
      {
        newId: '1',
        listIcon: greenCheck,
        listText: paymentText,
      },
    ];
  } else if (paymentStep === PAYMENTSTEPS.PAYMENT_SUCCESS) {
    return [
      {
        newId: '1',
        listIcon: greenCheck,
        listText: paymentText,
      },
      {
        newId: '3',
        listIcon: greenCheck,
        listText: '  Payment complete',
      },
    ];
  } else if (paymentStep === PAYMENTSTEPS.PAYMENT_FAILURE) {
    return [
      {
        newId: '1',
        listIcon: greenCheck,
        listText: paymentText,
      },
      {
        newId: '3',
        listIcon: redCheck,
        listText: '  Payment incomplete',
      },
    ];
  } else if (
    paymentStep === PAYMENTSTEPS.RECEIPT_PRINT ||
    paymentStep === PAYMENTSTEPS.ORDER_NUMBER
  ) {
    return [
      {
        newId: '1',
        listIcon: greenCheck,
        listText: paymentText,
      },
      {
        newId: '3',
        listIcon: greenCheck,
        listText: '  Payment complete',
      },
      {
        newId: '4',
        listIcon: greenCheck,
        listText: ' Order receipt printed',
      },
    ];
  } else if (paymentStep === PAYMENTSTEPS.GIFT_CARD_BALANCE_INS) {
    return [];
  } else {
    return [];
  }
  // } else if (paymentStep === PAYMENTSTEPS.POST_PAYMENT_INS) {
  //   return [];
  // } else {
  //   return [
  //     {
  //       newId: '1',
  //       listIcon: greenCheck,
  //       listText: paymentText,
  //     },
  //   ];
  // }
};

export const getReceiptHtml = (pinpadResponse: any) => {
  const {
    kioskDetails,
    receiptData,
    paymentDetails,
    receiptData: { orderDetails },
    hstNumber,
    receiptUniqueId,
    storeAddress,
  } = pinpadResponse;
  const productListingHtml = getProductListingHtml(orderDetails);

  return `
    <!-- <link
    href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&family=Nuosu+SIL&display=swap"
    rel="stylesheet"
  /> -->
   <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;1,500&display=swap" rel="stylesheet" media = "print">
   <section
    id="main"
    style="width: 242px; padding: 5px; margin: 0px 0px 0px -31px"
    font-family="Nunito";
  >
    <div
      class="font"
      style="text-align: center; font-size: 10px;"
      font-family="Nunito"
    >
      HOME CONSUMER | STORE #${kioskDetails.storeNumber}
    </div>
    <div style="width: 100%; text-align: center;">
      <img
        src="data:image/png;base64,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"
        style="height: 50px; width: 130px; margin-top: 5px;"
      />
    </div>
    ${
      receiptData.orderNumber
        ? `<div
      class="font"
      style="text-align: center; font-size: 10px; margin-top: 5px;">
      YOUR ORDER NUMBER IS
    </div>`
        : `<div
      class="font"
      style="text-align: center; font-size: 14px;  line-height: 20px; margin-top: 5px ; margin-bottom: 8px; font-family : Nunito";>
      Your order has been cancelled.<br/>Please go to the front counter to receive a refund.
    </div>`
    }
    ${
      receiptData.orderNumber &&
      `<div
      class="font"
      style="text-align: center; font-size: 46px; font-family:Nunito;"
    >
    ${receiptData.orderNumber}
    </div>`
    }
   <hr style="border-top: 1px solid black; width: 100%; margin: 2px;">
    <div
      class="font"
      style="
        text-align: left;
        font-size: 15px;
        line-height:18px;
        margin-top: 5px;
        padding: 0px 23px;
        font-family : Nunito;
      "
    >
      ORDER DETAILS
    </div>
    ${productListingHtml}
    <div style=" font-family : Nunito">
      <table id="table7" style="text-align: left; font-size: 12px;width: 100%; padding-left: 21px;">
        <tbody>
          <tr>
            <td>SUBTOTAL<td>:</td></td>
            <td width="80"></td>
            <td style="text-align: right;">$${receiptData.subTotal}</td>
          </tr>
          <tr>
            <td>HST<td>:</td></td>
            <td width="80"></td>
            <td style="text-align: right;">$${receiptData.hst}</td>
          </tr>
          <tr>
            <td>DEPOSIT<td>:</td></td>
            <td width="80"></td>
            <td style="text-align: right;">$${receiptData.deposit}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr style="border: 1px solid #00000036; width: 100%; margin:2px;"/>

    <div style=" width:100%;">
      <table id="table7" style="text-align: left; font-size: 12px; width: 100%; padding-left: 21px;">
        <tbody>
          <tr>
            <td  class="font"
            style="
              text-align: left;
              font-size: 14px;
              line-height: 16px;
             font-family :  Nunito;
            ">TOTAL </td>
          <td class="font"
          style="
            text-align: right;
            font-size: 14px;
            line-height: 16px;
             margin-top: 5px;
            font-family :  Nunito;
          ">$${receiptData.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="font"
      style="font-size: 10px; text-align: left; margin-top: 5px; font-family : Nunito;padding-left: 25px; "
    >
      BEER STORE #${kioskDetails.storeNumber} KIOSK <br/>
      ${storeAddress?.streetNo} ${storeAddress?.street} ${
    storeAddress?.postalCode
  } <br />
      ${storeAddress?.city} ${storeAddress?.province} <br />
      ${kioskDetails?.merchantNumber} <br />
      ${kioskDetails.terminalId}
    </div>
    <table style="text-align: left; font-size: 12px;width: 100%; padding-left: 21px;">
      <tr>
        <td><hr style=" width: 100%"></td>
        <td class="font"
        style="font-size: 10px; text-align:center; margin-top:12px;width:80px; font-family: Nunito;">PURCHASE</td>
        <td><hr style="width: 100%"></td>
      </tr>
    </table>

    <div style=" width:100%;">
      <table id="table7" style="text-align: left; font-size: 12px;width: 100%; padding-left: 21px;">
        <tbody>
          <tr>
            <td  class="font"
            style="
              font-size: 10px;
              text-align: left;
              margin-top: 12px;
              font-family : Nunito">${paymentDetails.paymentDate}</td>
          <td   class="font"
          style="
            font-size: 10px;
            text-align: right;
            margin-top: 12px;
            font-family : Nunito" >${paymentDetails.paymentTime}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="font"
      style="
        font-size: 10px;
        text-align: left;
        padding-left: 25px;
        font-family : Nunito;
      "
    >
      ACT #${paymentDetails.accountNumber} <br />
      CARD TYPE ${paymentDetails.cardType} <br />
      ${paymentDetails.emvaId} ${paymentDetails.bankName} <br />
      TRACE ID : #${paymentDetails.traceId} <br />
      # INV ${paymentDetails.inv} <br />
      AUTH #${paymentDetails.auth} ${paymentDetails.RRNumber}
    </div>
    <div style=" width:100%; margin-top:7px;">
      <table id="table7" style="text-align: left; font-size: 12px;width: 100%; padding-left: 21px;">
        <tbody>
          <tr>
            <td  class="font"
            class="font"
            style="
              font-size: 10px;
              text-align: left;
              margin-top: 5px;
              font-family : Nunito;">TOTAL </td>
          <td  class="font"
          style="
            font-size: 10px;
            text-align: right;
            margin-top: 5px;
            font-family : Nunito;">$${receiptData.total}</td>
          </tr>
        </tbody>
      </table>
      <hr style="border: 1px solid black; width: 100%; margin: 2px;">
    </div>
  <div
      class="font"
      style="font-size: 10px; text-align: center; margin-top: 5px; font-family : Nunito;  padding-bottom: 8px; border-bottom: 1px solid #00000094;"
    >
      APPROVED THANK YOU <br />
      RETAIN THIS COPY FOR YOUR RECORDS <br />CUSTOMER COPY
    </div>
    <div
      class="font"
      style="font-size: 10px; text-align: center; margin-top: 10px; font-family : Nunito;  padding-bottom: 8px;padding-left: 25px;border-bottom: 1px solid #00000094;"
    >
      EXCHANGE ONLY ON BEER PRODUCTS <br />
      RECEIPT REQUIRED FOR REFUNDS &amp; <br />
      EXCHANGE OF NON-BEER PRODUCTS<br />
      THANK YOU FOR SHOPPING AT <br />
      THE BEER STORE
    </div>
    <div
      class="font"
      style="text-align: center; font-size: 10px; margin-top: 5px; font-family : Nunito;"
    >
      HST #${hstNumber}
    </div>
    <div
      class="font"
      style="text-align: center; font-size: 10px; font-family : Nunito ; margin-bottom: 30px; " ;
    >
    ${receiptUniqueId}
    </div>

    <div
      class="font"
      style="font-size: 10px; text-align: center; margin-top: 10px; font-family : Nunito;  padding-bottom: 8px;padding-left: 25px;border-bottom: 1px solid #00000094;"
    >
      <hr style="border: 1px solid #00000000; width: 100% ; margin-bottom: 20px; opacity: 0.1;"  ></hr>
    </div>
    </section>
    `;
};

export const getProductListingHtml = (orderDetails: any) => {
  let listingHtml = '';
  orderDetails.forEach((product) => {
    listingHtml += `
          <div
          class="font"
          style="
            font-size: 12px;
            text-align: left;
            margin-top: 5px;
            padding: 0px 23px;
            font-family : Nunito
          "
          ;
        >
          ${product.productName}
        </div>
        <div style="padding-left: 20px; border-bottom:1px solid #00000040;">
          <table
            id="table6"
            width="100%"
            style="
              font-size: 12px;
              font-family: Nunito;
              text-align: left;
              position: relative;
              width:100%!important;
            "
          >
            <tbody>
              <tr>
                <td width="50%" style="width:50%!important" >QTY x ${product.quantity}:</td>

                <td width="50%" style="width:50%!important; text-align:right" align="right">$${product.price}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
  });
  return listingHtml;
};

export const printerTestHtml = () => {
  return `
  <!-- <link
  href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&family=Nuosu+SIL&display=swap"
  rel="stylesheet"
/> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;1,500&display=swap" rel="stylesheet">
<section
  id="main"
  style="width: 242px; padding: 5px; margin: 0px 0px 0px -31px"
  font-family="Nunito"
>
  <div
    class="font"
    style="text-align: center; font-size: 10px;"
    font-family="Nunito"
  >
    HOME CONSUMER | STORE #0000
  </div>
  <div style="width: 100%; text-align: center">
    <img
      src="data:image/png;base64,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"
      style="height: 50px; width: 130px; margin-top: 5px"
    />
  </div>
  <div
    class="font"
    style="text-align: center; font-size: 10px; margin-top: 5px"
  >
    YOUR ORDER NUMBER IS
  </div>
  <div
    class="font"
    style="text-align: center; font-size: 46px; font-weight: bold; font-family : Nunito"
  >
  00000
  </div>
  <hr width="80%" style="border: 0;
  height: 2px;
  background: black;" />
  <div
    class="font"
    style="
      text-align: left;
      font-size: 16px;
      font-weight: bold;
      margin-top: 5px;
      padding: 0px 23px;
      font-family : Nunito
    "
  >
    ORDER DETAILS
  </div>

        <div
        class="font"
        style="
          font-size: 12px;
          text-align: left;
          margin-top: 5px;
          padding: 0px 23px;
          font-family : Nunito
        "
        ;
      >
        8 6 EXTREME
      </div>
      <div style="padding-left: 20px; border-bottom:1px solid #00000040;">
        <table
          id="table6"
          style="
            font-size: 12px;
            font-family: Nunito;
            text-align: left;
            position: relative;
          "
        >
          <tbody>
            <tr>
              <td>QTY x 2:</td>
              <td width="130"></td>

              <td>$0.00</td>
            </tr>
          </tbody>
        </table>
      </div>

  <div style=" font-family : Nunito">
    <table id="table7" style="text-align: left; font-size: 12px;width: 100%; padding-left: 21px;">
      <tbody>
        <tr>
          <td>SUBTOTAL<td>:</td></td>
          <td width="80"></td>
          <td style="text-align: right;">$8.00</td>
        </tr>
        <tr>
          <td>HST<td>:</td></td>
          <td width="80"></td>
          <td style="text-align: right;">$0.00</td>
        </tr>
        <tr>
          <td>DEPOSIT<td>:</td></td>
          <td width="80"></td>
          <td style="text-align: right;">$0.00</td>
        </tr>
      </tbody>
    </table>
  </div>
  <hr style="border: 1px solid #00000036; width: 100%; margin:2px" />

  <div style=" width:100%;">
    <table id="table7" style="text-align: left; font-size: 12px; width: 100%; padding-left: 21px;">
      <tbody>
        <tr>
          <td  class="font"
          style="
            text-align: left;
            font-size: 14px;
            font-weight: bold;
            font-family : Nunito
          ">TOTAL </td>
        <td class="font"
        style="
          text-align: right;
          font-size: 14px;
          font-weight: bold;
          margin-top: 5px;
          font-family : Nunito
        ">$8.00</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="font"
    style="font-size: 10px; text-align: left; margin-top: 5px; font-family : Nunito;padding-left: 25px; "
  >
    BEER STORE #2002 KIOSK <br/>
    198 Queen St. E. L6V 1B7 <br />
    Brampton ON <br />
    29999992 <br />
    N1000710BS03
  </div>
  <table style="text-align: left; font-size: 12px;width: 100%; padding-left: 21px;">
    <tr>
      <td><hr style=" width: 100%"></td>
      <td class="font"
      style="font-size: 10px; text-align:center; margin-top:12px; font-family:Nunito; width:80px; font-weight:bold">PURCHASE</td>
      <td><hr style="width: 100%"></td>
    </tr>
  </table>

  <div style=" width:100%;">
    <table id="table7" style="text-align: left; font-size: 12px;width: 100%; padding-left: 21px;">
      <tbody>
        <tr>
          <td  class="font"
          style="
            font-size: 10px;
            text-align: left;
            margin-top: 12px;
            font-family : Nunito">22-09-2022  </td>
        <td   class="font"
        style="
          font-size: 10px;
          text-align: right;
          margin-top: 12px;
          font-family : Nunito" >12:57:17</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="font"
    style="
      font-size: 10px;
      text-align: left;
      padding-left: 25px;
      font-family : Nunito
    "
  >
    ACT #************9999 <br />
    CARD TYPE VI <br />
    A0000000031010 VISA CREDIT <br />
    TRACE ID : #6 <br />
    # INV 8 <br />
    AUTH #138974 001003004
  </div>
  <div style=" width:100%; margin-top:5px">
    <table id="table7" style="text-align: left; font-size: 12px;width: 100%; padding-left: 21px;">
      <tbody>
        <tr>
          <td  class="font"
          class="font"
          style="
            font-size: 10px;
            text-align: left;
            margin-top: 5px;
            font-family : Nunito">TOTAL </td>
        <td  class="font"
        style="
          font-size: 10px;
          text-align: right;
          margin-top: 5px;
          font-family : Nunito">$8.00</td>
        </tr>
      </tbody>
    </table>
    <hr style="border: 1px solid black; width: 100%; margin: 2px">
  </div>
<div
    class="font"
    style="font-size: 10px; text-align: center; margin-top: 5px; font-family : Nunito;  padding-bottom: 5px; border-bottom: 1px solid #00000094;"
  >
    APPROVED THANK YOU <br />
    RETAIN THIS COPY FOR YOUR RECORDS <br />CUSTOMER COPY
  </div>
  <div
    class="font"
    style="font-size: 10px; text-align: center; margin-top: 8px; font-family : Nunito;  padding-bottom: 8px;padding-left: 25px;border-bottom: 1px solid #00000094;"
  >
    EXCHANGE ONLY ON BEER PRODUCTS <br />
    RECEIPT REQUIRED FOR REFUNDS &amp; <br />
    EXCHANGE OF NON-BEER PRODUCTS<br />
    THANK YOU FOR SHOPPING AT <br />
    THE BEER STORE
  </div>
  <div
    class="font"
    style="text-align: center; font-size: 10px; margin-top: 5px; font-family : Nunito"
  >
    HST #12098 9330 RT0001
  </div>
  <div
    class="font"
    style="text-align: center; font-size: 10px; font-family : Nunito ; margin-bottom: 30px; " ;
  >
  20221021-2002-00000 | 1
  </div>

  <div
      class="font"
      style="font-size: 10px; text-align: center; margin-top: 10px; font-family : Nunito;  padding-bottom: 8px;padding-left: 25px;border-bottom: 1px solid #00000094;"
    >
      <hr style="border: 1px solid #00000000; width: 100% ; margin-bottom: 20px; opacity: 0.1;"  ></hr>
    </div>
    </section>
  `;
};

export const parsedPinPadResponse = (pinpadResponse: string) => {
  try {
    const storeNumber = localStorage.getItem('storeId');
    const resp = new XMLParser().parseFromString(pinpadResponse);
    const accountNumberArr = resp.getElementsByTagName('AccountNumber') || '';
    const cardBrandArr = resp.getElementsByTagName('CardBrand') || '';
    const emvAIDArr = resp.getElementsByTagName('EmvAID') || '';
    const emvAppLabelArr = resp.getElementsByTagName('EmvAppLabel') || '';
    const traceArr = resp.getElementsByTagName('Trace') || '';
    const invoiceArr = resp.getElementsByTagName('Invoice') || '';
    const authCodeArr = resp.getElementsByTagName('AuthCode') || '';
    const rrnArr = resp.getElementsByTagName('RRN') || '';
    const responseCodeArr = resp.getElementsByTagName('ResponseCode') || '';
    const merchantNumberArr = resp.getElementsByTagName('MerchantNumber') || '';
    const terminalidArr = resp.getElementsByTagName('TerminalID') || '';
    const accNumberArr = resp.getElementsByTagName('AccountNumber') || '';
    const amountPaidArr = resp.getElementsByTagName('Amount') || '';
    let paymentDate = '';
    let paymentTime = '';
    if (responseCodeArr[0]?.value === '000') {
      const dateArr = resp.getElementsByTagName('Date') || '';
      const dateStr = dateArr[0]?.value || '';
      paymentDate = `${dateStr.slice('4', '6')}-${dateStr.slice(
        '6'
      )}-${dateStr.slice('0', '4')}`;
      const TimeArr = resp.getElementsByTagName('Time') || '';
      const timeStr = TimeArr[0].value;
      paymentTime = `${timeStr.slice('0', '2')}:${timeStr.slice(
        '2',
        '4'
      )}:${timeStr.slice('4')}`;
      const printObject = {
        paymentDetails: {
          paymentDate,
          paymentTime,
          accountNumber: accountNumberArr[0]?.value || '', // AccountNumber
          cardType: cardBrandArr[0]?.value || '', //CardBrand
          emvaId: emvAIDArr[0]?.value || '', //EmvAID
          bankName: emvAppLabelArr[0]?.value || '', // EmvAppLabel
          traceId: traceArr[0]?.value || '', // Trace
          inv: invoiceArr[0]?.value || '', // Invoice
          auth: authCodeArr[0]?.value || '', // AuthCode
          RRNumber: rrnArr[0]?.value || '',
          paymentStatus: responseCodeArr[0]?.value || '',
          amountPaid: amountPaidArr[0]?.value || 0,
        },
        kioskDetails: {
          storeNumber,
          storeAddress1: '',
          storeAdress2: '',
          merchantNumber: merchantNumberArr[0]?.value || '',
          terminalId: terminalidArr[0]?.value || '',
          accountNumber: accNumberArr[0]?.value || '',
          hst: '',
          serialNumber: '',
          dateString: '',
        },
      };

      return printObject;
    }
    return {
      paymentDetails: {
        paymentStatus: responseCodeArr[0]?.value || '051',
      },
      kioskDetails: {},
    };
  } catch (error) {
    console.log('err-->parse', error.message);
    return {
      paymentDetails: {
        paymentStatus: '051',
      },
      kioskDetails: {},
    };
  }
};

export const parsedGiftCardResponse = (giftCardResponse: string) => {
  try {
    const storeNumber = localStorage.getItem('storeId');
    const resp = new XMLParser().parseFromString(giftCardResponse);
    const responseCodeArr = resp.getElementsByTagName('ResponseCode') || '';
    const accountNumberArr = resp.getElementsByTagName('AccountNumber') || '';
    const amountPaidArr = resp.getElementsByTagName('Amount') || '';
    const authCodeArr = resp.getElementsByTagName('ResultCode') || '';
    const traceArr = resp.getElementsByTagName('Trace') || '';
    const invoiceArr = resp.getElementsByTagName('Invoice') || '';
    const terminalidArr = resp.getElementsByTagName('TerminalID') || '';
    const accNumberArr = resp.getElementsByTagName('Account') || '';

    console.log('accNumberArr', accNumberArr);
    const emvAIDArr = resp.getElementsByTagName('EmvAID') || '';
    const emvAppLabelArr = resp.getElementsByTagName('EmvAppLabel') || '';
    const rrnArr = resp.getElementsByTagName('RRN') || '';
    const merchantNumberArr = resp.getElementsByTagName('MerchantNumber') || '';

    let paymentDate = '';
    let paymentTime = '';
    if (responseCodeArr[0]?.value === '000') {
      const dateArr = resp.getElementsByTagName('Date') || '';
      const dateStr = dateArr[0]?.value || '';
      paymentDate = `${dateStr.slice('4', '6')}-${dateStr.slice(
        '6'
      )}-${dateStr.slice('0', '4')}`;
      const TimeArr = resp.getElementsByTagName('Time') || '';
      const timeStr = TimeArr[0].value;
      paymentTime = `${timeStr.slice('0', '2')}:${timeStr.slice(
        '2',
        '4'
      )}:${timeStr.slice('4')}`;
      const printObject = {
        paymentDetails: {
          paymentDate,
          paymentTime,
          accountNumber: accNumberArr[0]?.value
            ? accNumberArr[0]?.value?.slice(-4)
            : '', // AccountNumber
          cardType: 'Gift Card', //CardBrand
          emvaId: emvAIDArr[0]?.value || '', //EmvAID  //(missing)
          bankName: emvAppLabelArr[0]?.value || '', // EmvAppLabel  //(missing)
          traceId: traceArr[0]?.value || '', // Trace
          inv: invoiceArr[0]?.value || '', // Invoice
          auth: authCodeArr[0]?.value || '', // AuthCode
          RRNumber: rrnArr[0]?.value || '', //(missing)
          paymentStatus: responseCodeArr[0]?.value || '',
          amountPaid: amountPaidArr[0]?.value || 0,
        },
        kioskDetails: {
          storeNumber,
          storeAddress1: '',
          storeAdress2: '',
          merchantNumber: merchantNumberArr[0]?.value || '', //(missing)
          terminalId: terminalidArr[0]?.value || '',
          accountNumber: accNumberArr[0]?.value
            ? accNumberArr[0]?.value?.slice(-4)
            : '',
          hst: '',
          serialNumber: '',
          dateString: '',
        },
      };

      return printObject;
    }
    return {
      paymentDetails: {
        paymentStatus: responseCodeArr[0]?.value || '051',
      },
      kioskDetails: {},
    };
  } catch (err) {
    console.log('err', err.message);
    return {
      paymentDetails: {
        paymentStatus: '051',
      },
      kioskDetails: {},
    };
  }
};

export const parsePinpadStatusCheck = (pinpadResponse: string) => {
  try {
    const resp = new XMLParser().parseFromString(pinpadResponse);

    const terminalIdArr = resp.getElementsByTagName('TerminalID') || '';
    const rawDataArr = resp.getElementsByTagName('RawData') || '';
    const MACAddDATA = rawDataArr[0]?.value || '';
    const MACAddString = MACAddDATA.split('MAC:')[1] || '';
    const MACAddformat = MACAddString.trim();
    // console.log('testing', MACAddformat.split(' ')[0]);
    return {
      terminalId: terminalIdArr[0]?.value || '',
      MACAdd: MACAddformat.split(' ')[0] || '',
    };
  } catch (err) {
    return {
      terminalId: '',
      MACAdd: '',
    };
  }
};

export const parsePinpadStatus = (pinpadResponse: string) => {
  const resp = new XMLParser().parseFromString(pinpadResponse);
  // console.log('resp', resp);
  return resp;
};

export const parseIceProducts = (iceProducts: any) => {
  return iceProducts.map((prod) => {
    return {
      id: prod.id,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      icon: iceIcon,
      sku: prod.sku,
      productCode: prod.productCode,
      // icon: prod.image,
    };
  });
};

export const getIceQtyOptions = (iceProducts: any) => {
  return iceProducts.map((prod) => {
    return {
      ...prod,
      selectedQuantity: 0,
      isLoading: false,
      selectQtyOptions: [...Array(prod?.stock)].map((_, i) => {
        return { id: `${i + 1}`, qty: `${i + 1}` };
      }),
    };
  });
};

export const formatGAData = (items) => {
  let data = [],
    y = {};
  for (let i = 0; i < items?.length; i++) {
    for (let j = 0; j < items[i]?.data?.length; j++) {
      y = {
        item_id: `${items[i]?.data[j]?.product_id}`,
        quantity: items[i]?.data[j]?.quantity,
        item_name: items[i]?.data[j]?.name.split('~')[0].replace(/\-/g, '_'),
        ...(items[i]?.data[j]?.producer
          ? { item_brand: items[i]?.data[j]?.producer }
          : { item_brand: 'The Beer Store' }),
        ...(items[i]?.data[j]?.categoryName
          ? { item_category: items[i]?.data[j]?.categoryName }
          : { item_category: 'Ice Pack' }),
        location_id: fetchStoredValue(STORAGEKEYS.STORE_ID),
        item_variant: items[i]?.data[j]?.cart_info.label,
        ...(items[i]?.data[j]['sequence']
          ? {
              price: items[i]?.data[j]?.sequence[0]['sub']
                ? items[i]?.data[j]?.sequence[0]?.sub?.variant.price
                : items[i]?.data[j]?.sequence[0]?.sale?.variant.price,
              discount: items[i]?.data[j]?.sequence[0]['sub']
                ? items[i]?.data[j]?.sequence[0]?.sub?.variant.price -
                  items[i]?.data[j]?.sequence[0]?.sub?.variant.sale_price
                : items[i]?.data[j]?.sequence[0]?.sale?.variant.price -
                  items[i]?.data[j]?.sequence[0]?.sale?.variant.sale_price,
            }
          : { price: items[i]?.data[j]?.price }),
      };
      data.push(y);
    }
  }

  return data;
};

export const setGAIndex = (indexedBeers, data) => {
  const beers = [],
    uniqueBeers = [];
  const uniqueBeerNames = [...new Set(indexedBeers?.map((item) => item?.name))];
  for (let i = indexedBeers.length - 1; i >= 0; i--) {
    uniqueBeerNames.forEach((name) => {
      if (
        name === indexedBeers[i].name &&
        !uniqueBeers.find((item) => item.name === name)
      ) {
        uniqueBeers.push(indexedBeers[i]);
      }
    });
  }
  uniqueBeers.forEach((beer) => {
    data.forEach((data) => {
      if (beer.name === data.item_name) {
        beers.push({
          ...data,
          index: beer.index,
          item_list_id: `${beer.item_list_id}`,
          item_list_name: beer.item_list_name,
        });
      }
    });
  });

  data.forEach((data) => {
    if (data.item_category === 'Ice Pack') {
      beers.push(data);
    }
  });
  return beers;
};

export const getFormattedTime = () => {
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hour = date.getHours();

  return `${hour}${minutes}${seconds}`;
};

export const getHstAndDeposit = (orderResponse: any) => {
  let hst = 0.0;
  let deposit = 0.0;
  let productSubTotal = 0.0;
  let receiptProducts = [];
  try {
    if (orderResponse?.orderDetails) {
      orderResponse.orderDetails?.SequenceData?.map((item) => {
        const beerNameStr = item?.name?.split('~');
        const beerName = beerNameStr[0].replaceAll('-', ' ') || '';
        if (item?.cart_info) {
          const basePrice =
            item?.cart_info?.total_price -
            (item.cart_info?.total_tax + item.cart_info?.total_deposit);
          hst += item.cart_info?.total_tax || 0.0;
          deposit += item.cart_info?.total_deposit || 0.0;
          productSubTotal += basePrice || 0.0;
          receiptProducts.push({
            productName: beerName?.toUpperCase(),
            quantity: item?.quantity || '',
            price: basePrice?.toFixed(2) || '0.00',
          });
        }
      });
    } else {
      orderResponse.map((cartItem) => {
        cartItem.data.map((item) => {
          if (item?.cart_info) {
            const basePrice =
              item?.cart_info?.total_price -
                (item.cart_info?.total_tax + item.cart_info?.total_deposit) ||
              0;
            hst += item.cart_info?.total_tax || 0.0;
            deposit += item.cart_info?.total_deposit || 0.0;
            productSubTotal += basePrice || 0.0;
            receiptProducts.push({
              productName: item?.name?.split('~')[0].toUpperCase(),
              quantity: item?.quantity || '',
              price: basePrice?.toFixed(2) || '0.00',
            });
          }
        });
      });
    }
    return {
      hst: hst || 0.0,
      deposit: deposit || 0.0,
      productSubTotal: productSubTotal || 0.0,
      receiptProducts,
    };
  } catch (err) {
    return {
      hst,
      deposit,
      productSubTotal,
      receiptProducts,
    };
  }
};
