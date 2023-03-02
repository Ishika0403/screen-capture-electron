import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  KioskPayment,
  PAYMENT_TYPE,
  PinpadResponse,
  PINPAD_REQUEST_TYPE,
  ReceiptData,
  STORAGEKEYS,
  TRAN_ID,
} from './constants';
import {
  fetchStoredValue,
  getStoreSettings,
  parsedGiftCardResponse,
  parsedPinPadResponse,
  parsePinpadStatusCheck,
  storeValue,
} from './helpers';
import { useInfiniteQuery } from 'react-query';
import logger from '../utils/rendererLogs';

const baseURL = process.env.REACT_APP_BASEURL;
const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = fetchStoredValue(STORAGEKEYS.STORE_TOKEN);
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    } else {
      //   window.location.href = '/';
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   function (error) {
//     const originalRequest = error.config;
//     const refreshTokenUrl = `${baseURL}/auth/refresh-token`;
//     const incomingUrl = `${originalRequest.url}`;
//     if(error.response.status === 403){
//       window.location.href = "/";
//     }
//     if (
//       error.response.status === 401
//     ) {
//       if(originalRequest.url === refreshTokenUrl){
//         window.location.href = '/';
//       }
//     }
//     if ( error.response.status === 401 ){
//       return Promise.reject(error);
//     }

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const {
//         refresh: { token: refreshToken },
//       } = JSON.parse(fetchStoredValue(STORAGEKEYS.STORE_TOKEN)) || {
//         refresh: { token: "" },
//       };

//       return instance
//         .post(refreshTokenUrl, {
//           refreshToken,
//         })
//         .then((res) => {
//           storeValue(STORAGEKEYS.STORE_TOKEN, JSON.stringify(res.data));
//           originalRequest.headers.Authorization =
//             "Bearer " + res.data.access.token;
//           return axios(originalRequest);
//         })
//         .catch((err) => {
//           if (err.response) {
//             const { statusCode, message } = err.response.data || {
//               statusCode: 400,
//               message: "Something went wrong",
//             };
//             console.log(statusCode);
//             console.log(message);
//             console.log("[axios-interceptor-err]", statusCode,message);
//           }
//           throw new Error(err.message);
//         });
//     }
//     return Promise.reject(error);
//   }
// );

// const responseBody = (response: AxiosResponse) => response.data;

export const authApis = {
  authLogin: (storeName: number, password: string): Promise<any> => {
    const url = `kiosk-auth/login`;
    return axiosInstance.post(url, { userId: storeName, password });
  },
};
const kioskAddLogsForSettingsPage = (errorMsg: string) => {
  const storeId = fetchStoredValue(STORAGEKEYS.STORE_ID);
  const kioskId = fetchStoredValue(STORAGEKEYS.KIOSK_ID);

  const url = `${baseURL}/orders/kiosk-logs`;
  return axiosInstance
    .post(url, {
      storeId,
      kioskId,
      logs: errorMsg,
    })
    .catch((err) => {
      console.log('logs', err);
    });
};

export const pinpadApis = {
  creditCardPayment: (paymentObj: {
    tranId: string;
    refNumber: string;
    receipt: string;
    amount: number;
    requestType: PINPAD_REQUEST_TYPE;
  }): Promise<PinpadResponse | any> => {
    const storeSettings = getStoreSettings();
    let userName = '';
    let password = '';
    let ipAddress = '';
    if (storeSettings) {
      userName = storeSettings.username;
      password = storeSettings.password;
      ipAddress = storeSettings.ipAddress;
    }

    const data = `<?xml version="1.0" encoding="utf-8" ?>\r\n
      <Request TranID="${paymentObj.tranId}" Type="${paymentObj.requestType}" Version="1.0">\r\n
      <Amount>${paymentObj.amount}</Amount>\r\n
      <RefNumber>${paymentObj.refNumber}</RefNumber>\r\n
      <Receipt>${paymentObj.receipt}</Receipt>\r\n
      </Request>`;

    const token = Buffer.from(`${userName}:${password}`).toString('base64');
    const url = `http://${userName}:${password}@${ipAddress}/cgi-bin/cardpayment`;
    const config = {
      method: 'post',
      url,
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/xml',
      },
      data,
      timeout: 120000,
    };
    // return new Promise((resolve, reject) => {
    //   axios(config)
    //     .then(function (response) {
    //       console.log(JSON.stringify(response.data));
    //       const resp = parsedPinPadResponse(response.data);
    //       // console.log('testing->', response.data);
    //       resolve(resp);
    //     })
    //     .catch(function (error) {
    //       logger.error('pinpadApis-creditCardPayment', {
    //         error: error,
    //       });
    //       reject(error);
    //     });
    // });

    // return paymentInstance.post(url, body, { timeout: 10000 });
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          const XMLdata = pinpadResponseSuccess(paymentObj.amount);
          // const XMLdata = pinpadResponseFailure();
          // Assume xmlText contains the example XML

          const resp = parsedPinPadResponse(XMLdata);

          console.log('-->resp-->', resp);
          resolve(resp);
          // if(resp.paymentDetails.paymentStatus === '001'){
          //   resolve(resp);
          // } else {
          //   reject({
          //     ResponseCode: '903',
          //   });
          // }
        }, 2000);
      } catch (err) {
        reject({
          ResponseCode: '051',
          message: err.message,
        });
      }
    });
  },

  giftCardPayment: (paymentObj: {
    tranId: string;
    refNumber: string;
    receipt: string;
    amount: number;
  }) => {
    const storeSettings = getStoreSettings();
    let userName = '';
    let password = '';
    let ipAddress = '';
    if (storeSettings) {
      userName = storeSettings.username;
      password = storeSettings.password;
      ipAddress = storeSettings.ipAddress;
    }

    const data = `<?xml version="1.0" encoding="utf-8" ?>\r\n
      <Request TranID="${paymentObj.tranId}" Type="GCRedemption" Version="1.0">\r\n
      <Amount>${paymentObj.amount}</Amount>\r\n
      <RefNumber>${paymentObj.refNumber}</RefNumber>\r\n
      <Receipt>${paymentObj.receipt}</Receipt>\r\n
      </Request>`;

    const token = Buffer.from(`${userName}:${password}`).toString('base64');
    const url = `http://${userName}:${password}@${ipAddress}/cgi-bin/cardpayment`;
    const config = {
      method: 'post',
      url,
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/xml',
      },
      data,
      timeout: 120000,
    };
    return new Promise((resolve, reject) => {
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          const resp = parsedGiftCardResponse(response.data);
          console.log('testing->', response.data);
          resolve(resp);
        })
        .catch(function (error) {
          console.log(error);
          logger.error('pinpadApis-gifcardPayment', {
            error: error,
          });
          reject('Payment failed.');
        });
    });

    // return new Promise((resolve, reject) => {
    //   try {
    //     setTimeout(() => {
    //       const XMLdata = giftCardResponseSuccess(paymentObj.amount);
    //       // Assume xmlText contains the example XML
    //       const resp = parsedGiftCardResponse(XMLdata);
    //       if (resp.paymentDetails.paymentStatus === '000') {
    //         resolve(resp);
    //       } else {
    //         reject({
    //           ResponseCode: '903',
    //         });
    //       }
    //     }, 2000);
    //   } catch (err) {
    //     console.log('giftCardPayment', err)
    //     reject({
    //       ResponseCode: '903',
    //     });
    //   }
    // });
  },
  posStatusCheck: (userName, password, ipAddress): Promise<any> => {
    // const uid = Date.now();
    const uid = TRAN_ID;
    const url = `http://${userName}:${password}@${ipAddress}/cgi-bin/admin/testcommunications?TranID=${uid}`;
    var config = {
      method: 'post',
      url,
      headers: {},
      timeout: 60000,
    };

    return new Promise((resolve, reject) => {
      axios(config)
        .then(function (response) {
          console.log('response', response);
          if (response) {
            resolve(response.data);
          } else {
            resolve('');
          }
          // const resp = parsePinpadStatus(response.data);
          // console.log("testing->", resp);
          resolve(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log('posStatusCheck', error.message);
          logger.error('posStatusCheck', {
            error: error,
          });
          kioskAddLogsForSettingsPage(
            JSON.stringify({
              errMsg: error.message,
              functionName: 'posStatusCheck',
            })
          );
          if (
            (error?.response?.data && error?.response?.data.includes('401')) ||
            (error?.message && error.message.includes('Invalid URL'))
          ) {
            reject('Invalid username or password or ip address.');
          } else {
            reject(
              'Pin pad status check timed out. Please verify your pin pad credentials in the Pin Pad Management screen in the kiosk application. Your 3 main credentials can be found when restarting (unplugging and plugging back in the pin pad). The information you are looking for is the Username, Password, and IP Address.'
            );
          }
        });
    });

    // return new Promise((resolve, reject) => {
    //   try {
    //     setTimeout(() => {
    //       const pinPadStatusXML = pinpadStatusResponse();
    //       // Assume xmlText contains the example XML
    //       // const resp = parsePinpadStatusCheck(pinPadStatusXML);
    //       console.log('-->resp-->', pinPadStatusXML);
    //       resolve(pinPadStatusXML);
    //     }, 2000);
    //   } catch (err) {
    //     reject({
    //       ResponseCode: '051',
    //     });
    //   }
    // });
  },
  giftCardBalance: () => {
    const storeSettings = getStoreSettings();
    let userName = '';
    let password = '';
    let ipAddress = '';
    if (storeSettings) {
      userName = storeSettings.username;
      password = storeSettings.password;
      ipAddress = storeSettings.ipAddress;
    }

    const data = `<?xml version="1.0" encoding="utf-8" ?>\r\n
      <Request TranID="${Date.now()}" Type="${
      PINPAD_REQUEST_TYPE.GIFTCARD_BALANCE
    }" Version="1.0">\r\n
      </Request>`;

    const token = Buffer.from(`${userName}:${password}`).toString('base64');
    const url = `http://${userName}:${password}@${ipAddress}/cgi-bin/cardpayment`;
    const config = {
      method: 'post',
      url,
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/xml',
      },
      data,
      timeout: 120000,
    };
    return new Promise((resolve, reject) => {
      axios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
          logger.error('pinpadApis-giftCardBalance', {
            error: error,
          });
          reject('Check balance failed.');
        });
    });
  },
  sendDignostics: (
    userName: string,
    password: string,
    ipAddress: string,
    terminalId: string
  ): Promise<string> => {
    if (!userName || !userName.trim()) {
      return Promise.resolve('Username is missing.');
    } else if (!password || !password.trim()) {
      return Promise.resolve('Password is missing.');
    } else if (!ipAddress || !ipAddress.trim()) {
      return Promise.resolve('IP Address is missing.');
    } else if (!terminalId || !terminalId.trim()) {
      return Promise.resolve('Terminal ID is missing.');
    }
    const url = `http://${userName}:${password}@${ipAddress}/cgi-bin/admin/uploaddiagnostics?TranID=001&terminalid=${terminalId}`;
    var config = {
      method: 'get',
      url,
      headers: {},
      timeout: 20000,
    };

    return new Promise((resolve, reject) => {
      axios(config)
        .then(function (response) {
          // console.log('testing->', response);
          resolve(JSON.stringify(response));
        })
        .catch(function (error) {
          console.log(error.message);
          logger.error('sendDignostics-err', {
            error: error,
          });
          kioskAddLogsForSettingsPage(
            JSON.stringify({
              errMsg: error.message,
              functionName: 'sendDignostics',
            })
          );

          if (error.message.includes('timeout of')) {
            resolve('Request time out.');
          } else {
            resolve(error.message);
          }
        });
    });
  },
  pinpadHostDownload: (
    userName: string,
    password: string,
    ipAddress: string,
    host2ip: string,
    host2port: string,
    isHost1: boolean
  ): Promise<string> => {
    if (!userName || !userName.trim()) {
      return Promise.resolve('Username is missing.');
    } else if (!password || !password.trim()) {
      return Promise.resolve('Password is missing.');
    } else if (!ipAddress || !ipAddress.trim()) {
      return Promise.resolve('IP Address is missing.');
    } else if (!host2ip || !host2ip.trim()) {
      return Promise.resolve('Host2 Ip is missing.');
    } else if (!host2port || !host2port.trim()) {
      return Promise.resolve('Host2 Port is missing.');
    }
    const hostType = isHost1 ? 'Host1Download' : 'Host2Download';
    const url = `http://${userName}:${password}@${ipAddress}//cgi-bin/tms?function=${hostType}&type=full&ip=${host2ip}&port=${host2port}&value=&TranID="001"`;
    var config = {
      method: 'get',
      url,
      headers: {},
      timeout: 40000,
    };
    return new Promise((resolve, reject) => {
      axios(config)
        .then(function (response) {
          // console.log('testing->', response);
          console.log('testing->', response);
          logger.log('pinpadHostDownload-log', {
            response,
          });
          if (response?.data) {
            resolve(JSON.stringify(response?.data));
          } else {
            resolve('Please verify Host 2 IP and Host 2 Port credentials.');
          }
        })
        .catch(function (error) {
          console.log(error.message);
          logger.error('sendDignostics-err', {
            error: error,
          });
          kioskAddLogsForSettingsPage(
            JSON.stringify({
              errMsg: error.message,
              functionName: 'pinpadHostDownload',
            })
          );

          if (error.message.includes('timeout of')) {
            resolve(
              'Request time out. Please verify Host 2 IP and Host 2 Port credentials.'
            );
          } else if (error.message.includes('Invalid URL')) {
            resolve(
              'Invalid credentials. Please verify username, password, ip address, host 2 IP and host 2 Port credentials.'
            );
          } else {
            resolve(error.message);
          }
        });
    });
  },
  kioskPaymentUpdate: (body: KioskPayment) => {
    const url = `${baseURL}/orders/kiosk-payment`;
    return axiosInstance.post(url, body);
  },
  kioskAddLogs: (
    storeNumber: string,
    kioskNumber: string,
    errorMsg: string
  ) => {
    const url = `${baseURL}/orders/kiosk-logs`;
    return axiosInstance
      .post(url, {
        storeId: storeNumber,
        kioskId: kioskNumber,
        logs: errorMsg,
      })
      .catch((err) => {
        console.log('kioskAddLogs-err', err);
      });
  },
  kioskOrderFailed: (paymentDetails, kioskDetails, cartDetails) => {
    const url = `${baseURL}/orders/kiosk-order-failed`;
    console.log('kioskOrderFailure', {
      paymentDetails,
      kioskDetails,
      cartDetails,
    });
    return axiosInstance.post(url, {
      paymentDetails,
      kioskDetails,
      cartDetails,
    });
  },
};

