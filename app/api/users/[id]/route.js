import User from "@models/user";
import { connectDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const userFound = await User.findById(params.id);
    if (!userFound)
      return new Response("No user found with that id", { status: 404 });
    return new Response(JSON.stringify(userFound), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
