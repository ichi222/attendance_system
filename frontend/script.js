/*const apiUrl = "http://127.0.0.1:8000";

async function fetchRecords() {
    let userId = document.getElementById("userId").value;
    let response = await fetch(`${apiUrl}/records?user_id=${userId}`);
    let records = await response.json();
    let table = document.getElementById("recordsTable");
    table.innerHTML = records.map(r => `<tr><td>${r.timestamp}</td><td>${r.type}</td></tr>`).join("");
}

async function clockIn() {
    let userId = document.getElementById("userId").value;
    await fetch(`${apiUrl}/clock-in?user_id=${userId}`, { method: "POST" });
    fetchRecords();
}

async function clockOut() {
    let userId = document.getElementById("userId").value;
    await fetch(`${apiUrl}/clock-out?user_id=${userId}`, { method: "POST" });
    fetchRecords();
}
*/

/*const apiUrl = "http://127.0.0.1:8000";

async function fetchRecords() {
    let userId = document.getElementById("userId").value;
    if (!userId) {
        alert("ユーザーIDを入力してください");
        return;
    }

    try {
        let response = await fetch(`${apiUrl}/records?user_id=${userId}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        let records = await response.json();

        let table = document.getElementById("recordsTable");
        table.innerHTML = records.map(r => `<tr><td>${r.timestamp}</td><td>${r.type}</td></tr>`).join("");
    } catch (error) {
        console.error("Failed to fetch records:", error);
        alert("履歴の取得に失敗しました。");
    }
}

async function clockIn() {
    let userId = document.getElementById("userId").value;
    if (!userId) {
        alert("ユーザーIDを入力してください");
        return;
    }

    try {
        let response = await fetch(`${apiUrl}/clock-in?user_id=${userId}`, { method: "POST" });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        fetchRecords();
    } catch (error) {
        console.error("Clock-in failed:", error);
        alert("出勤に失敗しました。");
    }
}

async function clockOut() {
    let userId = document.getElementById("userId").value;
    if (!userId) {
        alert("ユーザーIDを入力してください");
        return;
    }

    try {
        let response = await fetch(`${apiUrl}/clock-out?user_id=${userId}`, { method: "POST" });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        fetchRecords();
    } catch (error) {
        console.error("Clock-out failed:", error);
        alert("退勤に失敗しました。");
    }
}
*/

//console.log() を fetchRecords() に追加したバージョン(F12の開発者ツールから挙動を確認するため)
const apiUrl = "http://127.0.0.1:8000";

async function fetchRecords() {
    let userId = document.getElementById("userId").value;
    if (!userId) {
        alert("ユーザーIDを入力してください");
        console.log("ユーザーIDが未入力のため、fetchRecords() をスキップ");
        return;
    }

    try {
        console.log(`Fetching records for user: ${userId}`); // ✅ デバッグログ
        let response = await fetch(`${apiUrl}/records?user_id=${userId}`);
        
        console.log("Response status:", response.status);  // ✅ HTTP ステータスコードをログに表示
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        let records = await response.json();
        console.log("Fetched records:", records);  // ✅ 取得したデータをログに表示

        let table = document.getElementById("recordsTable");
        table.innerHTML = records.map(r => `<tr><td>${r.timestamp}</td><td>${r.type}</td></tr>`).join("");
    } catch (error) {
        console.error("Failed to fetch records:", error);
        alert("履歴の取得に失敗しました。");
    }
}

// ✅ `fetchRecords()` の外に移動
async function clockIn() {
    let userId = document.getElementById("userId").value;
    if (!userId) {
        alert("ユーザーIDを入力してください");
        return;
    }

    try {
        let response = await fetch(`${apiUrl}/clock-in?user_id=${userId}`, { method: "POST" });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        fetchRecords();
    } catch (error) {
        console.error("Clock-in failed:", error);
        alert("出勤に失敗しました。");
    }
}

async function clockOut() {
    let userId = document.getElementById("userId").value;
    if (!userId) {
        alert("ユーザーIDを入力してください");
        return;
    }

    try {
        let response = await fetch(`${apiUrl}/clock-out?user_id=${userId}`, { method: "POST" });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        fetchRecords();
    } catch (error) {
        console.error("Clock-out failed:", error);
        alert("退勤に失敗しました。");
    }
}
