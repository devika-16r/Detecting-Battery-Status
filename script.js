const chargeLevel = document.getElementById("charge-level");
const charge = document.getElementById("charge");
const chargingTimeRef = document.getElementById("charging-time");

document.addEventListener("DOMContentLoaded", () => {
  if (!navigator.getBattery) {
    alert("Battery Status API is not supported in your browser.");
    return;
  }

  navigator.getBattery().then((battery) => {
    function updateAllBatteryInfo() {
      updateChargingInfo();
      updateLevelInfo();
    }

    updateAllBatteryInfo();

    // When the charging status changes
    battery.addEventListener("chargingchange", updateAllBatteryInfo);

    // When the battery level changes
    battery.addEventListener("levelchange", updateAllBatteryInfo);

    function updateChargingInfo() {
      if (battery.charging) {
        charge.classList.add("active");
        chargingTimeRef.innerText = "Charging...";
      } else {
        charge.classList.remove("active");

        // Display time left to discharge only when it's a finite integer
        if (Number.isFinite(battery.dischargingTime)) {
          let hr = Math.floor(battery.dischargingTime / 3600);
          let min = Math.floor((battery.dischargingTime % 3600) / 60);
          chargingTimeRef.innerText = `${hr}hr ${min}mins remaining`;
        } else {
          chargingTimeRef.innerText = "";
        }
      }
    }

    function updateLevelInfo() {
      const batteryLevel = `${Math.round(battery.level * 100)}%`;
      charge.style.width = batteryLevel;
      chargeLevel.textContent = batteryLevel;
    }
  }).catch((error) => {
    console.error("Battery Status API error:", error);
  });
});
