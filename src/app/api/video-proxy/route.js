// import { NextResponse } from "next/server";

// export async function GET(req) {
//   try {
//     // Get the video filename from the URL query parameters
//     const { searchParams } = new URL(req.url);
//     const video = searchParams.get('video') || 'alka_1_umhnhr';
    
//     // Map of available videos
//     const videoUrls = {
//       'alka_1_umhnhr': 'https://res.cloudinary.com/dyevnylyo/video/upload/v1773349642/alkaMain_kggal0.mp4',
//       'default': 'https://res.cloudinary.com/dyevnylyo/video/upload/v1773349642/alkaMain_kggal0.mp4'
//     };
    
//     const videoUrl = videoUrls[video] || videoUrls.default;
    
//     console.log('Fetching video from:', videoUrl);
    
//     // Fetch the video with proper headers
//     const response = await fetch(videoUrl, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
//         'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8',
//         'Referer': 'https://res.cloudinary.com/'
//       }
//     });
    
//     if (!response.ok) {
//       console.error(`Failed to fetch video: ${response.status} ${response.statusText}`);
//       return new NextResponse(`Video not found: ${response.status}`, { status: 404 });
//     }
    
//     // Get the video data as ArrayBuffer
//     const videoData = await response.arrayBuffer();
    
//     // Get the content type from the response or default to video/mp4
//     const contentType = response.headers.get('content-type') || 'video/mp4';
    
//     console.log('Video fetched successfully, size:', videoData.byteLength, 'bytes');
    
//     // Return the video with proper headers
//     return new NextResponse(videoData, {
//       status: 200,
//       headers: {
//         'Content-Type': contentType,
//         'Content-Length': videoData.byteLength.toString(),
//         'Cache-Control': 'public, max-age=31536000, immutable',
//         'Accept-Ranges': 'bytes',
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, OPTIONS',
//         'Access-Control-Allow-Headers': '*',
//       },
//     });
//   } catch (error) {
//     console.error('Video proxy error:', error);
//     return new NextResponse(`Failed to load video: ${error.message}`, { status: 500 });
//   }
// }

// // Handle OPTIONS requests for CORS preflight
// export async function OPTIONS(req) {
//   return new NextResponse(null, {
//     status: 204,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET, OPTIONS',
//       'Access-Control-Allow-Headers': '*',
//       'Access-Control-Max-Age': '86400',
//     },
//   });
// }

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const video = searchParams.get('video') || 'alka_1_umhnhr';
    
    const videoUrls = {
      'alka_1_umhnhr': 'https://res.cloudinary.com/dyevnylyo/video/upload/v1773349642/alkaMain_kggal0.mp4',
      'default': 'https://res.cloudinary.com/dyevnylyo/video/upload/v1773349642/alkaMain_kggal0.mp4'
    };
    
    const videoUrl = videoUrls[video] || videoUrls.default;
    
    // Fetch the video with streaming
    const response = await fetch(videoUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8',
      }
    });
    
    if (!response.ok) {
      return new NextResponse('Video not found', { status: 404 });
    }
    
    // Get the content type
    const contentType = response.headers.get('content-type') || 'video/mp4';
    
    // Stream the response instead of loading into memory
    return new NextResponse(response.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Accept-Ranges': 'bytes',
        'Access-Control-Allow-Origin': '*',
      },
    });
    
  } catch (error) {
    console.error('Video proxy error:', error);
    return new NextResponse('Failed to load video', { status: 500 });
  }
}

export async function OPTIONS(req) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  });
}