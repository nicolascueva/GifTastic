$(document).ready(function () {
    ///array of bands to be displayed as buttons
    var topics = ["Johnny Cash", "Black Sabbath", "Judas Priest", "Metallica", "Pantera", "Santana", "Audioslave", "Iron Maiden"];

    // Function for displaying movie data
    function showButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#bandButtons").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var addButtons = $("<button>");
            // Adding a class of band-btn to our button
            addButtons.addClass("band-btn");
            // Adding a data-attribute
            addButtons.attr("data-name", topics[i]);
            // Providing the initial button text
            addButtons.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#bandButtons").append(addButtons);
        }
    }

    showButtons();











});