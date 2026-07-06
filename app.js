const graphEl = document.querySelector("#graph");
const keyboardEl = document.querySelector("#keyboard");
const selectionText = document.querySelector("#selectionText");
const chordToneText = document.querySelector("#chordToneText");
const tensionText = document.querySelector("#tensionText");
const keySelect = document.querySelector("#keySelect");
const resetButton = document.querySelector("#resetButton");
const bluesScaleButton = document.querySelector("#bluesScaleButton");
const patternSelect = document.querySelector("#patternSelect");
const playPatternButton = document.querySelector("#playPatternButton");

const COLORS = {
  tonic: "#e8505b",
  subdominant: "#2f9e73",
  dominant: "#f08c2e",
  dominant7: "#f08c2e",
  diminished: "#8f5bd7"
};

const PITCH_CLASS = {
  C: 0,
  "B#": 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  Fb: 4,
  "E#": 5,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
  Cb: 11
};

const KEY_SCALES = {
  C: ["C", "D", "E", "F", "G", "A", "B"],
  Db: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
  D: ["D", "E", "F#", "G", "A", "B", "C#"],
  Eb: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
  E: ["E", "F#", "G#", "A", "B", "C#", "D#"],
  F: ["F", "G", "A", "Bb", "C", "D", "E"],
  Gb: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
  G: ["G", "A", "B", "C", "D", "E", "F#"],
  Ab: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
  A: ["A", "B", "C#", "D", "E", "F#", "G#"],
  Bb: ["Bb", "C", "D", "Eb", "F", "G", "A"],
  B: ["B", "C#", "D#", "E", "F#", "G#", "A#"]
};

const MINOR_KEY_SCALES = {
  C: ["C", "D", "Eb", "F", "G", "Ab", "Bb"],
  "C#": ["C#", "D#", "E", "F#", "G#", "A", "B"],
  D: ["D", "E", "F", "G", "A", "Bb", "C"],
  Eb: ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db"],
  E: ["E", "F#", "G", "A", "B", "C", "D"],
  F: ["F", "G", "Ab", "Bb", "C", "Db", "Eb"],
  "F#": ["F#", "G#", "A", "B", "C#", "D", "E"],
  G: ["G", "A", "Bb", "C", "D", "Eb", "F"],
  "G#": ["G#", "A#", "B", "C#", "D#", "E", "F#"],
  A: ["A", "B", "C", "D", "E", "F", "G"],
  Bb: ["Bb", "C", "Db", "Eb", "F", "Gb", "Ab"],
  B: ["B", "C#", "D", "E", "F#", "G", "A"]
};

const NODE_DEFINITIONS = [
  { id: "I", degree: 0, suffix: "", function: "tonic", intervals: [0, 4, 7] },
  { id: "ii", degree: 1, suffix: "m", function: "subdominant", intervals: [0, 3, 7] },
  { id: "iii", degree: 2, suffix: "m", function: "tonic", intervals: [0, 3, 7] },
  { id: "IV", degree: 3, suffix: "", function: "subdominant", intervals: [0, 4, 7] },
  { id: "V", degree: 4, suffix: "", function: "dominant", intervals: [0, 4, 7] },
  { id: "vi", degree: 5, suffix: "m", function: "tonic", intervals: [0, 3, 7] },
  { id: "vii-dim", degree: 6, suffix: "dim", function: "diminished", intervals: [0, 3, 6] },
  { id: "I7", degree: 0, suffix: "7", function: "dominant7", intervals: [0, 4, 7, 10] },
  { id: "II7", degree: 1, suffix: "7", function: "dominant7", intervals: [0, 4, 7, 10] },
  { id: "III7", degree: 2, suffix: "7", function: "dominant7", intervals: [0, 4, 7, 10] },
  { id: "IV7", degree: 3, suffix: "7", function: "dominant7", intervals: [0, 4, 7, 10] },
  { id: "V7", degree: 4, suffix: "7", function: "dominant7", intervals: [0, 4, 7, 10] },
  { id: "VI7", degree: 5, suffix: "7", function: "dominant7", intervals: [0, 4, 7, 10] },
  { id: "VII7", degree: 6, suffix: "7", function: "dominant7", intervals: [0, 4, 7, 10] },
  { id: "vi-dim", degree: 5, suffix: "dim", function: "diminished", intervals: [0, 3, 6] },
  { id: "ii-dim", degree: 1, suffix: "dim", function: "diminished", intervals: [0, 3, 6] },
  { id: "sharp-iv-dim", degree: 3, accidental: 1, suffix: "dim", function: "diminished", intervals: [0, 3, 6] },
  { id: "flat-vii-dim", degree: 6, accidental: -1, suffix: "dim", function: "diminished", intervals: [0, 3, 6] }
];

