import { useState } from 'react';
import { Box, Button, Typography, Card, CardMedia, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'; // to handle back navigation

const Video = () => {
  const [reels, setReels] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const navigate = useNavigate();

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (videoFile) {
      setReels([...reels, videoFile]);
      setVideoFile(null); // Clear the input after uploading
    }
  };

  const handleBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  return (
    <Box sx={{ padding: 2, background: "#000", height: "100vh" }}>
      {/* Back Button */}
      <IconButton onClick={handleBack} sx={{ color: '#fff', mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
        Blinks
      </Typography>

      <Box display="flex" justifyContent="space-start" mb={2} sx={{ gap: 1 }}>
        <input
          accept="video/*"
          id="upload-video"
          type="file"
          style={{ display: 'none' }}
          onChange={handleVideoChange}
        />
        <label htmlFor="upload-video">
          <Button
            size="small"
            variant="contained"
            color="primary"
            component="span"
            startIcon={<AddCircleIcon />}
          >
            Upload Blinks
          </Button>
        </label>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={handleUpload}
          disabled={!videoFile} // Disable if no video is selected
        >
          Share Blinks
        </Button>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={2}>
        {reels.map((reel, index) => (
          <Card key={index} sx={{ position: 'relative' }}>
            <CardMedia
              component="video"
              controls
              src={reel}
              sx={{
                borderRadius: '8px',
                height: 200,
                width: '100%',
                objectFit: 'cover',
              }}
            />
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Video;
