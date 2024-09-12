import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ReactQueryClientProvider } from "@/components/reactQueryClientProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "JarriDraw: Next level excalidraw experience",
	description:
		"Unlock your creativity with our advanced Excalidraw tool. Save, manage, and share multiple boards effortlessly.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ReactQueryClientProvider>
			<html lang="en" suppressHydrationWarning>
				<head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/logo.png" />
				</head>
				<body className={inter.className}>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ReactQueryClientProvider>
	)
}