const MINOR_NODE_DEFINITIONS = [
  { id: "i", degree: 0, suffix: "m", function: "tonic", intervals: [0, 3, 7] },
  { id: "ii-dim", degree: 1, suffix: "dim", function: "diminished", intervals: [0, 3, 6] },
  { id: "bIII", degree: 2, suffix: "", function: "tonic", intervals: [0, 4, 7] },
  { id: "iv", degree: 3, suffix: "m", function: "subdominant", intervals: [0, 3, 7] },
  { id: "v", degree: 4, suffix: "m", function: "dominant", intervals: [0, 3, 7] },
  { id: "bVI", degree: 5, suffix: "", function: "subdominant", intervals: [0, 4, 7] },
  { id: "bVII", degree: 6, suffix: "", function: "dominant", intervals: [0, 4, 7] },
  { id: "V", degree: 4, suffix: "", function: "dominant", intervals: [0, 4, 7] },
  { id: "V7", degree: 4, suffix: "7", function: "dominant7", intervals: [0, 4, 7, 10] },
  { id: "i7", degree: 0, suffix: "m7", function: "tonic", intervals: [0, 3, 7, 10] },
  { id: "III7", degree: 2, suffix: "7", function: "dominant7", intervals: [0, 4, 7, 10] },
  { id: "IV7", degree: 3, suffix: "7", function: "dominant7", intervals: [0, 4, 7, 10] },
  { id: "VI7", degree: 5, suffix: "7", function: "dominant7", intervals: [0, 4, 7, 10] },
  { id: "bVII7", degree: 6, suffix: "7", function: "dominant7", intervals: [0, 4, 7, 10] },
  { id: "vii-dim", degree: 6, accidental: 1, suffix: "dim", function: "diminished", intervals: [0, 3, 6] },
  { id: "sharp-i-dim", degree: 0, accidental: 1, suffix: "dim", function: "diminished", intervals: [0, 3, 6] },
  { id: "sharp-iv-dim", degree: 3, accidental: 1, suffix: "dim", function: "diminished", intervals: [0, 3, 6] },
  { id: "flat-vii-dim", degree: 6, suffix: "dim", function: "diminished", intervals: [0, 3, 6] }
];

