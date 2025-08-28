import React, { useEffect, useState } from "react";
import UserLayout from "../layout/UserLayout";
import { useSelector } from "react-redux";
import { useUploadAvatarMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UploadAvatar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? user.avatar?.url : "/images/default_avatar.jpg"
  );

  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("uploaded avatar");
      navigate("/me/profile");
    }
  }, [user, error, isSuccess, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      avatar: avatar,
    };
    uploadAvatar(userData);
  };

  const onChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
            <h2 className="mb-4">Upload Avatar</h2>

            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <figure className="avatar item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="image"
                    />
                  </figure>
                </div>
                <div className="input-foam">
                  <label className="form-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    className="form-control"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UploadAvatar;
