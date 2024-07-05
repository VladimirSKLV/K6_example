import {BaseOperations} from "../util/base-operations";
import {BUILT_METRICS, CATALOG_TRENDS, CURRENT_ENV} from "../util/constant";

export class CatalogOperations extends BaseOperations {

    constructor() {
        super(BUILT_METRICS.CATALOG);
    }

    getMerchantCategories(token: string) {
        let url = `${CURRENT_ENV.apiUrl}/merchant-categories`
        return this.getOperation(token, url, CATALOG_TRENDS.GET_MERCHANT_CATEGORIES)
    }

    getOldStyleCategory(token: string, categoryName: string) {
        let url = `${CURRENT_ENV.apiUrl}/merchant-categories/${categoryName}`
        return this.getOperation(token, url, CATALOG_TRENDS.GET_MERCHANT_CATEGORY)
    }

    getNewStyleCategory(token: string, categoryName: string,
                        offset: number,
                        countOfStores: number,
                        latitude: number,
                        longitude: number) {
        let url = `${CURRENT_ENV.apiUrl}/merchant-categories/${categoryName}?offset=${offset}&countOfStores=${countOfStores}`;
        url += `&latitude=${latitude}&longitude=${longitude}`;
        return this.getOperation(token, url, CATALOG_TRENDS.GET_MERCHANT_CATEGORY_NEW);
    }

}