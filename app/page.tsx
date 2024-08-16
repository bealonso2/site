import HomePage from "@/components/HomePage";
import { calculateTimeDifference } from "@/lib/home/calculateTimeDifference";

export default function Home() {
  // Fetch the initial time
  const initialTime = calculateTimeDifference();

  return <HomePage initialTime={initialTime} />;
}
