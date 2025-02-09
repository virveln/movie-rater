import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import API from '../services/api-service';

export default function MovieForm({ movie, updateMovie, addNewMovie }) {
    const [title, setTitle] = useState(movie.title);
    const [description, setDescription] = useState(movie.description);
    const [token] = useCookies("mr-token");

    useEffect(() => {
        setTitle(movie.title);
        setDescription(movie.description);
    }, [movie]);

    const saveMovie = async () => {
        const resp = await API.updateMovie(movie.id, { title, description }, token["mr-token"]);
        if (resp) updateMovie(resp);
    };

    const createMovie = async () => {
        const resp = await API.createMovie({ title, description }, token["mr-token"]);
        if (resp) addNewMovie(resp);
    };

    const isDisabled = title == '' || description == '';

    return (
        <>
            {movie &&
                <div className="flex flex-col gap-5">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm/6 font-medium ">
                                Title
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(evt) => setTitle(evt.target.value)}
                                    className="block w-full rounded-md bg-neutral-700 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="description" className="block text-sm/6 font-medium ">
                                    Description
                                </label>
                                {/* <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div> */}
                            </div>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    required
                                    value={description}
                                    onChange={(evt) => setDescription(evt.target.value)}
                                    className="block w-full min-h-[100px] rounded-md bg-neutral-700 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            {movie.id ?
                                <button
                                    type="submit"
                                    onClick={() => saveMovie()}
                                    disabled={isDisabled}
                                    className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold  shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Update Movie
                                </button> :
                                <button
                                    type="submit"
                                    onClick={() => createMovie()}
                                    disabled={isDisabled}
                                    className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold  shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Create Movie
                                </button>
                            }
                        </div>
                    </div>

                </div>
            }


        </>
    )
}

MovieForm.propTypes = {
    movie: PropTypes.object,
    updateMovie: PropTypes.func,
    addNewMovie: PropTypes.func,
};