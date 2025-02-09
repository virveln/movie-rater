import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import useFetch from "../services/useFetch";
import API from "../services/api-service";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// export default function MovieList({ movieClicked, newMovie, updatedMovie }) {
export default function MovieList({ movieClicked, newMovie }) {

    const { data, loading, error } = useFetch('/api/movies/');
    const [movies, setMovies] = useState([]);
    const [token] = useCookies("mr-token");

    useEffect(() => {
        setMovies(data)
    }, [data])

    useEffect(() => {
        const newMovies = movies.map(movie => movie.id === newMovie.id ? { ...newMovie } : movie);
        setMovies(newMovies);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newMovie])

    const removeMovie = (movieToBeRemoved) => {
        const resp = API.deleteMovie(movieToBeRemoved.id, token["mr-token"]);
        if (resp) {
            const newMovies = movies.filter(movie => movie.id !== movieToBeRemoved.id);
            setMovies(newMovies);
        }
    }

    if (loading) return <h1>Loading</h1>
    if (error) return <h1>{error}</h1>

    return (
        <div>
            {movies.map((movie) => {
                return (
                    <div key={movie.id} className="grid grid-cols-[1fr_auto_auto] gap-3 p-3 border-b-2 border-white-500">
                        <div onClick={() => { movieClicked(movie, false) }} className="flex gap-3 cursor-pointer">
                            <img className="w-10 " src={movie.cover} alt="Movie Cover" />
                            <h2 className="text-xl mt-auto " >{movie.title}</h2>
                        </div>
                        <FaEdit onClick={() => { movieClicked(movie, true) }} className="mt-auto self-center cursor-pointer" />
                        <MdDelete onClick={() => { removeMovie(movie) }} className="mt-auto self-center cursor-pointer" />
                    </div>
                )
            })}
        </div>
    );
};

MovieList.propTypes = {
    movieClicked: PropTypes.func.isRequired,
    newMovie: PropTypes.object,
};
