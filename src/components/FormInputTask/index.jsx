import { PlusSquareOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useState } from "react";
import Divider from "../Divider";
import "./style.scss"
const FormInputTask = (props) => {
    const [inputTaskName, setInputTaskName] = useState("")
    const { handleAddTask } = props
    const handleChangeTaskName = (event) => {
        setInputTaskName(event.target.value)
    }
    const handleSubmitForm = (event) => {
        event.preventDefault()
        if (!inputTaskName) return
        handleAddTask(inputTaskName)
        setInputTaskName("")
    }
    return (
        <div className="todo-list-header">
            <h3 className="todo-list-header__title">Todo List application</h3>
            <form className="todo-list-header__form" onSubmit={handleSubmitForm}>
                <Input
                    size="large"
                    placeholder="Please input your name..."
                    value={inputTaskName}
                    onChange={handleChangeTaskName}
                />
                <button className="todo-list-header__btn-add-task" type="submit">
                    <PlusSquareOutlined style={{ fontSize: "30px" }} />
                </button>
            </form>
            <Divider />
        </div>
    )
}
export default FormInputTask