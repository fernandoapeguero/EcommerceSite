import { ObjectId, Collection } from "mongodb";

export interface Listing {
  _id: ObjectId;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfBaths: number;
  numOfGuests: number;
  numOfBeds: number;
  rating: number;
}

export interface Database {
  listings: Collection<Listing>;
}

// ----
