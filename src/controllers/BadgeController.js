import { Badge } from "../models";

export const getBadges = async(req, res) => {
    const user = req.user
    const badges = await Badge.findAll({ where: { userId: user.id } });
    res.send({ data: badges })
}
