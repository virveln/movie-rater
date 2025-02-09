
import './App.css'
import { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MovieForm from "./components/MovieForm";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import Logo from "./assets/mr-logo.png";


function App() {

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [newMovie, setNewMovie] = useState(null);
  const [cookie, deleteCookie] = useCookies("mr-token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookie['mr-token']) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookie]);

  const movieClicked = (movie, isEdit) => {
    if (isEdit) {
      setSelectedMovie(null);
      setEditedMovie(movie);
    }
    else {
      setSelectedMovie(movie);
      setEditedMovie(null);
    }
  }

  const createNewMovie = () => {
    setSelectedMovie(null);
    setEditedMovie({ title: '', description: '' });
  }

  const logoutUser = () => {
    deleteCookie(['mr-token']);
    navigate('/');
  }

  return (
    <div className='app'>
      <div className='app-header p-10 border-b-2 border-white-500 mb-5'>
        {/* <h1>Movie Rater</h1> */}
        <img
          alt="Movie Rater Logo"
          src={Logo}
          className="mx-auto h-20 w-auto"
        />
        <FaSignOutAlt onClick={() => logoutUser()} className='absolute top-5 right-5 text-2xl cursor-pointer' />
      </div>
      <div className='grid grid-cols-2 gap-[100px]'>
        <div>
          <button onClick={() => createNewMovie()} className='mb-5 flex gap-3'><IoIosAddCircleOutline className='self-center' /> Add New Movie</button>
          <MovieList movieClicked={movieClicked} newMovie={newMovie} />
        </div>

        <MovieDetails movie={selectedMovie} updateMovie={setSelectedMovie} />
        {editedMovie && <MovieForm movie={editedMovie} updateMovie={setNewMovie} addNewMovie={setNewMovie} />}

      </div>
    </div>
  )
}

export default App;
