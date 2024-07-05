import {BaseOperations} from "../util/base-operations";
import {AUTH_TRENDS, BUILT_METRICS, CURRENT_ENV} from "../util/constant";

export class AuthOperations extends BaseOperations {

    constructor() {
        super(BUILT_METRICS.AUTH);
    }

    auth(authObj: any): string {
        let url = `${CURRENT_ENV.apiUrl}/auth`
        const response = this.noAuthPostOperation(url, JSON.stringify(authObj), AUTH_TRENDS.POST_AUTH);
        return response['token'];
    }

}