<template>
	<section id="app" class="app">
		<Balls />
		<Wave :width="200" />
		<Rows />
		<Wave :width="200" />
		<Squares />
		<div id="end">
			FIN
		</div>
		<FPS />
	</section>
</template>

<script>
import Balls from '@/components/animations/Balls';
import FPS from '@/components/FPS';
import Rows from '@/components/animations/Rows';
import Squares from '@/components/animations/Squares';
import Wave from '@/components/animations/Wave';

export default {
	name: 'App',
	components: {
		Balls,
		Wave,
		Squares,
		Rows,
		FPS,
	},
	data() {
		return {
			screenWidth: document.body.offsetWidth,
		};
	},
};
</script>

<style lang="scss">
@import '/styles/main.scss';

.app {
	background: $bg-gradient;
}

#end {
	height: 100vh;
	justify-content: center;
	align-items: center;
	display: flex;
	color: $primary-color;
	font-size: 3em;
}
</style>
