import PageContainerArticle from "@/components/layout/PageContainerArticle";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "The Survival Imperative",
  description:
    "Survival is the primary need of civilization; therefore, ensuring it is the ultimate purpose of existence.",
  keywords:
    "life, purpose, survival, civilization, human survival, long-term survival, existential risks",
  canonicalPath: "survival-imperative",
});

export default function Page() {
  return (
    <PageContainerArticle>
      <h1>The Survival Imperative</h1>
      <p>
        Survival is the primary need of civilization; therefore, ensuring it is
        the ultimate purpose of existence.
      </p>
      <h2>The Grand Challenges</h2>
      <p>
        Together, we can preserve civilization by dedicating our efforts to the
        following five areas:
      </p>
      <ol>
        <li>Sustain Civilization on Earth</li>
        <li>Ensure Human Survival</li>
        <li>Expand Human Knowledge</li>
        <li>Promote Global Unity</li>
        <li>Advance Post-Earth Civilization</li>
      </ol>
      <h2>Integrating Survival with Other Life Purposes</h2>
      <p>
        While this manifesto proposes ensuring survival as the ultimate purpose
        of existence, progress in many overlapping pursuits can be achieved
        along the way. The survival imperative connects strongly to maximizing
        human flourishing, contributing to justice and equity, stewarding the
        Earth, and building meaningful relationships and communities.
      </p>
      <h2>Biological Foundations for Survival</h2>
      <p>
        Human instinct for self-preservation is a powerful motivator for action.
        Our ability to adapt to changing environments forms a strong foundation
        for addressing existential risks. Emotions tied to cooperation, hope,
        and the search for purpose further amplify humanity&apos;s capacity for
        long-term survival.
      </p>
      <h2>Evolutionary Limits on Survival</h2>
      <p>
        While we are biologically well-suited for survival, our tendency to
        prioritize immediate threats over long-term risks presents a significant
        limitation. The comforts of modernity dull our survival instincts,
        causing us to overlook existential threats. Evolutionary tribalism can
        hinder collaboration, and overconfidence in human ingenuity may lead to
        dangerous complacency.
      </p>
      <p>
        It is essential to recognize and address these limitations to
        effectively pursue humanity&apos;s long-term survival.
      </p>
      <h2>Inspiration</h2>
      <ul>
        <li>
          <em>The Dark Forest</em> by Liu Cixin
        </li>
        <li>
          <em>Strenuous Life</em> speech by Theodore Roosevelt
        </li>
      </ul>
    </PageContainerArticle>
  );
}
