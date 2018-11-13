class ScrollListener {
	constructor() {
		this.lastScrollY = 0;
		this.ticking = false;
		this.actions = [];

		this.update = () => {
			for (let i = 0; i < this.actions.length; i++) {
				const action = this.actions[i];

				if (
					this.lastScrollY >= action.startY &&
					this.lastScrollY <= action.endY
				) {
					const progress = (this.lastScrollY - action.startY) / action.distanceY;
					action.action(progress);
				}
			}

			this.ticking = false;
		};

		this.requestTick = () => {
			if (!this.ticking) {
				window.requestAnimationFrame(this.update);
				this.ticking = true;
			}
		};

		this.onScroll = () => {
			this.lastScrollY = window.scrollY;
			this.requestTick();
		};

		window.addEventListener('scroll', () => this.onScroll());
	}

	/**
	 * Add an action to the scroll listener
	 * @param {Object} action
	 * @param {Function} action.action - The action to call with a parameter of progress through (between 0 and 1)
	 * @param {Number} action.startY - The Y coordinate at which to start calling the action
	 * @param {Number} action.endY - The Y coordinate at which to stop calling the action
	 */
	addAction(action) {
		action.distanceY = action.endY - action.startY;
		this.actions.push(action);
	}
}

export default new ScrollListener();
