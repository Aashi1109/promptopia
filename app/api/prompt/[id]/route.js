import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    await connectDB();
    const resp = await Prompt.findById(id).populate("creator");
    if (!resp)
      return new Response("Prompt not found with that id", { status: 404 });
    return new Response(JSON.stringify(resp), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { id } = params;
  const { prompt, tag } = await req.json();
  try {
    await connectDB();
    const foundPrompt = await Prompt.findById(id).populate("creator");
    if (!foundPrompt)
      return new Response("Prompt not found with that id", { status: 404 });

    foundPrompt.prompt = prompt;
    foundPrompt.tag = tag;
    await foundPrompt.save();

    return new Response(JSON.stringify(foundPrompt), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await connectDB();
    await Prompt.findByIdAndRemove(id);
    return new Response("Prompt Deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error in deleting tag", { status: 400 });
  }
};
