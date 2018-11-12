class ScrollListener {
	constructor(action) {
		this.action = action;
		this.lastScrollY = 0;
		this.ticking = false;
		this.actions = [];

		window.addEventListener('scroll', () => this.onScroll());

		this.update = () => {
			for (let i = 0; i < this.actions.length; i++) {
				this.actions[i](this.lastScrollY);
			}

			this.ticking = false;
		};

		this.onScroll = () => {
			this.lastScrollY = window.scrollY;
			this.requestTick();
		};

		this.requestTick = () => {
			if (!this.ticking) {
				window.requestAnimationFrame(this.update);
				this.ticking = true;
			}
		};
	}

	addAction(action) {
		this.actions.push(action);
	}
}
export default new ScrollListener();
