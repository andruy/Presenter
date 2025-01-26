import { useState, useRef } from 'react'

const Modal = ({ number, title, Content }) => {
    const [isDisabled, setIsDisabled] = useState(true)
    const [showCheckmark, setShowCheckmark] = useState(false)
    const [showX, setShowX] = useState(false)
    const contentRef = useRef(null)
    const spanRef = useRef(null)
    const buttonRef = useRef(null)
    const showingTime = 5000

    const toggleCheckmark = () => {
        setShowCheckmark(prev => !prev)
    }

    const toggleX = () => {
        setShowX(prev => !prev)
    }

    async function submit() {
        if (spanRef.current && contentRef.current) {
            setIsDisabled(true)
            spanRef.current.classList.toggle('visually-hidden')

            const response = await contentRef.current.send()

            if (response.report) {
                spanRef.current.classList.toggle('visually-hidden')
                toggleCheckmark()

                setTimeout(() => {
                    toggleCheckmark()
                    setIsDisabled(false)
                }, showingTime)
            } else {
                spanRef.current.classList.toggle('visually-hidden')
                toggleX()

                setTimeout(() => {
                    toggleX()
                    setIsDisabled(false)
                }, showingTime)
            }
        }
    }

    return (
        <div className="modal fade" id={"staticBackdrop" + number} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={"staticBackdropLabel" + number} aria-modal>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id={"staticBackdropLabel" + number}>{title}</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Content isDisabled={setIsDisabled} parentButtonRef={buttonRef} ref={contentRef} />
                    </div>
                    <div className="modal-footer">
                        <span ref={spanRef} className="spinner-border text-primary visually-hidden" role="status"></span>
                        {
                            showCheckmark && <div>
                                <svg className="checkmark" viewBox="0 0 52 52">
                                    <path d="M14 27 L22 35 L38 17" />
                                </svg>
                            </div>
                        }
                        {
                            showX && <div>
                                <svg className="xmark" viewBox="0 0 52 52">
                                    <path d="M14 14 L38 38" />
                                    <path d="M38 14 L14 38" />
                                </svg>
                            </div>
                        }
                        <button ref={buttonRef} onClick={submit} type="button" className="btn btn-outline-primary" disabled={isDisabled}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
