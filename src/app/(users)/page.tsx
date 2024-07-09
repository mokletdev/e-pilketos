import Galeri from "../components/home/Galeri";
import Header from "../components/home/Header";
import Panduan from "../components/home/Panduan";
import Prosedur from "../components/home/Prosedur";
import Video from "../components/home/Video";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <Panduan />
      <Prosedur />
      <Galeri />
      <Video />
    </div>
  );
}
