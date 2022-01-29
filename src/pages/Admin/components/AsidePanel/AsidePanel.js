import AsideNav from "../../../../components/AsideNav/AsideNav";
import "./aside-panel.scss"

function AsidePanel ({asideItems}) {
    return (
        <div className="aside-panel">
            <AsideNav navItems={asideItems} useRouting={true}/>
        </div>
    )
}

export default AsidePanel
