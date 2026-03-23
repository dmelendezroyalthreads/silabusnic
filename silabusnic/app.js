const state = {
  role: "student",
  selectedStudentId: "",
  catalog: null,
  filters: {
    career: "all",
    year: "all",
    query: "",
    semester: "all",
    midterm: "all",
    subject: "all",
    type: "all",
    progress: "all",
  },
  acquiredByStudent: {},
};

const els = {
  roleStudent: document.querySelector("#role-student"),
  roleProfessor: document.querySelector("#role-professor"),
  roleDescription: document.querySelector("#role-description"),
  studentSelect: document.querySelector("#student-select"),
  careerFilter: document.querySelector("#career-filter"),
  yearFilter: document.querySelector("#year-filter"),
  searchInput: document.querySelector("#search-input"),
  semesterFilter: document.querySelector("#semester-filter"),
  midtermFilter: document.querySelector("#midterm-filter"),
  subjectFilter: document.querySelector("#subject-filter"),
  typeFilter: document.querySelector("#type-filter"),
  progressFilter: document.querySelector("#progress-filter"),
  materialsList: document.querySelector("#materials-list"),
  activeFilters: document.querySelector("#active-filters"),
  resultsSummary: document.querySelector("#results-summary"),
  emptyState: document.querySelector("#empty-state"),
  showPending: document.querySelector("#show-pending"),
  resetFilters: document.querySelector("#reset-filters"),
  template: document.querySelector("#material-template"),
  programTitle: document.querySelector("#program-title"),
  studentName: document.querySelector("#student-name"),
  subjectSummary: document.querySelector("#subject-summary"),
  statTotal: document.querySelector("#stat-total"),
  statSubjects: document.querySelector("#stat-subjects"),
  statMidterms: document.querySelector("#stat-midterms"),
  statEquipment: document.querySelector("#stat-equipment"),
  statRecurring: document.querySelector("#stat-recurring"),
  statAcquired: document.querySelector("#stat-acquired"),
  statPending: document.querySelector("#stat-pending"),
  statSemesters: document.querySelector("#stat-semesters"),
  statStudentMidterms: document.querySelector("#stat-student-midterms"),
};

function storageKey(studentId) {
  return `silabusnic-acquired-${studentId}`;
}

function getSelectedStudent() {
  return state.catalog.students.find((student) => student.id === state.selectedStudentId) || state.catalog.students[0];
}

function careerForItem(item) {
  if (item.career) return item.career;
  if (state.catalog.career) return state.catalog.career;
  return state.catalog.program.replace(/^\s*\d+(st|nd|rd|th)?\s+Year\s+/i, "").trim();
}

function getAcquiredSet(studentId = state.selectedStudentId) {
  if (!state.acquiredByStudent[studentId]) {
    state.acquiredByStudent[studentId] = new Set();
  }
  return state.acquiredByStudent[studentId];
}

function isAcquired(materialId) {
  return getAcquiredSet().has(materialId);
}

async function loadCatalog() {
  const response = await fetch("./data/materials.json");
  if (!response.ok) {
    throw new Error("Unable to load materials catalog.");
  }
  state.catalog = await response.json();
  state.selectedStudentId = state.catalog.students[0]?.id || "";

  for (const student of state.catalog.students) {
    const raw = localStorage.getItem(storageKey(student.id));
    const ids = raw ? JSON.parse(raw) : [];
    state.acquiredByStudent[student.id] = new Set(ids);
  }
}

function fillSelect(select, values, allLabel) {
  select.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = allLabel;
  select.append(allOption);

  for (const value of values) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  }
}

function populateControls() {
  els.studentSelect.innerHTML = "";
  for (const student of state.catalog.students) {
    const option = document.createElement("option");
    option.value = student.id;
    option.textContent = `${student.name} • ${student.group}`;
    els.studentSelect.append(option);
  }
  els.studentSelect.value = state.selectedStudentId;

  const materials = state.catalog.materials;
  fillSelect(els.careerFilter, [...new Set(materials.map((item) => careerForItem(item)))].sort(), "All careers");
  fillSelect(els.yearFilter, [...new Set(materials.map((item) => item.year))].sort(), "All years");
  fillSelect(els.semesterFilter, [...new Set(materials.map((item) => item.semester))].sort(), "All semesters");
  fillSelect(els.midtermFilter, [...new Set(materials.map((item) => item.midterm))].sort(), "All midterms");
  fillSelect(els.subjectFilter, [...new Set(materials.map((item) => item.subject))].sort(), "All subjects");
  fillSelect(els.typeFilter, [...new Set(materials.map((item) => item.type))].sort(), "All types");
}

