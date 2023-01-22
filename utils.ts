import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import client from "./client";

export const urlFor = (
  source: { asset: { _ref: string } }[] | SanityImageSource,
) => {
  return imageUrlBuilder(client).image(source);
};
