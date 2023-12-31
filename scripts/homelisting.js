//Tech Tip B01b used for this code


// Variable to count iterations through the loop
var count = -1;

// This function loads the user's listings and two 'browse' listings onto the page
async function doAll() {

    // Loop through all of the listing data
    const listingsRef = db.collection('listings').orderBy("last_updated", "desc");
    const snapshot = await listingsRef.get();
    snapshot.forEach(doc => {

        // Get the info of the current user from firestore
        db.collection("users").doc(firebase.auth().currentUser.uid).get().then(test => {

            // Get the users listings
            var postinglist = test.data().myposts;
            let ownPost = false;

            // Compare to see if each post is the user's or not
            for (let i = 0; postinglist && i < postinglist.length; i++) {
                let currentPost = postinglist[i];

                // Create a listing on the page under browsing if the listing is not the user's
                if (doc.id == currentPost) {
                    ownPost = true;
                }
            }
            
            // If count is less than 3 and it's not the user's own post,
            // add a listing to the page (ensures there are only 2 listings)
            if ((!ownPost && count > -3)) {
                // Populate the listings
                addListings(doc, count);
                count--;
            }
        })

        // Get the info of the current user from firestore
        db.collection("users").doc(firebase.auth().currentUser.uid).get().then(test => {

            // Get the users listings
            var postinglist = test.data().myposts;

            // If they have listings then populate the page
            if (postinglist && postinglist.length > 0) {

                addYourListings(postinglist, doc);
                    
                // If they don't have listings, print out a message
            } else {
               
                // If the user doesn't have listings, print out a message
                noListings();
            }

        });
    })

    // Add event listener to your listings text to go to your listings page
    document.getElementById("yourListingsHeader").addEventListener("click", function () {
        window.location.href = "./listings.html";
    })

    // Add event listener to browse text to go to browse page
    document.getElementById("browseHeader").addEventListener("click", function () {
        window.location.href = "./browsing.html";
    })
};

// Adds listings that are not the user's
function addListings(doc, count) {
    // Create a listing div
    var listing = document.createElement("div");
    listing.setAttribute("class", "list");
    listing.setAttribute("id", "listing" + count);

    // If a listing is clicked, open the listing page and set var1= the doc id
    // The doc id is used to ensure the data from that listing populates the page
    listing.onclick = function link() {
        window.location = "listing.html?var1=" + doc.id;
    }

    // Create sections to hold data
    var backgroundColor = document.createElement("div");
    backgroundColor.setAttribute("class", "bkgClr");
    var productName = document.createElement("p");
    productName.setAttribute("class", "prodName");
    productName.setAttribute("id", "productName" + count);
    var userName = document.createElement("p");
    userName.setAttribute("class", "userName");
    userName.setAttribute("id", "userName" + count);
    var price = document.createElement("p");
    price.setAttribute("class", "price");
    price.setAttribute("id", "price" + count);
    var information = document.createElement("p");
    information.setAttribute("class", "info");
    information.setAttribute("id", "information" + count);

    // Add the sections to the listing div
    listing.appendChild(backgroundColor);
    listing.appendChild(productName);
    listing.appendChild(userName);
    listing.appendChild(price);
    listing.appendChild(information);

    //add the listing to the page
    document.getElementById("homeListings").appendChild(listing);

    //get the image to use for the listing
    let image = doc.data().image;

    // Update info on the listing
    document.getElementById("productName" + count).innerHTML = doc.data().foodName;
    document.getElementById("userName" + count).innerHTML = doc.data().user;
    document.getElementById("information" + count).innerHTML = doc.data().foodDescription;
    document.getElementById("price" + count).innerHTML = "$" + doc.data().foodPrice;
    document.getElementById("listing" + count).style.backgroundImage = "url(" + image + ")";
}

// Adds your own listings to the page
function addYourListings(postinglist, doc){
    // Compare to see if each post is the user's or not
    for (let i = 0; i < postinglist.length; i++) {
        let currentPost = postinglist[i];
        
        // Create a listing on the page if the listing is the user's
        if (doc.id == currentPost) {

            // Create a listing div
            var listing = document.createElement("div");
            listing.setAttribute("class", "list");
            listing.setAttribute("id", "listing" + i);

            // If a listing is clicked, open the listing page and set var1= the doc id
            // The doc id is used to ensure the data from that listing populates the page
            listing.onclick = function link() {
                window.location = "listing.html?var1=" + doc.id;
            }

            // Create sections to hold data
            var backgroundColor = document.createElement("div");
            backgroundColor.setAttribute("class", "bkgClr");
            var productName = document.createElement("p");
            productName.setAttribute("class", "prodName");
            productName.setAttribute("id", "productName" + i);
            var userName = document.createElement("p");
            userName.setAttribute("class", "userName");
            userName.setAttribute("id", "userName" + i);
            var price = document.createElement("p");
            price.setAttribute("class", "price");
            price.setAttribute("id", "price" + i);
            var information = document.createElement("p");
            information.setAttribute("class", "info");
            information.setAttribute("id", "information" + i);

            // Add the sections to the listing div
            listing.append(backgroundColor);
            listing.appendChild(productName);
            listing.appendChild(userName);
            listing.appendChild(price);
            listing.appendChild(information);

            //add the listing to the page
            document.getElementById("yourListings2").appendChild(listing);

            //get the image to use for the listing
            let image1 = doc.data().image;

            // Update info on listing
            document.getElementById("productName" + i).innerHTML = doc.data().foodName;
            document.getElementById("userName" + i).innerHTML = doc.data().user;
            document.getElementById("information" + i).innerHTML = doc.data().foodDescription;
            document.getElementById("price" + i).innerHTML = "$" + doc.data().foodPrice;
            document.getElementById("listing" + i).style.backgroundImage = "url(" + image1 + ")";
}}}

// If the user has no listings, puts text on the page
function noListings(){
    var noListings = document.createElement("p");
    noListings.setAttribute("id", "noListings");
    document.getElementById("yourListings2").appendChild(noListings);
    document.getElementById("noListings").innerHTML = "You do not have any listings currently!" + "<br/>" 
    + "To add a new listing, click the + button in the bottom right corner.";
}

doAll();