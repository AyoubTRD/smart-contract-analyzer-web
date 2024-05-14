import { AnalyzerModelDataSource } from "./analyzer-model.datasource";
import { AnalyzerModelModel } from "./models/analyzer-model.model";
export class MockAnalyzerModelDataSource implements AnalyzerModelDataSource {
  async getAvailableModels(): Promise<AnalyzerModelModel[]> {
    return [
      new AnalyzerModelModel(
        "cnn",
        "CNN",
        "A convolutional neural network (CNN) is particularly effective for analyzing visual imagery. It uses a variation of multilayer perceptrons designed to require minimal preprocessing. CNNs are commonly used in image and video recognition, recommender systems, and natural language processing.",
        false,
        true,
      ),
      new AnalyzerModelModel(
        "lstm",
        "LSTM",
        "Long Short-Term Memory (LSTM) is a type of recurrent neural network (RNN) architecture used in the field of deep learning. Unlike standard feedforward neural networks, LSTM has feedback connections. It can process not only single data points, but also entire sequences of data. This makes it suitable for tasks such as time series prediction, speech recognition, and natural language processing.",
        true,
        false,
      ),
      new AnalyzerModelModel(
        "blstm",
        "BLSTM",
        "Bidirectional Long Short-Term Memory (BLSTM) is an extension of the LSTM architecture that allows the network to learn from the input sequence in both forward and backward directions. This enables the model to capture information from past and future states, making it particularly effective for tasks requiring context understanding, such as machine translation, sentiment analysis, and speech recognition.",
        true,
        false,
      ),
    ];
  }

  async getModelById(id: string): Promise<AnalyzerModelModel | null> {
    const models = await this.getAvailableModels();

    return models.find((m) => m.id === id) ?? null;
  }
}
