import { useState, useEffect } from "react"

const Clipboard = ({ sendDataToParent, sendOnPageLoad, responseFromParent, updateResponse, idSuffix }) => {
    const [selectValue, setSelectValue] = useState("")
    const [tasks, setTasks] = useState([])
    const [plusIsDisabled, setPlusIsDisabled] = useState(true)
    const [taskPlaceholder, setTaskPlaceholder] = useState("")
    const [innerObject, setInnerObject] = useState({})

    useEffect(() => {
        const theFunction = {
            async send(taskToKill) {
                const response = await fetch('/deletetask', {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(taskToKill)
                })
                if (response.ok) {
                    const result = await response.json()
                    console.log(result.report)
                    return result
                } else {
                    console.error(response)
                    console.log(taskToKill)
                    return "Something went wrong"
                }
            }
        }
        sendOnPageLoad(theFunction)
        gatherTaskList()
    }, [])

    async function gatherTaskList() {
        const response = await fetch("/emailtasks")
        const data = await response.json()

        setTasks(data)
    }

    useEffect(() => {
        if (responseFromParent) {
            gatherTaskList()
            setTaskPlaceholder("")
            updateResponse(false)
        }
    }, [responseFromParent])

    useEffect(() => {
        setPlusIsDisabled(selectValue === "" ? true : false)
    }, [selectValue])

    useEffect(() => {
        const theTask = {
            data: {
                innerObject
            },
            status: taskPlaceholder === "" ? true : false
        }
        sendDataToParent(theTask)
    }, [taskPlaceholder])

    const handleAddTask = () => {
        if (selectValue) {
            setTaskPlaceholder(selectValue)
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].id === selectValue) {
                    setInnerObject(tasks[i])
                    break
                }
            }
        }
    }

    const handleSelectChange = event => {
        setSelectValue(event.target.value)
    }

    return (
        <>
            <div className="input-group mb-3">
                <select value={selectValue} onChange={handleSelectChange} className="form-select form-select-lg" aria-label="Example select with button addon">
                    <option value="" disabled hidden>Current tasks...</option>
                    {tasks.map((task, index) => (
                        <option key={index} value={task.id}>{task.name + " " + task.time}</option>
                    ))}
                </select>
                <button onClick={handleAddTask} type="button" className="btn btn-outline-secondary" disabled={plusIsDisabled}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', flex: 1 }}>
                        {
                            taskPlaceholder === "" ?
                            <>
                                <div className="spinner-grow spinner-grow-sm text-secondary" role="status"></div>
                                <span>&nbsp;</span>
                                <div className="spinner-grow spinner-grow-sm text-secondary" role="status"></div>
                                <span>&nbsp;</span>
                                <div className="spinner-grow spinner-grow-sm text-secondary" role="status"></div>
                            </>
                            :
                            taskPlaceholder
                        }
                    </div>
                    <button onClick={() => setTaskPlaceholder("")} className="btn btn-outline-danger btn-sm" disabled={taskPlaceholder === ''}>
                        <i className="fa-solid fa-arrow-rotate-left"></i>
                    </button>
                </li>
            </ul>
        </>
    )
}

export default Clipboard
