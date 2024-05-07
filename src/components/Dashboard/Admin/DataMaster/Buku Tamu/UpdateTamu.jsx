import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const UpdateAdmin = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const data = {
    name,
    gender,
    address,
    email,
    phone,
  };

  useEffect(() => {
    const getMemberById = async () => {
      try {
        const response = await getMemberByIdFunc(id);
        setName(response.data.name);
        setGender(response.data.gender);
        setAddress(response.data.address);
        setEmail(response.data.email);
        setPhone(response.data.phone);
      } catch (error) {
        if (error) console.log(error);
      }
    };
    getMemberById();
  }, [id]);

  const updateMember = async (e) => {
    e.preventDefault();
    try {
      await updateMemberFunc(id, data);
      navigate("/members");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div className="container is-fluid">
      <h1 className="title">Members</h1>
      <h2 className="subtitle">Update Member</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateMember}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Gender</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required={true}
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Address</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Phone</label>
                <div className="control">
                  <input
                    type="text"
                    pattern="\d*"
                    maxLength="13"
                    minLength="11"
                    className="input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="11-13 length"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                  <Link to={"/members"} className="button is-info ml-3">
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdmin;
