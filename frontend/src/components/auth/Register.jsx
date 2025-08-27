import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../../redux/api/authApi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, { isLoading, error }] = useRegisterMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const registerData = {
      name: name,
      email: email,
      password: password,
    };

    register(registerData);
  };

  return (
    <div class="row wrapper">
      <div class="col-10 col-lg-5">
        <form
          class="shadow rounded bg-body"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          <h2 class="mb-4">Register</h2>

          <div class="mb-3">
            <label for="name_field" class="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              class="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div class="mb-3">
            <label for="email_field" class="form-label">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              class="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div class="mb-3">
            <label for="password_field" class="form-label">
              Password
            </label>
            <input
              type="password"
              id="password_field"
              class="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            id="register_button"
            type="submit"
            class="btn w-100 py-2"
            disabled={isLoading}
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
