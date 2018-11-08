<template>
	<section class="home">
		<Animation1 />
	</section>
</template>

<script>
import { TimelineLite, Power2 } from 'gsap';
import Animation1 from '@/components/Animation1';

export default {
	name: 'home',
	components: { Animation1 },
};
</script>

<style lang="scss" scoped>
</style>
