const state = {
  role: "",
  selectedStudentId: "",
  selectedProfessorId: "",
  imageZoom: 1,
  welcomeStep: 1,
  catalog: null,
  customMaterials: [],
  filters: {
    career: "",
    year: "",
    query: "",
    semester: "all",
    midterm: "all",
    subject: "all",
    type: "all",
    progress: "all",
  },
  acquiredByStudent: {},
  professorActivity: {},
};

const CAREER_GROUPS = [
  {
    label: "🏥 Salud",
    options: [
      { value: "Medicina General", label: "Medicina General" },
      { value: "Odontología", label: "Odontología" },
    ],
  },
  {
    label: "⚖️ Derecho y Ciencias Sociales",
    options: [
      { value: "Derecho", label: "Derecho" },
      { value: "Psicología", label: "Psicología" },
      { value: "Pedagogía con mención en Administración y Gestión Educativa", label: "Pedagogía con mención en Administración y Gestión Educativa" },
    ],
  },
  {
    label: "🌍 Negocios y Economía",
    options: [
      { value: "Administración de Empresas", label: "Administración de Empresas" },
      { value: "Contabilidad y Finanzas", label: "Contabilidad y Finanzas" },
      { value: "Marketing y Publicidad", label: "Marketing y Publicidad" },
      { value: "Relaciones Internacionales y Comercio Internacional", label: "Relaciones Internacionales y Comercio Internacional" },
    ],
  },
  {
    label: "🏗️ Ingeniería y Arquitectura",
    options: [
      { value: "Ingeniería Industrial", label: "Ingeniería Industrial" },
      { value: "Arquitectura", label: "Arquitectura" },
    ],
  },
  {
    label: "🎨 Creativo y Digital",
    options: [
      { value: "Arte Digital y Animación", label: "Arte Digital y Animación" },
    ],
  },
];

const YEAR_OPTIONS = ["1ro", "2do", "3ro", "4to", "5to"];

const els = {
  roleStudent: document.querySelector("#role-student"),
  roleProfessor: document.querySelector("#role-professor"),
  roleDescription: document.querySelector("#role-description"),
  professorWorkflow: document.querySelector("#professor-workflow"),
  progressCard: document.querySelector(".progress-card"),
  studentLoginCard: document.querySelector("#student-login-card"),
  professorLoginCard: document.querySelector("#professor-login-card"),
  studentSelect: document.querySelector("#student-select"),
  professorSelect: document.querySelector("#professor-select"),
  addMaterialButton: document.querySelector("#add-material-button"),
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
  masterDownload: document.querySelector("#master-download"),
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
  professorActiveName: document.querySelector("#professor-active-name"),
  professorEditingCount: document.querySelector("#professor-editing-count"),
  professorUpdatedCount: document.querySelector("#professor-updated-count"),
  editorDialog: document.querySelector("#professor-editor"),
  editorForm: document.querySelector("#professor-editor-form"),
  editorTitle: document.querySelector("#editor-title"),
  editorClose: document.querySelector("#editor-close"),
  editorCancel: document.querySelector("#editor-cancel"),
  editorName: document.querySelector("#editor-name"),
  editorPresentation: document.querySelector("#editor-presentation"),
  editorQuantity: document.querySelector("#editor-quantity"),
  editorSubject: document.querySelector("#editor-subject"),
  editorSemester: document.querySelector("#editor-semester"),
  editorMidterm: document.querySelector("#editor-midterm"),
  editorLocation: document.querySelector("#editor-location"),
  editorType: document.querySelector("#editor-type"),
  editorPurchase: document.querySelector("#editor-purchase"),
  editorImage: document.querySelector("#editor-image"),
  editorNotes: document.querySelector("#editor-notes"),
  imageViewer: document.querySelector("#image-viewer"),
  imageViewerTitle: document.querySelector("#image-viewer-title"),
  imageViewerImg: document.querySelector("#image-viewer-img"),
  imageViewerClose: document.querySelector("#image-viewer-close"),
  imageZoomIn: document.querySelector("#image-zoom-in"),
  imageZoomOut: document.querySelector("#image-zoom-out"),
  questionDialog: document.querySelector("#student-question-dialog"),
  questionForm: document.querySelector("#student-question-form"),
  questionTitle: document.querySelector("#question-title"),
  questionClose: document.querySelector("#question-close"),
  questionCancel: document.querySelector("#question-cancel"),
  questionCarnet: document.querySelector("#question-carnet"),
  questionName: document.querySelector("#question-name"),
  questionEmail: document.querySelector("#question-email"),
  questionBody: document.querySelector("#question-body"),
  questionFeedback: document.querySelector("#question-feedback"),
  welcomeDialog: document.querySelector("#welcome-dialog"),
  welcomeTitle: document.querySelector("#welcome-title"),
  welcomeStep1: document.querySelector("#welcome-step-1"),
  welcomeStep2: document.querySelector("#welcome-step-2"),
  welcomeStep3: document.querySelector("#welcome-step-3"),
  welcomeClose: document.querySelector("#welcome-close"),
  welcomeBack: document.querySelector("#welcome-back"),
  welcomeNext: document.querySelector("#welcome-next"),
  welcomeConfirm: document.querySelector("#welcome-confirm"),
  downloadDisclaimerDialog: document.querySelector("#download-disclaimer-dialog"),
  downloadDisclaimerClose: document.querySelector("#download-disclaimer-close"),
  downloadDisclaimerCancel: document.querySelector("#download-disclaimer-cancel"),
  downloadDisclaimerConfirm: document.querySelector("#download-disclaimer-confirm"),
  pendingDisclaimerDialog: document.querySelector("#pending-disclaimer-dialog"),
  pendingDisclaimerClose: document.querySelector("#pending-disclaimer-close"),
  pendingDisclaimerCancel: document.querySelector("#pending-disclaimer-cancel"),
  pendingDisclaimerConfirm: document.querySelector("#pending-disclaimer-confirm"),
};

