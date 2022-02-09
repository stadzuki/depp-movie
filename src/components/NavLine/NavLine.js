import "./nav-line.scss"

function NavLine ({navItems, activeItemPos, setCurrentTab, loadCompleteStep}) {
    function onRouteClick (evt, clickedItem) {
        if (clickedItem.tabPos === 3) {
            loadCompleteStep();
            return;
        }

        setCurrentTab(clickedItem)
    }

    return (
        <div className="nav-line">
            {navItems.filter((nav) => nav.tabPos !== 4).map((nav, id) => {
                return (
                    <span key={id} className={`nav-line__element ${nav.tabPos === activeItemPos || (activeItemPos === 4 && nav.tabPos === 3) ? 'nav-line__element--active' : ''}`}>
                        <span onClick={(evt) => onRouteClick(evt, nav)}>{nav.title}</span>
                    </span>
                )
            })}
        </div>
    )
}

export default NavLine
