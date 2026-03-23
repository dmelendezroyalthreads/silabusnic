const state = {
  discussions: [],
  filters: {
    query: "",
    course: "all",
    status: "all",
  },
};

const els = {
  searchInput: document.querySelector("#search-input"),
  courseFilter: document.querySelector("#course-filter"),
  statusFilter: document.querySelector("#status-filter"),
  discussionList: document.querySelector("#discussion-list"),
  resultsSummary: document.querySelector("#results-summary"),
  emptyState: document.querySelector("#empty-state"),
  courseSummary: document.querySelector("#course-summary"),
  focusUnanswered: document.querySelector("#focus-unanswered"),
  resetFilters: document.querySelector("#reset-filters"),
  statTotal: document.querySelector("#stat-total"),
  statOpen: document.querySelector("#stat-open"),
  statResources: document.querySelector("#stat-resources"),
  statCourses: document.querySelector("#stat-courses"),
  statUnanswered: document.querySelector("#stat-unanswered"),
  template: document.querySelector("#discussion-template"),
};

async function loadDiscussions() {
  const response = await fetch("./data/discussions.json");
  if (!response.ok) {
    throw new Error("Unable to load discussion data.");
  }
  const payload = await response.json();
  state.discussions = payload.discussions || [];
}

function fillCourseFilter() {
  const courses = [...new Set(state.discussions.map((item) => item.course))].sort();
  for (const course of courses) {
    const option = document.createElement("option");
    option.value = course;
    option.textContent = course;
    els.courseFilter.append(option);
  }
}

function matchesFilters(item) {
  const query = state.filters.query.trim().toLowerCase();
  const haystack = [
    item.course,
    item.title,
    item.snippet,
    item.author,
    ...(item.tags || []),
  ].join(" ").toLowerCase();

  const queryMatch = !query || haystack.includes(query);
  const courseMatch = state.filters.course === "all" || item.course === state.filters.course;
  const statusMatch = state.filters.status === "all" || item.status === state.filters.status;

  return queryMatch && courseMatch && statusMatch;
}

function filteredDiscussions() {
  return state.discussions.filter(matchesFilters);
}

function renderStats() {
  const total = state.discussions.length;
  const open = state.discussions.filter((item) => item.status === "open").length;
  const resources = state.discussions.filter((item) => item.status === "resource").length;
  const unanswered = state.discussions.filter((item) => item.replies === 0).length;
  const courses = new Set(state.discussions.map((item) => item.course)).size;

  els.statTotal.textContent = String(total);
  els.statOpen.textContent = String(open);
  els.statResources.textContent = String(resources);
  els.statCourses.textContent = String(courses);
  els.statUnanswered.textContent = String(unanswered);
}

function renderCourseSummary() {
  const grouped = state.discussions.reduce((acc, item) => {
    const bucket = acc.get(item.course) || { total: 0, open: 0, resources: 0 };
    bucket.total += 1;
    if (item.status === "open") bucket.open += 1;
    if (item.status === "resource") bucket.resources += 1;
    acc.set(item.course, bucket);
    return acc;
  }, new Map());

  els.courseSummary.innerHTML = "";

  for (const [course, summary] of [...grouped.entries()].sort()) {
    const card = document.createElement("article");
    card.innerHTML = `
      <strong>${course}</strong>
      <p>${summary.total} threads, ${summary.open} open, ${summary.resources} resource drops</p>
    `;
    els.courseSummary.append(card);
  }
}

function statusLabel(status) {
  if (status === "answered") return "Answered";
  if (status === "resource") return "Resource shared";
  return "Open";
}

function renderDiscussions() {
  const items = filteredDiscussions();
  els.discussionList.innerHTML = "";

  for (const item of items) {
    const node = els.template.content.firstElementChild.cloneNode(true);
    node.querySelector(".course-pill").textContent = item.course;

    const status = node.querySelector(".status-pill");
    status.textContent = statusLabel(item.status);
    status.classList.toggle("answered", item.status === "answered");
    status.classList.toggle("resource", item.status === "resource");

    node.querySelector(".discussion-title").textContent = item.title;
    node.querySelector(".discussion-snippet").textContent = item.snippet;

    const tags = node.querySelector(".tag-row");
    for (const tag of item.tags || []) {
      const el = document.createElement("span");
      el.textContent = `#${tag}`;
      tags.append(el);
    }

    node.querySelector(".discussion-author").textContent = `By ${item.author}`;
    node.querySelector(".discussion-replies").textContent = `${item.replies} replies`;
    node.querySelector(".discussion-updated").textContent = `Updated ${item.updated}`;

    els.discussionList.append(node);
  }

  els.resultsSummary.textContent = `${items.length} discussion${items.length === 1 ? "" : "s"} shown`;
  els.emptyState.classList.toggle("hidden", items.length > 0);
}

function bindEvents() {
  els.searchInput.addEventListener("input", (event) => {
    state.filters.query = event.target.value;
    renderDiscussions();
  });

  els.courseFilter.addEventListener("change", (event) => {
    state.filters.course = event.target.value;
    renderDiscussions();
  });

  els.statusFilter.addEventListener("change", (event) => {
    state.filters.status = event.target.value;
    renderDiscussions();
  });

  els.focusUnanswered.addEventListener("click", () => {
    state.filters.status = "open";
    els.statusFilter.value = "open";
    renderDiscussions();
  });

  els.resetFilters.addEventListener("click", () => {
    state.filters = { query: "", course: "all", status: "all" };
    els.searchInput.value = "";
    els.courseFilter.value = "all";
    els.statusFilter.value = "all";
    renderDiscussions();
  });
}

async function init() {
  try {
    await loadDiscussions();
    fillCourseFilter();
    renderStats();
    renderCourseSummary();
    renderDiscussions();
    bindEvents();
  } catch (error) {
    els.resultsSummary.textContent = "Unable to load starter data.";
    els.emptyState.textContent = error.message;
    els.emptyState.classList.remove("hidden");
  }
}

init();
