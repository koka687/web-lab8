"use strict";
// Функція для малювання карток
function renderSensors(sensors) {
    const container = document.querySelector("#sensors-list");
    if (!container)
        return;
    container.innerHTML = "";
    sensors.forEach((sensor) => {
        const card = document.createElement("article");
        card.classList.add("card", "sensor-card");
        if (sensor.status) {
            card.classList.add(sensor.status);
        }
        card.innerHTML = ` 
      <div class="sensor-card__header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 style="margin: 0;">${sensor.name || sensor.id}</h3>
        <span class="status-badge ${sensor.status || ''}" style="position: static !important; padding: 4px 10px; border-radius: 8px; font-size: 14px; background: rgba(255,255,255,0.1);">
          ${sensor.status}
        </span>
      </div>
      <p style="margin: 8px 0;">Район: ${sensor.district}</p> 
      <p class="sensor-card__level" style="margin: 8px 0;">Рівень шуму: <strong>${sensor.noiseLevel} дБ</strong></p> 
    `;
        container.appendChild(card);
    });
}
// Завантаження даних з API
async function loadSensors() {
    try {
        const response = await fetch("https://6af08bdf11a6aa866e7f9115.mockapi.io/api/v1/sensors");
        if (!response.ok)
            throw new Error("Не вдалося завантажити сенсори");
        const sensors = await response.json();
        renderSensors(sensors);
    }
    catch (error) {
        console.error("Помилка:", error);
    }
}
loadSensors();
