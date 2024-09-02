import PageContainer from "./PageContainer";

export default function PageContainerArticle({
  children,
  pageContainerClassName,
  articleClassName,
}: {
  children: React.ReactNode;
  pageContainerClassName?: string;
  articleClassName?: string;
}) {
  return (
    <PageContainer className={pageContainerClassName}>
      <article
        className={`prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto ${articleClassName}`}
      >
        {children}
      </article>
    </PageContainer>
  );
}
