/* export type InteractionModel = {

} */
export type InteractionsModel = {
  _id?: string;
  totalMen: number;
  totalWomen: number;
  totalGroups: number;
};

export interface InteractionsRes extends Omit<InteractionsModel, '_id'> {
  __typename?: string;
}

export type GetInteractionsByDayRes = {
  _id: string;
  interactions: InteractionsRes;
};

export type GetInteractionsByDayQuery = {
  getInteractionsByDay: GetInteractionsByDayRes;
};

export type GetInteractionsByDayRequest = {
  input: {
    startDate: string;
    endDate: string;
  };
};
