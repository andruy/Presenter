import { useState, useEffect, useRef } from "react"

const Microsoft = ({ sendDataToParent, sendOnPageLoad, responseFromParent, updateResponse }) => {
    const [buttonText, setButtonText] = useState("Empty")
    const [inputValue, setInputValue] = useState("")
    const [selectValue, setSelectValue] = useState("")
    const [linksObject, setLinksObject] = useState({})
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
            setLinksObject({})
            updateResponse(false)
        }
    }, [responseFromParent])

    useEffect(() => {
        setPlusIsDisabled(inputValue.trim() === '' || selectValue === '' ? true : false)
    }, [inputValue, selectValue])

    useEffect(() => {
        setButtonText(Object.keys(linksObject).length > 0 ? `Total links: ${Object.keys(linksObject).length}, ${Object.values(linksObject).reduce((acc, arr) => acc + arr.length, 0)}` : 'Empty')
        if (Object.keys(linksObject).length === 0) {
            const button = buttonRef.current
            if (button && !button.classList.contains('collapsed')) {
                button.click()
            }
        }
        setAccordionIsDisabled(Object.keys(linksObject).length > 0 ? false : true)
        const theObject = {
            data: {
                links: linksObject
            },
            status: Object.keys(linksObject).length > 0 ? false : true
        }
        sendDataToParent(theObject)
    }, [linksObject])

    const handleSelectChange = event => {
        setSelectValue(event.target.value)
    }

    const handleInputChange = event => {
        setInputValue(event.target.value)
    }

    const handleAddLink = () => {
        if (inputValue.trim() !== '' && selectValue !== '') {
            setLinksObject(prevLinksObject => ({
                ...prevLinksObject,
                [selectValue]: [...(prevLinksObject[selectValue] || []), inputValue]
            }))
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
            <select value={selectValue} onChange={handleSelectChange} className="form-select form-select-lg mb-3" aria-label="Default select example">
                <option value="" disabled hidden>Choose directory...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
            <div className="input-group mb-3">
                <input value={inputValue} onKeyDown={handleKeyDown} onChange={handleInputChange} className="form-control form-control-lg" type="text" placeholder="Enter links..." />
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
                            <ul className="list-group list-group-flush">
                                {
                                    Object.keys(linksObject).map((key, index) => (
                                        <li key={index} className="list-group-item">
                                            <h5 className="card-title">{key}</h5>
                                            <ul className="list-group list-group-flush">
                                                {
                                                    linksObject[key].map((link, linkIndex) => (
                                                        <li key={linkIndex} className="list-group-item d-flex justify-content-between align-items-center">
                                                            {link}
                                                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => {
                                                                setLinksObject(prevLinksObject => {
                                                                    const updatedLinks = { ...prevLinksObject }
                                                                    updatedLinks[key] = updatedLinks[key].filter((_, i) => i !== linkIndex)
                                                                    if (updatedLinks[key].length === 0) {
                                                                        delete updatedLinks[key]
                                                                    }
                                                                    return updatedLinks
                                                                })
                                                            }}>
                                                                <i className="fa-solid fa-trash"></i>
                                                            </button>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Microsoft
