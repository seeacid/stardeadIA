import { NextResponse } from 'next/server';
import { type InstagramPost } from '@/types';

// Mock Instagram data — replace with real API call when access token is configured
const MOCK_POSTS: InstagramPost[] = Array.from({ length: 12 }, (_, i) => ({
    id: `mock-${i + 1}`,
    caption: `𖤐 Stardead Clothes — Post #${i + 1}`,
    mediaUrl: `https://placehold.co/600x600/111111/8B5CF6?text=STARDEAD+${i + 1}`,
    mediaType: 'IMAGE' as const,
    permalink: 'https://www.instagram.com/stardead.clothes/',
    timestamp: new Date(Date.now() - i * 86400000 * 2).toISOString(),
}));

export async function GET() {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (accessToken) {
        try {
            const response = await fetch(
                `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink,timestamp,thumbnail_url&limit=12&access_token=${accessToken}`,
                { next: { revalidate: 3600 } } // Cache for 1 hour
            );

            if (!response.ok) throw new Error('Instagram API error');

            const data = await response.json();

            const posts: InstagramPost[] = data.data.map((post: Record<string, string>) => ({
                id: post.id,
                caption: post.caption || '',
                mediaUrl: post.media_url,
                mediaType: post.media_type,
                permalink: post.permalink,
                timestamp: post.timestamp,
                thumbnailUrl: post.thumbnail_url,
            }));

            return NextResponse.json(posts);
        } catch (error) {
            console.error('Instagram API error:', error);
            // Fall through to mock data
        }
    }

    // Return mock data when no access token or API error
    return NextResponse.json(MOCK_POSTS);
}
