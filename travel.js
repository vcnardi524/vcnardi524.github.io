// Places I've been, grouped by country.
// id = ISO 3166 numeric code, used to shade the country on the map.
// Each place: [name, longitude, latitude, photos?, extra?]
// Photos are [path inside photos/ without .jpg, caption].
const COUNTRIES = [
  { name: "United States", id: "840", places: [
    ["California", -119.70, 34.42, null, { label: "California (school, in Santa Barbara)", home: true }],
    ["Colorado", -104.99, 39.74, null, { label: "Colorado (home)", home: true }],
    ["Arizona", -111.93, 34.17], ["New Mexico", -106.0, 34.5], ["Nevada", -116.6, 39.3],
    ["Utah", -111.7, 39.3], ["Wyoming", -107.5, 43.0], ["Washington", -120.5, 47.4],
    ["Oregon", -120.6, 43.9], ["South Dakota", -100.2, 44.4], ["North Dakota", -100.5, 47.5],
    ["New York", -74.0, 40.71], ["New Jersey", -74.5, 40.1], ["Connecticut", -72.7, 41.6],
    ["Pennsylvania", -77.6, 40.9], ["Washington, D.C.", -77.04, 38.91], ["Tennessee", -86.3, 35.86],
    ["Louisiana", -91.9, 31.0], ["Florida", -81.7, 28.1],
  ]},
  { name: "Panama", id: "591",
    note: "Four years with Engineers Without Borders, building water infrastructure for a remote community.",
    places: [["Bocas del Toro", -82.25, 9.34]] },
  { name: "Barbados", id: "052", places: [["Barbados", -59.55, 13.17]] },
  { name: "United Kingdom", id: "826", places: [["London", -0.13, 51.51], ["Oxford", -1.26, 51.75]] },
  { name: "Ireland", id: "372", places: [["Dublin", -6.26, 53.35]] },
  { name: "Spain", id: "724", places: [["Barcelona", 2.17, 41.39]] },
  { name: "Netherlands", id: "528", places: [
    ["Amsterdam", 4.90, 52.37], ["The Hague", 4.30, 52.08], ["Voorschoten", 4.45, 52.13],
    ["Utrecht", 5.12, 52.09], ["Friesland", 5.80, 53.10], ["Sloten", 5.65, 52.90],
    ["Heusden", 5.14, 51.73], ["'s-Hertogenbosch", 5.30, 51.69], ["Best", 5.39, 51.51],
    ["Eindhoven", 5.47, 51.44], ["Zeeland", 3.85, 51.50], ["Maastricht", 5.69, 50.85],
  ]},
  { name: "Belgium", id: "056", places: [
    ["Brussels", 4.35, 50.85, [["misc/piano_livia", "Piano competition in Brussels with my sister"]]],
    ["Antwerp", 4.40, 51.22], ["Bruges", 3.22, 51.21], ["Turnhout", 4.95, 51.32], ["Ravels", 4.99, 51.37],
  ]},
  { name: "France", id: "250", places: [
    ["Paris", 2.35, 48.86, [
      ["world/0", "Paris from the top of the Arc de Triomphe"],
      ["world/1", "The Eiffel Tower at dusk"],
    ]],
    ["Normandy", -0.40, 49.18], ["Mont-Saint-Michel", -1.51, 48.64], ["Alsace", 7.45, 48.30],
    ["Burgundy", 4.80, 47.05], ["Dijon", 5.04, 47.32], ["Autun", 4.30, 46.95],
    ["Nice", 7.26, 43.70], ["Èze", 7.36, 43.73], ["Antibes", 7.13, 43.58],
    ["Cannes", 7.01, 43.55], ["Saint-Tropez", 6.64, 43.27],
  ]},
  { name: "Monaco", id: "492", places: [["Monaco", 7.42, 43.74]] },
  { name: "Switzerland", id: "756", places: [
    ["Interlaken", 7.86, 46.69, [["world/12", "Lake Brienz, near Interlaken"]]],
  ]},
  { name: "Germany", id: "276", places: [
    ["Aachen", 6.08, 50.78], ["Düsseldorf", 6.77, 51.23], ["Neuschwanstein Castle", 10.75, 47.56],
  ]},
  { name: "Austria", id: "040", places: [
    ["Vienna", 16.37, 48.21], ["Heiligenstadt", 16.36, 48.25], ["Eisenstadt", 16.52, 47.85], ["Salzburg", 13.04, 47.81],
  ]},
  { name: "Czech Republic", id: "203", places: [["Prague", 14.42, 50.08]] },
  { name: "Denmark", id: "208", places: [["Copenhagen", 12.57, 55.68]] },
  { name: "Sweden", id: "752", places: [["Lund", 13.19, 55.70], ["Malmö", 13.00, 55.60]] },
  { name: "Italy", id: "380", places: [
    ["Bologna", 11.34, 44.49, [
      ["italy/2", "The Two Towers"],
      ["italy/13", "Bologna's porticoes"],
      ["italy/12", "The canal at Via Piella"],
      ["italy/11", "Afternoon in the old town"],
      ["italy/10", "Domes over the rooftops"],
      ["italy/9", "Basilica di San Petronio"],
      ["italy/1", "The hills outside the city"],
    ]],
    ["Ravenna", 12.20, 44.42, [["italy/0", "Basilica of San Vitale"]]],
    ["Adriatic coast", 12.57, 44.06, [
      ["italy/3", "Morning on the Adriatic"],
      ["italy/5", "Sunset on the Adriatic"],
    ]],
    ["Florence", 11.26, 43.77, [["italy/4", "The Duomo"]]],
    ["Venice", 12.33, 45.44], ["Lake Garda", 10.68, 45.60], ["Madonna di Campiglio", 10.83, 46.23],
    ["Portofino", 9.21, 44.30], ["Pisa", 10.40, 43.72], ["Viterbo", 12.10, 42.42],
    ["Tarquinia", 11.76, 42.25], ["Rome", 12.50, 41.90],
  ]},
  { name: "San Marino", id: "674", places: [
    ["San Marino", 12.45, 43.94, [
      ["italy/7", "San Marino countryside from the towers"],
      ["italy/6", "Looking down from Monte Titano"],
      ["italy/8", "Basilica di San Marino"],
    ]],
  ]},
  { name: "Greece", id: "300", places: [["Athens", 23.73, 37.98], ["Santorini", 25.43, 36.39], ["Corfu", 19.92, 39.62]] },
  { name: "Japan", id: "392", places: [
    ["Tokyo", 139.69, 35.69, [
      ["japan/9", "Tokyo Tower at night"],
      ["japan/7", "Sensō-ji in the rain"],
      ["japan/8", "Skytree from Asakusa"],
      ["japan/6", "Cherry blossom crowds"],
      ["japan/5", "Cherry blossoms on the water"],
      ["japan/0", "Akihabara at night"],
      ["japan/3", "A rainy shopping street"],
      ["japan/4", "Market streets"],
    ]],
    ["Kyoto", 135.77, 35.01, [
      ["japan/1", "Kinkaku-ji"],
      ["japan/2", "Cherry blossoms in Kyoto"],
      ["japan/10", "Boats in Arashiyama"],
      ["japan/11", "Bridge in Kyoto"],
    ]],
    ["Hiroshima", 132.46, 34.39],
  ]},
  { name: "South Korea", id: "410", places: [
    ["Seoul", 126.98, 37.57, [
      ["korea/1", "N Seoul Tower"],
      ["korea/4", "A palace at night"],
      ["korea/11", "Palace rooftops"],
      ["korea/12", "Palace grounds in winter"],
      ["korea/3", "Street food"],
      ["korea/14", "Sunset traffic"],
      ["korea/13", "A neighborhood street"],
      ["korea/0", "Hillside streets"],
      ["korea/2", "A winter walk"],
    ]],
    ["Jeju", 126.53, 33.38, [
      ["korea/7", "Jeju harbor and fishing boats"],
      ["korea/6", "Light over the islands"],
      ["korea/5", "The coast at dusk"],
      ["korea/10", "Waves off Jeju"],
      ["korea/8", "Korean barbecue"],
      ["korea/9", "A spicy stew"],
    ]],
  ]},
  { name: "China", id: "156", places: [["Beijing", 116.41, 39.90], ["Xi'an", 108.94, 34.34], ["Shanghai", 121.47, 31.23]] },
  { name: "Hong Kong", id: "344", places: [
    ["Hong Kong", 114.17, 22.32, [
      ["world/2", "Evening from Victoria Peak"],
      ["world/3", "Ten Thousand Buddhas Monastery"],
    ]],
  ]},
  { name: "Taiwan", id: "158", places: [["Taipei", 121.56, 25.03], ["Jiufen", 121.84, 25.11]] },
  { name: "Vietnam", id: "704", places: [["Hanoi", 105.85, 21.03], ["Cat Ba", 107.05, 20.73]] },
  { name: "Thailand", id: "764", places: [
    ["Bangkok", 100.50, 13.75, [
      ["world/4", "The Grand Palace"],
      ["world/5", "The gardens at Wat Pho"],
    ]],
    ["Ayutthaya", 100.57, 14.35, [
      ["world/6", "Ruins at sunset"],
      ["world/7", "An old temple and chedi"],
    ]],
    ["Phuket", 98.39, 7.88],
  ]},
  { name: "Singapore", id: "702", places: [
    ["Singapore", 103.82, 1.35, [["world/8", "The Cloud Forest at Gardens by the Bay"]]],
  ]},
  { name: "Indonesia", id: "360", places: [
    ["Bali", 115.19, -8.41, [
      ["world/9", "Tegallalang rice terraces"],
      ["world/10", "Mount Batur"],
      ["world/11", "Pura Ulun Danu Beratan"],
    ]],
  ]},
];

