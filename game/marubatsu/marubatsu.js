
(() => {
    const rowSize = 3;
    const colSize = 3;
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
            status = judge();
            player = player === 1 ? 2 : 1;
            draw();
        }
    }

    function judge() {
        if (
            (data[0][0] === player && data[0][1] === player && data[0][2] === player) ||
            (data[1][0] === player && data[1][1] === player && data[1][2] === player) ||
            (data[2][0] === player && data[2][1] === player && data[2][2] === player) ||
            (data[0][0] === player && data[1][0] === player && data[2][0] === player) ||
            (data[0][1] === player && data[1][1] === player && data[2][1] === player) ||
            (data[0][2] === player && data[1][2] === player && data[2][2] === player) ||
            (data[0][0] === player && data[1][1] === player && data[2][2] === player) ||
            (data[0][2] === player && data[1][1] === player && data[2][0] === player)
        ) {
            return player;
        }
        return data.flat().includes(0) ? 0 : 3;
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
