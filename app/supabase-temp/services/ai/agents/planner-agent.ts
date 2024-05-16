import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { AIMessageChunk } from '@langchain/core/messages'
import { GraphState } from '@static/types'

class PlannerAgent {
    private model = new ChatOpenAI({
        maxTokens: 25000,
        temperature: 0.1,
    })

    private template = `
### CONTEXT

For the following task think logically and sequentially, generate a plan by breaking the task into smaller sub-tasks. Each sub-task is it's own plan. Make plans that can solve the problem step by step. For each step in the plan, indicate
which external tool together with tool input to retrieve evidence. You will store the evidence into a
variable #E that can be called by later tools. (Plan, #E1, Plan, #E2, Plan, ...)

Tools can be one of the following:
(1) Google[input]: Worker that searches results from Google. Useful when you need to find short
and succinct answers about a specific topic. The input should be a search query.
(2) LLM[input]: A pre-trained LLM like yourself. Useful when you need to act with general
world knowledge and common sense. Prioritize it when you are confident in solving the problem
yourself. Input can be any instruction.

### EXAMPLES

For example,
Task: Thomas, Toby, and Rebecca worked a total of 157 hours in one week. Thomas worked x
hours. Toby worked 10 hours less than twice what Thomas worked, and Rebecca worked 8 hours
less than Toby. How many hours did Rebecca work?
Plan: Given Thomas worked x hours, translate the problem into algebraic expressions and solve
with Wolfram Alpha. #E1 = WolframAlpha[Solve x + (2x - 10) + ((2x - 10) - 8) = 157]
Plan: Find out the number of hours Thomas worked. #E2 = LLM[What is x, given #E1]
Plan: Calculate the number of hours Rebecca worked. #E3 = Calculator[(2 * #E2 - 10) - 8]

Begin!
Describe your plans with rich details. Each Plan should be followed by only one #E.

Task: {task}`

    private promptTemplate = ChatPromptTemplate.fromMessages([['human', this.template]])
    public instance = this.promptTemplate.pipe(this.model)

    constructor() {}

    public async plan(task: string): Promise<AIMessageChunk> {
        return this.instance.invoke({ task })
    }

    private regexPattern = new RegExp(
        'Plan\\s*\\d*:\\s*([^#]+)\\s*(#E\\d+)\\s*=\\s*(\\w+)\\s*\\[([^\\]]+)\\]',
        'g',
    )

    /**
     * @param {GraphState} state The current state of the graph.
     * @param {RunnableConfig | undefined} config The configuration object for tracing.
     */
    public getPlan = async (state: GraphState) => {
        console.log('---GET PLAN---')
        const task = state.task
        const result = await this.plan(task)
        // Find all matches in the sample text.
        const matches = (result.content as string).matchAll(this.regexPattern)
        let steps: Array<string[]> = []
        for (const match of matches) {
            const item = [match[1], match[2], match[3], match[4], match[0]]
            if (item.some((i) => i === undefined)) {
                throw new Error('Invalid match')
            }
            steps.push(item)
        }
        return {
            steps,
            planString: result.content,
        }
    }
}

export default PlannerAgent
