const Music = new Audio("music.mp3")

function Type(text) {
    const Element = document.createElement('h2');
    document.querySelector("main").append(Element);
    
    text.split("").forEach((character, index) => {
        setTimeout(() => {
            Element.textContent += character;
        }, index * 50);
    });
}


async function GetInfo(){
    let result = {}
    const infoResponse = await fetch(`https://freeipapi.com/api/json/`)
    const info = await infoResponse.json()

    const locationResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${info.latitude}&lon=${info.longitude}`)
    const location = await locationResponse.json()

    const locationNontargets = [
        "licence",
        "address",
        "name",
        "lat",
        "lon",
    ]
    Object.assign(result, {
        "Ip Address": info.ipAddress,
        "Latitude": info.latitude,
        "Longitude": info.longitude,
        "City": info.cityName,
        "Zip code": info.zipCode,
        "Region/State": info.regionName,
        "Country": `${info.countryName} (${info.countryCode})`,
        "Language": info.language,
        "Time Zone": info.timeZone
    })
    Object.assign(result, Object.entries(location).reduce((acc, [key, value]) => {
        if (!locationNontargets.includes(key)){acc[key] = value}; return acc
    }, {})) 
    return result;
}

document.querySelector("button").onclick = () => {
document.querySelector("main").removeAttribute("hidden")
document.getElementById("img1").removeAttribute("hidden")
document.getElementById("img2").removeAttribute("hidden")
document.querySelector("button").setAttribute("hidden", "")
Music.volume = 0.3
Music.play()
GetInfo().then((data) => {
    let index = 0
    for (const [key, value] of Object.entries(data)) {
        setTimeout(() => {
            Type(`${key}: ${value}`)
        }, index * 100);
        index++
    }
})
}

Music.onended = function(){window.close()}
