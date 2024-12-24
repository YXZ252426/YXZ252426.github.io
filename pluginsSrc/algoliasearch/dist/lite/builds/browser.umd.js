(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["algoliasearch/lite"] = {}));
})(this, (function (exports) { 'use strict';

	function F(){function r(e){return new Promise(o=>{let t=new XMLHttpRequest;t.open(e.method,e.url,!0),Object.keys(e.headers).forEach(a=>t.setRequestHeader(a,e.headers[a]));let s=(a,n)=>setTimeout(()=>{t.abort(),o({status:0,content:n,isTimedOut:!0});},a),m=s(e.connectTimeout,"Connection timeout"),i;t.onreadystatechange=()=>{t.readyState>t.OPENED&&i===void 0&&(clearTimeout(m),i=s(e.responseTimeout,"Socket timeout"));},t.onerror=()=>{t.status===0&&(clearTimeout(m),clearTimeout(i),o({content:t.responseText||"Network request failed",status:t.status,isTimedOut:!1}));},t.onload=()=>{clearTimeout(m),clearTimeout(i),o({content:t.responseText,status:t.status,isTimedOut:!1});},t.send(e.data);})}return {send:r}}function W(r){let e,o=`algolia-client-js-${r.key}`;function t(){return e===void 0&&(e=r.localStorage||window.localStorage),e}function s(){return JSON.parse(t().getItem(o)||"{}")}function m(a){t().setItem(o,JSON.stringify(a));}function i(){let a=r.timeToLive?r.timeToLive*1e3:null,n=s(),p=Object.fromEntries(Object.entries(n).filter(([,h])=>h.timestamp!==void 0));if(m(p),!a)return;let f=Object.fromEntries(Object.entries(p).filter(([,h])=>{let P=new Date().getTime();return !(h.timestamp+a<P)}));m(f);}return {get(a,n,p={miss:()=>Promise.resolve()}){return Promise.resolve().then(()=>(i(),s()[JSON.stringify(a)])).then(f=>Promise.all([f?f.value:n(),f!==void 0])).then(([f,h])=>Promise.all([f,h||p.miss(f)])).then(([f])=>f)},set(a,n){return Promise.resolve().then(()=>{let p=s();return p[JSON.stringify(a)]={timestamp:new Date().getTime(),value:n},t().setItem(o,JSON.stringify(p)),n})},delete(a){return Promise.resolve().then(()=>{let n=s();delete n[JSON.stringify(a)],t().setItem(o,JSON.stringify(n));})},clear(){return Promise.resolve().then(()=>{t().removeItem(o);})}}}function K(){return {get(r,e,o={miss:()=>Promise.resolve()}){return e().then(s=>Promise.all([s,o.miss(s)])).then(([s])=>s)},set(r,e){return Promise.resolve(e)},delete(r){return Promise.resolve()},clear(){return Promise.resolve()}}}function v(r){let e=[...r.caches],o=e.shift();return o===void 0?K():{get(t,s,m={miss:()=>Promise.resolve()}){return o.get(t,s,m).catch(()=>v({caches:e}).get(t,s,m))},set(t,s){return o.set(t,s).catch(()=>v({caches:e}).set(t,s))},delete(t){return o.delete(t).catch(()=>v({caches:e}).delete(t))},clear(){return o.clear().catch(()=>v({caches:e}).clear())}}}function A(r={serializable:!0}){let e={};return {get(o,t,s={miss:()=>Promise.resolve()}){let m=JSON.stringify(o);if(m in e)return Promise.resolve(r.serializable?JSON.parse(e[m]):e[m]);let i=t();return i.then(a=>s.miss(a)).then(()=>i)},set(o,t){return e[JSON.stringify(o)]=r.serializable?JSON.stringify(t):t,Promise.resolve(t)},delete(o){return delete e[JSON.stringify(o)],Promise.resolve()},clear(){return e={},Promise.resolve()}}}function Y(r){let e={value:`Algolia for JavaScript (${r})`,add(o){let t=`; ${o.segment}${o.version!==void 0?` (${o.version})`:""}`;return e.value.indexOf(t)===-1&&(e.value=`${e.value}${t}`),e}};return e}function M(r,e,o="WithinHeaders"){let t={"x-algolia-api-key":e,"x-algolia-application-id":r};return {headers(){return o==="WithinHeaders"?t:{}},queryParameters(){return o==="WithinQueryParameters"?t:{}}}}function j({algoliaAgents:r,client:e,version:o}){let t=Y(o).add({segment:e,version:o});return r.forEach(s=>t.add(s)),t}function I(){return {debug(r,e){return Promise.resolve()},info(r,e){return Promise.resolve()},error(r,e){return Promise.resolve()}}}var H=2*60*1e3;function U(r,e="up"){let o=Date.now();function t(){return e==="up"||Date.now()-o>H}function s(){return e==="timed out"&&Date.now()-o<=H}return {...r,status:e,lastUpdate:o,isUp:t,isTimedOut:s}}var J=class extends Error{name="AlgoliaError";constructor(r,e){super(r),e&&(this.name=e);}},z=class extends J{stackTrace;constructor(r,e,o){super(r,o),this.stackTrace=e;}},Z=class extends z{constructor(r){super("Unreachable hosts - your application id may be incorrect. If the error persists, please reach out to the Algolia Support team: https://alg.li/support.",r,"RetryError");}},N=class extends z{status;constructor(r,e,o,t="ApiError"){super(r,o,t),this.status=e;}},ee=class extends J{response;constructor(r,e){super(r,"DeserializationError"),this.response=e;}},re=class extends N{error;constructor(r,e,o,t){super(r,e,t,"DetailedApiError"),this.error=o;}};function G(r){let e=r;for(let o=r.length-1;o>0;o--){let t=Math.floor(Math.random()*(o+1)),s=r[o];e[o]=r[t],e[t]=s;}return e}function te(r,e,o){let t=oe(o),s=`${r.protocol}://${r.url}${r.port?`:${r.port}`:""}/${e.charAt(0)==="/"?e.substring(1):e}`;return t.length&&(s+=`?${t}`),s}function oe(r){return Object.keys(r).filter(e=>r[e]!==void 0).sort().map(e=>`${e}=${encodeURIComponent(Object.prototype.toString.call(r[e])==="[object Array]"?r[e].join(","):r[e]).replace(/\+/g,"%20")}`).join("&")}function ae(r,e){if(r.method==="GET"||r.data===void 0&&e.data===void 0)return;let o=Array.isArray(r.data)?r.data:{...r.data,...e.data};return JSON.stringify(o)}function se(r,e,o){let t={Accept:"application/json",...r,...e,...o},s={};return Object.keys(t).forEach(m=>{let i=t[m];s[m.toLowerCase()]=i;}),s}function ne(r){try{return JSON.parse(r.content)}catch(e){throw new ee(e.message,r)}}function ie({content:r,status:e},o){try{let t=JSON.parse(r);return "error"in t?new re(t.message,e,t.error,o):new N(t.message,e,o)}catch{}return new N(r,e,o)}function ce({isTimedOut:r,status:e}){return !r&&~~e===0}function me({isTimedOut:r,status:e}){return r||ce({isTimedOut:r,status:e})||~~(e/100)!==2&&~~(e/100)!==4}function ue({status:r}){return ~~(r/100)===2}function le(r){return r.map(e=>Q(e))}function Q(r){let e=r.request.headers["x-algolia-api-key"]?{"x-algolia-api-key":"*****"}:{};return {...r,request:{...r.request,headers:{...r.request.headers,...e}}}}function B({hosts:r,hostsCache:e,baseHeaders:o,logger:t,baseQueryParameters:s,algoliaAgent:m,timeouts:i,requester:a,requestsCache:n,responsesCache:p}){async function f(u){let c=await Promise.all(u.map(l=>e.get(l,()=>Promise.resolve(U(l))))),x=c.filter(l=>l.isUp()),g=c.filter(l=>l.isTimedOut()),w=[...x,...g];return {hosts:w.length>0?w:u,getTimeout(l,T){return (g.length===0&&l===0?1:g.length+3+l)*T}}}async function h(u,c,x=!0){let g=[],w=ae(u,c),y=se(o,u.headers,c.headers),l=u.method==="GET"?{...u.data,...c.data}:{},T={...s,...u.queryParameters,...l};if(m.value&&(T["x-algolia-agent"]=m.value),c&&c.queryParameters)for(let d of Object.keys(c.queryParameters))!c.queryParameters[d]||Object.prototype.toString.call(c.queryParameters[d])==="[object Object]"?T[d]=c.queryParameters[d]:T[d]=c.queryParameters[d].toString();let S=0,L=async(d,b)=>{let E=d.pop();if(E===void 0)throw new Z(le(g));let q={...i,...c.timeouts},D={data:w,headers:y,method:u.method,url:te(E,u.path,T),connectTimeout:b(S,q.connect),responseTimeout:b(S,x?q.read:q.write)},$=C=>{let k={request:D,response:C,host:E,triesLeft:d.length};return g.push(k),k},R=await a.send(D);if(me(R)){let C=$(R);return R.isTimedOut&&S++,t.info("Retryable failure",Q(C)),await e.set(E,U(E,R.isTimedOut?"timed out":"down")),L(d,b)}if(ue(R))return ne(R);throw $(R),ie(R,g)},X=r.filter(d=>d.accept==="readWrite"||(x?d.accept==="read":d.accept==="write")),_=await f(X);return L([..._.hosts].reverse(),_.getTimeout)}function P(u,c={}){let x=u.useReadTransporter||u.method==="GET";if(!x)return h(u,c,x);let g=()=>h(u,c);if((c.cacheable||u.cacheable)!==!0)return g();let y={request:u,requestOptions:c,transporter:{queryParameters:s,headers:o}};return p.get(y,()=>n.get(y,()=>n.set(y,g()).then(l=>Promise.all([n.delete(y),l]),l=>Promise.all([n.delete(y),Promise.reject(l)])).then(([l,T])=>T)),{miss:l=>p.set(y,l)})}return {hostsCache:e,requester:a,timeouts:i,logger:t,algoliaAgent:m,baseHeaders:o,baseQueryParameters:s,hosts:r,request:P,requestsCache:n,responsesCache:p}}var O="5.18.0";function pe(r){return [{url:`${r}-dsn.algolia.net`,accept:"read",protocol:"https"},{url:`${r}.algolia.net`,accept:"write",protocol:"https"}].concat(G([{url:`${r}-1.algolianet.com`,accept:"readWrite",protocol:"https"},{url:`${r}-2.algolianet.com`,accept:"readWrite",protocol:"https"},{url:`${r}-3.algolianet.com`,accept:"readWrite",protocol:"https"}]))}function V({appId:r,apiKey:e,authMode:o,algoliaAgents:t,...s}){let m=M(r,e,o),i=B({hosts:pe(r),...s,algoliaAgent:j({algoliaAgents:t,client:"Lite",version:O}),baseHeaders:{"content-type":"text/plain",...m.headers(),...s.baseHeaders},baseQueryParameters:{...m.queryParameters(),...s.baseQueryParameters}});return {transporter:i,appId:r,clearCache(){return Promise.all([i.requestsCache.clear(),i.responsesCache.clear()]).then(()=>{})},get _ua(){return i.algoliaAgent.value},addAlgoliaAgent(a,n){i.algoliaAgent.add({segment:a,version:n});},setClientApiKey({apiKey:a}){!o||o==="WithinHeaders"?i.baseHeaders["x-algolia-api-key"]=a:i.baseQueryParameters["x-algolia-api-key"]=a;},searchForHits(a,n){return this.search(a,n)},searchForFacets(a,n){return this.search(a,n)},customPost({path:a,parameters:n,body:p},f){if(!a)throw new Error("Parameter `path` is required when calling `customPost`.");let c={method:"POST",path:"/{path}".replace("{path}",a),queryParameters:n||{},headers:{},data:p||{}};return i.request(c,f)},getRecommendations(a,n){if(a&&Array.isArray(a)&&(a={requests:a}),!a)throw new Error("Parameter `getRecommendationsParams` is required when calling `getRecommendations`.");if(!a.requests)throw new Error("Parameter `getRecommendationsParams.requests` is required when calling `getRecommendations`.");let P={method:"POST",path:"/1/indexes/*/recommendations",queryParameters:{},headers:{},data:a,useReadTransporter:!0,cacheable:!0};return i.request(P,n)},search(a,n){if(a&&Array.isArray(a)&&(a={requests:a.map(({params:c,...x})=>x.type==="facet"?{...x,...c,type:"facet"}:{...x,...c,facet:void 0,maxFacetHits:void 0,facetQuery:void 0})}),!a)throw new Error("Parameter `searchMethodParams` is required when calling `search`.");if(!a.requests)throw new Error("Parameter `searchMethodParams.requests` is required when calling `search`.");let P={method:"POST",path:"/1/indexes/*/queries",queryParameters:{},headers:{},data:a,useReadTransporter:!0,cacheable:!0};return i.request(P,n)}}}function It(r,e,o){if(!r||typeof r!="string")throw new Error("`appId` is missing.");if(!e||typeof e!="string")throw new Error("`apiKey` is missing.");return V({appId:r,apiKey:e,timeouts:{connect:1e3,read:2e3,write:3e4},logger:I(),requester:F(),algoliaAgents:[{segment:"Browser"}],authMode:"WithinQueryParameters",responsesCache:A(),requestsCache:A({serializable:!1}),hostsCache:v({caches:[W({key:`${O}-${r}`}),A()]}),...o})}

	exports.apiClientVersion = O;
	exports.liteClient = It;

}));