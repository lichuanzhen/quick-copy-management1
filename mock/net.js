const mockUrl = 'http://192.168.20.79:10000/mock/59e573aeadad7f3b5135b39b';
// const realUrl = 'http://192.168.10.114:7869/console';
const realUrl = 'http://192.168.10.114:7878/console';
// const realUrl = 'http://192.168.10.119:7879/console';
const port = 36742;

const http = require('http');
const https = require('https');
const url = require('url');
const pass = require('stream').PassThrough;
const chalk = require('chalk');

const getHeader = function(req) {
    const ret = {};
    for (const i in req.headers) {
        if (!/^(host|connection|Access-|origin|referer|user-agent|user-doclever|path-doclever|url-doclever|method-doclever|headers-doclever)/i.test(i)) {
            ret[i] = req.headers[i];
        }
    }
    let headers = req.headers['headers-doclever'];
    if (headers) {
        headers = JSON.parse(headers);
        for (const key in headers) {
            ret[key] = headers[key];
        }
    }
    return ret;
};

const filterResHeader = function(headers, res) {
    const ret = {};
    res.setHeader('Cache-Control', 'no-cache,no-store');
    res.setHeader('Pragrma', 'no-cache');
    res.setHeader('Expires', 0);
    const resHeaders = res.getHeader('Access-Control-Expose-Headers') ? res.getHeader('Access-Control-Expose-Headers').toLowerCase() : '';
    for (const i in headers) {
        if (!/Access-/i.test(i)) {
            if (/set-cookie/i.test(i)) {
                for (let index = 0; index < headers[i].length; index++) {
                    headers[i][index] = headers[i][index].split(' ')[0];
                }
                ret[i] = headers[i];
            } else {
                ret[i] = headers[i];
            }
        }
        if (!resHeaders) {
            res.setHeader('Access-Control-Expose-Headers', i);
        } else if (resHeaders.indexOf(i.toLowerCase() + ',') === -1 && resHeaders.indexOf(',' + i.toLowerCase()) === -1) {
            res.setHeader('Access-Control-Expose-Headers', res.getHeader('Access-Control-Expose-Headers') + ',' + i);
        }
    }
    return ret;
};

const getPath = function(req) {
    let url = req.url;
    if (url.substr(0, 7).toLowerCase() === 'http://') {
        const i = url.indexOf('/', 7);
        if (i !== -1) {
            url = url.substr(i);
        }
    }
    return url;
};

function getHost(req) {
    let url = req.headers['url-doclever'];
    url = url.replace(/^(http:\/\/|https:\/\/)/i, '');
    const arr = url.split(':');
    return arr[0];
}

function getPort(req) {
    let url = req.headers['url-doclever'];
    let defaultPort;
    if (req.headers['url-doclever'].toLowerCase().startsWith('https://')) {
        defaultPort = 443;
    } else {
        defaultPort = 80;
    }
    url = url.replace(/^(http:\/\/|https:\/\/)/i, '');
    const arr = url.split(':');
    return arr.length > 1 ? arr[1] : defaultPort;
}

function mock(req, res) {
    const obj = url.parse(mockUrl);
    const path = req.headers.path || url.parse(req.url).path;
    const opt = {
        host: obj.hostname,
        path: (obj.pathname === '/' ? '' : obj.pathname) + path,
        method: req.method,
        headers: getHeader(req),
        port: obj.port ? obj.port : 80
    };
    console.log('初次请求：method:' + opt.method + ' host:' + opt.host + ' port:' + opt.port + ' path:' + opt.path);
    if (opt.headers['content-length']) {
        delete opt.headers['content-length'];
    }
    let stream;
    const req2 = http.request(opt, res2 => {
        if (!realUrl || res2.headers['finish-doclever'] === '0') {
            console.log(chalk.yellow('接口开发中，返回mock数据'));
            res.writeHead(res2.statusCode, filterResHeader(res2.headers, res));
            res2.pipe(res);
            res2.on('end', () => {

            });
        } else {
            console.log(chalk.green('接口已完成，调用真实接口'));
            const headers = getHeader(req);
            const objUrl = url.parse(realUrl);
            let request1, opt1;
            if (objUrl.protocol === 'http:') {
                opt1 = {
                    host: objUrl.hostname,
                    path: (objUrl.pathname === '/' ? '' : objUrl.pathname) + path,
                    method: req.method,
                    port: objUrl.port ? objUrl.port : 80,
                    headers
                };
                request1 = http.request;
            } else {
                opt1 = {
                    host: objUrl.hostname,
                    path: (objUrl.pathname === '/' ? '' : objUrl.pathname) + path,
                    method: req.method,
                    port: objUrl.port ? objUrl.port : 443,
                    headers,
                    rejectUnauthorized: false,
                    requestCert: true
                };
                request1 = https.request;
            }
            console.log(chalk.green('调用真实接口：method:' + opt1.method + 'host:' + opt1.host + 'port:' + opt1.port + 'path:' + opt1.path));
            const req3 = request1(opt1, res3 => {
                console.log(chalk.green('真实接口调用完成。status:' + res3.statusCode));
                res.writeHead(res3.statusCode, filterResHeader(res3.headers, res));
                res3.pipe(res);
                res3.on('end', () => {

                });
            });
            if (/POST|PUT/i.test(req.method)) {
                stream.pipe(req3);
            } else {
                req3.end();
            }
            req3.on('error', err => {
                res.end(err.stack);
            });
        }
    });
    if (/POST|PUT/i.test(req.method)) {
        stream = new pass();
        req.pipe(stream);
        req.pipe(req2);
    } else {
        req2.end();
    }
    req2.on('error', err => {
        res.end(err.stack);
    });
}