export const iceApis = {
  fetchAllIce: () => {
    const url = `${baseURL}/ice`;
    return axiosInstance.get(url);
  },

  addIceToCart: (cartId: string, body: any) => {
    const url = `${baseURL}/cart/${cartId}/ice`;
    return axiosInstance.post(url, body);
  },
};

export const cartApis = {
  getCartList: (cartId: string, storeId: string, type: string) => {
    const url = `${baseURL}/cart/${cartId}?storeId=${storeId}&type=${type}`;
    return axiosInstance.get(url);
  },
  addToCart: (body: any) => {
    const url = `${baseURL}/cart`;
    return axiosInstance.post(url, body);
  },
  clearCart: (cartId: string) => {
    const url = `${baseURL}/cart/${cartId}`;
    return axiosInstance.delete(url);
  },
  addItemsToCart: (id: string, data: any) => {
    const url = `${baseURL}/cart/${id}/items`;
    return axiosInstance.post(url, data);
  },
  deleteItemFromCart: (cartId: string, itemId: string) => {
    const url = `${baseURL}/cart/${cartId}/items/${itemId}`;
    return axiosInstance.delete(url);
  },
  updateCartItemQuantity: (cartId: string, itemId: string, data: any) => {
    const url = `${baseURL}/cart/${cartId}/items/${itemId}`;
    return axiosInstance.patch(url, data);
  },
  checkInventory: (cartId: string, storeId: string) => {
    const url = `${baseURL}/checkouts/check/inventory?cartId=${cartId}&storeId=${storeId}&type=PICKUP`;
    return axiosInstance.get(url);
  },
  checkConsignment: (checkoutId: string, storeId: string) => {
    const url = `${baseURL}/checkouts/${checkoutId}/consignments/${storeId}`;
    return axiosInstance.post(url, { checkoutId });
  },
  checkOrderStatus: (checkoutId: string) => {
    const url = `${baseURL}/orders/${checkoutId}/checkOrderStatus`;
    return axiosInstance.get(url);
  },
  placeOrder: (checkoutId: string, parsedTranId: string) => {
    const url = `${baseURL}/orders/order/order-queue`;
    return axiosInstance.post(url, {
      deviceToken: '',
      deviceType: 'kiosk',
      checkout_id: checkoutId,
      transaction_id: `${parsedTranId}`,
      source: 'kiosk',
      insertId: '',
    });
  },
};

