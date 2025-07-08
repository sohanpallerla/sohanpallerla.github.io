'use strict';

/**
 * Element toggle function
 * @param {HTMLElement} elem - Element to toggle
 */
const elementToggleFunc = function(elem) {
  elem.classList.toggle("active");
};

/**
 * Initialize sidebar functionality
 */
const initSidebar = function() {
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener("click", function() {
      elementToggleFunc(sidebar);
    });
  }
};

/**
 * Initialize portfolio filtering
 */
const initPortfolioFilter = function() {
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtns = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  // Filter function
  const filterFunc = function(selectedValue) {
    filterItems.forEach(item => {
      if (selectedValue === "all" || selectedValue === item.dataset.category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  // Select dropdown functionality
  if (select) {
    select.addEventListener("click", function() {
      elementToggleFunc(this);
    });
  }

  // Select items functionality
  selectItems.forEach(item => {
    item.addEventListener("click", function() {
      const selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      if (select) elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  });

  // Filter buttons functionality
  if (filterBtns.length > 0) {
    let lastClickedBtn = filterBtns[0];
    
    filterBtns.forEach(btn => {
      btn.addEventListener("click", function() {
        const selectedValue = this.innerText.toLowerCase();
        if (selectValue) selectValue.innerText = this.innerText;
        filterFunc(selectedValue);
        
        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
      });
    });
  }
};

/**
 * Initialize contact form validation
 */
const initContactForm = function() {
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  if (form && formInputs.length > 0 && formBtn) {
    formInputs.forEach(input => {
      input.addEventListener("input", function() {
        if (form.checkValidity()) {
          formBtn.removeAttribute("disabled");
        } else {
          formBtn.setAttribute("disabled", "");
        }
      });
    });
  }
};

/**
 * Initialize page navigation
 */
const initPageNavigation = function() {
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  if (navigationLinks.length > 0 && pages.length > 0) {
    navigationLinks.forEach(link => {
      link.addEventListener("click", function() {
        const targetPage = this.innerHTML.toLowerCase();
        
        pages.forEach(page => {
          if (targetPage === page.dataset.page) {
            page.classList.add("active");
          } else {
            page.classList.remove("active");
          }
        });
        
        navigationLinks.forEach(navLink => {
          if (targetPage === navLink.innerHTML.toLowerCase()) {
            navLink.classList.add("active");
          } else {
            navLink.classList.remove("active");
          }
        });
        
        window.scrollTo(0, 0);
      });
    });
  }
};

/**
 * Initialize all functionality
 */
document.addEventListener("DOMContentLoaded", function() {
  initSidebar();
  initPortfolioFilter();
  initContactForm();
  initPageNavigation();
});