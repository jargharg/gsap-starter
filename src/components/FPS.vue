<template>
	<div class="counter">
		{{ fps }} FPS
	</div>
</template>

<script>
export default {
	name: 'FPS',
	data() {
		return { fps: 0 };
	},
	mounted() {
		const fps = 0;
		const times = [];

		const refreshLoop = () => {
			window.requestAnimationFrame(() => {
				const now = performance.now();
				while (times.length > 0 && times[0] <= now - 1000) {
					times.shift();
				}
				times.push(now);
				this.fps = times.length;
				refreshLoop();
			});
		};

		refreshLoop();
	},
};
</script>

<style lang="scss" scoped>
.counter {
	position: fixed;
	top: 0;
	left: 0;
	padding: 0.5em;
	transform: rotate(0.01deg);
	z-index: 999999;
	background: white;
	color: black;
	font-family: monospace;
}
</style>
