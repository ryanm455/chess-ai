if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise((async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]}))},s=(s,a)=>{Promise.all(s.map(e)).then((e=>a(1===e.length?e[0]:e)))},a={require:Promise.resolve(s)};self.define=(s,c,i)=>{a[s]||(a[s]=Promise.resolve().then((()=>{let a={};const n={uri:location.origin+s.slice(1)};return Promise.all(c.map((s=>{switch(s){case"exports":return a;case"module":return n;default:return e(s)}}))).then((e=>{const s=i(...e);return a.default||(a.default=s),a}))})))}}define("./sw.js",["./workbox-8778d57b"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/aNfo1x8zD4PQXkmB8lAsl/_buildManifest.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/aNfo1x8zD4PQXkmB8lAsl/_ssgManifest.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/05d954cf.7864086e29d6a8f1a61d.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/17.90a3e9aff925d9866269.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/18.c8ea5ba7a6baac06ffef.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/19.0df787d65d32545afd0c.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/27b0cbef06fd77ddd9de2451212f7025402ab391.e586a0aa2539efceb58c.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/31d0ed0fa936fe5212f6ea9f3dc068417f935f83.dfa668539214f84a2ce8.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/4c31a6f94cd6042b66a59f2ac40aa63136954e39.c00c1303f071ea8d44a6.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/60eaf1e46d4fdd988bc29b73d0e2c526cd1c8ee9.c3d61f5008a1a7e41cfb.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/74faac878406eaa16c360aecb5954f6ec6f00370.c42e08002cc4d3fcffad.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/aiPlayLogic-6fd772714147ff2a1ce6.worker.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/commons.a43060cd47550e88f73c.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/framework.5fd1fd15bc22f534f962.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/main-561cc663de7fbdf15953.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/pages/_app-66695319c2628bcd8b1a.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/pages/_error-7e93654e4186c2916e54.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/pages/about-7f5e6e66cc4526c792bb.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/pages/index-41e8c85e00cecc9e086d.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/pages/play-0f30ca7dc155b72f05a2.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/pages/stats-83ebcc56fda643439313.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/polyfills-3d65ca2b39e779f83241.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/chunks/webpack-b75a4390c3c9b0cf9324.js",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/css/3487649eaebb606ca2a0.css",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/media/bB.e1a52addd489b6c0a5a82b9b016de84d.svg",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/media/bK.0843f9c456563572981bd2d1a0e1dba0.svg",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/media/bN.46c4b3a96cc14795302cad7319d0ca3d.svg",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/media/bP.0b4c4e3052f6ceab27cd3fa0218168e2.svg",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/media/bQ.2baa6b588f718ccb4227bbef3e744657.svg",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/media/bR.c1ec7c641d1689ec457f2891cb96b4e5.svg",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/media/brown.346be924255409efc4be77d04bbcb1a6.svg",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/media/wB.6a5db4e00551e268747b60589c01314a.svg",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/media/wK.d45e8c4380c29962e4da2c094c02e027.svg",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/media/wN.72ce2510bf190a43c6b4b3f65edec798.svg",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/media/wP.589a984c3d2d88bb2847ffaebf2d0af8.svg",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/media/wQ.b069e38bd85cca00883f4dc89a5d018a.svg",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/_next/static/media/wR.a5a16b367926231b6079ae531371b789.svg",revision:"aNfo1x8zD4PQXkmB8lAsl"},{url:"/icon.png",revision:"b91cb255ab7478941baa53d014111e46"},{url:"/icons/apple-icon-180.png",revision:"cc836b866019c24b9696b954a8f5d8d4"},{url:"/icons/apple-splash-1125-2436.png",revision:"13f4a3fc50d780f9cb85f83dd11fa390"},{url:"/icons/apple-splash-1136-640.png",revision:"41963fa7a0a71c9ad4e61732d4505b8d"},{url:"/icons/apple-splash-1170-2532.png",revision:"459034a6f571dc5deaff6906c9354dde"},{url:"/icons/apple-splash-1242-2208.png",revision:"bd493ad9a0b4d77dac797f52030f742f"},{url:"/icons/apple-splash-1242-2688.png",revision:"4b80c973dc0ced6c7be56d74c7604a5d"},{url:"/icons/apple-splash-1284-2778.png",revision:"f20c5628e07fe590259191cb61d8705a"},{url:"/icons/apple-splash-1334-750.png",revision:"0b8bee6d3f27534277399a795087abca"},{url:"/icons/apple-splash-1536-2048.png",revision:"e620ac883cb930ce3c84930dc1580ceb"},{url:"/icons/apple-splash-1620-2160.png",revision:"8fc48a80f332004727b7bcc4149c54e3"},{url:"/icons/apple-splash-1668-2224.png",revision:"064c3988b4f093578b67e5c81b9d8c7e"},{url:"/icons/apple-splash-1668-2388.png",revision:"8e00f4cea5f671d4173ad01cf6a0e044"},{url:"/icons/apple-splash-1792-828.png",revision:"de4a4bda97886856cc0989230aa17ba6"},{url:"/icons/apple-splash-2048-1536.png",revision:"cd364b22b0f4a2ed272e80729aa3e40c"},{url:"/icons/apple-splash-2048-2732.png",revision:"bf30c35d7e75e8385e4808b9f5cd0089"},{url:"/icons/apple-splash-2160-1620.png",revision:"e60048487817caa6c47cee2d95872d7e"},{url:"/icons/apple-splash-2208-1242.png",revision:"448d8c036e58d3474c037f505b9ed48a"},{url:"/icons/apple-splash-2224-1668.png",revision:"3672516a6d8de5b440be0d644d27544c"},{url:"/icons/apple-splash-2388-1668.png",revision:"3a212bb73a777b3ce53c7499819dd696"},{url:"/icons/apple-splash-2436-1125.png",revision:"569001e8f555dcee230e763b111fd121"},{url:"/icons/apple-splash-2532-1170.png",revision:"8b2d0fd0f6d578fa6142b504ae93394d"},{url:"/icons/apple-splash-2688-1242.png",revision:"5ad460379028ac7c30806af7a173d432"},{url:"/icons/apple-splash-2732-2048.png",revision:"f34ac480007cfbf8782814aeccb22594"},{url:"/icons/apple-splash-2778-1284.png",revision:"122da2f0b7672112b918ea8215aedef4"},{url:"/icons/apple-splash-640-1136.png",revision:"409ecaf1af457b6d270fe30292c81738"},{url:"/icons/apple-splash-750-1334.png",revision:"7460e9bf40e7d7ddf9682a849eb42b5f"},{url:"/icons/apple-splash-828-1792.png",revision:"ffa41fe451ec61d4ee6b9d69c773265f"},{url:"/icons/favicon.ico",revision:"9205cfa91ebfda197a7b75a4e646d510"},{url:"/icons/manifest-icon-192.png",revision:"651bd89245d722021ed6eae7064e8a00"},{url:"/icons/manifest-icon-512.png",revision:"baa939a62d1146fac6979c21f043cbe8"},{url:"/img/app-install.svg",revision:"e1ab65faf9b34b347df6109465efbf4f"},{url:"/img/chessboard.png",revision:"981b5d51a1a6f5f71b09317c29dd2ccb"},{url:"/img/offline.svg",revision:"d5598f3f888a5e0288ddb66ea05476a1"},{url:"/manifest.json",revision:"97f7d2cf6c64e8f3c09c42214d9c91b6"},{url:"/robots.txt",revision:"bbbcde0b15cabd06aace1df82d335978"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));