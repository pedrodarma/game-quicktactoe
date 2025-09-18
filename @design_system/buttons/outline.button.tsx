interface Props {
	isLoading?: boolean;
	disabled?: boolean;
	children: React.ReactNode;
	onClick: () => void;
}

export function OutlineButton({
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
			className={`px-4 py-1 bg-transparent border rounded text-blue-500 hover:text-blue-50 transition ${_loading}`}
			onClick={onClick}>
			{children}
		</button>
	);
}
