import { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardMedia, CardContent, Typography, Avatar, CardActions, IconButton, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send"; // New share icon
import VisibilityIcon from "@mui/icons-material/Visibility";

const PostCard = (props) => {
  const { post } = props;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [viewCount] = useState(100); // Simulated views

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`Check out this post: ${post.image}`);
    alert("Post link copied to clipboard!");
  };

  return (
    
    <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
      <CardHeader
        avatar={<Avatar src={post.userAvatar} />}
        title={post.username}
        subheader={post.time}
      />
      <CardMedia
        component="img"
        height="400"
        image={post.image}
        alt="Post image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* Like and View Section */}
        <Box display="flex" alignItems="center">
          <IconButton onClick={handleLike} color={liked ? "error" : "default"}>
            <FavoriteIcon />
          </IconButton>
          <Typography variant="body2">{likeCount}</Typography>

          <IconButton>
            <VisibilityIcon />
          </IconButton>
          <Typography variant="body2">{viewCount} views</Typography>
        </Box>

        {/* Share Button on the Right */}
        <Box sx={{ marginLeft: "auto" }}>
          <IconButton onClick={handleShare}>
            <SendIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};




export default PostCard;

// Adding PropTypes validation
PostCard.propTypes = {
    post: PropTypes.shape({
      userAvatar: PropTypes.string,   // Ensure userAvatar is a string
      username: PropTypes.string,     // Ensure username is a string
      time: PropTypes.string,         // Ensure time is a string
      image: PropTypes.string,        // Ensure image is a string
      description: PropTypes.string,  // Ensure description is a string
    }).isRequired,                    // post prop is required
  };
  
