window.addEventListener("onWidgetLoad", function (obj) {
  const fieldData = obj.detail.fieldData;
  const countdownDuration = fieldData.duration || "1 hour";
  const countdownElement = document.getElementById("countdown");

  if (countdownElement) {
    initializeCountdown(countdownDuration);
  }
});

function initializeCountdown(duration) {
  const targetTime = parseDuration(duration);
  updateCountdown(targetTime);
  setInterval(function () {
    updateCountdown(targetTime);
  }, 1000);
}

function parseDuration(durationStr) {
  const [amount, unit] = durationStr.split(" ");
  const now = new Date();
  switch (unit) {
    case "minute":
    case "minutes":
      return new Date(now.getTime() + parseInt(amount) * 60000);
    case "hour":
    case "hours":
      return new Date(now.getTime() + parseInt(amount) * 3600000);
    case "day":
    case "days":
      return new Date(now.getTime() + parseInt(amount) * 86400000);
    case "second":
    case "seconds":
      return new Date(now.getTime() + parseInt(amount) * 1000);
    default:
      console.error("Unsupported duration unit:", unit);
      return now;
  }
}

function updateCountdown(targetTime) {
  const now = new Date();
  const distance = targetTime - now;

  if (distance < 0) {
    clearInterval(updateCountdown);
    document.getElementById("countdown").innerHTML = "TIMES UP!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const timeString =
    days > 0
      ? `${days}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
      : `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  document.getElementById("countdown").innerHTML = timeString;
}

function pad(n) {
  return n < 10 ? "0" + n : n;
}
