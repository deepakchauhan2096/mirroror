import { useRef } from "react";
import { Box, Avatar} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled } from "@mui/system";

const stories = [
  { id: 1, name: "Story 1", src: "/path/to/image1.jpg" },
  { id: 2, name: "Story 2", src: "/path/to/image2.jpg" },
  { id: 3, name: "Story 3", src: "/path/to/image3.jpg" },
  { id: 4, name: "Story 4", src: "/path/to/image1.jpg" },
  { id: 5, name: "Story 5", src: "/path/to/image2.jpg" },
  { id: 6, name: "Story 6", src: "/path/to/image3.jpg" },
  { id: 7, name: "Story 7", src: "/path/to/image1.jpg" },
  { id: 8, name: "Story 8", src: "/path/to/image2.jpg" },
  { id: 9, name: "Story 9", src: "/path/to/image3.jpg" },
  { id: 10, name: "Story 10", src: "/path/to/image1.jpg" },
  { id: 11, name: "Story 11", src: "/path/to/image2.jpg" },
  { id: 12, name: "Story 12", src: "/path/to/image3.jpg" },
  // Add more stories here
];

const StoryAvatar = styled(Avatar)(() => ({
  width: 70,
  height: 70,
  margin: "0 10px",
  border: "2px solid #ff9500", // Story border color
  cursor: "pointer",
  boxShadow: "0 0 0 2px #f3f5f6 inset",
  position: "relative", // Allow positioning for overlay
}));

const Stories = () => {
  const storyRefs = useRef([]);

  const handleStoryClick = (index) => {
    if (storyRefs.current[index]) {
      storyRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center", // Centering the clicked story
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        padding: "10px 0",
        whiteSpace: "nowrap",
        scrollbarWidth: "none", // Hide scrollbar
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {stories.map((story, index) => (
        <Box
          key={story.id}
          ref={(el) => (storyRefs.current[index] = el)}
          onClick={() => handleStoryClick(index)}
          sx={{
            display: "inline-block",
            textAlign: "center",
            cursor: "pointer",
            position: "relative", // Enable relative positioning for overlay
          }}
        >
          <StoryAvatar alt={story.name} src={story.src} />
          <Box component="span" sx={{ fontSize: "12px", color: "#333" }}>
            {story.name}
          </Box>

          {/* Add button overlay only for the first story */}
          {index === 0 && (
            <AddCircleIcon
              sx={{
                position: "absolute",
                bottom: 20,
                right: 10,
                borderRadius: "50%",
                backgroundColor: "#fff",
              }}
              color="primary"
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Stories;
