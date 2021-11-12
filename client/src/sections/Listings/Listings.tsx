import React, { useState } from "react";
import { server } from "../../lib";
import {
  ListingData,
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
  const fetchListings = async () => {
    console.log();

    const { data } = await server.fetch<ListingData>({ query: LISTINGS });

    console.log(data);
  };

  const deleteListing = async () => {
    // delte a listing from the graphql server
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETELISTING,
      variables: {
        id: "6174d8566237c0e5d4031b59",
      },
    });

    console.log(data);
  };
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>QueryListings!</button>
      <button onClick={deleteListing}>Delete a Listing</button>
    </div>
  );
};