(function () {
  // Flatten into place objects that know their country.
  const PLACES = [];
  for (const c of COUNTRIES) {
    c.places = c.places.map(([name, lon, lat, photos, extra]) => {
      const p = { name, coords: [lon, lat], photos: photos || [], country: c, ...(extra || {}) };
      PLACES.push(p);
      return p;
    });
    c.photos = c.places.flatMap((p) => p.photos);
  }
  const byId = new Map(COUNTRIES.map((c) => [c.id, c]));

  const svg = d3.select("#map");
  const W = 960, H = 520;
  const projection = d3.geoNaturalEarth1().scale(180).translate([W / 2, H / 2 + 25]);
  const path = d3.geoPath(projection);
  const g = svg.append("g");
  const tip = document.querySelector(".tip");
  const panel = document.getElementById("place");
  const list = document.querySelector(".places");
  let k = 1, activePlace = null, activeCountry = null;

  const zoom = d3.zoom()
    .scaleExtent([1, 60])
    .translateExtent([[0, 0], [W, H]])
    .filter((e) => e.type !== "wheel" && !e.button)
    .on("zoom", (e) => {
      k = e.transform.k;
      g.attr("transform", e.transform);
      g.selectAll(".dot").attr("r", radius).attr("stroke-width", 1.2 / k);
    });
  svg.call(zoom);

  function radius(p) {
    const base = p === activePlace ? 6 : p.home ? 4 : 3.6;
    return base / Math.pow(k, 0.8);
  }

  d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json")
    .then((world) => {
      const shapes = topojson.feature(world, world.objects.countries).features.filter((f) => f.id !== "010");
      g.append("g").selectAll("path")
        .data(shapes).join("path")
        .attr("class", (f) => "country" + (byId.has(f.id) ? " visited" : ""))
        .attr("d", path)
        .on("click", (e, f) => { if (byId.has(f.id)) selectCountry(byId.get(f.id)); });
    })
    .catch(() => {}) // if the map fails to load, the country list still works
    .finally(() => { drawDots(); fromHash(); });

  function drawDots() {
    g.append("g").selectAll("circle")
      .data(PLACES).join("circle")
      .attr("class", (p) => "dot" + (p.home ? " home" : ""))
      .attr("cx", (p) => projection(p.coords)[0])
      .attr("cy", (p) => projection(p.coords)[1])
      .attr("r", radius)
      .attr("stroke-width", 1.2)
      .attr("tabindex", 0)
      .attr("role", "button")
      .attr("aria-label", (p) => p.name)
      .on("mouseenter", showTip)
      .on("mouseleave", () => (tip.style.opacity = 0))
      .on("click", (e, p) => { e.stopPropagation(); selectPlace(p); })
      .on("keydown", (e, p) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectPlace(p); } });
  }

  function showTip(e, p) {
    const box = svg.node().getBoundingClientRect();
    const wrap = svg.node().parentNode.getBoundingClientRect();
    const [x, y] = d3.pointer(e, svg.node());
    tip.textContent = p.label || p.name;
    tip.style.left = (x / W) * box.width + (box.left - wrap.left) + "px";
    tip.style.top = (y / H) * box.height + (box.top - wrap.top) + "px";
    tip.style.opacity = 1;
  }

  function flyTo(points, maxScale) {
    const xy = points.map((p) => projection(p.coords));
    const [x0, x1] = d3.extent(xy, (d) => d[0]);
    const [y0, y1] = d3.extent(xy, (d) => d[1]);
    const s = Math.min(maxScale, 0.6 / Math.max((x1 - x0) / W, (y1 - y0) / H, 0.01));
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    svg.transition().duration(800).call(
      zoom.transform,
      d3.zoomIdentity.translate(W / 2 - cx * s, H / 2 - cy * s).scale(s)
    );
  }

  function selectCountry(c, place = null) {
    activeCountry = c;
    activePlace = place;
    g.selectAll(".dot").classed("active", (p) => p === place).attr("r", radius);
    g.selectAll(".dot").filter((p) => p === place).raise();
    g.selectAll(".country").classed("selected", (f) => f.id === c.id);
    list.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.c === c.name));

    const many = c.places.length > 1;
    const chips = many
      ? '<div class="places in-panel">' + c.places.map((p) =>
          `<button data-p="${p.name}" aria-pressed="${p === place}">${p.name}${p.photos.length ? ' <span class="cam">●</span>' : ""}</button>`
        ).join("") + "</div>"
      : "";
    const photos = place ? place.photos : c.photos;
    const heading = place && many ? `<h4>${place.name}</h4>` : "";
    const empty = place && !photos.length ? '<p class="meta">No photos from here yet.</p>' : "";
    panel.innerHTML =
      `<div class="row"><h3>${c.name}</h3><span class="meta">${many ? c.places.length + " places" : ""}</span></div>` +
      (c.note ? `<p>${c.note}</p>` : "") + chips + heading + empty +
      (photos.length ? photoGrid(photos) : "");

    if (place) flyTo([place], Math.max(k, many ? 12 : 6));
    else flyTo(c.places, many ? 30 : 6);
    history.replaceState(null, "", "#" + encodeURIComponent(place && many ? place.name : c.name));
  }
  function selectPlace(p) { selectCountry(p.country, p); }

  panel.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-p]");
    if (!b) return;
    const p = activeCountry.places.find((x) => x.name === b.dataset.p);
    if (p === activePlace) selectCountry(activeCountry); // tap again to see the whole country
    else selectPlace(p);
  });

  // Country list.
  list.innerHTML = COUNTRIES.map((c) =>
    `<button data-c="${c.name}" aria-pressed="false">${c.name}</button>`).join("");
  list.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) selectCountry(COUNTRIES.find((c) => c.name === b.dataset.c));
  });

  document.querySelector(".zoom-in").onclick = () => svg.transition().call(zoom.scaleBy, 2);
  document.querySelector(".zoom-out").onclick = () => svg.transition().call(zoom.scaleBy, 0.5);
  document.querySelector(".zoom-reset").onclick = () => svg.transition().duration(700).call(zoom.transform, d3.zoomIdentity);

  document.getElementById("count").textContent = `${PLACES.length} places in ${COUNTRIES.length} countries`;

  // Link straight to a place or country, e.g. travel.html#Kyoto or travel.html#Italy
  function fromHash() {
    const name = decodeURIComponent(location.hash.slice(1));
    const c = COUNTRIES.find((x) => x.name === name);
    if (c) return selectCountry(c);
    const p = PLACES.find((x) => x.name === name);
    if (p) selectPlace(p);
  }
})();
