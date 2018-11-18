<template>
    <section class="animation__module">
        <div class="animation__container">
            <div class="animation__row" v-for="(row, index) in rows" :key="index" :ref="`row${index}`"></div>
        </div>
    </section>
</template>

<script>
import { TimelineLite, TweenLite, Linear } from 'gsap';
import ScrollListener from '@/services/ScrollListener';

export default {
	name: 'Rows',
	data() {
		const rows = [];
		for (let i = 0; i < 10; i++) rows.push({ small: false });

		return { rows };
	},
	methods: {
		setRowTweens() {
			const { offsetWidth } = document.documentElement;
			const tweens = [];

			this.rows.forEach((row, index) => {
				const tween = TweenLite.from(row.ref, 1, {
					x: index % 2 === 0 ? offsetWidth : -offsetWidth,
					ease: Linear.easeNone,
				});

				tweens.push(tween);
			});

			this.rows.forEach((row, index) => {
				const tween = TweenLite.to(row.ref, 1, {
					x: index % 2 === 0 ? -offsetWidth : offsetWidth,
					ease: Linear.easeNone,
				});

				tweens.push(tween);
			});

			return tweens;
		},
	},
	mounted() {
		this.rows.forEach((row, index) => {
			row.ref = this.$refs[`row${index}`];
		});

		const rowTweens = this.setRowTweens();

		this.masterTimeline = new TimelineLite({ paused: true }).to(document, 0.2, {});

		rowTweens.forEach((rowTween) => {
			this.masterTimeline.add(rowTween);
		});

		this.masterTimeline.to(document, 0.2, {});

		this.elementTop = this.$el.offsetTop;
		this.scrollTimeline = this.$el.scrollHeight - window.innerHeight;

		ScrollListener.addAction({
			startY: this.elementTop,
			endY: this.elementTop + this.scrollTimeline,
			actionToProgress: (progress) => {
				this.masterTimeline.progress(progress);
			},
		});
	},
};
</script>

<style scoped lang="scss">
.animation {
	&__module {
		height: 300vh;
	}

	&__container {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		height: 100vh;
		justify-content: center;
		position: sticky;
		top: 0;
		overflow: hidden;
		width: 100%;
	}

	&__row {
		background: $primary-color;
		height: 10%;
		width: 100vw;
		z-index: 2;
	}
}
</style>
