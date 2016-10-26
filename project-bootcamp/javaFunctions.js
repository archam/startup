/*
TODO:
- Fix the printGenres, take only one select-genre with a class id and using jquery to print
- Download the jquery file and put the document.ready function
- Obtener URL para la desc de peliculas

TODO:
- Copiar arreglo con valor sin manera casera de filter
- Arreglar el createMovie segun corresponda con valores propios / quitar el tmp con filter
*/

//Copy the JSON file into a var
var arr = [{"id":1,"title":"Funny People","year":"2009","released":"2009-04-29T00:00:00.0Z","genre":"Comedy, Drama","director":"Judd Apatow","actors":"Adam Sandler, Seth Rogen","plot":"When seasoned comedian George Simmons learns of his terminal, inoperable health condition, his desire to form a genuine friendship causes him to take a relatively green performer under his wing as his opening act.","poster":"http://ia.media-imdb.com/images/M/MV5BMTMxNDQ5MTA5MF5BMl5BanBnXkFtZTcwMzUyMDUwMg@@._V1_SX300.jpg","rating":2},{"id":2,"title":"The Hangover Part II","year":"2011","released":"2011-05-26T00:00:00.0Z","genre":"Comedy","director":"Todd Phillips","actors":"Bradley Cooper, Zach Galifianakis","plot":"Right after the bachelor party in Las Vegas, Phil, Stu, Alan, and Doug jet to Thailand for Stu's wedding. Stu's plan for a subdued pre-wedding brunch, however, goes seriously awry.","poster":"http://ia.media-imdb.com/images/M/MV5BMTM2MTM4MzY2OV5BMl5BanBnXkFtZTcwNjQ3NzI4NA@@._V1_SX320.jpg","rating":3.5},{"id":3,"title":"Fight Club","year":"1999","released":"1999-10-15T00:00:00.0Z","genre":"Drama","director":"David Fincher","actors":"Edward Norton, Brad Pitt","plot":"An insomniac office worker, looking for a way to change his life, crosses paths with a devil-may-care soap maker, forming an underground fight club that evolves into something much, much more...","poster":"http://ia.media-imdb.com/images/M/MV5BMjIwNTYzMzE1M15BMl5BanBnXkFtZTcwOTE5Mzg3OA@@._V1_SX300.jpg","rating":4.5},{"id":4,"title":"Toy Story","year":"1995","released":"1995-01-22T00:00:00.0Z","genre":"Animation, Adventure, Comedy","director":"John Lasseter","actors":"Tom Hanks, Tim Allen","plot":"A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.","poster":"http://ia.media-imdb.com/images/M/MV5BMTgwMjI4MzU5N15BMl5BanBnXkFtZTcwMTMyNTk3OA@@._V1_SX300.jpg","rating":4.2},{"id":5,"title":"Forrest Gump","year":"1994","released":"1994-07-06T00:00:00.0Z","genre":"Drama, Romance","director":"Robert Zemeckis","actors":"Tom Hanks, Rebecca Williams","plot":"Forrest Gump, while not intelligent, has accidentally been present at many historic moments, but his true love, Jenny Curran, eludes him.","poster":"http://ia.media-imdb.com/images/M/MV5BMTI1Nzk1MzQwMV5BMl5BanBnXkFtZTYwODkxOTA5._V1_SX300.jpg","rating":4.3},{"id":6,"title":"Shrek","year":"2001","released":"2001-05-18T00:00:00.0Z","genre":"Animation, Adventure, Comedy","director":"Andrew Adamson","actors":"Mike Myers, Eddie Murphy","plot":"After his swamp is filled with magical creatures, an ogre agrees to rescue a princess for a villainous lord in order to get his land back.","poster":"http://ia.media-imdb.com/images/M/MV5BMTk2NTE1NTE0M15BMl5BanBnXkFtZTgwNjY4NTYxMTE@._V1_SX300.jpg","rating":4.5},{"id":7,"title":"Inglourious Basterds","year":"2009","released":"2009-08-21T00:00:00.0Z","genre":"Adventure, Drama, War","director":"Quentin Tarantino","actors":"Brad Pitt, Christoph Waltz","plot":"In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.","poster":"http://ia.media-imdb.com/images/M/MV5BMjIzMDI4MTUzOV5BMl5BanBnXkFtZTcwNDY3NjA3Mg@@._V1_SX300.jpg","rating":3.9},{"id":8,"title":"Apoclaypse Now","year":"1979","released":"1979-08-15T00:00:00.0Z","genre":"Drama, War","director":"Francis Ford Coppola","actors":"Marlon Brando, Martin Sheen","plot":"During the Vietnam War, Captain Willard is sent on a dangerous mission into Cambodia to assassinate a renegade colonel who has set himself up as a god among a local tribe.","poster":"http://ia.media-imdb.com/images/M/MV5BMTcyMzQ5NDM4OV5BMl5BanBnXkFtZTcwODUwNDg3OA@@._V1_SX300.jpg","rating":3.7},{"id":9,"title":"The Pianist","year":"2003","released":"2003-03-28T00:00:00.0Z","genre":"Biography, Drama, War","director":"Roman Polanski","actors":"Adrien Brody, Emilia Fox","plot":"A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II.","poster":"http://ia.media-imdb.com/images/M/MV5BMTc4OTkyOTA3OF5BMl5BanBnXkFtZTYwMDIxNjk5._V1_SX300.jpg","rating":3.5},{"id":10,"title":"A clockwork Orange","year":"1971","released":"1972-02-02T00:00:00.0Z","genre":"Crime, Drama, Sci-Fi","director":"Stanley Kubrick","actors":"Malcolm McDowell, Patrick Magee","plot":"In future Britain, charismatic delinquent Alex DeLarge is jailed and volunteers for an experimental aversion therapy developed by the government in an effort to solve society's crime problem","poster":"http://ia.media-imdb.com/images/M/MV5BMTY3MjM1Mzc4N15BMl5BanBnXkFtZTgwODM0NzAxMDE@._V1_SX300.jpg","rating":4.7}];

