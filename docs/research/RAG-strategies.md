# RAG Strategies

## Optimization Strategies

### 1. **Better Parser**:

- **Problem**: The current parsers are slow, inefficient, and produce a lot of noise.
- ****Solution****: Use a more efficient parser like `spaCy`, `transformers`, `LLamaCrawl`, or `FireCrawl`. for parsing the documents.

### 2. **Chunk Size**:

- **Problem**: Chunk size is important to prevent lots of noise (chunk size too large), stay within the LLM context window (chunk size too large), and to ensure that the chunks are relevant and are low-noise.
- **Problem**: Lost in the middle problem: If the chunk size is too small, the context is lost. If the chunk size is too large, the context is lost. LLM's typically only retain context for the beginning and end of a chunk. The context in the middle is lost. gpt-4-turbo begins to lose context around 70k tokens. If the context is too small, however the retrieved information does not have enough relevance for contextual awareness.
  - Small Chunk: More granular, More diverse sources, but less/incomplete context.
  - Big Chunk: Less granular, Less diverse sources, lost in the middle problem.
- ****Solutions****: Different document types have a different optimal chunk size. The optimal chunk size can be determined by evaluating the average response time, average faithfulness, and average relevancy for different chunk sizes.
  - Evaluate the optimal chunk size for different document types specific to the application domain.
    - Chunk Size, Average Response time, Average Faithfulness, Average Relevancy
  - Routing RAG pipeline to different chunk sizes based on the document type.
    - Check the file descriptor for the document type and route the document to the appropriate chunk size and parser.

### 3. **Re-Ranking**:

- **Problem**: Most RAG pipelines have an issue with filtering out the noise and irrelevant information from a query, as well as determining relevancy. Traditional VectorDBs will return (top_k=25) a list of the most relevant chunks, but the chunks will not be listed by relevance and will have a mixed level of relevancy.
- ****Solutions****:
  - Re-ranking: The chunks can be ranked based on the relevancy. The re-ranking can be done using a neural network, a transformer, or a BERT model. The re-ranking can be done on the top_k chunks returned by the VectorDB to get the top_n most relevant chunks.
  - Hybrid Search: Do both a Vector Search and a Keyword Search on the VectorDB. The results are combined together and re-ranked based on the relevancy.

### 4. **Agentic RAG**:

- **Problem**: The current RAG pipeline is passive and does not have the ability to ask clarifying questions, ask for more information, there is no feedback or long-term memory system and there is no agency to the pipeline. This causes a very rigid response model without the ability to handle diverse queries or tasks. Improving the RAG quality with self-check and chain-of-thought reasoning. Allowing the Agentic RAG model to determine the most optimal RAG pipeline for the given query.
- ****Solutions****:
  - Query Translation/Planning: Step-Back prompting - whereby the pipeline takes in an initial query that is then summarized and abstracted into a more general query. The abstracted query is then sent to the VectorDB, the response is then passed into a ReasoningAgent that determines the final answer relative to the initial query and the initial response.
    - Example: Initial Query: "Albert Einstein went to which school between 1895 and 1900?" -> AbstractionAgent: "What is Albert Einsteins education history" -> Initial Response from VectorDB: "[... List of education history with dates]" -> ReasoningAgent: "Albert Einstein went to ETH Zurich in 1895-1900."
      - Essentially, get an agent(s) to modify the initial question so that it is more vector retrieval friendly.
      - Get the Abstraction agent to break down the initial question into a more general structure such as sub-queries.
        - Merge the result of the sub-queries to generate the prompt for the ReasoningAgent to get the final answer.
  - MetaData Filter / Routing:
    - Use an Agent to generate metadata tag from the initial query. The metadata tag can be used to construct a VectorDB query that is more relevant to the initial query.
      - Example: Initial Query: "Best burger in Australia" -> MetadataAgent: "{"country": "Australia"}" -> VectorDB Query: "City Guides for specific cities in Australia" -> VectorDB Response: "List of best burgers in Sydney, Melbourne, Brisbane, etc."
      - Essentially, get an agent(s) to modify the initial question so that it contains metadata tags that can be used to construct relational queries on the database. Thus improving the speed and relevancy of the response but preventing erroneous queries.
  - Corrective RAG Agent:
    - Self reflective retrieval: The initial query is processed through a RAG pipeline, then the resulting chunks are passed to an LLM agent to determine the relevancy of the chunks to the initial query. The LLM agent can then generate a corrective query that can be used to re-rank the chunks.
      - If the LLM agent determines that the chunks are correct, it goes through a knowledge refinement process using decompose, filter, and recompose to generate a more accurate response.
      - If the LLM agent determines that the chunks are incorrect, the Agent uses a Knowledge Search process to rewrite the query using Abstraction and summarization, then a web-search is performed to get the correct answer. Using above strategies to determine the ideal selected chunk.
      - Example: Initial Query: "What is the capital of Australia?" -> RAG Pipeline: "Sydney is the capital of Australia." -> Corrective LLM Agent: "Sydney is not the capital of Australia, Canberra is the capital of Australia." -> Corrective Query: "capital Australia" -> WebSearch: "Results from web" -> Re-Ranking Web Results: "Rank top_n results" -> RAG Pipeline: "Canberra is the capital of Australia."
      - Essentially, get an agent(s) to modify the initial question so that it contains corrective queries that can be used to re-rank the chunks.
