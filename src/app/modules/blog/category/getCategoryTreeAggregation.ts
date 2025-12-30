export const categoryTreeAggregation = (
  searchTerm?: string,
  status?: string,
) => {
  const matchStage: any = {
    deletedAt: null,
  };

  if (status) {
    matchStage.status = status;
  }

  if (searchTerm) {
    matchStage.$or = [
      { name: { $regex: searchTerm, $options: "i" } },
      { slug: { $regex: searchTerm, $options: "i" } },
    ];
  }

  return [
    { $match: matchStage },

    // Self lookup for children
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "parentId",
        as: "children",
      },
    },

    // Only root categories
    {
      $match: {
        parentId: null,
      },
    },

    // Sort like WordPress (system last optional)
    {
      $sort: {
        isSystem: 1,
        name: 1,
      },
    },
  ];
};
