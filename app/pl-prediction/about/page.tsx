import PageContainer from "@/components/layout/PageContainer";

export default function About() {
  return (
    <PageContainer>
      <article className="prose mx-auto">
        <h1>About Premier League Prediction</h1>
        <p>
          This is a web app that predicts the final standings of the English
          Premier League based on historical data. The data is sourced from{" "}
          <a
            href="
            https://www.football-data.org
            "
            target="_blank"
            rel="noopener noreferrer"
          >
            football-data.org
          </a>
          . This project was inspired by the now-defunct{" "}
          <a
            href="https://projects.fivethirtyeight.com/soccer-predictions/premier-league/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          ></a>
          FiveThirtyEight club soccer predictions.
        </p>
        <h2>Model</h2>
        <h3>Methodology</h3>
        <p>
          The model uses an Elo-based system to predict the final league
          standings. The Elo rating system is a method for calculating the
          relative skill levels of players in two-player games such as chess.
          The model uses the Elo rating system to measure the relative strength
          of each Premier League club and uses this information to assess how
          likely a result is in a given match.
        </p>
        <p>
          Before the season, each club is assigned an Elo rating based on their
          performance in the previous season. The Elo ratings of all clubs are
          adjusted based on club value.
        </p>
        {/* <h4>Elo Calculation</h4>
        <p>
          The model uses the following formula to calculate the Elo rating for
          each club:
        </p>
        <pre>
          <code>
            R<sub>n</sub> = R<sub>o</sub> + K * (W - E)
          </code>
        </pre> */}
        <h3>Model Architecture</h3>
        <p>The model is trained on the following data:</p>
        <ul>
          <li>Elo</li>
          <li>Table Position</li>
          <li>Manager Games in Charge</li>
          <li>Recent Form</li>
        </ul>
        <p>
          which is compared to the actual outcome of the match. A Random Forest
          Classifier is trained on the past two seasons and is used to predict
          the outcome of each match.
        </p>
        <h2>Forecasting</h2>
        <p>
          The model generates a forecast before the start of each new match week
          where the model is making predictions based on by the knowledge of the
          results from previous match weeks. Before running the forecast, the
          model processes current form, manager tenure, and position in the
          league table for each Premier League club.
        </p>
        <p>
          The forecast simulates the current season 10,000 to determine a
          distribute of where each team is likely to finish in the final league
          table.
        </p>
        <h2>Other Ideas</h2>
        <p>
          It would be great to incorporate goals into the model. Right now the
          model has no concept of a margin of victory. More seasons of data
          could also be used to train the model. At the beginning of the season,
          the model looks too much like a table of the clubs market value.
        </p>
        <h2 className="">Model Revisions</h2>
        <table className="table">
          <thead>
            <tr>
              <th className="text-lg">Version</th>
              <th className="text-lg">Date</th>
              <th className="text-lg">Changes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.0</td>
              <td>2024-08-16</td>
              <td>Initial Elo-based model</td>
            </tr>
          </tbody>
        </table>
      </article>
    </PageContainer>
  );
}