const EDGE_DEFINITIONS = [
  { from: "I", to: "ii", label: "I-ii" },
  { from: "I", to: "IV", label: "I-IV" },
  { from: "I", to: "vi", label: "I-vi" },
  { from: "ii", to: "V", label: "ii-V" },
  { from: "ii", to: "V7", label: "ii-V7" },
  { from: "iii", to: "vi", label: "iii-vi" },
  { from: "iii", to: "IV", label: "iii-IV" },
  { from: "IV", to: "V", label: "IV-V" },
  { from: "IV", to: "I", label: "IV-I" },
  { from: "V", to: "I", label: "V-I" },
  { from: "V7", to: "I", label: "V7-I" },
  { from: "vi", to: "ii", label: "vi-ii" },
  { from: "vi", to: "IV", label: "vi-IV" },
  { from: "vii-dim", to: "I", label: "vii-I" },
  { from: "I7", to: "IV", label: "V7/IV" },
  { from: "II7", to: "V", label: "V7/V" },
  { from: "III7", to: "vi", label: "V7/vi" },
  { from: "IV7", to: "vii-dim", label: "chromatic" },
  { from: "VI7", to: "ii", label: "V7/ii" },
  { from: "VII7", to: "iii", label: "V7/iii" },
  { from: "vi-dim", to: "vi", label: "passing" },
  { from: "vi-dim", to: "ii", label: "diminished resolution" },
  { from: "ii-dim", to: "ii", label: "passing" },
  { from: "ii-dim", to: "I", label: "diminished resolution" },
  { from: "sharp-iv-dim", to: "IV", label: "leading diminished" },
  { from: "flat-vii-dim", to: "vii-dim", label: "chromatic" },
  { from: "flat-vii-dim", to: "vi", label: "chromatic neighbor" }
];

const MINOR_EDGE_DEFINITIONS = [
  { from: "i", to: "iv", label: "i-iv" },
  { from: "i", to: "bVI", label: "i-bVI" },
  { from: "i", to: "bVII", label: "i-bVII" },
  { from: "ii-dim", to: "V", label: "ii-V" },
  { from: "ii-dim", to: "V7", label: "ii-V7" },
  { from: "bIII", to: "bVI", label: "bIII-bVI" },
  { from: "bIII", to: "iv", label: "bIII-iv" },
  { from: "iv", to: "V", label: "iv-V" },
  { from: "iv", to: "V7", label: "iv-V7" },
  { from: "iv", to: "i", label: "iv-i" },
  { from: "v", to: "i", label: "v-i" },
  { from: "V", to: "i", label: "V-i" },
  { from: "V7", to: "i", label: "V7-i" },
  { from: "bVI", to: "iv", label: "bVI-iv" },
  { from: "bVI", to: "ii-dim", label: "bVI-ii" },
  { from: "bVII", to: "bIII", label: "bVII-bIII" },
  { from: "bVII", to: "i", label: "bVII-i" },
  { from: "vii-dim", to: "i", label: "vii-i" },
  { from: "III7", to: "bVI", label: "V7/bVI" },
  { from: "IV7", to: "bVII", label: "V7/bVII" },
  { from: "VI7", to: "ii-dim", label: "V7/ii" },
  { from: "bVII7", to: "bIII", label: "V7/bIII" },
  { from: "sharp-i-dim", to: "ii-dim", label: "passing" },
  { from: "sharp-iv-dim", to: "V", label: "leading diminished" },
  { from: "flat-vii-dim", to: "bVII", label: "passing" },
  { from: "flat-vii-dim", to: "i", label: "chromatic neighbor" }
];

const PATTERN_DEFINITIONS = [
  { id: "ii-v-i", name: "ii-V-I", steps: ["ii", "V7", "I"] },
  { id: "turnaround", name: "I-vi-ii-V", steps: ["I", "vi", "ii", "V7"] },
  { id: "secondary-dominants", name: "Secondary dominants", steps: ["VII7", "iii", "III7", "vi", "VI7", "ii", "II7", "V", "V7", "I"] }
];

const MINOR_PATTERN_DEFINITIONS = [
  { id: "minor-ii-v-i", name: "minor ii-V-i", steps: ["ii-dim", "V7", "i"] },
  { id: "minor-cadence", name: "i-iv-V-i", steps: ["i", "iv", "V7", "i"] },
  { id: "andalusian", name: "i-bVII-bVI-V", steps: ["i", "bVII", "bVI", "V7"] },
  { id: "minor-secondary-dominants", name: "Minor secondary dominants", steps: ["bVII7", "bIII", "III7", "bVI", "VI7", "ii-dim", "V7", "i"] }
];