//Parse the array
var str = JSON.stringify(arr);
var allMovies = JSON.parse(str, dateReviver);
var todas = allMovies;

function dateReviver(key, value){
    var a;
    if (typeof value === 'string'){
        a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
        if (a) {
            return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
        }
    }
    return value;
};

var currentMovies = allMovies;

function printlastN(cant){
	var movies = lastNmovies(cant);
	var to_print = printMovies(movies);
	document.getElementById("trailers").innerHTML = to_print;
}

function printAll(){
	var movies = allMovies;
	currentMovies = movies;
	var to_print = printMovies(movies);
	document.getElementById("trailers-all").innerHTML = to_print;
	return false;	
}

function printRecent(){
	var movies = recentMovies(allMovies);
	currentMovies = movies;
	var to_print = printMovies(movies);
	document.getElementById("trailers-all").innerHTML = to_print;	
	return false;
}

function printPopular(){
	var movies = popularMovies(allMovies);
	currentMovies = movies;
	var to_print = printMovies(movies);
	document.getElementById("trailers-all").innerHTML = to_print;	
	return false;
}

function printWord(word){
	var movies = searchMovies(word,currentMovies);
	var to_print = printMovies(movies);
	document.getElementById("trailers-all").innerHTML = to_print;	
	return false;
}

function printFilterGenre(word){
	var movies = searchGenre(word,allMovies);
	currentMovies = movies;
	var to_print = printMovies(movies);
	document.getElementById("trailers-all").innerHTML = to_print;	
	return false;
}

function printMovies(movies){
	var print = "<tr>";
	for (i = 0; i < movies.length; i++){
		print += '<td><img class=posters src="' + movies[i].poster + '"width="20%"></td>';
	}
	print += "</tr>";
	return print;
}


