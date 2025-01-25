import ModalButton from './ModalButton'
import Modal from './Modal'
import Apple from './Apple'
import Microsoft from './Microsoft'
import Folder from './Folder'
import Hourglass from './Hourglass'
import Calendar from './Calendar'

function Menu() {
    let idProvider = 0

    const firstObject = {
        id: ++idProvider,
        name: <i className="fa-brands fa-apple"></i>
    }

    const secondObject = {
        id: ++idProvider,
        name: <i className="fa-brands fa-microsoft"></i>
    }

    const thirdObject = {
        id: ++idProvider,
        name: <i className="fa-solid fa-folder-closed"></i>
    }

    const fourthObject = {
        id: ++idProvider,
        name: <i className="fa-regular fa-hourglass-half"></i>
    }

    const fithObject = {
        id: ++idProvider,
        name: <i className="fa-regular fa-calendar-days"></i>
    }

    return (
        <>
            <div className="btn-group-vertical">
                <ModalButton number={firstObject.id} title={firstObject.name} />
                <ModalButton number={secondObject.id} title={secondObject.name} />
                <ModalButton number={thirdObject.id} title={thirdObject.name} />
                <ModalButton number={fourthObject.id} title={fourthObject.name} />
                <ModalButton number={fithObject.id} title={fithObject.name} />
            </div>
            <Modal number={firstObject.id} title={firstObject.name} Content={Apple} />
            <Modal number={secondObject.id} title={secondObject.name} Content={Microsoft} />
            <Modal number={thirdObject.id} title={thirdObject.name} Content={Folder} />
            <Modal number={fourthObject.id} title={fourthObject.name} Content={Hourglass} />
            <Modal number={fithObject.id} title={fithObject.name} Content={Calendar} />
        </>
    )
}

export default Menu