const MAP_CONFIGS = {
  major: {
    label: "major",
    scales: KEY_SCALES,
    nodes: NODE_DEFINITIONS,
    edges: EDGE_DEFINITIONS,
    patterns: PATTERN_DEFINITIONS
  },
  minor: {
    label: "minor",
    scales: MINOR_KEY_SCALES,
    nodes: MINOR_NODE_DEFINITIONS,
    edges: MINOR_EDGE_DEFINITIONS,
    patterns: MINOR_PATTERN_DEFINITIONS
  }
};

const TENSION_PROFILES = {
  major: [
    { label: "9", interval: 14 },
    { label: "#11", interval: 18, spelling: "sharp" },
    { label: "13", interval: 21 }
  ],
  minor: [
    { label: "9", interval: 14 },
    { label: "11", interval: 17 },
    { label: "13", interval: 21 }
  ],
  dominant: [
    { label: "9", interval: 14 },
    { label: "13", interval: 21 }
  ],
  dominant7: [
    { label: "b9", interval: 13, spelling: "flat" },
    { label: "9", interval: 14 },
    { label: "#9", interval: 15, spelling: "sharp" },
    { label: "#11", interval: 18, spelling: "sharp" },
    { label: "b13", interval: 20, spelling: "flat" },
    { label: "13", interval: 21 }
  ],
  diminished: [
    { label: "b9", interval: 13, spelling: "flat" },
    { label: "11", interval: 17 },
    { label: "b13", interval: 20, spelling: "flat" }
  ]
};

const INTERVAL_LABELS = {
  0: "R",
  1: "b2",
  2: "2",
  3: "b3",
  4: "3",
  5: "4",
  6: "b5",
  7: "5",
  8: "#5",
  9: "6",
  10: "b7",
  11: "7"
};

let data;
let node;
let edge;
let edgeLabel;
let simulation;
let selectedId = null;
let patternTimer = null;
let bluesScaleActive = false;
let audioContext = null;

init();

function init() {
  buildKeyMenu();
  buildKeyboard();
  loadKey(keySelect.value);
  bindControls();
  window.addEventListener("resize", drawGraph);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
}

function buildKeyMenu() {
  const majorGroup = document.createElement("optgroup");
  majorGroup.label = "Major keys";
  Object.keys(KEY_SCALES).forEach((key) => {
    const option = document.createElement("option");
    option.value = `${key}:major`;
    option.textContent = `${key} major`;
    majorGroup.append(option);
  });

  const minorGroup = document.createElement("optgroup");
  minorGroup.label = "Minor keys";
  Object.keys(MINOR_KEY_SCALES).forEach((key) => {
    const option = document.createElement("option");
    option.value = `${key}:minor`;
    option.textContent = `${key} minor`;
    minorGroup.append(option);
  });

  keySelect.append(majorGroup, minorGroup);
  keySelect.value = "C:major";
}

function buildPatternMenu(patterns) {
  patternSelect.innerHTML = '<option value="">進行パターン</option>';
  patterns.forEach((pattern) => {
    const option = document.createElement("option");
    option.value = pattern.id;
    option.textContent = pattern.name;
    patternSelect.append(option);
  });
}

function loadKey(keyName) {
  clearPatternTimer();
  selectedId = null;
  bluesScaleActive = false;
  setBluesButtonState(false);
  data = createKeyData(keyName);
  buildPatternMenu(data.patterns);
  drawGraph();
  clearKeyboardHighlights();
  clearChordDetails();
  selectionText.textContent = `${data.key} を表示中です。コードを選ぶと、進行先と鍵盤が光ります。`;
}

