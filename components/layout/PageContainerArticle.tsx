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
        className={`prose prose-sm mx-auto sm:prose lg:prose-lg xl:prose-xl ${articleClassName}`}
      >
        {children}
      </article>
    </PageContainer>
  );
}
