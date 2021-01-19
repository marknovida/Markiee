class YoutubeRedesign { 
    async getLatestVideo(userInput){
         
        const myapi = 'AIzaSyDCouGzl-pxHHU96UDbpzJg__-l7mifZoU';
        
        const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${userInput}&key=${myapi}&maxResults=15`);
        
        const videoName = await videoResponse.json();
        return videoName;
    }
}


class UI {
    constructor(){ 
        this.result = document.querySelector("#playing"); 
        this.input = document.querySelector("#search"); 
        this.videoTitle = document.querySelector("#title");
        this.channelTitle = document.querySelector("#channel");
        this.videoDescription = document.querySelector("#description");
        this.otherVideos = document.querySelector("#other");
    }


    showResult(userInput){
        
        this.result.innerHTML = `
        <iframe id="responsive" class="embed-responsive-item" height="420" width="644"  src="https://www.youtube.com/embed/${userInput.items[0].id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
           `;
        this.videoTitle.innerHTML = `${userInput.items[0].snippet.title}`;
        this.channelTitle.innerHTML = `&emsp;${userInput.items[0].snippet.channelTitle}`;
        this.videoDescription.innerHTML = `${userInput.items[0].snippet.description}`;
        this.otherVideos.setAttribute("src", `${userInput.items[0].snippet.thumbnails.high.url}`);

        userInput.items.forEach(function(item, i){
            
            const otherVids = document.querySelector("#other");
            var videoContainer = document.createElement("div");
            
            videoContainer.setAttribute("id", "video-container"+ `${i}`);
            
            videoContainer.setAttribute("class", "video-container");
            videoContainer.setAttribute("data-title", `${userInput.items[i].snippet.title}`);
            videoContainer.setAttribute("data-key", `${userInput.items[i].id.videoId}`);

            videoContainer.setAttribute("data-channelTitle", `${userInput.items[i].snippet.channelTitle}`);

            videoContainer.setAttribute("data-description", `${userInput.items[i].snippet.description}`.substr(0, 150) + " ...");
            
            videoContainer.setAttribute("data-image", `${userInput.items[i].snippet.thumbnails.high.url}`);
            
            //
            videoContainer.setAttribute("onclick", "callme(this.getAttribute('data-key'), this.getAttribute('data-channelTitle'), this.getAttribute('data-description'), this.getAttribute('data-image'), this.getAttribute('data-title'));");
            videoContainer.innerHTML = `<img class="img" id="other-video-img${i}" src="${userInput.items[i].snippet.thumbnails.default.url}"/><p class="d-inline" id="other-video-title${i}">${userInput.items[i].snippet.title.substr(0,36)}</p>`;

            otherVids.appendChild(videoContainer);
            

        });



    }

    clearBanner(){
        this.result.innerHTML = ''; 
    }

    
    
    clearFields(){
        this.input.value = '';
    }
}

export {YoutubeRedesign, UI}