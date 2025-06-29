const board = document.getElementById('gameboard');
const size = 4;
let tiles = [];
let score = 0;

function createBoard() {
    tiles = [];
    board.innerHTML = '';
    for (let i = 0; i < size * size; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        board.appendChild(tile);
        tiles.push(tile);
    }
    addNumber();
    addNumber();
}

function addNumber() {
    const emptyTiles = tiles.filter(tile => tile.innerText === '');
    if (emptyTiles.length === 0) return;
    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    const value = Math.random() < 0.9 ? 2 : 4;
    randomTile.innerText = value;
    randomTile.classList.add('new-tile');
    setTimeout(() => randomTile.classList.remove('new-tile'), 300);
}

function getRow(row) {
    return tiles.slice(row * size, (row + 1) * size);
}

function getColumn(col) {
    return Array.from({ length: size }, (_, i) => tiles[i * size + col]);
}

function slide(row) {
    const nums = row.map(tile => Number(tile.innerText) || 0);
    const filtered = nums.filter(n => n !== 0);
    for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
            filtered[i] *= 2;
            score += filtered[i];
            filtered[i + 1] = 0;
            row[i].classList.add('merged');
        }
    }
    const merged = filtered.filter(n => n !== 0);
    while (merged.length < size) merged.push(0);
    return merged;
}

function updateRow(row, values) {
    for (let i = 0; i < size; i++) {
        const tile = row[i];
        tile.innerText = values[i] === 0 ? '' : values[i];
        tile.classList.remove('merged');
    }
}

function moveLeft() {
    for (let r = 0; r < size; r++) {
        const row = getRow(r);
        const newValues = slide(row);
        updateRow(row, newValues);
    }
}

function moveRight() {
    for (let r = 0; r < size; r++) {
        const row = getRow(r).reverse();
        const newValues = slide(row).reverse();
        updateRow(row.reverse(), newValues);
    }
}

function moveUp() {
    for (let c = 0; c < size; c++) {
        const col = getColumn(c);
        const newValues = slide(col);
        updateRow(col, newValues);
    }
}

function moveDown() {
    for (let c = 0; c < size; c++) {
        const col = getColumn(c).reverse();
        const newValues = slide(col).reverse();
        updateRow(col.reverse(), newValues);
    }
}

function handleKey(e) {
    let moved = false;
    switch (e.key) {
        case 'ArrowLeft':
            moveLeft();
            moved = true;
            break;
        case 'ArrowRight':
            moveRight();
            moved = true;
            break;
        case 'ArrowUp':
            moveUp();
            moved = true;
            break;
        case 'ArrowDown':
            moveDown();
            moved = true;
            break;
    }
    if (moved) {
        addNumber();
        document.getElementById('score').innerText = score;
    }
}

window.addEventListener('keydown', handleKey);
createBoard();