function createKeyData(selection) {
  const [keyName, mode] = selection.split(":");
  const config = MAP_CONFIGS[mode];
  const scale = config.scales[keyName];
  const pitchToName = createPitchNameMap(scale);
  const nodes = config.nodes.map((definition) => {
    const root = transposeNote(scale[definition.degree], definition.accidental || 0, pitchToName);
    const tones = definition.intervals.map((interval) => transposeNote(root, interval, pitchToName));
    const toneDegrees = definition.intervals.map(intervalToDegreeLabel);
    const tensions = createTensions(root, definition, pitchToName);
    return {
      id: definition.id,
      name: `${root}${definition.suffix}`,
      degree: definition.id,
      function: definition.function,
      color: COLORS[definition.function],
      tones,
      toneDegrees,
      tensions
    };
  });

  const nodeById = new Map(nodes.map((item) => [item.id, item]));
  return {
    key: `${keyName} ${config.label}`,
    keyName,
    mode,
    pitchToName,
    nodes,
    edges: config.edges.map((edgeItem) => ({
      ...edgeItem,
      fromName: nodeById.get(edgeItem.from).name,
      toName: nodeById.get(edgeItem.to).name
    })),
    patterns: config.patterns.map((pattern) => ({
      ...pattern,
      label: pattern.steps.map((stepId) => nodeById.get(stepId).name).join(" - ")
    }))
  };
}

function createPitchNameMap(scale) {
  const map = new Map();
  scale.forEach((note) => map.set(noteToPitch(note), note));

  const prefersFlats = scale.some((note) => note.includes("b"));
  const chromatic = prefersFlats
    ? ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
    : ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  chromatic.forEach((note) => {
    const pitch = noteToPitch(note);
    if (!map.has(pitch)) {
      map.set(pitch, note);
    }
  });
  return map;
}

function transposeNote(note, semitones, pitchToName) {
  const pitch = (noteToPitch(note) + semitones + 120) % 12;
  return pitchToName.get(pitch);
}

function noteToPitch(note) {
  return PITCH_CLASS[note];
}

function intervalToDegreeLabel(interval) {
  return INTERVAL_LABELS[((interval % 12) + 12) % 12];
}

function createTensions(root, definition, pitchToName) {
  const profile = getTensionProfile(definition);
  const chordPitches = new Set(definition.intervals.map((interval) => (noteToPitch(root) + interval) % 12));
  return profile
    .map((tension) => {
      const pitch = (noteToPitch(root) + tension.interval) % 12;
      return {
        label: tension.label,
        pitch,
        name: spellTensionNote(pitch, tension.spelling, pitchToName)
      };
    })
    .filter((tension) => !chordPitches.has(tension.pitch));
}

function getTensionProfile(definition) {
  if (definition.function === "dominant7") {
    return TENSION_PROFILES.dominant7;
  }
  if (definition.function === "dominant") {
    return TENSION_PROFILES.dominant;
  }
  if (definition.function === "diminished") {
    return TENSION_PROFILES.diminished;
  }
  if (definition.suffix.includes("m")) {
    return TENSION_PROFILES.minor;
  }
  return TENSION_PROFILES.major;
}

function spellTensionNote(pitch, spelling, pitchToName) {
  if (spelling === "flat") {
    return noteFromPitch(pitch, true).name;
  }
  if (spelling === "sharp") {
    return noteFromPitch(pitch, false).name;
  }
  return pitchToName.get(pitch);
}

