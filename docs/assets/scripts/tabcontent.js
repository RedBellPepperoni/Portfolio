
const tabs = document.querySelectorAll(".tabs li");
const contents = document.querySelectorAll(".experiencecontainer");

function showTab(tabId) {
  contents.forEach((content) => (content.style.display = "none"));
  document.getElementById(tabId).style.display = "flex";

  tabs.forEach((tab) => tab.classList.remove("active"));
  document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    showTab(this.getAttribute("data-tab"));
  });
});


showTab("tab1");


  
