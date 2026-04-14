import { NextResponse } from "next/server";

const ALLOWED_SERVICES = ["Volunteer", "Partner", "Learner"];

function validate(body) {
  const errors = {};

  const your_name = String(body?.your_name || "").trim();
  const your_email = String(body?.your_email || "").trim();
  const phone_number = String(body?.phone_number || "").trim();
  const service_name = String(body?.service_name || "").trim();
  const your_message = String(body?.your_message || "").trim();
  const website = String(body?.website || "").trim(); // honeypot

  if (website) {
    return {
      isBot: true,
      errors: {},
      clean: null,
    };
  }

  if (your_name.length < 2 || your_name.length > 80) {
    errors.your_name = "Invalid name.";
  }

  if (!/^\S+@\S+\.\S+$/.test(your_email) || your_email.length > 120) {
    errors.your_email = "Invalid email.";
  }

  const digits = phone_number.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    errors.phone_number = "Invalid phone number.";
  }

  if (!ALLOWED_SERVICES.includes(service_name)) {
    errors.service_name = "Invalid selection.";
  }

  if (your_message.length < 10 || your_message.length > 2000) {
    errors.your_message = "Invalid message.";
  }

  return {
    isBot: false,
    errors,
    clean: {
      your_name,
      your_email,
      phone_number,
      service_name,
      your_message,
    },
  };
}

// Handle POST requests (your existing contact form)
export async function POST(req) {
  try {
    const body = await req.json();
    const { isBot, errors, clean } = validate(body);

    if (isBot) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { message: "Validation failed", errors },
        { status: 400 }
      );
    }

    const apiUrl = process.env.CONTACT_API_URL;

    if (!apiUrl) {
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const upstreamRes = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clean),
      cache: "no-store",
    });

    if (!upstreamRes.ok) {
      return NextResponse.json(
        { message: "Failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Invalid request" },
      { status: 400 }
    );
  }
}

// Handle GET requests for video proxy
// export async function GET(req) {
//   try {
//     // Get the video filename from the URL query parameters
//     const { searchParams } = new URL(req.url);
//     const video = searchParams.get('video') || 'alka_1_umhnhr';
    
//     // You can add more video options here
//     const videoUrls = {
//       'alka_1_umhnhr': 'https://res.cloudinary.com/dyevnylyo/video/upload/alka_1_umhnhr.mp4',
//       'default': 'https://res.cloudinary.com/dyevnylyo/video/upload/alka_1_umhnhr.mp4'
//     };
    
//     const videoUrl = videoUrls[video] || videoUrls.default;
    
//     // Fetch the video with proper headers
//     const response = await fetch(videoUrl, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (compatible; Next.js/1.0)',
//         'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8'
//       }
//     });
    
//     if (!response.ok) {
//       console.error(`Failed to fetch video: ${response.status} ${response.statusText}`);
//       return new NextResponse('Video not found', { status: 404 });
//     }
    
//     // Get the video data as ArrayBuffer
//     const videoData = await response.arrayBuffer();
    
//     // Get the content type from the response or default to video/mp4
//     const contentType = response.headers.get('content-type') || 'video/mp4';
    
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
//         'Access-Control-Allow-Headers': 'Range',
//       },
//     });
//   } catch (error) {
//     console.error('Video proxy error:', error);
//     return new NextResponse('Failed to load video', { status: 500 });
//   }
// }

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(req) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Range',
      'Access-Control-Max-Age': '86400',
    },
  });
}