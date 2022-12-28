// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { configuration } from "../utils/constants";
import { OpenAIApi } from "openai";

type Data = {
  result: any;
};

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { input } = req.body;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `You are a marketing expert, and a customer approaches you to write a short and exiciting marketing copy for him or her. This is the topic they would like a marketing copy on the topic of ${input}. This is the short marketing copy you came up with:`,
    max_tokens: 40,
    temperature: 0.8,
    // top_p: 1,
    // n: 1,
    // stream: false,
    // logprobs: null,
    // stop: "\n",
  });

  const suggestion = response.data?.choices?.[0].text;

  if (suggestion === undefined) {
    throw new Error("No suggestion found");
  }

  res.status(200).json({ result: suggestion });
}
