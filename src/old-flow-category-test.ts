import {CURRENT_ENV} from "./util/constant";
import {Options} from "k6/options";

/* @ts-ignore */
import {randomItem} from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';
import {CatalogOperations} from "./ops/category-operations";
import {AuthOperations} from "./ops/auth-operations";
import {group} from "k6";

export let options: Options = {
    vus: 100,
    duration: '3m'
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

    group("old-flow-category", () => {
        catalogOps.getOldStyleCategory(authToken, CURRENT_ENV.categoryNames[0]);
       // catalogOps.getOldStyleCategory(authToken, randomItem(env.categoryNames));
        catalogOps.getOldStyleCategory(authToken, CURRENT_ENV.categoryNames[3]);
    })
    if (__ITER == 0) {
        console.log(`Virtual users: ${__VU}`);
    }
}
