
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);
export async function huggingAi(message) {
    try {
        return await client.chatCompletion({
            model: "openai/gpt-oss-120b:fastest",
            messages: message
        });
    } catch (error) {
        throw new Error(error?.message || 'some error in myGPT funtion in server');
    }
}
