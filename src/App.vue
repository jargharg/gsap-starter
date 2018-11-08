<template>
	<section id="app" class="app">
		<Animation1 />
		<div id="end"></div>
	</section>
</template>

<script>
import { TimelineLite, Power2 } from 'gsap';
import Animation1 from '@/components/Animation1';

export default {
	name: 'App',
	components: { Animation1 },
};
</script>

<style lang="scss">
@import '/styles/main.scss';

.app {
	background: gainsboro;
}

#end {
	height: 100vh;
}
</style>
