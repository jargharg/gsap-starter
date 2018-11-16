<template>
	<section class="sine__module">
		<svg class="sine__pattern" xmlns="http://www.w3.org/2000/svg" :width="width" height="50">
			<pattern id="sinePattern" x="0" y="0" :width="1 / (width + xOffset) * 50" height="1">
				<path class="sine__element" :style='{stroke: stroke}' :d="sineWaveData"></path>
			</pattern>

			<rect ref="sineWave" class="sine__wave" fill="url(#sinePattern)" :width="width + xOffset" height="50" />
		</svg>
	</section>
</template>

<script>
import { TweenLite, Linear } from 'gsap';
import ScrollListener from '@/services/ScrollListener';

export default {
	name: 'Wave',
	props: {
		width: Number,
		stroke: String,
	},
	data() {
		const height = 100;
		const h4 = height / 4;
		const curve = 0.51;
		const sineWaveData = [
			'M',
			0,
			height * 0.125,
			'c',
			h4 * curve,
			0,
			h4 * (1 - curve),
			h4,
			h4,
			h4,
			's',
			h4 * (1 - curve),
			-h4,
			h4,
			-h4,
		].join(' ');

		return {
			xOffset: this.width * 1.5,
			sineWaveData,
		};
	},
	mounted() {
		const { sineWave } = this.$refs;

		this.sineAnimation = TweenLite.from(sineWave, 3, {
			x: -this.xOffset,
			ease: Linear.easeNone,
		}).paused(true);

		this.elementTop = this.$el.offsetTop - this.$el.scrollHeight;
		this.scrollTimeline = this.$el.scrollHeight * 2;

		ScrollListener.addAction({
			startY: this.elementTop,
			endY: this.elementTop + this.scrollTimeline,
			action: progress => {
				this.sineAnimation.progress(progress);
				console.log('sine firing');
			},
		});
	},
};
</script>

<style lang="scss" scoped>
.sine {
	&__module {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&__element {
		stroke-width: 4;
		fill: none;
	}

	&__wave {
		// animation: scrollLeft 0.5s infinite linear;
	}
}

@keyframes scrollLeft {
	0% {
		transform: translateX(-50px);
	}
	100% {
		transform: translateX(0);
	}
}
</style>
