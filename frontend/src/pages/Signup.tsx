import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Quote } from "../components/Quote";
import { useState } from "react";
import { SignUpInput } from "@warun/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Signup = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<SignUpInput>({
    name: "",
    email: "",
    password: "",
  });

  const areFieldsFilled = () => {
    return inputs.name && inputs.email && inputs.password;
  };

  async function sendRequest(e:any) {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
        ...inputs
      })
      const jwt = response.data;
      localStorage.setItem('token', jwt);
      navigate('/blogs');
    }
    catch(err) {
      alert(err)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex justify-center items-center flex-col">
        <div>
          <div className="text-4xl font-bold text-center">
            Create an account
          </div>
          <div className="text-xl font-semibold text-slate-400 text-center mt-1">
            Already have an account ?{" "}
            <Link to="/signin" className="text-cyan-400">
              Login
            </Link>
          </div>
        </div>
        <div className="w-full max-w-sm">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <Input
              label="Username"
              inputAttributes={{
                type: "text",
                placeholder: "Enter your username",
              }}
              onChangeHandler={(e) => {
                setInputs((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />
            <Input
              label="Email"
              inputAttributes={{
                type: "text",
                placeholder: "abc@gmail.com",
              }}
              onChangeHandler={(e) => {
                setInputs((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            />
            <Input
              label="Password"
              inputAttributes={{
                type: "password",
              }}
              onChangeHandler={(e) => {
                setInputs((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
            <button
              className={`bg-blue-400 w-full ${areFieldsFilled() ? 'hover:bg-blue-700' : ''} text-white font-bold mt-2 py-2 px-4 rounded`}
              disabled={!areFieldsFilled()}
              onClick={sendRequest}
            >
              Button
            </button>
          </form>
        </div>
      </div>
      <div className="hidden md:block">
        <Quote />
      </div>
    </div>
  );
};
