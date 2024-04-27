import { useEffect } from 'react';

type UseCloseForm = {
	isFormOpen: boolean;
	onCloseForm?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useCloseForm = ({
	isFormOpen,
	rootRef,
	onCloseForm,
}: UseCloseForm) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isFormOpen && onCloseForm?.();
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onCloseForm, isFormOpen]);
};
