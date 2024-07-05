import {CURRENT_ENV} from "./util/constant";
import {Options} from "k6/options";

/* @ts-ignore */
import {AuthOperations} from "./ops/auth-operations";
import {CatalogOperations} from "./ops/category-operations";
import {sleep} from "k6";
import {MerchantOperations} from "./ops/merchant-operations";

export let options: Options = {
    vus: 1,
    duration: '20s'
};

/**
 * To ensure that the requests follow each other,
 * use the sleep function in the k6 load testing tool.
 */

export default (): void => {
    const authOps: AuthOperations = new AuthOperations();
    let requestBody = {
        username: CURRENT_ENV.phoneNumber,
        password: CURRENT_ENV.password,
        timeZone: CURRENT_ENV.timeZone,
        deviceId: CURRENT_ENV.deviceId,
    };
    let authToken = authOps.auth(requestBody);

    const catalogOps: CatalogOperations = new CatalogOperations();
    const merchantOps: MerchantOperations = new MerchantOperations();

    catalogOps.getMerchantCategories(authToken);
    sleep(1);
    catalogOps.getNewStyleCategory(authToken, CURRENT_ENV.categoryNames[0], 1, 20, 55.718248, 37.477174);
    sleep(1);
    merchantOps.getMerchantStore(authToken, CURRENT_ENV.merchantId[0], CURRENT_ENV.storeId[0]);
    sleep(1);
    merchantOps.postOfferValidation(authToken, CURRENT_ENV.merchantId[0], CURRENT_ENV.offerId[0], CURRENT_ENV.formValidate);
    sleep(1);
    merchantOps.deleteLoyaltyCard(authToken, CURRENT_ENV.merchantId[0])
    sleep(1);

    if (__ITER == 0) {
        console.log(`Virtual users: ${__VU}`);
    }

}