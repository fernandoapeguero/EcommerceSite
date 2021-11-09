import React, { useState } from "react";
import { server } from "../../lib";

const LISTINGS = `
  query Listings {
     listings {
       id
       title
       price
       address
     }
  }
`;
interface PropsInterface {
  title: string;
}

export const Listings = ({ title }: PropsInterface) => {
  const [listing, setListing] = useState([]);

  const fetchListings = async () => {
    console.log("Here!");

    const response = await server.fetch({ query: LISTINGS });

    console.log(response);
  };

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>QueryListings!</button>
    </div>
  );
};
