import User from '../../../../models/User';
import { connect } from '../../../../mongoose';

export const POST = async (req) => {
    try {
        await connect();
        const data = await req.json();
        const user = await User.findOne({ username: data.username });

        return new Response(JSON.stringify(user), {status:200})
    } catch (error) {
        return new Response(JSON.stringify({ error: "User not found" }), {status:404})
    }
}