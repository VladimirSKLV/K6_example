import http from "k6/http";
import {checkResponse} from "./check-response";
import {buildHeaders, ITrend} from "./constant";

export class BaseOperations {

    private readonly metrics: { [key: string]: ITrend; };

    constructor(metrics: { [key: string]: ITrend; }) {
        this.metrics = metrics;
    }

    noAuthPostOperation(url: string, payload: any, trendKey: string): any {
        return this.postOperation('', url, payload, trendKey)
    }

    postOperation(token: string, url: string, payload: any, trendKey: string): any {
        //console.log("POST ---- > " + url + " -> " + JSON.stringify(payload))
        const response = http.post(url, payload, buildHeaders(token));
        checkResponse(response, this.metrics[trendKey], {});
        return response.json();
    }

    noAuthGetOperation(url: string, trendKey: string): any {
        return this.getOperation('', url, trendKey);
    }

    getOperation(token: string, url: string, trendKey: string): any {
        //console.log("GET ---- > " + url)
        const response = http.get(url, buildHeaders(token));
        checkResponse(response, this.metrics[trendKey], {});
        if (!url.includes('download-report-xlsx')) {
            return response.json();
        } else {
            return {
                empty: "empty"
            };
        }
    }

    delOperation(token: string, url: string, trendKey: string) {
        //console.log("DEL ---- > " + url)
        const response = http.del(url, null, buildHeaders(token));
        checkResponse(response, this.metrics[trendKey], {});
        return response.json();
    }

    patchOperation(token: string, url: string, payload: any, trendKey: string) {
        //console.log("PATCH ---- > " + url + " -> " + JSON.stringify(payload))
        const response = http.patch(url, payload, buildHeaders(token));
        checkResponse(response, this.metrics[trendKey], {});
        return response.json();
    }
}
