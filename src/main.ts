import "./style.css";
import { fetchRandomCat } from "./api";
import { icons } from "./icons";
import type { CatData } from "./types";

let isLoading = false;

const app = document.getElementById("app")!;

function renderSkeleton(): string {
  return `
    <div class="max-w-5xl mx-auto px-4 py-10 relative z-10 animate-fade-in">
      <!-- Header -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center gap-2 mb-3">
          <span class="text-[var(--gold)]">${icons.paw}</span>
          <span class="skeleton h-4 w-28 rounded inline-block"></span>
        </div>
        <div class="skeleton h-10 w-72 mx-auto rounded-lg mb-3"></div>
        <div class="skeleton h-4 w-48 mx-auto rounded"></div>
      </div>
      <!-- Main grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="skeleton rounded-2xl" style="height:420px;"></div>
        <div class="space-y-4">
          <div class="skeleton h-6 w-3/4 rounded"></div>
          <div class="skeleton h-4 w-full rounded"></div>
          <div class="skeleton h-4 w-5/6 rounded"></div>
          <div class="skeleton h-4 w-4/5 rounded"></div>
          <div class="skeleton h-24 w-full rounded-xl mt-4"></div>
          <div class="skeleton h-24 w-full rounded-xl"></div>
        </div>
      </div>
    </div>
  `;
}

function renderError(msg: string): string {
  return `
    <div class="max-w-5xl mx-auto px-4 py-10 relative z-10 animate-fade-in">
      <div class="text-center mb-10">
        <div class="inline-flex items-center gap-2 mb-2 text-[var(--gold)]">
          ${icons.paw}
          <span class="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">Feline Gallery</span>
        </div>
        <h1 class="font-display text-4xl font-bold text-[var(--cream)]">Random Cat Viewer</h1>
      </div>
      <div class="flex flex-col items-center justify-center gap-4 py-20">
        <div class="w-16 h-16 rounded-full flex items-center justify-center bg-red-950/50 border border-red-800/40 text-red-400">
          ${icons.alertCircle}
        </div>
        <p class="font-body text-[var(--muted)] text-sm">${msg}</p>
        <button id="retry-btn" class="btn-primary">
          <span class="flex items-center gap-2">${icons.refresh} Try Again</span>
        </button>
      </div>
    </div>
  `;
}

function traitBar(label: string, value: number, max = 5): string {
  const pct = Math.round((value / max) * 100);
  return `
    <div class="flex items-center gap-3">
      <span class="font-body text-xs text-[var(--muted)] w-32 shrink-0">${label}</span>
      <div class="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
        <div class="trait-bar-fill" style="width:${pct}%"></div>
      </div>
      <span class="font-mono text-xs text-[var(--gold)] w-4 text-right">${value}</span>
    </div>
  `;
}

function badge(
  icon: string,
  label: string,
  value: boolean | string | number,
): string {
  const active = value === true || value === "1" || value === 1;
  const color = active ? "text-emerald-400" : "text-[var(--muted)]";
  const checkIcon = active ? icons.check : icons.x;
  return `
    <div class="stat-card">
      <div class="flex items-center gap-1.5 text-[var(--muted)] text-xs">
        <span>${icon}</span>
        <span class="font-body">${label}</span>
      </div>
      <div class="flex items-center gap-1 ${color} text-xs font-medium">
        ${checkIcon}
        <span>${active ? "Yes" : "No"}</span>
      </div>
    </div>
  `;
}

