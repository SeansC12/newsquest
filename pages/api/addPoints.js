import { query } from "../../lib/db"

export default async function handler(req, res) {
    try {
        const { id } = JSON.parse(req.body);
        const data = await query({ query: "UPDATE users SET points = points + 50 WHERE person_id = ?;", values: [id] })
        res.status(200).json({ message: "200 OK", data: data[0] })
    } catch (err) {
        res.status(500).json({ message: "500 BAD" });
        throw Error(err);
    }
}