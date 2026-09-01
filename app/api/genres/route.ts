import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.TMDB_API_KEY;
  const baseUrl = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';

  if (!apiKey) {
    return NextResponse.json({ error: 'TMDB API Key missing' }, { status: 500 });
  }

  try {
    const res = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}`, {
      next: { revalidate: 86400 }, // Cache genre list for 24 hours
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch genres' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
