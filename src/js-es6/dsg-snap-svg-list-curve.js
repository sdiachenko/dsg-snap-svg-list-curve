import styles from '../scss/dsg-snap-svg-list-curve.scss';

"use strict";

(() => {
	class CurveList {
		constructor (textArray) {
			let wrapper,
				listCurve,
				curvePathEndPoint,
				curvePath,
				curve,
				curveLength,
				curveListItem,
				curveListItemIndex,
				curveContainerWidth,
				curveContainerHeight,
				curveHorizontalIndent,
				curveVerticalIndent,
				curveStepLength,
				curvePoints,
				curvePointsPos,
				curveSliderContainerRadius,
				curveSlider;

			wrapper = document.querySelectorAll('[data-curve-list]');

			if (wrapper[0].classList.length > 0) {
				wrapper[0].className += " curve-list";
			} else {
				wrapper[0].className += "curve-list";
			}

			function setTextList(wrapper, textArray) {
				wrapper[0].innerHTML += '<ul class="list curve-list__list js-curve-list"></ul>';

				let list = wrapper[0].querySelectorAll('.js-curve-list');

				for (let i = 0; i < textArray.length; i++) {
					if (typeof textArray[i].text === 'object') {
						list[0].innerHTML += '<li class="list__item js-curve-list-item"></li>';

						for (let j = 0; j < textArray[i].text.length; j++) {
							let listItem = wrapper[0].querySelectorAll('.js-curve-list-item')[i];

							if (j > 0) {
								listItem.innerHTML += '<br/>'+ textArray[i].text[j];
							} else {
								listItem.innerHTML += textArray[i].text[j];
							}
						}

					} else {
						list[0].innerHTML += '<li class="list__item js-curve-list-item">'+textArray[i].text+'</li>';
					}
				}

				wrapper[0].querySelectorAll('.js-curve-list-item')[0].className += " list__item_active"
			}

			setTextList(wrapper, textArray);

			wrapper[0].innerHTML += '<div class="curve-list__curve"><svg class="curve js-curve"></svg></div>';

			curveListItem = document.getElementsByClassName('js-curve-list-item');
			curveSliderContainerRadius = 28;
			curveHorizontalIndent = 125 - 100/curveListItem.length;
			curveVerticalIndent = curveSliderContainerRadius;

			curveContainerHeight = document.getElementsByClassName('js-curve-list')[0].offsetHeight;
			curveContainerWidth = curveContainerHeight/3 + (curveContainerHeight - curveVerticalIndent * 2)/6;

			listCurve = Snap('[data-curve-list] .js-curve').attr({
				width: curveContainerWidth,
				height: curveContainerHeight
			});

			curvePathEndPoint = [0, curveContainerHeight - curveVerticalIndent * 2];

			let p1x = 0,
				p1y = 0,
				c1x = -curveContainerWidth/2.1,
				c1y = curvePathEndPoint[1]/6,
				c2x = -curveContainerWidth/2.1,
				c2y = curvePathEndPoint[1] - curvePathEndPoint[1]/6,
				p2x = curvePathEndPoint[0],
				p2y = curvePathEndPoint[1];

			curvePath = `M${p1x},${p1y} C${c1x},${c1y} ${c2x},${c2y} ${p2x},${p2y}`;

			curve = listCurve.paper.path(curvePath)
				.attr({
					'transform': `translate(${curveHorizontalIndent},${curveVerticalIndent})`,
					'class': 'curve__path'
				});

			curveLength = curve.getTotalLength(curvePath);

			curvePointsPos = [];

			curveStepLength = curveLength / (curveListItem.length - 1);

			function setCurvePointsPos() {
				for (curveListItemIndex = 0; curveListItemIndex < curveListItem.length; curveListItemIndex++) {
					let currentPointPosition = curveLength - curveStepLength * curveListItemIndex;

					curvePointsPos.push([
						Snap.path.getPointAtLength(curvePath, currentPointPosition).x,
						Snap.path.getPointAtLength(curvePath, currentPointPosition).y
					]);
				}
			}

			setCurvePointsPos();

			/**
			 * Points
			 */
			function addCurvePointsGroup() {
				curvePoints = listCurve.paper.g()
					.attr({
						'transform': `translate(${curveHorizontalIndent},${curveVerticalIndent})`,
						'class': 'curve__points-list'
					});

				for (curveListItemIndex = 0; curveListItemIndex < curveListItem.length; curveListItemIndex++) {
					listCurve.paper
						.circle(curvePointsPos[curveListItemIndex][0], curvePointsPos[curveListItemIndex][1], 2)
						.attr({'class': 'curve__point'}).appendTo(curvePoints);
				}
			}

			addCurvePointsGroup();


			/**
			 * Slider
			 */
			let sliderCircleShadow = listCurve.filter(Snap.filter.shadow(0, 0, 4, '#000', .2));

			let sliderCirclePosX = curvePointsPos[curvePointsPos.length - 1][0]+curveSliderContainerRadius;
			let sliderCirclePosY = curvePointsPos[curvePointsPos.length - 1][1]+curveSliderContainerRadius;
			let sliderCircle = listCurve.paper
				.circle(sliderCirclePosX, sliderCirclePosY, 20)
				.attr({filter: sliderCircleShadow}).addClass('curve__slider-circle');

			let sliderIconPath = `M ${sliderCirclePosX - 2},${sliderCirclePosY - 4}, L ${sliderCirclePosX + 2},${sliderCirclePosY},`
				+` L ${sliderCirclePosX - 2},${sliderCirclePosY + 4}`;
			let sliderIcon = listCurve.paper.path(sliderIconPath).addClass('curve__slider-icon');

			curveSlider = listCurve.paper.g(sliderCircle, sliderIcon)
				.attr({
					'transform': `translate(${curveHorizontalIndent - curveSliderContainerRadius},${curveVerticalIndent - curveSliderContainerRadius})`,
					'class': 'curve__slider'
				});

			/**
			 * Events
			 */
			let dataAnimationStartPoint = 0;

			function setDataAnimationEndPoints() {
				let btn = document.getElementsByClassName('js-curve-list-item');
				for (let i = 0; i < curvePointsPos.length; i++) {
					let dataAnimationEndPoint = (curveLength/(curvePointsPos.length-1)) * i;

					btn[i].setAttribute('data-animation-end-point', dataAnimationEndPoint);

					btn[i].addEventListener('click', () => {
						animateSlider(dataAnimationEndPoint);
						toggleBtnActiveClass(btn, i);
					});
				}
			}
			setDataAnimationEndPoints();

			function animateSlider(animateTo) {
				Snap.animate(dataAnimationStartPoint, animateTo, (step) => {
					let x = Snap.path.getPointAtLength(curvePath, step).x;
					let y = Snap.path.getPointAtLength(curvePath, step).y;
					curveSlider.transform(`translate(${x + curveHorizontalIndent - curveSliderContainerRadius},${y})`);

					dataAnimationStartPoint = step;
				}, 800, mina.easeinout);
			}

			function toggleBtnActiveClass(btn, selectedBtnIndex) {
				for (let i = 0; i < btn.length; i++) {
					if (i === selectedBtnIndex && !btn[i].classList.contains('list__item_active')) {
						btn[i].classList.add('list__item_active');
					} else if (i !== selectedBtnIndex && btn[i].classList.contains('list__item_active')) {
						btn[i].classList.remove('list__item_active');
					}
				}
			}
		}
	}

	if (typeof textArray !== 'undefined') {
		new CurveList(textArray);
	}
})();
