// import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId } from '../env'

// export const client = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
//   stega: {
//     studioUrl: process.env.VERCEL_URL
//     ? `https://studio-${process.env.VERCEL_URL}.vercel.app`
//     : `${process.env.NEXT_PUBLIC_BASE_URL= "http://localhost:3000" }/studio`
//   }
// })

import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: {
    studioUrl: process.env.VERCEL_URL
      ? `https://studio-${process.env.VERCEL_URL}.vercel.app`
      : `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/studio`
  }
});
