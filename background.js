chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.get(["blocked", "enabled"], function (local) {
      if (!Array.isArray(local.blocked)) {
        chrome.storage.local.set({ blocked: [] });
      }
  
      if (typeof local.enabled !== "boolean") {
        chrome.storage.local.set({ enabled: false });
      }
    });
  });
  
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
    const url = changeInfo.pendingUrl || changeInfo.url;
    if (!url || !url.startsWith("http")) {
      return;
    }
  
    const hostname = new URL(url).hostname;
    chrome.storage.local.get(["blocked", "enabled"], function (local) {
      const { blocked, enabled } = local;
      if (Array.isArray(blocked) && enabled && blocked.find((domain) => {
         return stringCheck(hostname, domain);
        })) {
        chrome.tabs.update(tabId, {
            url : getImageUrl()
        });
      }
    });
  });

const stringCheck = (s1,s2) => {
    if(s1.length < s2.length) {
        return stringCheck(s2, s1);
    }
    const alphaMap = {};
    let ansToReturn = true;
    ansToReturn = s1.includes(s2);
    // [...s1].forEach((char) => {
    //     if(!alphaMap[char]) {
    //         alphaMap[char] = 1;
    //     } else {
    //         alphaMap[char] = alphaMap[char] + 1;
    //     }
    // });
   
    // for(const char of s2) {
        
    //     if(!alphaMap[char] || alphaMap[char] == 0) {
    //         ansToReturn = false;
    //         break;
    //     }
    //     alphaMap[char] = alphaMap[char] - 1;
    // }
    // console.log(s1, s2, alphaMap, ansToReturn);
    return ansToReturn;
}

const getImageUrl = () => {
    const urlsArray = [
        'https://legacy.lifesize.com/~/media/Images/blog/feature-images/Meme%2015%20-%20This%20is%20going%20to%20be%20a%20waste.ashx?la=en',
        'https://humornama.com/wp-content/uploads/2020/12/Control-Uday-Control-meme-template-of-Welcome-movie.jpg',
        'https://i.chzbgr.com/full/8467370496/h5D4EA4A5/i-has-control',
        'https://i.imgflip.com/1zd262.jpg',
        'https://pics.me.me/under-control-emecrunch-co-under-control-53347910.png',
        'https://memegenerator.net/img/instances/82275053.jpg',
        'https://media.makeameme.org/created/its-all-about-5ae9b5.jpg',
        'https://www.meme-arsenal.com/memes/243595b8f571dab669802153415cc6e8.jpg',
        'https://lh3.googleusercontent.com/proxy/x0gSNVTAxaCKcxU8l9Z2jO3suHxgDedBQW7b5LWC90Qy20yOrkQE6GPxEGpdJJ7enyNUfT4s9rOMTpN79giHMBCQM9QmdebRSmO3pTiWuTn95xpYKSRP0RH48XcESBJFmJ4i0ci1_3OXjdhwAbA3plpLVpghYhz8dz4'
    ];
    const randomIndex = Math.random()*urlsArray.length;
    return urlsArray[Math.floor(randomIndex)];
}