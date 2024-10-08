import { useState, useRef, useEffect } from "react";
import {
  Box,
  CardMedia,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Carousel from "react-elastic-carousel";
import SnakeBars from "./snackbar";


const reelsData = [
  {
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Sample Video 1",
    likes: 0,
  },
  {
    video: "https://www.w3schools.com/html/movie.mp4",
    description: "Sample Video 2",
    likes: 0,
  },
  {
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Sample Video 3",
    likes: 0,
  },
  {
    video: "https://www.w3schools.com/html/movie.mp4",
    description: "Sample Video 4",
    likes: 0,
  },
];

const InfiniteScrollBlinks = () => {
  const [reels, setReels] = useState(reelsData);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [setShowPlayButton] = useState(false); // State to control play button visibility
  const videoRefs = useRef([]);
  const navigate = useNavigate();
  const duplicatedReels = [...reels, ...reels];
  const carouselRef = useRef(null);
  

  const handleBack = () => {
    navigate(-1);
  };

  const handleLike = (index) => {
    const updatedReels = [...reels];
    updatedReels[index].likes += 1;
    setReels(updatedReels);
  };

  const handleShare = async (index) => {
    setSnackbarOpen(true);
    const shareData = {
      title: duplicatedReels[index].description,
      text: "Check out this awesome video!",
      url: duplicatedReels[index].video,
    };

    try {
      await navigator.share(shareData);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handleVideoEnd = () => {
    const nextIndex = (currentVideoIndex + 1) % duplicatedReels.length;
    setCurrentVideoIndex(nextIndex);
    carouselRef.current.goTo(nextIndex);
  };

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          if (isPlaying) {
            video.play();
          } else {
            video.pause();
          }
          video.onended = handleVideoEnd;
        } else {
          video.pause();
        }
      }
    });
  }, [currentVideoIndex, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const firstVideo = videoRefs.current[currentVideoIndex];
    if (firstVideo) {
      firstVideo.play();
    }
  }, []);

  const renderReels = () => {
    return duplicatedReels.map((reel, index) => (
      <Box
        key={index}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          scrollSnapAlign: "start",
        }}
      >
        <CardMedia
          className="reel-video"
          component="video"
          src={reel.video}
          controls={false}
          muted={false}
          ref={(el) => (videoRefs.current[index] = el)}
          poster="https://via.placeholder.com/600x400/000000/000000"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 0,
            position: "sticky",
            top: 0,
            left: 0,
            zIndex: 0,
            backgroundColor: "black", // Black background
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />

        {/* Play/Pause Button */}
        <IconButton
          onClick={togglePlayPause}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#fff",
            zIndex: 2,
            transition: "opacity 0.5s ease",
            opacity: isPlaying ? 0 : 1, // Fade out when playing
          }}
        >
          {isPlaying ? (
            <PauseIcon sx={{ fontSize: 60 }} />
          ) : (
            <PlayArrowIcon sx={{ fontSize: 60 }} />
          )}
        </IconButton>

        {/* Overlay Description */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: 20,
            color: "#fff",
            background: "rgba(0, 0, 0, 0.5)",
            padding: "10px",
            borderRadius: "5px",
            zIndex: 1,
            width: "70%",
          }}
        >
          <Typography sx={{ fontSize: "small" }} variant="h6">
            {reel.description}
          </Typography>
        </Box>

        {/* Action Icons */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            right: 20,
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            zIndex: 1,
          }}
        >
          <IconButton
            onClick={() => handleLike(index)}
            sx={{ color: reel.likes > 0 ? "red" : "#fff" }}
          >
            <FavoriteIcon sx={{ color: reel.likes > 0 ? "red" : "#fff" }} />
          </IconButton>
          <Typography
            variant="caption"
            sx={{ textAlign: "center", color: "#fff" }}
          >
            {reel.likes}
          </Typography>
          <IconButton onClick={() => handleShare(index)} sx={{ color: "#fff" }}>
            <ShareIcon />
          </IconButton>
          <IconButton sx={{ color: "#fff" }}>
            <ChatBubbleIcon />
          </IconButton>
        </Box>
      </Box>
    ));
  };

  // Show play button when the user taps the screen
  const handleTouchStart = () => {
    setShowPlayButton(true);
  };

  return (
    <>
    <Box
      sx={{
        height: "100vh",
        overflowY: "hidden",
        background: "#000",
      }}
      onTouchStart={handleTouchStart} // Show button on touch
    >
      {/* Back Button */}
      <IconButton
        onClick={handleBack}
        sx={{ color: "#fff", position: "fixed", top: 10, left: 10, zIndex: 2 }}
      >
        <ArrowBackIcon />
        <Typography sx={{ fontSize: "large", marginLeft: "10px" }} variant="h6">
          Blinks
        </Typography>
      </IconButton>

      {/* Carousel Component */}
      <Carousel
        ref={carouselRef}
        verticalMode
        showArrows={false}
        pagination={false}
        itemsToShow={1}
        onChange={(currentItem) => {
          setCurrentVideoIndex(currentItem.index % duplicatedReels.length);
        }}
      >
        {renderReels()}
      </Carousel>

      {/* Snackbar for share notification */}
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Center the Snackbar
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Video link shared successfully!
        </Alert>
      </Snackbar> */}
      {/* Reusable Snackbar Component */}
      <SnakeBars onShare={() => handleShare(currentVideoIndex)} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} />
    </Box>
    </>
  );
};

export default InfiniteScrollBlinks;
