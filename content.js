document.addEventListener("contextmenu", function (event) {
    try {
        const element = event.target;
        console.log(element, "tagname");
        console.log(element.tagName, " tagname");
        if (element.tagName === "IMG") {
            // console.log("content script clicked");
            event.preventDefault(); // Prevent the default context menu
            const imageUrl = element.src;
            chrome.runtime.sendMessage({ action: "downloadImage", url: imageUrl });
        }
    } catch (error) {
        console.error("error in content script: ", error);
    }
});