export const categories = {
  fetchAll: () => {
    const url = `${baseURL}/beer-category/data-light?group=true`;
    return axiosInstance.get(url);
  },
};

export const beerApis = {
  fetchBeer: (productId: string) => {
    const url = `${baseURL}/beer/${productId}/data-light`;
    return axiosInstance.get(url);
  },
};

export const productsApis = {
  fetchProductsApi: (
    page: any,
    search: string,
    dataId?: any,
    isSale?: boolean,
    isNew?: boolean
  ) => {
    const storeSettings = getStoreSettings();
    const storedOnSale = fetchStoredValue(STORAGEKEYS.ON_SALE);
    const storedwhatsNew = fetchStoredValue(STORAGEKEYS.WHATS_NEW);
    const onSale = storedOnSale ? Number(storedOnSale) : 0;
    const whatsNew = storedwhatsNew ? Number(storedwhatsNew) : 0;
    let storeNumber = fetchStoredValue(STORAGEKEYS.STORE_ID);
    if (storeSettings) {
      storeNumber = storeSettings.storeNumber;
    } else {
      // TODO: refactoring of code required
    }

    const filterIds = dataId.filter(
      (itm) => itm !== onSale && itm !== whatsNew
    );
    let skip = (page - 1) * 20;
    const createQuery = (params: any) => {
      const query = Object.keys(params || {})
        .map((k) => encodeURIComponent(params[k]))
        .join('%2C%20');
      return query;
    };
    const url = createQuery(filterIds);

    let filterCategory = '';

    if (url) {
      filterCategory = `category=${url}&`;
    }
    let queryUrl = `${baseURL}/beer/data-light?${filterCategory}sale=${isSale}&is_new=${isNew}&skip=${skip}&search=${search}&take=20&customer=0&brand=${storeNumber}&stock=true`;
    return axiosInstance.get(queryUrl);
    // console.info(filterIds,"filterIds");
    // const url = createQuery(filterIds);
    // let queryUrl = url
    //   ? `${baseURL}/beer/data-light?${isSale}?null:category=${url}&sale=${isSale}&is_new=${isNew}&skip=${skip}&search=${search}&take=20&customer=0&brand=2002&stock=true`
    //   : `${baseURL}/beer/data-light?brand=2002&skip=${skip}&search=${search}&take=20&customer=0&stock=true`;
    // return axiosInstance.get(queryUrl);
  },
  fetchProducts: (
    search: any,
    dataId?: any,
    isSale?: boolean,
    isNew?: boolean
  ) => {
    return useInfiniteQuery(
      ['fetch-all-products', dataId, search, isSale, isNew],
      ({ pageParam = 1 }) =>
        productsApis.fetchProductsApi(pageParam, search, dataId, isSale, isNew),
      {
        staleTime: 30000,
        refetchOnMount: true,
        onError: (error) => console.log(`Something went wrong: ${error}`),
        getNextPageParam: (lastPage, allPages) => {
          // console.log('lastPage, allpages');
          const maxpage = Math.ceil(lastPage.data.pagination.total / 20);
          // console.log(maxpage, 'maxPAge=======');
          const nextPage = allPages?.length + 1;
          // console.log(allpages, 'nextPage=======');
          return nextPage <= maxpage ? nextPage : undefined;
        },
      }
    );
  },
  fetchIce: () => {
    const url = `${baseURL}/ice`;
    return axiosInstance.get(url);
  },
  addIce: (cartId: string, payload: any) => {
    const url = `${baseURL}/cart/${cartId}/ice`;
    return axiosInstance.post(url, payload);
  },
};

