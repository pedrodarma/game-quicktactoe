interface Props {
	isLoading?: boolean;
	disabled?: boolean;
	children: React.ReactNode;
	onClick: () => void;
}

export function SecondaryButton({
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
			className={`px-4 py-1 bg-blue-300 text-gray-100 rounded hover:bg-blue-400 transition ${_loading}`}
			onClick={onClick}>
			{children}
		</button>
	);
}
