export type CommandmentDetail = {
  _id: string;
  name: string;
  description: string;
};

export type GetCommandmentsResponse = {
  getCommandments: CommandmentDetail[];
};
