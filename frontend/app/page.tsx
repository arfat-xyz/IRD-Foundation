import HomeClientComponent from "@/components/home-client-component";
import { generateStaticMetadata } from "@/hooks/meta-hook";

export const metadata = generateStaticMetadata("Home");
const HomePage = () => {
  return <HomeClientComponent />;
};

export default HomePage;
