import ModalButton from './ModalButton'
import Modal from './Modal'
import Apple from './Apple'
import Microsoft from './Microsoft'
import Hourglass from './Hourglass'

function Menu() {
    const firstObject = {
        id: 1,
        name: <i className="fa-brands fa-apple"></i>
    }

    const secondObject = {
        id: 2,
        name: <i className="fa-brands fa-microsoft"></i>
    }

    const thirdObject = {
        id: 3,
        name: <i className="fa-regular fa-hourglass-half"></i>
    }

    return (
        <>
            <div className="btn-group-vertical">
                <ModalButton number={firstObject.id} title={firstObject.name} />
                <ModalButton number={secondObject.id} title={secondObject.name} />
                <ModalButton number={thirdObject.id} title={thirdObject.name} />
            </div>
            <Modal number={firstObject.id} title={firstObject.name} Content={Apple} />
            <Modal number={secondObject.id} title={secondObject.name} Content={Microsoft} />
            <Modal number={thirdObject.id} title={thirdObject.name} Content={Hourglass} />
        </>
    )
}

export default Menu
