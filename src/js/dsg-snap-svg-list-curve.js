/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _dsgSnapSvgListCurve = __webpack_require__(0);

var _dsgSnapSvgListCurve2 = _interopRequireDefault(_dsgSnapSvgListCurve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

"use strict";

(function () {
	var CurveList = function CurveList(textArray) {
		_classCallCheck(this, CurveList);

		var wrapper = void 0,
		    listCurve = void 0,
		    curvePathEndPoint = void 0,
		    curvePath = void 0,
		    curve = void 0,
		    curveLength = void 0,
		    curveListItem = void 0,
		    curveListItemIndex = void 0,
		    curveContainerWidth = void 0,
		    curveContainerHeight = void 0,
		    curveHorizontalIndent = void 0,
		    curveVerticalIndent = void 0,
		    curveStepLength = void 0,
		    curvePoints = void 0,
		    curvePointsPos = void 0,
		    curveSliderContainerRadius = void 0,
		    curveSlider = void 0;

		wrapper = document.querySelectorAll('[data-curve-list]');

		if (wrapper[0].classList.length > 0) {
			wrapper[0].className += " curve-list";
		} else {
			wrapper[0].className += "curve-list";
		}

		function setTextList(wrapper, textArray) {
			wrapper[0].innerHTML += '<ul class="list curve-list__list js-curve-list"></ul>';

			var list = wrapper[0].querySelectorAll('.js-curve-list');

			for (var i = 0; i < textArray.length; i++) {
				if (_typeof(textArray[i].text) === 'object') {
					list[0].innerHTML += '<li class="list__item js-curve-list-item"></li>';

					for (var j = 0; j < textArray[i].text.length; j++) {
						var listItem = wrapper[0].querySelectorAll('.js-curve-list-item')[i];

						if (j > 0) {
							listItem.innerHTML += '<br/>' + textArray[i].text[j];
						} else {
							listItem.innerHTML += textArray[i].text[j];
						}
					}
				} else {
					list[0].innerHTML += '<li class="list__item js-curve-list-item">' + textArray[i].text + '</li>';
				}
			}

			wrapper[0].querySelectorAll('.js-curve-list-item')[0].className += " list__item_active";
		}

		setTextList(wrapper, textArray);

		wrapper[0].innerHTML += '<div class="curve-list__curve"><svg class="curve js-curve"></svg></div>';

		curveListItem = document.getElementsByClassName('js-curve-list-item');
		curveSliderContainerRadius = 28;
		curveHorizontalIndent = 125 - 100 / curveListItem.length;
		curveVerticalIndent = curveSliderContainerRadius;

		curveContainerHeight = document.getElementsByClassName('js-curve-list')[0].offsetHeight;
		curveContainerWidth = curveContainerHeight / 3 + (curveContainerHeight - curveVerticalIndent * 2) / 6;

		listCurve = Snap('[data-curve-list] .js-curve').attr({
			width: curveContainerWidth,
			height: curveContainerHeight
		});

		curvePathEndPoint = [0, curveContainerHeight - curveVerticalIndent * 2];

		var p1x = 0,
		    p1y = 0,
		    c1x = -curveContainerWidth / 2.1,
		    c1y = curvePathEndPoint[1] / 6,
		    c2x = -curveContainerWidth / 2.1,
		    c2y = curvePathEndPoint[1] - curvePathEndPoint[1] / 6,
		    p2x = curvePathEndPoint[0],
		    p2y = curvePathEndPoint[1];

		curvePath = 'M' + p1x + ',' + p1y + ' C' + c1x + ',' + c1y + ' ' + c2x + ',' + c2y + ' ' + p2x + ',' + p2y;

		curve = listCurve.paper.path(curvePath).attr({
			'transform': 'translate(' + curveHorizontalIndent + ',' + curveVerticalIndent + ')',
			'class': 'curve__path'
		});

		curveLength = curve.getTotalLength(curvePath);

		curvePointsPos = [];

		curveStepLength = curveLength / (curveListItem.length - 1);

		function setCurvePointsPos() {
			for (curveListItemIndex = 0; curveListItemIndex < curveListItem.length; curveListItemIndex++) {
				var currentPointPosition = curveLength - curveStepLength * curveListItemIndex;

				curvePointsPos.push([Snap.path.getPointAtLength(curvePath, currentPointPosition).x, Snap.path.getPointAtLength(curvePath, currentPointPosition).y]);
			}
		}

		setCurvePointsPos();

		/**
   * Points
   */
		function addCurvePointsGroup() {
			curvePoints = listCurve.paper.g().attr({
				'transform': 'translate(' + curveHorizontalIndent + ',' + curveVerticalIndent + ')',
				'class': 'curve__points-list'
			});

			for (curveListItemIndex = 0; curveListItemIndex < curveListItem.length; curveListItemIndex++) {
				listCurve.paper.circle(curvePointsPos[curveListItemIndex][0], curvePointsPos[curveListItemIndex][1], 2).attr({ 'class': 'curve__point' }).appendTo(curvePoints);
			}
		}

		addCurvePointsGroup();

		/**
   * Slider
   */
		var sliderCircleShadow = listCurve.filter(Snap.filter.shadow(0, 0, 4, '#000', .2));

		var sliderCirclePosX = curvePointsPos[curvePointsPos.length - 1][0] + curveSliderContainerRadius;
		var sliderCirclePosY = curvePointsPos[curvePointsPos.length - 1][1] + curveSliderContainerRadius;
		var sliderCircle = listCurve.paper.circle(sliderCirclePosX, sliderCirclePosY, 20).attr({ filter: sliderCircleShadow }).addClass('curve__slider-circle');

		var sliderIconPath = 'M ' + (sliderCirclePosX - 2) + ',' + (sliderCirclePosY - 4) + ', L ' + (sliderCirclePosX + 2) + ',' + sliderCirclePosY + ',' + (' L ' + (sliderCirclePosX - 2) + ',' + (sliderCirclePosY + 4));
		var sliderIcon = listCurve.paper.path(sliderIconPath).addClass('curve__slider-icon');

		curveSlider = listCurve.paper.g(sliderCircle, sliderIcon).attr({
			'transform': 'translate(' + (curveHorizontalIndent - curveSliderContainerRadius) + ',' + (curveVerticalIndent - curveSliderContainerRadius) + ')',
			'class': 'curve__slider'
		});

		/**
   * Events
   */
		var dataAnimationStartPoint = 0;

		function setDataAnimationEndPoints() {
			var btn = document.getElementsByClassName('js-curve-list-item');

			var _loop = function _loop(i) {
				var dataAnimationEndPoint = curveLength / (curvePointsPos.length - 1) * i;

				btn[i].setAttribute('data-animation-end-point', dataAnimationEndPoint);

				btn[i].addEventListener('click', function () {
					animateSlider(dataAnimationEndPoint);
					toggleBtnActiveClass(btn, i);
				});
			};

			for (var i = 0; i < curvePointsPos.length; i++) {
				_loop(i);
			}
		}
		setDataAnimationEndPoints();

		function animateSlider(animateTo) {
			Snap.animate(dataAnimationStartPoint, animateTo, function (step) {
				var x = Snap.path.getPointAtLength(curvePath, step).x;
				var y = Snap.path.getPointAtLength(curvePath, step).y;
				curveSlider.transform('translate(' + (x + curveHorizontalIndent - curveSliderContainerRadius) + ',' + y + ')');

				dataAnimationStartPoint = step;
			}, 800, mina.easeinout);
		}

		function toggleBtnActiveClass(btn, selectedBtnIndex) {
			for (var i = 0; i < btn.length; i++) {
				if (i === selectedBtnIndex && !btn[i].classList.contains('list__item_active')) {
					btn[i].classList.add('list__item_active');
				} else if (i !== selectedBtnIndex && btn[i].classList.contains('list__item_active')) {
					btn[i].classList.remove('list__item_active');
				}
			}
		}
	};

	if (typeof textArray !== 'undefined') {
		new CurveList(textArray);
	}
})();

/***/ })
/******/ ]);