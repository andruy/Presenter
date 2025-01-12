import { useState } from 'react'

const Modal = ({ number, title, Content }) => {
    const [enpoint, setEndpoint] = useState(null)
    const [dataFromChild, setDataFromChild] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)

    const handleEndpoint = data => {
        setEndpoint(data)
      }

    const handleDataFromChild = data => {
        setDataFromChild(data.data)
        setIsDisabled(data.status)
    }

    return (
        <div className="modal fade" id={"staticBackdrop" + number} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={"staticBackdropLabel" + number} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn modal-title fs-5" id={"staticBackdropLabel" + number}>{title}</button>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Content sendDataToParent={handleDataFromChild} sendOnPageLoad={handleEndpoint} />
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => enpoint.send(dataFromChild)} type="button" className="btn btn-outline-primary" disabled={isDisabled}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
