import { Model, PipelineStage } from "mongoose";
import { Pipe } from "stream";

const PaginationHandler = async (
  pageNumber: number,
  pageSize: number,
  otherStages: PipelineStage[],
  Model: Model<any>
) => {
  const skip = pageNumber * pageSize;

  const facet = {
    $facet: {
      content: [{ $skip: skip }, { $limit: pageSize }],
      total: [{ $count: "count" }],
    },
  };

  const stages = [...otherStages, ...[facet]];

  const insights = await Model.aggregate(stages);
  const content = insights[0].content;
  const totalDocs = insights[0].total.length ? insights[0].total[0].count : 0;
  const totalPages = Math.ceil(totalDocs / pageSize);

  const response = {
    content: content,
    totalPages: totalPages,
    totalElements: totalDocs,
    last: pageNumber >= totalPages - 1,
    size: pageSize,
    number: pageNumber,
    numberOfElements: content.length,
    first: pageNumber === 0,
    empty: content.length === 0,
  };

  return response;
};

export default PaginationHandler;
