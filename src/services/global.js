import { http } from '@/plugins/axios';
import { stringify } from "qs";

export function queryList (params) {
    return http.post('/api/front/content/list', params)
}

export function queryDetail (params) {
    return http.get(`/api/front/content/get?${stringify(params)}`)
}