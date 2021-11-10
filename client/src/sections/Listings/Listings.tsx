import React, { useState } from "react";
import { server } from "../../lib";
import { ListingData } from "./types";

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
interface PropsInterface {
  title: string;
}

export const Listings = ({ title }: PropsInterface) => {
  const [listing, setListing] = useState([]);

  const fetchListings = async () => {
    console.log();

    const response = await server.fetch<ListingData>({ query: LISTINGS });

    console.log(response);
  };

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>QueryListings!</button>
    </div>
  );
};
