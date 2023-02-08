import React,{useState, useEffect} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Details() {
    const id = useParams();
    const [movieDetails, setMovieDetails] = useState("");
    const GetmovieDetails = async() =>{
        const moviesRequestID = await axios.get(
           `http://www.omdbapi.com/?i=${id.id}&apikey=5fbf347`
        );
        // con
        // console.log("hit");
        // console.log(moviesRequestID.data);
        setMovieDetails(moviesRequestID.data);
    }
    // console.log({movieDetails.title});
    useEffect(()=>{
        GetmovieDetails();
    },[])
    // console.log(id)

    // movies
    // localstorage.setItem("key",JSON.stringify(movies));
    return(
        <>
        {
            movieDetails?
            <>
            <h1 style={{alignText:'center'}}>MOVIE DETAILS</h1>
            {/* console.log({id.id}); */}
            <div style={{display:'flex'}}>
            <div style={styles.card}>
            <img src={movieDetails.Poster}/>
            </div>
            <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{width:'100%',display:'flex',justifyContent:'space-evenly',flexWrap:'wrap'}}>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <h2 style={{fontSize:'2.5rem'}}>
                        Title
                    </h2>
                    <p style={{fontSize:'2rem'}}>{movieDetails.Title}</p>
                </div>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <h2 style={{fontSize:'2.5rem'}}>Year</h2>
                    <p style={{fontSize:'2rem'}}>{movieDetails.Year}</p>
                </div>
                <div style={{display:'flex', flexDirection:'column'}} >
                    <h2 style={{fontSize:'2.5rem'}}>IMDB ID</h2>
                    <p style={{fontSize:'2rem'}}>{movieDetails.imdbID}</p> 
                </div>
            </div> 
            <div style={{width:'100%',display:'flex',justifyContent:'space-evenly',flexWrap:"wrap"}}>
                <div style={{display:'flex', flexDirection:'column',maxWidth:"30%"}} >
                    <h2 style={{fontSize:'2.5rem'}}>Rated</h2>
                    <p style={{fontSize:'2rem'}}>{movieDetails.Rated}</p> 
                </div> 
                <div style={{display:'flex', flexDirection:'column',maxWidth:"30%"}} >
                    <h2 style={{fontSize:'2.5rem'}}>Genre</h2>
                    <p style={{fontSize:'2rem'}}>{movieDetails.Genre}</p> 
                </div> 
                <div style={{display:'flex', flexDirection:'column',maxWidth:"30%"}} >
                    <h2 style={{fontSize:'2.5rem'}}>Director</h2>
                    <p style={{fontSize:'2rem'}}>{movieDetails.Director}</p> 
                </div> 
                <div style={{display:'flex', flexDirection:'column',maxWidth:"30%"}} >
                    <h2 style={{fontSize:'2.5rem'}}>Actors</h2>
                    <p style={{fontSize:'2rem'}}>{movieDetails.Actors}</p> 
            </div> 
            </div> 
            </div>               
            </div>
            </>
            :'Loading'
        }
        </>
    )
}
const styles = {
    card: {
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        marginBottom: "30px",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green"
        boxShadow: "0px 1px 5px 5px rgb(0,0,0)"
    }
} 
