import Landingpage from "./components/Landingpage"; 
import Milestonecard from "./components/Milestonecard";
import Projectscard from "./components/Projectscard";
import Perfacthome from "./components/perfacthome";
import YouTubeVideo from "./components/YouTubeVideo";

export default function Home() {
  return (
    <div>
      <Landingpage />
      <Perfacthome />
      <section id="properties">
      <Projectscard />
      </section>
      <YouTubeVideo videoId="1hEIj3o2Bok" width="1200" height="600" />
      <Milestonecard />

    </div>
  );
}
