const ModalButton = ({ number, title, onClick }) => {
    return (
        <button onClick={onClick} type="button" className="btn btn-dark btn-lg" data-bs-toggle="modal" data-bs-target={"#staticBackdrop" + number}>
            {title}
        </button>
    )
}

export default ModalButton