function renderProgramStats() {
  const materials = state.catalog.materials;
  const careerLabel = state.filters.career === "all" ? careerForItem(materials[0]) : state.filters.career;
  const yearLabel = state.filters.year === "all" ? materials[0]?.year || "" : state.filters.year;
  els.programTitle.textContent = `${careerLabel} ${yearLabel}`.trim();
  els.statTotal.textContent = String(materials.length);
  els.statSubjects.textContent = String(new Set(materials.map((item) => item.subject)).size);
  els.statMidterms.textContent = String(new Set(materials.map((item) => item.midterm)).size);
  els.statEquipment.textContent = String(materials.filter((item) => item.type.toLowerCase().includes("equipo")).length);
  els.statRecurring.textContent = String(materials.filter((item) => item.purchaseFrequency === "Periódica").length);
}

function renderSubjectSummary() {
  const counts = new Map();
  for (const material of state.catalog.materials) {
    const current = counts.get(material.subject) || 0;
    counts.set(material.subject, current + 1);
  }

  els.subjectSummary.innerHTML = "";
  for (const [subject, total] of [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)) {
    const card = document.createElement("article");
    card.innerHTML = `<strong>${subject}</strong><p>${total} listed materials</p>`;
    els.subjectSummary.append(card);
  }
}

function matchesFilters(item) {
  const query = state.filters.query.trim().toLowerCase();
  const haystack = [
    item.id,
    item.name,
    item.subject,
    item.presentation,
    item.notes,
    item.type,
    item.location,
    item.otherSubjects,
  ].join(" ").toLowerCase();

  const matchesQuery = !query || haystack.includes(query);
  const matchesCareer = state.filters.career === "all" || careerForItem(item) === state.filters.career;
  const matchesYear = state.filters.year === "all" || item.year === state.filters.year;
  const matchesSemester = state.filters.semester === "all" || item.semester === state.filters.semester;
  const matchesMidterm = state.filters.midterm === "all" || item.midterm === state.filters.midterm;
  const matchesSubject = state.filters.subject === "all" || item.subject === state.filters.subject;
  const matchesType = state.filters.type === "all" || item.type === state.filters.type;

  let matchesProgress = true;
  if (state.filters.progress === "acquired") {
    matchesProgress = isAcquired(item.id);
  } else if (state.filters.progress === "pending") {
    matchesProgress = !isAcquired(item.id);
  }

  return matchesQuery && matchesCareer && matchesYear && matchesSemester && matchesMidterm && matchesSubject && matchesType && matchesProgress;
}

function filteredMaterials() {
  return state.catalog.materials.filter(matchesFilters);
}

function roleDescription() {
  if (state.role === "professor") {
    return "Professors manage the XLS catalog, images, and material details for each semester and midterm.";
  }
  return "Students can review materials, filter by semester or midterm, and track what has already been acquired.";
}

function renderRoleState() {
  els.roleStudent.classList.toggle("active", state.role === "student");
  els.roleProfessor.classList.toggle("active", state.role === "professor");
  els.roleDescription.textContent = roleDescription();
  els.progressFilter.disabled = state.role === "professor";
}

function renderStudentStats() {
  const selected = getSelectedStudent();
  const acquired = getAcquiredSet(selected.id);
  const total = state.catalog.materials.length;
  const semesters = new Set(state.catalog.materials.map((item) => item.semester)).size;
  const midterms = new Set(state.catalog.materials.map((item) => item.midterm)).size;

  els.studentName.textContent = selected.name;
  els.statAcquired.textContent = String(acquired.size);
  els.statPending.textContent = String(total - acquired.size);
  els.statSemesters.textContent = String(semesters);
  els.statStudentMidterms.textContent = String(midterms);
}

function persistStudentProgress() {
  localStorage.setItem(storageKey(state.selectedStudentId), JSON.stringify([...getAcquiredSet()]));
}

function materialImage(item) {
  return item.image || "./assets/logo.png";
}

function materialDetails(item) {
  const details = [
    `Cantidad aproximada: ${item.quantity || "N/A"}`,
    `Presentación: ${item.presentation || "N/A"}`,
    `Ubicación: ${item.location || "N/A"}`,
    `Compra: ${item.purchaseFrequency || "N/A"}`,
  ];
  return details.map((detail) => `<span>${detail}</span>`).join("");
}

function activeFilterEntries() {
  const entries = [
    ["Career", state.filters.career],
    ["Year", state.filters.year],
    ["Search", state.filters.query.trim()],
    ["Semester", state.filters.semester],
    ["Midterm", state.filters.midterm],
    ["Subject", state.filters.subject],
    ["Type", state.filters.type],
    ["Progress", state.filters.progress],
  ];

  return entries.filter(([, value]) => value && value !== "all");
}

