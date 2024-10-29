<!-- this code is from a past hackathon project:  https://github.com/TigerHacks-Competition-Team/Bitcamp-2023/blob/main/src/routes/background.svelte
     the effect is inspired by https://codepen.io/tmrDevelops/pen/vOPZBv -->
<script lang="ts">
	import { onMount } from "svelte";

	interface Color {
		red: number;
		green: number;
		blue: number;
	}

	export let width = 35;
	export let height = 35;
	export let color1: Color;
	export let color2: Color;
	export let shiftStrength = 3;

	// this takes a red, green, or blue value, along with the key for which one it is
	function shiftColorValueToRange(value: number, valueKey: "red" | "green" | "blue") {
		const valRange = Math.abs(color1[valueKey] - color2[valueKey]);
		const minValue = Math.min(color1[valueKey], color2[valueKey]);
		value = minValue + (value / 255) * valRange;
		// shift the value towards whichever color it's closer to, to have less whites
		let distance1 = Math.abs(value - color1[valueKey]);
		let distance2 = Math.abs(value - color2[valueKey]);
		// this just takes an average of `value` and the value in color1 or color2,
		// weighted `colorShiftPower` times towards `value`
		if (distance1 > distance2) {
			value = (color1[valueKey] + value * shiftStrength) / (shiftStrength + 1);
		} else {
			value = (color2[valueKey] + value * shiftStrength) / (shiftStrength + 1);
		}
		return value;
	}

	// these use the cool algorithm by Tiffany Rayside
	// https://codepen.io/tmrDevelops/pen/vOPZBv
	function getPixelRed(x: number, y: number, t: number) {
		let value = Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t));
		return shiftColorValueToRange(value, "red");
	}
	function getPixelGreen(x: number, y: number, t: number) {
		let value = Math.floor(
			192 + 64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)
		);
		return shiftColorValueToRange(value, "green");
	}
	function getPixelBlue(x: number, y: number, t: number) {
		let value = Math.floor(
			192 +
				64 * Math.sin(5 * Math.sin(t / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100)
		);
		return shiftColorValueToRange(value, "blue");
	}

	let canv: HTMLCanvasElement | null = null;
	let time = 0;

	function animateBackground() {
		const ctx = canv?.getContext("2d") as CanvasRenderingContext2D;
		if (ctx) {
			for (let x = 0; x < width; x++) {
				for (let y = 0; y < height; y++) {
					let [r, g, b] = [
						getPixelRed(x, y, time),
						getPixelBlue(x, y, time),
						getPixelGreen(x, y, time),
					];
					ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
					ctx.fillRect(x, y, 1, 1);
				}
			}
			time += 0.12;
		}
		window.requestAnimationFrame(animateBackground);
	}

	onMount(animateBackground);
</script>

<canvas bind:this={canv} {width} {height} class="h-full w-full"></canvas>
