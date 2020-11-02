import React,{useState, useEffect} from "react"
import YouTube from "react-youtube";
import axios from "./axios"
import movieTrailer from "movie-trailer"


import "./Row.css"

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargerow}){

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() =>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
        }

        fetchData();

    }, [fetchUrl])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            
            autoplay: 1,
        },
    };

    const handleClick = (movie) =>{
        if(trailerUrl){
            setTrailerUrl("")
        } else {
            movieTrailer(movie.title || movie.name || movie.original_name || "862Pb9oDDAo")
            .then(url => {
                console.log(url)
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"))
            }).catch(err => console.log(err))
        }


    }
    console.log(trailerUrl)


    return(
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map(movie => (
                    <img
                         key={movie.id} 
                         onClick = {() => handleClick(movie)}  
                         className={`row__poster ${isLargerow && "row__posterLarge"}`}
                        src={`${base_url}${isLargerow? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
                ))}
            </div>
            {trailerUrl && <YouTube videoId ={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row;