function buildKeyboard() {
  const whiteNotes = ["C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B"];
  const whiteMidi = [60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83];
  const blackNotes = [
    { note: "C#/Db", pitch: 1, midi: 61, left: 7.15 },
    { note: "D#/Eb", pitch: 3, midi: 63, left: 14.3 },
    { note: "F#/Gb", pitch: 6, midi: 66, left: 28.6 },
    { note: "G#/Ab", pitch: 8, midi: 68, left: 35.75 },
    { note: "A#/Bb", pitch: 10, midi: 70, left: 42.9 },
    { note: "C#/Db", pitch: 1, midi: 73, left: 57.2 },
    { note: "D#/Eb", pitch: 3, midi: 75, left: 64.35 },
    { note: "F#/Gb", pitch: 6, midi: 78, left: 78.65 },
    { note: "G#/Ab", pitch: 8, midi: 80, left: 85.8 },
    { note: "A#/Bb", pitch: 10, midi: 82, left: 92.95 }
  ];

  keyboardEl.innerHTML = "";
  whiteNotes.forEach((note, index) => {
    keyboardEl.append(createKey(note, noteToPitch(note), whiteMidi[index], "white", index + 1));
  });
  blackNotes.forEach(({ note, pitch, midi, left }) => {
    const key = createKey(note, pitch, midi, "black");
    key.style.left = `${left}%`;
    keyboardEl.append(key);
  });
}

function createKey(label, pitch, midi, color, column) {
  const key = document.createElement("div");
  key.className = `key ${color}`;
  key.dataset.pitch = String(pitch);
  key.dataset.midi = String(midi);
  const noteLabel = document.createElement("span");
  noteLabel.className = "key-note";
  noteLabel.textContent = label;
  const degreeLabel = document.createElement("span");
  degreeLabel.className = "key-degree";
  key.append(noteLabel, degreeLabel);
  key.addEventListener("pointerdown", () => playKeyboardKey(key));
  if (column) {
    key.style.gridColumn = String(column);
  }
  return key;
}

function playKeyboardKey(key) {
  const midi = Number(key.dataset.midi);
  playMidiNote(midi);
  key.classList.add("playing");
  window.setTimeout(() => key.classList.remove("playing"), 160);
}

function playMidiNote(midi) {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  if (context.state === "suspended") {
    context.resume();
  }

  const now = context.currentTime;
  const frequency = 440 * 2 ** ((midi - 69) / 12);
  const gain = context.createGain();
  const fundamental = context.createOscillator();
  const overtone = context.createOscillator();

  fundamental.type = "triangle";
  fundamental.frequency.setValueAtTime(frequency, now);
  overtone.type = "sine";
  overtone.frequency.setValueAtTime(frequency * 2, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.28, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

  fundamental.connect(gain);
  overtone.connect(gain);
  gain.connect(context.destination);

  fundamental.start(now);
  overtone.start(now);
  fundamental.stop(now + 0.8);
  overtone.stop(now + 0.8);
}

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    selectionText.textContent = "このブラウザでは音声再生に対応していません。";
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContextClass();
  }
  return audioContext;
}

function drawGraph() {
  if (simulation) {
    simulation.stop();
  }

  const width = graphEl.clientWidth;
  const height = graphEl.clientHeight;
  const svg = d3.select(graphEl);
  svg.selectAll("*").remove();

  svg
    .attr("viewBox", [0, 0, width, height])
    .attr("preserveAspectRatio", "xMidYMid meet");

  svg.append("defs")
    .append("marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 22)
    .attr("refY", 0)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("fill", "#706a63");

  const zoomLayer = svg.append("g");
  svg.call(
    d3.zoom()
      .scaleExtent([0.45, 2.8])
      .on("zoom", (event) => zoomLayer.attr("transform", event.transform))
  );

  const links = data.edges.map((item) => ({ ...item, source: item.from, target: item.to }));
  const nodes = data.nodes.map((item) => ({ ...item }));

  edge = zoomLayer.append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("class", "edge")
    .attr("marker-end", "url(#arrow)");

  edgeLabel = zoomLayer.append("g")
    .selectAll("text")
    .data(links)
    .join("text")
    .attr("class", "edge-label")
    .text((d) => d.label);

  node = zoomLayer.append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("class", "node")
    .attr("data-chord", (d) => d.id)
    .attr("data-name", (d) => d.name)
    .call(dragBehavior());

  node.append("circle")
    .attr("r", 26)
    .attr("fill", (d) => d.color);

  node.append("text")
    .text((d) => d.name);

  node.on("click", (event, d) => {
    event.stopPropagation();
    selectChord(d.id);
  });

  svg.on("click", clearSelection);

  simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id((d) => d.id).distance(115).strength(0.55))
    .force("charge", d3.forceManyBody().strength(-560))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide(42))
    .on("tick", ticked);

  function ticked() {
    edge
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    edgeLabel
      .attr("x", (d) => (d.source.x + d.target.x) / 2)
      .attr("y", (d) => (d.source.y + d.target.y) / 2);

    node.attr("transform", (d) => `translate(${d.x},${d.y})`);
  }
}

