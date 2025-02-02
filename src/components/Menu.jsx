import { useRef } from 'react'
import ModalButton from './ModalButton'
import Modal from './Modal'
import Apple from './Apple'
import Microsoft from './Microsoft'
import Folder from './Folder'
import Hourglass from './Hourglass'
import Calendar from './Calendar'
import Clipboard from './Clipboard'
import Pollo from './Pollo'

function Menu() {
    let idProvider = 0

    const apple = {
        id: ++idProvider,
        name: <i className="fa-brands fa-apple"></i>,
        ref: useRef(null)
    }

    const microsoft = {
        id: ++idProvider,
        name: <i className="fa-brands fa-microsoft"></i>,
        ref: useRef(null)
    }

    const folder = {
        id: ++idProvider,
        name: <i className="fa-solid fa-folder-closed"></i>,
        ref: useRef(null)
    }

    const hourglass = {
        id: ++idProvider,
        name: <i className="fa-regular fa-hourglass-half"></i>,
        ref: useRef(null)
    }

    const calendar = {
        id: ++idProvider,
        name: <i className="fa-regular fa-calendar-days"></i>,
        ref: useRef(null)
    }

    const clipboard = {
        id: ++idProvider,
        name: <i className="fa-regular fa-clipboard"></i>,
        ref: useRef(null)
    }

    const pollo = {
        id: ++idProvider,
        name: <i className="fa-solid fa-drumstick-bite"></i>,
        ref: useRef(null)
    }

    return (
        <>
            <div className="btn-group-vertical">
                <ModalButton number={apple.id} title={apple.name} onClick={() => { }} />
                <ModalButton number={microsoft.id} title={microsoft.name} onClick={() => { if (microsoft.ref.current) microsoft.ref.current.getDirectories() }} />
                <ModalButton number={folder.id} title={folder.name} onClick={() => { }} />
                <ModalButton number={hourglass.id} title={hourglass.name} onClick={() => { }} />
                <ModalButton number={calendar.id} title={calendar.name} onClick={() => { if (calendar.ref.current) calendar.ref.current.getActions() }} />
                <ModalButton number={clipboard.id} title={clipboard.name} onClick={() => { if (clipboard.ref.current) clipboard.ref.current.gatherTaskList() }} />
                <ModalButton number={pollo.id} title={pollo.name} onClick={() => { }} />
            </div>

            <Modal number={apple.id} title={apple.name} Content={Apple} ref={apple.ref} />
            <Modal number={microsoft.id} title={microsoft.name} Content={Microsoft} ref={microsoft.ref} />
            <Modal number={folder.id} title={folder.name} Content={Folder} ref={folder.ref} />
            <Modal number={hourglass.id} title={hourglass.name} Content={Hourglass} ref={hourglass.ref} />
            <Modal number={calendar.id} title={calendar.name} Content={Calendar} ref={calendar.ref} />
            <Modal number={clipboard.id} title={clipboard.name} Content={Clipboard} ref={clipboard.ref} />
            <Modal number={pollo.id} title={pollo.name} Content={Pollo} ref={pollo.ref} />
        </>
    )
}

export default Menu
