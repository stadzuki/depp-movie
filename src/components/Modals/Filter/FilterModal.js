import {useEffect, useReducer, useState} from "react";
import "./filter-modal.scss";

function FilterModal({
    close, resetFilters, selectFilter, clearsFilters, targetFilters,
    useServerFilters, currentGlobalFilter, filtersStore, getFilmsByFilters,
    notFoundFilters, setNotFoundFilters
}) {
    const [filtersSettings, setFiltersSettings] = useState(clearsFilters);
    const [localFilters, setLocalFilters] = useState(targetFilters);
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        if (useServerFilters) {
            currentGlobalFilter.getFilterFromServer(targetFilters, setLocalFilters, forceUpdate);
        }
    }, [])

    useEffect(() => {
        setFiltersSettings(filtersStore)
    }, [filtersStore])

    function onSelectFilter(id, key, title) {
        if (id === -1) return;
        if (notFoundFilters) setNotFoundFilters(false);

        selectFilter(id, key, title);
    }

    function onGetFilmsByFilters () {
        getFilmsByFilters();
    }

    function renderFilter(item, id, key) {
        const isActive = (condition = false) => {
            if (filtersSettings[key] instanceof Array && filtersSettings[key].find(f => f.id === item.id))
                return condition ? true : 'filter-modal__item--active';

            if (filtersSettings[key]?.id === item.id)
                return condition ? true :'filter-modal__item--active';

            return condition ? false : '';
        }

        return (
            <li
                key={id}
                className={`filter-modal__item ${isActive()}`}
                onClick={() => onSelectFilter(item.id, key, item.title)}>
                {item.title}
                {isActive(true)
                    ? <img className="filter-modal__item__clear-filter" src="/img/remove-filter.svg" width={11} height={11}/>
                    : ''
                }
            </li>
        )
    }

    return (
        <div className="filter-modal">
            {localFilters.map((filterStore, id) => (
                <div key={id} className="filter-modal__filter-by">
                    <p className="filter-modal__title">{filterStore.title}</p>
                    <ul className="filter-modal__list">
                        {filterStore.filters.map((item, id) => renderFilter(item, id, filterStore.key))}
                    </ul>
                </div>
            ))}
            {Object.values(filtersStore).join() === Object.values(clearsFilters).join()
                ? <div className="filter-modal__close filter-modal__text-button" onClick={close}>Закрыть</div>
                :<div className="filter-modal__show-result">
                    {notFoundFilters
                        ? <div className="filter-modal__no-result filter-modal__text-button--red">Результатов нет</div>
                        : <button className="filter-modal__button" onClick={onGetFilmsByFilters}>Показать результаты</button>
                    }
                    <div className="filter-modal__reset filter-modal__text-button" onClick={resetFilters}>Сбросить</div>
                </div>
            }
        </div>
    )
}

export default FilterModal
