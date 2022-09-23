export class XFlip extends HTMLElement {
	connectedCallback() {}

	public async play(action: () => void) {
		const first = this.getBoundingClientRect();

		action();
		await new Promise((resolve) => setTimeout(resolve)); // wait for next frame

		const last = this.getBoundingClientRect();

		const dX = first.left - last.left;
		const dY = first.top - last.top;
		const dW = first.width / last.width;
		const dH = first.height / last.height;
		const transform = `translate(${dX}px, ${dY}px) scale(${dW}, ${dH})`;

		this.animate(
			[
				{ transformOrigin: 'top left', transform },
				{ transformOrigin: 'top left', transform: 'none' },
			],
			{ duration: 300, easing: 'ease-in-out' }
		);
	}
}

customElements.define('x-flip', XFlip);

declare global {
	namespace preact.createElement.JSX {
		interface IntrinsicElements {
			['x-flip']: unknown;
		}
	}
}
