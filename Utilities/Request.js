'use strict';

const request = require('superagent');
const HttpAgent = require('agentkeepalive');
const HttpsAgent = require('agentkeepalive').HttpsAgent;
const https = require('https');
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// var rootCas = require('ssl-root-cas/latest').create();
// var rootCas = require('ssl-root-cas').create();
//  console.log(rootCas)
// default for all https requests
// (whether using https directly, request, or another module)
// https.globalAgent.options.ca = rootCas;

const options = {
    maxSockets: 512,
    maxFreeSockets: 512,
    timeout: 60 * 1000, // active socket keepalive for 60 seconds
    freeSocketTimeout: 30 * 1000, // free socket keepalive for 30 seconds
};
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
const keepAliveHttpAgent = new HttpAgent(options);
const keepAliveHttpsAgent = new HttpsAgent(options);

class Request {

    post(url,data) {
        return request.post(url).send(data).agent(this.getAgent(url));
    }

    get(url) {
        return request.get(url).agent(this.getAgent(url));
    }

    patch(url) {
        return request.patch(url).agent(this.getAgent(url));
    }

    put(url) {
        return request.put(url).agent(this.getAgent(url));
    }

    delete(url) {
        return request.delete(url).agent(this.getAgent(url));
    }

    getAgent(url) {
        if (url.indexOf('https') >= 0) {
            return keepAliveHttpsAgent;
        }
        return keepAliveHttpAgent;
    }

    agent() {
        return {
            httpAgent: keepAliveHttpAgent,
            httpsAgent: keepAliveHttpsAgent
        };
    }
    async httpsPost(baseUrl,endpoint,data){
        return new Promise((resolve, reject) => {
            data= JSON.stringify(data)
        const options = {
            hostname: baseUrl,
            port: 443,
            path:endpoint,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': data.length
            },
                        // secureProtocol: "TLSv1_2_method",
    //         minVersion: "TLSv1.2",
    // maxVersion: "TLSv1.2"

          }
            const httpsRequest = https.request(options, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data = data + chunk.toString();
                });
              
                response.on('end', () => {
                    // console.log(">>>>>>>",body);
                try{
                    const body = JSON.parse(data);
                    console.log(body);
                    resolve(body);
                }catch(err){
                    reject(data)
                }
                 });   
            })
            .setTimeout(10000)

            httpsRequest.on("timeout",()=>{
                console.log("timeout error")
                let error={}
                error.timeout=true
                reject(error)
             })
              
            httpsRequest.on('error', (error) => {
                console.log('An error', error);
                reject(error) 
            });

            httpsRequest.write(data)
            httpsRequest.end() 
        
        })
    }
}

module.exports = new Request();