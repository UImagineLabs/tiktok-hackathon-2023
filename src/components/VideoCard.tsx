import React, {
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import FooterLeft from "../components/FooterLeft";
import FooterRight from "../components/FooterRight";
import styles from "./VideoCard.module.css";
import GroupBuyPopup from "./ShopFlow/GroupBuyPopup";
import ViewItem from "./ShopFlow/ViewItem";

interface VideoCardProps {
  url: string;
  username: string;
  description: string;
  song: string;
  likes: number | string; // assuming likes can be a number or a formatted string
  shares: number;
  comments: number;
  saves: number;
  profilePic: string;
  setVideoRef: (video: HTMLVideoElement | null) => void;
  autoplay: boolean;
}

export const FOOD_ITEM_IMAGE_URL =
  "https://down-sg.img.susercontent.com/file/65f4739a073c03e90c7adc0765ae9aa1";
export const FOOD_ITEM_TITLE =
  "CHEAPEST SELF HEATING RICE🔥 这味香 15 Mins Flavour Rice";
export const FOOD_ITEM_PRICE = "2.49";
export const FOOD_ITEM_DESC = `
1. Stir Fried Meat With Fungus 鱼香肉丝 - Round Packaging
2. Curry Chicken 咖喱鸡肉 - Round Packaging
3. Sour Vege Meat 酸菜肉丝 - Round Packaging
4. Stir Fried Meat With Fungus 鱼香肉丝 - Square Packaging
`;

const handleGroupBuyPopupClick = (
  setIsViewingItemPanel: Dispatch<SetStateAction<boolean>>
) => {
  setIsViewingItemPanel(true);
};
const VideoCard: React.FC<VideoCardProps> = ({
  url,
  username,
  description,
  song,
  likes,
  shares,
  comments,
  saves,
  profilePic,
  setVideoRef,
  autoplay,
}) => {
  const [isViewingItemPanel, setIsViewingItemPanel] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play();
    }
  }, [autoplay]);

  const onVideoPress = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className={styles.video}>
      {isViewingItemPanel && (
        <ViewItem
          imageUrl={FOOD_ITEM_IMAGE_URL}
          title={FOOD_ITEM_TITLE}
          price={FOOD_ITEM_PRICE}
          description={FOOD_ITEM_DESC}
        />
      )}
      {/* The video element */}
      <video
        className={styles.player}
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        src={url}
      ></video>
      <GroupBuyPopup
        moneySaved={0.4}
        nearbyNum={8}
        onClick={() => handleGroupBuyPopupClick(setIsViewingItemPanel)}
      />
      <div className={styles["bottom-controls"]}>
        <div className={styles["footer-left"]}>
          <FooterLeft
            username={username}
            description={description}
            song={song}
          />
        </div>
        <div className={styles["footer-right"]}>
          <FooterRight
            likes={likes}
            shares={shares}
            comments={comments}
            saves={saves}
            profilePic={profilePic}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
