_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[8],{0:function(e,t,r){r("74v/"),e.exports=r("nOHt")},"1mXj":function(e,t,r){(function(e){!function(t){"use strict";function r(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function n(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0})}function o(e,t,r){o.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:r,enumerable:!0})}function i(e,t){i.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function a(e,t){a.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function u(e,t,r){u.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:r,enumerable:!0})}function c(e,t,r){var n=e.slice((r||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,n),e}function f(e){var t="undefined"==typeof e?"undefined":N(e);return"object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function l(e,t,r,n,s,d,p){p=p||[];var h=(s=s||[]).slice(0);if("undefined"!=typeof d){if(n){if("function"==typeof n&&n(h,d))return;if("object"===("undefined"==typeof n?"undefined":N(n))){if(n.prefilter&&n.prefilter(h,d))return;if(n.normalize){var g=n.normalize(h,d,e,t);g&&(e=g[0],t=g[1])}}}h.push(d)}"regexp"===f(e)&&"regexp"===f(t)&&(e=e.toString(),t=t.toString());var m="undefined"==typeof e?"undefined":N(e),v="undefined"==typeof t?"undefined":N(t),y="undefined"!==m||p&&p[p.length-1].lhs&&p[p.length-1].lhs.hasOwnProperty(d),b="undefined"!==v||p&&p[p.length-1].rhs&&p[p.length-1].rhs.hasOwnProperty(d);if(!y&&b)r(new i(h,t));else if(!b&&y)r(new a(h,e));else if(f(e)!==f(t))r(new o(h,e,t));else if("date"===f(e)&&e-t!==0)r(new o(h,e,t));else if("object"===m&&null!==e&&null!==t)if(p.filter((function(t){return t.lhs===e})).length)e!==t&&r(new o(h,e,t));else{if(p.push({lhs:e,rhs:t}),Array.isArray(e)){var w;for(e.length,w=0;w<e.length;w++)w>=t.length?r(new u(h,w,new a(void 0,e[w]))):l(e[w],t[w],r,n,h,w,p);for(;w<t.length;)r(new u(h,w,new i(void 0,t[w++])))}else{var x=Object.keys(e),E=Object.keys(t);x.forEach((function(o,i){var a=E.indexOf(o);a>=0?(l(e[o],t[o],r,n,h,o,p),E=c(E,a)):l(e[o],void 0,r,n,h,o,p)})),E.forEach((function(e){l(void 0,t[e],r,n,h,e,p)}))}p.length=p.length-1}else e!==t&&("number"===m&&isNaN(e)&&isNaN(t)||r(new o(h,e,t)))}function s(e,t,r,n){return n=n||[],l(e,t,(function(e){e&&n.push(e)}),r),n.length?n:void 0}function d(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":d(o[r.path[n]],r.index,r.item);break;case"D":delete o[r.path[n]];break;case"E":case"N":o[r.path[n]]=r.rhs}}else switch(r.kind){case"A":d(e[t],r.index,r.item);break;case"D":e=c(e,t);break;case"E":case"N":e[t]=r.rhs}return e}function p(e,t,r){if(e&&t&&r&&r.kind){for(var n=e,o=-1,i=r.path?r.path.length-1:0;++o<i;)"undefined"==typeof n[r.path[o]]&&(n[r.path[o]]="number"==typeof r.path[o]?[]:{}),n=n[r.path[o]];switch(r.kind){case"A":d(r.path?n[r.path[o]]:n,r.index,r.item);break;case"D":delete n[r.path[o]];break;case"E":case"N":n[r.path[o]]=r.rhs}}}function h(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":h(o[r.path[n]],r.index,r.item);break;case"D":case"E":o[r.path[n]]=r.lhs;break;case"N":delete o[r.path[n]]}}else switch(r.kind){case"A":h(e[t],r.index,r.item);break;case"D":case"E":e[t]=r.lhs;break;case"N":e=c(e,t)}return e}function g(e,t,r){if(e&&t&&r&&r.kind){var n,o,i=e;for(o=r.path.length-1,n=0;n<o;n++)"undefined"==typeof i[r.path[n]]&&(i[r.path[n]]={}),i=i[r.path[n]];switch(r.kind){case"A":h(i[r.path[n]],r.index,r.item);break;case"D":case"E":i[r.path[n]]=r.lhs;break;case"N":delete i[r.path[n]]}}}function m(e,t,r){e&&t&&l(e,t,(function(n){r&&!r(e,t,n)||p(e,t,n)}))}function v(e){return"color: "+C[e].color+"; font-weight: bold"}function y(e){var t=e.kind,r=e.path,n=e.lhs,o=e.rhs,i=e.index,a=e.item;switch(t){case"E":return[r.join("."),n,"\u2192",o];case"N":return[r.join("."),o];case"D":return[r.join(".")];case"A":return[r.join(".")+"["+i+"]",a];default:return[]}}function b(e,t,r,n){var o=s(e,t);try{n?r.groupCollapsed("diff"):r.group("diff")}catch(e){r.log("diff")}o?o.forEach((function(e){var t=e.kind,n=y(e);r.log.apply(r,["%c "+C[t].text,v(t)].concat(_(n)))})):r.log("\u2014\u2014 no diff \u2014\u2014");try{r.groupEnd()}catch(e){r.log("\u2014\u2014 diff end \u2014\u2014 ")}}function w(e,t,r,n){switch("undefined"==typeof e?"undefined":N(e)){case"object":return"function"==typeof e[n]?e[n].apply(e,_(r)):e[n];case"function":return e(t);default:return e}}function x(e){var t=e.timestamp,r=e.duration;return function(e,n,o){var i=["action"];return i.push("%c"+String(e.type)),t&&i.push("%c@ "+n),r&&i.push("%c(in "+o.toFixed(2)+" ms)"),i.join(" ")}}function E(e,t){var r=t.logger,n=t.actionTransformer,o=t.titleFormatter,i=void 0===o?x(t):o,a=t.collapsed,u=t.colors,c=t.level,f=t.diff,l="undefined"==typeof t.titleFormatter;e.forEach((function(o,s){var d=o.started,p=o.startedTime,h=o.action,g=o.prevState,m=o.error,v=o.took,y=o.nextState,x=e[s+1];x&&(y=x.prevState,v=x.started-d);var E=n(h),j="function"==typeof a?a((function(){return y}),h,o):a,k=T(p),S=u.title?"color: "+u.title(E)+";":"",A=["color: gray; font-weight: lighter;"];A.push(S),t.timestamp&&A.push("color: gray; font-weight: lighter;"),t.duration&&A.push("color: gray; font-weight: lighter;");var D=i(E,k,v);try{j?u.title&&l?r.groupCollapsed.apply(r,["%c "+D].concat(A)):r.groupCollapsed(D):u.title&&l?r.group.apply(r,["%c "+D].concat(A)):r.group(D)}catch(e){r.log(D)}var O=w(c,E,[g],"prevState"),N=w(c,E,[E],"action"),_=w(c,E,[m,g],"error"),P=w(c,E,[y],"nextState");if(O)if(u.prevState){var C="color: "+u.prevState(g)+"; font-weight: bold";r[O]("%c prev state",C,g)}else r[O]("prev state",g);if(N)if(u.action){var L="color: "+u.action(E)+"; font-weight: bold";r[N]("%c action    ",L,E)}else r[N]("action    ",E);if(m&&_)if(u.error){var F="color: "+u.error(m,g)+"; font-weight: bold;";r[_]("%c error     ",F,m)}else r[_]("error     ",m);if(P)if(u.nextState){var R="color: "+u.nextState(y)+"; font-weight: bold";r[P]("%c next state",R,y)}else r[P]("next state",y);f&&b(g,y,r,j);try{r.groupEnd()}catch(e){r.log("\u2014\u2014 log end \u2014\u2014")}}))}function j(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},L,e),r=t.logger,n=t.stateTransformer,o=t.errorTransformer,i=t.predicate,a=t.logErrors,u=t.diffPredicate;if("undefined"==typeof r)return function(){return function(e){return function(t){return e(t)}}};if(e.getState&&e.dispatch)return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"),function(){return function(e){return function(t){return e(t)}}};var c=[];return function(e){var r=e.getState;return function(e){return function(f){if("function"==typeof i&&!i(r,f))return e(f);var l={};c.push(l),l.started=O.now(),l.startedTime=new Date,l.prevState=n(r()),l.action=f;var s=void 0;if(a)try{s=e(f)}catch(e){l.error=o(e)}else s=e(f);l.took=O.now()-l.started,l.nextState=n(r());var d=t.diff&&"function"==typeof u?u(r,f):t.diff;if(E(c,Object.assign({},t,{diff:d})),c.length=0,l.error)throw l.error;return s}}}}var k,S,A=function(e,t){return new Array(t+1).join(e)},D=function(e,t){return A("0",t-e.toString().length)+e},T=function(e){return D(e.getHours(),2)+":"+D(e.getMinutes(),2)+":"+D(e.getSeconds(),2)+"."+D(e.getMilliseconds(),3)},O="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance:Date,N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)},P=[];k="object"===("undefined"==typeof e?"undefined":N(e))&&e?e:"undefined"!=typeof window?window:{},(S=k.DeepDiff)&&P.push((function(){"undefined"!=typeof S&&k.DeepDiff===s&&(k.DeepDiff=S,S=void 0)})),r(o,n),r(i,n),r(a,n),r(u,n),Object.defineProperties(s,{diff:{value:s,enumerable:!0},observableDiff:{value:l,enumerable:!0},applyDiff:{value:m,enumerable:!0},applyChange:{value:p,enumerable:!0},revertChange:{value:g,enumerable:!0},isConflict:{value:function(){return"undefined"!=typeof S},enumerable:!0},noConflict:{value:function(){return P&&(P.forEach((function(e){e()})),P=null),s},enumerable:!0}});var C={E:{color:"#2196F3",text:"CHANGED:"},N:{color:"#4CAF50",text:"ADDED:"},D:{color:"#F44336",text:"DELETED:"},A:{color:"#2196F3",text:"ARRAY:"}},L={level:"log",logger:console,logErrors:!0,collapsed:void 0,predicate:void 0,duration:!1,timestamp:!0,stateTransformer:function(e){return e},actionTransformer:function(e){return e},errorTransformer:function(e){return e},colors:{title:function(){return"inherit"},prevState:function(){return"#9E9E9E"},action:function(){return"#03A9F4"},nextState:function(){return"#4CAF50"},error:function(){return"#F20404"}},diff:!1,diffPredicate:void 0,transformer:void 0},F=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.dispatch,r=e.getState;return"function"==typeof t||"function"==typeof r?j()({dispatch:t,getState:r}):void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n")};t.defaults=L,t.createLogger=j,t.logger=F,t.default=F,Object.defineProperty(t,"__esModule",{value:!0})}(t)}).call(this,r("yLpj"))},"74v/":function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r("hUgY")}])},"8oxB":function(e,t){var r,n,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function u(e){if(r===setTimeout)return setTimeout(e,0);if((r===i||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"===typeof setTimeout?setTimeout:i}catch(e){r=i}try{n="function"===typeof clearTimeout?clearTimeout:a}catch(e){n=a}}();var c,f=[],l=!1,s=-1;function d(){l&&c&&(l=!1,c.length?f=c.concat(f):s=-1,f.length&&p())}function p(){if(!l){var e=u(d);l=!0;for(var t=f.length;t;){for(c=f,f=[];++s<t;)c&&c[s].run();s=-1,t=f.length}c=null,l=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===a||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function g(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];f.push(new h(e,t)),1!==f.length||l||u(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=g,o.addListener=g,o.once=g,o.off=g,o.removeListener=g,o.removeAllListeners=g,o.emit=g,o.prependListener=g,o.prependOnceListener=g,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},KQm4:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r("a3WO");var o=r("BsWD");function i(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(o.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},RRVJ:function(e,t,r){},hUgY:function(e,t,r){"use strict";r.r(t);var n=r("q1tI"),o=r.n(n),i=(r("q4sD"),r("RRVJ"),r("/MKj")),a=r("i7Pf"),u=r("k8AA"),c=r("T+WR"),f=Object(a.a)({reducer:c.a,middleware:u.a,devTools:!0}),l=o.a.createElement;t.default=function(e){var t=e.Component,r=e.pageProps;return l(i.a,{store:f},l(t,r))}},k8AA:function(e,t,r){"use strict";(function(e){var n=r("KQm4"),o=r("i7Pf"),i=r("1mXj"),a=Object(n.a)(Object(o.c)({serializableCheck:{ignoredActions:["soraDemo/setSora","soraDemo/setLocalMediaStream","soraDemo/setRemoteMediaStream","soraDemo/setFakeContentsGainNode"],ignoredPaths:["soraContents","fakeContents"]},immutableCheck:{ignoredPaths:["soraContents","fakeContents"]}}));"true"===e.env.NEXT_PUBLIC_REDUX_LOGGER&&a.push(i.logger),t.a=a}).call(this,r("8oxB"))},q4sD:function(e,t,r){}},[[0,0,2,1,4,6]]]);