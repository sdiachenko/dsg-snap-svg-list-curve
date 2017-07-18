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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dsgSnapSvgListCurve = __webpack_require__(0);

var _dsgSnapSvgListCurve2 = _interopRequireDefault(_dsgSnapSvgListCurve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CurveList = function () {
	function CurveList(element, textArray) {
		_classCallCheck(this, CurveList);

		var listCurve = void 0,
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

		if (element.classList.length > 0) {
			element.className += " dsg-curve-list";
		} else {
			element.className += "dsg-curve-list";
		}

		this.setTextList(element, textArray);

		element.innerHTML += '<div class="dsg-curve-list__curve"><svg class="dsg-curve js-dsg-curve"></svg></div>';

		curveListItem = document.getElementsByClassName('js-dsg-curve-list-item');
		curveSliderContainerRadius = 28;
		curveHorizontalIndent = 125 - 100 / curveListItem.length;
		curveVerticalIndent = curveSliderContainerRadius;

		curveContainerHeight = document.getElementsByClassName('js-dsg-curve-list')[0].offsetHeight;
		curveContainerWidth = curveContainerHeight / 3 + (curveContainerHeight - curveVerticalIndent * 2) / 6;

		listCurve = Snap(element.querySelector('.js-dsg-curve')).attr({
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

		curvePath = "M" + p1x + "," + p1y + " C" + c1x + "," + c1y + " " + c2x + "," + c2y + " " + p2x + "," + p2y;

		curve = listCurve.paper.path(curvePath).attr({
			'transform': "translate(" + curveHorizontalIndent + "," + curveVerticalIndent + ")",
			'class': 'dsg-curve__path'
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
				'transform': "translate(" + curveHorizontalIndent + "," + curveVerticalIndent + ")",
				'class': 'dsg-curve__points-list'
			});

			for (curveListItemIndex = 0; curveListItemIndex < curveListItem.length; curveListItemIndex++) {
				listCurve.paper.circle(curvePointsPos[curveListItemIndex][0], curvePointsPos[curveListItemIndex][1], 2).attr({ 'class': 'dsg-curve__point' }).appendTo(curvePoints);
			}
		}

		addCurvePointsGroup();

		/**
   * Slider
   */
		var sliderCircleShadow = listCurve.filter(Snap.filter.shadow(0, 0, 4, '#000', .2));

		var sliderCirclePosX = curvePointsPos[curvePointsPos.length - 1][0] + curveSliderContainerRadius;
		var sliderCirclePosY = curvePointsPos[curvePointsPos.length - 1][1] + curveSliderContainerRadius;
		var sliderCircle = listCurve.paper.circle(sliderCirclePosX, sliderCirclePosY, 20).attr({ filter: sliderCircleShadow }).addClass('dsg-curve__slider-circle');

		var sliderIconPath = "M " + (sliderCirclePosX - 2) + "," + (sliderCirclePosY - 4) + ", L " + (sliderCirclePosX + 2) + "," + sliderCirclePosY + "," + (" L " + (sliderCirclePosX - 2) + "," + (sliderCirclePosY + 4));
		var sliderIcon = listCurve.paper.path(sliderIconPath).addClass('dsg-curve__slider-icon');

		curveSlider = listCurve.paper.g(sliderCircle, sliderIcon).attr({
			'transform': "translate(" + (curveHorizontalIndent - curveSliderContainerRadius) + "," + (curveVerticalIndent - curveSliderContainerRadius) + ")",
			'class': 'dsg-curve__slider'
		});

		/**
   * Events
   */
		var dataAnimationStartPoint = 0;

		function setDataAnimationEndPoints() {
			var btn = document.getElementsByClassName('js-dsg-curve-list-item');

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
				curveSlider.transform("translate(" + (x + curveHorizontalIndent - curveSliderContainerRadius) + "," + y + ")");

				dataAnimationStartPoint = step;
			}, 800, mina.easeinout);
		}

		function toggleBtnActiveClass(btn, selectedBtnIndex) {
			for (var i = 0; i < btn.length; i++) {
				if (i === selectedBtnIndex && !btn[i].classList.contains('dsg-list__item_active')) {
					btn[i].classList.add('dsg-list__item_active');
				} else if (i !== selectedBtnIndex && btn[i].classList.contains('dsg-list__item_active')) {
					btn[i].classList.remove('dsg-list__item_active');
				}
			}
		}
	}

	/**
  * Create a text list container
  * @param {object} element - The DOM element which is curve-list.
  * @param {object} textArray - The array of the text list.
  */


	_createClass(CurveList, [{
		key: "setTextList",
		value: function setTextList(element, textArray) {

			/**
    * Add the text list container to the DOM
    */
			element.innerHTML += '<ul class="dsg-list dsg-curve-list__list js-dsg-curve-list"></ul>';
			var textListWrapper = element.querySelectorAll('.js-dsg-curve-list');

			/**
    * Add the text list items to the DOM
    */
			for (var indexOfTextArrayItem = 0; indexOfTextArrayItem < textArray.length; indexOfTextArrayItem++) {

				/**
     * Add the multiple lines text list items to the DOM if textArray item includes the object type value
     */
				if (_typeof(textArray[indexOfTextArrayItem].text) === 'object') {
					textListWrapper[0].innerHTML += '<li class="dsg-list__item js-dsg-curve-list-item"></li>';

					/**
      * Check the index of the current text list item string and add this element to the DOM
      */
					for (var indexOfCurrentTextArrayItemString = 0; indexOfCurrentTextArrayItemString < textArray[indexOfTextArrayItem].text.length; indexOfCurrentTextArrayItemString++) {
						var listItem = element.querySelectorAll('.js-dsg-curve-list-item')[indexOfTextArrayItem];

						if (indexOfCurrentTextArrayItemString === 0) {
							listItem.innerHTML += textArray[indexOfTextArrayItem].text[indexOfCurrentTextArrayItemString];

							/**
        * Add divider if the current text list item string is not first string
        */
						} else {
							listItem.innerHTML += '<br/>' + textArray[indexOfTextArrayItem].text[indexOfCurrentTextArrayItemString];
						}
					}

					/**
      * Add the one-line text list items to the DOM if textArray item includes the string type value
      */
				} else {
					textListWrapper[0].innerHTML += '<li class="list__item js-dsg-curve-list-item">' + textArray[indexOfTextArrayItem].text + '</li>';
				}
			}

			/**
    * Set first element of textList as active element
    */
			element.querySelectorAll('.js-dsg-curve-list-item')[0].className += " dsg-list__item_active";
		}
	}]);

	return CurveList;
}();

(function () {
	if (textArray !== void 0) {
		var curveListA = new CurveList(document.getElementsByClassName('js-curve-list-a')[0], textArray);
	}
})();

/***/ })
/******/ ]);