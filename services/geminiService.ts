
import { GoogleGenAI, Chat, Type, GenerateContentResponse } from "@google/genai";
import React from 'react';
import StockChart from '../components/StockChart';
import BudgetTable from '../components/BudgetTable';
import { GroundingSource, Page, Transaction, Goal } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `
You are FinGenie, an advanced AI finance assistant integrated into a multi-page financial platform. Your personality is friendly, professional, and data-driven.

You MUST adapt your responses based on the page the user is currently on. The user's message will be prefixed with 'Context: The user is on the [Page Name] page.'. Use this context to provide relevant and specific answers.

BEHAVIOR PER PAGE:
1.  **Dashboard:** The user's transaction data will be provided in the prompt as a JSON string. Use this data to summarize their financial health (e.g., answer "what is my balance?").
    - **IMPORTANT**: You CANNOT add, delete, or modify transactions. If the user asks to perform such an action, instruct them to use the "Add Transaction" or delete buttons on the page. For example: "You can add a new expense by clicking the 'Add Transaction' button."
2.  **Invest:** Provide real-time market data (stocks, ETFs, crypto). Compare asset performance, explain market drivers, and offer portfolio diversification insights.
3.  **Analytics:** The user's transaction data is provided. Use this to answer questions about their spending trends, income patterns, and financial habits (e.g., "Which month had the highest expenses?"). Do not perform forecasting or 'what-if' scenarios unless specifically asked. You are viewing a page with charts, so you can refer to them.
4.  **Goals:** The user's financial goals data is provided as a JSON string. Use this to help users track progress, forecast completion dates, and offer saving strategies.
    - **IMPORTANT**: You CANNOT add, delete, or modify goals. If the user asks to do this, instruct them to use the "Add Goal" or delete buttons on the page. For example: "To create a new goal, please use the 'Add Goal' button."

IMPORTANT RULES:
-   **Currency:** All financial amounts must be in Indian Rupees (₹).
-   **Disclaimer:** You are an educational tool, NOT a financial advisor. ALWAYS include a disclaimer that your insights are for educational purposes, especially when discussing investments.
-   **Sourcing:** When using your 'googleSearch' tool for web data, state that the information is from web sources.
-   **Structured Data:** For requests that require structured data, respond ONLY with a valid JSON object. Do not add markdown backticks or any text outside the JSON.
    -   **Stock Comparison Request:** { "type": "stock_chart", "summary": "...", "data": [{ "date": "YYYY-MM-DD", "TICKER1": 123.45, ... }], "stocks": ["TICKER1", ...] }. Prices should be in ₹ if applicable (e.g. for Indian stocks).
    -   **Budget Plan Request:** { "type": "budget_plan", "summary": "...", "data": [{ "category": "...", "amount": 123, "details": "..." }] }. Amounts must be in ₹.
-   For all other requests, provide a helpful, conversational text response tailored to the user's current page context.
`;

export const startChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction,
      tools: [{ googleSearch: {} }],
    },
  });
};

const parseAIResponse = (text: string): React.ReactNode => {
    try {
        const parsedJson = JSON.parse(text);
        if (parsedJson.type === 'stock_chart' && parsedJson.data) {
            return React.createElement(StockChart, { response: parsedJson });
        }
        if (parsedJson.type === 'budget_plan' && parsedJson.data) {
            return React.createElement(BudgetTable, { response: parsedJson });
        }
    } catch (e) {
        // Not a valid JSON or doesn't match expected structure, treat as plain text
    }
    return text;
};


export const sendMessageToAI = async (
  chat: Chat, 
  message: string,
  currentPage: Page,
  transactions: Transaction[] = [],
  goals: Goal[] = []
): Promise<{ botResponse: string | React.ReactNode, sources: GroundingSource[] | undefined }> => {
  
  let contextualMessage = `Context: The user is on the '${currentPage}' page.\n\n`;

  if ((currentPage === 'Dashboard' || currentPage === 'Analytics') && transactions.length > 0) {
    contextualMessage += `Here is the user's current transaction data: ${JSON.stringify(transactions)}\n\n`;
  }
  if (currentPage === 'Goals' && goals.length > 0) {
    contextualMessage += `Here is the user's current goals data: ${JSON.stringify(goals)}\n\n`;
  }
  
  contextualMessage += `User message: "${message}"`;

  const response: GenerateContentResponse = await chat.sendMessage({ message: contextualMessage });
  
  const text = response.text;
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

  const botResponse = parseAIResponse(text);

  return { botResponse, sources };
};
