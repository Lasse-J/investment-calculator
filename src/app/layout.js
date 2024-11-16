import "./globals.css";

export const metadata = {
  title: "Investment Calculator",
  description: "Inflation Adjusted Inflation Calculator by Lasse Juusela",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
