"use strict";

var listCurve = Snap('.example-1').attr({
	width: 90,
	height: 354
});

var curvePath = 'M64,28 C-17,88 -17,276 64,336';

var curve = listCurve.paper.path(curvePath).addClass('curve__path');

var curveLength = curve.getTotalLength(curvePath);

function getPointAtLength(curve, length) {
	return curve.getPointAtLength(length);
}

var curvePoint1 = listCurve.paper.circle(64, 28, 2),

	curvePoint2 = listCurve.paper
		.circle(
			getPointAtLength(curve, curveLength/3).x,
			getPointAtLength(curve, curveLength/3).y,
			2),

	curvePoint3 = listCurve.paper
		.circle(
			getPointAtLength(curve, curveLength-curveLength/3).x,
			getPointAtLength(curve, curveLength-curveLength/3).y,
			2),

	curvePoint4 = listCurve.paper.circle(64, 336, 2);

var curvePoints = listCurve.paper.g(curvePoint1, curvePoint2, curvePoint3, curvePoint4).addClass('curve__points-list');

listCurve.selectAll('.curve__points-list circle').attr({'class': 'curve__point'});

var sliderCircleShadow = listCurve.filter(Snap.filter.shadow(0, 0, 4, '#000', .2));
var sliderCircle = listCurve.paper.circle(64, 28, 20).attr({filter: sliderCircleShadow}).addClass('curve__slider-circle');

var sliderIcon = listCurve.paper.path('M 62,24, L 66,28, L 62,32').addClass('curve__slider-icon');

var curveSlider = listCurve.paper.g(sliderCircle, sliderIcon).addClass('curve__slider');