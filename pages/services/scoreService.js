import Score from "../../app/models/Score";

export const getHighestScoresWithUserDetails = async () => {
  try {
    const scores = await Score.aggregate([
      {
        $sort: { score: -1 },
      },
      {
        $group: {
          _id: "$userId",
          highestScore: {
            $max: "$score",
          },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $project: {
          _id: {
            $toObjectId: "$_id",
          },
          highestScore: "$highestScore",
          createdAt: "$createdAt",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: "$_id",
          highestScore: "$highestScore",
          username: "$user.name",
          usercolor: "$user.usercolor",
          createdAt: "$createdAt",
        },
      },
    ]);
    return scores;
  } catch (error) {
    console.error("Error fetching scores:", error);
    throw new Error("Error fetching scores");
  }
};
