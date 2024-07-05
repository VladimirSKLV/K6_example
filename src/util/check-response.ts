import {check} from "k6";
import {HTTP_RESPONSE, ITrend} from "./constant";
import {RefinedResponse} from "k6/http";

export const checkResponse = (res: RefinedResponse<any>,
                              metricObj: ITrend,
                              tags?: { [name: string]: string }) => {

    metricObj.blocked.add(res.timings.blocked, tags);
    metricObj.connecting.add(res.timings.connecting, tags);
    metricObj.sending.add(res.timings.sending, tags);
    metricObj.waiting.add(res.timings.waiting, tags);
    metricObj.receiving.add(res.timings.receiving, tags);
    metricObj.duration.add(res.timings.duration, tags);
    metricObj.counter.add(1, tags);
    if (res.status !== HTTP_RESPONSE.SUCCESS_CODE) {
        metricObj.not200.add(1, tags)
    }

    return check(res, {
        "is status 200": res => {
            if (res.status !== HTTP_RESPONSE.SUCCESS_CODE) {
                console.log('STATUS -> ' + res.status)
            }
            return res.status === HTTP_RESPONSE.SUCCESS_CODE
        },
        // "is status = success": res => {
        //     if (res.status === HTTP_RESPONSE.SUCCESS_CODE) {
        //         const body = JSON.parse(res.body);
        //         if (body.code) {
        //             console.log('ERROR -> ' + JSON.stringify(body))
        //             TRENDS.notSuccess.add(1, tags);
        //         }
        //         return body.status === HTTP_RESPONSE.SUCCESS_STATUS;
        //     }
        //
        //     return false;
        // }
    })
}
