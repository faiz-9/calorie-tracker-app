import React, { useEffect, useState } from "react";
import FoodService from "./Services";
import "antd/dist/antd.css";
import "./index.css";
import { Modal, Button } from "antd";
import Moment from "react-moment";
import ModalComponent from "./ModalComponent";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Filter from "./Filter";
import { Spin } from "antd";

const Calorie = () => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    date: "",
    calorie: "",
    price: "",
  });

  useEffect(() => {
    FoodService.fetchFoods({
      minCalorie: 10,
      maxCalorie: 900,
    }).then((res) => {
      setIsLoading(false);
      console.log(res);
      setData(res);
    });//
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    setForm({
      name: "",
      date: "",
      calorie: "",
      price: "",
    });
    setEdit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalVisible(false);
    setEdit(false);

    if (form.id) {
      const editedValue = data.map((vals) => {
        if (vals.id === form.id) {
          console.log("TURE HAI");
          // return form;
          return { ...vals, ...form };
        } else {
          console.log("NAHI H");
          return vals;
        }
      });

      setData(editedValue);

      const filteredEditedValue = tempData.map((vals) => {
        if (vals.id === form.id) {
          console.log("TURE HAI");
          // return form;
          return { ...vals, ...form };
        } else {
          console.log("NAHI H");
          return vals;
        }
      });

      setTempData(filteredEditedValue);

      toast.success("Data Edited Successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setData([...data, { ...form, id: uuidv4() }]);
      toast.success("Data Added Successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(data);
    }

    console.log(data);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleDelete = (id) => {
    const updatedData = data.filter((datas) => {
      return datas.id !== id;
    });
    toast.success(" Deleted Successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setData(updatedData);

    const filteredUpdatedData = tempData.filter((datas) => {
      return datas.id !== id;
    });
    setTempData(filteredUpdatedData);
  };

  const handleEdit = (dataParams) => {
    setIsModalVisible(true);
    setForm({ ...form, ...dataParams });
    setEdit(true);
  };

  return (
    <>
      <div className="container">
        <Filter data={data} tempData={tempData} setTempData={setTempData} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <h3>CALORIE APP BY FAIZAN:-</h3>
        <table className="table table-bordered table-hover">
          <tbody>
            <tr>
              <td>Date</td>
              <td>Name</td>
              <td>Calories</td>
              <td>Price</td>
              <td>Action</td>
            </tr>

            {tempData.length > 0 ? (
              <>
                {tempData?.map((datas) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <Moment format="DD/MM/YYYY, h:mm:ss a">
                            {datas.date}
                          </Moment>
                        </td>
                        <td>{datas.name}</td>
                        <td>
                          {datas.calorie}{" "}
                          {datas.calorie > 500 ? (
                            <span>
                              <i
                                class="fas fa-exclamation"
                                style={{ color: "red" }}
                              ></i>
                            </span>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>
                          {datas.price}{" "}
                          {datas.price > 500 ? (
                            <span>
                              <i
                                class="fas fa-exclamation"
                                style={{ color: "red" }}
                              ></i>
                            </span>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-dark"
                            onClick={() => {
                              handleEdit(datas);
                            }}
                          >
                            EDIT
                          </button>
                          <button
                            className="btn btn-sm btn-danger mx-2"
                            onClick={() => handleDelete(datas.id)}
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {isLoading ? (
                  <>
                    <Spin />
                  </>
                ) : (
                  data?.map((datas) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <Moment format="DD/MM/YYYY, h:mm:ss a">
                              {datas.date}
                            </Moment>
                          </td>
                          <td>{datas.name}</td>
                          <td>
                            {datas.calorie}{" "}
                            {datas.calorie > 500 ? (
                              <span>
                                <i
                                  class="fas fa-exclamation"
                                  style={{ color: "red" }}
                                ></i>
                              </span>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>
                            {datas.price}{" "}
                            {datas.price > 500 ? (
                              <span>
                                <i
                                  class="fas fa-exclamation"
                                  style={{ color: "red" }}
                                ></i>
                              </span>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-dark"
                              onClick={() => {
                                handleEdit(datas);
                              }}
                            >
                              EDIT
                            </button>
                            <button
                              className="btn btn-sm btn-danger mx-2"
                              onClick={() => handleDelete(datas.id)}
                            >
                              DELETE
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })
                )}
              </>
            )}
          </tbody>
        </table>

        <Button type="primary" onClick={showModal}>
          Add Food
        </Button>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          footer={null}
          // onOk={handleOk}
          onCancel={handleCancel}
        >
          <ModalComponent
            handleSubmit={handleSubmit}
            handleInput={handleInput}
            form={form}
            edit={edit}
          />
        </Modal>
      </div>
      ;
    </>
  );
};

export default Calorie;
