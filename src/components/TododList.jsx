import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Modal from "./Modal";
import style from "../components/style.module.css";

const url =
  "https://elchocrud.pro/api/v1/8dbd33601f79d836cb71e3e00ae0075f/Todo";
const TododList = (initial) => {
  const [todo, setTodo] = useState([initial]);
  const [inputValue, setInputValue] = useState("");
  const [dataValue, setDataValue] = useState("");

  const [editValue, setEditValue] = useState("");
  const [editData, setEditData] = useState("");

  const [deleteId, setDeleteId] = useState([]);

  const [modal, setModal] = useState(false);
  const openModal = (id) => {
    setDeleteId(id);
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const addButoon = () => {
    if (inputValue) {
      const newTodo = {
        title: inputValue,
        data: dataValue,
      };
      setInputValue("");
      setDataValue("");
      postRequest(newTodo);
    }
  };

  const postRequest = async (newTodo) => {
    const responce = await axios.post(url, newTodo);
    setTodo(responce.data);
  };

  const getRequest = async () => {
    const responce = await axios.get(url);
    setTodo(responce.data);
  };

  useEffect(() => {
    getRequest();
  }, []);

  const deleteRequest = async (id) => {
    const responce = await axios.delete(`${url}/${id}`);
    setTodo(responce.data);
    closeModal();
  };

  const deleteAll = async () => {
    const responce = await axios.delete(url);
    setTodo(responce.data);
  };

  const [isEdit, setIsEdit] = useState(null);

  const upData = async (_id) => {
    const newTodo = {
      title: editValue,
      data: editData,
    };

    const responce = await axios.put(`${url}/${_id}`, newTodo);

    setTodo(responce.data);
    setIsEdit(null);
  };

  return (
    <div className={style.todoCard}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <input
        type="date"
        value={dataValue}
        onChange={(e) => setDataValue(e.target.value)}
      />
      <button className={style.addButoon} onClick={addButoon}>
        Add
      </button>
      <button className={style.delete_button} onClick={() => deleteAll()}>
        delete all
      </button>

      {todo.map((item) => (
        <div key={item._id} className={style.todoBox}>
          {isEdit === item._id ? (
            <>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <input
                type="date"
                value={editData}
                onChange={(e) => setEditData(e.target.value)}
              />
              <button className={style.updata} onClick={() => upData(item._id)}>
                updata
              </button>
            </>
          ) : (
            <>
              <h1>{item.title}</h1>
              <p>{item.data}</p>
            </>
          )}
          <div className={style.in_buttons}>
            <button
              className={style.single_delete}
              onClick={() => openModal(item._id)}
            >
              delete
            </button>
            <button
              className={style.edit_button}
              onClick={() => {
                setIsEdit(item._id);
                setEditData(item.data);
                setEditValue(item.title);
              }}
            >
              edit
            </button>
          </div>
          <Modal
            todo={todo}
            isOpen={modal}
            closeModal={closeModal}
            deleteRequest={deleteRequest}
            deleteId={deleteId}
          >
            <h2>Do you want to dalete it?</h2>
          </Modal>
        </div>
      ))}
    </div>
  );
};

export default TododList;
