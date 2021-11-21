import React from "react";
import { server, useQuery } from "../../lib";
import {
  ListingData,
  Listing,
  DeleteListingData,
  DeleteListingVariables,
} from "./types";

const LISTINGS = `
  query Listings {
     listings {
       id
       title
       price
       address
       numOfGuests
       numOfBeds
       numOfBaths
       rating
     }
  }
`;

const DELETELISTING = `

  mutation DeleteListing($id: ID!) {

    deleteListing(id: $id) {
      id
    }
  }

`;
interface PropsInterface {
  title: string;
}

export const Listings = ({ title }: PropsInterface) => {
  const { data } = useQuery<ListingData>(LISTINGS);

  const deleteListing = async (id: string) => {
    // delte a listing from the graphql server
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETELISTING,
      variables: {
        id,
      },
    });
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <ul>
      {listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button onClick={() => deleteListing(listing.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  ) : null;

  return (
    <div>
      <h2>Listing</h2>
      {listingsList}
    </div>
  );
};
