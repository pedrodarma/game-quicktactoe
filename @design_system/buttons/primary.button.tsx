interface Props {
	isLoading?: boolean;
	disabled?: boolean;
	children: React.ReactNode;
}

export function PrimaryButton({
	isLoading = false,
	disabled = false,
	children,
}: Props) {
	return (
		<button className="px-4 py-1 shrink bg-blue-500 text-white rounded hover:bg-blue-600 transition">
			{children}
		</button>
	);
}
