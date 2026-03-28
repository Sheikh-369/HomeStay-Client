// /**
//  * Image Hosts Configuration (add your image hosts here)
//  */

// export const imageHosts = [
//     {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//     },
//     {
//         protocol: 'https',
//         hostname: 'images.pexels.com',
//     },
//     {
//         protocol: 'https',
//         hostname: 'images.pixabay.com',
//     },
//     {
//         protocol: 'https',
//         hostname: 'img.rocket.new',
//     },
// ];


// image-hosts.config.ts
import { RemotePattern } from 'next/dist/shared/lib/image-config';

export const imageHosts: RemotePattern[] = [
  {
    protocol: 'https',
    hostname: 'images.unsplash.com', // Example host
    port: '',
    pathname: '/**',
  },
  // Add your other specific hosts here
];