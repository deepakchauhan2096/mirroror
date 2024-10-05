import { useState, useRef, useEffect } from 'react';
import { Box, CardMedia, Typography, IconButton, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

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
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const reelContainerRef = useRef(null);
  const videoRefs = useRef([]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleLike = (index) => {
    // Update likes for the video
    const updatedReels = [...reels];
    updatedReels[index].likes += 1;
    setReels(updatedReels);
  };

  const handleShare = async (index) => {
    const shareData = {
      title: reels[index].description,
      text: "Check out this awesome video!",
      url: reels[index].video, // You can share the video link
    };

    try {
      await navigator.share(shareData);
      setSnackbarOpen(true); // Show snackbar on successful share
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  // Use Intersection Observer to detect when the video is in view
  useEffect(() => {
    const options = {
      threshold: 0.5, // Trigger when 50% of the video is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.dataset.index);
        if (entry.isIntersecting) {
          setCurrentVideoIndex(index); // Set the current video index when it enters view
        }
      });
    }, options);

    const elements = document.querySelectorAll(".reel-video");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    // Play and pause videos based on the currentVideoIndex
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          video.play();
          video.onended = () => {
            // Scroll to the next video when the current video ends
            const nextIndex = (currentVideoIndex + 1) % videoRefs.current.length;
            setCurrentVideoIndex(nextIndex);
            reelContainerRef.current.scrollTo({
              top: reelContainerRef.current.clientHeight * nextIndex,
              behavior: 'smooth', // Smooth scroll to next video
            });
          };
        } else {
          video.pause();
        }
      }
    });
  }, [currentVideoIndex]);

  // Generate an infinite scroll effect by repeating the videos
  const renderReels = () => {
    const repeatedReels = [...reels, ...reels, ...reels]; // Repeat the original reels data
    return repeatedReels.map((reel, index) => (
      <Box
        key={index}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          scrollSnapAlign: "start", // Ensure snapping effect when scrolling
        }}
      >
        <CardMedia
          className="reel-video"
          component="video"
          src={reel.video}
          controls={false} // Disable default video controls
          muted
          ref={(el) => (videoRefs.current[index] = el)}
          data-index={index}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 0,
            position: "sticky",
            top: 0,
            left: 0,
            zIndex: 0, // Video behind overlays
          }}
        />
        
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
            zIndex: 1, // Above video
            flexFlow: 1,
            display: "flex",
            width: "70%"
          }}
        >
          <Typography sx={{ fontSize: "small" }} variant="h6">{reel.description}</Typography>
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
            zIndex: 1, // Above video
          }}
        >
          <IconButton 
            onClick={() => handleLike(index)} 
            sx={{ color: reel.likes > 0 ? "red" : "#fff" }} // Change color when liked
          >
            <FavoriteIcon sx={{ color: reel.likes > 0 ? "red" : "#fff" }} />
          </IconButton>
          <Typography variant="caption" sx={{ textAlign: "center", color: "#fff" }}>
            {reel.likes}
          </Typography> {/* Show likes count below the heart */}
          
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

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "auto",
        background: "#000",
      }}
      ref={reelContainerRef}
    >
      {/* Back Button */}
      <IconButton onClick={handleBack} sx={{ color: '#fff', position: 'fixed', top: 10, left: 10, zIndex: 2 }}>
        <ArrowBackIcon />
        <Typography sx={{ fontSize: "large", marginLeft: "10px" }} variant="h6">Blinks</Typography>
      </IconButton>

      {renderReels()} {/* Render the repeated reels */}

      {/* Snackbar for share notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default InfiniteScrollBlinks;
