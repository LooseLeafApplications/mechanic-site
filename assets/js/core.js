/**
 * LooseLeaf UI - Core Behaviors
 * Agnostic component logic based on data-attributes.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // GLOBAL CLICK DELEGATION ENGINE
  // ==========================================================================
  document.addEventListener("click", (event) => {
    // --- [T3-04] THE ACCORDION LOGIC ---
    const accordionBtn = event.target.closest(".c-accordion__trigger");
    if (accordionBtn) {
      const accordion = accordionBtn.closest("[data-ll-accordion]");
      if (!accordion) return;

      const targetId = accordionBtn.getAttribute("aria-controls");
      const targetPanel = document.getElementById(targetId);
      const isExpanded = accordionBtn.getAttribute("aria-expanded") === "true";

      if (targetPanel) {
        if (isExpanded) {
          targetPanel.classList.remove("is-open");
          accordionBtn.setAttribute("aria-expanded", "false");
        } else {
          targetPanel.classList.add("is-open");
          accordionBtn.setAttribute("aria-expanded", "true");
        }
      }
    }

    // --- [T3-05] THE DROPDOWN LOGIC ---
    const toggleBtn = event.target.closest('[data-ll-toggle="dropdown"]');
    if (toggleBtn) {
      const wrapper = toggleBtn.closest(".c-dropdown-wrapper");
      const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";

      document
        .querySelectorAll(".c-dropdown-wrapper.is-open")
        .forEach((openWrapper) => {
          if (openWrapper !== wrapper) {
            openWrapper.classList.remove("is-open");
            openWrapper
              .querySelector('[data-ll-toggle="dropdown"]')
              .setAttribute("aria-expanded", "false");
          }
        });

      if (isExpanded) {
        wrapper.classList.remove("is-open");
        toggleBtn.setAttribute("aria-expanded", "false");
      } else {
        wrapper.classList.add("is-open");
        toggleBtn.setAttribute("aria-expanded", "true");
      }
    } else {
      if (!event.target.closest(".c-dropdown-wrapper")) {
        document
          .querySelectorAll(".c-dropdown-wrapper.is-open")
          .forEach((wrapper) => {
            wrapper.classList.remove("is-open");
            wrapper
              .querySelector('[data-ll-toggle="dropdown"]')
              .setAttribute("aria-expanded", "false");
          });
      }
    }

    // --- [T4-03] THE NAVBAR COLLAPSE LOGIC ---
    const collapseBtn = event.target.closest('[data-ll-toggle="collapse"]');
    if (collapseBtn) {
      const targetId = collapseBtn.getAttribute("aria-controls");
      const targetElement = document.getElementById(targetId);
      const isExpanded = collapseBtn.getAttribute("aria-expanded") === "true";

      if (targetElement) {
        if (isExpanded) {
          targetElement.classList.remove("is-open");
          collapseBtn.setAttribute("aria-expanded", "false");
        } else {
          targetElement.classList.add("is-open");
          collapseBtn.setAttribute("aria-expanded", "true");
        }
      }
    }

    // --- [T4-11] THE ALERT DISMISS LOGIC ---
    const dismissBtn = event.target.closest('[data-ll-dismiss="alert"]');
    if (dismissBtn) {
      const targetAlert = dismissBtn.closest(".c-alert");
      if (targetAlert) {
        targetAlert.classList.add("is-removing");
        setTimeout(() => {
          targetAlert.remove();
        }, 300);
      }
    }

    // --- [T4-06] & [T4-12] NATIVE DIALOG ENGINE (Modals & Offcanvas) ---
    const dialogToggle = event.target.closest('[data-ll-toggle="dialog"]');
    if (dialogToggle) {
      const targetId = dialogToggle.getAttribute("aria-controls");
      const dialog = document.getElementById(targetId);
      if (dialog && typeof dialog.showModal === "function") {
        dialog.showModal();
      }
    }

    const dialogDismiss = event.target.closest('[data-ll-dismiss="dialog"]');
    if (dialogDismiss) {
      const dialog = dialogDismiss.closest("dialog");
      if (dialog) dialog.close();
    }

    if (event.target.tagName === "DIALOG") {
      const rect = event.target.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        event.target.close();
      }
    }
  });

  // ==========================================================================
  // [T5-04] INTERACTIVE BACKGROUND TRACKING
  // ==========================================================================
  const glowContainers = document.querySelectorAll(".u-bg-glow");
  glowContainers.forEach((container) => {
    container.addEventListener("mousemove", (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    });
  });
});

// ==========================================================================
// [T5-05] LIVE OPENING HOURS STATUS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Get the current date and time
  const now = new Date();
  const currentDay = now.getDay(); // Returns 0 (Sun) to 6 (Sat)
  const currentHour = now.getHours(); // Returns 0 to 23

  // 2. Highlight Today's Row in the Table
  // We use the data-day attribute in HTML
  const todayRow = document.querySelector(`tr[data-day="${currentDay}"]`);
  if (todayRow) {
    todayRow.classList.add("is-today");
  }

  // 3. Operational Status Logic
  const statusContainer = document.getElementById("live-status-container");
  if (!statusContainer) return; // Fail gracefully if the element isn't on the page

  let statusText = "Closed";
  let statusClass = "is-closed";

  // Determine if it's a Weekday (Mon=1, Fri=5)
  if (currentDay >= 1 && currentDay <= 5) {
    if (currentHour >= 8 && currentHour < 16) {
      statusText = "Open Now";
      statusClass = "is-open";
    } else if (currentHour === 16) {
      // 16:00 to 16:59
      statusText = "Closing Soon";
      statusClass = "is-closing";
    }
  }
  // Determine if it's Saturday (Sat=6)
  else if (currentDay === 6) {
    if (currentHour >= 9 && currentHour < 12) {
      statusText = "Open Now";
      statusClass = "is-open";
    } else if (currentHour === 12) {
      // 12:00 to 12:59
      statusText = "Closing Soon";
      statusClass = "is-closing";
    }
  }
  // Sunday (0) defaults to "Closed" from the variables above

  // 4. Inject the Status into the DOM
  statusContainer.innerHTML = `
    <div class="operational-status ${statusClass}">
      <span class="status-dot" aria-hidden="true"></span>
      <span>${statusText}</span>
    </div>
  `;
});
