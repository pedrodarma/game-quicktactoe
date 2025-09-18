interface Props {
	isLoading?: boolean;
	disabled?: boolean;
	children: React.ReactNode;
}

export function SecondaryButton({
	isLoading = false,
	disabled = false,
	children,
}: Props) {
	return (
		<button className="px-4 py-1 bg-blue-300 text-gray-100 rounded hover:bg-gray-300 transition">
			{children}
		</button>
	);
}
