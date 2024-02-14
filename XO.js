let player = [];
let turn = 0;
let game_over = false;
let tableSize = parseInt(document.getElementById("table_size").value);
let board = new Array(tableSize)
    .fill("")
    .map(() => new Array(tableSize).fill(""));

    function changeTable(event) {
        tableSize = parseInt(event.target.value);
        board = new Array(tableSize)
            .fill("")
            .map(() => new Array(tableSize).fill(""));
    };

    document.getElementById("table_size").addEventListener("change", changeTable);

    function start_game() {
        let p1_input = document.getElementById("p1");
        let p2_input = document.getElementById("p2");
        let select = document.getElementById("table_size");

        if (p1_input.value.length < 1 || p2_input.value.length < 1) {
            alert("Name is required!");
            return;
        }

        p1_input.setAttribute("disabled", true);
        p2_input.setAttribute("disabled", true);
        select.setAttribute("disabled", true);

        let game = document.getElementById("game_box");
        game.classList.remove("hide");

        player.push(p1_input.value);
        player.push(p2_input.value);

        document.getElementById("turn").innerHTML = player[turn % 2] + "'s turn";
        init_game();
    };

    function onClick(cell, i, j) {
        console.log(board);
        console.log(i, j);
        const e1 = cell;
        if (e1.innerHTML !== "" || game_over) {
            return;
        }

        board[i][j] = turn % 2 === 0 ? "X" : "O";
        e1.innerHTML = board[i][j];

        if (cal_winner()) {
            alert(player[turn % 2] + " won!!!");
            game_over = true;
            return;
        }
        turn++;

        document.getElementById("turn").innerHTML = player[turn % 2] + "'s turn";
        if (turn === tableSize * tableSize) {
            alert("Both players are drawn!");
            game_over = true;
            return;
        }
    };

    function init_game() {
        let box = document.getElementById("game_box");
        for (let i = 0; i < tableSize; i++) {
            let row = document.createElement("div");
            row.className = "row";
            for (let j = 0; j < tableSize; j++) {
                let cell = document.createElement("div");
                cell.addEventListener("click", (event) => onClick(cell, i, j));
                cell.className = "cell";
                row.appendChild(cell);
            }
            box.appendChild(row);
        }
    };

    function cal_winner() {
        //check for all rows and columns
        let len = board.length;
        if (turn < len) {
            return false;
        }

        for (let i = 0; i < len; i++) {
            if (board[i].every((e1) => e1 === board[i][0] && e1 !== "")) {
                return true;
            }

            let col_val = board[0][i];
            let count = 1;
            for (let j = 1; j < len; j++) {
                if (col_val === board[j][i] && col_val !== "") {
                    count++;
                }
            }

            if (count === len) {
                return true;
            }
        }

        //check for all diagonals
        let i = board[0][0];
        let j = 0;
        while (j < len) {
            if (board[0][0] === "") {
                break;
            }
            if (board[j][j] !== i) {
                break;
            } 
            else {
                j++;
            }
        }
        
        if (j === len) {
            return true;
        }

        let rev_i = 0;
        let rev_j = len - 1;
        let rev_val = board[rev_i][rev_j];

        while (rev_i < len) {
            if (board[rev_i][rev_j] === "") {
                break;
            }
            if (rev_val !== board[rev_i][rev_j]) {
                break;
            } 
            else {
                rev_i++;
                rev_j--;
            }
        }
        
        if (rev_i === len) {
            return true;
        }

        return false;
    };

    function reset_game() {
        const cell = document.getElementsByClassName("cell");
        for (let i = 0; i < cell.length; i++) {
            cell[i].textContent = null;
        }
        turn = 0;
        game_over = false;
        document.getElementById("turn").innerHTML = player[turn % 2] + "'s turn";
    }