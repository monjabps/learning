
(() => {
    const ROW_SIZE = 8;
    const COL_SIZE = 8;
    const PLAYER_CLASSES = ['', 'black', 'white'];
    const STATUS = {playing: 1, end: 2};
    const PLAYER = {space: 0, black: 1, white: 2};
    const MV = [
        [-1, 0], [-1, 1], [0, 1], [1, 1],
        [1, 0], [1, -1], [0, -1], [-1, -1]
    ];
    let data;
    let nextPlaces;
    let player;
    let status;

    function createButtons() {
        document.getElementById('btnStart').addEventListener('click', () => {
            initData();
            draw();
        });

        const container = document.getElementById('container');
        for (let row = 0; row < ROW_SIZE; row++) {
            const div = document.createElement('div');
            div.className = 'row';
            for (let col = 0; col < COL_SIZE; col++) {
                const btn = document.createElement('button');
                btn.id = `btnR${row}C${col}`;
                btn.addEventListener('click', () => clickBoard(row, col));
                div.appendChild(btn);
            }
            container.appendChild(div);
        }
    }

    function initData() {
        data = [...Array(ROW_SIZE)].map(() => Array(COL_SIZE).fill(PLAYER.space));
        data[3][3] = PLAYER.black;
        data[3][4] = PLAYER.white;
        data[4][3] = PLAYER.white;
        data[4][4] = PLAYER.black;
        player = PLAYER.black;
        status = STATUS.playing;
        createNextPlaces()
    }

    function clickBoard(row, col) {
        if (status === STATUS.playing && nextPlaces[row][col]) {
            reverse(row, col);
            player = player === PLAYER.black ? PLAYER.white : PLAYER.black;
            if (!createNextPlaces()) {
                player = player === PLAYER.black ? PLAYER.white : PLAYER.black;
                if (!createNextPlaces()) {
                    status = STATUS.end;
                }
            }
            draw();
        }
    }

    function reverse(row, col) {
        data[row][col] = player;
        MV.forEach(v => reverseLine(row + v[0], col + v[1], v[0], v[1]));
    }

    function reverseLine(row, col, vr, vc) {
        if (0 <= row && row < ROW_SIZE && 0 <= col && col < COL_SIZE) {
            if (data[row][col] === PLAYER.space) {
                return false;
            }
            if (data[row][col] === player) {
                return true;
            }
            if (reverseLine(row + vr, col + vc, vr, vc)) {
                data[row][col] = player;
                return true;
            }
        }
        return false;
    }

    // 配置できる位置の一覧をnextPlacesに作成し、配置できる箇所がある場合はtrueを返す
    function createNextPlaces() {
        nextPlaces = [...Array(ROW_SIZE)].map((_, row) => 
            [...Array(COL_SIZE)].map((_, col) => canPutPlace(row, col))
        );
        return nextPlaces.flat().includes(true);
    }

    // 指定位置に配置できるかどうかを返す
    function canPutPlace(row, col) {
        if (data[row][col] !== PLAYER.space) {
            return false;
        }
        for (const v of MV) {
            let foundEnemy = false;
            for (let r = row + v[0], c = col + v[1]; 0 <= r && r < ROW_SIZE && 0 <= c && c < COL_SIZE; r += v[0], c += v[1]) {
                if (data[r][c] === PLAYER.space) {
                    break;
                }
                if (data[r][c] === player) {
                    if (foundEnemy) {
                        return true;
                    }
                    break;
                }
                if (data[r][c] === (player === PLAYER.black ? PLAYER.white : PLAYER.black)) {
                    foundEnemy = true;
                }
            }
        }
        return false;
    }

    function draw() {
        data.forEach((cols, i) => {
            cols.forEach((v, j) => {
                const btn = document.getElementById(`btnR${i}C${j}`);
                btn.className = `${PLAYER_CLASSES[v]} ${nextPlaces[i][j] ? 'next-place' : 'no-place'}`;
            });
        });
        const black = data.flat().reduce((sum, v) => v === PLAYER.black ? sum + 1 : sum, 0);
        const white = data.flat().reduce((sum, v) => v === PLAYER.white ? sum + 1 : sum, 0);
        document.getElementById('vs').textContent = `黒 ${black} VS 白 ${white}`;
        document.getElementById('status').textContent = getResultText(black, white);
    }

    function getResultText(black, white) {
        if (status === STATUS.playing) {
            return `${player === PLAYER.black ? '黒' : '白'}のターン`;
        }
        if (black === white) {
            return '引き分け';
        }
        return `${black > white ? '黒' : '白'}の勝利`;
    }

    createButtons();
    initData();
    draw();
})();
