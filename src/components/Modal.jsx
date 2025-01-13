import { useState, useRef } from 'react'

const Modal = ({ number, title, Content }) => {
    const [endpoint, setEndpoint] = useState(null)
    const [dataFromChild, setDataFromChild] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)
    const [showCheckmark, setShowCheckmark] = useState(false)
    const [showX, setShowX] = useState(false)
    const spanRef = useRef(null)
    const showingTime = 5000

    const toggleCheckmark = () => {
        setShowCheckmark((prev) => !prev)
    }

    const toggleX = () => {
        setShowX((prev) => !prev)
    }

    const handleEndpoint = data => {
        setEndpoint(data)
      }

    const handleDataFromChild = data => {
        setDataFromChild(data.data)
        setIsDisabled(data.status)
    }

    async function submit() {
        if (spanRef.current) {
            setIsDisabled(true)
            spanRef.current.classList.toggle('visually-hidden')

            const response = await endpoint.send(dataFromChild)

            if (response.report) {
                spanRef.current.classList.toggle('visually-hidden')
                toggleCheckmark()

                setTimeout(() => {
                    toggleCheckmark()
                }, showingTime)
            } else {
                spanRef.current.classList.toggle('visually-hidden')
                toggleX()

                setTimeout(() => {
                    toggleX()
                }, showingTime)
            }

            setIsDisabled(false)
        }
    }

    return (
        <div className="modal fade" id={"staticBackdrop" + number} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={"staticBackdropLabel" + number} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id={"staticBackdropLabel" + number}>{title}</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Content sendDataToParent={handleDataFromChild} sendOnPageLoad={handleEndpoint} />
                    </div>
                    <div className="modal-footer">
                        <span ref={spanRef} className="spinner-border text-primary visually-hidden" role="status"></span>
                        {
                            showCheckmark && <div className="checkmark-container">
                                <svg className="checkmark" viewBox="0 0 52 52">
                                    <path d="M14 27 L22 35 L38 17" />
                                </svg>
                            </div>
                        }
                        {
                            showX && <div className="x-container">
                                <svg className="xmark" viewBox="0 0 52 52">
                                    <path d="M14 14 L38 38" />
                                    <path d="M38 14 L14 38" />
                                </svg>
                            </div>
                        }
                        <button onClick={() => submit()} type="button" className="btn btn-outline-primary" disabled={isDisabled}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