function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function printGenres(){
	var genres = distinctGenres();
	var print = "";
	for (i = 0; i < genres.length; i++){
		print += '<option>' + genres[i] + '</option>';
	}
	document.getElementById("genre-select1").innerHTML = print;
}

function printGenres2(){
	var genres = distinctGenres();
	var print = "";
	for (i = 0; i < genres.length; i++){
		print += '<option>' + genres[i] + '</option>';
	}
	document.getElementById("genre-select2").innerHTML = print;
}

function popularMovies(movies){
	var popMovies = movies.filter(function(obj){return obj.rating>=4});
	return popMovies;
}

function recentMovies(movies){
	var recMovies = movies.filter(function(obj){return obj.year>=2000});
	return recMovies;
}

function genreFilter(obj,word){
	var pos1 = obj.genre.indexOf(word);
	if (pos1 == -1){
		return false;
	}
	else{
		return true;
	}	
}

function wordFilter(obj,word) {
	var pos1 = obj.title.indexOf(word);
	var pos2 = obj.actors.indexOf(word);
	var pos3 = obj.plot.indexOf(word);
	if (pos1+pos2+pos3 == -3){
		return false;
	}
	else{
		return true;
	}
}

function searchMovies(word,movies){
	var searMovies = movies.filter(function(obj){return wordFilter(obj,word)});
	return searMovies;
}

function searchGenre(word,movies){
	var searMovies = movies.filter(function(obj){return genreFilter(obj,word)});
	return searMovies;
}


//A JS function that returns the last N movies created (use the field "released" to sort movies)
function lastNmovies(cant){
	//Copiado a huevo
	var tmp = allMovies.filter(function(obj){return true});
	//Sort the temp array and then reverse it to make the correct order
    tmp.sort(function(a, b){return a.released - b.released});
    tmp.reverse();

	return tmp.slice(0,cant);
};

//A JS function that returns the distinct genres of the movies in the array (duplicates are not accepted)
function distinctGenres(){
	var tmp = allMovies;
	var text = "";
	var gen = [];
	
	//In the new array gen, save all the genres like strings
	for (i = 0; i < tmp.length; i++) {
		gen.push(tmp[i].genre);
	}    

	//Make a unique string with all the gen elements, then split by ", "
	text = gen.toString();
	var text1 = text.split(", ");
	var text2 = text1.toString();

	//Create the arrayOriginal making text2 into array type and then implement algorithm
	var arrayOriginal = text2.split(",");
	var arrayResult = [];
	var arrayResult = arrayOriginal.filter(function(elem, pos){return arrayOriginal.indexOf(elem) == pos;});
	return arrayResult;
};


function printDesc(){
	var print = "";
	print += '<section id="left-desc"><article id="datos"><hgroup><h1>' + allMovies[0].title + '</h1>';
	print += '<h4>' + allMovies[0].genre + '</h4></hgroup>'; 
	print += '<time>' + allMovies[0].year + '</time>';
	print += '<p>' + allMovies[0].rating + ' stars</p></article>';
	print += '<article><p>' + allMovies[0].plot + '</p></article></section>';
	print += '<aside id="right-desc"><article id="img"><figure><img src="' + allMovies[0].poster;
	print += '"></figure></article></aside>';
	//document.getElementById("left-desc").innerHTML = print;
	document.write(print);
}

function createMovie(){
	var title = document.getElementById("title").value;
	var year = document.getElementById("year").value;
	var rating = document.getElementById("rating").value;
	var plot = document.getElementById("plot").value;

	var list = document.getElementById("genre-select2");
	var genre = list.options[list.selectedIndex].value;


	var tmp = allMovies.filter(function(obj){return obj.id==1});
	tmp.id = allMovies.length + 1;
	tmp.title = title;
	tmp.year = year;
	tmp.genre = genre;
	tmp.plot = plot;
	tmp.rating = rating;

	tmp.poster = allMovies[0].poster;

	allMovies.push(tmp);
	return false;
}

function openModal(){
	myModal.style.display = "block";
	return false;
}
function closeModal(){
    myModal.style.display = "none";
    return false;
}
