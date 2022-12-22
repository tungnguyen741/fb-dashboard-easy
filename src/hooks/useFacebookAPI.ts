import {
  getFacebookAPI,
  getLoginStatus,
  handleLoginFB,
} from "@/lib/FacebookAPI";
import { useEffect, useRef, useState } from "react";

export const useGetLoginStatus = (
  dependencies = [],
  callback?: (res: any) => any
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getLoginStatus();
        setData(response);
        callback && callback(response);
      } catch (error) {
        setError({ error: true, data: error });
        callback && callback(error);
      } finally {
        setLoading(false);
        console.log("useGetLoginStatus success", { error, data, loading });
      }
    })();
  }, dependencies);

  return { error, data, loading };
};

export const useGetFBFriends = (path = "/friends") => {
  const [friends, setFriends] = useState([]);

  const getFBFriends = async () => {
    try {
      const result = await getFacebookAPI(path, "GET");
      console.log("useGetFBFriends -> result:", result);
      setFriends(result);
      return result;
    } catch (error) {
      setFriends([]);
    } finally {
      console.log("useGetFBFriends success", { path, friends });
    }
  };

  return [getFBFriends, friends] as const;
};
