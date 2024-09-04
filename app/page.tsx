import HomePage from "@/components/HomePage";
import { calculateTimeDifference } from "@/lib/home/calculateTimeDifference";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({});

export default function Home() {
  // Fetch the initial time
  const initialTime = calculateTimeDifference();

  return <HomePage initialTime={initialTime} />;
}
