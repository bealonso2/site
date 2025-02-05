export default function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={`flex min-h-screen flex-col items-stretch justify-between px-4 py-12 md:px-12 ${className}`}
    >
      {children}
    </main>
  );
}