function renderCat(cat: CatData): string {
  const traits = [
    { label: "Adaptability", value: cat.adaptability },
    { label: "Affection", value: cat.affection_level },
    { label: "Child Friendly", value: cat.child_friendly },
    { label: "Dog Friendly", value: cat.dog_friendly },
    { label: "Energy Level", value: cat.energy_level },
    { label: "Intelligence", value: cat.intelligence },
    { label: "Grooming", value: cat.grooming },
    { label: "Shedding", value: cat.shedding_level },
    { label: "Social Needs", value: cat.social_needs },
    { label: "Stranger Friendly", value: cat.stranger_friendly },
    { label: "Vocalisation", value: cat.vocalisation },
  ];

  const temperamentTags = cat.temperament
    .split(",")
    .map((t) => `<span class="tag">${t.trim()}</span>`)
    .join("");

  const altNames = cat.alt_names
    ? `<span class="tag text-[var(--muted)]">${cat.alt_names}</span>`
    : "";

  return `
    <div class="max-w-5xl mx-auto px-4 py-10 relative z-10 animate-fade-in">

      <!-- Header -->
      <div class="text-center mb-10 animate-slide-up">
        <div class="inline-flex items-center gap-2 mb-3">
          <span class="text-[var(--gold)]">${icons.paw}</span>
          <span class="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">Feline Gallery</span>
        </div>
        <h1 class="font-display text-4xl md:text-5xl font-bold text-[var(--cream)] leading-tight">
          Random Cat Viewer
        </h1>
        <p class="text-[var(--muted)] text-sm mt-2 font-body">Discover feline companions from around the world</p>
      </div>

      <!-- Main Card -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">

        <!-- Image Column -->
        <div class="lg:col-span-2 animate-scale-in">
          <div class="image-frame">
            <img
              src="${cat.image}"
              alt="${cat.name}"
              class="w-full object-cover"
              style="height: 420px;"
              onerror="this.src='https://placehold.co/600x420/182018/c9a84c?text=No+Image'"
            />
            <!-- Overlay text -->
            <div class="absolute bottom-0 left-0 right-0 z-10 p-5">
              <h2 class="font-display text-2xl font-bold text-white">${cat.name}</h2>
              <div class="flex items-center gap-2 mt-1 flex-wrap">
                <span class="tag">${icons.globe} ${cat.origin}</span>
                ${altNames}
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-2 gap-3 mt-3">
            <div class="stat-card">
              <div class="flex items-center gap-1.5 text-[var(--muted)] text-xs">
                ${icons.clock}
                <span class="font-body">Life Span</span>
              </div>
              <span class="font-display text-[var(--gold)] text-base font-semibold">${cat.life_span} yrs</span>
            </div>
            <div class="stat-card">
              <div class="flex items-center gap-1.5 text-[var(--muted)] text-xs">
                ${icons.weight}
                <span class="font-body">Weight</span>
              </div>
              <span class="font-display text-[var(--gold)] text-base font-semibold">${cat.weight.metric} kg</span>
            </div>
          </div>
        </div>

        <!-- Info Column -->
        <div class="lg:col-span-3 flex flex-col gap-5">

          <!-- Description -->
          <div class="rounded-2xl border p-5" style="background:rgba(255,255,255,0.02);border-color:var(--border);">
            <p class="font-body text-[var(--muted)] leading-relaxed text-sm">${cat.description}</p>
          </div>

          <!-- Temperament -->
          <div class="rounded-2xl border p-5" style="background:rgba(255,255,255,0.02);border-color:var(--border);">
            <h3 class="font-display text-sm font-semibold text-[var(--gold)] mb-3 uppercase tracking-wider">Temperament</h3>
            <div class="flex flex-wrap gap-2">${temperamentTags}</div>
          </div>

          <!-- Trait Bars -->
          <div class="rounded-2xl border p-5 flex-1" style="background:rgba(255,255,255,0.02);border-color:var(--border);">
            <h3 class="font-display text-sm font-semibold text-[var(--gold)] mb-4 uppercase tracking-wider">Characteristics</h3>
            <div class="space-y-3">
              ${traits.map((t) => traitBar(t.label, t.value)).join("")}
            </div>
          </div>
        </div>
      </div>

      <!-- Badges Row -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 animate-slide-up" style="animation-delay:0.15s">
        ${badge(icons.home, "Indoor", cat.indoor)}
        ${badge(icons.heart, "Lap Cat", cat.lap)}
        ${badge(icons.star, "Hypoallergenic", cat.hypoallergenic)}
        ${badge(icons.paw, "Rare Breed", cat.rare)}
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style="animation-delay:0.2s">
        <button id="fetch-btn" class="btn-primary flex items-center gap-2">
          ${icons.refresh}
          <span>Next Cat</span>
        </button>
        ${
          cat.wikipedia_url
            ? `
        <a
          href="${cat.wikipedia_url}"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 font-body text-sm text-[var(--muted)] hover:text-[var(--gold)] transition-colors duration-200"
        >
          ${icons.link}
          <span>View on Wikipedia</span>
        </a>`
            : ""
        }
      </div>

      <!-- Footer -->
      <div class="text-center mt-12 text-[var(--muted)] text-xs font-mono opacity-50">
        Powered by FreeAPI &bull; The Cat API
      </div>
    </div>
  `;
}

async function loadCat(): Promise<void> {
  if (isLoading) return;
  isLoading = true;

  app.innerHTML = renderSkeleton();

  try {
    const response = await fetchRandomCat();
    app.innerHTML = renderCat(response.data);

    // Wire button after render
    const btn = document.getElementById("fetch-btn");
    if (btn) btn.addEventListener("click", loadCat);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Something went wrong.";
    app.innerHTML = renderError(msg);

    const retryBtn = document.getElementById("retry-btn");
    if (retryBtn) retryBtn.addEventListener("click", loadCat);
  } finally {
    isLoading = false;
  }
}

loadCat();