function storageKey(studentId) {
  return `silabusnic-acquired-${studentId}`;
}

function professorStorageKey(professorId) {
  return `silabusnic-professor-${professorId}`;
}

function questionsStorageKey() {
  return "silabusnic-student-questions";
}

function customMaterialsStorageKey() {
  return "silabusnic-custom-materials";
}

function getSelectedStudent() {
  return state.catalog.students.find((student) => student.id === state.selectedStudentId) || state.catalog.students[0];
}

function getSelectedProfessor() {
  return state.catalog.professors.find((professor) => professor.id === state.selectedProfessorId) || null;
}

function careerForItem(item) {
  if (item.career) return item.career;
  if (state.catalog.career) return state.catalog.career;
  return state.catalog.program.replace(/^\s*\d+(st|nd|rd|th)?\s+Year\s+/i, "").trim();
}

function normalizeCareer(value) {
  const normalized = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  if (normalized === "odontology") {
    return "odontologia";
  }

  return normalized;
}

function careerHasCatalogData(career = state.filters.career) {
  return normalizeCareer(career) === normalizeCareer("Odontología");
}

function yearHasCatalogData(year = state.filters.year) {
  return String(year || "").trim() === "3ro";
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
  try {
    state.customMaterials = JSON.parse(localStorage.getItem(customMaterialsStorageKey()) || "[]");
  } catch {
    state.customMaterials = [];
  }
  state.catalog.materials = [...state.catalog.materials, ...state.customMaterials];
  state.selectedStudentId = state.catalog.students[0]?.id || "";
  state.selectedProfessorId = state.catalog.professors?.[0]?.id || "";

  for (const student of state.catalog.students) {
    const raw = localStorage.getItem(storageKey(student.id));
    const ids = raw ? JSON.parse(raw) : [];
    state.acquiredByStudent[student.id] = new Set(ids);
  }

  for (const professor of state.catalog.professors || []) {
    const raw = localStorage.getItem(professorStorageKey(professor.id));
    state.professorActivity[professor.id] = raw ? JSON.parse(raw) : {};
  }
}

function fillSelect(select, values, allLabel) {
  const current = select.value;
  select.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = allLabel;
  select.append(placeholder);

  for (const value of values) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  }

  select.value = values.includes(current) ? current : "";
}

function fillEditorSelect(select, values, selectedValue = "") {
  const options = [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));
  select.innerHTML = "";
  for (const value of options) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  }
  if (selectedValue && options.includes(selectedValue)) {
    select.value = selectedValue;
  } else if (options.length) {
    select.value = options[0];
  }
}

function populateYearOptions() {
  fillSelect(els.yearFilter, YEAR_OPTIONS, "Selecciona un año");
}

function populateCareerOptions() {
  const current = els.careerFilter.value;
  els.careerFilter.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Selecciona una carrera";
  els.careerFilter.append(placeholder);

  for (const group of CAREER_GROUPS) {
    const optgroup = document.createElement("optgroup");
    optgroup.label = group.label;

    for (const optionConfig of group.options) {
      const option = document.createElement("option");
      option.value = optionConfig.value;
      option.textContent = optionConfig.label;
      optgroup.append(option);
    }

    els.careerFilter.append(optgroup);
  }

  const availableValues = CAREER_GROUPS.flatMap((group) => group.options.map((option) => option.value));
  els.careerFilter.value = availableValues.includes(current) ? current : "";
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

  els.professorSelect.innerHTML = "";
  for (const professor of state.catalog.professors || []) {
    const option = document.createElement("option");
    option.value = professor.id;
    option.textContent = `${professor.name} • ${professor.department}`;
    els.professorSelect.append(option);
  }
  els.professorSelect.value = state.selectedProfessorId;

  const materials = state.catalog.materials;
  populateCareerOptions();
  populateYearOptions();
  fillSelect(els.semesterFilter, [...new Set(materials.map((item) => item.semester))].sort(), "Todos los semestres");
  fillSelect(els.midtermFilter, [...new Set(materials.map((item) => item.midterm))].sort(), "Todos los parciales");
  fillSelect(els.subjectFilter, [...new Set(materials.map((item) => item.subject))].sort(), "Todas las asignaturas");
  fillSelect(els.typeFilter, [...new Set(materials.map((item) => item.type))].sort(), "Todos los tipos");
  populateEditorOptions();
}

