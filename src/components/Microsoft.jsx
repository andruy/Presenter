import { useState, useEffect, useRef } from "react"

const Microsoft = ({ sendDataToParent, sendOnPageLoad, responseFromParent, updateResponse }) => {
    const [buttonText, setButtonText] = useState("Empty")
    const [inputValue, setInputValue] = useState("")
    const [linksArray, setLinksArray] = useState([])
    const [plusIsDisabled, setPlusIsDisabled] = useState(true)
    const [accordionIsDisabled, setAccordionIsDisabled] = useState(true)
    const buttonRef = useRef(null)

    useEffect(() => {
        const theFunction = {
            async send(treeData) {
                const response = await fetch('/yt', {
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
    }, [])

    useEffect(() => {
        if (responseFromParent) {
            setLinksArray([])
            updateResponse(false)
        }
    }, [responseFromParent])

    useEffect(() => {
        setPlusIsDisabled(inputValue.trim() === '' ? true : false)
    }, [inputValue])

    return (
        <div className="row g-2 align-items-center">
            <div className="col">
                <select className="form-select" aria-label="Default select example">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <input value={inputValue} onKeyDown={handleKeyDown} onChange={handleChange} className="form-control" type="text" placeholder="Enter links..." />
            </div>
            <div className="col-auto">
                <button onClick={handleAddLink} type="button" className="btn btn-outline-secondary" disabled={plusIsDisabled}><i className="fa-solid fa-plus"></i></button>
            </div>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button ref={buttonRef} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBox" aria-expanded="false" aria-controls="collapseBox" disabled={accordionIsDisabled}>
                            {buttonText}
                        </button>
                    </h2>
                    <div id="collapseBox" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <ul className="list-group">
                                {linksArray.map((link, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', flex: 1 }}>
                                            {link}
                                        </div>
                                        <button onClick={() => setLinksArray(linksArray.filter((_, i) => i !== index))} className="btn btn-outline-danger btn-sm">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Microsoft
