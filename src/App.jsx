import { useRef } from 'react'
import './App.css'
import MenuButton from './components/MenuButton'
import Modal from './components/Modal'
import Apple from './components/modals/Apple'
import Microsoft from './components/modals/Microsoft'
import Folder from './components/modals/Folder'
import Hourglass from './components/modals/Hourglass'
import Calendar from './components/modals/Calendar'
import Notepad from './components/modals/Notepad'
import Pollo from './components/modals/Pollo'
import Linux from './components/modals/Linux'

function App() {
    const logoRef = useRef(null)

    function openMenu() {
        logoRef.current && logoRef.current.click()
    }

    const modals = [
        {
            icon: <i className="fa-brands fa-apple"></i>,
            extraLargeModal: false,
            ref: useRef(null),
            component: Apple,
            onClick: () => { openMenu() }
        },
        {
            icon: <i className="fa-brands fa-microsoft"></i>,
            extraLargeModal: false,
            ref: useRef(null),
            component: Microsoft,
            onClick: ref => { openMenu(); ref.current && ref.current.getDirectories() }
        },
        {
            icon: <i className="fa-solid fa-folder-closed"></i>,
            extraLargeModal: false,
            ref: useRef(null),
            component: Folder,
            onClick: () => { openMenu() }
        },
        {
            icon: <i className="fa-regular fa-hourglass-half"></i>,
            extraLargeModal: false,
            ref: useRef(null),
            component: Hourglass,
            onClick: () => { openMenu() }
        },
        {
            icon: <i className="fa-regular fa-calendar-days"></i>,
            extraLargeModal: false,
            ref: useRef(null),
            component: Calendar,
            onClick: ref => { openMenu(); ref.current && ref.current.getActions() }
        },
        {
            icon: <i className="fa-regular fa-clipboard"></i>,
            extraLargeModal: false,
            ref: useRef(null),
            component: Notepad,
            onClick: ref => { openMenu(); ref.current && ref.current.gatherTaskList() }
        },
        {
            icon: <i className="fa-solid fa-drumstick-bite"></i>,
            extraLargeModal: false,
            ref: useRef(null),
            component: Pollo,
            onClick: () => { openMenu() }
        },
        {
            icon: <i className="fa-brands fa-linux"></i>,
            extraLargeModal: true,
            ref: useRef(null),
            component: Linux,
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
                <Modal key={index} number={index} title={modal.icon} extraLargeModal={modal.extraLargeModal} Content={modal.component} openMenu={openMenu} ref={modal.ref} />
            ))}
        </>
    )
}

export default App
