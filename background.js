chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("background message listener has been added. ");
    if (message.action === "downloadImage") {
        const imageUrl = message.url;
        // const extension = imageUrl.split(".").pop().split("?")[0]; // Extract the file extension
        const filename = generateFilenameFromURL(imageUrl);

        console.log("filename", filename);
        //check its a valid url
        chrome.downloads.download({
            url: imageUrl,
            filename: filename,
            saveAs: false,
        });
    }
});

function generateFilenameFromURL(imageURL) {
	const regex = /^data:(image\/\w+);base64,(.*)$/;
    const match = imageURL.match(regex);

    if (match) {
        // Extract the format and base64-encoded string
        const format = match[1]; // e.g., "image/png"
        const base64String = match[2]; // base64-encoded string
		const name = base64String.replace(/[^a-zA-Z0-9]+/g, '').slice(0, 16); // e.g., "iVBORw0KGg"
		return `${name}.${format}`
    }
	// TODO: return invalid URL notification

}
