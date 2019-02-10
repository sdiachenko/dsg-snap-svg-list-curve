import styles from '../scss/dsg-snap-svg-list-curve.scss';

class CurveList {
	constructor (element, textArray) {
		let listCurve,
			curvePathEndPoint,
			curve,
			curveLength,
			curveListItem,
			curveListItemIndex,
			curveContainerWidth,
			curveContainerHeight,
			curveVerticalIndent,
			curveStepLength,
			curvePoints,
			curvePointsPos,
			_self;

		_self = this;

		if (element.classList.length > 0) {
			element.className += " dsg-curve-list";
		} else {
			element.className += "dsg-curve-list";
		}

		this.setTextList(element, textArray);

		element.innerHTML += '<div class="dsg-curve-list__curve"><svg class="dsg-curve js-dsg-curve"></svg></div>';

		curveListItem = document.getElementsByClassName('js-dsg-curve-list-item');
		this._curveSliderContainerRadius = 28;
		this._curveHorizontalIndent = 125 - 100/curveListItem.length;
		curveVerticalIndent = this._curveSliderContainerRadius;

		curveContainerHeight = document.getElementsByClassName('js-dsg-curve-list')[0].offsetHeight;
		curveContainerWidth = curveContainerHeight/3 + (curveContainerHeight - curveVerticalIndent * 2)/6;

		listCurve = Snap(element.querySelector('.js-dsg-curve')).attr({
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

		this._curvePath = `M${p1x},${p1y} C${c1x},${c1y} ${c2x},${c2y} ${p2x},${p2y}`;

		curve = listCurve.paper.path(this._curvePath)
			.attr({
				'transform': `translate(${this._curveHorizontalIndent},${curveVerticalIndent})`,
				'class': 'dsg-curve__path'
			});

		curveLength = curve.getTotalLength(this._curvePath);

		curvePointsPos = [];

		curveStepLength = curveLength / (curveListItem.length - 1);

		function setCurvePointsPos() {
			for (curveListItemIndex = 0; curveListItemIndex < curveListItem.length; curveListItemIndex++) {
				let currentPointPosition = curveLength - curveStepLength * curveListItemIndex;

				curvePointsPos.push([
					Snap.path.getPointAtLength(_self._curvePath, currentPointPosition).x,
					Snap.path.getPointAtLength(_self._curvePath, currentPointPosition).y
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
					'transform': `translate(${_self._curveHorizontalIndent},${curveVerticalIndent})`,
					'class': 'dsg-curve__points-list'
				});

			for (curveListItemIndex = 0; curveListItemIndex < curveListItem.length; curveListItemIndex++) {
				listCurve.paper
					.circle(curvePointsPos[curveListItemIndex][0], curvePointsPos[curveListItemIndex][1], 2)
					.attr({'class': 'dsg-curve__point'}).appendTo(curvePoints);
			}
		}

		addCurvePointsGroup();

		/**
		 * Slider
		 */
		let sliderCircleShadow = listCurve.filter(Snap.filter.shadow(0, 0, 4, '#000', .2));

		let sliderCirclePosX = curvePointsPos[curvePointsPos.length - 1][0]+this._curveSliderContainerRadius;
		let sliderCirclePosY = curvePointsPos[curvePointsPos.length - 1][1]+this._curveSliderContainerRadius;
		let sliderCircle = listCurve.paper
			.circle(sliderCirclePosX, sliderCirclePosY, 20)
			.attr({filter: sliderCircleShadow}).addClass('dsg-curve__slider-circle');

		let sliderIconPath = `M ${sliderCirclePosX - 2},${sliderCirclePosY - 4}, L ${sliderCirclePosX + 2},${sliderCirclePosY},`
			+` L ${sliderCirclePosX - 2},${sliderCirclePosY + 4}`;
		let sliderIcon = listCurve.paper.path(sliderIconPath).addClass('dsg-curve__slider-icon');

		this._curveSlider = listCurve.paper.g(sliderCircle, sliderIcon)
			.attr({
				'transform': `translate(${this._curveHorizontalIndent - this._curveSliderContainerRadius},${curveVerticalIndent - this._curveSliderContainerRadius})`,
				'class': 'dsg-curve__slider'
			});

		/**
		 * Events
		 */
		this._dataAnimationStartPoint = 0;

		function setDataAnimationEndPoints() {
			let btn = document.getElementsByClassName('js-dsg-curve-list-item');
			for (let i = 0; i < curvePointsPos.length; i++) {
				let dataAnimationEndPoint = (curveLength/(curvePointsPos.length-1)) * i;

				btn[i].setAttribute('data-animation-end-point', dataAnimationEndPoint);

				btn[i].addEventListener('click', () => {
					_self.changeSliderPosition(dataAnimationEndPoint);
					_self.setTextListItemActiveClass(btn, i);
				});
			}
		}
		setDataAnimationEndPoints();
	}

	changeSliderPosition(sliderDestinationPoint) {
		Snap.animate(this._dataAnimationStartPoint, sliderDestinationPoint, (currentSliderPosition) => {
			let currentSliderXAxisPosition = Snap.path.getPointAtLength(this.curvePath, currentSliderPosition).x,
				currentSliderYAxisPosition = Snap.path.getPointAtLength(this.curvePath, currentSliderPosition).y;

			this._curveSlider.transform(`translate(${currentSliderXAxisPosition + this._curveHorizontalIndent - this._curveSliderContainerRadius},${currentSliderYAxisPosition})`);

			this._dataAnimationStartPoint = currentSliderPosition;
		}, 800, mina.easeinout);
	}

	/**
	 * Set 'active' class to selected text list item
	 * @param {object} textListItem - The DOM element which is selected text list item.
	 * @param {number} selectedTextListItemIndex - The index of selected text list item.
	 */
	setTextListItemActiveClass(textListItem, selectedTextListItemIndex) {
		for (let indexOfTextArrayItem = 0; indexOfTextArrayItem < textListItem.length; indexOfTextArrayItem++) {

			/**
			 * Set 'active' class for the text list element which have not 'active' state
			 */
			if (indexOfTextArrayItem === selectedTextListItemIndex && !textListItem[indexOfTextArrayItem].classList.contains('dsg-list__item_active')) {
				textListItem[indexOfTextArrayItem].classList.add('dsg-list__item_active');

			/**
			 * Remove 'active' class for unselected text list elements
			 */
			} else if (indexOfTextArrayItem !== selectedTextListItemIndex && textListItem[indexOfTextArrayItem].classList.contains('dsg-list__item_active')) {
				textListItem[indexOfTextArrayItem].classList.remove('dsg-list__item_active');
			}
		}
	}

	/**
	 * Create a text list container
	 * @param {object} element - The DOM element which is curve-list.
	 * @param {object} textArray - The array of the text list.
	 */
	setTextList(element, textArray) {

		/**
		 * Add the text list container to the DOM
		 */
		element.innerHTML += '<ul class="dsg-list dsg-curve-list__list js-dsg-curve-list"></ul>';
		let textListWrapper = element.querySelectorAll('.js-dsg-curve-list');

		/**
		 * Add the text list items to the DOM
		 */
		for (let indexOfTextArrayItem = 0; indexOfTextArrayItem < textArray.length; indexOfTextArrayItem++) {

			/**
			 * Add the multiple lines text list items to the DOM if textArray item includes the object type value
			 */
			if (typeof textArray[indexOfTextArrayItem].text === 'object') {
				textListWrapper[0].innerHTML += '<li class="dsg-list__item js-dsg-curve-list-item"></li>';

				/**
				 * Check the index of the current text list item string and add this element to the DOM
				 */
				for (let indexOfCurrentTextArrayItemString = 0; indexOfCurrentTextArrayItemString < textArray[indexOfTextArrayItem].text.length; indexOfCurrentTextArrayItemString++) {
					let listItem = element.querySelectorAll('.js-dsg-curve-list-item')[indexOfTextArrayItem];

					if (indexOfCurrentTextArrayItemString === 0) {
						listItem.innerHTML += textArray[indexOfTextArrayItem].text[indexOfCurrentTextArrayItemString];

					/**
					 * Add divider if the current text list item string is not first string
					 */
					} else {
						listItem.innerHTML += '<br/>'+ textArray[indexOfTextArrayItem].text[indexOfCurrentTextArrayItemString];
					}
				}

			/**
			 * Add the one-line text list items to the DOM if textArray item includes the string type value
			 */
			} else {
				textListWrapper[0].innerHTML += '<li class="list__item js-dsg-curve-list-item">'+textArray[indexOfTextArrayItem].text+'</li>';
			}
		}

		/**
		 * Set first element of textList as active element
		 */
		element.querySelectorAll('.js-dsg-curve-list-item')[0].className += " dsg-list__item_active"
	}

	set dataAnimationStartPoint (dataAnimationStartPoint) {
		this._dataAnimationStartPoint = dataAnimationStartPoint;
	}

	get dataAnimationStartPoint () {
		return this._dataAnimationStartPoint;
	}

	set curvePath (curvePath) {
		this._curvePath = curvePath;
	}

	get curvePath () {
		return this._curvePath;
	}

	set curveHorizontalIndent (curveHorizontalIndent) {
		this._curveHorizontalIndent = curveHorizontalIndent;
	}

	get curveHorizontalIndent () {
		return this._curveHorizontalIndent;
	}

	set curveSliderContainerRadius (curveSliderContainerRadius) {
		this._curveSliderContainerRadius = curveSliderContainerRadius;
	}

	get curveSliderContainerRadius () {
		return this._curveSliderContainerRadius;
	}
}

(() => {
	if (textArray !== void 0) {
		let curveListA = new CurveList(document.getElementsByClassName('js-curve-list-a')[0], textArray);
	}
})();
