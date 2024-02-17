type dataType = "json" | "text" | any;
class Session {
    cookies: any={};
    globalHeaders: any={};
    async get(url: string, method?:any, returnType?: dataType): Promise<Response | any | string> {
        const response = await fetch(url, {
            headers: {
                ...method,
                ...this.globalHeaders,
                "cookie": this.getCookies()
            }
        })
        let responseCookies = response.headers.getSetCookie() 
        this.setCookies( responseCookies )
        
        return this.returnData(returnType, response)
    }

    async post(url: string, method: any, returnType: dataType, body:string): Promise<Response | any | string> {
        const response = await fetch(
            url, {
            headers: {
                ...method,
                ...this.globalHeaders,
                "cookie":this.getCookies()
            },
            body:body,
            method: "POST"
        })
        let responseCookies = response.headers.getSetCookie() 
        this.setCookies( responseCookies )
        return this.returnData(returnType, response)
    }
    async put(url: string, method: any, returnType: dataType, body:string): Promise<Response | any | string> {
        const response = await fetch(
            url, {
            headers: {
                ...method,
                ...this.globalHeaders,
                "cookie":this.getCookies()
            },
            body:body,
            method: "PUT"
        })
        let responseCookies = response.headers.getSetCookie() 
        this.setCookies( responseCookies )
        return this.returnData(returnType, response)
    }

    setCookies(newCookies: Array<string>) {
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

    async returnData(returnType: dataType, response: Response){
        switch (returnType) {
            case "json":
                const jsonData: any = await response.json();
                return jsonData
            case "text":
                const textData: string = await response.text();
                return textData
            default:
                return response;
        }
    }
}

export { Session }