function populateEditorOptions(currentItem = null) {
  const materials = state.catalog.materials;
  fillEditorSelect(
    els.editorPresentation,
    [...materials.map((item) => item.presentation), currentItem?.presentation || ""],
    currentItem?.presentation || ""
  );
  fillEditorSelect(
    els.editorLocation,
    [...materials.map((item) => item.location), currentItem?.location || ""],
    currentItem?.location || ""
  );
  fillEditorSelect(
    els.editorType,
    [...materials.map((item) => item.type), currentItem?.type || ""],
    currentItem?.type || ""
  );
  fillEditorSelect(
    els.editorPurchase,
    [...materials.map((item) => item.purchaseFrequency), currentItem?.purchaseFrequency || ""],
    currentItem?.purchaseFrequency || ""
  );
  fillEditorSelect(
    els.editorSubject,
    [...materials.map((item) => item.subject), currentItem?.subject || ""],
    currentItem?.subject || ""
  );
  fillEditorSelect(
    els.editorSemester,
    [...materials.map((item) => item.semester), currentItem?.semester || ""],
    currentItem?.semester || ""
  );
  fillEditorSelect(
    els.editorMidterm,
    [...materials.map((item) => item.midterm), currentItem?.midterm || ""],
    currentItem?.midterm || ""
  );
}

function renderProgramStats() {
  if (!state.filters.career || !state.filters.year) {
    els.programTitle.textContent = "Selecciona carrera y año";
    els.statTotal.textContent = "0";
    els.statSubjects.textContent = "0";
    els.statMidterms.textContent = "0";
    els.statEquipment.textContent = "0";
    els.statRecurring.textContent = "0";
  } else {
    const materials = cohortMaterials();
    els.programTitle.textContent = `${state.filters.career} ${state.filters.year}`.trim();
    els.statTotal.textContent = String(materials.length);
    els.statSubjects.textContent = String(new Set(materials.map((item) => item.subject)).size);
    els.statMidterms.textContent = String(new Set(materials.map((item) => item.midterm)).size);
    els.statEquipment.textContent = String(materials.filter((item) => item.type.toLowerCase().includes("equipo")).length);
    els.statRecurring.textContent = String(materials.filter((item) => item.purchaseFrequency === "Periódica").length);
  }
}

function renderSubjectSummary() {
  const materials = cohortMaterials();
  const counts = new Map();
  for (const material of materials) {
    const current = counts.get(material.subject) || 0;
    counts.set(material.subject, current + 1);
  }

  els.subjectSummary.innerHTML = "";

  if (!hasRequiredHeaderSelection()) {
    const card = document.createElement("article");
    card.innerHTML = "<strong>Sin seleccion</strong><p>Elige carrera y año para ver el resumen del archivo.</p>";
    els.subjectSummary.append(card);
    return;
  }

  if (!careerHasCatalogData() || !yearHasCatalogData()) {
    const card = document.createElement("article");
    card.innerHTML = "<strong>Datos en preparación</strong><p>Por ahora el resumen del archivo solo está disponible para Odontología 3ro.</p>";
    els.subjectSummary.append(card);
    return;
  }

  if (!counts.size) {
    const card = document.createElement("article");
    card.innerHTML = "<strong>Sin resultados</strong><p>No hay materiales cargados para la seleccion actual.</p>";
    els.subjectSummary.append(card);
    return;
  }

  for (const [subject, total] of [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)) {
    const card = document.createElement("article");
    card.innerHTML = `
      <strong>${subject}</strong>
      <p>${total} materiales listados</p>
      <button class="summary-export-btn" type="button" data-subject="${subject}">XLS</button>
    `;
    els.subjectSummary.append(card);
  }
}

function exportSubjectAsXls(subject) {
  const rows = cohortMaterials().filter((item) => item.subject === subject);
  if (!rows.length) {
    return;
  }

  const headers = [
    "ID",
    "Material",
    "Presentacion",
    "Cantidad",
    "Asignatura",
    "Año",
    "Semestre",
    "Parcial",
    "Area de Uso",
    "Tipo",
    "Compra",
    "Observaciones",
  ];

  const safeRows = rows.map((item) => [
    item.id,
    item.name,
    item.presentation,
    item.quantity,
    item.subject,
    item.year,
    item.semester,
    item.midterm,
    item.location,
    item.type,
    item.purchaseFrequency,
    item.notes,
  ]);
  const safeSubject = subject.toLowerCase().replace(/[^a-z0-9]+/gi, "-");
  const blob = buildExcelTableBlob(headers, safeRows, subject);
  triggerBlobDownload(blob, `${safeSubject || "categoria"}.xls`);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildExcelTableBlob(headers, rows, sheetName) {
  const headerHtml = headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("");
  const rowHtml = rows
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td>${escapeHtml(cell).replace(/\n/g, "<br>")}</td>`).join("")}</tr>`
    )
    .join("");
  const html = `<!doctype html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <meta name="ProgId" content="Excel.Sheet">
  <meta name="Generator" content="Silabus Portal">
  <title>${escapeHtml(sheetName)}</title>
</head>
<body>
  <table>
    <thead><tr>${headerHtml}</tr></thead>
    <tbody>${rowHtml}</tbody>
  </table>
</body>
</html>`;
  return new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
}

function triggerBlobDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function downloadMasterWorkbook() {
  const response = await fetch("./data/MATERIALES%20ODONTOLOGIA.xlsx");
  if (!response.ok) {
    throw new Error("No se pudo descargar el archivo maestro.");
  }
  const blob = await response.blob();
  triggerBlobDownload(blob, "MATERIALES_ODONTOLOGIA.xlsx");
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
  const matchesCareer = !!state.filters.career && normalizeCareer(careerForItem(item)) === normalizeCareer(state.filters.career);
  const matchesYear = !!state.filters.year && item.year === state.filters.year;
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
    return "Esta vista permite consultar el catálogo académico, editar materiales existentes, incorporar nuevos registros dentro de la demostración y actualizar información asociada, incluyendo imagen, presentación, ubicación, tipo, modalidad de compra y observaciones. En un entorno institucional en vivo, determinadas modificaciones podrían quedar sujetas a revisión y aprobación administrativa antes de su publicación para estudiantes.";
  }
  if (state.role === "student") {
    return "Los estudiantes pueden revisar materiales, filtrar por semestre o parcial y llevar seguimiento de lo ya adquirido.";
  }
  return "Selecciona si deseas entrar como estudiante o como profesor.";
}

