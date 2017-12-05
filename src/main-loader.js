let instance = null;

class MainLoader {
  constructor() {
    if (instance) return instance;
    if (typeof window !== 'undefined') this.init();
    instance = this;
    return instance;
  }

  static staticAssets = process.env.NODE_ENV === 'production' ? "STATIC_ASSETS" : {};

  static overallProgressBase = {
    ...MainLoader.staticAssets,
    '/api/v2/apartments/getDistrictsGeojson': 1065810,
    '/api/v2/apartments$': 225511,
    '/api/v2/apartments/index': 7303247,
    '/api/v2/apartments/smallFormList': 19172,
  };

  static overallProgress = {};

  init() {
    this.stopped = false;

    this.mainLoaderContainer = window.document.getElementById('loaderPercentageContainer');

    if (/\d+$/.test(window.location.pathname)) {
      this.hide();
      return;
    }

    if (
      /mobile\/map/.test(window.location.href) ||
      /map\/(.+)/.test(window.location.href)
    ) {
      delete MainLoader.overallProgressBase['/api/v2/apartments/smallFormList'];
    }

    this.initLoader();
  }

  show() {
    this.mainLoaderContainer.style.display = 'flex';
  }

  hide = () => {
    this.mainLoaderContainer.style.display = 'none';
    if (typeof this.stop === 'function') this.stop();
  };

  initLoader = () => {
    const center = [410, 385];
    const bounds = {
      minX: 0,
      minY: 0,
      maxX: 550,
      maxY: 727,
    };

    const canvas = document.getElementById('myCanvas');

    if (!canvas) return;

    var context = canvas.getContext('2d');

    var polygonTexts = [
      '207 5 202 24 189 29 189 39 193 55 195 72 201 82 219 98 226 106 228 125 232 143 233 177 235 220 238 234 239 249 243 257 252 259 256 269 264 269 269 257 278 257 285 252 292 258 300 241 313 209 315 190 333 172 356 170 357 157 348 150 348 141 370 126 348 103 331 100 304 98 278 92 248 79 218 75 217 49 227 32 221 26 221 15 230 9 213 0',
      '363 139 353 144 354 148 363 155 362 171 356 176 333 178 319 193 317 212 308 232 299 250 299 261 349 279 359 295 359 310 357 317 366 327 377 335 394 348 401 349 424 368 460 389 491 406 506 394 531 391 548 373 548 366 535 359 521 370 497 373 487 362 487 351 485 346 506 334 500 325 471 334 465 329 463 218 453 204 375 133',
      '349 290 355 296 354 309 352 317 362 329 374 337 392 351 399 352 421 370 473 400 481 418 481 431 476 434 464 427 457 427 462 471 425 516 422 518 416 509 415 480 407 480 378 492 359 493 344 490 318 475 316 463 320 452 346 439 352 425 351 415 317 399 311 390 311 363 339 353 342 345 320 320 320 315 326 312 333 298 340 299',
      '296 360 306 369 307 390 316 405 348 419 348 425 343 436 318 449 313 461 315 476 343 493 358 496 380 495 407 483 412 486 413 516 417 524 369 568 333 591 319 597 253 590 231 583 235 552 229 547 239 510 236 505 237 491 258 491 259 469 264 457 259 447 267 429 240 387 250 371 289 369',
      '216 385 230 379 261 428 255 442 255 449 259 454 256 469 254 483 233 484 231 507 234 512 224 539 222 549 230 555 227 578 228 588 250 593 249 605 237 618 234 661 236 674 259 711 237 725 225 707 232 681 220 678 208 682 208 705 179 703 192 675 175 662 160 661 147 657 147 641 165 639 185 620 202 628 215 613 208 599 199 594 199 587 208 581 207 570 188 563 170 550 133 492 167 464 188 439 180 428',
      '216 320 225 319 229 325 227 334 203 358 200 369 204 375 213 383 175 428 183 439 159 466 130 488 107 458 94 458 89 463 90 487 79 515 65 503 43 517 28 506 17 506 6 500 0 481 34 463 58 465 64 453 82 455 85 457 91 452 85 438 94 419 52 375 55 292 82 287 88 280 99 283 121 282 127 307 119 311 113 322 121 335 137 333 146 321 151 294 164 297 179 314 188 332 200 333',
      '56 89 67 68 71 86 86 97 89 121 112 124 126 141 144 200 154 207 156 213 155 223 177 291 186 303 181 308 159 288 148 291 144 315 136 328 124 330 117 321 123 313 132 306 124 278 101 279 88 275 79 284 67 286 57 285 48 276 72 236 77 211 77 201 36 207 37 170 30 159 44 145 78 152 90 139 61 121',
      '188 299 201 286 214 282 232 280 241 270 241 260 235 250 235 235 231 219 228 144 224.144273 125.496474 221 107 196 82 161 108 142 117 122 116 115 121 130 140 148 198 157 203 160 212 159 224 177 278 181 289',
      '186 312 190 326 199.398774 326.044011 212 315 228 312 234 319 233 337 208 359 204.276127 368.452756 217 381 232 374 238 383 249 367 288 365 295 355 307 365 311 359 335 350 337 346 314 319 316 309 324 306 330 294 338 295 347.092811 286.724183 346 282 300 265 283 258 273 260 268 273 249 273 249 264 244.865984 264.571585 244.865984 272 233 285 205 290',
    ];
    var recalcInterval = null;
    var animatedPolygon = 0;
    var animatedPolygonDirection = 1;

    var highlightProgressByPolygon = [];

    // todo fix it
    // var curPolygonOrder = 3;

    var polygons = [];
    var i;
    var j;
    for (i = 0; i < polygonTexts.length; i++) {
      polygons.push(polygonTexts[i].split(' '));
      highlightProgressByPolygon[i] = 0;
    }

    var polygon;
    for (i = 0; i < polygons.length; i++) {
      polygon = polygons[i];
      for (j = 0; j < polygon.length; j += 2) {
        polygon[j] =
          (polygon[j] - bounds.minX) *
          canvas.width /
          (bounds.maxX - bounds.minX);
        polygon[j + 1] =
          (polygon[j + 1] - bounds.minY) *
          canvas.height /
          (bounds.maxY - bounds.minY);
      }
    }
    center[0] =
      (center[0] - bounds.minX) * canvas.width / (bounds.maxX - bounds.minX);
    center[1] =
      (center[1] - bounds.minY) * canvas.height / (bounds.maxY - bounds.minY);

    function calcDistance(point1, point2) {
      return (
        Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2)
      );
    }

