import { useState, useEffect } from "react"

function Apple() {
    const [buttonText, setButtonText] = useState("Empty")
    const [inputValue, setInputValue] = useState("")
    const [linksArray, setLinksArray] = useState([])

    useEffect(() => {
        setButtonText(linksArray.length > 0 ? `Total links: ${linksArray.length}` : 'Empty')
    }, [linksArray])

    const handleChange = event => {
        setInputValue(event.target.value)
    }

    const handleAddLink = () => {
        if (inputValue.trim() !== '') {
            // setLinksArray(prevLinksArray => [...prevLinksArray, inputValue])
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
        <div className="row g-2 align-items-center">
            <div className="col">
                <input value={inputValue} onKeyDown={handleKeyDown} onChange={handleChange} className="form-control" type="text" placeholder="Enter links..." />
            </div>
            <div className="col-auto">
                <button onClick={handleAddLink} type="button" className="btn btn-outline-secondary"><i className="fa-solid fa-plus"></i></button>
            </div>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBox" aria-expanded="false" aria-controls="collapseBox">
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
                                        <button onClick={() => setLinksArray(linksArray.filter((_, i) => i !== index))} className="btn btn-outline-secondary btn-sm">
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

export default Apple
