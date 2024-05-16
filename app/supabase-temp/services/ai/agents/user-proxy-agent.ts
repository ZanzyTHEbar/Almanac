import { ChatOpenAI } from '@langchain/openai'

class UserProxyAgent extends ChatOpenAI {
    constructor() {
        super({
            maxTokens: 25000,
            temperature: 0.1,
        })
    }
}

export default UserProxyAgent
