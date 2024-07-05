import {Counter, Trend} from "k6/metrics";

interface TestSettings {
    apiUrl: string;
    deviceId: string;
    password: string;
    timeZone: string;
    phoneNumber: string;
    categoryNames: Array<string>;
    merchantId: Array<string>;
    storeId: Array<string>;
    offerId: Array<string>;
    formValidate: any;
}

export const PROD_SETTINGS: TestSettings = {
    apiUrl: 'https://myurl_prod',
    deviceId: 'XXXXXXXXXXXX',
    password: '0000',
    timeZone: 'Europe/Moscow',
    phoneNumber: '7XXXXXXXXXXX',
    categoryNames: ['Кафе', 'Ресторан', 'Вендинг', 'Пекарня', 'Магазин'],
    merchantId: ['UQRG'],
    storeId: ['20211206-XXXX-XXXX-XXXX-XXXXXXXX'],
    offerId: [''],
    formValidate: {
        "firstName": "Vladimir",
        "middleName": "Sokolov",
        "lastName": "Vladimirovich",
        "birthday": "1990-01-01",
        "email": "test@test.com"
    }
}

export const UAT_SETTINGS: TestSettings = {
    apiUrl: 'https://myurl_test_stand',
    deviceId: 'XXXXXXXXXXXX',
    password: '0000',
    timeZone: 'Europe/Moscow',
    phoneNumber: '7XXXXXXXXXXX',
    categoryNames: ['Кафе', 'Тестовые мерчанты', 'Еда', 'Тестовые магазины'],
    merchantId: ['REWQ'],
    storeId: ['20211206-XXXX-XXXX-XXXX-XXXXXXXX'],
    offerId: ['2ad42bed-XXXX-XXXX-XXXX-XXXXXXXX'],
    formValidate: {
        "firstName": "Vladimir",
        "middleName": "Sokolov",
        "lastName": "Vladimirovich",
        "birthday": "1990-01-01",
        "email": "test@test.com"
    }
}

export const CURRENT_ENV = UAT_SETTINGS;

export const AUTH_TRENDS: { [key: string]: string; } = {
    POST_AUTH: 'POST->auth'
};

export const CATALOG_TRENDS: { [key: string]: string; } = {
    GET_MERCHANT_CATEGORIES: 'GET->merchant-categories',
    GET_MERCHANT_CATEGORY: 'GET->merchant-categories/...',
    GET_MERCHANT_CATEGORY_NEW: 'GET->(new)merchant-categories/...',
    GET_MERCHANT_STORE: 'GET->merchants/(id)/store/...',
    POST_OFFER_VALIDATION: 'POST->/actions/validate...',
    DEL_LOYALTY_CARD: 'DELETE->merchant-loyalty-cards/(mid)'
};

export const NEW_CATEGORY_TRENDS: { [key: string]: string; } = {

};

export interface ITrend {
    blocked: Trend;
    connecting: Trend;
    sending: Trend,
    waiting: Trend,
    receiving: Trend,
    duration: Trend,
    counter: Trend,
    not200: Trend,
    // notSuccess: new Counter('requests_notSuccess')
}

export const buildMetricsObject = (trend: { [key: string]: string; }): { [key: string]: ITrend; } => {
    let trends: { [key: string]: ITrend; } = {};

    for (let trendKey of Object.values(trend)) {

        trends = Object.assign(trends, {
            [trendKey]:
                ['blocked', 'connecting', 'sending', 'waiting', 'receiving', 'duration', 'counter', 'not200', 'notSuccess']
                    .reduce((obj, item) => {
                        if (item === 'counter' || item === 'not_200' || item === 'not_success') {
                            return Object.assign(obj, {[item]: new Counter(`${trendKey}_${item}`)})
                        } else {
                            return Object.assign(obj, {[item]: new Trend(`${trendKey}_${item}`)})
                        }
                    }, {})
        });
    }

    return trends;
}

export const BUILT_METRICS = {
    AUTH: buildMetricsObject(AUTH_TRENDS),
    CATALOG: buildMetricsObject(CATALOG_TRENDS)
}


// {
//     blocked: new Trend('requests_blocked'),
//         connecting: new Trend('requests_connecting'),
//     sending: new Trend('requests_sending'),
//     waiting: new Trend('requests_waiting'),
//     receiving: new Trend('requests_receiving'),
//     duration: new Trend('requests_duration'),
//     counter: new Counter('requests_counter'),
//     not200: new Counter('requests_not200')
// }

export const HTTP_RESPONSE = {
    SUCCESS_CODE: 200,
    SUCCESS_STATUS: ''
}

export const buildHeaders = (token: string) => {
    return token ? Object.assign(
        HEADER.PARAMS,
        {
            headers: Object.assign(
                HEADER.PARAMS.headers,
                {
                    "X-Auth-Token": token
                }
            )
        }
    ) : HEADER.PARAMS;
}

export const HEADER: { [key: string]: any; } = {
    PARAMS: {
        headers: {
            "Content-Type": "application/json"
        },
        timeout: 3600000
    }
}