function dragBehavior() {
  return d3.drag()
    .on("start", (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on("drag", (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    })
    .on("end", (event, d) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });
}

function bindControls() {
  keySelect.addEventListener("change", () => loadKey(keySelect.value));
  resetButton.addEventListener("click", clearSelection);
  bluesScaleButton.addEventListener("click", toggleBluesScale);
  playPatternButton.addEventListener("click", playSelectedPattern);
}

function selectChord(chordId) {
  bluesScaleActive = false;
  setBluesButtonState(false);
  selectedId = chordId;
  const chord = data.nodes.find((item) => item.id === chordId);
  const availableIds = new Set(
    data.edges.filter((item) => item.from === chordId).map((item) => item.to)
  );
  const nodeById = new Map(data.nodes.map((item) => [item.id, item]));

  node
    .classed("dimmed", (d) => d.id !== chordId && !availableIds.has(d.id))
    .classed("selected", (d) => d.id === chordId)
    .classed("available", (d) => availableIds.has(d.id));

  edge
    .classed("dimmed", (d) => d.source.id !== chordId)
    .classed("available", (d) => d.source.id === chordId);

  edgeLabel.classed("dimmed", (d) => d.source.id !== chordId);
  highlightKeys(chord.tones, chord.tensions, chord.toneDegrees);
  updateChordDetails(chord);

  const nextNames = [...availableIds].map((id) => nodeById.get(id).name).join(" / ") || "なし";
  const tensionSummary = formatTensions(chord.tensions);
  selectionText.textContent = `${data.key}: ${chord.name} の次に進みやすいコード: ${nextNames} / テンション: ${tensionSummary}`;
}

function clearSelection() {
  selectedId = null;
  bluesScaleActive = false;
  setBluesButtonState(false);
  clearPatternTimer();
  node?.classed("dimmed selected available pattern-active", false);
  edge?.classed("dimmed available", false);
  edgeLabel?.classed("dimmed", false);
  clearKeyboardHighlights();
  clearChordDetails();
  selectionText.textContent = `${data.key} を表示中です。コードを選ぶと、進行先と鍵盤が光ります。`;
}

function highlightKeys(tones, tensions = [], toneDegrees = []) {
  const pitches = new Set(tones.map(noteToPitch).map(String));
  const tensionPitches = new Set(tensions.map((tension) => String(tension.pitch)));
  const degreeByPitch = createDegreeMap(tones, tensions, toneDegrees);
  keyboardEl.querySelectorAll(".key").forEach((key) => {
    key.classList.remove("scale-active");
    key.classList.toggle("tension-active", tensionPitches.has(key.dataset.pitch) && !pitches.has(key.dataset.pitch));
    key.classList.toggle("active", pitches.has(key.dataset.pitch));
    key.querySelector(".key-degree").textContent = degreeByPitch.get(key.dataset.pitch) || "";
  });
}

function createDegreeMap(tones, tensions, toneDegrees) {
  const degreeByPitch = new Map();
  tones.forEach((tone, index) => {
    degreeByPitch.set(String(noteToPitch(tone)), toneDegrees[index]);
  });
  tensions.forEach((tension) => {
    const pitch = String(tension.pitch);
    if (!degreeByPitch.has(pitch)) {
      degreeByPitch.set(pitch, tension.label);
    }
  });
  return degreeByPitch;
}

function clearKeyboardHighlights() {
  keyboardEl.querySelectorAll(".key").forEach((key) => {
    key.classList.remove("active", "scale-active", "tension-active");
    key.querySelector(".key-degree").textContent = "";
  });
}

function updateChordDetails(chord) {
  chordToneText.textContent = chord.tones.join(" / ");
  tensionText.textContent = formatTensions(chord.tensions);
}

function clearChordDetails() {
  chordToneText.textContent = "-";
  tensionText.textContent = "-";
}

function formatTensions(tensions) {
  if (!tensions.length) {
    return "なし";
  }
  return tensions.map((tension) => `${tension.label}(${tension.name})`).join(" / ");
}

function toggleBluesScale() {
  bluesScaleActive = !bluesScaleActive;
  if (bluesScaleActive) {
    showBluesScale();
    return;
  }
  clearSelection();
}

function showBluesScale() {
  selectedId = null;
  clearPatternTimer();
  node?.classed("dimmed selected available pattern-active", false);
  edge?.classed("dimmed available", false);
  edgeLabel?.classed("dimmed", false);
  setBluesButtonState(true);

  const notes = getBluesScaleNotes();
  const pitches = new Set(notes.map((note) => String(note.pitch)));

  keyboardEl.querySelectorAll(".key").forEach((key) => {
    key.classList.remove("active", "tension-active");
    key.classList.toggle("scale-active", pitches.has(key.dataset.pitch));
    key.querySelector(".key-degree").textContent = "";
  });
  chordToneText.textContent = notes.map((note) => note.name).join(" / ");
  tensionText.textContent = "ブルーススケール表示中";

  const scaleType = data.mode === "major" ? "Major blues" : "Minor blues";
  selectionText.textContent = `${data.key}: ${scaleType} scale = ${notes.map((note) => note.name).join(" / ")}`;
}

function setBluesButtonState(active) {
  bluesScaleButton.setAttribute("aria-pressed", String(active));
}

function getBluesScaleNotes() {
  const scale = MAP_CONFIGS[data.mode].scales[data.keyName];
  const rootPitch = noteToPitch(data.keyName);
  if (data.mode === "major") {
    return [
      noteFromScaleDegree(scale, 0),
      noteFromScaleDegree(scale, 1),
      noteFromPitch(rootPitch + 3, true),
      noteFromScaleDegree(scale, 2),
      noteFromScaleDegree(scale, 4),
      noteFromScaleDegree(scale, 5)
    ];
  }

  return [
    noteFromScaleDegree(scale, 0),
    noteFromScaleDegree(scale, 2),
    noteFromScaleDegree(scale, 3),
    noteFromPitch(rootPitch + 6, true),
    noteFromScaleDegree(scale, 4),
    noteFromScaleDegree(scale, 6)
  ];
}

function noteFromScaleDegree(scale, degree) {
  const name = scale[degree];
  return {
    pitch: noteToPitch(name),
    name
  };
}

function noteFromPitch(pitchValue, preferFlats) {
  const pitch = (pitchValue + 120) % 12;
  const names = preferFlats
    ? ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
    : ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  return {
    pitch,
    name: names[pitch]
  };
}

function playSelectedPattern() {
  const pattern = data.patterns.find((item) => item.id === patternSelect.value);
  if (!pattern) {
    return;
  }

  clearPatternTimer();
  let index = 0;
  const step = () => {
    const chordId = pattern.steps[index];
    selectChord(chordId);
    node.classed("pattern-active", (d) => d.id === chordId);
    index += 1;
    if (index < pattern.steps.length) {
      patternTimer = window.setTimeout(step, 850);
    }
  };
  step();
}

function clearPatternTimer() {
  if (patternTimer) {
    window.clearTimeout(patternTimer);
    patternTimer = null;
  }
  node?.classed("pattern-active", false);
}
