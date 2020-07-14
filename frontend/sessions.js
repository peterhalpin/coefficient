var url = window.game;
var groups = window.groups;
console.log(url);
console.log(groups);
async function getURLs(url, groups) {
    let response = await fetch('https://oxreg1dkaa.execute-api.us-east-1.amazonaws.com/prod/scraper?url=' + url + '&groups=' + groups);
    let data = await response.json();
    return data;
}

