// Helper to get element by ID
const q = (id) => document.getElementById(id);

// Ensure app is hidden initially
window.onload = () => {
  q("app").style.display = "none";
};

// Login Function
function loginUser() {
  const name = q("username").value.trim();
  const id = q("studentid").value.trim();

  if (name === "" || id === "") {
    alert("Please enter your Name and Student ID");
    return;
  }

  q("loginPage").style.display = "none";
  q("app").style.display = "block";
  q("welcomeName").innerText = name;
}

// Show Sections
function showCashIn() {
  hideSections();
  q("cashInSection").style.display = "block";
}

function showCashOut() {
  hideSections();
  q("cashOutSection").style.display = "block";
}

function showAddReward() {
  hideSections();
  q("addRewardSection").style.display = "block";
}

function hideSections() {
  q("cashInSection").style.display = "none";
  q("cashOutSection").style.display = "none";
  q("addRewardSection").style.display = "none";
}

// Certificate Upload Logic
function validateCertificate(fileName) {
  fileName = fileName.toLowerCase();

  const validWords = ["certificate", "marksheet", "mark", "result", "award"];

  return validWords.some(word => fileName.includes(word));
}

q("certificateFile").addEventListener("change", function() {
  const file = this.files[0];

  if (!file) return;

  const fileName = file.name;
  const reader = new FileReader();

  if (!validateCertificate(fileName)) {
    q("errorMsg").style.display = "block";
    q("successMsg").style.display = "none";
    q("preview").style.display = "none";
    return;
  }

  reader.onload = function(e) {
    q("preview").src = e.target.result;
    q("preview").style.display = "block";
    q("errorMsg").style.display = "none";
    q("successMsg").style.display = "block";
  };

  reader.readAsDataURL(file);
});
