import axios, { AxiosResponse } from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import settings from "../settings";
type dataType = "json" | "text" | any;
class Session {
    cookies: any = {};
    globalHeaders: any = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-GB,en;q=0.9",
        "cache-control": "max-age=0",
        "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Microsoft Edge\";v=\"122\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
    };
    httpsAgent:HttpsProxyAgent<string>|null;
    selectedProxie:string|undefined;
    constructor(proxyUri: string|null) {
        if (proxyUri) {
            this.httpsAgent = new HttpsProxyAgent(proxyUri)    
        }else{
            this.httpsAgent = null
        }
    }}
    async get(url: string, method?: any): Promise<AxiosResponse<any, any>> {
        const response = await axios.get(url, {
            httpsAgent: this.httpsAgent,
            httpAgent: this.httpsAgent,
            headers: {
                ...method,
                ...this.globalHeaders,
                "cookie": this.getCookies()
            }
        })
        let responseCookies = response.headers["set-cookie"]
        this.setCookies(responseCookies)

        return response
    }

    async post(url: string, method: any, body: string): Promise<AxiosResponse<any, any>> {
        const response = await axios.post(
            url,
            body
            , {
                httpsAgent: this.httpsAgent,
                httpAgent: this.httpsAgent,
                headers: {
                    ...method,
                    ...this.globalHeaders,
                    "cookie": this.getCookies()
                },
            })
        let responseCookies = response.headers["set-cookie"]
        this.setCookies(responseCookies)
        return response
    }
    async put(url: string, method: any, body: string): Promise<AxiosResponse<any, any>> {
        const response = await axios.put(
            url, body, {
            httpsAgent: this.httpsAgent,
            httpAgent: this.httpsAgent,
            headers: {
                ...method,
                ...this.globalHeaders,
                "cookie": this.getCookies()
            },
        })
        let responseCookies = response.headers["set-cookie"]
        this.setCookies(responseCookies)
        return response
    }

    setCookies(newCookies: Array<string> | undefined) {
        if (newCookies == undefined) return;
        for (const cookie of newCookies) {
            let [name, value, _] = cookie.split(";")[0].split("=")
            let newCookieObject = { [name]: value }
            Object.assign(this.cookies, newCookieObject)
        }
    }
    getCookies(): string {
        let cookieString = "";
        for (const key in this.cookies) {
            cookieString += `${key}=${this.cookies[key]}; `
        }
        return cookieString;
    }
}

export { Session }
