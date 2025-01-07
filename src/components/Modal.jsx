const Modal = ({ number, title, Content }) => {
    return (
        <div className="modal fade" id={"staticBackdrop" + number} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={"staticBackdropLabel" + number} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id={"staticBackdropLabel" + number}>{title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Content />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
