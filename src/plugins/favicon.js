const FAVICON_SIZE = 32;
const borderRadius = FAVICON_SIZE * 0.15;
const faviconCanvas = document.createElement("canvas");
faviconCanvas.width = FAVICON_SIZE;
faviconCanvas.height = FAVICON_SIZE;
const fc = faviconCanvas.getContext("2d");
fc.textAlign = "center";
fc.textBaseline = "middle";
fc.lineWidth = FAVICON_SIZE * 0.1;
fc.lineJoin = "round";
fc.lineCap = "round";
const sRadius = FAVICON_SIZE * 0.45; // radius for last seconds

const colourtoy = document.createElement("div");
function isLight(colour) {
  colourtoy.style.backgroundColor = colour;
  colour = colourtoy.style.backgroundColor;
  colour = colour
    .slice(colour.indexOf("(") + 1, colour.indexOf(")"))
    .split(/,\s*/)
    .map((a) => +a);
  // https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area
  return (
    Math.round(
      (parseInt(colour[0]) * 299 +
        parseInt(colour[1]) * 587 +
        parseInt(colour[2]) * 114) /
        1000
    ) > 150
  );
}

export function setFavicon({
  invalid,
  numToShow,
  isSeconds,
  name,
  color,
  favicon,
}) {
  if (invalid === true) {
    favicon.href = "/favicon.png";
    document.title = `Homework Central`;
    return;
  }
  if (isSeconds) {
    fc.fillStyle = color;
    fc.strokeStyle = color;
    fc.beginPath();
    fc.moveTo(FAVICON_SIZE / 2 + sRadius, FAVICON_SIZE / 2);
    fc.arc(FAVICON_SIZE / 2, FAVICON_SIZE / 2, sRadius, 0, 2 * Math.PI);
    fc.closePath();
    fc.fill();

    fc.beginPath();
    fc.moveTo(FAVICON_SIZE / 2, FAVICON_SIZE / 2 - sRadius);
    // Rounding seconds so when it shows 30 seconds always will show half-way,
    // even if it's not exactly 30s
    fc.arc(
      FAVICON_SIZE / 2,
      FAVICON_SIZE / 2,
      sRadius,
      Math.PI * 1.5,
      2 * Math.PI * (1 - Math.round(numToShow) / 60) - Math.PI / 2,
      true
    );
    fc.stroke();

    fc.fillStyle = isLight(color) ? "black" : "white";
    fc.font = `bold ${FAVICON_SIZE * 0.6}px "Roboto", sans-serif`;
    fc.fillText(
      Math.round(numToShow).toString().padStart(2, "0"),
      FAVICON_SIZE / 2,
      FAVICON_SIZE * 0.575
    );
  } else {
    fc.clearRect(0, 0, FAVICON_SIZE, FAVICON_SIZE);

    fc.fillStyle = color || "info";
    fc.beginPath();
    // Rounded square
    fc.moveTo(0, borderRadius);
    fc.arc(borderRadius, borderRadius, borderRadius, Math.PI, Math.PI * 1.5);
    fc.lineTo(FAVICON_SIZE - borderRadius, 0);
    fc.arc(
      FAVICON_SIZE - borderRadius,
      borderRadius,
      borderRadius,
      -Math.PI / 2,
      0
    );
    fc.lineTo(FAVICON_SIZE, FAVICON_SIZE - borderRadius);
    fc.arc(
      FAVICON_SIZE - borderRadius,
      FAVICON_SIZE - borderRadius,
      borderRadius,
      0,
      Math.PI / 2
    );
    fc.lineTo(borderRadius, FAVICON_SIZE);
    fc.arc(
      borderRadius,
      FAVICON_SIZE - borderRadius,
      borderRadius,
      Math.PI / 2,
      Math.PI
    );
    fc.closePath();
    fc.fill();

    fc.fillStyle = isLight(color) ? "black" : "white";
    fc.font = `bold ${FAVICON_SIZE * 0.8}px "Roboto", sans-serif`;
    fc.fillText(numToShow, FAVICON_SIZE / 2, FAVICON_SIZE * 0.575);
  }
  document.title = `${numToShow} ${
    isSeconds ? "seconds" : "minutes"
  } left in ${name} • Homework Central`;
  return (favicon.href = faviconCanvas.toDataURL());
}

/**/
