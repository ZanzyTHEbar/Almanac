# Costs for the project

LLM cost is not a fixed price. It is important to do a bootstrap calculation to understand the costs of the project and breakeven per user.

Cost vs Performance

## Average Use Calculation

## Costs for Infrastructure

## Costs for offering a Free Trial

LLM + Services + Infrastructure hosting = Total Costs

Example:

LLM: $0.006
Services: $0.12
Infrastructure hosting: $0.02

1000 signup, 1% conversion to paid
total cost: $0.146 \* 1000 = $146

Break even: >$14.6 / per user

## How to reduce Costs

-   Choose the right model to use per task, and ensure that the model is not overkill for the task.
-   Reduce the token size to reduce the cost of the model per query.

### Strategies to reduce costs

#### Switch the Model

1. Use a powerful model to launch the product. Collect data and then fine-tune a smaller model on this data to reduce costs.
    - GPT 32K -> Save results -> Fine-tune (Mixtral, llama3, llama2, or other - run in groq or other provider).
    - This method can achieve up-to 92% reduction in costs.
    - Requires mechanism to save all generated results and provide a way for the user to mark the results as correct or incorrect.
    - Only works for scenarios with very specialized tasks.
2. LLM Cascade: Use a smaller model to try and answer the question first. If the smaller model fails, then use progressively larger model until the answer is achieved.
    - Use the confidence score is less than 0.5, then use the next larger model, if the confidence score is less than 0.9, then use the next larger model.
    - Only use GPT4 for very complicated questions.
    - This method can achieve up-to 50% reduction in costs.
    - Requires a mechanism to detect when the smaller model fails.
    - Only works for scenarios where the smaller model can answer the question with a high degree of accuracy.
3. LLM Router: Auto-choosing suitable model based on task.
    - Use a smaller model to do the classification of whether it is a simple or complicated task - with a confidence score.
    - Use the returned score to determine which model to use for the query.
    - Can be used with a Mixture of Experts Architecture - where specialized requests can go to specific models.
        - Example: "28^23+29" -> MathGPT, "What is the capital of France?" -> Mixtral, "Analyze the csv file and produce a trends graph over n days." -> GPT4
        - HuggingGPT - use LLM as a controller. The LLM first plans a list of tasks that need to be executed to achieve the goal based on the query. Then, the LLM assigns each task to a specialized model to execute the task. After execution, the LLM combines the results to produce the final result.
        - Break down user request into sub-tasks, delegate each sub-task to a specialized model, and then combine the results.
        - {"task": "summarize", "id": 0, "dep": [-1], "model": "llama3", "args": { "text": "<resource-1>"}}
    - Companies offering a _router as as service_ - Martin Router, NeutrinoAI
    - Use a smaller model for simple tasks, and a larger model for more complicated tasks.
    - This method can achieve up-to 30% reduction in costs.
    - Requires a mechanism to detect the complexity of the task.
    - Only works for scenarios where the complexity of the task can be determined.
4. LLM Cache With Router: The same as the above router, however when a task is successfully completed, the result is stored in a cache/db. Then, when a new question comes in a RAG-like pipeline will perform re-ranking to use the results in the db as an example of how a similar problem was solved before. This example is added to the new user query and sent to the small model first. Removing the need to use a larger model the next-time a similar question is asked.
    - This method can achieve up-to 20% reduction in costs.
    - Requires a mechanism to store the results and a mechanism to re-rank the results.
    - Only works for scenarios where the same question is asked multiple times.

#### Reduce Token Usage

1. LLMLingua: Reduce noise and redundant token usage.
    - Natural language is highly redundant, pre-process the text to remove redundant tokens and summarize/abstract the text for core meaning.
    - Use a small model to remove the unnecessary tokens and derive core meaning.
        - Use small model to extract relevant information from the text. Then, use a larger model to generate the answer.
    - Can be used for Chain of Thought Prompting.
    - Can reduce the token usage by 175x or more (Ex: 30k to 100).
    - Use this to optimize streaming functions and function calling.
        - Ex: Tool to scrape websites - use a small model to extract the relevant information and generate a summary from the website dump, then pass this on to the rest of the pipeline.
2. Optimize Memory: The longer the memory/context is the more expensive the next token will be. An LLM uses the last context window to generate the next response, exponentially increasing cost per request.
    - Keep track of the max context window of the LLM model being used.
    - Conversation Buffer Memory is where the LLM uses the last n tokens to generate the next response.
        - Eventually this will cause you to hit the token limit of the model, this happens fairly quickly. This also causes the `Lost in the middle problem` problem.
    - An alternative is Conversation Summary Memory.
        - Send the last n responses to a smaller model to generate a summary of the conversation. This summary is then used to generate the next response.
        - Each response can be intelligently summarized to be within the known context window of the main LLM model. Eliminating the cause of hitting a token limit.
        - Downside - the summary may not contain all the context of the conversation, thus some details will be lost.
            - Solution: Implement a Long-Term-Memory Agent that monitors the conversation and stores small chunks of hyper relevant information in a vector database. The LLM can then query this database to get the relevant information back to generate the next response. Utilize this LTM to input relevant context _after_ the summary has been generated. Ensure that the LTM is not used to generate the summary, only to provide context after the summary has been generated. Make sure a final filter through the LLMLingua is done to ensure that the summary is relevant, accurate, and concise.
            - Solution: Implement `Summary Buffer Memory`, the last n responses are kept verbatim, then anything over n is summarized. The summarized responses are then used to generate the next response. This ensures that the context is not lost, but the cost is reduced.
            - Solution Provide a `max_token_limit` to the `ConversationBufferMemory` to ensure that everything is kept within the token limit.
                - Provide an intelligent way to set the `max_token_limit` based on the model being used and the task being performed.

#### Reduce the number of queries

1. Use a more efficient parser like `spaCy`, `transformers`, `LLamaCrawl`, or `FireCrawl` for parsing the documents.
2. Use a more efficient chunk size to prevent lots of noise, stay within the LLM context window, and ensure that the chunks are relevant and are low-noise.
    - Different document types have a different optimal chunk size. The optimal chunk size can be determined by evaluating the average response time, average faithfulness, and average relevancy for different chunk sizes.
    - Evaluate the optimal chunk size for different document types specific to the application domain.
    - Routing RAG pipeline to different chunk sizes based on the document type.
3. Re-ranking: The chunks can be ranked based on the relevancy. The re-ranking can be done using a neural network, a transformer, or a BERT model. The re-ranking can be done on the top_k chunks returned by the VectorDB to get the top_n most relevant chunks.
4. Agentic RAG: Add the ability for the LLM to ask clarifying questions, ask for more information, and provide a feedback mechanism using reflection and/or a long-term memory system. Improving the RAG quality with self-check and chain-of-thought reasoning. Allowing the Agentic RAG model to determine the most optimal RAG pipeline for the given query.

#### Reduce the number of models

1. Fine-tune specific models for specific tasks where possible.
2. Use a Mixture of Experts Architecture - where specialized requests can go to specific models.
3. Limit the scope of the models and number of models to achieve only the necessary tasks that are required by the application domain.

#### Implement Observability

1. LLM Monitoring and Analytics: Implement observability to monitor the costs of the LLM and the infrastructure. The key is knowing where the costs occur so that you can optimize around that.
    - Platforms to monitor usage and costs:
        - AgentOps
        - LangSmith
        - LangFuse
        - Helicone
        - Parea
        - Traceloop
        - OpenAI Threads
