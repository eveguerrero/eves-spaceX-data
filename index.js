const BASE_URL = 'https://api.spacexdata.com/v4/launches'
const launchName = 'Trailblazer'


function renderFetch() {
    fetch(BASE_URL)
    .then(r => r.json())
    .then((launches) => {
        const filteredLaunch = launches.filter((obj) => obj.name === launchName)[0]
        displayLaunch(filteredLaunch)

        displayDropdown(launches)

        addHeartToPage()

        commentEvent()
        
        addComment()
        
    })
}

const displayLatestData = document.querySelector('#display-latest-launch')

function displayLaunch(launch) {
    const old = document.getElementById('launch-info')
    if(old) {
        old.remove();
    }

    const launchInfo = document.createElement('div')
    launchInfo.id = 'launch-info';
    document.getElementById('launch-container').appendChild(launchInfo);

    

    const launchName = document.createElement('h2')
    launchName.textContent = launch.name;
    launchInfo.appendChild(launchName);

    const picture = document.createElement('img');
    picture.id = 'pic'
    picture.className = 'pic'
    picture.src = launch.links.patch.small
    launchInfo.appendChild(picture)

    const id = document.createElement('p');
    id.textContent = `Launch ID: ${launch.id}`
    launchInfo.appendChild(id)

    const success = document.createElement('p');
    success.textContent = `Success: ${launch.success}`
    launchInfo.appendChild(success)

    const wikipediaLink = document.createElement('a')
    wikipediaLink.textContent = `Wikipedia Link: ${launch.links.wikipedia}`
    wikipediaLink.href = launch.links.wikipedia
    launchInfo.appendChild(wikipediaLink)

    const details = document.createElement('p');
    details.textContent = `Details: ${launch.details}`
    launchInfo.appendChild(details)

    const date_local = document.createElement('p');
    date_local.textContent = `Date: ${launch.date_local}`
    launchInfo.appendChild(date_local)

    const video = document.createElement('div');
    video.innerHTML = '<iframe width="400" height="250" src="//www.youtube.com/embed/' + launch.links.youtube_id + '" frameborder="0" allowfullscreen></iframe>'
    // video.width = 500
    // const srcElement = document.createElement('source')
    // srcElement.src = `${launch.links.webcast}`
    // srcElement.type = 'video/mp4'
    // video.appendChild(srcElement);
    // video.textContent = `Video: ${launch.links.webcast}`
    launchInfo.appendChild(video)
}

function displayDropdown(launches) {
    const dropDownList =  document.getElementById('drop-down-list')
    launches.map(launch => {
        const listItem = document.createElement('a');
        listItem.textContent = launch.name;
        listItem.href = '#';
        dropDownList.appendChild(listItem)

        listItem.addEventListener('click', ()=>{
           displayLaunch(launch);
        })
    })
 }

 //likes button 
function addHeartToPage() {
    const likesCounter = document.querySelector('.likes')
    likesCounter.innerText = `0 likes`

    const likeButton = document.querySelector('.like-button')

    likeButton.addEventListener('click', (e)=> {
        incrementLikes()
    })
}

function incrementLikes() {
    const likesCounter = document.querySelector('.likes')
    const likesCount = likesCounter.innerText.split(' ')[0]
    likesCounter.innerText = `${parseInt(likesCount) + 1} likes`
}
//Comments 

function commentEvent() {
    const commentContainer = document.getElementById('allComments');
    document.getElementById('addComments').addEventListener('submit', (e)=>{
        e.preventDefault();
        addComment();
    });
}


function addComment() {
    const commentContainer = document.getElementById('allComments');
    const commentInput = document.querySelector('#comment')
    const newCommentDiv = document.createElement('div')
newCommentDiv.className = 'post-comment'
    const p = document.createElement('p')
    p.textContent = commentInput.value;
    p.className = 'user-comment'
    console.log(p)
    newCommentDiv.appendChild(p)
    commentContainer.appendChild(newCommentDiv)

    commentInput.value = "";

    
}





document.addEventListener('DOMContentLoaded', renderFetch())