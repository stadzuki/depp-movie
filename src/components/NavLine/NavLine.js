import "./nav-line.scss"

function NavLine ({navItems, activeItemPos, setCurrentTab}) {

    function onRouteClick (evt, clickedItem) {
        if (clickedItem.tabPos < activeItemPos) {
            setCurrentTab(clickedItem)
        }
    }

    return (
        <div className="nav-line">
            {navItems.map((nav, id) => {
                return (
                    <span key={id} className={`nav-line__element ${nav.tabPos === activeItemPos ? 'nav-line__element--active' : ''}`}>
                        <span onClick={(evt) => onRouteClick(evt, nav)}>{nav.title}</span>
                    </span>
                )
            })}
        </div>
    )
}

export default NavLine
