import { RefObject, useEffect } from 'react';

type CloseOnOutsideClickOrEscOptions = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: RefObject<HTMLDivElement>;
};

export const useCloseOnOutsideClickOrEsc = ({
	isOpen,
	rootRef,
	onChange,
}: CloseOnOutsideClickOrEscOptions) => {
	useEffect(() => {
		if (!isOpen) return;

		const outsideClickHandler = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				onChange?.(false);
			}
		};

		const escKeyHandler = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				onChange?.(false);
			}
		};

		window.addEventListener('mousedown', outsideClickHandler);
		window.addEventListener('keydown', escKeyHandler);

		return () => {
			window.removeEventListener('mousedown', outsideClickHandler);
			window.removeEventListener('keydown', escKeyHandler);
		};
	}, [isOpen, onChange, rootRef]);
};
