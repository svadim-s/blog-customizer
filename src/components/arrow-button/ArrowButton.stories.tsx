import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton, OnClick } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	args: {
		onClick: () => console.log('Clicked'),
		formOpen: false,
	},
	render: ({ onClick, formOpen }: { onClick: OnClick; formOpen: boolean }) => {
		return (
			<>
				<ArrowButton onClick={onClick} formOpen={formOpen} />
			</>
		);
	},
};
