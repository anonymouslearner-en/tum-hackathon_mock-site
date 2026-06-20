const sqlite3 = require("better-sqlite3");
const crypto = require("crypto");
const path = require("path");

// --- setup DB ---
const usersDbPath = path.join(__dirname, "users.db");
const db = new sqlite3(usersDbPath);

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password_hash TEXT
    )
`);

// Create a credit cards table to store sample card data in the same DB
db.exec(`
    CREATE TABLE IF NOT EXISTS credit_cards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        card_type TEXT,
        card_number TEXT,
        expiry TEXT,
        cvv TEXT,
        issue_date TEXT
    )
`);

// --- TEE integration helpers ---
function initializeEnclave() {
  // If REQUIRE_TEE is set, enforce providing a real TEE implementation.
  if (process.env.REQUIRE_TEE === "1") {
    throw new Error(
      "initializeEnclave() is not implemented. Add your TEE SDK initialization here.",
    );
  }
  // Default to a mock enclave for local development/testing.
  console.warn(
    "[TEE] No real TEE configured — using mock enclave for development. Set REQUIRE_TEE=1 to require a real TEE.",
  );
  return { mock: true };
}

function invokeEnclave(enclave, command, payload) {
  // Replace this with a real ECALL/OCALL or plugin call.
  // The enclave should run the secure logic and return only the result.
  if (enclave && enclave.mock) {
    console.log(`[TEE] Mock invoke ${command} with payload:`, payload);
    // Simulate processing: read DB path and return a small summary.
    return { status: "ok", message: `Processed ${payload.dbPath}` };
  }
  throw new Error(
    "invokeEnclave() is not implemented. Add your TEE SDK invocation logic here.",
  );
}

function shutdownEnclave(enclave) {
  if (enclave && enclave.mock) {
    console.log("[TEE] Mock enclave shutdown");
    return;
  }
  // Replace with TEE clean-up for your runtime.
}

// --- functions ---
function hashPassword(pw) {
  return crypto.createHash("sha256").update(pw).digest("hex");
}

function insertUsers() {
  const users = [
    ["Alice Example", hashPassword("admin123")],
    ["Bob Sample", hashPassword("physics99")],
    ["Carol Demo", hashPassword("guest")],
  ];

  const insert = db.prepare(
    "INSERT OR IGNORE INTO users (username, password_hash) VALUES (?, ?)",
  );

  for (const user of users) {
    insert.run(...user);
  }
}

function insertSampleCards() {
  const cards = [
    [
      "Alice Example",
      "Visa",
      "4111111111111111",
      "12/28",
      "123",
      new Date().toISOString().split("T")[0],
    ],
    [
      "Bob Sample",
      "MasterCard",
      "5555555555554444",
      "06/27",
      "456",
      new Date().toISOString().split("T")[0],
    ],
    [
      "Carol Demo",
      "American Express",
      "371449635398431",
      "09/26",
      "1234",
      new Date().toISOString().split("T")[0],
    ],
  ];

  const insert = db.prepare(
    "INSERT OR IGNORE INTO credit_cards (name, card_type, card_number, expiry, cvv, issue_date) VALUES (?, ?, ?, ?, ?, ?)",
  );

  for (const card of cards) {
    insert.run(...card);
  }
}

function login(username, password) {
  const stmt = db.prepare(
    "SELECT * FROM users WHERE username = ? AND password_hash = ?",
  );
  return stmt.get(username, hashPassword(password));
}

function runInTEE(enclave, user) {
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Host no longer enforces role-based access here; the enclave should
  // implement any necessary authorization. For development we simply pass
  // the DB path and the authenticated username.
  const payload = {
    username: user.username,
    dbPath: usersDbPath,
  };

  return invokeEnclave(enclave, "processCreditCards", payload);
}

// --- main flow ---
insertUsers();

// Inject User Credentials Here ⬇
const username = "Carol Demo";
const password = "guest";

const enclave = initializeEnclave();
const user = login(username, password);

if (user) {
  const result = runInTEE(enclave, user);
  console.log(`Result: ${result}`);
} else {
  console.log("Access denied.");
}

shutdownEnclave(enclave);
db.close();
