import React from "react";
import moment from "moment";

const Modal = ({ handleSubmit, handleInput, form, edit }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group py-2">
          <label for="exampleInputEmail1">Food Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Food"
            name="name"
            onChange={handleInput}
            value={form.name}
            required
          />
        </div>
        <div className="form-group py-2">
          <label for="exampleInputPassword1">Date</label>
          <input
            type="datetime-local"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Date"
            name="date"
            onChange={handleInput}
            value={moment(form.date).format("YYYY-MM-DDThh:mm")}
            required
            max={moment(new Date()).format("YYYY-MM-DDThh:mm")}
          />
        </div>

        <div className="form-group py-2">
          <label for="exampleInputPassword1">Calorie</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Calories"
            name="calorie"
            onChange={handleInput}
            value={form.calorie}
            required={true}
            min={0}
          />
        </div>

        <div className="form-group py-2">
          <label for="exampleInputPassword1">Price</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Price"
            name="price"
            onChange={handleInput}
            value={form.price}
            required
            min={0}
          />
        </div>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button type="submit" className="btn btn-sm btn-primary center">
            {edit ? "UPDATE" : "SUBMIT"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Modal;
