import { Canvas } from "canvas";

export const generateAvatar = async (initials: string) => {
  const canvas = new Canvas(64, 64);
  const ctx = canvas.getContext("2d");

  // Randomize the fill style and fill color
  const fillStyles = ["solid", "gradient"];
  const fillColors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
  ];
  const randomFillStyle =
    fillStyles[Math.floor(Math.random() * fillStyles.length)];
  const randomFillColor =
    fillColors[Math.floor(Math.random() * fillColors.length)];

  if (randomFillStyle === "solid") {
    ctx.fillStyle = randomFillColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (randomFillStyle === "gradient") {
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, randomFillColor);
    gradient.addColorStop(1, "#FFFFFF");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.fillStyle = "#FFF";
  ctx.font = "bold 40px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials, canvas.width / 2, canvas.height / 2);

  const avatarDataUrl = canvas.toDataURL();

  return avatarDataUrl;
};

export default generateAvatar;
