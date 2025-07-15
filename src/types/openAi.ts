export interface OpenAiResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  instructions: string;
  status: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  };
  output_text: string;
}
