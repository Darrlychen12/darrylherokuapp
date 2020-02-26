let data = fetch("/add").then((res) => {
  return res.json();
}).then((data) => {
  console.log(data);
  if(data.length != 0) {
    data.forEach((artist) => {
      addArtist(artist.artist, artist.about,artist.url,false);
    })
  }
})

const deleteUser = (event,name,url,about) => {
  let artist =  {'artist': name, 'about': about, 'url':url};

  fetch('/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(artist)
  }).then(res => {
    console.log(res)
  })
  event.target.parentNode.parentNode.remove();
};

function createUserTemplate(name, about, url){
  return `<div class="artists_item">
  <div class="artists_item_left">
    <img
      src="${url}"
      alt="img"
    />
  </div>
    <div class="artists_item_description">
      <h3>${name}</h3>
      <p>${about}</p>
    </div>
    <div>
      <button class="delete" onclick="deleteUser(event, '${name}','${url}','${about}')">Delete</button>
    </div>
</div>`;
};




function addArtist(name=null,about=null,url=null, store=true) {
    
    content = document.getElementById('artists_items')
    name = name? name: document.getElementById('artist').value;
    about = about? about: document.getElementById('about').value;
    url = url? url: document.getElementById('imageurl').value;
    

    if (store){
      let artist =  {'artist': name, 'about': about, 'url':url};
      fetch('/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(artist)
      }).then(res => {
        console.log(res)
      })
    

    }
    user = createUserTemplate(name,about, url);
    content.insertAdjacentHTML('beforeend', user);
    document.getElementById('imageurl').value = "";
    document.getElementById('about').value="";
    document.getElementById('artist').value="";


}



function searchArtist(){

    let term = document.getElementById('text').value.toUpperCase()
    let content  = document.querySelectorAll('h3');
    if(term != ""){
      for (i = 0; i < content.length; i++) {
        if(content[i].innerText.toUpperCase().search(term) < 0){
          content[i].parentNode.parentNode.setAttribute('style', 'display: none');

        }else{

          let val = document.querySelector('.artists_item_left')
          content[i].parentNode.parentNode.setAttribute('style', 'display: flex');
          content[i].parentNode.parentNode.setAttribute('style',val);
  
        }
      }
    }else{
      for (i = 0; i < content.length; i++) {
        let val = document.querySelector('.artists_item_left')
        content[i].parentNode.parentNode.setAttribute('style', 'display: flex');
        content[i].parentNode.parentNode.setAttribute('style',val);
      }
    }
}


function toggle(){
    let x = document.getElementById('artists_hidden');
    if (!x.style.display) {
      x.style.display = 'none';
    }
    if (x.style.display == 'none') {
      x.style.display = 'flex';
      x.style.flexDirection = 'column';
      x.style.alignItems = 'center';
    } else {
      x.style.display = 'none';
    }
}




