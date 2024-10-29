<script>
	import MagicBackground from "./MagicBackground.svelte";
</script>

<div class="relative h-full w-full rounded-full bg-brand-red">
	<!-- duplicate to blur for the background -->
	<div class="ball ball-copy">
		<MagicBackground
			color1={{ red: 236, green: 55, blue: 80 }}
			color2={{ red: 255, green: 140, blue: 55 }}
			shiftStrength={3}
			width={50}
			height={50}
		/>
	</div>
	<div class="ball">
		<MagicBackground
			color1={{ red: 236, green: 55, blue: 80 }}
			color2={{ red: 255, green: 140, blue: 55 }}
			shiftStrength={3}
			width={50}
			height={50}
		/>
	</div>
	<img class="logo opacity-20" src="hackclub-curved.svg" alt="" />
	<img class="logo opacity-80" src="hackclub-curved-glow.svg" alt="" />
	<img class="base" src="base.svg" alt="" />
</div>

<style>
	.ball {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 20;
		border-radius: 9999px;
		mask-repeat: no-repeat;
		mask-size: 100%;
		mask-image: radial-gradient(circle at 50% 120%, black, rgba(0, 0, 0, 0.8));
	}
	.ball::after {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 30;
		background: radial-gradient(
			circle at 50% 0px,
			rgba(235, 173, 181, 0.9),
			rgba(255, 255, 255, 0) 58%
		);
	}
	.ball::before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 30;
		border-radius: 9999px;
		box-shadow:
			inset 0px 30px 20px rgba(238, 86, 107, 0.3),
			inset 0px 20px 40px rgba(239, 202, 207, 0.3),
			inset 0px 10px 20px rgba(255, 255, 255, 0.2),
			inset 0px -50px 20px rgba(239, 139, 153, 0.2);
	}

	.ball-copy {
		filter: blur(100px);
		mask: none;
		overflow: hidden;
	}

	.logo {
		position: absolute;
		left: 50%;
		top: 35%;
		height: 15rem;
		transform: translate(-50%, -50%) rotateX(15deg);
		z-index: 25;
	}

	.base {
		position: absolute;
		left: 50%;
		bottom: -11%;
		width: 100%;
		transform: translateX(-50%);
		z-index: 40;
	}
</style>
