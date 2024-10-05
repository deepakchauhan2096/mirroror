import { useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./postCard"; // Assuming the card component is in the same directory

const InfiniteScrollFeed = () => {

  const [posts, setPosts] = useState([
    {
      id: 1,
      userAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
      username: "john_doe",
      time: "1h ago",
      image: "https://picsum.photos/600/400?random=1",
      description: "Enjoying the sunset at the beach 🌅 #sunset #beachlife",
    },
    {
      id: 2,
      userAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
      username: "jane_smith",
      time: "2h ago",
      image: "https://picsum.photos/600/400?random=2",
      description: "Amazing hike up the mountains 🏔 #hikingadventures",
    },
    {
      id: 3,
      userAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
      username: "mike_ross",
      time: "3h ago",
      image: "https://picsum.photos/600/400?random=3",
      description: "A lovely cup of coffee to start the day ☕ #coffeelover",
    },
    {
      id: 4,
      userAvatar: "https://randomuser.me/api/portraits/women/4.jpg",
      username: "emily_clark",
      time: "5h ago",
      image: "https://picsum.photos/600/400?random=4",
      description: "Just finished my workout 💪 #fitnessjourney",
    },
    {
      id: 5,
      userAvatar: "https://randomuser.me/api/portraits/men/5.jpg",
      username: "adam_jones",
      time: "6h ago",
      image: "https://picsum.photos/600/400?random=5",
      description: "Exploring new places 🚴 #bikelife",
    },
  ]);
  const [hasMore, setHasMore] = useState(true);

  // Simulating fetching posts
  const fetchPosts = () => {
    const newPosts = [...Array(10)].map((_, index) => ({
      id: posts.length + index + 1,
      userAvatar: "https://via.placeholder.com/150",
      username: "user_" + (posts.length + index + 1),
      time: "2h ago",
      image: "https://via.placeholder.com/600",
      description: "A beautiful image " + (posts.length + index + 1),
    }));
    return newPosts;
  };

  // useEffect(() => {
  //   Initial fetch
  //   setPosts(fetchPosts());
  // }, []);

  const fetchMorePosts = () => {
    if (posts.length >= 50) {
      setHasMore(false); // Stop fetching after 50 posts for demo
      return;
    }
    setTimeout(() => {
      setPosts((prevPosts) => [...prevPosts, ...fetchPosts()]);
    }, 1500);
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMorePosts}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p style={{ textAlign: "center" }}>You have seen it all!</p>}
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollFeed;
