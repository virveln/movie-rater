import PropTypes from 'prop-types';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FaStar } from 'react-icons/fa';
import API from '../services/api-service';

export default function MovieDetails({ movie, updateMovie }) {

    const [highlighted, setHighlighted] = useState(-1);
    // const [error, setError] = useState(null);
    const [token] = useCookies("mr-token");

    const rateMovie = async (rate) => {
        const rateMovie = async () => {
            const resp = await API.rateMovie(movie.id, { stars: rate }, token["mr-token"]);
            if (resp) getNewMovie();
        }
        rateMovie();
    }

    const getNewMovie = async () => {
        const fetchMovie = async () => {
            const resp = await API.getMovie(movie.id, token["mr-token"]);
            if (resp) updateMovie(resp);
        }
        fetchMovie();
    }

    return (
        <>
            {movie &&
                <div>
                    <div>
                        <h2 className='text-2xl pb-1'>{movie.title}</h2>
                        <div className='flex my-2'>
                            <FaStar className={`self-center ${movie.avg_rating > 0 ? 'text-yellow-500' : ''}`} />
                            <FaStar className={`self-center ${movie.avg_rating > 1 ? 'text-yellow-500' : ''}`} />
                            <FaStar className={`self-center ${movie.avg_rating > 2 ? 'text-yellow-500' : ''}`} />
                            <FaStar className={`self-center ${movie.avg_rating > 3 ? 'text-yellow-500' : ''}`} />
                            <FaStar className={`self-center ${movie.avg_rating > 4 ? 'text-yellow-500' : ''}`} />

                            <p className='ml-2'>({movie.no_of_ratings})</p>
                        </div>
                        <p>{movie.description}</p>
                        <div className='border-t-2 border-white-600 mt-10'>
                            <h2 className='text-xl mt-5 mb-2'>Rate the movie!</h2>
                            <div className='flex text-2xl'>
                                {[...Array(5)].map((el, index) => {
                                    return <FaStar key={index} className={`self-center cursor-pointer ${highlighted > index ? 'text-yellow-600' : ''}`}
                                        onMouseEnter={() => setHighlighted(index + 1)}
                                        onMouseLeave={() => setHighlighted(-1)}
                                        onClick={() => rateMovie(index + 1)}
                                    />
                                })}
                            </div>

                        </div>
                        {/* {error && <p>{error}</p>} */}
                    </div>
                </div>
            }
        </>

    );
};

MovieDetails.propTypes = {
    movie: PropTypes.object,
    updateMovie: PropTypes.func,
};
