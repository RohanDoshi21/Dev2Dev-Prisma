import { Canvas } from "canvas";

export const generateAvatar = async (initials: string) => {
  const canvas = new Canvas(128, 128);
  const ctx = canvas.getContext("2d");

  const fillColors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
    "#521477",
    "#C74B50",
    "#4E9F3D",
    "#1597BB",
    "#03C4A1",
    "#FA7D09",
    "#FCCB0B",
    "#FF4301",
    "#FFD700",
    "#2A2438",
  ];

  const randomFillColor =
    fillColors[Math.floor(Math.random() * fillColors.length)];

  ctx.fillStyle = randomFillColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#FFF";
  ctx.font = "bold 40px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials, canvas.width / 2, canvas.height / 2);

  const avatarDataUrl = canvas.toDataURL();

  return avatarDataUrl;
};

export default generateAvatar;
