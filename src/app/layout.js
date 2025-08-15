import "./globals.css";

export const metadata = {
  title: "Simple Weather App",
  description: "A simple weather application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
