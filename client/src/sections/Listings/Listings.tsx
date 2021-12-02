import React from "react";
import { useQuery, useMutation } from "../../lib";
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

const DELETE_LISTING = `

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
  const { data, loading, error, refetch } = useQuery<ListingData>(LISTINGS);
  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    // delte a listing from the graphql server
    await deleteListing({ id });

    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <ul>
      {listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button onClick={() => handleDeleteListing(listing.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  if (loading) {
    return <h2>Loading Data....</h2>;
  }

  if (error) {
    return <h2>Uh oh! something when wrong - please try again later.</h2>;
  }

  const deleteListingLoadingMessae = deleteListingLoading ? (
    <h4>Deletin in progress...</h4>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h4>
      Uh oh! Something wen wrong with deleting - please try again later :(
    </h4>
  ) : null;

  return (
    <div>
      <h2>Listing</h2>
      {listingsList}
      {deleteListingLoadingMessae}
      {deleteListingErrorMessage}
    </div>
  );
};
