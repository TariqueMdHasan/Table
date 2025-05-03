import React, { useState } from "react";
import "./form.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import avatar1 from '../avatar/avtar1.jpg'
import avatar2 from '../avatar/avtar2.jpg'
import avatar3 from '../avatar/avtar3.jpg'
import avatar4 from '../avatar/avtar4.jpg'
import avatar5 from '../avatar/avtar5.jpg'
import avatar6 from '../avatar/avtar6.jpg'
import avatar7 from '../avatar/avtar7.jpg'
import avatar8 from '../avatar/avtar8.jpg'
import avatar9 from '../avatar/avtar9.jpg'

const avatars = [
  avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9
]

// const avatar = [
//   "https://github.com/TariqueMdHasan/Table/blob/main/client/src/avatar/avtar1.jpg?raw=true",
//   "https://github.com/TariqueMdHasan/Table/blob/main/client/src/avatar/avtar2.jpg?raw=true",
//   "https://github.com/TariqueMdHasan/Table/blob/main/client/src/avatar/avtar3.jpg?raw=true",
//   "https://github.com/TariqueMdHasan/Table/blob/main/client/src/avatar/avtar4.jpg?raw=true",
//   "https://github.com/TariqueMdHasan/Table/blob/main/client/src/avatar/avtar5.jpg?raw=true",
//   "https://github.com/TariqueMdHasan/Table/blob/main/client/src/avatar/avtar6.jpg?raw=true",
//   "https://github.com/TariqueMdHasan/Table/blob/main/client/src/avatar/avtar7.jpg?raw=true",
//   "https://github.com/TariqueMdHasan/Table/blob/main/client/src/avatar/avtar8.jpg?raw=true",
//   "https://github.com/TariqueMdHasan/Table/blob/main/client/src/avatar/avtar9.jpg?raw=true",
// ];

function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setError(false);
    setErrorMessage(null);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubit = async (e) => {
    e.preventDefault();

    // const data = {
    //     name: formData.name,
    //     description: formData.description,
    //     amount: formData.amount,
    //     avatar: formData.avatar
    // }
    if (!formData.name) {
      setError(true);
      setErrorMessage("please fill Name*");
      return toast.error("please fill name");
    }
    if (!formData.description) {
      setError(true);
      setErrorMessage("please fill description*");
      return toast.error("please fill description");
    }
    if (!formData.amount) {
      setError(true);
      setErrorMessage("please fill amount*");
      return toast.error("please fill amount");
    }
    if (!formData.avatar) {
      setError(true);
      setErrorMessage("please select avatar*");
      return toast.error("please select avatar");
    }

    try {
      setLoading(true);
      const result = await axios.post(
        "https://table-2jki.onrender.com/api/table/create",
        formData
      );
      console.log("data is:", result.data);
      toast.success("data submitted succesfully");
      navigate('/')
      // setFormData("")
    } catch (error) {
      console.error("form not able to submit, check form component", error);
      toast.error("failed to save data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formParent">
      <div className="formContainer">
        <form action="submit" onSubmit={handleSubit}>
          <h1>Submit Data</h1>
          <label htmlFor="nameId" className="namelabel inputlabel">
            Name
          </label>
          <input
            type="text"
            id="nameId"
            name="name"
            className="nameInput inputClass"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="descId" className="desclabel inputlabel">
            Description
          </label>
          <input
            type="text"
            id="descId"
            name="description"
            className="descInput inputClass"
            value={formData.description}
            onChange={handleChange}
          />
          <label htmlFor="amountId" className="amountlabel inputlabel">
            Amount
          </label>
          <input
            type="number"
            id="amountId"
            name="amount"
            className="amoutInput inputClass"
            value={formData.amount}
            onChange={handleChange}
          />
          <fieldset>
            <legend>Choose Avatar</legend>
            {avatars.map((item, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="avatar"
                  value={item}
                  checked={formData.avatar === item}
                  onChange={handleChange}
                />
                <img src={item} alt={`avatar${index}`} className="FormImages" />
              </div>
            ))}
          </fieldset>
          {error ? <p className="paraTable">{errorMessage}</p> : ""}
          <button type="submit" className="submitBtn">
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
        <button className="cancel" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Form;
