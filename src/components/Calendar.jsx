import { useState, useEffect } from "react"

const Calendar = ({ sendDataToParent, sendOnPageLoad, responseFromParent, updateResponse, idSuffix }) => {
    const [selectValue, setSelectValue] = useState("")
    const [actions, setActions] = useState([])
    const [dateInput, setDateInput] = useState("")
    const [datePlaceholder, setDatePlaceholder] = useState("")
    const [plusIsDisabled, setPlusIsDisabled] = useState(true)
    const [tasksArray, setTasksArray] = useState([])

    useEffect(() => {
        const theFunction = {
            async send(treeData) {
                const response = await fetch('/emailtask', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(treeData)
                })
                if (response.ok) {
                    const result = await response.json()
                    console.log(result.report)
                    return result
                } else {
                    console.error(response)
                    console.log(treeData)
                    return "Something went wrong"
                }
            }
        }
        sendOnPageLoad(theFunction)

        async function getActions() {
            const response = await fetch('/tasks')
            const data = await response.json()

            setActions(data)
        }
        getActions()
    }, [])

    useEffect(() => {
        if (responseFromParent) {
            setTasksArray([])
            setDatePlaceholder("")
            updateResponse(false)
        }
    }, [responseFromParent])

    useEffect(() => {
        setPlusIsDisabled(!dateInput || selectValue === '' ? true : false)
    }, [dateInput, selectValue])

    useEffect(() => {
        const theList = {
            data: {
                tasks: datePlaceholder === "" ? [] : tasksArray
            },
            status: datePlaceholder === "" ? true : false
        }
        sendDataToParent(theList)
    }, [datePlaceholder])

    const handleSelectChange = event => {
        setSelectValue(event.target.value)
    }

    const handleInputChange = event => {
        setDateInput(event.target.value)
    }

    const handleAddTask = () => {
        if (dateInput && selectValue !== '') {
            setDatePlaceholder(
                Date.now() > Date.parse(dateInput) ?
                selectValue + " (Inmediately)"
                :
                selectValue + " -> " + Date.prototype.toLocaleString.call(new Date(Date.parse(dateInput)))
            )
            const newItem = {
                timeframe: new Date(dateInput).getTime(),
                email: {
                    to: "andruycira@icloud.com",
                    subject: selectValue,
                    body: "Lorem ipsum"
                }
            }

            setTasksArray([newItem])
            setDateInput('')
        }
    }

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            handleAddTask()
        }
    }

    return (
        <>
            <select value={selectValue} onChange={handleSelectChange} className="form-select form-select-lg mb-3" aria-label="Default select example">
                <option value="" disabled hidden>Choose action...</option>
                {actions.map((action, index) => (
                    <option key={index} value={action}>{action}</option>
                ))}
            </select>
            <div className="input-group mb-3">
                <input value={dateInput} onKeyDown={handleKeyDown} onChange={handleInputChange} className="form-control form-control-lg" type="datetime-local" placeholder="Enter links..." />
                <button onClick={handleAddTask} type="button" className="btn btn-outline-secondary" disabled={plusIsDisabled}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', flex: 1 }}>
                        {
                            datePlaceholder === "" ?
                            <>
                                <div className="spinner-grow spinner-grow-sm text-secondary" role="status"></div>
                                <span>&nbsp;</span>
                                <div className="spinner-grow spinner-grow-sm text-secondary" role="status"></div>
                                <span>&nbsp;</span>
                                <div className="spinner-grow spinner-grow-sm text-secondary" role="status"></div>
                            </>
                            :
                            datePlaceholder
                        }
                    </div>
                    <button onClick={() => setDatePlaceholder("")} className="btn btn-outline-danger btn-sm" disabled={datePlaceholder === ''}>
                        <i className="fa-solid fa-arrow-rotate-left"></i>
                    </button>
                </li>
            </ul>
        </>
    )
}

export default Calendar
