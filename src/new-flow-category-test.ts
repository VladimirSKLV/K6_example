import {CURRENT_ENV} from "./util/constant";
import {Options} from "k6/options";

/* @ts-ignore */
import {AuthOperations} from "./ops/auth-operations";
import {group} from "k6";
import {CatalogOperations} from "./ops/category-operations";

export let options: Options = {
    vus: 1,
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
    let authToken: string;

    authToken = authOps.auth(requestBody);

    const catalogOps: CatalogOperations = new CatalogOperations();

    group("new catalog", () => {
        catalogOps.getNewStyleCategory(authToken, CURRENT_ENV.categoryNames[0],
            1, 20,
            55.718248, 37.477174);
        //catalogOps.getNewStyleCategory(authToken, randomItem(env.categoryNames), 20, 20, 55.718248, 37.477174);
        catalogOps.getNewStyleCategory(authToken, CURRENT_ENV.categoryNames[3],
            1, 20,
            55.718248, 37.477174);
    })
    if (__ITER == 0) {
        console.log(`Virtual users: ${__VU}`);
    }
}