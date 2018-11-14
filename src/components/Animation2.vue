<template>
	<section class="container">
		<svg xmlns="http://www.w3.org/2000/svg" :width="width" height="50px">

			<pattern id="sinePattern" x="0" y="0" :width="1 / (width + 50) * 50" height="1">
				<path ref="sine" fill="none" stroke="#262626" stroke-width="2"></path>
			</pattern>

			<rect ref="sinePattern" class="sine" fill="url(#sinePattern)" :width="width + 50" height="50" />
		</svg>
	</section>
</template>

<script>
import { TimelineMax, Linear } from 'gsap/all';

export default {
	name: 'Animation2',
	props: {
		width: Number,
	},
	mounted() {
		const height = 100;
		const h4 = height / 4;
		const curve = 0.51;
		const sineData = [
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
		];

		this.$refs.sine.setAttribute('d', sineData.join(' '));

		const sineAnimation = new TimelineMax({ repeat: -1 }).from(
			this.$refs.sinePattern,
			1,
			{ x: -50, ease: Linear.easeNone },
		);
	},
};
</script>

<style lang="scss" scoped>
.container {
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
