import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { AiFillLike } from 'react-icons/ai';
import { FcNext } from 'react-icons/fc';
import { SiImdb } from 'react-icons/si';
import { IoIosArrowBack } from 'react-icons/io';
import { BsSearch } from 'react-icons/bs';
import { Link } from "react-router-dom";
// import 

export default function Layout() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("avengers");
    const [LikedMovies, SetLikedMovies] = useState([]);
    const [page, setPage] = useState(0);
    const [isClicked, setIsClicked] = useState(Array(10).fill(false));

    const handleClick = (index) => {
        // if(isClicked){
        //     setlikes(likes - 1);
        // }else{
        //     setlikes(likes + 1);
        // }
        setIsClicked(isClicked.map((c, i) => {
            if (i == index) {
                return !c;
            }
            else return c;
        }));

    }

    useEffect(() => {
        getMovies();
    }, []);

    useEffect(() => {
        console.log(LikedMovies)
    }, [LikedMovies]);

    useEffect(() => {
        let arr = localStorage.getItem("LikedMovies");
        if (arr) {
            SetLikedMovies(JSON.parse(arr));
        } else {
            SetLikedMovies([]);
        }
    }, [])

    useEffect(() => {
        console.log(isClicked);
        setMovies([...movies])
    }, [isClicked])

    const getMovies = async () => {
        if (search.length > 3) {
            const moviesRequest = await axios.get(
                `http://www.omdbapi.com/?s=${search}&p=${page}&apikey=2a607171`
            );
            // con
            // console.log("hit");
            setMovies(moviesRequest.data.Search);
            console.log(moviesRequest);
        } else {
            alert("Search String should be > 3");
        }

    }
    const storelikedmovies = (movie) => {
        SetLikedMovies([...LikedMovies, movie])
        localStorage.setItem("LikedMovies", JSON.stringify([...LikedMovies, movie]))

        console.log("liked movies : ", [...LikedMovies, movie]);
    }

    // const deletemovies = (movie) => {

    //     console.log("liked movies : ", [...LikedMovies, movie]);
    // }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', background: 'black', color: 'white', }}>
                <SiImdb style={{ marginTop: '1.5rem', marginRight: '1rem' }} size={35}></SiImdb>
                <h1>IMDB SEARCH APP</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input type="search" placeholder="Search your movie Here" value={search} onChange={(e) => setSearch(e.target.value)} style={styles.propt}></input>
                <button onClick={getMovies} style={styles.sear}><BsSearch></BsSearch></button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {movies.length > 0 ? movies.map((movie, i) => {
                    return (
                        <>
                            <div style={styles.card}>
                                <Link to={`/${movie.imdbID}`}>
                                    <img src={movie.Poster} />
                                </Link>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div><p>{movie.Title}</p></div>
                                    <div><button onClick={() => { handleClick(i); storelikedmovies(movie) }}><AiFillLike />{isClicked[i] ? 'Unlike' : 'Like'}</button></div>
                                </div>
                            </div>
                        </>

                    )
                }) : ''}
            </div>
            <>
                <h1 style={{display:'flex',justifyContent:'center'}}>Liked Movies</h1>

                {LikedMovies.length > 0 ?
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', overflow: 'scroll' }}>
                            {
                                LikedMovies.map((movie, i) => {
                                    return (
                                        <div key={i}>
                                            <div style={styles.card}>
                                                <img src={movie?.Poster} />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div><p>{movie?.Title}</p></div>
                                                <div><button onClick={() => {
                                                    handleClick(i);

                                                    SetLikedMovies(LikedMovies.filter((ele) => ele.imdbID !== movie.imdbID))
                                                    localStorage.setItem("LikedMovies", JSON.stringify(LikedMovies.filter((ele) =>ele.imdbID !== movie.imdbID)))
                                                }}><AiFillLike />{isClicked[i] ? 'Unlike' : 'Like'}</button></div>
                                            </div>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>
                    : ""}
            </>
            <div>

            </div>
            <div>
                <button><IoIosArrowBack /></button>
                <button><FcNext /></button>
            </div>
        </>
    )
}


const styles = {
    // card: {
    card: {
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        marginBottom: "30px",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green"
        boxShadow: "0px 1px 5px 5px rgb(0,0,0)"
    },
    propt: {
        display: "flex",
        justifyContent: "center",
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
        background: "#fff",
        height: "40px",
        lineHeight: "40px",
        color: "#666",
        width: "25%"
    },
    sear: {
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
        height: "40px",
        lineHeight: "40px",
        width: "3rem",
        marginLeft: "0.15rem"
    }
    // }
}
// ReactDOM.render(<App />, document.getElementById('root'));