import React, { useState, useEffect } from "react";
import { server } from "../../lib";
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
  const [listings, setListings] = useState<Listing[] | null>(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    console.log();

    const { data } = await server.fetch<ListingData>({ query: LISTINGS });

    setListings(data.listings);
  };

  const deleteListing = async (id: string) => {
    // delte a listing from the graphql server
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETELISTING,
      variables: {
        id,
      },
    });

    fetchListings();
  };

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
