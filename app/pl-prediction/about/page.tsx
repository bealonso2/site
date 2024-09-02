"use client";
import PageContainerArticle from "@/components/layout/PageContainerArticle";
import TOC from "@/components/layout/TOC/TableOfContents";
import useTOCHeadings from "@/components/layout/TOC/useTOCHeadings";
import Equation from "@/components/pl-prediction/Equation";

export default function About() {
  const headings = useTOCHeadings();
  
  return (
    <PageContainerArticle>
        <h1>About Premier League Prediction</h1>
        <p>
          This is a web app that forecasts the final standings of the English
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
        <TOC headings={headings} />
        <h2>Model</h2>
        <h3>Methodology</h3>
        <p>
          The model uses an Elo-based system to predict the final league
          standings. The Elo rating system is a method for calculating the
          relative skill levels of players in two-player games such as chess. In
          this case, the Elo rating system is used to measure the relative
          strength of each Premier League club and uses this information to
          assess how likely a result is in a given match.
        </p>
        <h4>Elo Calculation</h4>

        <p>
          Before the season, each club is assigned an Elo rating based on their
          performance in the previous season. The Elo ratings of all clubs are
          adjusted based on club value.
        </p>
        <p>
          Newly promoted teams receive the maximum Elo of the relegated teams.
          These values are then adjusted based on club value.
        </p>
        <p>
          Clubs retain 50% of their Elo rating from the previous season. This
          attempts to implicitly factor out the adjustment for club value in the
          previous season. <code>1500</code> is the average Elo rating in this
          model.
        </p>
        <Equation text={"\\text{Elo}_\\text{base} = \\text{Elo}_\\text{previous season} \\times \\frac{1}{2} + 1500 \\times \\frac{1}{2}"} />
        <p>
          Club values are then used to adjust the Elo rating. The club value
          adjustment is normalized for each club based on the maximum and
          minimum club values. As the best and richest teams win more often, the
          normalized club values are exponentially adjusted. Club values are
          factored into the Elo rating as follows:
        </p>
        <Equation text={"\\text{Elo}_\\text{adjusted} = \\text{Elo}_\\text{base} + 300 \\times \\text{Normalized Exponential Club Value}"}/>
        <p>
          The adjustment factor is currently set to 300, meaning the best clubs
          get a 300 point bump to their Elo rating.
        </p>
        <h4>Elo Updates</h4>
        <p>
          As the season progresses, the Elo rating of each club is updated based
          on the outcome of each match. The model uses the following formulas to
          calculate Elo rating for each match:
        </p>
        <h5 className="font-semibold">Win/Lose</h5>
        <Equation text={"\\text{Expected Win} = 1 \\div \\left(1 + 10^{\\frac{\\text{Loser Elo} - \\text{Winner Elo}}{400}}\\right)"} />
        {/* <Equation text={"\\;\\;"} /> */}
        <Equation text={"\\text{Change in Winner Elo} = K \\times (1 - \\text{Expected Win})"} />
        <Equation text={"\\text{Change in Loser Elo} = - \\text{Change in Winner Elo}"} />
        <h5 className="font-semibold">Draw</h5>
        <Equation text={"\\text{Expected Home Win} = 1 \\div \\left(1 + 10^{\\frac{\\text{Away Elo} - \\text{Home Elo}}{400}}\\right)"} />
        <Equation text={"\\text{Change in Home Elo} = K \\times (0.5 - \\text{Expected Home Win})"} />
        <Equation text={"\\text{Change in Away Elo} = - \\text{Change in Home Elo}"} />
        <h5 className="font-semibold">Decay</h5>
        <p>
          The Elo rating of each club has a half-life of 1/4 of the season. This
          ensures that the most recent matches have the most impact on a
          team&apos;s Elo rating.
        </p>
        <Equation text={"\\text{Decay Factor} = 0.5^{\\frac{1}{38 \\div 4}}"} />
        <Equation text={"\\text{Elo}_{\\text{decayed}} = \\text{Elo} \\times \\text{Decay Factor} + 1500 \\times (1 - \\text{Decay Factor})"} />
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
    </PageContainerArticle>
  );
}
