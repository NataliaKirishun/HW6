(function () {
    'use strict';

    class Grid {

        constructor({
                        wrapper,
                        columns,
                        rows,
                        caption = Grid.getDefaultCaption()
                    }) {
            this.wrapper = wrapper,
                this.columns = columns,
                this.rows = rows,
                this.caption = caption,
                this.table = this.createTable(),
                this.table.addEventListener('click', this);


        }

        static getDefaultCaption() {
            return 'Название таблицы';
        }

        handleEvent(e) {
            if (e.type === 'click')
                return this.onClick(e);

        }

        onClick(e) {
            if ((e.target.tagName === 'TH') || ((e.target.parentNode.tagName === 'TH')))
                this.sortGrid(e.target.cellIndex);

            if (e.target.className === 'minus')
                this.delRow(e.target);

            if (e.target.className === 'plus') {
                this.addRow(e.target.parentNode.parentNode.rowIndex);
                let arrayOfArrows = [...document.getElementsByClassName('btnArrow')];
                for (let i = 0; i < arrayOfArrows.length; i++) {
                    if ((arrayOfArrows.innerHTML === '↓') || (arrayOfArrows.innerHTML === '↑'))
                        this.sortGrid(i);
                }
            }
        };


        createCaption() {
            let caption = document.createElement('caption');
            caption.textContent = this.caption;
            return caption;
        }

        createHeader() {
            let tHead = document.createElement('thead');
            let headTr = document.createElement('tr');
            tHead.appendChild(headTr);
            for (let i = 0; i < this.columns.length; i++) {
                let headTh = document.createElement('th');
                headTh.classList.add('hedTh');
                let arrow = document.createElement('button');
                arrow.textContent = '⇵';
                arrow.classList.add('btnArrow');
                headTh.textContent = this.columns[i].th;
                headTh.appendChild(arrow);
                headTr.append(headTh);
            }
            return tHead;
        }

        createInsBtn() {
            let insBtn = document.createElement('button');
            insBtn.classList.add('plus');
            insBtn.textContent = '+';
            return insBtn;
        }

        createDelBtn() {
            let delBtn = document.createElement('button');
            delBtn.classList.add('minus');
            delBtn.textContent = '-';
            return delBtn;
        }

        createBody() {
            let tBody = document.createElement('tbody');
            tBody.id = 'tBodyElement';
            for (let i = 0; i < this.rows.length; i++) {
                let bodyTr = document.createElement('tr');
                tBody.appendChild(bodyTr);
                for (let j = 0; j < this.rows[i].tr.length; j++) {
                    let bodyTd = document.createElement('td');
                    bodyTd.textContent = this.rows[i].tr[j];
                    bodyTr.appendChild(bodyTd);
                }
                let tdForBtn = document.createElement('td');
                bodyTr.appendChild(tdForBtn);
                tdForBtn.append(this.createInsBtn(), this.createDelBtn());
            }
            return tBody;
        }

        delRow(target) {
            this.table.deleteRow(target.parentNode.parentNode.rowIndex);
        }

        addRow(index) {
            let newRow = this.table.insertRow(index);
            console.log(this.table);
            console.log(newRow);
            for (let i = 0; i < this.columns.length; i++) {
                let td = document.createElement('td');
                let form = document.createElement('form');
                let input = document.createElement('input');
                input.type = 'text';
                form.appendChild(input);
                td.appendChild(form);
                form.addEventListener('submit', function () {
                    td.textContent = input.value;
                });
                newRow.appendChild(td);


            }

            let td = document.createElement('td');
            td.append(this.createInsBtn(), this.createDelBtn());
            newRow.appendChild(td);

        }

        createTable() {
            let table = document.createElement('table');
            table.id = 'table';
            table.append(this.createCaption(), this.createHeader(), this.createBody());
            return table;
        }

        insertTable() {
            let inputPlace = document.getElementById(this.wrapper);
            inputPlace.appendChild(this.table);

        }

        sortGrid(columnIndex) {
            let tBody = document.getElementById('tBodyElement');
            let rowArray = [].slice.call(tBody.rows);
            let headThArrow = document.getElementsByClassName('btnArrow');
            let headThArrowArray = [].slice.call(headThArrow);

            switch (headThArrowArray[columnIndex].textContent) {
                case '⇵':
                case '↓':
                    rowArray.sort(
                        function (rowA, rowB) {
                            if (!isNaN(rowA)) {
                                return rowA.cells[columnIndex].innerHTML - rowB.cells[columnIndex].innerHTML;
                            } else {
                                return rowA.cells[columnIndex].innerHTML > rowB.cells[columnIndex].innerHTML;
                            }
                        }
                    );
                    for (let i = 0; i < headThArrowArray.length; i++) {
                        headThArrowArray[i].textContent = '⇵';
                    }
                    headThArrowArray[columnIndex].textContent = '↑';
                    break;
                case '↑':
                    rowArray.sort(
                        function (rowA, rowB) {
                            if (!isNaN(rowA)) {
                                return rowB.cells[columnIndex].innerHTML - rowA.cells[columnIndex].innerHTML;
                            } else {
                                return rowA.cells[columnIndex].innerHTML < rowB.cells[columnIndex].innerHTML;
                            }
                        }
                    );
                    for (let i = 0; i < headThArrowArray.length; i++) {
                        headThArrowArray[i].textContent = '⇵';
                    }
                    headThArrowArray[columnIndex].textContent = '↓';
                    break;
            }

            this.table.removeChild(tBody);
            for (let i = 0; i < rowArray.length; i++) {
                tBody.appendChild(rowArray[i]);
            }
            this.table.appendChild(tBody);

        }


    };

    window.Grid = Grid;


}());

