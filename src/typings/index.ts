import { YouTubeVideo } from "play-dl"

type formatData = {
    codec: string;
    container: string;
    itag: number;
    mimeType: string;
    bitrate: number;
    width: number;
    height: number;
    lastModified: string;
    contentLength: string;
    quality: string;
    fps: number;
    qualityLabel: string;
    projectionType: string;
    averageBitrate: number;
    audioQuality: string;
    approxDurationMs: string;
    audioSampleRate: string;
    audioChannels: number;
    url: string;
    signatureCipher: string;
    cipher: string;
    loudnessDb: number;
    targetDurationSec: number;
}

type VideoDetails = {
    title?: string;
    thumbnail?: {
        url: string;
        width: number;
        height: number;
    }[];
    channel?: {
        name?: string;
        verified?: boolean;
        artist?: boolean;
        id?: string;
        type: 'video' | 'playlist' | 'channel';
        url?: string;
        icons?: {
            url: string;
            width: number;
            height: number;
        }[];
        subscribers?: string;
    },
    url: string;
    id?: string;
    durations: {
        raw: string;
        seconds: number;
    }
}

export type Video = {
    details: VideoDetails | null;
    formats: formatData[] | null;
    query: string | null;
}