import { useRef } from 'react'
import './App.css'
import MenuButton from './components/MenuButton'
import ModalButton from './components/ModalButton'
import Modal from './components/Modal'
import Apple from './components/Apple'
import Microsoft from './components/Microsoft'
import Folder from './components/Folder'
import Hourglass from './components/Hourglass'
import Calendar from './components/Calendar'
import Notepad from './components/Notepad'
import Pollo from './components/Pollo'

function App() {
    let idProvider = 0

    const apple = {
        id: ++idProvider,
        icon: <i className="fa-brands fa-apple"></i>,
        ref: useRef(null)
    }

    const microsoft = {
        id: ++idProvider,
        icon: <i className="fa-brands fa-microsoft"></i>,
        ref: useRef(null)
    }

    const folder = {
        id: ++idProvider,
        icon: <i className="fa-solid fa-folder-closed"></i>,
        ref: useRef(null)
    }

    const hourglass = {
        id: ++idProvider,
        icon: <i className="fa-regular fa-hourglass-half"></i>,
        ref: useRef(null)
    }

    const calendar = {
        id: ++idProvider,
        icon: <i className="fa-regular fa-calendar-days"></i>,
        ref: useRef(null)
    }

    const notepad = {
        id: ++idProvider,
        icon: <i className="fa-regular fa-clipboard"></i>,
        ref: useRef(null)
    }

    const pollo = {
        id: ++idProvider,
        icon: <i className="fa-solid fa-drumstick-bite"></i>,
        ref: useRef(null)
    }

    return (
        <>
            <MenuButton />
            <div className="btn-group-vertical">
                <ModalButton number={apple.id} title={apple.icon} onClick={() => { }} />
                <ModalButton number={microsoft.id} title={microsoft.icon} onClick={() => { if (microsoft.ref.current) microsoft.ref.current.getDirectories() }} />
                <ModalButton number={folder.id} title={folder.icon} onClick={() => { }} />
                <ModalButton number={hourglass.id} title={hourglass.icon} onClick={() => { }} />
                <ModalButton number={calendar.id} title={calendar.icon} onClick={() => { if (calendar.ref.current) calendar.ref.current.getActions() }} />
                <ModalButton number={notepad.id} title={notepad.icon} onClick={() => { if (notepad.ref.current) notepad.ref.current.gatherTaskList() }} />
                <ModalButton number={pollo.id} title={pollo.icon} onClick={() => { }} />
            </div>

            <Modal number={apple.id} title={apple.icon} Content={Apple} ref={apple.ref} />
            <Modal number={microsoft.id} title={microsoft.icon} Content={Microsoft} ref={microsoft.ref} />
            <Modal number={folder.id} title={folder.icon} Content={Folder} ref={folder.ref} />
            <Modal number={hourglass.id} title={hourglass.icon} Content={Hourglass} ref={hourglass.ref} />
            <Modal number={calendar.id} title={calendar.icon} Content={Calendar} ref={calendar.ref} />
            <Modal number={notepad.id} title={notepad.icon} Content={Notepad} ref={notepad.ref} />
            <Modal number={pollo.id} title={pollo.icon} Content={Pollo} ref={pollo.ref} />
        </>
    )
}

export default App
