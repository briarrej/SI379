let eventList = [];
let timerID =  null;
//let selectedIndex = 0

getUMEventsWithImages((events)=>{
    console.log(events);
    eventList = events
    const thumbnailsContainer = document.getElementById('thumbnails')
    
    for (let i = 0; i < events.length; i++) {
        let event = eventList[i]
        img = document.createElement('img');
        img.setAttribute('id', `thumb-${event.id}`)
        img.setAttribute('src',event.styled_images.event_thumb);
        thumbnailsContainer.appendChild(img);
        img.addEventListener('click',()=>{
           
            setSelectIndex(i);
        });
        //NOTES
        //. means class
        //# means ID
        //when the list of events is ready, that's when the callback 
        //will be called
    }
    setSelectIndex(0)
});

function setSelectIndex(index){
    const previousThumbnail = document.querySelector('.selected');
    if (previousThumbnail){
        previousThumbnail.classList.remove('selected');
    }

    const newThumbnail = document.querySelector(`#thumb-${eventList[index].id}`);
    if (newThumbnail){

        newThumbnail.classList.add('selected');
    }

    const selectedEvent = eventList[index];
    document.getElementById("selected-title").textContent = selectedEvent.event_title;
    document.getElementById("selected-title").href = selectedEvent.permalink;
    document.getElementById("selected-image").src = selectedEvent.image_url;
    document.getElementById("selected-date").textContent = getReadableTime(selectedEvent.datetime_start);
    document.getElementById("selected-description").textContent = selectedEvent.description;


    clearTimeout(timerID)
    timerID = setTimeout(function() {setSelectIndex((index+1)%eventList.length)}
    ,10000)
    
};

