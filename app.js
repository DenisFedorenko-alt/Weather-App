window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature-section");
    let temperatureSpan = document.querySelector(".temperature-section span")


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/116d03a6841bf19d793adbfad1c56543/${lat},${long}`;

            fetch(api)
                .then(respone => {
                    return respone.json();
                })
                .then(data => {
                    console.log(data)
                    const { temperature, summary, icon } = data.currently;
                    //устанавливаем значения для дом элементов 
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //Формула для цельсия
                    let celcius = (temperature - 32) * (5 / 9)

                    //Вызываем ф-цию
                    setIcons(icon, document.querySelector(".icon"))

                    //Изменяем температуру
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celcius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                })
        });
    }

    function setIcons(icon, iconId) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }

});



