interface Props {
	isLoading?: boolean;
	disabled?: boolean;
	children: React.ReactNode;
	onClick: () => void;
}

export function PrimaryButton({
	isLoading = false,
	disabled = false,
	children,
	onClick,
}: Props) {
	const _loading = disabled
		? 'not-allowed'
		: isLoading
		? 'cursor-progress'
		: 'cursor-pointer';

	return (
		<button
			className={`px-4 py-1 shrink bg-blue-500 text-white rounded hover:bg-blue-600 transition ${_loading}`}
			onClick={onClick}>
			{children}
		</button>
	);
}
