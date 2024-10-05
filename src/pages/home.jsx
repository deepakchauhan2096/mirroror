import Stories from "../components/stories";
import InfiniteScrollFeed from "../components/infinteScrollFeed";
import AppBars from "../components/appbar";

function Home() {
  return (
    <>
      <AppBars />
      <Stories />
      <InfiniteScrollFeed />
    </>
  );
}

export default Home;
