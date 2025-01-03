export const metadata = {
  title: "Fontify - AI Font Generator",
  description: "Generate custom fonts using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
