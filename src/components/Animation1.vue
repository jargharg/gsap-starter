<template>
	<section ref="moduleElement" class="animation__module">
		<div ref="marker" class="animation__marker"></div>
		<div class="animation__container">
			<div ref="contentA" class="animation__content" @click="startAnimation">A</div>
			<div ref="contentB" class="animation__content">B</div>
		</div>
	</section>
</template>

<script>
require('gsap/ScrollToPlugin');
import { TimelineLite, Power2, Linear, TweenLite } from 'gsap/all';
import ScrollListener from '@/services/ScrollListener';

export default {
	name: 'Animation1',
	methods: {
		startAnimation() {
			TweenLite.to(document.documentElement, 2, {
				scrollTo: '#end',
				ease: Linear.easeNone,
			});
		},
	},
	mounted() {
		const { contentA: A, contentB: B, moduleElement, marker } = this.$refs;
		const length = 4;
		const sectionLength = length / 4;

		this.marker = new TimelineLite({
			paused: true,
		}).from(marker, length, {
			opacity: '0',
			ease: Linear.easeNone,
		});

		this.timeline = new TimelineLite({
			paused: true,
		})
			.to(A, sectionLength, {
				x: '-100%',
				rotation: -360,
				ease: Power2.easeInOut,
			})
			.to(A, sectionLength, {
				x: '0%',
				rotation: 360,
				ease: Power2.easeIn,
			})
			.to(B, sectionLength, {
				x: '100%',
				rotation: 360,
				ease: Power2.easeOut,
			})
			.to(B, sectionLength, {
				x: '0%',
				rotation: -360,
				ease: Power2.easeInOut,
			});

		const ht = moduleElement.scrollHeight;

		ScrollListener.addAction((scrollY) => {
			const windowScroll = scrollY / ht;
			this.marker.progress(windowScroll);
			this.timeline.progress(windowScroll);
		});
	},
};
</script>

<style scoped lang="scss">
.animation {
	&__module {
		height: 200vh;
		overflow: hidden;
	}

	&__container {
		align-items: center;
		display: flex;
		flex-direction: row;
		height: 100vh;
		justify-content: center;
		left: 0;
		position: fixed;
		top: 0;
		width: 100vw;
	}

	&__marker {
		background: $secondary-color;
		height: 100vh;
		left: 0;
		padding-right: 1em;
		position: fixed;
		text-align: right;
		top: 0;
		width: 100vw;
	}

	&__content {
		align-items: center;
		background: $primary-color;
		border-radius: 50%;
		color: white;
		display: flex;
		height: 20vw;
		justify-content: center;
		width: 20vw;

		&:nth-child(1) {
			cursor: pointer;
		}
	}
}
</style>
