
(() => {
    const rowSize = 5;
    const colSize = 5;
    let data;

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
                btn.addEventListener('click', () => {
                    changeLight(row, col);
                    draw();
                });
                div.appendChild(btn);
            }
            container.appendChild(div);
        }
    }

    function initData() {
        data = [...Array(rowSize)].map(() => Array(colSize).fill(true));
        for (let i = 0; i < 255; i++) {
            const row = Math.floor(Math.random() * rowSize);
            const col = Math.floor(Math.random() * colSize);
            changeLight(row, col);
        }
    }

    function changeLight(row, col) {
        const vr = [0, -1, 0, 1, 0];
        const vc = [0, 0, 1, 0, -1];
        for (let i = 0; i < vr.length; i++) {
            const r = row + vr[i];
            const c = col + vc[i];
            if (0 <= r && r < rowSize && 0 <= c && c < colSize) {
                data[r][c] = !data[r][c];
            }
        }
    }

    function draw() {
        let offCount = 0;
        for (let row = 0; row < rowSize; row++) {
            for (let col = 0; col < colSize; col++) {
                const btn = document.getElementById(`btnR${row}C${col}`);
                btn.className = data[row][col] ? 'on' : 'off';
                offCount += data[row][col] ? 0 : 1;
            }
        }
        document.getElementById('result').textContent = offCount > 0 ? `残り${offCount}個` : 'クリア';
    }

    createButtons();
    initData();
    draw();
})();
