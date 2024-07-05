import {BaseOperations} from "../util/base-operations";
import {BUILT_METRICS, CATALOG_TRENDS, CURRENT_ENV} from "../util/constant";

export class MerchantOperations extends BaseOperations {

    constructor() {
        super(BUILT_METRICS.CATALOG);
    }

    getMerchantStore(token: string, merchantId: string, storeId: string, loadOffers?: string) {
        let url = `${CURRENT_ENV.apiUrl}/merchants/${merchantId}/stores/${storeId}`;
        url += `?loadOffers=${loadOffers}`;
        return this.getOperation(token, url, CATALOG_TRENDS.GET_MERCHANT_STORE);
    }

    postOfferValidation(token: string, merchantId: string, offerId: string, requestBody: any) {
        let url = `${CURRENT_ENV.apiUrl}/merchants/${merchantId}/offers/${offerId}/actions/validate`;
        return this.postOperation(token, url, JSON.stringify(requestBody), CATALOG_TRENDS.POST_OFFER_VALIDATION);
    }

    deleteLoyaltyCard(token: string, merchantId: string) {
        let url = `${CURRENT_ENV.apiUrl}/merchant-loyalty-card/${merchantId}`;
        return this.delOperation(token, url, CATALOG_TRENDS.DEL_LOYALTY_CARD);
    }

}