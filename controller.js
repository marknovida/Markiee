import {YoutubeRedesign, UI} from './model.js';

const youtubeRedesign = new YoutubeRedesign();


const ui = new UI();

// tinawag ko lang yung form ito yung form sa may search or input fields
const myform = document.querySelector("#myform");

myform.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchVideo = document.querySelector('#search').value;

    ui.clearBanner();
    ui.clearFields();
    

    if(searchVideo !== ''){
     
        youtubeRedesign.getLatestVideo(searchVideo).then((data) => {
            console.log(data);
            if(data.pageInfo.totalResults === 0){
                alert("Nothing Found. Please Try Again!");
                ui.clearBanner();
                ui.clearFields();
            } else {
                ui.showResult(data);
                
            }
        });
    }
});

