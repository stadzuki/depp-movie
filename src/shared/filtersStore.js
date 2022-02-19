export const filmGlobalFilters = [
    {
        title: 'Формат',
        key: 'format',
        filters: [
            {id: 0, title: 'Фильм'},
            {id: 1, title: 'Сериал'},
            {id: 2, title: 'Короткий метр'}
        ]
    },
    {
        title: 'Жанр',
        key: 'genre',
        filters: [
            {id: -1, title: 'Загрузка жанров'}
        ],
        from_serve: true
    },
    {
        title: 'Погружение',
        key: 'immersion',
        filters: [
            {id: 0, title: 'Иммерсивный'},
            {id: 1, title: 'Неиммерсивный'}
        ]
    },
    {
        title: 'Премьера',
        key: 'premiere',
        filters: [
            {id: 0, title: 'После премьеры'},
            {id: 1, title: 'В разработке'}
        ]
    },
]

export const portalGlobalFilters = [
    {
        title: '',
        key: 'portalFilter',
        filters: [
            {id: 'PortalAll', title: 'Все форматы'},
            {id: 'PortalVideo', title: 'Видео'},
            {id: 'PortalText', title: 'Тексты'},
            {id: 'PortalImage', title: 'Изображения'},
            {id: 'PortalBackstage', title: 'Бекстейдж'}
        ]
    }
]
