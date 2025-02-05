import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Build an image URL builder instance using the Sanity client
const builder = imageUrlBuilder(client);

// Generate the image URL from a Sanity image source
export const imageUrl = (source: SanityImageSource) => {
  return builder.image(source);
};


// import { client } from '@/sanity/lib/client';
// import imageUrlBuilder from '@sanity/image-url';
// import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// const builder = imageUrlBuilder(client);

// export const imageUrl = (source: SanityImageSource) => {
//   return builder.image(source);
// };