
const tabs = document.querySelectorAll(".tabs > li");
const contents = document.querySelectorAll(".experiencecontainer");

// function showTab(tabId) {
//   contents.forEach((content) => (content.style.display = "none"));
//   document.getElementById(tabId).style.display = "flex";

//   tabs.forEach((tab) => tab.classList.remove("active"));
//   document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");
// }

// tabs.forEach((tab) => {
//   tab.addEventListener("click", function () {
//     showTab(this.getAttribute("data-tab"));
//   });
// });


// showTab("tab1");



function showTab(tabId) 
{
  // Hide all content containers
  contents.forEach((content) => 
    {
    if (content.id === tabId) 
    {
      content.style.display = "flex"; 
    } 
    else 
    {
      content.style.display = "none";
    }
  });

  // Update active state on tabs
  tabs.forEach((tab) => 
  {
    const dataTab = tab.getAttribute("data-tab");
    if (dataTab === tabId) 
    {
      tab.classList.add("active"); 
    } 
    else 
    {
      tab.classList.remove("active"); 
    }
  });
}


tabs.forEach((tab) => 
{
  tab.addEventListener("click", function () 
  {
    const tabId = this.getAttribute("data-tab"); 
    showTab(tabId); 
  });
});


showTab("tab1");



  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const gallery = document.querySelector('.grid-container');

  // Listen for click events on the image gallery
  gallery.addEventListener('click', (e) => {
    // If the clicked element is an image with class "openfullscreen"
    if (e.target && e.target.tagName === 'IMG' && e.target.classList.contains('openfullscreen')) {
      lightbox.style.display = 'flex';
      lightboxImg.src = e.target.src;  // Set the lightbox image source
    }
  });

  // Close the lightbox when clicking on the overlay
  lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });