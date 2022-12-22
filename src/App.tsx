import React, { FC, Suspense, useState } from "react";
import styles from "@/App.module.scss";
import { Badge, Button, Loading } from "@/components";
import { useGetFBFriends, useGetLoginStatus } from "@/hooks/useFacebookAPI";
import * as FBAPI from "@/lib/FacebookAPI";
import ReactGA from "react-ga";
import Clock from "./components/Clock/Clock";

interface IPictureInfo {
  data: {
    height: number;
    width: number;
    is_silhouette: boolean;
    url: string;
  };
}
interface IUserFBInfo {
  id: number;
  name: string;
  picture: IPictureInfo;
  error?: Record<string, any>;
  friends?: {
    data?: any[];
    summary?: {
      total_count: number;
    };
  };
  photos?: {
    data?: any[];
  };
  email?: string;
}

const userInfoInit = {
  id: 0,
  name: "",
  picture: null,
  error: null,
  friends: null,
  photos: null,
  email: "",
};

const App: FC = () => {
  const [userFBInfo, setUserFBInfo] = useState<IUserFBInfo>(userInfoInit);
  const [loading, setLoading] = useState(false);
  const haveUserFBInfo = Object.values(userFBInfo).every(Boolean);
  console.log("userFBInfo:", userFBInfo);
  const [getFBFriends, FBfriends] = useGetFBFriends(`${userFBInfo.id}/friends`);
  useGetLoginStatus([], async (res) =>
    res.status === "connected" ? await getUserFBInfo() : null
  );

  const getUserFBInfo = async (
    fields = "id,name,picture,email,friends.limit(10){about,age_range,birthday,email,favorite_athletes,education,favorite_teams,first_name,hometown,gender,id,id_for_avatars,inspirational_people,install_type,installed,is_guest_user,languages,last_name,link,location,meeting_for,middle_name,name,name_format,payment_pricepoints,political,profile_pic,quotes,relationship_status,shared_login_upgrade_required_by,short_name,significant_other,sports,supports_donate_button_in_live_video,token_for_business,video_upload_limits,website,accounts},photos.limit(1000){id,created_time,images,icon,link,likes}"
  ) => {
    try {
      setLoading(true);
      const result = await FBAPI.getFacebookAPI<IUserFBInfo>("/me", {
        fields,
      });
      console.log("result:", result);
      // if (!result.error) {
      setUserFBInfo(result);
      // }
    } catch (error) {
      console.log("error:", error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleLoginFB = async () => {
    try {
      const result = await FBAPI.handleLoginFB();
      console.log("result:", result);
      if (result.authResponse) {
        await getUserFBInfo();
      }
    } catch (error) {}
  };

  const handleLogoutFB = async () => {
    setUserFBInfo(userInfoInit);
    await FBAPI.handleLogoutFB();
  };

  const Photo = ({ photos = [] }) => {
    if (!photos.length) return null;

    return (
      <div className={styles.Photo}>
        {photos.map((photo) => (
          <div key={photo.id}>
            <a href={photo.link} target="_blank">
              <div className={styles.wrapImage}>
                {photo?.images &&
                  photo?.images.length &&
                  photo?.images.slice(0, 1).map((img, index) => (
                    <div key={index}>
                      <img
                        loading="lazy"
                        src={img.source}
                        alt=""
                        width={img.width}
                        height={img.height}
                      />
                    </div>
                  ))}
              </div>
            </a>
          </div>
        ))}
      </div>
    );
  };

  const FriendsCount = ({ friendCount = 0, email }) => {
    return (
      <div>
        {email && (
          <div>
            Email: <b>{email}</b>
          </div>
        )}
        {friendCount && (
          <div>
            Bạn có <b>{friendCount}</b> bạn bè
          </div>
        )}
      </div>
    );
  };
  const handleSendGA = () => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    ReactGA.event({ category: "abc", action: "xyz" });
  };

  return (
    <>
      {loading && <Loading />}

      {haveUserFBInfo && (
        <div className={styles.user}>
          <div>
            Hé lô bạn <b>{userFBInfo.name}</b> <br /> giữa trời đông cô đơn
          </div>
          <div className={styles.avatar}>
            <img src={userFBInfo.picture?.data?.url} alt="" />
          </div>
          <Button onClick={handleLogoutFB}>Đăng xuất</Button>
        </div>
      )}

      <div className={styles.App}>
        {!haveUserFBInfo && (
          <>
            <Button className={styles.FBbutton} onClick={handleLoginFB}>
              Đăng nhập với Facebook
            </Button>
            <Button
              className={styles.FBbutton}
              style={{
                marginTop: "50px",
              }}
              onClick={handleSendGA}
            >
              SEND GA
            </Button>
          </>
        )}
        {haveUserFBInfo && (
          <>
            <FriendsCount
              friendCount={userFBInfo.friends?.summary?.total_count || 0}
              email={userFBInfo.email}
            />
            <Photo photos={userFBInfo.photos?.data || []} />
            {/* <Clock /> */}
            {/* <Button onClick={getFBFriends}>Lấy DS Bạn bè</Button> */}
          </>
        )}
        {userFBInfo.error && (
          <Badge className={styles.error} type="danger">
            {userFBInfo.error?.message}
          </Badge>
        )}
      </div>
    </>
  );
};

export default App;
