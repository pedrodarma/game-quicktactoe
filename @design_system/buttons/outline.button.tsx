interface Props {
	isLoading?: boolean;
	disabled?: boolean;
	children: React.ReactNode;
}

export function OutlineButton({
	isLoading = false,
	disabled = false,
	children,
}: Props) {
	return (
		<button className="px-4 py-1 bg-transparent border rounded text-blue-500 hover:text-blue-50 transition">
			{children}
		</button>
	);
}
