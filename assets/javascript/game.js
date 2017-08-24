 $( document ).ready(function() {
        // Existing players array, this also holds any new addition that user searched;
        var players = ["Lebron James","Andre Drummond","Paul George","Jimmy Butler", "Chris Paul","Dwyane Wade", "Kyrie Irving", "Tristan Thompson", "JR Smith", "kevin love"];

        // creating function that displays all gif buttons
        function displayButtons(){
            $("#playersGif").empty(); 
            for (var i = 0; i < players.length; i++){
                var playersGifButton = $("<button>");
                playersGifButton.addClass("player");
                playersGifButton.addClass("btn btn-primary")
                playersGifButton.attr("data-name", players[i]);
                playersGifButton.text(players[i]);
                $("#playersGif").append(playersGifButton);
            }
        }
        // Function to add a new action button
        function addNewButton(){
            $("#addGif").on("click", function(){
            var player = $("#searchInput").val().trim();
            if (player === ""){
             // To avoid blank button
              return false; 
            }
            players.push(player);

            displayButtons();
            return false;
            });
        }


        // Function that displays all of the gifs
        function displayGifs(){
            var player = $(this).attr("data-name");
            var queryURL = "https:api.giphy.com/v1/gifs/search?q="+ player+"&limit=10&api_key=0bfc61017ae847cbb9ba701c682dc5d3";
            console.log(queryURL); // displays the constructed url
            $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                console.log(response); 
                // Emptying the div
                $("#gifsViewArea").empty(); 
                var results = response.data; 
                if (results === ""){
                  alert("There isn't a gif for this selected button");
                }
                for (var i=0; i<results.length; i++){
                    //Creating a new placeholder div for the gifs
                    var gifDiv = $("<div>"); 
                    gifDiv.addClass("gifDiv");
                    // pulling rating of gif
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);
                    // pulling gif
                    var gifImage = $("<img>");
                    // still image stored into src of image
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                    // still image
                    gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
                    // animated image
                    gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
                    // set the image state
                    gifImage.attr("data-state", "still"); 
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    // pulling still image of gif
                    // adding div of gifs to gifsView div

                    $("#gifsViewArea").prepend(gifDiv);
                }
            });
        }
        // Calling Functions & Methods
        // displays list of actions already created
        displayButtons(); 
        addNewButton();
        //Event Listeners
        $(document).on("click", ".player", displayGifs);
        $(document).on("click", ".image", function(){
            var state = $(this).attr('data-state');
            if ( state === 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
        });
});
