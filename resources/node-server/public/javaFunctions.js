function printMovies(movies){
	var print = "<tr>";
	for (i = 0; i < movies.length; i++){
		print += '<td><img class=posters onclick="return selectMovieDesc(' + movies[i].id + ');" src="' + movies[i].poster + '"width="20%"></td>';
	}
	print += "</tr>";
	return print;
}

function printlastN(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			var movies = JSON.parse(this.responseText, dateReviver);
			var to_print = printMovies(movies);
			document.getElementById("trailers").innerHTML = to_print;	
		}
	};
	xhttp.open("GET", "/api/movies/?limit=4", true);
	xhttp.send();
}

function printAll(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			var movies = JSON.parse(this.responseText, dateReviver);
			var to_print = printMovies(movies);
			document.getElementById("trailers-all").innerHTML = to_print;
		}
	};
	xhttp.open("GET", "/api/movies/", true);
	xhttp.send();

	return false;	
}

function printRecent(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			var movies = JSON.parse(this.responseText, dateReviver);
			var to_print = printMovies(movies);
			document.getElementById("trailers-all").innerHTML = to_print;	
		}
	};
	xhttp.open("GET", "/api/movies/?order=released&limit=5", true);
	xhttp.send();

	return false;	
}

function printPopular(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			var movies = JSON.parse(this.responseText, dateReviver);
			var to_print = printMovies(movies);
			document.getElementById("trailers-all").innerHTML = to_print;	
		}
	};
	xhttp.open("GET", "/api/movies/?order=rating&limit=5", true);
	xhttp.send();

	return false;	
}

function printWord(word){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			var movies = JSON.parse(this.responseText, dateReviver);
			var to_print = printMovies(movies);
			document.getElementById("trailers-all").innerHTML = to_print;	
		}
	};
	xhttp.open("GET", "/api/movies/?search=" + word, true);
	xhttp.send();

	return false;
}

function printFilterGenre(word){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			var movies = JSON.parse(this.responseText, dateReviver);
			var to_print = printMovies(movies);
			document.getElementById("trailers-all").innerHTML = to_print;	
		}
	};
	xhttp.open("GET", "/api/movies/?genre=" + word, true);
	xhttp.send();

	return false;
}

function buildURL(base, key, value){
	var sep = (base.indexOf('?') > -1) ? '&' : '?';
	return base + sep + key + '=' + value;
}
function selectMovieDesc(mov){
	var buildUrl = buildURL("movieDesc.html","id",mov);
	javascript:window.location.href=buildUrl
	return false;
}

function printGenres(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			var genres = JSON.parse(this.responseText);
			var print = "";
			for (i = 0; i < genres.length; i++){
				print += '<option>' + genres[i] + '</option>';
			}
			$(".genre-select").html(print);	
		}
	};
	xhttp.open("GET", "/api/genres/", true);
	xhttp.send();

	return false;
}

function printDesc(id){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			var print = "";
			var mov = JSON.parse(this.responseText);	
			print += '<section id="left-desc"><article id="datos"><hgroup><h1>' + mov.title + '</h1>';
			print += '<h4>' + mov.genre + '</h4></hgroup>'; 
			print += '<time>' + mov.year + '</time>';
			print += '<p>' + mov.rating + ' stars</p></article>';
			print += '<article><p>' + mov.plot + '</p></article></section>';
			print += '<aside id="right-desc"><article id="img"><figure><img src="' + mov.poster;
			print += '"></figure></article></aside>';
			$('#description').html(print);
		}
	};
	xhttp.open("GET", "/api/movies/" + id, true);
	xhttp.send();

	return false;
}

function createMovie(){
	var newMovie = {
		title: document.getElementById("title").value,
		year: document.getElementById("year").value,
		released: "2016-04-29T00:00:00.0Z",
		genre: $(".genre-select").val(),
		director: "John Doe",
		actors: "Foo Bar, Dolor Sit",
		plot: document.getElementById("plot").value,
		poster: "https://s-media-cache-ak0.pinimg.com/236x/63/35/b3/6335b33481b913f437b4e395cf71f9b6.jpg",
		rating: document.getElementById("rating").value
	};

	$.post("/api/movies",newMovie);
	
	closeModal();
	return false;
}


//Modal functions
function openModal(){
	myModal.style.display = "block";
	return false;
}
function closeModal(){
    myModal.style.display = "none";
    return false;
}

function getURLParameter(name){
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

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
