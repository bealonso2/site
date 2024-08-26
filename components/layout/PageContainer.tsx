export default function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={`flex min-h-screen flex-col items-stretch justify-between px-4 md:px-12 py-12 pb-24 ${className}`}
    >
      {children}
    </main>
  );
}
