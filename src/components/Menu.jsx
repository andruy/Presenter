import ModalButton from './ModalButton';
import Modal from './Modal';
import Apple from './Apple';
import Microsoft from './Microsoft';

function Menu() {
    const firstObject = {
        id: 1,
        name: <i className="fa-brands fa-apple"></i>
    }

    const secondObject = {
        id: 2,
        name: <i className="fa-brands fa-microsoft"></i>
    }

    return (
        <>
            <div className="btn-group-vertical">
                <ModalButton number={firstObject.id} title={firstObject.name} />
                <ModalButton number={secondObject.id} title={secondObject.name} />
            </div>
            <Modal number={firstObject.id} title={firstObject.name} Content={Apple} />
            <Modal number={secondObject.id} title={secondObject.name} Content={Microsoft} />
        </>
    )
}

export default Menu
