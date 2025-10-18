import axios from "axios";
import { Mail, LockKeyhole } from "lucide-react";
import { useContext, useState } from "react";
import toast, { ToastBar } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/contextCreator";

const LogIn = () => {
  const { setUser } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handOnChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password)
      return toast.error("nter all reqired data");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-in`,
        loginData,
        {
          validateStatus: (status) => status < 500,
          withCredentials: true,
        }
      );
      if (data.success) {
        setUser(data.data.user);
        return toast.success(data.message);
      }
      if (!data.success) return toast.error(data.message);
    } catch (error) {
      toast.error(
        error.message || "Something went wrong. Please try again later"
      );
    }
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center bg-[url('/bg.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="relative w-full max-w-sm rounded-2xl bg-gradient-to-tl from-white/30 via-transparent to-white/30 backdrop-blur-xl border-[rgba(255,255,255,0.5)] border-2 p-8 shadow-xl">
        <form onSubmit={handleOnSubmit}>
          <h1 className="mb-6 text-center text-2xl font-semibold">Login</h1>

          {/* Email */}
          <div className="relative mx-auto mb-6 w-full">
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <Mail className="h-5 w-5" />
            </span>

            <input
              id="email"
              name="email"
              type="email"
              value={loginData.email}
              onChange={handOnChange}
              required
              autoComplete="email"
              placeholder=""
              className="peer w-full rounded-md bg-transparent px-3 pr-10 pb-2 pt-5 text-base outline-none ring-1 ring-white/60 transition focus:ring-2 focus:ring-white/90"
            />

            <label
              htmlFor="email"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-white/90 transition-all
                         peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
                         peer-focus:top-2.5 peer-focus:text-xs
                         peer-not-placeholder-shown:top-2.5 peer-not-placeholder-shown:text-xs"
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative mx-auto mb-4 w-full">
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <LockKeyhole className="h-5 w-5" />
            </span>

            <input
              id="password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handOnChange}
              required
              autoComplete="current-password"
              placeholder=""
              className="peer w-full rounded-md bg-transparent px-3 pr-10 pb-2 pt-5 text-base outline-none ring-1 ring-white/60 transition focus:ring-2 focus:ring-white/90"
            />

            <label
              htmlFor="password"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-white/90 transition-all
                         peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
                         peer-focus:top-2.5 peer-focus:text-xs
                         peer-not-placeholder-shown:top-2.5 peer-not-placeholder-shown:text-xs"
            >
              Password
            </label>
          </div>

          {/* Extras */}
          <div className="mb-6 flex items-center justify-between text-sm">
            <label
              htmlFor="remember"
              className="inline-flex items-center gap-2"
            >
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 accent-white"
              />
              <span>Remember me</span>
            </label>

            <Link to="#" className="underline-offset-2 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mb-4 w-full rounded-md bg-white py-2 text-black transition hover:opacity-90 active:opacity-80"
          >
            Log in
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-white/90">
            Don&apos;t have an account?{" "}
            <Link
              to="/sign-up"
              className="underline underline-offset-2 hover:no-underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
