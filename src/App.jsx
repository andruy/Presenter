import { useRef } from 'react'
import './App.css'
import MenuButton from './components/MenuButton'
import Modal from './components/Modal'
import Apple from './components/Apple'
import Microsoft from './components/Microsoft'
import Folder from './components/Folder'
import Hourglass from './components/Hourglass'
import Calendar from './components/Calendar'
import Notepad from './components/Notepad'
import Pollo from './components/Pollo'

function App() {
    const logoRef = useRef(null)
    function openMenu() {
        if (logoRef.current) logoRef.current.click()
    }

    const modals = [
        {
            icon: <i className="fa-brands fa-apple"></i>,
            ref: useRef(null),
            component: Apple,
            onClick: () => { openMenu() }
        },
        {
            icon: <i className="fa-brands fa-microsoft"></i>,
            ref: useRef(null),
            component: Microsoft,
            onClick: ref => { openMenu(); if (ref.current) ref.current.getDirectories() }
        },
        {
            icon: <i className="fa-solid fa-folder-closed"></i>,
            ref: useRef(null),
            component: Folder,
            onClick: () => { openMenu() }
        },
        {
            icon: <i className="fa-regular fa-hourglass-half"></i>,
            ref: useRef(null),
            component: Hourglass,
            onClick: () => { openMenu() }
        },
        {
            icon: <i className="fa-regular fa-calendar-days"></i>,
            ref: useRef(null),
            component: Calendar,
            onClick: ref => { openMenu(); if (ref.current) ref.current.getActions() }
        },
        {
            icon: <i className="fa-regular fa-clipboard"></i>,
            ref: useRef(null),
            component: Notepad,
            onClick: ref => { openMenu(); if (ref.current) ref.current.gatherTaskList() }
        },
        {
            icon: <i className="fa-solid fa-drumstick-bite"></i>,
            ref: useRef(null),
            component: Pollo,
            onClick: () => { openMenu() }
        }
    ]

    return (
        <>
            <div className="position-relative">
                <div className="position-absolute top-0 end-0">
                    <MenuButton ref={logoRef} />
                </div>
            </div>

            <div className="centered">
                <div className="collapse collapse-horizontal" id="collapseExample">
                    <div className="btn-group-vertical">
                        {modals.map((modal, index) => (
                            <button key={index} onClick={() => modal.onClick(modal.ref)} type="button" className="btn btn-dark btn-lg" data-bs-toggle="modal" data-bs-target={"#staticBackdrop" + index}>
                                {modal.icon}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {modals.map((modal, index) => (
                <Modal key={index} number={index} title={modal.icon} Content={modal.component} openMenu={openMenu} ref={modal.ref} />
            ))}
        </>
    )
}

export default App