export const checkInternetConnection = async () => {
  let condition = navigator.onLine ? 'online' : 'offline';
  if (condition === 'online') {
    try {
      await fetch(`${baseURL}/status`);
      return true;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

// export const fetchApiProducts = async (productId: string) => {
//     // const queryUrl = `${BASE_URL}/beer/${productId}/data-light/0`;
//     const queryUrl = `${BASE_URL}/beer/${productId}/data-light`;
//     try {
//       setIsAddingToCart(true);
//       const response = await axios.get(queryUrl, config, bodyParameters);
//       if (response?.status) {
//         setIsAddingToCart(false);
//       }
//       const { data } = response;
//       setData(data);
//       if (data) {
//         console.log(data, 'select_item');
//         logEvent(analytics, 'select_item', {
//           item_list_id: "1",
//           item_list_name: 'Beer Listing',
//           items: [
//             {
//               item_id: data.id,
//               item_name: data.name.split('~')[0].replace(/\-/g, '_'),
//               item_brand: data.producer,
//               item_category: data.categoryName,
//               currency: 'CAD',
//               location_id: data.sku.split('_')[1],
//               index: 1,
//             },
//           ],
//         });
//         productDataOperationHandler(data);
//         return data;
//       }
//     } catch (err) {
//       console.error(err);
//       setIsAddingToCart(false);
//     }
// }

export const pinpadResponseFailure = () => {
  return `
  <?xml version="1.0" encoding="utf-8"?>
<Response TranID="437" Type="Purchase" Version="1.0">
    <TerminalID>N1000710BS03</TerminalID>
    <RefNumber>201469178</RefNumber>
    <Date>20220919</Date>
    <Time>081054</Time>
    <Amount>100</Amount>
    <ResponseCode>201</ResponseCode>
    <AccountNumber>************3803</AccountNumber>
    <CardEntryMethod>RF</CardEntryMethod>
    <CardBrand>DP</CardBrand>
    <EmvAID>A0000002771010</EmvAID>
    <EmvAppLabel>Interac</EmvAppLabel>
    <Invoice>4</Invoice>
    <RRN>001002003</RRN>
    <EmvTVR>8000008000</EmvTVR>
    <TotalAmount>100</TotalAmount>
    <TranStatusMerch>(903) - DECLINED -</TranStatusMerch>
    <TranStatusCust>(903) - REFUSÉE -</TranStatusCust>
    <HostResponseCode>903</HostResponseCode>
    <CardLanguageCode>2</CardLanguageCode>
    <MerchantNumber>29999992</MerchantNumber>
    <SignatureRequired>N</SignatureRequired>
    <MandatoryCustomerReceipt>Y</MandatoryCustomerReceipt>
    <MandatoryMerchantReceipt>Y</MandatoryMerchantReceipt>
    <MerchantReceiptText>^0     P2PON BEER STORE KIOSK
^0   3381 STEELES AVE E M2H3S9
^0        TORONTO ONT  ON
^0            29999992
^0          N1000710BS03
^0
^2****        PURCHASE        ****
^009-19-2022              08:10:55
^0Acct #   ************3803     RF
^0Card Type  DP
^0A0000002771010           Interac
^0
^0Inv. # 4
^0Auth #             RRN 001002003
^0TVR 8000008000
^0
^2Total                   $1.00
^3       (903) - DECLINED -
^0
^0   Retain this copy for your
^0            records
^0         Merchant copy
^0
^0
^0
</MerchantReceiptText>
    <CustomerReceiptText>^0     P2PON BEER STORE KIOSK
^0   3381 STEELES AVE E M2H3S9
^0        TORONTO ONT  ON
^0            29999992
^0          N1000710BS03
^0
^2****         ACHAT          ****
^009-19-2022              08:10:55
^0No compte ************3803    RF
^0Type carte DP
^0A0000002771010           Interac
^0
^0No facture 4
^0No aut             RRN 001002003
^0
^2Total                   $1.00
^3       (903) - REFUSÉE -
^0
^0 Conservez cette copie pour vos
^0            dossiers
^0          Copie client
^0
^0
^0
</CustomerReceiptText>
    <AppStatusCode>000000</AppStatusCode>
</Response>
`;
};

export const pinpadResponseSuccess = (amount) => {
  return `<?xml version="1.0" encoding="utf-8"?>
    <Response TranID="437" Type="Purchase" Version="1.0">
    <TerminalID>N1000710BS03</TerminalID>
    <RefNumber>201469178</RefNumber>
    <Date>20220130</Date>
    <Time>125717</Time>
    <Amount>${amount}</Amount>
    <ResponseCode>000</ResponseCode>
    <AccountNumber>************4165</AccountNumber>
    <CardEntryMethod>C </CardEntryMethod>
    <CardBrand>VI</CardBrand>
    <EmvAID>A0000000031010</EmvAID>
    <EmvAppLabel>VISA CREDIT</EmvAppLabel>
    <CardExpDate>XXXX</CardExpDate>
    <Trace>6</Trace>
    <Invoice>8</Invoice>
    <AuthCode>138974</AuthCode>
    <RRN>001003004</RRN>
    <EmvTVR>80C0008000</EmvTVR>
    <EmvTSI>7800</EmvTSI>
    <EmvAC>2B55E281CBE11D8B</EmvAC>
    <EmvAcType>TC</EmvAcType>
    <TotalAmount>10000</TotalAmount>
    <TranStatusMerch>(001) APPROVED-THANK YOU</TranStatusMerch>
    <TranStatusCust>(001) APPROVED-THANK YOU</TranStatusCust>
    <PinVerified>Y</PinVerified>
    <HostResponseCode>001</HostResponseCode>
    <CardLanguageCode>1</CardLanguageCode>
    <MerchantNumber>29999992</MerchantNumber>
    <SignatureRequired>N</SignatureRequired>
    <MandatoryCustomerReceipt>Y</MandatoryCustomerReceipt>
    <MandatoryMerchantReceipt>Y</MandatoryMerchantReceipt>
    <MerchantReceiptText>^0     P2PON BEER STORE KIOSK
    ^0   3381 STEELES AVE E M2H3S9
    ^0        TORONTO ONT  ON
    ^0            29999992
    ^0          N1000710BS03
    ^0
    ^2****        PURCHASE        ****
    ^009-26-2022              01:00:00
    ^0Acct #   ************4165     C
    ^0Card Type  VI
    ^0A0000000031010       VISA CREDIT
    ^0
    ^0Trace # 6
    ^0Inv. # 8
    ^0Auth # 138974      RRN 001003004
    ^0TVR 80C0008000          TSI 7800
    ^0TC 2B55E281CBE11D8B
    ^0
    ^2Total                 $100.00
    ^2    (001) APPROVED-THANK YOU
    ^0         (PIN VERIFIED)
    ^0
    ^0   Retain this copy for your
    ^0            records
    ^0         Merchant copy
    ^0
    ^0
    ^0
    </MerchantReceiptText>
    <CustomerReceiptText>^0     P2PON BEER STORE KIOSK
    ^0   3381 STEELES AVE E M2H3S9
    ^0        TORONTO ONT  ON
    ^0            29999992
    ^0          N1000710BS03
    ^0
    ^2****        PURCHASE        ****
    ^009-22-2022              12:57:17
    ^0Acct #   ************4165     C
    ^0Card Type  VI
    ^0A0000000031010       VISA CREDIT
    ^0
    ^0Trace # 6
    ^0Inv. # 8
    ^0Auth # 138974      RRN 001003004
    ^0
    ^2Total                 $100.00
    ^2    (001) APPROVED-THANK YOU
    ^0
    ^0   Retain this copy for your
    ^0            records
    ^0         Customer copy
    ^0
    ^0
    ^0
    </CustomerReceiptText>
    <AppStatusCode>000000</AppStatusCode>
    </Response>`;
};

export const pinpadStatusResponse = () => {
  return `
    <?xml version="1.0" encoding="utf-8"?>
    <Response TranID="001" Type="TestComms" Version="1.0">
    <TerminalID>N1000710BS03</TerminalID>
    <Date>20221026</Date>
    <Time>041925</Time>
    <ResponseCode>000</ResponseCode>
    <RawData>Communication Test Report

    Connection Type: Ethernet
    IP: 10.0.0.60
    Netmask: 255.255.255.0
    Broadcast: 10.0.0.255
    MAC: 78:11:85:70:27:2D
    Connecting Address 1: 76.9.198.154 38603
    SSL Socket - OK! (3610 ms)
    Sending Request - OK! (120 ms)
    Receiving Response - OK! (200 ms)
    ====================
    Test Completed!

    </RawData>
    <AppStatusCode>000000</AppStatusCode>
    </Response>
  `;
};

export const giftCardResponseSuccess = (amount) => {
  return `
      <?xml version="1.0" encoding="utf-8"?>
    <Response TranID="a7da70c3d8e84d85a5c775b11" Type="GCRedemption" Version="1.0">
        <TerminalID>N1000710BS03</TerminalID>
        <RefNumber>&lt;RefNumber>20117002/RefNumber>&amp;#xd;
    &lt;Receipt>1&lt;/Receipt>
        &lt;/RefNumber></RefNumber>
        <Date>20221124</Date>
        <Time>221517</Time>
        <Amount>${amount}</Amount>
        <ResponseCode>000</ResponseCode>
        <Account>63625515499100000987</Account>
        <ResultCode>948565</ResultCode>
        <ApprovedAmount>1000</ApprovedAmount>
        <Trace>756308</Trace>
        <Balance>12700</Balance>
        <Invoice>62</Invoice>
        <MerchantReceiptText>^0
    ^0     P2PON BEER STORE KIOSK
    ^0   3381 STEELES AVE E M2H3S9
    ^0        TORONTO ONT  ON
    ^0          N1000710BS03
    ^0
    ^0Inv. # 62
    ^2****  FORCED REDEMPTION  ****
    ^011-24-2022              22:15:15
    ^0Card #      636255******0000098*
    ^0Trace #                   756308
    ^0Auth #                    948565
    ^0Purchase:                 $10.00

    ^0Approved Amount:          $10.00

    ^0         0 APPROVED

    ^0       Merchant Copy

    </MerchantReceiptText>
        <CustomerReceiptText>^0
    ^0     P2PON BEER STORE KIOSK
    ^0   3381 STEELES AVE E M2H3S9
    ^0        TORONTO ONT  ON
    ^0          N1000710BS03
    ^0
    ^0Inv. # 62
    ^2****  FORCED REDEMPTION  ****
    ^011-24-2022              22:15:15
    ^0Card #      636255******0000098*
    ^0Trace #                   756308
    ^0Auth #                    948565
    ^0Purchase:                 $10.00

    ^0Approved Amount:          $10.00
    ^0Card Balance:            $127.00

    ^0         0 APPROVED

    ^0       Customer Copy

    </CustomerReceiptText>
        <AppStatusCode>000000</AppStatusCode>
    </Response>
  `;
};
