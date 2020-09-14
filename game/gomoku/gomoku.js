
(() => {
    const rowSize = 15;
    const colSize = 15;
    const requiredNumber = 5;
    const players = ['', 'maru', 'batsu'];
    const marks = ['', '〇', '×'];
    const statuses = ['', '〇の勝ち', '×の勝ち', '引き分け'];
    let data;
    let player;
    let status;

    function createButtons() {
        document.getElementById('btnStart').addEventListener('click', () => {
            initData();
            draw();
        });

        const container = document.getElementById('container');
        for (let row = 0; row < rowSize; row++) {
            const div = document.createElement('div');
            div.className = 'row';
            for (let col = 0; col < colSize; col++) {
                const btn = document.createElement('button');
                btn.id = `btnR${row}C${col}`;
                btn.addEventListener('click', () => clickBoard(row, col));
                div.appendChild(btn);
            }
            container.appendChild(div);
        }
    }

    function initData() {
        data = [...Array(rowSize)].map(() => Array(colSize).fill(0));
        player = 1;
        status = 0;
    }

    function clickBoard(row, col) {
        if (status === 0 && data[row][col] === 0) {
            data[row][col] = player;
            status = judge(row, col);
            player = player === 1 ? 2 : 1;
            draw();
        }
    }

    function judge(row, col) {
        if (
            judgeLine(row, col, [[-1, 0], [1, 0]]) ||
            judgeLine(row, col, [[0, -1], [0, 1]]) ||
            judgeLine(row, col, [[-1, -1], [1, 1]]) ||
            judgeLine(row, col, [[-1, 1], [1, -1]])
        ) {
            return player;
        }
        return data.flat().includes(0) ? 0 : 3;
    }

    function judgeLine(row, col, mv) {
        let count = 1;
        for (const v of mv) {
            for (let r = row + v[0], c = col + v[1]; 0 <= r && r < rowSize && 0 <= c && c < colSize; r += v[0], c += v[1]) {
                if (data[r][c] !== player) {
                    break;
                }
                count++;
            }
        }
        return count >= requiredNumber;
    }

    function draw() {
        for (let row = 0; row < rowSize; row++) {
            for (let col = 0; col < colSize; col++) {
                const btn = document.getElementById(`btnR${row}C${col}`);
                btn.className = players[data[row][col]];
                btn.textContent = marks[data[row][col]];
            }
        }
        document.getElementById('result').textContent = status === 0 ? `${player === 1 ? '〇' : '×'}のターン` : statuses[status];
    }

    createButtons();
    initData();
    draw();
})();
