class ScrollListener {
	constructor(action) {
		this.action = action;
		this.lastScrollY = 0;
		this.ticking = false;
		this.actions = [];

		this.update = () => {
			for (let i = 0; i < this.actions.length; i++) {
				const action = this.actions[i];
				if (
					this.lastScrollY > action.startHeight &&
					this.lastScrollY < action.endHeight
				) {
					action.action(this.lastScrollY);
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
	 * @param {Function} action.action - The action to call, with a parameter of scrollY
	 * @param {String} action.startHeight - The scroll height at which to start calling the action
	 * @param {String} action.endHeight - The scroll height at which to stop calling the action
	 */
	addAction(action) {
		this.actions.push(action);
	}
}
export default new ScrollListener();
