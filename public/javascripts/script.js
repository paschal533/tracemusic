document.addEventListener("DOMContentLoaded", getTrending);

var displaySearchResult = document.getElementsByClassName('display-searchresult');
var removeSpinner = document.getElementsByClassName('spinner');
var displayResults = document.getElementsByClassName('searchresult-section');
var trendingSpinner = document.getElementsByClassName('spinner-border');

 
 function getTrending() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
           ShowTrending(xmlHttp.responseText);
    }
    xmlHttp.open("GET", 'https://warm-escarpment-74744.herokuapp.com/'+'https://api.deezer.com/chart/0', true); // true for asynchronous 
    xmlHttp.send(null);

}

function ShowTrending(response){
    let results=JSON.parse(response);
    let json = results.tracks.data;
    if(json.items==null||json.items.length==null){
      console.log("trending not found");
    }
    var temp;
    
       temp =  '<div class="carousel-item">'+
       '<div class="card d-block w-100" >'+
          '<img src="IMAGE_URL" class=" d-block w-100 card-img-top" alt="TITLE">'+
          '<div class="card-body">'+
            '<h5 class="card-title">TITLE- ARTIST_NAME</h5>'+
            '<a href="URL" class="btn btn-block btn-primary px-2">PLAY PREVIEW</a><br>'+
            '<button type="button" class="btn btn-block btn-danger px-2" onclick="SearchTrending(`TITLE-ARTIST_NAME`)">Download Song</button>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '</div><br><br>';
    
     
    let conta = this.document.getElementsByClassName('my-slick')[0];
    for(let i=0;i<json.length;i++){
        let copy = temp;
  
        image_url = json[i].album.cover_xl;
        title = json[i].title;
        artist_name = json[i].artist_name;
        vid = json[i].id;
        url = json[i].preview;

  
        /*Sequence of $ in template, replaces one at a time */
        temp = temp.replace(/IMAGE_URL/g,image_url);
        temp = temp.replace(/TITLE/g,title);
        temp = temp.replace(/URL/g,url);
        temp = temp.replace(/ARTIST_NAME/g,artist_name);
        temp = temp.replace(/VIDEO_ID/g,vid);


        //trendingSpinner[0].classList.toggle('display-none');
        conta.innerHTML+=temp;
        temp=copy;

    }
  };
   /*search function */
 function Search(){
    displaySearchResult[0].classList.toggle('show');
    let q = this.document.getElementById('search').value;
    console.log(q);
    q=encodeURIComponent(q);
    let elements = this.document.getElementsByClassName('del');
    console.log(elements);
    while(elements.length>0){
        elements[0].remove();
        console.log(elements);
    }
    console.log(elements);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            ShowResults(xmlHttp.responseText);
    }
    xmlHttp.open("GET", '/youtube/'+q, true); // true for asynchronous 
    xmlHttp.send(null);  
 }

  /*trendingsearch function */
 function SearchTrending(songName){
   if(songName.length > 3){
    displaySearchResult[0].classList.toggle('show');
    let q = songName;
    console.log(q);
    q=encodeURIComponent(q);
    let elements = this.document.getElementsByClassName('del');
    console.log(elements);
    while(elements.length>0){
        elements[0].remove();
        console.log(elements);
    }
    console.log(elements);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            ShowResults(xmlHttp.responseText);
    }
    xmlHttp.open("GET", '/youtube/'+q, true); // true for asynchronous 
    xmlHttp.send(null);  
 } 
}


function ShowResults(response){
  let json=JSON.parse(response);
  if(json.items==null||json.items.length==null){
    console.log("YOUTUBE API Key NOT SET, using dummy data");
  }else {
     console.log('found');
  }


  var template = '<div class="row mb-5 del">'+
    '<div class="col-lg-8 mx-auto">'+
      '<div class="bg-white p-5 rounded shadow">'+
        '<div class="card text-whit bg-dar mb-3" style="">'+
          '<div class="row no-gutters">'+
            '<div class="col-md-4">'+
              '<a href="YOUTUBE_URL"target="_blank">'+
              '<img src="THUMBNAIL_URL"'+
              'width="100%"height="100%"'+
              'class="card-img" alt="...">'+
              '</a>'+
            '</div>'+
            '<div class="col-md-8">'+
              '<div class="card-body border-dark">'+
                '<a href="YOUTUBE_URL"target="_blank"><h5 class="card-title">TITLE</h5></a>'+
                '<div class="">'+
                  '<button type="button" class="btn btn-primary px-2"onclick="DownloadAudio(`VIDEO_ID`,`TITLE`)">Download Song</button><br><br>'+
                  '<button type="button" class="btn btn-success px-2"onclick="DownloadVideo(`VIDEO_ID`,`TITLE`)">Download Video</button>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div><br><br>';
   
  

     
  let searchresultSection = this.document.getElementsByClassName('searchresult-section')[0];
  for(let i=0;i<json.items.length;i++){
      let copy = template;

      thumbnail_url = json.items[i].snippet.thumbnails.default.url;
      title = json.items[i].snippet.title;
      channel = json.items[i].snippet.channelTitle;
      desc = json.items[i].snippet.description;
      vid = json.items[i].id.videoId;

      /*Sequence of $ in template, replaces one at a time */
      template = template.replace(/YOUTUBE_URL/g,`https://www.youtube.com/watch?v=${json.items[i].id.videoId}`);
      template = template.replace(/THUMBNAIL_URL/g,thumbnail_url);
      template = template.replace(/TITLE/g,title);
      template = template.replace(/CHANNEL/g,channel);
      template = template.replace(/DESCRIPTION/g,desc);
      template = template.replace(/VIDEO_ID/g,vid);

      searchresultSection.innerHTML+=template;
      template=copy;  

      removeSpinner[0].classList.toggle('display-none');
      displayResults[0].style.display = 'inline-block';
       
    
  }
}
function DownloadAudio(vid,name){
  console.log(vid);
  console.log(name);
  vid=encodeURIComponent(vid);
  name=encodeURIComponent(name);
  let url = window.location.href+'youtube/download/audio/'+vid+'/'+name;//For Production 
  window.open(
    url,
    "_blank");
}
function DownloadVideo(vid,name){
  console.log(vid);
  console.log(name);
  vid=encodeURIComponent(vid);
  name=encodeURIComponent(name);
  let url = window.location.href+'youtube/download/video/'+vid+'/'+name;
  window.open(
    url,
    "_blank");
}
