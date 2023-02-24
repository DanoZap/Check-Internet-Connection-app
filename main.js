const popup = document.querySelector(".popup"),
wifiIcon = document.querySelector(".icon i"),
popupTitle = document.querySelector(".popup .title"),
popupDesc = document.querySelector(".desc"),
reconnectButton = document.querySelector(".reconnect");

let isOnline = true, intervalId, timer = 10;

const checkWifi = async () => {
    try {
        // try to fetch random data from the API. If the status is between 200 and 300, the network connection is considered online
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.status >= 200 && response.status < 300;
    } catch (error) {
        isOnline = false; // If there is an error, the connection is considered offline
    }
    timer = 10;
    clearInterval(intervalId);
    handlePopup(isOnline);
}

const handlePopup = (status) => {
    if (status) { // If the status is true (online), update Icon, Title, and Description accordingly
        wifiIcon.classList = "uil uil-wifi";
        popupTitle.innerText = "Restored Connection";
        popupDesc.innerHTML = "Your Device is now successfully connected to the internet.";
        popup.classList.add("online");
        return setTimeout(() => popup.classList.remove("show"), 2200)
    }
    // If the status is false (offline), update Icon, Title, and Description accordingly
    wifiIcon.classList = "uil uil-wifi-slash";
    popupTitle.innerText = "Lost Connection";
    popupDesc.innerHTML = "Your Network is unavailable. We will attempt to reconnect you in <b>10</b> seconds.";
    popup.classList.add("show");
    popup.classList.remove("online");
    popup.className = "popup show";

    intervalId = setInterval(() => { // set an interval to decrease the timer
        timer--;
        if(timer === 0) checkWifi(); // if the timer reaches 0, check the connection
        popup.querySelector(".desc b").innerText = timer;
    }, 1000);
}

setInterval(() => isOnline && checkWifi(), 3000);

reconnectButton.addEventListener("click", checkWifi);