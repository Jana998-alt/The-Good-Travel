"usestrict";

let placeName = document.getElementById('placeName');
let tripPlace = document.getElementById('tripPlace');
let transport = document.getElementById('transport');
let submitBtn = document.getElementById('submitBtn');

let smallContainer = document.getElementById('smallContainer');

submitBtn.addEventListener('click', handleSubmit);


// variables
let newTrip, tripDisplayed, locationDiv, locationPic, infolist, infoOne, infoTwo, infoThree; 




// handleSubmit
function handleSubmit(event){
    event.preventDefault();
    // getting values & instantiate object
        newTrip = new Trip(placeName.value, tripPlace.value, transport.value);
        console.log(newTrip);


    //storing in local storage
    localStorage.setItem(newTrip.placeName,JSON.stringify(newTrip));
    location.reload();
}



// constructor function

function Trip(placeName,tripPlace,transport) {
    this.placeName = placeName;
    this.tripPlace = tripPlace;
    this.transport = transport;
}


// proto type for including image to the object
Trip.prototype.image = function (){
    this.pic = `../img/${this.tripPlace.toUpperCase()}.png`;
}


// display local storage elements (parse)

function displayTrips(){
    //parse from local storage
    for(let i=0; i<localStorage.length; i++){
        tripDisplayed = JSON.parse(localStorage.getItem(localStorage.key(i)));
        // reinstantiate the object to include the prototype function (image)
        tripDisplayed = new Trip(tripDisplayed.placeName,tripDisplayed.tripPlace,tripDisplayed.transport);
        tripDisplayed.image();



        //display in document
        locationDiv = document.createElement('div');
        locationDiv.setAttribute("class", "locationDiv");
        smallContainer.appendChild(locationDiv);

        locationPic = document.createElement('img');
        locationPic.setAttribute("src", tripDisplayed.pic);
        locationDiv.appendChild(locationPic); 

        infolist = document.createElement('ul');
        infolist.setAttribute('class', 'infoClass'); 
        locationDiv.appendChild(infolist);

        infoOne = document.createElement('li');
        infoOne.textContent= `Place name: ${tripDisplayed.placeName}`; 
        infolist.appendChild(infoOne);
        console.log(infoOne);

        infoTwo = document.createElement('li');
        infoTwo.textContent = `Trip place: ${tripDisplayed.tripPlace}`; 
        infolist.appendChild(infoTwo);

        infoThree = document.createElement('li');
        infoThree.textContent = `Type of transport: ${tripDisplayed.transport}`; 
        infolist.appendChild(infoThree);


    }


}

displayTrips();