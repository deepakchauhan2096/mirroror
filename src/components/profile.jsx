import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import { styled } from "@mui/system";
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // Friend icon

// Styled components for consistency
const ProfileContainer = styled(Box)(() => ({
  maxWidth: "100%",
  margin: "20px auto",
  padding: "0 10px",
}));

const ProfileHeader = styled(Box)({
    flexGrow: 1,
});

const ProfileInfo = styled(Box)({
  flexGrow: 1,
  marginBottom:"10px"
});

const StatsContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  maxWidth: "100%",
  gap:"20px",
  marginLeft:"50px"
});

const StatsBlock = styled(Box)({
  textAlign: "center",
});

const HighlightContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  margin: "20px 0",
});

const HighlightCircle = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginRight: "20px",
  textAlign: "center",
});

const PostGridContainer = styled(Box)({
  marginTop: "30px",
  width: "100%",
});

const PostImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  margin: 0,
  padding: 0,
});

// Dummy post data
const dummyPosts = [
  { id: 1, image: "https://picsum.photos/200/200?random=1" },
  { id: 2, image: "https://picsum.photos/200/200?random=2" },
  { id: 3, image: "https://picsum.photos/200/200?random=3" },
  { id: 4, image: "https://picsum.photos/200/200?random=4" },
  { id: 5, image: "https://picsum.photos/200/200?random=5" },
  { id: 6, image: "https://picsum.photos/200/200?random=6" },
];

const Profile = () => {
  return (
    <>
      <ProfileContainer>
        {/* Profile Header */}
        <ProfileHeader>
          {/* Profile Picture and Username */}
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Avatar
              src="https://randomuser.me/api/portraits/women/45.jpg"
              sx={{ width: 90, height: 90 }}
            />
            {/* Stats */}
            <StatsContainer>
              <StatsBlock>
                <Typography variant="h6">120</Typography>
                <Typography variant="body2" color="text.secondary">
                  Posts
                </Typography>
              </StatsBlock>
              <StatsBlock>
                <Typography variant="h6">4.5k</Typography>
                <Typography variant="body2" color="text.secondary">
                  Followers
                </Typography>
              </StatsBlock>
              <StatsBlock>
                <Typography variant="h6">180</Typography>
                <Typography variant="body2" color="text.secondary">
                  Following
                </Typography>
              </StatsBlock>
            </StatsContainer>
          </Box>
        </ProfileHeader>
        {/* Profile Info */}
        <ProfileInfo>
          <Typography
            variant="h6"
            sx={{ marginTop: "10px", fontSize: "14px" }}
          >
            username123
          </Typography>

          {/* Bio */}
          <Typography variant="body2" sx={{ marginTop: "10px" }}>
            Full Name <br />
            Web Developer | Love to code <br />
            🌍 Always exploring the world
          </Typography>
        </ProfileInfo>

        {/* Add Friend Button */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          {/* Edit Profile, Share Profile, and Settings */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            sx={{ width: "100%" }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{ marginRight: "5px", boxShadow: "none" }}
              color="secondary"
            >
              Edit Profile
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ marginRight: "5px", boxShadow: "none" }}
              color="secondary"
            >
              Share Profile
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ boxShadow: "none" }}
              color="secondary"
            >
              <PersonAddIcon />
            </Button>
          </Box>
        </Box>

        {/* Highlights */}
        <HighlightContainer>
          <HighlightCircle>
            <Avatar
              src="https://randomuser.me/api/portraits/men/15.jpg"
              sx={{ width: 70, height: 70 }}
            />
            <Typography variant="caption">Travel</Typography>
          </HighlightCircle>
          <HighlightCircle>
            <Avatar
              src="https://randomuser.me/api/portraits/women/30.jpg"
              sx={{ width: 70, height: 70 }}
            />
            <Typography variant="caption">Workouts</Typography>
          </HighlightCircle>
          <HighlightCircle>
            <Avatar
              src="https://randomuser.me/api/portraits/men/22.jpg"
              sx={{ width: 70, height: 70 }}
            />
            <Typography variant="caption">Family</Typography>
          </HighlightCircle>
        </HighlightContainer>
      </ProfileContainer>
      {/* Post Grid */}
      <PostGridContainer>
        <Grid container spacing={0}>
          {dummyPosts.map((post) => (
            <Grid item xs={4} key={post.id}>
              <Box sx={{ aspectRatio: "1/1", margin: "0", padding: "0" }}>
                <PostImage src={post.image} alt="post" />
              </Box>
            </Grid>
          ))}
        </Grid>
      </PostGridContainer>
    </>
  );
};

export default Profile;
