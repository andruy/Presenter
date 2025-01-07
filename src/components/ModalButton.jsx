const ModalButton = ({ number, title }) => {
    return (
        <button type="button" className="btn btn-outline-primary btn-lg" data-bs-toggle="modal" data-bs-target={"#staticBackdrop" + number}>
            {title}
        </button>
    )
}

export default ModalButton
