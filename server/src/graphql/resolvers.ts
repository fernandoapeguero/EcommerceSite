import { listings } from "../../listing";

export const resolvers = {
  Query: {
    listings: () => listings,
  },
  Mutation: {
    deleteListing: (_root: undefined, { id }: { id: string }) => {
      for (let i = 0; i < listings.length; i++) {
        if (listings[i].id === id) {
          return listings.splice(i, 1)[0];
        }
      }

      throw new Error("failed to delete listing item. ");
    },
  },
};
