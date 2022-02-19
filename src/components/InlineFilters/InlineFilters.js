function InlineFilters ({filters, resetFilters, selectFilter, showFilterModal, getFilmsByFilters}) {

    function onFilterRemove (filter) {
        selectFilter(filter.id, filter.key, filter.title)
        setTimeout(() => getFilmsByFilters())
    }

    return (
        <>
            <button className="filters__button filters__button--reset" onClick={resetFilters}>Сбросить</button>
            {filters.map((filter, id) => (
                <button key={id} className="filters__button">
                    {filter.title}
                    <img className="filters__button__clear-filter" src="/img/remove-filter.svg" onClick={() => onFilterRemove(filter)} width={11} height={11}/>
                </button>
            ))}
            <button className="filters__button filters__button--add" onClick={() => showFilterModal(true)}>
                <img src="/img/close-outline.svg" width="11" height="11"/>
            </button>
        </>
    )
}

export default InlineFilters