function renderActiveFilters() {
  const filters = activeFilterEntries();
  els.activeFilters.innerHTML = "";

  if (!filters.length) {
    els.activeFilters.classList.add("hidden");
    return;
  }

  for (const [label, value] of filters) {
    const chip = document.createElement("span");
    chip.className = "active-filter-chip";
    chip.textContent = `${label}: ${value}`;
    els.activeFilters.append(chip);
  }

  els.activeFilters.classList.remove("hidden");
}

function renderMaterials() {
  const materials = filteredMaterials();
  els.materialsList.innerHTML = "";
  renderActiveFilters();

  for (const item of materials) {
    const node = els.template.content.firstElementChild.cloneNode(true);
    const image = node.querySelector(".material-image");
    image.src = materialImage(item);
    image.alt = `${item.name} reference`;

    node.querySelector(".material-code").textContent = item.id;
    node.querySelector(".material-type").textContent = item.type;
    node.querySelector(".material-title").textContent = item.name;
    node.querySelector(".material-meta").textContent =
      `${item.subject} • ${item.ownership || "Individual"} • ${item.timing || "N/A"}`;
    node.querySelector(".tag-semester").textContent = item.semester;
    node.querySelector(".tag-midterm").textContent = `Parcial ${item.midterm}`;
    node.querySelector(".tag-location").textContent = item.location || "Ubicación pendiente";
    node.querySelector(".material-notes").textContent =
      item.notes || item.otherSubjects || "No professor notes yet for this material.";
    node.querySelector(".material-details").innerHTML = materialDetails(item);

    const button = node.querySelector(".toggle-acquired");
    if (state.role === "professor") {
      button.textContent = "Professor can edit";
      button.disabled = true;
    } else {
      const acquired = isAcquired(item.id);
      button.textContent = acquired ? "Acquired" : "Mark acquired";
      button.classList.toggle("acquired", acquired);
      button.addEventListener("click", () => {
        const set = getAcquiredSet();
        if (set.has(item.id)) {
          set.delete(item.id);
        } else {
          set.add(item.id);
        }
        persistStudentProgress();
        renderStudentStats();
        renderMaterials();
      });
    }

    els.materialsList.append(node);
  }

  els.resultsSummary.textContent = `${materials.length} material${materials.length === 1 ? "" : "s"} shown`;
  els.emptyState.classList.toggle("hidden", materials.length > 0);
}

function resetFilters() {
  state.filters = {
    career: "all",
    year: "all",
    query: "",
    semester: "all",
    midterm: "all",
    subject: "all",
    type: "all",
    progress: "all",
  };
  els.careerFilter.value = "all";
  els.yearFilter.value = "all";
  els.searchInput.value = "";
  els.semesterFilter.value = "all";
  els.midtermFilter.value = "all";
  els.subjectFilter.value = "all";
  els.typeFilter.value = "all";
  els.progressFilter.value = "all";
}

function bindEvents() {
  els.roleStudent.addEventListener("click", () => {
    state.role = "student";
    renderRoleState();
    renderMaterials();
  });

  els.roleProfessor.addEventListener("click", () => {
    state.role = "professor";
    renderRoleState();
    renderMaterials();
  });

  els.studentSelect.addEventListener("change", (event) => {
    state.selectedStudentId = event.target.value;
    renderStudentStats();
    renderMaterials();
  });

  for (const [key, element] of [
    ["career", els.careerFilter],
    ["year", els.yearFilter],
  ]) {
    element.addEventListener("change", (event) => {
      state.filters[key] = event.target.value;
      renderProgramStats();
      renderMaterials();
    });
  }

  els.searchInput.addEventListener("input", (event) => {
    state.filters.query = event.target.value;
    renderMaterials();
  });

  for (const [key, element] of [
    ["semester", els.semesterFilter],
    ["midterm", els.midtermFilter],
    ["subject", els.subjectFilter],
    ["type", els.typeFilter],
    ["progress", els.progressFilter],
  ]) {
    element.addEventListener("change", (event) => {
      state.filters[key] = event.target.value;
      renderProgramStats();
      renderMaterials();
    });
  }

  els.showPending.addEventListener("click", () => {
    state.role = "student";
    renderRoleState();
    state.filters.progress = "pending";
    els.progressFilter.value = "pending";
    renderProgramStats();
    renderMaterials();
  });

  els.resetFilters.addEventListener("click", () => {
    resetFilters();
    renderProgramStats();
    renderMaterials();
  });
}

async function init() {
  try {
    await loadCatalog();
    populateControls();
    renderProgramStats();
    renderSubjectSummary();
    renderRoleState();
    renderStudentStats();
    renderMaterials();
    bindEvents();
  } catch (error) {
    els.resultsSummary.textContent = "Unable to load materials catalog.";
    els.emptyState.textContent = error.message;
    els.emptyState.classList.remove("hidden");
  }
}

init();
