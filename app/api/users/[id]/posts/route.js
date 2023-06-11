import Prompt from "@models/prompt"
import { connectDB } from "@utils/database"

export const GET = async (req,{params}) => {
try {
    await connectDB()
    const resp = await Prompt.find({creator:params.id}).populate("creator")
    return new Response(JSON.stringify(resp),{status:200})
} catch (error) {
    console.error(error)
    return new Response(JSON.stringify(error),{status:500})
}
}