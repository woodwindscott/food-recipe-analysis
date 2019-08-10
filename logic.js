$(document).ready(function() {

    recipeAppID = "36ebdbad";
    recipeAPIKey = "6800e54637175837e7457dddad91fdf9";
    

    $("#submit").on("click", function(event) {

        event.preventDefault();

        $(".display-recipes").empty();

        var queryTerm = $("#search-terms").val().trim();
        // recipeQueryURL = "https://api.edamam.com/search?q=chicken&app_id=$" + recipeAppID + "&app_key=$" + recipeAPIKey + "&from=0&to=3&calories=591-722&health=alcohol-free";
        recipeQueryURL = "https://api.edamam.com/search?q=" + queryTerm + "&app_id=$" + recipeAppID + "&app_key=$" + recipeAPIKey + "&from=0&to=10";



        $.ajax({
            url: recipeQueryURL,
            method: "GET"
        }).then(function(response) {

            var results = response.hits;

            for (i=0; i < results.length; i++) {

                var divWrapper = $("<div>");

                var imageURL = results[i].recipe.image;

                var myImage = $("<img>");

                myImage.attr("src", imageURL);
                myImage.attr("alt", "my image");
                console.log(results[i].recipe.url);
                console.log(results[i].recipe.label);

                // var recipeName = $("<button>");
                // recipeName.text(results[i].recipe.label);
                // recipeName.addClass("recipeLink");
                // recipeName.attr("data-link", results[i].recipe.url)

                var recipeName = $("<a>");
                recipeName.text(results[i].recipe.label);
                recipeName.addClass("recipeLink");
                recipeName.attr("href", results[i].recipe.url).attr('target','_blank');

                var recipeCalories = $("<span>");
                recipeCalories.text("Calories: " + Math.floor(results[i].recipe.calories) + ". ");

                var recipeServings = $("<span>");
                recipeServings.text("Servings: " + results[i].recipe.yield + ".");

                divWrapper.append(myImage, recipeName, recipeCalories, recipeServings);
                $(".display-recipes").append(divWrapper);

            }

        });

    // End of onclick function for submit button
    });

});