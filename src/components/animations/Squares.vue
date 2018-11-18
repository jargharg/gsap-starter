<template>
	<section class="animation__module">
		<div class="animation__container">
			<div class="animation__square__container">
				<div class="animation__square" v-for="(square, index) in squares" :key="index" :ref="`square${index}`" @click='toggleSmall(square)'>
					{{index + 1}}
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { TweenLite, Power2 } from 'gsap';
import ScrollListener from '@/services/ScrollListener';

export default {
	name: 'Squares',
	data() {
		const squares = [];
		for (let i = 0; i < 16; i++) squares.push({ small: false });

		return { squares };
	},
	methods: {
		toggleSmall(square) {
			square.small = !square.small;
			square.small ? square.clickTween.play() : square.clickTween.reverse();
		},
		setSquareTweens() {
			const { offsetHeight, offsetWidth } = document.documentElement;
			const tweens = [];

			this.squares.forEach((square) => {
				const positionTween = TweenLite.from(square.ref, 1, {
					x: (Math.random() * offsetWidth) / 1.3 - offsetWidth / 2.6,
					y: (Math.random() * offsetHeight) / 1.3 - offsetHeight / 2.6,
					scale: Math.random() + 0.2,
					ease: Power2.easeInOut,
				});

				tweens.push(positionTween);

				square.clickTween = TweenLite.to(square.ref, 0.1, {
					scale: 0.5,
					ease: Power2.easeInOut,
				}).paused(true);
			});

			return tweens;
		},
	},
	mounted() {
		this.squares.forEach((square, index) => {
			square.ref = this.$refs[`square${index}`];
		});

		const squareTweens = this.setSquareTweens();

		this.masterTimeline = new TimelineLite({ paused: true }).add('start');

		squareTweens.forEach((squareTween) => {
			this.masterTimeline.add(squareTween, 'start');
		});

		this.masterTimeline.to(document, 0.3, {}); // add delay at end

		this.elementTop = this.$el.offsetTop;
		this.scrollTimeline = this.$el.scrollHeight - window.innerHeight;

		ScrollListener.addAction({
			startY: this.elementTop,
			endY: this.elementTop + this.scrollTimeline,
			actionToProgress: (progress) => {
				this.masterTimeline.progress(progress);
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
		height: 100vh;
		justify-content: center;
		overflow: hidden;
		position: sticky;
		top: 0;
		width: 100%;
	}

	&__square {
		align-items: center;
		background: $primary-color;
		color: white;
		cursor: pointer;
		display: flex;
		height: 25%;
		justify-content: center;
		width: 25%;
		z-index: 2;
		position: relative;
		transition: 0.2s all;

		&:hover {
			opacity: 0.9;
		}

		&__container {
			height: 50vh;
			max-height: 50vw;
			width: 50vh;
			max-width: 50vw;
			display: flex;
			flex-wrap: wrap;
		}
	}
}
</style>