function renderRoleState() {
  const readyForRoleSelection = hasRequiredHeaderSelection();
  els.roleStudent.classList.toggle("active", state.role === "student");
  els.roleProfessor.classList.toggle("active", state.role === "professor");
  els.roleStudent.setAttribute("aria-disabled", String(!readyForRoleSelection));
  els.roleProfessor.setAttribute("aria-disabled", String(!readyForRoleSelection));
  els.roleStudent.classList.toggle("locked", !readyForRoleSelection);
  els.roleProfessor.classList.toggle("locked", !readyForRoleSelection);
  els.roleDescription.textContent = readyForRoleSelection
    ? `Paso 3: ${roleDescription()}`
    : "Primero completa el Paso 1 (Carrera) y el Paso 2 (Año) para habilitar el Paso 3.";
  els.progressFilter.disabled = state.role !== "student";
  els.progressCard.classList.toggle("hidden", state.role !== "student");
  els.studentLoginCard.classList.toggle("hidden", state.role !== "student");
  els.professorLoginCard.classList.toggle("hidden", state.role !== "professor");
  els.professorWorkflow.classList.toggle("hidden", state.role !== "professor");
  document.querySelector("#role-summary")?.classList.toggle("hidden", state.role === "professor");
}

function renderStudentStats() {
  const selected = getSelectedStudent();
  const acquired = getAcquiredSet(selected.id);
  const materials = cohortMaterials();
  const materialIds = new Set(materials.map((item) => item.id));
  const acquiredForCohort = [...acquired].filter((id) => materialIds.has(id)).length;
  const total = materials.length;
  const semesters = new Set(materials.map((item) => item.semester)).size;
  const midterms = new Set(materials.map((item) => `${item.semester}::${item.midterm}`)).size;

  if (state.role !== "student" || !hasRequiredHeaderSelection()) {
    els.studentName.textContent = "Selecciona carrera, año y estudiante";
    els.statAcquired.textContent = "0";
    els.statPending.textContent = "0";
    els.statSemesters.textContent = "0";
    els.statStudentMidterms.textContent = "0";
    return;
  }

  els.studentName.textContent = selected.name;
  els.statAcquired.textContent = String(acquiredForCohort);
  els.statPending.textContent = String(Math.max(total - acquiredForCohort, 0));
  els.statSemesters.textContent = String(semesters);
  els.statStudentMidterms.textContent = String(midterms);
}

function getProfessorActivity(professorId = state.selectedProfessorId) {
  return state.professorActivity[professorId] || {};
}

function getProfessorRecord(materialId, professorId = state.selectedProfessorId) {
  const record = getProfessorActivity(professorId)[materialId];
  if (!record) return { status: "", draft: null };
  if (typeof record === "string") return { status: record, draft: null };
  return {
    status: record.status || "",
    draft: record.draft || null,
  };
}

function getDisplayMaterial(item) {
  if (state.role !== "professor" || !state.selectedProfessorId) {
    return item;
  }
  const record = getProfessorRecord(item.id);
  return record.draft ? { ...item, ...record.draft } : item;
}

function setProfessorRecord(materialId, nextRecord) {
  if (!state.professorActivity[state.selectedProfessorId]) {
    state.professorActivity[state.selectedProfessorId] = {};
  }
  if (!nextRecord.status && !nextRecord.draft) {
    delete state.professorActivity[state.selectedProfessorId][materialId];
  } else {
    state.professorActivity[state.selectedProfessorId][materialId] = nextRecord;
  }
}

function persistProfessorActivity() {
  localStorage.setItem(
    professorStorageKey(state.selectedProfessorId),
    JSON.stringify(getProfessorActivity())
  );
}

function persistCustomMaterials() {
  localStorage.setItem(customMaterialsStorageKey(), JSON.stringify(state.customMaterials));
}

function renderProfessorStats() {
  const professor = getSelectedProfessor();
  const materials = cohortMaterials();
  const materialIds = new Set(materials.map((item) => item.id));
  const activity = getProfessorActivity();
  const statuses = Object.entries(activity)
    .filter(([materialId]) => materialIds.has(materialId))
    .map(([, record]) => (typeof record === "string" ? record : record.status));

  els.professorActiveName.textContent =
    state.role === "professor" && professor ? professor.name : "Sin profesor seleccionado";
  els.professorEditingCount.textContent = String(statuses.filter((status) => status === "editing").length);
  els.professorUpdatedCount.textContent = String(statuses.filter((status) => status === "updated").length);
}

function persistStudentProgress() {
  localStorage.setItem(storageKey(state.selectedStudentId), JSON.stringify([...getAcquiredSet()]));
}

