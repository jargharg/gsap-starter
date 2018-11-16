<template>
	<section id="app" class="app">
		<Balls />
		<Wave :width="200" :stroke="'yellow'" />
		<Balls />
		<div id="end">
			FIN
		</div>
		<FPS />
	</section>
</template>

<script>
import Balls from '@/components/animations/Balls';
import Wave from '@/components/animations/Wave';
import FPS from '@/components/FPS';

export default {
	name: 'App',
	components: { Balls, Wave, FPS },
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
	background: rgb(9, 5, 60);
}

#end {
	height: 100vh;
	justify-content: center;
	align-items: center;
	display: flex;
	color: $secondary-color;
	font-size: 3em;
}
</style>
