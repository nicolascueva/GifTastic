$(document).ready(function () {
    ///array of bands to be displayed as buttons
    var topics = ["Johnny Cash", "Black Sabbath", "Judas Priest", "Metallica", "Pantera", "Pearl Jam", "Audioslave", "Iron Maiden"];



    ///// On button clicks displayBand is run. See onclick on bottom of page
    function displayBand() {
        $("#band").empty(); ////clears/copies over the previous 10 gifs
        var band = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + band + "&api_key=rtmXKMWmK8ReLdMOjJpmJf9j41YaVLyq&limit=10&lang=en";
        //// the var band lets us assign different search terms for each corresponding button click (data-name)

        // Creating an AJAX call for the specific band button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (getGifs) {
            console.log(getGifs);

            // storing the data from the AJAX request in the results variable
            var results = getGifs.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var bandDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var gifRating = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var bandImage = $("<img>");
                bandImage.addClass("freeze");
                // Setting the src attribute of the image to a property pulled off the result item
                bandImage.attr("src", results[i].images.fixed_height_still.url);
                var still = results[i].images.fixed_height_still.url;
                var animate = results[i].images.fixed_height.url;
                bandImage.attr("data-state", "still");
                bandImage.attr("data-animate", animate);
                bandImage.attr("data-still", still);

                // Appending the paragraph and image tag to the bandDiv
                bandDiv.append(gifRating);
                bandDiv.append(bandImage);

                // Prependng the bandDiv to the HTML page in the "#band" div
                $("#band").append(bandDiv);
            }
        });
    }




    // Function for displaying movie data
    function showButtons() {

        // Deleting the bands prior to adding new bands
        // (this is necessary otherwise you will have repeat buttons)
        $("#bandButtons").empty();

        // Looping through the array of bands
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each band in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var addButtons = $("<button>");
            // Adding a class of band-btn to our button
            addButtons.addClass("band-btn");
            // Adding a data-attribute
            addButtons.attr("data-name", topics[i]);
            // Providing the initial button text
            addButtons.text(topics[i]);
            // Adding the button to the bandButtons div
            $("#bandButtons").append(addButtons);
        }
    }

    // This function handles events where a movie button is clicked
    $("#addBand").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newBand = $("#band-input").val().trim();

        // Adding movie from the textbox to our array
        topics.push(newBand);

        // Calling renderButtons which handles the processing of our movie array
        showButtons();
        //$("#band-input").empty()
    });




    ///adds an event listner for all the buttons to run displayBand function on click
    $(document).on("click", ".band-btn", displayBand);

    $(document).on("click", ".freeze", function () {
        var state = $(this).attr("data-state");
        var unfreeze = $(this).attr("data-animate");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


    ////runs the function to show the array of buttons whenthe page first loads
    showButtons();



});