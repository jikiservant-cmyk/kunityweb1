'use server';
/**
 * @fileOverview A SACCO Financial Advisor AI agent.
 *
 * - aiFinancialAdvisor - A function that handles financial inquiries for SACCO members.
 * - AiFinancialAdvisorInput - The input type for the aiFinancialAdvisor function.
 * - AiFinancialAdvisorOutput - The return type for the aiFinancialAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiFinancialAdvisorInputSchema = z.object({
  question: z.string().describe("The member's question about savings, loans, or financial strategies."),
});
export type AiFinancialAdvisorInput = z.infer<typeof AiFinancialAdvisorInputSchema>;

const AiFinancialAdvisorOutputSchema = z.object({
  explanation: z.string().describe("A comprehensive financial explanation or summary tailored to cooperative banking principles."),
  verses: z.array(z.object({
    reference: z.string().describe("A short summary or title of the financial principle."),
    text: z.string().describe("Detailed advice or steps related to the principle."),
  })).describe("An array of specific financial tips or strategies."),
});
export type AiFinancialAdvisorOutput = z.infer<typeof AiFinancialAdvisorOutputSchema>;

export async function aiScriptureFinder(input: AiFinancialAdvisorInput): Promise<AiFinancialAdvisorOutput> {
  return aiFinancialAdvisorFlow(input);
}

const aiFinancialAdvisorPrompt = ai.definePrompt({
  name: 'aiFinancialAdvisorPrompt',
  input: {schema: AiFinancialAdvisorInputSchema},
  output: {schema: AiFinancialAdvisorOutputSchema},
  prompt: `You are an expert SACCO Financial Advisor. Your task is to provide members with professional, encouraging, and clear financial advice based on cooperative banking principles.

Your goal is to help members build wealth, understand loan products, and develop healthy saving habits within the context of a SACCO (Savings and Credit Co-operative).

Question: {{{question}}}`,
});

const aiFinancialAdvisorFlow = ai.defineFlow(
  {
    name: 'aiFinancialAdvisorFlow',
    inputSchema: AiFinancialAdvisorInputSchema,
    outputSchema: AiFinancialAdvisorOutputSchema,
  },
  async (input) => {
    const {output} = await aiFinancialAdvisorPrompt(input);
    return output!;
  }
);
