import axios from "axios";
import validator from "validator";
import config from "../../../config";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import AnalyticsModel from "../analytics/analytics.model";

// Define a type for the response data
interface Channel {
  type: string;
  id: string;
  name: string;
  handle: string;
  isVerified: boolean;
  isVerifiedArtist: boolean;
  subscriberCountText: string;
  avatar: object[];
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface DownloadResponse {
  downloadLink: string;
  format: string;
  title: string;
  viewCount: number;
  likeCount: number;
  commentCountText: string;
  channel: Channel;
  publishedTimeText: string;
  thumbnails: Thumbnail[];
  videoLengthSeconds?: number; // Added video length in seconds
  audioLengthSeconds?: string;
}

// Modify the function to handle conversion and return appropriate data
const convertURLToMP3orMP4 = async (data: any): Promise<DownloadResponse> => {
  const { url, format } = data;

  if (!url || !format) {
    throw new ApiError(httpStatus.BAD_GATEWAY, "URL and Format are required");
  }

  // Validate the YouTube URL
  if (
    !validator.isURL(url, {
      protocols: ["http", "https"],
      require_protocol: true,
    })
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid YouTube URL.");
  }

  // Extract video ID from the YouTube URL using regex
  let videoId: string | null = null;

  // Handle regular YouTube video URLs
  const videoIdMatch = url.match(/[?&]v=([^&#]*)/);
  if (videoIdMatch) {
    videoId = videoIdMatch[1]; // Video ID is the first capturing group
  }

  // Handle YouTube Shorts URLs
  if (!videoId) {
    const shortsIdMatch = url.match(/\/shorts\/([^\/?&#]*)/);
    if (shortsIdMatch) {
      videoId = shortsIdMatch[1]; // Video ID is the first capturing group
    }
  }

  // Handle YouTube share URLs (e.g., https://youtu.be/fbMWLwACZss)
  if (!videoId) {
    const shareIdMatch = url.match(/youtu\.be\/([^\/?&#]*)/);
    if (shareIdMatch) {
      videoId = shareIdMatch[1]; // Video ID is the first capturing group
    }
  }

  // If no video ID is found, throw an error
  if (!videoId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Could not extract video ID from the URL.",
    );
  }

  try {
    // Fetch MP4 metadata
    const mp4Response = await axios.get(
      "https://zylalabs.com/api/3219/youtube+mp4+video+downloader+api/5880/get+mp4",
      {
        headers: {
          Authorization: `Bearer ${config.youtube_mp3_or_mp4_downlaod}`,
        },
        params: {
          id: videoId, // Send the extracted video ID
        },
      },
    );

    // Check if the MP4 response contains an ID
    if (mp4Response.data.id) {
      const download = await axios.get(
        "https://zylalabs.com/api/3219/youtube+mp4+video+downloader+api/6812/youtube+downloader",
        {
          headers: {
            Authorization: `Bearer ${config.youtube_mp3_or_mp4_downlaod}`,
          },
          params: {
            videoId: mp4Response?.data?.id, // Send the extracted video ID
          },
        },
      );

      // Handling for MP3 format
      if (format === "mp3") {
        if (
          download.data &&
          download.data.audios &&
          download.data.audios.items &&
          download.data.audios.items.length > 0
        ) {
          const mp3DownloadLink = download.data.audios.items[0].url; // MP3 download link
          const audioLength = download.data.lengthSeconds; // Video length in seconds

          // DB Update for MP3 format
          await AnalyticsModel.updateOne(
            {},
            {
              $inc: { totalMP3: 1 },
              $set: { lastUsedMP3: new Date().toISOString() },
            },
            { upsert: true },
          );

          return {
            downloadLink: mp3DownloadLink,
            title: download.data.title,
            viewCount: download.data.viewCount,
            likeCount: download.data.likeCount,
            commentCountText: download.data.commentCountText,
            channel: download.data.channel,
            publishedTimeText: download.data.publishedTimeText,
            thumbnails: download.data.thumbnails,
            audioLengthSeconds: audioLength, // Include video length in the response
            format: "mp3",
          };
        } else {
          throw new ApiError(
            httpStatus.NOT_FOUND,
            "MP3 download link not found.",
          );
        }
      }

      // Handling for MP4 format
      if (format === "mp4") {
        if (
          download.data &&
          download.data.videos &&
          download.data.videos.items &&
          download.data.videos.items.length > 0
        ) {
          const mp4DownloadLink = download.data.videos.items[0].url; // MP4 download link
          const videoLength = download.data.lengthSeconds; // Video length in seconds

          // DB Update for MP4 format
          await AnalyticsModel.updateOne(
            {},
            {
              $inc: { totalMP4: 1 },
              $set: { lastUsedMP4: new Date().toISOString() },
            },
            { upsert: true },
          );

          return {
            downloadLink: mp4DownloadLink,
            title: download.data.title,
            viewCount: download.data.viewCount,
            likeCount: download.data.likeCount,
            commentCountText: download.data.commentCountText,
            channel: download.data.channel,
            publishedTimeText: download.data.publishedTimeText,
            thumbnails: download.data.thumbnails,
            videoLengthSeconds: videoLength, // Include video length in the response
            format: "mp4",
          };
        } else {
          throw new ApiError(
            httpStatus.NOT_FOUND,
            "MP4 download link not found.",
          );
        }
      }

      // If no format is specified or incorrect format
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Please specify a valid format (mp3 or mp4).",
      );
    } else {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "No video ID found in the response.",
      );
    }
  } catch (error: any) {
    // Handle any errors (API call issues, etc.)
    if (error.response) {
      // Server responded with an error status code
      throw new ApiError(
        httpStatus.BAD_GATEWAY,
        "Error fetching data from the API.",
      );
    } else {
      // Handle any other errors (like network issues)
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "An unexpected error occurred.",
      );
    }
  }
};

export const ConvertService = {
  convertURLToMP3orMP4,
};
