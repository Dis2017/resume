function setCDNSrc(id, url, config){
    let elements = document.getElementsByClassName(id);
    for (let i = 0; i < elements.length; i++) {
        let src = generateCDNUrl(url, config);
        if (isVideo(url, config) && elements[i] instanceof HTMLImageElement) {
            src = src + "&vframe/png/offset/1";
            let p = document.createElement("p");
            p.innerText = "视频";
            p.setAttribute("style", "position: absolute; top: 0; left: 2%; border-radius: 6px; background-color: teal; color: white; padding: 0 15px;");
            elements[i].after(p);
        }
        elements[i].setAttribute("src", src);
    }
}

function isVideo(url, config) {
    let videoFormat = config["video-format"];
    let postfix = url.substring(url.lastIndexOf("."));
    for (let i = 0; i < videoFormat.length; i++) {
        if (postfix === videoFormat[i]) {
            return true;
        }
    }
    return false;
}

function generateCDNUrl(url, config) {
    let key = config["key"];
    let timestamp = (Math.floor(Date.now() / 1000) + config["expire"]).toString(16);
    let host = config["host"];

    let encodeUrl = hex_md5(key + encodeURI(url) + timestamp);

    return host + url + "?sign=" + encodeUrl + "&t=" + timestamp;
}