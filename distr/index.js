!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";var r=n(1),o=function(e){return e&&e.__esModule?e:{default:e}}(r);n(2);var a=new o.default;a.show(),window.MAIN_LOADER=a},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=null,s=function(){function e(){var t=this;return r(this,e),this.hide=function(){t.mainLoaderContainer.style.display="none","function"==typeof t.stop&&t.stop()},this.initLoader=function(){function n(e){l.clearRect(0,0,a.width,a.height);for(var t=0;t<u.length;t++){var n=u[t];l.beginPath(),l.moveTo(n[0],n[1]);for(var r=2;r<n.length;r+=2)l.lineTo(n[r],n[r+1]);l.closePath(),l.lineWidth=1,l.shadowColor="rgb(255, 64, 129)",l.shadowBlur=0;var o=c[t],s=l.createLinearGradient(i[0],i[1],d[t][0],d[t][1]);s.addColorStop(0,"rgba(255, 64, 129,"+o+")"),s.addColorStop(1,"rgba(179, 136, 255,"+o+")"),l.fillStyle=s,l.fill(),l.shadowBlur=25;var f=l.createLinearGradient(i[0],i[1],d[t][0],d[t][1]);f.addColorStop(1,"rgb(179, 136, 255)"),f.addColorStop(0,"rgb(255, 64, 129)"),l.strokeStyle=f,l.stroke()}e()}function r(e){var t=u.length,n=100/t,r=Math.floor(e/n);f=r;for(var o=0;o<r;o++)c[o]=1}function o(t){if(m!==t){m=t;for(var n=1;n<=3;n++)window.document.getElementById(e.TEXT_CONTAINER_ID+n).style.opacity=0;window.document.getElementById(e.TEXT_CONTAINER_ID+t).style.opacity=1}}var a=document.getElementById("myCanvas");if(a){var i=[410,385],s={minX:0,minY:0,maxX:550,maxY:727},l=a.getContext("2d"),c=[],u=[],d=[],f=0,p=1,v=0;e.POLYGON_TEXTS.forEach(function(e,t){u.push(e.split(" ")),c[t]=0}),u.forEach(function(e){for(var t=0;t<e.length;t+=2)e[t]=(e[t]-s.minX)*a.width/(s.maxX-s.minX),e[t+1]=(e[t+1]-s.minY)*a.height/(s.maxY-s.minY)}),i[0]=(i[0]-s.minX)*a.width/(s.maxX-s.minX),i[1]=(i[1]-s.minY)*a.height/(s.maxY-s.minY),u.forEach(function(t){for(var n=null,r=null,o=0;o<t.length;o+=2){var a=[t[o],t[o+1]],s=e.calcDistance(i,a);s>r&&(r=s,n=a)}d.push(n)});var h=function e(){window.requestAnimationFrame(function(){t.stopped||n(function(){e()})})};t.stop=function(){t.stopped=!0,clearInterval(t.recalcInterval)},function(){h(),t.recalcInterval=setInterval(function(){t.stopped||(c[f]+=.01*p,c[f]>=1&&(c[f]=1,p=-1),c[f]<=0&&(c[f]=0,p=1))},10)}();var m=null,g=t.hide;XMLHttpRequest.prototype.realSend=XMLHttpRequest.prototype.send,XMLHttpRequest.prototype.send=function(t){this.addEventListener("progress",function(t){var n=e.calcOverallStatic(),a=this.responseURL;if(!(a.indexOf("mapbox")>=0)){var i=Object.keys(e.overallProgressBase),s=i.find(function(e){return new RegExp(e).test(a)});if(s){var l=this.getResponseHeader("X-Content-Length");l&&(e.overallProgressBase[s]=+l),e.overallProgress[a]=t.loaded;var c=Math.round(e.calcOverall()/n*100);c>v&&(v=c);var u=window.document.getElementById(e.PERCENTAGE_CONTAINER_ID);r(v),o(Math.min(Math.ceil(v/33+.1),3)),u&&(u.innerText=v);var d=window.document.getElementById(e.BAR_ID);d&&(d.style.width=v+"%"),100===v&&setTimeout(function(){g()},500)}}},!1),this.realSend(t)}}},i||("undefined"!=typeof window&&this.init(),i=this)}return a(e,[{key:"init",value:function(){if(this.stopped=!1,this.mainLoaderContainer=window.document.getElementById(e.CONTAINER_ID),/\d+/.test(window.location.pathname))return void this.hide();(/mobile\/map/.test(window.location.href)||/map\/(.+)/.test(window.location.href))&&delete e.overallProgressBase["/api/v2/apartments/smallFormList"],this.getJs(),this.getCss(),this.initLoader()}},{key:"show",value:function(){/\d+/.test(window.location.href)||/\/chat/.test(window.location.href)||(this.mainLoaderContainer.style.display="flex")}},{key:"getJs",value:function(){var t=Object.keys(e.overallProgressBase).find(function(e){return/^index\S*\.js$/.test(e)});if(t){var n=new XMLHttpRequest,r=document.createElement("script");n.open("GET","/client/"+t,!0),n.onload=function(){4===n.readyState&&(200===n.status?(r.text=n.response,document.body.appendChild(r)):console.error(n.response))},n.send()}}},{key:"getCss",value:function(){var t=Object.keys(e.overallProgressBase).find(function(e){return/^index\S*\.css$/.test(e)});if(t){var n=new XMLHttpRequest,r=document.createElement("style");n.open("GET","/client/"+t,!0),n.onload=function(){4===n.readyState&&(200===n.status?(r.innerText=n.response,document.head.appendChild(r)):console.error(n.response))},n.send()}}}],[{key:"calcDistance",value:function(e,t){return Math.pow(e[0]-t[0],2)+Math.pow(e[1]-t[1],2)}},{key:"calcOverallStatic",value:function(){var t=0;for(var n in e.overallProgressBase)t+=e.overallProgressBase[n];return t}},{key:"calcOverall",value:function(){var t=0;for(var n in e.overallProgress)t+=e.overallProgress[n];return t}}]),e}();s.CONTAINER_ID="loaderPercentageContainer",s.TEXT_CONTAINER_ID="loaderPercentageTextContainer",s.PERCENTAGE_CONTAINER_ID="loaderPercentage",s.BAR_ID="loaderBar",s.staticAssets="STATIC_ASSETS",s.POLYGON_TEXTS=["207 5 202 24 189 29 189 39 193 55 195 72 201 82 219 98 226 106 228 125 232 143 233 177 235 220 238 234 239 249 243 257 252 259 256 269 264 269 269 257 278 257 285 252 292 258 300 241 313 209 315 190 333 172 356 170 357 157 348 150 348 141 370 126 348 103 331 100 304 98 278 92 248 79 218 75 217 49 227 32 221 26 221 15 230 9 213 0","363 139 353 144 354 148 363 155 362 171 356 176 333 178 319 193 317 212 308 232 299 250 299 261 349 279 359 295 359 310 357 317 366 327 377 335 394 348 401 349 424 368 460 389 491 406 506 394 531 391 548 373 548 366 535 359 521 370 497 373 487 362 487 351 485 346 506 334 500 325 471 334 465 329 463 218 453 204 375 133","349 290 355 296 354 309 352 317 362 329 374 337 392 351 399 352 421 370 473 400 481 418 481 431 476 434 464 427 457 427 462 471 425 516 422 518 416 509 415 480 407 480 378 492 359 493 344 490 318 475 316 463 320 452 346 439 352 425 351 415 317 399 311 390 311 363 339 353 342 345 320 320 320 315 326 312 333 298 340 299","296 360 306 369 307 390 316 405 348 419 348 425 343 436 318 449 313 461 315 476 343 493 358 496 380 495 407 483 412 486 413 516 417 524 369 568 333 591 319 597 253 590 231 583 235 552 229 547 239 510 236 505 237 491 258 491 259 469 264 457 259 447 267 429 240 387 250 371 289 369","216 385 230 379 261 428 255 442 255 449 259 454 256 469 254 483 233 484 231 507 234 512 224 539 222 549 230 555 227 578 228 588 250 593 249 605 237 618 234 661 236 674 259 711 237 725 225 707 232 681 220 678 208 682 208 705 179 703 192 675 175 662 160 661 147 657 147 641 165 639 185 620 202 628 215 613 208 599 199 594 199 587 208 581 207 570 188 563 170 550 133 492 167 464 188 439 180 428","216 320 225 319 229 325 227 334 203 358 200 369 204 375 213 383 175 428 183 439 159 466 130 488 107 458 94 458 89 463 90 487 79 515 65 503 43 517 28 506 17 506 6 500 0 481 34 463 58 465 64 453 82 455 85 457 91 452 85 438 94 419 52 375 55 292 82 287 88 280 99 283 121 282 127 307 119 311 113 322 121 335 137 333 146 321 151 294 164 297 179 314 188 332 200 333","56 89 67 68 71 86 86 97 89 121 112 124 126 141 144 200 154 207 156 213 155 223 177 291 186 303 181 308 159 288 148 291 144 315 136 328 124 330 117 321 123 313 132 306 124 278 101 279 88 275 79 284 67 286 57 285 48 276 72 236 77 211 77 201 36 207 37 170 30 159 44 145 78 152 90 139 61 121","188 299 201 286 214 282 232 280 241 270 241 260 235 250 235 235 231 219 228 144 224.144273 125.496474 221 107 196 82 161 108 142 117 122 116 115 121 130 140 148 198 157 203 160 212 159 224 177 278 181 289","186 312 190 326 199.398774 326.044011 212 315 228 312 234 319 233 337 208 359 204.276127 368.452756 217 381 232 374 238 383 249 367 288 365 295 355 307 365 311 359 335 350 337 346 314 319 316 309 324 306 330 294 338 295 347.092811 286.724183 346 282 300 265 283 258 273 260 268 273 249 273 249 264 244.865984 264.571585 244.865984 272 233 285 205 290"],s.overallProgressBase=o({},s.staticAssets,{"/api/v2/apartmentss/getDistrictsGeojson":1065810,"/api/v2/apartmentss$":225511,"/api/v2/apartmentss/index":7303247,"/api/v2/apartments/smallFormList":19172}),s.overallProgress={},t.default=s},function(e,t){}]);