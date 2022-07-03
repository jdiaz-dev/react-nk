export type TicketCategoriesDetail = {
  name: string;
  description: string;
};

export type TicketCategoriesResponse = {
  getTicketCategories: TicketCategoriesDetail[];
};
