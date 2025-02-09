import { useState, useEffect } from "react"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import API from "../services/api-service";
import Logo from "../assets/mr-logo.png";

export default function Auth() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginView, setIsLoginView] = useState(true);

    const [token, setToken] = useCookies("mr-token");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("token " + token['mr-token']);
        if (token['mr-token']) navigate('/movies');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const loginUser = () => {
        const getToken = async () => {
            const resp = await API.loginUser({ username, password });
            if (resp) {
                setToken("mr-token", resp.token);
                navigate('/movies');
            }
        }
        getToken();
    }

    const registerUser = () => {
        const getToken = async () => {
            const resp = await API.registerUser({ username, password });
            if (resp) loginUser();
        }
        getToken();
    }

    const isDisabled = username == '' || password == '';

    return (
        <>
            <img
                alt="Movie Rater Logo"
                src={Logo}
                className="mx-auto h-30 w-auto"
            />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 m-auto ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <MdOutlineRateReview className="mx-auto h-10 w-auto" /> */}
                    {isLoginView ?
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
                            Sign in to your account
                        </h2> :
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
                            Register User
                        </h2>
                    }
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm w-3xl">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm/6 font-medium ">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    autoComplete="username"
                                    onChange={(evt) => setUsername(evt.target.value)}
                                    className="block w-full rounded-md bg-neutral-700 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-neutral-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium ">
                                    Password
                                </label>
                                {/* <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div> */}
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    onChange={(evt) => setPassword(evt.target.value)}
                                    className="block w-full rounded-md bg-neutral-700 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-neutral-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            {isLoginView ?
                                <button
                                    type="submit"
                                    onClick={() => loginUser()}
                                    disabled={isDisabled}
                                    className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold  shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button> :
                                <button
                                    type="submit"
                                    onClick={() => registerUser()}
                                    disabled={isDisabled}
                                    className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold  shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Register
                                </button>
                            }
                        </div>
                    </div>
                    {isLoginView ?
                        <p className="mt-10 text-center text-sm/6 text-neutraal-500">
                            You don&apos;t have an accout?{' '}
                            <span onClick={() => setIsLoginView(false)} className="font-semibold text-white hover:text-gray-200">
                                Register here
                            </span>
                        </p> :
                        <p className="mt-10 text-center text-sm/6 text-neutral-500">
                            Already have an accout?{' '}
                            <span onClick={() => setIsLoginView(true)} className="font-semibold text-white hover:text-gray-200">
                                Login here
                            </span>
                        </p>
                    }
                </div>
            </div>
        </>
    )
}