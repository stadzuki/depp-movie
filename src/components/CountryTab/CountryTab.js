import "./country-tab.scss";

function CountryTab ({activeTab, onTabClick}) {

    const countyTabs = [
        {id: 'ru', title: 'На русском 🇷🇺'},
        {id: 'en', title: 'На английском 🇬🇧'},
        {id: 'cn', title: 'На китайском 🇨🇳'},
    ];

    return (
        <ul className="country-tab-list">
            {countyTabs.map((country, id) => (
                <li key={id} className={`country-tab-list__country ${activeTab === country.id ? 'country-tab-list__country--active' : ''}`} onClick={() => onTabClick(country.id)}>
                    {country.title}
                </li>
            ))}
        </ul>
    )
}

export default CountryTab
