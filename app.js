'use strict';


let grid = new Grid({
    wrapper: 'inputTable',
    columns: [
        {th: 'один'},
        {th: 'два'},
        {th: 'три'},
        {th: 'четыре'},
        {th: 'пять'}
    ],
    rows: [
        {tr: [5, 'банан', 'виноград', 'груша', 'дрозд']},
        {tr: [9, 'ёлка', 'жезл', 'змея', 'игрушка']},
        {tr: [7, 'лимон', 'молоко', 'натюрморт', 'очки']},
        {tr: [3, 'ручка', 'стол', 'тетрадь', 'флейта']},
        {tr: [5, 'ёлка', 'жезл', 'змея', 'игрушка']},
        {tr: [6, 'ручка', 'стол', 'тетрадь', 'флейта']}
    ],
    caption: 'Буквы алфавита'

});

grid.insertTable();







