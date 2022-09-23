/** @jsxImportSource preact */
import { useRef, useState } from 'preact/hooks';
import { css } from '@linaria/core';
import type { XFlip } from './x-flip';

export default () => {
	const [letters, setLetters] = useState(() => ['A', 'B', 'C', 'D', 'E', 'F']);
	const flipsMap = useRef(new Map<string, XFlip>());

	return (
		<article class={article}>
			{letters.map((letter, index) => {
				return (
					<x-flip key={letter} ref={(el: XFlip) => void flipsMap.current.set(letter, el)}>
						<Item
							letter={letter}
							onUp={() => {
								if (index === 0) return;
								const doTheSwap = () => {
									const newLetters = [...letters];
									newLetters[index] = newLetters[index - 1];
									newLetters[index - 1] = letter;
									setLetters(newLetters);
								};

								flipsMap.current.get(letter)?.play(doTheSwap);
								flipsMap.current.get(letters[index - 1])?.play(doTheSwap);
							}}
							onDown={() => {
								if (index === letters.length - 1) return;
								const doTheSwap = () => {
									const newLetters = [...letters];
									newLetters[index] = newLetters[index + 1];
									newLetters[index + 1] = letter;
									setLetters(newLetters);
								};

								flipsMap.current.get(letter)?.play(doTheSwap);
								flipsMap.current.get(letters[index + 1])?.play(doTheSwap);
							}}
						/>
					</x-flip>
				);
			})}
		</article>
	);
};

const Item = ({ letter = 'X', onUp = () => {}, onDown = () => {} }) => {
	return (
		<div class={item}>
			<span>{letter}</span>
			<button class={button} onClick={onUp}>
				<svg width='24' height='24' viewBox='0 0 24 24'>
					<path
						fill='currentColor'
						d='M11 20V7.825l-5.6 5.6L4 12l8-8l8 8l-1.4 1.425l-5.6-5.6V20Z'
					/>
				</svg>
			</button>
			<button class={button} onClick={onDown}>
				<svg width='24' height='24' viewBox='0 0 24 24'>
					<path fill='currentColor' d='m12 20l-8-8l1.4-1.425l5.6 5.6V4h2v12.175l5.6-5.6L20 12Z' />
				</svg>
			</button>
		</div>
	);
};

const article = css`
	width: min(400px, 80vw);
	display: grid;
	align-content: center;
	justify-self: center;
	gap: 1rem;
`;

const item = css`
	width: 100%;
	border: 0.5px solid;
	padding: 1rem;
	border-radius: 0.5rem;
	display: flex;
	align-items: center;
`;

const button = css`
	display: grid;
	place-content: center;
	font: inherit;
	font-size: x-large;
	cursor: pointer;
	background: transparent;
	border: none;
	border-radius: 9e9px;
	width: 2rem;
	height: 2rem;

	&:hover {
		background: hsl(0 0% 50% / 0.5);
	}

	&:first-of-type {
		margin-left: auto;
	}
`;
