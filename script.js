function allocate() {

    let blocks = document.getElementById("blocks").value.split(",").map(Number);
    let requests = document.getElementById("requests").value.split(",").map(Number);
    let algo = document.getElementById("algo").value;

    let allocation = new Array(requests.length).fill(-1);

    if (algo === "first") {
        firstFit(blocks, requests, allocation);
    } else if (algo === "best") {
        bestFit(blocks, requests, allocation);
    } else {
        worstFit(blocks, requests, allocation);
    }

    displayResult(blocks, requests, allocation);
}

// 🔹 First Fit
function firstFit(blocks, requests, allocation) {
    for (let i = 0; i < requests.length; i++) {
        for (let j = 0; j < blocks.length; j++) {
            if (blocks[j] >= requests[i]) {
                allocation[i] = j;
                blocks[j] -= requests[i];
                break;
            }
        }
    }
}

// 🔹 Best Fit
function bestFit(blocks, requests, allocation) {
    for (let i = 0; i < requests.length; i++) {
        let bestIndex = -1;

        for (let j = 0; j < blocks.length; j++) {
            if (blocks[j] >= requests[i]) {
                if (bestIndex === -1 || blocks[j] < blocks[bestIndex]) {
                    bestIndex = j;
                }
            }
        }

        if (bestIndex !== -1) {
            allocation[i] = bestIndex;
            blocks[bestIndex] -= requests[i];
        }
    }
}

// 🔹 Worst Fit
function worstFit(blocks, requests, allocation) {
    for (let i = 0; i < requests.length; i++) {
        let worstIndex = -1;

        for (let j = 0; j < blocks.length; j++) {
            if (blocks[j] >= requests[i]) {
                if (worstIndex === -1 || blocks[j] > blocks[worstIndex]) {
                    worstIndex = j;
                }
            }
        }

        if (worstIndex !== -1) {
            allocation[i] = worstIndex;
            blocks[worstIndex] -= requests[i];
        }
    }
}

// 🔹 Display Result
function displayResult(blocks, requests, allocation) {
    let output = "";

    for (let i = 0; i < requests.length; i++) {
        if (allocation[i] !== -1) {
            output += `Request ${requests[i]} → Block ${allocation[i] + 1}<br>`;
        } else {
            output += `Request ${requests[i]} → Not Allocated<br>`;
        }
    }

    output += "<br><b>Remaining Blocks:</b><br>";
    blocks.forEach((b, i) => {
        output += `Block ${i + 1}: ${b}<br>`;
    });

    document.getElementById("output").innerHTML = output;
}