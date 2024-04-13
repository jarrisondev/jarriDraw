import Footer from "./footer"
import Header from "./header"

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className="border border-red-50 max-w-7xl mx-auto flex flex-col justify-between min-h-screen p-5">
			<Header />
			<section className="flex-1">{children}</section>
			<Footer />
		</main>
	)
}
