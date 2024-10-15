import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SellerAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleView = () => {
    setIsLogin(!isLogin);
  };

  return (
    <section className="h-screen overflow-hidden">
      <div className="h-full px-12 py-12 lg:px-16 relative">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* Image container */}
          <div
            className={`shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 transition-all duration-500 ease-in-out absolute z-20 ${
              isLogin ? "left-[calc(0%+32px)]" : "left-[calc(50%-32px)]"
            }`}
          >
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* Form container */}
          <div
            className={`mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 transition-all duration-500 ease-in-out absolute z-10 ${
              isLogin ? "left-[calc(50%+48px)]" : "left-[calc(0%+80px)]"
            }`}
          >
            <form className="bg-white p-8 rounded-lg shadow-lg">
              {/* Sign in/up section */}
              <div className="flex flex-col items-center justify-center mb-6">
                <p className="mb-4 text-lg">
                  {isLogin ? "Sign in with" : "Sign up with"}
                </p>
                <div className="flex flex-row">
                  {/* Social media buttons */}
                  {/* Facebook button */}
                  <button
                    type="button"
                    className="mx-1 h-9 w-9 rounded-full bg-[#3b5998] uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#3b5998]/90 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#3b5998]/90 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#3b5998]/90 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </button>

                  {/* Twitter button */}
                  <button
                    type="button"
                    className="mx-1 h-9 w-9 rounded-full bg-[#1da1f2] uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#1da1f2] transition duration-150 ease-in-out hover:bg-[#1da1f2]/90 hover:shadow-[0_8px_9px_-4px_rgba(29,161,242,0.3),0_4px_18px_0_rgba(29,161,242,0.2)] focus:bg-[#1da1f2]/90 focus:shadow-[0_8px_9px_-4px_rgba(29,161,242,0.3),0_4px_18px_0_rgba(29,161,242,0.2)] focus:outline-none focus:ring-0 active:bg-[#1da1f2]/90 active:shadow-[0_8px_9px_-4px_rgba(29,161,242,0.3),0_4px_18px_0_rgba(29,161,242,0.2)]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>

                  {/* LinkedIn button */}
                  <button
                    type="button"
                    className="mx-1 h-9 w-9 rounded-full bg-[#0077b5] uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#0077b5] transition duration-150 ease-in-out hover:bg-[#0077b5]/90 hover:shadow-[0_8px_9px_-4px_rgba(0,119,181,0.3),0_4px_18px_0_rgba(0,119,181,0.2)] focus:bg-[#0077b5]/90 focus:shadow-[0_8px_9px_-4px_rgba(0,119,181,0.3),0_4px_18px_0_rgba(0,119,181,0.2)] focus:outline-none focus:ring-0 active:bg-[#0077b5]/90 active:shadow-[0_8px_9px_-4px_rgba(0,119,181,0.3),0_4px_18px_0_rgba(0,119,181,0.2)]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Separator */}
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                  Or
                </p>
              </div>

              {/* Username input (only for signup) */}
              {!isLogin && (
                <div className="relative mb-6">
                  <input
                    type="text"
                    id="UserName"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="UserName"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    User Name
                  </label>
                </div>
              )}

              {/* Email input */}
              <div className="relative mb-6">
                <input
                  type="email"
                  id="email"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Email address
                </label>
              </div>

              {/* Password input */}
              <div className="relative mb-6">
                <input
                  type="password"
                  id="password"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Password
                </label>
              </div>

              {/* Remember me and Forgot password (only for login) */}
              {isLogin && (
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#!"
                    className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Submit button */}
              <div className="flex flex-col items-center justify-center mt-6">
                <button
                  type="button"
                  className="inline-block rounded bg-blue-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>

                {/* Toggle link */}
                <p className="mb-0 mt-4 pt-1 text-sm font-semibold">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <a
                    href="#!"
                    onClick={toggleView}
                    className="text-red-600 transition duration-150 ease-in-out hover:text-red-700 focus:text-red-700 active:text-red-800"
                  >
                    {isLogin ? "Register" : "Login"}
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}