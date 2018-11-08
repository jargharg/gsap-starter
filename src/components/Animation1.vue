<template>
	<section ref="container" class="animation__module">
		<div ref="marker" class="animation__marker"></div>
		<div class="animation__container">
			<div ref="contentA" class="animation__content" @click="startAnimation">A</div>
			<div ref="contentB" class="animation__content">B</div>
		</div>
	</section>
</template>

<script>
import { TimelineLite, Power2, Linear, TweenLite } from 'gsap';
import scrollTo from 'gsap/ScrollToPlugin';

export default {
	name: 'Animation1',
	methods: {
		startAnimation() {
			TweenLite.to(window, 2, {
				scrollTo: "#end",
				ease: Linear.easeNone,
			});
		},
	},
	mounted() {
		const { contentA: A, contentB: B, container, marker } = this.$refs;
		const length = 4;
		const sectionLength = length / 4;
		this.container = container;

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

		window.addEventListener('scroll', () => {
			const st = document.documentElement.scrollTop;
			const ht = container.scrollHeight;
			const windowScroll = st / ht;
			
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
	}

	&__marker {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background: $secondary-color;
		text-align: right;
		padding-right: 1em;
	}

	&__container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	&__content {
		border-radius: 50%;
		height: 20vw;
		width: 20vw;
		background: $primary-color;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;

		&:nth-child(1) {
			cursor: pointer;
		}
	}
}
</style>
