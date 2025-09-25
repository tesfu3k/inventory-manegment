import { Mail, LockKeyhole, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const SignUp = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { value, name } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!userData.name || !userData.email || !userData.password)
      return toast.error("Enter all reqired data");

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/sign-up",
        userData,
        { validateStatus: (status) => status < 500, withCredentials: true }
      );

      if (data.success) {
        navigate("/log-in");
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
          <h1 className="mb-6 text-center text-2xl font-semibold">SingUp</h1>
          {/* Name */}
          <div className="relative mx-auto mb-6 w-full">
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <User className="h-5 w-5" />
            </span>

            <input
              id="name"
              name="name"
              type="text"
              value={userData.name}
              onChange={handleOnChange}
              placeholder=""
              required
              autoComplete="name"
              className="peer w-full rounded-md bg-transparent px-3 pr-10 pb-2 pt-5 text-base outline-none ring-1 ring-white/60 transition focus:ring-2 focus:ring-white/90"
            />

            <label
              htmlFor="name"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-white/90 transition-all
                         peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
                         peer-focus:top-2.5 peer-focus:text-xs
                         peer-not-placeholder-shown:top-2.5 peer-not-placeholder-shown:text-xs"
            >
              Name
            </label>
          </div>
          {/* Email */}
          <div className="relative mx-auto mb-6 w-full">
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <Mail className="h-5 w-5" />
            </span>

            <input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleOnChange}
              placeholder=""
              required
              autoComplete="email"
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
              value={userData.password}
              onChange={handleOnChange}
              placeholder=""
              required
              autoComplete="current-password"
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

          {/* Submit */}
          <button
            type="submit"
            className="mb-4 w-full rounded-md bg-white py-2 text-black transition hover:opacity-90 active:opacity-80"
          >
            Sign up
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-white/90">
            Do you have an account?{" "}
            <Link
              to="/log-in"
              className="underline underline-offset-2 hover:no-underline"
            >
              LogIn
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
