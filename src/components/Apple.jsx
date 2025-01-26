import { useState, useEffect, useRef } from "react"

const Apple = ({ sendDataToParent, sendOnPageLoad, responseFromParent, updateResponse }) => {
    const idSuffix = "Apple"
    const [buttonText, setButtonText] = useState("Empty")
    const [inputValue, setInputValue] = useState("")
    const [linksArray, setLinksArray] = useState([])
    const [plusIsDisabled, setPlusIsDisabled] = useState(true)
    const [accordionIsDisabled, setAccordionIsDisabled] = useState(true)
    const buttonRef = useRef(null)

    useEffect(() => {
        const theFunction = {
            async send(data) {
                const response = await fetch('/yte', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
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
            setLinksArray([])
            updateResponse(false)
        }
    }, [responseFromParent])

    useEffect(() => {
        setPlusIsDisabled(inputValue.trim() === '' ? true : false)
    }, [inputValue])

    useEffect(() => {
        setButtonText(linksArray.length > 0 ? `Total links: ${linksArray.length}` : 'Empty')
        if (linksArray.length === 0) {
            const button = buttonRef.current
            if (button && !button.classList.contains('collapsed')) {
                button.click()
            }
        }
        setAccordionIsDisabled(linksArray.length > 0 ? false : true)
        const theObject = {
            data: {
                links: linksArray
            },
            status: linksArray.length > 0 ? false : true
        }
        sendDataToParent(theObject)
    }, [linksArray])

    const handleChange = event => {
        setInputValue(event.target.value)
    }

    const handleAddLink = () => {
        if (inputValue.trim() !== '') {
            setLinksArray([...linksArray, inputValue])
            setInputValue('')
        }
    }

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            handleAddLink()
        }
    }

    return (
        <>
            <div className="input-group mb-3">
                <input value={inputValue} onKeyDown={handleKeyDown} onChange={handleChange} className="form-control form-control-lg" type="text" placeholder="Enter links..." />
                <button onClick={handleAddLink} type="button" className="btn btn-outline-secondary" disabled={plusIsDisabled}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            <div className="accordion" id={"accordionExample" + idSuffix}>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button ref={buttonRef} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseBox" + idSuffix} aria-expanded="false" aria-controls={"collapseBox" + idSuffix} disabled={accordionIsDisabled}>
                            {buttonText}
                        </button>
                    </h2>
                    <div id={"collapseBox" + idSuffix} className="accordion-collapse collapse" data-bs-parent={"#accordionExample" + idSuffix}>
                        <div className="accordion-body">
                            <ul className="list-group list-group-flush">
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
        </>
    )
}

export default Apple
