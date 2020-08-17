//*********************click search-btn to get output*******************************
document.getElementById("search-btn").addEventListener("click", () =>{
  reset()
  const songName = document.getElementById("input-box").value
  fetch(`https://api.lyrics.ovh/suggest/${songName}`)
  .then(res => res.json())
  .then(displayData)
  .catch(err => console.log(err))
})
//********************* search-btn() end*******************************************

//************* search result output into displayData() area************************
function displayData(allData) {
  const data = allData.data
  console.log(data)
  let list =[]
  //put 10 data as object into list-----------------------
  for (let i = 0; i < 10; i++) {
    const item = {
      title: data[i].title,
      albumTitle: data[i].album.title,
      albumImage: data[i].album.cover_small,
      artistName: data[i].artist.name,
      artistPicture: data[i].artist.picture_small,
      albumDuration: data[i].duration, 
    }
    list.push(item)
    console.log(list) 
  }
//*********** showing output result as html into displayResults area***************
  let displayResults = document.getElementById("output")
  displayResults.innerHTML = ""
  displayResults.style.display = 'block'
  for (let i = 0; i < list.length; i++) {
    let {title, albumTitle, albumImage, artistName, artistPicture, albumDuration} = list[i];
    
    displayResults.innerHTML += 
      `<div class="single-result row align-items-center my-3 p-3">
          <div class="col-md-6">
              <h3 class="lyrics-name mb-3">${title}</h3>
              <p class="author lead">Artist: <span style="font-weight:600">${artistName}</span></p>
              <p style="margin-top: -15px;" class="author lead">Album: <span style="font-weight:600">${albumTitle}</span></p>
              <p style="margin-top: -15px;" class="author lead">Album duration: <span style="font-weight:600">${albumDuration}</span></p>
          </div>
          <div class="col-md-3">
          <img src="${albumImage}" class="img-fluid rounded-circle">
          <img src="${artistPicture}" class="img-fluid rounded-circle">
          </div>
          <div class="col-md-3 text-md-right text-center">
              <button onclick="getLyrics('${title}', '${artistName}', '${albumImage}', '${artistPicture}')" class="btn btn-success">Get Lyrics</button>
          </div>
      </div>`
  }
}
//********************* displayData() end*******************************************

//********************* getLyrics() function goes here******************************
const getLyrics = (title, artistName, albumImage, artistPicture) =>{
  const fetchUrl = `https://api.lyrics.ovh/v1/${artistName}/${title}`
  console.log(fetchUrl)

  fetch(fetchUrl)
  .then(res => res.json())
  .then(data => displayLyrics(data, title, artistName, albumImage, artistPicture))
  .catch(err => console.log(err))
}

//****************** display lyrics into displayLyrics area**********************
const displayLyrics = (data, title, artistName, albumImage, artistPicture) =>{
  console.log(data)
  const getLyrics = data.lyrics

  document.getElementById("output").style.display = "none"
  document.getElementById("song-img").innerHTML = 
  `<img src="${albumImage}" class="img-fluid rounded-circle">
  <img src="${artistPicture}" class="img-fluid rounded-circle">`
  document.getElementById("title").innerHTML = title
  document.getElementById("artist").innerHTML = "-" + artistName
  document.getElementById("outputLyrics").innerHTML = getLyrics
  
  if (getLyrics == undefined) {
    document.getElementById("outputLyrics").innerHTML = "Sorry! Lyrics not found"
  }
}

//****************** reset() goes here**********************
const reset = () => {
  document.getElementById("song-img").innerHTML = ""
  document.getElementById("title").innerHTML = ""
  document.getElementById("artist").innerHTML = ""
  document.getElementById("outputLyrics").innerHTML = ""
}
