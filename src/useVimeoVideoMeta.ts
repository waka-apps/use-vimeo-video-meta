import axios from "axios";
import { useEffect, useState } from "react";

const getVimeoMeta = async (videoId: string): Promise<string> => {
  const vimeoApiUrl = `https://vimeo.com/api/v2/video/${videoId}.json`;
  try {
    const response = await axios.get(vimeoApiUrl);
    if (response.status !== 200) {
      throw new Error("Failed to fetch");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching Vimeo thumbnail:", error);
    throw new Error("Could not fetch Vimeo thumbnail");
  }
};

export const useVimeoVideoMeta = (videoId: string) => {
  const [data, setData] = useState(undefined);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const result = await getVimeoMeta(videoId);
        if (isMounted) {
          setData(result);
          setIsSuccess(true);
        }
      } catch (error) {
        console.error("Error fetching Vimeo thumbnail:", error);
        setIsSuccess(false);
      }
    };

    if (videoId) {
      fetchData();
    } else {
      setData(undefined);
      setIsSuccess(false);
    }

    return () => {
      isMounted = false;
    };
  }, [videoId]);

  return isSuccess ? data : undefined;
};
