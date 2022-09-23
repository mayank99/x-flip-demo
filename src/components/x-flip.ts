export class XFlip extends HTMLElement {
	connectedCallback() {}

	public async play(action: () => void) {
		const first = this.getBoundingClientRect();
		action();

		// wait for next frame
		await new Promise((resolve) => setTimeout(resolve));

		const last = this.getBoundingClientRect();

		const deltaX = first.left - last.left;
		const deltaY = first.top - last.top;
		const deltaW = first.width / last.width;
		const deltaH = first.height / last.height;

		this.animate(
			[
				{
					transformOrigin: 'top left',
					transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`,
				},
				{
					transformOrigin: 'top left',
					transform: 'none',
				},
			],
			{
				duration: 300,
				easing: 'ease-in-out',
			}
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
