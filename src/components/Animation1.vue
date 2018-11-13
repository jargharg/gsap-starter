<template>
	<section class="animation__module">
		<div class="animation__container">
			<div ref="background" class="animation__background"></div>
			<div ref="ballA" class="animation__ball" @click="runAnimation">A</div>
			<div ref="ballB" class="animation__ball">B</div>
		</div>
	</section>
</template>

<script>
require('gsap/ScrollToPlugin');
import { TimelineLite, Power2, Linear, TweenLite } from 'gsap/all';
import ScrollListener from '../services/ScrollListener';

export default {
	name: 'Animation1',
	data() {
		const animationLength = 1;

		return {
			length: animationLength,
			l4: animationLength / 4,
		};
	},
	methods: {
		runAnimation() {
			TweenLite.to(document.documentElement, 2, {
				scrollTo: this.elementTop + this.scrollTimeline,
				ease: Linear.easeNone,
			});
		},
		setBackgroundTimeline() {
			const { background } = this.$refs;

			this.background = new TimelineLite({
				paused: true,
			}).from(background, this.length, {
				autoAlpha: 0,
				ease: Linear.easeNone,
			});
		},
		setBallsTimeline() {
			const { ballA: A, ballB: B } = this.$refs;

			this.balls = new TimelineLite({
				paused: true,
			})
				.to(A, this.l4, {
					x: '-100%',
					rotation: -360,
					ease: Power2.easeInOut,
				})
				.to(A, this.l4, {
					x: '0%',
					rotation: 360,
					ease: Power2.easeIn,
				})
				.to(B, this.l4, {
					x: '100%',
					rotation: 360,
					ease: Power2.easeOut,
				})
				.to(B, this.l4, {
					x: '0%',
					rotation: -360,
					ease: Power2.easeInOut,
				});
		},
	},
	mounted() {
		this.elementTop = this.$el.offsetTop;
		this.scrollTimeline = this.$el.scrollHeight - window.innerHeight;

		this.setBackgroundTimeline();
		this.setBallsTimeline();

		ScrollListener.addAction({
			startHeight: this.elementTop,
			endHeight: this.elementTop + this.scrollTimeline,
			action: progress => {
				this.background.progress(progress);
				this.balls.progress(progress);
			},
		});
	},
};
</script>

<style scoped lang="scss">
.animation {
	&__module {
		height: 200vh;
	}

	&__container {
		align-items: center;
		display: flex;
		flex-direction: row;
		height: 100vh;
		justify-content: center;
		position: sticky;
		top: 0;
		width: 100%;
	}

	&__background {
		background: $secondary-color;
		height: 100vh;
		left: 0;
		padding-right: 1em;
		position: absolute;
		text-align: right;
		top: 0;
		width: 100vw;
	}

	&__ball {
		align-items: center;
		background: $primary-color;
		border-radius: 50%;
		color: white;
		display: flex;
		height: 20vw;
		justify-content: center;
		width: 20vw;
		z-index: 2;

		&:nth-child(1) {
			cursor: pointer;
		}
	}
}
</style>
