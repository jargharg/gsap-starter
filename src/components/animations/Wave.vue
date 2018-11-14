<template>
	<section class="sine__module">
		<svg class="sine__pattern" xmlns="http://www.w3.org/2000/svg" :width="width" height="50px">
			<pattern id="sinePattern" x="0" y="0" :width="1 / (width + xOffset) * 50" height="1">
				<path ref="sineWave" class="sine__element" :d="sineWaveData"></path>
			</pattern>

			<rect ref="sinePattern" fill="url(#sinePattern)" :width="width + xOffset" height="50" />
		</svg>
	</section>
</template>

<script>
import { TimelineMax, Power2 } from 'gsap/all';
import ScrollListener from '@/services/ScrollListener';

export default {
	name: 'Wave',
	props: {
		width: Number,
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
			xOffset: 300,
			sineWaveData,
		};
	},
	mounted() {
		const { sineWave, sinePattern } = this.$refs;

		this.sineAnimation = new TimelineMax({ paused: true, repeat: -1 }).from(
			sinePattern,
			3,
			{
				x: -this.xOffset,
				ease: Power2.easeInOut,
			},
		);

		this.elementTop = this.$el.offsetTop - this.$el.scrollHeight;
		this.scrollTimeline = this.$el.scrollHeight * 2;

		ScrollListener.addAction({
			startY: this.elementTop,
			endY: this.elementTop + this.scrollTimeline,
			action: (progress) => {
				this.sineAnimation.progress(progress);
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

	&__pattern {
		cursor: pointer;
	}

	&__element {
		stroke: $primary-color;
		stroke-width: 4;
		fill: none;
	}
}
</style>
