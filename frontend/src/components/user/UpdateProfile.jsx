import React, { useEffect, useState } from "react";
import UserLayout from "../layout/UserLayout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading, error, isSuccess }] =
    useUpdateProfileMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    if (error) {
      toast.error(error?.data?.messege);
    }

    if (isSuccess) {
      toast.success("user updated");
      navigate("/me/profile");
    }
  }, [user, error, isSuccess, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      name: name,
      email: email,
    };
    updateProfile(userData);
  };

  return (
    <UserLayout>
      <div class="row wrapper">
        <div class="col-10 col-lg-8">
          <form class="shadow rounded bg-body" onSubmit={handleSubmit}>
            <h2 class="mb-4">Update Profile</h2>

            <div class="mb-3">
              <label for="name_field" class="form-label">
                {" "}
                Name{" "}
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
                {" "}
                Email{" "}
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

            <button
              type="submit"
              class="btn update-btn w-100"
              disabled={isLoading}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdateProfile;
