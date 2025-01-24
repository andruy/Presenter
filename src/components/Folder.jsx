import { useState, useEffect } from "react"

const Folder = ({ sendDataToParent, sendOnPageLoad, responseFromParent, updateResponse, idSuffix }) => {
    const [inputValue, setInputValue] = useState("")
    const [folderName, setFolderName] = useState("{}")
    const [plusIsDisabled, setPlusIsDisabled] = useState(true)

    useEffect(() => {
        const theFunction = {
            async send(data) {
                const formData = new FormData()
                formData.append('name', data)
                const queryString = new URLSearchParams(formData).toString()
                const response = await fetch('/newDirectory' + `?${queryString}`, {
                    method: "POST"
                })
                if (response.ok) {
                    const result = await response.json()
                    console.log(result.report)
                    return result
                } else {
                    console.error(response)
                    console.log(data)
                    return "Something went wrong"
                }
            }
        }
        sendOnPageLoad(theFunction)
    }, [])

    useEffect(() => {
        if (responseFromParent) {
            setFolderName("{}")
            updateResponse(false)
        }
    }, [responseFromParent])

    useEffect(() => {
        setPlusIsDisabled(inputValue.trim() === '' ? true : false)
    }, [inputValue])

    useEffect(() => {
        const theParam = {
            data: folderName,
            status: folderName === '{}' ? true : false
        }
        sendDataToParent(theParam)
    }, [folderName])

    const handleChange = event => {
        setInputValue(event.target.value)
    }

    function handleAddFolder() {
        if (inputValue.trim() !== '{}') {
            setFolderName(inputValue)
            setInputValue('')
        }
    }

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            handleAddFolder()
        }
    }

    return (
        <>
            <div className="input-group mb-3">
                <input value={inputValue} onKeyDown={handleKeyDown} onChange={handleChange} className="form-control form-control-lg" type="text" placeholder="Name of the folder?" />
                <button onClick={handleAddFolder} type="button" className="btn btn-outline-secondary" disabled={plusIsDisabled}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', flex: 1 }}>
                        /the/new/folder/{folderName}
                    </div>
                    <button onClick={() => setFolderName("{}")} className="btn btn-outline-danger btn-sm" disabled={folderName === '{}'}>
                        <i className="fa-solid fa-arrow-rotate-left"></i>
                    </button>
                </li>
            </ul>
        </>
    )
}

export default Folder
