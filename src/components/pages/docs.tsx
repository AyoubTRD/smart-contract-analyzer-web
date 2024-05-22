export function Docs() {
  return (
    <div>
      <h1 className="font-bold text-3xl mb-6">
        Smart Contract Vulnerability Detection: Model Comparison
      </h1>
      <p>
        This document compares the performance of two machine learning models,
        Convolutional Neural Network (CNN) and Bidirectional Long Short-Term
        Memory (BLSTM), in predicting vulnerabilities within smart contracts.
      </p>

      <h2 className="font-bold mt-6 mb-4 text-xl">Model Performance</h2>

      <p>The following table summarizes the accuracy of each model:</p>

      <table>
        <tr>
          <th>Model</th>
          <th>Accuracy</th>
          <th>Data Source</th>
        </tr>
        <tr>
          <td>CNN</td>
          <td>0.44</td>
          <td>Bytecode</td>
        </tr>
        <tr>
          <td>BLSTM</td>
          <td>0.50</td>
          <td>Source Code</td>
        </tr>
      </table>

      <p>
        As shown in the table, BLSTM achieves a higher accuracy (50%) compared
        to CNN (44%) in identifying vulnerabilities.
      </p>

      <h2>Accuracy Visualization</h2>

      <p>
        The following graph illustrates the accuracy comparison between the
        models visually.
      </p>

      <img src="placeholder.png" alt="Accuracy Comparison - CNN vs. BLSTM" />

      <h2>Error Analysis</h2>

      <p>
        It's important to consider not just accuracy but also the types of
        errors each model makes. Here's a breakdown of potential errors:
      </p>

      <ul>
        <li>
          <b>False Positives:</b> The model identifies a vulnerability where
          none exists (predicts a vulnerability but the contract is actually
          safe).
        </li>
        <li>
          <b>False Negatives:</b> The model misses a real vulnerability
          (predicts no vulnerability but the contract has one).
        </li>
      </ul>

      <p>
        While specific data on false positives and negatives isn't provided,
        understanding these errors is crucial. Generally, BLSTM models might
        have a lower rate of false positives due to their ability to analyze the
        context within source code. However, both models can potentially miss
        vulnerabilities due to factors like limited training data or complex
        vulnerabilities.
      </p>

      <h2>Conclusion</h2>

      <p>
        BLSTM demonstrates a higher overall accuracy compared to CNN for smart
        contract vulnerability detection. However, it's essential to consider
        the trade-off between accuracy and error types (false positives and
        negatives) when choosing a model. Additionally, BLSTM's reliance on
        source code availability might not be feasible in all scenarios.
      </p>

      <p>
        Further research and exploration of other models or hybrid approaches
        might be necessary to achieve a balance between accuracy and error
        reduction.
      </p>
    </div>
  );
}
