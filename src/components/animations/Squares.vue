<template>
	<section class="animation__module">
		<div class="animation__container">
			<div class="animation__square__container">
				<div class="animation__square" v-for="(square, index) in squares" :key="index" :ref="`square${index}`" @click='toggleSmall(square)' :class="{'animation__square--small': square.small}">
					{{index + 1}}
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { TweenLite, Power2, Back } from 'gsap';
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
			square.small ? square.clickAnimation.play() : square.clickAnimation.reverse();
		},
		setSquaresTimeline() {
			const { offsetHeight, offsetWidth } = document.documentElement;

			this.squares.forEach((square) => {
				square.positionAnimation = TweenLite.from(square.ref, 1, {
					x: (Math.random() * offsetWidth) / 1.3 - offsetWidth / 2.6,
					y: (Math.random() * offsetHeight) / 1.3 - offsetHeight / 2.6,
					scale: Math.random() + 0.2,
					ease: Power2.easeInOut,
				}).paused(true);

				square.clickAnimation = TweenLite.to(square.ref, 0.6, {
					scale: 0.5,
					ease: Back.easeInOut,
				}).paused(true);
			});
		},
	},
	mounted() {
		this.squares.forEach((square, index) => {
			square.ref = this.$refs[`square${index}`];
		});

		this.elementTop = this.$el.offsetTop;
		this.scrollTimeline = this.$el.scrollHeight - window.innerHeight;

		this.setSquaresTimeline();

		ScrollListener.addAction({
			startY: this.elementTop,
			endY: this.elementTop + this.scrollTimeline,
			actionToProgress: (progress) => {
				this.squares.forEach((square) => {
					square.positionAnimation.progress(progress);
				});
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
			position: relative;
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
