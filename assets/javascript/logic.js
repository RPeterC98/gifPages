$(document).ready(function(){
    var buttonArray = ["bird","mastiffs","boxers","tigers", "lions","bears","eagles","cats","salamanders","elephants","cows","pigs","mice","hawks","chimps","gorillas","jaguars","apes",]
    for(i = 0;  i < buttonArray.length; i++)
    {
        var newBtn = $("<button>")
        newBtn.addClass("gifButton")
        newBtn.html(buttonArray[i])
        $("#buttonList").append(newBtn)
    }

    $("#buttonList").on("click", ".gifButton", function() {
        $("#gifList").empty();
        var query = $(this).text();
        console.log(query);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          query + "&api_key=dc6zaTOxFJmzC&limit=12";
    
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
            console.log(results);
    
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class='item'>");
    
              var rating = results[i].rating;
    
              var p = $("<p>").text("<-- Rating: " + rating);
    
              var personImage = $("<img>");
              personImage.attr("src", results[i].images.fixed_height_still.url)
              personImage.attr("still", results[i].images.fixed_height_still.url)
              personImage.attr("moving", results[i].images.fixed_height.url)              
              personImage.addClass("gifs")
              
              console.log(personImage);
    
              gifDiv.prepend(p);
              gifDiv.prepend(personImage);
    
              $("#gifList").prepend(gifDiv);
            }
          });
      });

      $("#gifList").on("click", ".gifs", function() {
          if($(this).attr("src") == $(this).attr("still"))
          {
              $(this).attr("src", $(this).attr("moving"))
          }
          else if($(this).attr("src") == $(this).attr("moving"))
          {
              $(this).attr("src", $(this).attr("still"))
          }
      })

    $("#searchButton").on("click", function(){
        var newBtn = $("<button>")
        newBtn.addClass("gifButton")
        newBtn.html($("#searchBar").val())
        $("#buttonList").append(newBtn)
    })

})