    var polygonFarPoints = [];
    for (i = 0; i < polygons.length; i++) {
      polygon = polygons[i];
      var farPoint = null;
      var maxDistance = 0;
      for (j = 0; j < polygon.length; j += 2) {
        var polygonPoint = [polygon[j], polygon[j + 1]];
        var distance = calcDistance(center, polygonPoint);
        if (distance > maxDistance) {
          maxDistance = distance;
          farPoint = polygonPoint;
        }
      }
      polygonFarPoints.push(farPoint);
    }

    function drawPolygons(callback) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (i = 0; i < polygons.length; i++) {
        var polygon = polygons[i];
        context.beginPath();
        context.moveTo(polygon[0], polygon[1]);
        for (var j = 2; j < polygon.length; j += 2) {
          context.lineTo(polygon[j], polygon[j + 1]);
        }

        // complete custom shape
        context.closePath();
        context.lineWidth = 1;
        context.shadowColor = 'rgb(255, 64, 129)';
        context.shadowBlur = 0;
        var hightlightProgress = highlightProgressByPolygon[i];
        var grd = context.createLinearGradient(
          center[0],
          center[1],
          polygonFarPoints[i][0],
          polygonFarPoints[i][1]
        );
        grd.addColorStop(0, 'rgba(255, 64, 129,' + hightlightProgress + ')');
        grd.addColorStop(1, 'rgba(179, 136, 255,' + hightlightProgress + ')');
        context.fillStyle = grd;
        context.fill();
        context.shadowBlur = 25;
        var strokeGradient = context.createLinearGradient(
          center[0],
          center[1],
          polygonFarPoints[i][0],
          polygonFarPoints[i][1]
        );
        strokeGradient.addColorStop(1, 'rgb(179, 136, 255)');
        strokeGradient.addColorStop(0, 'rgb(255, 64, 129)');
        context.strokeStyle = strokeGradient;
        context.stroke();
      }
      callback();
    }

    const loopDraw = () => {
      window.requestAnimationFrame(() => {
        if (this.stopped) {
          return;
        }
        drawPolygons(function() {
          loopDraw();
        });
      });
    }

    const hightlightPolygon = () => {
      loopDraw();
      this.recalcInterval = setInterval(() => {
        if (this.stopped) {
          return;
        }
        highlightProgressByPolygon[animatedPolygon] +=
          0.01 * animatedPolygonDirection;
        if (highlightProgressByPolygon[animatedPolygon] >= 1) {
          highlightProgressByPolygon[animatedPolygon] = 1;
          animatedPolygonDirection = -1;
        }

        if (highlightProgressByPolygon[animatedPolygon] <= 0) {
          highlightProgressByPolygon[animatedPolygon] = 0;
          animatedPolygonDirection = 1;
        }
      }, 10);
    }

    function setPercentage(percent) {
      var polygonsCount = polygons.length;
      var percentPerPolygon = 100 / polygonsCount;
      var showPolygonsCnt = Math.floor(percent / percentPerPolygon);
      animatedPolygon = showPolygonsCnt;
      for (var i = 0; i < showPolygonsCnt; i++) {
        highlightProgressByPolygon[i] = 1;
      }
    }

    this.stop = () => {
      this.stopped = true;
      clearInterval(this.recalcInterval);
    };

    hightlightPolygon();

    const calcOverallStatic = () => {
      var total = 0;
      for (var url in MainLoader.overallProgressBase) {
        total += MainLoader.overallProgressBase[url];
      }
      return total;
    }

    const calcOverall = () => {
      var total = 0;
      for (var url in MainLoader.overallProgress) {
        total += MainLoader.overallProgress[url];
      }
      return total;
    }

    var currentTextId = null;

    function showTextById(id) {
      if (currentTextId === id) {
        return;
      }
      currentTextId = id;
      for (var i = 1; i <= 3; i++) {
        window.document.getElementById(
          'loaderPercentageTextContainer' + i
        ).style.opacity = 0;
      }
      setTimeout(function() {
        window.document.getElementById(
          'loaderPercentageTextContainer' + id
        ).style.opacity = 1;
      }, 300);
    }

    const removeLoader = this.hide;

    XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(value) {
      this.addEventListener(
        'progress',
        function(oEvent) {
          var goal = calcOverallStatic();
          if (this.responseURL.indexOf('mapbox') >= 0) return;
          var that = this;

          var overallProgressBaseItem = null;

          var assets = Object.keys(MainLoader.overallProgressBase);

          for (var i = 0, l = assets.length; i < l; i++) {
            var assetName = assets[i];
            var reg = new RegExp(assetName);
            if (reg.test(that.responseURL)) overallProgressBaseItem = assetName;
          }

          if (!overallProgressBaseItem) return;

          var length = this.getResponseHeader('X-Content-Length');
          if (length) {
            MainLoader.overallProgressBase[overallProgressBaseItem] = +length;
          }
          MainLoader.overallProgress[this.responseURL] = oEvent.loaded;
          var percentage = Math.round(calcOverall() / goal * 100);
          var loaderPercentage = window.document.getElementById(
            'loaderPercentage'
          );
          if (setPercentage) {
            setPercentage(percentage);
          }
          showTextById(Math.min(Math.ceil(percentage / 33 + 0.1), 3));
          if (loaderPercentage) loaderPercentage.innerText = percentage;
          var loaderBar = window.document.getElementById('loaderBar');
          if (loaderBar) loaderBar.style.width = percentage + '%';
          if (percentage === 100) {
            setTimeout(function() {
              removeLoader();
            }, 500);
          }
        },
        false
      );

      this.realSend(value);
    };
  }

}

export default MainLoader;