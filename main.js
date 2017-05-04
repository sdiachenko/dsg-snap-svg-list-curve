"use strict";

var listCurve = Snap('.example-1').attr({
	width: 66,
	height: 366
});

var curvePath = 'M64,22 Q0,182, 64,342';

var curve = listCurve.paper.path(curvePath).attr({
	fill:'none',
	stroke: '#C8C8C8',
	strokeWidth: 1
});

var curveLength = curve.getTotalLength(curvePath);

function getPointAtLength(curve, length) {
	return curve.getPointAtLength(length);
}

var curvePointAttr = {
	fill: '#080808'
};

var curvePoint1 = listCurve.paper.circle(64, 22, 2).attr(curvePointAttr),

	curvePoint2 = listCurve.paper
		.circle(
			getPointAtLength(curve, curveLength/3).x,
			getPointAtLength(curve, curveLength/3).y,
			2)
		.attr(curvePointAttr),

	curvePoint3 = listCurve.paper
		.circle(
			getPointAtLength(curve, curveLength-curveLength/3).x,
			getPointAtLength(curve, curveLength-curveLength/3).y,
			2)
		.attr(curvePointAttr),

	curvePoint4 = listCurve.paper.circle(64, 342, 2).attr(curvePointAttr);

var curvePoints = listCurve.paper.g(curvePoint1, curvePoint2, curvePoint3, curvePoint4);