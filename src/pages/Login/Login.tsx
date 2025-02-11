import { useState } from "react";
import Button from "../../Components/Button";
import Eye from "../../assets/icons/Eye";
import bgImage from "../../assets/images/Login-image.png"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EyeOffIcon from "../../assets/icons/EyeOffIcon";
import { endpoints } from "../../Services/apiEdpoints";
import useApi from "../../Hooks/useApi";

type Props = {};

function Login({}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { request: login } = useApi("post", 5004);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const url = `${endpoints.LOGIN}`;
      const { response, error } = await login(url, { email, password });
      if (!error && response) {
        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/otp", { state: { email } });
        }, 1000);
      }
      else{
        toast.error(error.response.data.message);
       setError(error.response.data.message);
      }
    } catch (error) {
      const errorMessage = "Login failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100vh] flex">
      <div className="w-[50%] flex justify-center items-center bg-white">
        <div className="w-[60%] ">
          <p className="text-textColor font-bold text-4xl">Get Started now</p>
          <p className="text-dropdownText mt-2 text-sm font-normal">
            Enter your credentials to access your account
          </p>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="text-dropdownText text-sm">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-3 text-sm w-[100%] rounded-md text-start mt-1.5 bg-white border border-inputBorder h-[39px] leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                  placeholder="Enter Email"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-dropdownText text-sm">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-3 text-sm w-[100%] rounded-md text-start mt-1.5 bg-white border border-inputBorder h-[39px] leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                    placeholder="Password"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="focus:outline-none mt-1"
                    >
                      {showPassword ? <Eye color="#4B5C79" /> : <EyeOffIcon />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-center">
              <Button type="submit" className="px-[45%] mt-7">
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
       </div>
      </div>
      {/* Right side with the bgImage */}
      <div className="w-[50%] flex justify-center items-center">
        <div
          className="h-screen"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "100%",
          }}
        >
          <h1 className="text-[#F9F7F5] text-[24px] mt-1 font-bold text-end px-5">
            Sewnex
          </h1>
          <h1
            className="bg-gradient-to-r from-[#90DDAF] via-[#35FC85] to-[#90DDAF] bg-clip-text text-transparent text-[48px] font-normal  pb-3  px-16"
            style={{ lineHeight: "55px" }}
          >
            Comprehensive <br />
            Boutique Software <br />
            with POS and Analytics
          </h1>
          <p className="px-16 text-[#EAEAEA] text-[17px] font-normal">
            Effortlessly Manage Your Boutique with Sewnex’s User-Friendly
            Interface and Flexible Features.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
