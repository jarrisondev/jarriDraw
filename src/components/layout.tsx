import Header from "./header"

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className="border border-red-50 max-w-7xl mx-auto flex flex-col min-h-screen">
			<Header />
			{children}
		</main>
	)
}