function svgDataUri(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function pickMaterialArtwork(item) {
  const type = String(item.type || "").toLowerCase();
  const name = String(item.name || "").toLowerCase();
  const location = String(item.location || "").toLowerCase();

  if (type.includes("protección") || type.includes("proteccion") || name.includes("guante") || name.includes("mascar")) {
    return { icon: "P", label: "PRO", accent: "#5a7c98", bgTop: "#f2f7fb", bgBottom: "#dceaf5" };
  }
  if (type.includes("equipo") || name.includes("radiograf") || name.includes("lampara") || name.includes("motor")) {
    return { icon: "EQ", label: "EQUIPO", accent: "#7f5b1b", bgTop: "#fff7e6", bgBottom: "#f3ddb0" };
  }
  if (type.includes("instrumento") || name.includes("espejo") || name.includes("pinza") || name.includes("cureta")) {
    return { icon: "IN", label: "INST", accent: "#375d7e", bgTop: "#eef5fb", bgBottom: "#d6e5f2" };
  }
  if (type.includes("estudio") || name.includes("manual") || name.includes("atlas") || name.includes("libro")) {
    return { icon: "ED", label: "EST", accent: "#6b5b8d", bgTop: "#f5f0fb", bgBottom: "#e3daf4" };
  }
  if (type.includes("reposición") || type.includes("reposicion") || name.includes("aguja") || name.includes("anest")) {
    return { icon: "RP", label: "REP", accent: "#8d4b54", bgTop: "#fdf1f3", bgBottom: "#f4d8dd" };
  }
  if (location.includes("laboratorio") || name.includes("yeso") || name.includes("alginato") || name.includes("acril")) {
    return { icon: "LB", label: "LAB", accent: "#56754f", bgTop: "#f2f8ee", bgBottom: "#dcebd3" };
  }
  if (location.includes("clínica") || location.includes("clinica") || name.includes("odont") || name.includes("resina")) {
    return { icon: "CL", label: "CLI", accent: "#0f5f5c", bgTop: "#edf8f6", bgBottom: "#d3ece7" };
  }
  return { icon: "MT", label: "MAT", accent: "#112e57", bgTop: "#f6f2ea", bgBottom: "#eadbbd" };
}

function buildMaterialArtwork(item) {
  const art = pickMaterialArtwork(item);
  const shortName = String(item.name || "Material").slice(0, 20);
  const safeShortName = escapeHtml(shortName);
  const safeIcon = escapeHtml(art.icon);
  const safeLabel = escapeHtml(art.label);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img" aria-label="${safeShortName}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${art.bgTop}" />
          <stop offset="100%" stop-color="${art.bgBottom}" />
        </linearGradient>
      </defs>
      <rect width="160" height="160" rx="28" fill="url(#bg)" />
      <circle cx="80" cy="62" r="34" fill="#ffffff" fill-opacity="0.72" />
      <text x="80" y="74" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-size="28" font-weight="700" fill="${art.accent}">${safeIcon}</text>
      <rect x="22" y="112" width="116" height="24" rx="12" fill="${art.accent}" fill-opacity="0.14" />
      <text x="80" y="129" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-size="14" font-weight="700" fill="${art.accent}">${safeLabel}</text>
    </svg>
  `;
  return svgDataUri(svg);
}

function materialImage(item) {
  return item.image || buildMaterialArtwork(item);
}

function applyImageZoom() {
  els.imageViewerImg.style.transform = `scale(${state.imageZoom})`;
}

function openDialog(dialog) {
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
    return;
  }
  dialog.setAttribute("open", "open");
}

function closeDialog(dialog) {
  if (typeof dialog.close === "function") {
    dialog.close();
    return;
  }
  dialog.removeAttribute("open");
}

function openImageViewer(item) {
  state.imageZoom = 1;
  els.imageViewerTitle.textContent = item.name || "Material";
  els.imageViewerImg.src = materialImage(item);
  els.imageViewerImg.alt = `Vista ampliada de ${item.name || "material"}`;
  applyImageZoom();
  openDialog(els.imageViewer);
}

function closeImageViewer() {
  if (els.imageViewer.open || els.imageViewer.hasAttribute("open")) {
    closeDialog(els.imageViewer);
  }
}

function openWelcomeDialog() {
  state.welcomeStep = 1;
  renderWelcomeStep();
  openDialog(els.welcomeDialog);
}

function closeWelcomeDialog() {
  closeDialog(els.welcomeDialog);
}

function openDownloadDisclaimer() {
  openDialog(els.downloadDisclaimerDialog);
}

function closeDownloadDisclaimer() {
  closeDialog(els.downloadDisclaimerDialog);
}

function openPendingDisclaimer() {
  openDialog(els.pendingDisclaimerDialog);
}

function closePendingDisclaimer() {
  closeDialog(els.pendingDisclaimerDialog);
}

function renderWelcomeStep() {
  const onFirstStep = state.welcomeStep === 1;
  const onSecondStep = state.welcomeStep === 2;
  const onThirdStep = state.welcomeStep === 3;

  els.welcomeTitle.textContent = onFirstStep
    ? "Antes de comenzar"
    : onSecondStep
      ? "Cómo funciona esta demo"
      : "Consultas y acceso institucional";
  els.welcomeStep1.classList.toggle("hidden", !onFirstStep);
  els.welcomeStep2.classList.toggle("hidden", !onSecondStep);
  els.welcomeStep3.classList.toggle("hidden", !onThirdStep);
  els.welcomeBack.classList.toggle("hidden", onFirstStep);
  els.welcomeNext.classList.toggle("hidden", onThirdStep);
  els.welcomeConfirm.classList.toggle("hidden", !onThirdStep);
  els.welcomeClose.classList.toggle("hidden", !onThirdStep);
}

function changeImageZoom(delta) {
  state.imageZoom = Math.min(3, Math.max(1, state.imageZoom + delta));
  applyImageZoom();
}

function getStoredQuestions() {
  try {
    return JSON.parse(localStorage.getItem(questionsStorageKey()) || "[]");
  } catch {
    return [];
  }
}

function persistStudentQuestion(entry) {
  const questions = getStoredQuestions();
  questions.push(entry);
  localStorage.setItem(questionsStorageKey(), JSON.stringify(questions));
}

function materialDetails(item) {
  const details = [
    `Cantidad: ${item.quantity || "N/D"}`,
    `Presentacion: ${item.presentation || "N/D"}`,
    `Area de Uso: ${item.location || "N/D"}`,
    `Compra: ${item.purchaseFrequency || "N/D"}`,
  ];
  return details.map((detail) => `<span>${detail}</span>`).join("");
}

function activeFilterEntries() {
  const entries = [
    ["Carrera", state.filters.career],
    ["Año", state.filters.year],
    ["Busqueda", state.filters.query.trim()],
    ["Semestre", state.filters.semester],
    ["Parcial", state.filters.midterm],
    ["Asignatura", state.filters.subject],
    ["Tipo", state.filters.type],
    ["Progreso", state.filters.progress],
  ];

  return entries.filter(([, value]) => value && value !== "all");
}

function hasRequiredHeaderSelection() {
  return Boolean(state.filters.career && state.filters.year);
}

function cohortMaterials() {
  if (!hasRequiredHeaderSelection()) {
    return [];
  }

  return state.catalog.materials.filter(
    (item) => normalizeCareer(careerForItem(item)) === normalizeCareer(state.filters.career) && item.year === state.filters.year
  );
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
  els.materialsList.innerHTML = "";
  renderActiveFilters();

  if (!hasRequiredHeaderSelection()) {
    els.resultsSummary.textContent = "Selecciona una carrera y un año para ver los materiales.";
    els.emptyState.textContent = "Debes elegir una carrera y un año en la parte superior antes de mostrar datos.";
    els.emptyState.classList.remove("hidden");
    return;
  }

  if (!careerHasCatalogData() || !yearHasCatalogData()) {
    els.resultsSummary.textContent = "Catalogo disponible solo para Odontología 3ro.";
    els.emptyState.textContent = "La primera carga de materiales funciona actualmente solo cuando se selecciona Odontología en 3ro.";
    els.emptyState.classList.remove("hidden");
    return;
  }

  const materials = filteredMaterials();

  for (const item of materials) {
    const displayItem = getDisplayMaterial(item);
    const node = els.template.content.firstElementChild.cloneNode(true);
    const image = node.querySelector(".material-image");
    const imageButton = node.querySelector(".material-image-button");
    const questionButton = node.querySelector(".ask-question");
    image.src = materialImage(displayItem);
    image.alt = `${displayItem.name} reference`;
    imageButton.addEventListener("click", () => {
      openImageViewer(displayItem);
    });

    node.querySelector(".material-code").textContent = displayItem.id;
    node.querySelector(".material-type").remove();
    node.querySelector(".material-title").textContent = displayItem.name;
    const metaParts = [displayItem.subject];
    if (displayItem.ownership && displayItem.ownership !== "Individual") {
      metaParts.push(displayItem.ownership);
    }
    metaParts.push(displayItem.timing || "N/D");
    node.querySelector(".material-meta").textContent = metaParts.join(" • ");
    node.querySelector(".tag-semester").textContent = displayItem.semester;
    node.querySelector(".tag-midterm").textContent = `Parcial ${displayItem.midterm}`;
    node.querySelector(".tag-location").textContent = displayItem.location || "Area de uso pendiente";
    node.querySelector(".material-notes").textContent =
      displayItem.notes || displayItem.otherSubjects || "Aun no hay observaciones del profesor para este material.";
    node.querySelector(".material-details").innerHTML = materialDetails(displayItem);

    const button = node.querySelector(".toggle-acquired");
    const professorStatus = node.querySelector(".professor-status");
    if (state.role === "professor") {
      const record = getProfessorRecord(item.id);
      const status = record.status;
      professorStatus.classList.remove("hidden");
      professorStatus.textContent = status === "editing"
        ? "Estado del profesor: en edición"
        : status === "updated"
          ? "Estado del profesor: cambio marcado"
          : "Estado del profesor: sin cambios";
      if (record.draft) {
        professorStatus.textContent += " • borrador guardado";
      }
      button.textContent = "✏️ Editar material";
      button.disabled = !state.selectedProfessorId;
      button.addEventListener("click", () => {
        openProfessorEditor(item);
      });
      questionButton.classList.add("hidden");
    } else {
      professorStatus.classList.add("hidden");
      questionButton.classList.toggle("hidden", state.role !== "student");
      questionButton.textContent = "✉️ Enviar pregunta";
      questionButton.addEventListener("click", () => {
        openStudentQuestionDialog(displayItem);
      });
      const acquired = isAcquired(item.id);
      button.textContent = acquired ? "Adquirido" : "Marcar como adquirido";
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

  els.resultsSummary.textContent = `${materials.length} material${materials.length === 1 ? "" : "es"} mostrados`;
  els.emptyState.classList.toggle("hidden", materials.length > 0);
}

function openProfessorEditor(item) {
  const record = getProfessorRecord(item.id);
  const displayItem = record.draft ? { ...item, ...record.draft } : item;
  els.editorDialog.dataset.mode = "edit";
  els.editorDialog.dataset.materialId = item.id;
  populateEditorOptions(displayItem);
  els.editorTitle.textContent = `${item.id} • ${displayItem.name}`;
  els.editorName.value = displayItem.name || "";
  els.editorQuantity.value = displayItem.quantity || "";
  els.editorSubject.value = displayItem.subject || els.editorSubject.value;
  els.editorSemester.value = displayItem.semester || els.editorSemester.value;
  els.editorMidterm.value = displayItem.midterm || els.editorMidterm.value;
  els.editorPresentation.value = displayItem.presentation || els.editorPresentation.value;
  els.editorLocation.value = displayItem.location || els.editorLocation.value;
  els.editorType.value = displayItem.type || els.editorType.value;
  els.editorPurchase.value = displayItem.purchaseFrequency || els.editorPurchase.value;
  els.editorImage.value = displayItem.image || "";
  els.editorNotes.value = displayItem.notes || "";
  els.editorDialog.showModal();
}

function openAddMaterialDialog() {
  const templateMaterial = {
    subject: cohortMaterials()[0]?.subject || state.catalog.materials[0]?.subject || "",
    semester: cohortMaterials()[0]?.semester || state.catalog.materials[0]?.semester || "",
    midterm: cohortMaterials()[0]?.midterm || state.catalog.materials[0]?.midterm || "",
    presentation: state.catalog.materials[0]?.presentation || "",
    location: state.catalog.materials[0]?.location || "",
    type: state.catalog.materials[0]?.type || "",
    purchaseFrequency: state.catalog.materials[0]?.purchaseFrequency || "",
  };
  els.editorDialog.dataset.mode = "create";
  delete els.editorDialog.dataset.materialId;
  populateEditorOptions(templateMaterial);
  els.editorTitle.textContent = "Nuevo material";
  els.editorName.value = "";
  els.editorQuantity.value = "1";
  els.editorSubject.value = templateMaterial.subject || els.editorSubject.value;
  els.editorSemester.value = templateMaterial.semester || els.editorSemester.value;
  els.editorMidterm.value = templateMaterial.midterm || els.editorMidterm.value;
  els.editorPresentation.value = templateMaterial.presentation || els.editorPresentation.value;
  els.editorLocation.value = templateMaterial.location || els.editorLocation.value;
  els.editorType.value = templateMaterial.type || els.editorType.value;
  els.editorPurchase.value = templateMaterial.purchaseFrequency || els.editorPurchase.value;
  els.editorImage.value = "";
  els.editorNotes.value = "";
  els.editorDialog.showModal();
}

function closeProfessorEditor() {
  els.editorDialog.close();
}

function openStudentQuestionDialog(item) {
  const selectedStudent = getSelectedStudent();
  els.questionDialog.dataset.materialId = item.id;
  els.questionTitle.textContent = `${item.id} • ${item.name}`;
  els.questionCarnet.value = "";
  els.questionName.value = selectedStudent?.name || "";
  els.questionEmail.value = "";
  els.questionBody.value = "";
  els.questionFeedback.textContent = "En la version en vivo validaremos el numero de carnet antes del envio.";
  els.questionFeedback.classList.remove("hidden");
  openDialog(els.questionDialog);
}

function closeStudentQuestionDialog() {
  closeDialog(els.questionDialog);
}

function saveProfessorEdit(event) {
  event.preventDefault();
  const mode = els.editorDialog.dataset.mode || "edit";
  const materialId = els.editorDialog.dataset.materialId;
  if (!state.selectedProfessorId) {
    return;
  }
  const draft = {
    name: els.editorName.value.trim(),
    subject: els.editorSubject.value.trim(),
    semester: els.editorSemester.value.trim(),
    midterm: els.editorMidterm.value.trim(),
    presentation: els.editorPresentation.value.trim(),
    quantity: els.editorQuantity.value.trim(),
    location: els.editorLocation.value.trim(),
    type: els.editorType.value.trim(),
    purchaseFrequency: els.editorPurchase.value.trim(),
    image: els.editorImage.value.trim(),
    notes: els.editorNotes.value.trim(),
  };
  if (mode === "create") {
    const newMaterial = {
      id: `P${Date.now().toString().slice(-8)}`,
      suggestedBrand: "",
      system: "",
      career: state.filters.career,
      year: state.filters.year,
      ownership: "Individual",
      timing: "Inmediato",
      otherSubjects: "",
      studentStatus: "pending",
      downloadSource: "./data/MATERIALES ODONTOLOGIA.xlsx",
      ...draft,
    };
    state.customMaterials.push(newMaterial);
    state.catalog.materials.push(newMaterial);
    persistCustomMaterials();
    populateControls();
    closeProfessorEditor();
    renderProgramStats();
    renderSubjectSummary();
    renderProfessorStats();
    renderMaterials();
    return;
  }
  if (!materialId) {
    return;
  }
  setProfessorRecord(materialId, {
    status: "updated",
    draft,
  });
  persistProfessorActivity();
  closeProfessorEditor();
  renderProfessorStats();
  renderMaterials();
}

function saveStudentQuestion(event) {
  event.preventDefault();
  const materialId = els.questionDialog.dataset.materialId;
  if (!materialId) {
    return;
  }
  const material = state.catalog.materials.find((item) => item.id === materialId);
  const entry = {
    materialId,
    materialName: material?.name || "",
    career: state.filters.career,
    year: state.filters.year,
    studentId: state.selectedStudentId,
    carnet: els.questionCarnet.value.trim(),
    name: els.questionName.value.trim(),
    replyEmail: els.questionEmail.value.trim(),
    question: els.questionBody.value.trim(),
    createdAt: new Date().toISOString(),
  };
  persistStudentQuestion(entry);
  closeStudentQuestionDialog();
  els.resultsSummary.textContent = `Pregunta enviada para ${entry.materialName || materialId}.`;
}

function resetFilters() {
  state.role = "";
  state.filters = {
    career: "",
    year: "",
    query: "",
    semester: "all",
    midterm: "all",
    subject: "all",
    type: "all",
    progress: "all",
  };
  els.careerFilter.value = "";
  els.yearFilter.value = "";
  els.searchInput.value = "";
  els.semesterFilter.value = "all";
  els.midtermFilter.value = "all";
  els.subjectFilter.value = "all";
  els.typeFilter.value = "all";
  els.progressFilter.value = "all";
}

function bindEvents() {
  els.roleStudent.addEventListener("click", () => {
    if (!hasRequiredHeaderSelection()) {
      renderRoleState();
      return;
    }
    state.role = "student";
    renderRoleState();
    renderStudentStats();
    renderProfessorStats();
    renderMaterials();
  });

  els.roleProfessor.addEventListener("click", () => {
    if (!hasRequiredHeaderSelection()) {
      renderRoleState();
      return;
    }
    state.role = "professor";
    renderRoleState();
    renderStudentStats();
    renderProfessorStats();
    renderMaterials();
  });

  els.studentSelect.addEventListener("change", (event) => {
    state.selectedStudentId = event.target.value;
    renderStudentStats();
    renderMaterials();
  });

  els.subjectSummary.addEventListener("click", (event) => {
    const button = event.target.closest(".summary-export-btn");
    if (!button) {
      return;
    }
    exportSubjectAsXls(button.dataset.subject || "");
  });

  els.masterDownload.addEventListener("click", async () => {
    openDownloadDisclaimer();
  });

  els.professorSelect.addEventListener("change", (event) => {
    state.selectedProfessorId = event.target.value;
    renderProfessorStats();
    renderMaterials();
  });

  els.addMaterialButton.addEventListener("click", () => {
    if (!state.selectedProfessorId) {
      return;
    }
    openAddMaterialDialog();
  });

  els.editorClose.addEventListener("click", closeProfessorEditor);
  els.editorCancel.addEventListener("click", closeProfessorEditor);
  els.editorForm.addEventListener("submit", saveProfessorEdit);
  els.imageViewerClose.addEventListener("click", closeImageViewer);
  els.imageZoomIn.addEventListener("click", () => changeImageZoom(0.25));
  els.imageZoomOut.addEventListener("click", () => changeImageZoom(-0.25));
  els.imageViewer.addEventListener("click", (event) => {
    if (event.target === els.imageViewer) {
      closeImageViewer();
    }
  });
  els.questionClose.addEventListener("click", closeStudentQuestionDialog);
  els.questionCancel.addEventListener("click", closeStudentQuestionDialog);
  els.questionForm.addEventListener("submit", saveStudentQuestion);
  els.welcomeClose.addEventListener("click", closeWelcomeDialog);
  els.welcomeBack.addEventListener("click", () => {
    state.welcomeStep = Math.max(1, state.welcomeStep - 1);
    renderWelcomeStep();
  });
  els.welcomeNext.addEventListener("click", () => {
    state.welcomeStep = Math.min(3, state.welcomeStep + 1);
    renderWelcomeStep();
  });
  els.welcomeConfirm.addEventListener("click", closeWelcomeDialog);
  els.downloadDisclaimerClose.addEventListener("click", closeDownloadDisclaimer);
  els.downloadDisclaimerCancel.addEventListener("click", closeDownloadDisclaimer);
  els.downloadDisclaimerConfirm.addEventListener("click", async () => {
    closeDownloadDisclaimer();
    try {
      await downloadMasterWorkbook();
    } catch (error) {
      els.resultsSummary.textContent = error.message;
    }
  });

  for (const [key, element] of [
    ["career", els.careerFilter],
    ["year", els.yearFilter],
  ]) {
    element.addEventListener("change", (event) => {
      state.filters[key] = event.target.value;
      if (!hasRequiredHeaderSelection()) {
        state.role = "";
      }
      renderProgramStats();
      renderSubjectSummary();
      renderRoleState();
      renderStudentStats();
      renderProfessorStats();
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
    openPendingDisclaimer();
  });

  els.pendingDisclaimerClose.addEventListener("click", closePendingDisclaimer);
  els.pendingDisclaimerCancel.addEventListener("click", closePendingDisclaimer);
  els.pendingDisclaimerConfirm.addEventListener("click", () => {
    closePendingDisclaimer();
    state.role = "student";
    renderRoleState();
    state.filters.progress = "pending";
    els.progressFilter.value = "pending";
    renderProgramStats();
    renderStudentStats();
    renderMaterials();
  });

  els.resetFilters.addEventListener("click", () => {
    resetFilters();
    renderProgramStats();
    renderSubjectSummary();
    renderRoleState();
    renderMaterials();
    renderStudentStats();
    renderProfessorStats();
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
    renderProfessorStats();
    renderMaterials();
    openWelcomeDialog();
    bindEvents();
  } catch (error) {
    els.resultsSummary.textContent = "No se pudo cargar el catalogo de materiales.";
    els.emptyState.textContent = error.message;
    els.emptyState.classList.remove("hidden");
  }
}

init();
