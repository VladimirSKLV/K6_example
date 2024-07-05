import {CURRENT_ENV} from "./util/constant";
import {Options} from "k6/options";

/* @ts-ignore */
import {AuthOperations} from "./ops/auth-operations";
import {CatalogOperations} from "./ops/category-operations";

export let options: Options = {
    vus: 1,
    duration: '15s'
};

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

    catalogOps.getMerchantCategories(authToken);
    if (__ITER == 0) {
        console.log(`Virtual users: ${__VU}`);
    }
}