function handleHeader(req, res) {
    if (!req.headers.origin) {
        return;
    }
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.headers['access-control-request-headers']) {
        res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    }
    res.setHeader('Access-Control-Expose-Headers', 'connection,content-length,date,x-powered-by,content-encoding,server,etag,accept-ranges,allow,content-language,set-cookie');
    if (req.method === 'OPTIONS') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end();
        return;
    }
}

function redirect(res, bHttps, opt, location) {
    let urlRedirect = location;
    if (urlRedirect.startsWith('/')) {
        urlRedirect = (bHttps ? 'https://' : 'http://') + opt.host + urlRedirect;
    }
    const objUrl = url.parse(urlRedirect);
    let request1, opt1;
    if (objUrl.protocol === 'http:') {
        opt1 = {
            host: objUrl.hostname,
            path: objUrl.path,
            method: 'GET',
            port: objUrl.port ? objUrl.port : 80
        };
        request1 = http.request;
        bHttps = false;
    } else {
        opt1 = {
            host: objUrl.hostname,
            path: objUrl.path,
            method: 'GET',
            port: objUrl.port ? objUrl.port : 443,
            rejectUnauthorized: false,
            requestCert: true
        };
        request1 = https.request;
        bHttps = true;
    }
    const req3 = request1(opt1, res3 => {
        if (res3.statusCode === 302) {
            redirect(res, bHttps, opt, res3.headers.location);
        } else {
            res.writeHead(res3.statusCode, filterResHeader(res3.headers, res));
            res3.pipe(res);
            res3.on('end', () => {

            });
        }
    });
    req3.end();
    req3.on('error', err => {
        res.end(err.stack);
    });
}

function proxy(req, res) {
    let bHttps = false;
    if (req.headers['url-doclever'].toLowerCase().startsWith('https://')) {
        bHttps = true;
    }
    let opt, request;
    if (bHttps) {
        opt = {
            host: getHost(req),
            path: req.headers['path-doclever'],
            method: req.headers['method-doclever'],
            headers: getHeader(req),
            port: getPort(req),
            rejectUnauthorized: false,
            requestCert: true
        };
        request = https.request;
    } else {
        opt = {
            host: getHost(req),
            path: req.headers['path-doclever'],
            method: req.headers['method-doclever'],
            headers: getHeader(req),
            port: getPort(req)
        };
        request = http.request;
    }
    const req2 = request(opt, res2 => {
        if (res2.statusCode === 302) {
            redirect(res, bHttps, opt, res2.headers.location);
        } else {
            res.writeHead(res2.statusCode, filterResHeader(res2.headers, res));
            res2.pipe(res);
            res2.on('end', () => {

            });
        }
    });
    if (/POST|PUT/i.test(req.method)) {
        req.pipe(req2);
    } else {
        req2.end();
    }
    req2.on('error', err => {
        res.end(err.stack);
    });
}

const onProxy = function(req, res) {
    handleHeader(req, res);
    if (req.method === 'OPTIONS') {
        return;
    }
    if (!req.headers['url-doclever']) {
        mock(req, res);
    } else {
        proxy(req, res);
    }
};

// var arguments = process.argv.splice(2);
// var mockUrl = arguments[0];
// var realUrl = arguments[1];

const server = http.createServer(onProxy);
// server.listen(36742);
server.listen(port);
console.log(arguments.length > 0 ? '内网测试，Mock数据正待命运行中！' : '正在运行中，请用DOClever的接口测试页面进行内网测试！');