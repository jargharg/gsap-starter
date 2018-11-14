<template>
	<section id="app" class="app">
		<Animation1 />
		<Animation2 :width="200" />
		<Animation1 />
		<Animation2 :width="200" />
		<Animation1 />
		<Animation2 :width="200" />
		<Animation1 />
		<Animation2 :width="200" />
		<Animation1 />
		<div id="end">
			FIN
		</div>
		<FPS />
	</section>
</template>

<script>
import Animation1 from '@/components/Animation1';
import Animation2 from '@/components/Animation2';
import FPS from '@/components/FPS';

export default {
	name: 'App',
	components: { Animation1, Animation2, FPS },
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
	background: gainsboro;
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
