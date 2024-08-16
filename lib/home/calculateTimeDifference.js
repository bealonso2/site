// Function to calculate time difference
export const calculateTimeDifference = () => {
  const countUpDate = new Date("Jan 25, 2022 09:00:00").getTime();
  const distance = new Date().getTime() - countUpDate;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return `${days} days, ${hours} hour${
    hours === 1 ? "" : "s"
  }, ${minutes} minute${minutes === 1 ? "" : "s"}, and ${seconds} second${
    seconds === 1 ? "" : "s"
  }`;
};
