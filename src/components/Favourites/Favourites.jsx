import { useEffect, useRef, useState } from "react";
import "./Favourites.css";

// Photos: public/photos/ folder mein file naam same rakho (ya "Upload Photo" button use karo).
// Har person ki general information yahin data mein hai: roles, born, place, debut, about, known.
const CATEGORIES = [
  { id: "actor", label: "Favourite Actor", noun: "actor", tone: "sun", icon: "clapper", people: [
    {
      name: "Shah Rukh Khan", photo: "/photos/shah-rukh-khan.jpg",
      roles: ["Actor", "Film Producer"], born: "2 November 1965", place: "New Delhi, India", debut: "Deewana (1992)",
      about: "Nicknamed \"King Khan\" and the \"Badshah of Bollywood\", he is one of the most successful stars of Indian cinema.",
      known: ["Dilwale Dulhania Le Jayenge", "Chak De! India", "Pathaan", "Kolkata Knight Riders (Co-owner)"],
    },
    {
      name: "Amitabh Bachchan", photo: "/photos/amitabh-bachchan.jpg",
      roles: ["Actor", "TV Host", "Playback Singer"], born: "11 October 1942", place: "Allahabad (now Prayagraj), India", debut: "Saat Hindustani (1969)",
      about: "Known as the \"Angry Young Man\" of the 1970s, he has acted in hundreds of films over more than five decades.",
      known: ["Zanjeer", "Sholay", "Kaun Banega Crorepati host", "Padma Vibhushan (2015)"],
    },
    {
      name: "Hrithik Roshan", photo: "/photos/hrithik-roshan.jpg",
      roles: ["Actor", "Dancer"], born: "10 January 1974", place: "Mumbai, India", debut: "Kaho Naa... Pyaar Hai (2000)",
      about: "Famous for his dancing and action roles, he won the Filmfare awards for Best Actor and Best Debut for his first lead film.",
      known: ["Koi... Mil Gaya", "Krrish series", "Zindagi Na Milegi Dobara", "War"],
    },
    {
      name: "Ranveer Singh", photo: "/photos/ranveer-singh.jpg",
      roles: ["Actor"], born: "6 July 1985", place: "Mumbai, India", debut: "Band Baaja Baaraat (2010)",
      about: "Known for his high-energy style and bold choice of roles, from historical epics to street rapper stories.",
      known: ["Bajirao Mastani", "Padmaavat", "Gully Boy", "83 (as Kapil Dev)"],
    },
  ] },
  { id: "actress", label: "Favourite Actress", noun: "actress", tone: "rose", icon: "star", people: [
    {
      name: "Deepika Padukone", photo: "/photos/deepika-padukone.jpg",
      roles: ["Actress", "Producer"], born: "5 January 1986", place: "Copenhagen, Denmark", debut: "Om Shanti Om (2007)",
      about: "Raised in Bengaluru and daughter of badminton great Prakash Padukone, she is also known for her work on mental health awareness.",
      known: ["Chennai Express", "Piku", "Padmaavat", "Live Love Laugh Foundation"],
    },
    {
      name: "Alia Bhatt", photo: "/photos/alia-bhatt.jpg",
      roles: ["Actress", "Producer"], born: "15 March 1993", place: "Mumbai, India", debut: "Student of the Year (2012)",
      about: "She is praised for her range in both mainstream and serious films, and won the National Film Award for Best Actress for Gangubai Kathiawadi.",
      known: ["Highway", "Raazi", "Gully Boy", "Gangubai Kathiawadi"],
    },
    {
      name: "Madhuri Dixit", photo: "/photos/madhuri-dixit.jpg",
      roles: ["Actress", "Dancer"], born: "15 May 1967", place: "Mumbai, India", debut: "Abodh (1984)",
      about: "Called the \"Dhak Dhak Girl\", she is admired for her classical dance skills and was a leading star of Hindi cinema in the 1990s.",
      known: ["Tezaab", "Hum Aapke Hain Koun..!", "Dil To Pagal Hai", "Padma Shri (2008)"],
    },
    {
      name: "Katrina Kaif", photo: "/photos/katrina-kaif.jpg",
      roles: ["Actress", "Entrepreneur"], born: "16 July 1983", place: "Hong Kong", debut: "Boom (2003)",
      about: "A British-Indian actress who became a top Bollywood star, she also founded the beauty brand Kay Beauty.",
      known: ["Namastey London", "Zindagi Na Milegi Dobara", "Dhoom 3", "Tiger film series"],
    },
  ] },
  { id: "cricketer", label: "Favourite Cricketer", noun: "cricketer", tone: "mint", icon: "ball", people: [
    {
      name: "Virat Kohli", photo: "/photos/virat-kohli.jpg",
      roles: ["Right-handed Batter"], born: "5 November 1988", place: "Delhi, India", debut: "ODI debut in 2008",
      about: "A former India captain known for his aggressive style and chasing skills, he holds the record for the most ODI centuries.",
      known: ["2011 World Cup winner", "2024 T20 World Cup winner", "Khel Ratna (2018)", "RCB in the IPL"],
    },
    {
      name: "MS Dhoni", photo: "/photos/ms-dhoni.jpg",
      roles: ["Wicketkeeper", "Batter"], born: "7 July 1981", place: "Ranchi, Jharkhand, India", debut: "ODI debut in 2004",
      about: "Nicknamed \"Captain Cool\", he is the only captain to win all three major ICC white-ball trophies.",
      known: ["2007 T20 World Cup", "2011 World Cup", "2013 Champions Trophy", "5 IPL titles with CSK"],
    },
    {
      name: "Sachin Tendulkar", photo: "/photos/sachin-tendulkar.jpg",
      roles: ["Right-handed Batter"], born: "24 April 1973", place: "Mumbai, India", debut: "Test debut in 1989 (aged 16)",
      about: "Known as the \"Master Blaster\" and the \"God of Cricket\", he played international cricket for 24 years.",
      known: ["100 international centuries", "200 Test matches", "2011 World Cup winner", "Bharat Ratna (2014)"],
    },
    {
      name: "Rohit Sharma", photo: "/photos/rohit-sharma.jpg",
      roles: ["Opening Batter"], born: "30 April 1987", place: "Nagpur, Maharashtra, India", debut: "ODI debut in 2007",
      about: "Nicknamed the \"Hitman\" for his big hitting, he holds the highest individual score in ODI cricket and has three ODI double centuries.",
      known: ["264 in an ODI", "5 IPL titles with Mumbai Indians", "2024 T20 World Cup", "Khel Ratna (2020)"],
    },
  ] },
];

/* ---------- Icons (line icons, colour = currentColor) ---------- */
const ICON_PATHS = {
  heart: (
    <path
      d="M12 20.5s-7.8-4.7-9.6-9.6C1.2 7.6 3.3 4.5 6.6 4.5c2.1 0 3.8 1.2 5.4 3.2 1.6-2 3.3-3.2 5.4-3.2 3.3 0 5.4 3.1 4.2 6.4-1.8 4.9-9.6 9.6-9.6 9.6z"
      fill="#ff7aa8"
    />
  ),
  clapper: (
    <>
      <rect x="3" y="10" width="18" height="11" rx="2" />
      <path d="M3 10l1.2-4.8 15.6 3.2L19.5 10" />
      <path d="M8 6.4L7 10.3M13 7.5L12 10.5M18 8.4L17 10.6" />
    </>
  ),
  star: <path d="M12 3.2l2.7 5.5 6 .9-4.4 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6L3.3 9.6l6-.9z" />,
  ball: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M6.2 5.8c3.4 3 3.4 9.4 0 12.4M17.8 5.8c-3.4 3-3.4 9.4 0 12.4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.1 7-11.4A7 7 0 0 0 5 9.6C5 14.9 12 21 12 21z" />
      <circle cx="12" cy="9.6" r="2.4" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3.2l1.6-2.4h6.4L16.8 8H20v11H4z" />
      <circle cx="12" cy="13.3" r="3.4" />
    </>
  ),
  upload: <path d="M12 16V4M7.5 8.5L12 4l4.5 4.5M4 20h16" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.4-4.4" />
    </>
  ),
  "chevron-down": <path d="M6 9l6 6 6-6" />,
  "chevron-right": <path d="M9 6l6 6-6 6" />,
  "chevron-left": <path d="M15 6l-6 6 6 6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
};

function Icon({ name, size = 22, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

const initials = (name) =>
  name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

function Photo({ src, name }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="fav-fallback">
        <span>{initials(name)}</span>
        <small>Photo not added yet</small>
      </div>
    );
  }
  return <img className="fav-img" src={src} alt={name} onError={() => setFailed(true)} />;
}

/* ---------- Searchable dropdown ("Search actor...") ---------- */
function Combo({ id, noun, people, value, onSelect }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);

  const q = query.trim().toLowerCase();
  const results = people.filter((p) => p.name.toLowerCase().includes(q));
  const listId = `${id}-list`;

  // Bahar click karne par list band
  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [isOpen]);

  const choose = (p) => {
    onSelect(p.name);
    setQuery("");
    setIsOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (isOpen && results[active]) {
        e.preventDefault();
        choose(results[active]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="fav-combo" ref={wrapRef}>
      <Icon name="search" size={22} className="fav-combo-search" />
      <input
        id={id}
        className="fav-combo-input"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={isOpen && results[active] ? `${id}-opt-${active}` : undefined}
        autoComplete="off"
        value={query}
        placeholder={`Search ${noun}...`}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={onKeyDown}
      />
      <button
        type="button"
        className="fav-combo-toggle"
        tabIndex={-1}
        aria-label={`Show ${noun} list`}
        onClick={() => setIsOpen((o) => !o)}
      >
        <Icon name="chevron-down" size={22} />
      </button>

      {isOpen && (
        <ul id={listId} role="listbox" className="fav-combo-list" aria-label={`${noun} list`}>
          {results.length === 0 && <li className="fav-combo-empty">No {noun} found</li>}
          {results.map((p, i) => (
            <li
              key={p.name}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={p.name === value}
              className={"fav-combo-opt" + (i === active ? " is-active" : "") + (p.name === value ? " is-selected" : "")}
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(p)}
            >
              {p.name}
              {p.name === value && <span aria-hidden="true">✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- Ek category ka accordion section ---------- */
function FavSection({
  cat, index, total, isOpen, picked, uploads, selectedCount,
  sectionRef, onToggle, onGo, onPick, onUpload, onRemove,
}) {
  const person = cat.people.find((p) => p.name === picked);
  const upload = person ? uploads[person.name] : null;
  const src = person ? upload || person.photo : null;
  const fileRef = useRef(null);
  const headId = `fav-head-${cat.id}`;
  const bodyId = `fav-body-${cat.id}`;

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (file && person) onUpload(person.name, file);
    e.target.value = "";
  };
  const chooseFile = () => fileRef.current?.click();

  return (
    <section ref={sectionRef} className={`fav-acc fav-acc--${cat.tone}`}>
      <div className="fav-acc-head">
        <button
          type="button"
          id={headId}
          className="fav-acc-toggle"
          aria-expanded={isOpen}
          aria-controls={bodyId}
          onClick={onToggle}
        >
          <span className="fav-acc-icon"><Icon name={cat.icon} size={34} /></span>
          <span className="fav-acc-title">{cat.label}</span>
          {!isOpen && (
            <>
              <span className="fav-acc-status">{person ? person.name : "Select a favourite"}</span>
              <Icon name="chevron-right" size={24} />
            </>
          )}
        </button>

        {isOpen && (
          <div className="fav-nav">
            <span className="fav-count">{selectedCount} of {total} selected</span>
            <button
              type="button"
              className="fav-arrow"
              aria-label="Previous category"
              disabled={index === 0}
              onClick={() => onGo(index - 1)}
            >
              <Icon name="chevron-left" size={22} />
            </button>
            <button
              type="button"
              className="fav-arrow"
              aria-label="Next category"
              disabled={index === total - 1}
              onClick={() => onGo(index + 1)}
            >
              <Icon name="chevron-right" size={22} />
            </button>
          </div>
        )}
      </div>

      {isOpen && (
        <div id={bodyId} role="region" aria-labelledby={headId} className="fav-acc-body">
          {/* Left: photo + name */}
          <div className="fav-profile">
            <div className="fav-photo">
              {person ? (
                <Photo key={src} src={src} name={person.name} />
              ) : (
                <div className="fav-photo-empty">
                  <Icon name={cat.icon} size={56} />
                  <span>No favourite yet</span>
                </div>
              )}
              {person && (
                <button type="button" className="fav-change" onClick={chooseFile}>
                  <Icon name="camera" size={18} />
                  Change Photo
                </button>
              )}
            </div>
            <h2 className="fav-name">{person ? person.name : `Pick your ${cat.noun}`}</h2>
            <p className="fav-roles">{person ? person.roles.join(" · ") : "Use the search box to choose"}</p>
          </div>

          {/* Right: facts, about, chips, tools */}
          <div className="fav-detail" aria-live="polite">
            <ul className="fav-facts">
              <li className="fav-fact">
                <Icon name="calendar" size={30} />
                <div><span className="fav-fact-label">Born</span><span className="fav-fact-value">{person ? person.born : "—"}</span></div>
              </li>
              <li className="fav-fact">
                <Icon name="pin" size={30} />
                <div><span className="fav-fact-label">Birthplace</span><span className="fav-fact-value">{person ? person.place : "—"}</span></div>
              </li>
              <li className="fav-fact">
                <Icon name="star" size={30} />
                <div><span className="fav-fact-label">Debut</span><span className="fav-fact-value">{person ? person.debut : "—"}</span></div>
              </li>
            </ul>

            <p className="fav-about">
              {person ? person.about : `Select a ${cat.noun} to see their profile.`}
            </p>

            {person && (
              <div key={person.name} className="fav-popular">
                <h3 className="fav-sub">Popular For</h3>
                <ul className="fav-chips">
                  {person.known.map((k) => (
                    <li key={k} className="fav-chip">{k}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="fav-tools">
              <div className="fav-tool fav-tool--search">
                <label className="fav-field-label" htmlFor={`${cat.id}-search`}>Search or select a favourite</label>
                <Combo
                  id={`${cat.id}-search`}
                  noun={cat.noun}
                  people={cat.people}
                  value={picked}
                  onSelect={onPick}
                />
              </div>

              <div className="fav-tool fav-tool--photo">
                <span className="fav-field-label">Your Photo</span>
                <div className="fav-photo-row">
                  <div className="fav-thumb">
                    {person ? (
                      <>
                        <div className="fav-thumb-img"><Photo key={src} src={src} name={person.name} /></div>
                        {upload && (
                          <button
                            type="button"
                            className="fav-thumb-x"
                            aria-label="Remove my photo"
                            onClick={() => onRemove(person.name)}
                          >
                            <Icon name="close" size={12} />
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="fav-thumb-empty" aria-hidden="true">—</div>
                    )}
                  </div>
                  <button type="button" className="fav-upload" disabled={!person} onClick={chooseFile}>
                    <Icon name="upload" size={20} />
                    {upload ? "Replace Photo" : "Upload Photo"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="visually-hidden"
            tabIndex={-1}
            aria-hidden="true"
            onChange={onFile}
          />
        </div>
      )}
    </section>
  );
}

/* ---------- Page ---------- */
export default function Favourites() {
  const [open, setOpen] = useState(CATEGORIES[0].id); // ek time par ek section khula
  const [picked, setPicked] = useState({});           // { actor: "Shah Rukh Khan", ... }
  const [uploads, setUploads] = useState({});         // { "Shah Rukh Khan": blob url }
  const sectionRefs = useRef({});
  const prevOpen = useRef(open);

  const selectedCount = CATEGORIES.filter((c) => picked[c.id]).length;

  // Section badalne par use screen par le aao
  useEffect(() => {
    if (prevOpen.current === open) return;
    prevOpen.current = open;
    if (!open) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    sectionRefs.current[open]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
  }, [open]);

  const goTo = (i) => setOpen(CATEGORIES[i].id);
  const toggle = (id) => setOpen((cur) => (cur === id ? null : id));

  const onPick = (catId) => (name) => setPicked((p) => ({ ...p, [catId]: name }));

  const onUpload = (name, file) => {
    const url = URL.createObjectURL(file);
    if (uploads[name]) URL.revokeObjectURL(uploads[name]);
    setUploads((prev) => ({ ...prev, [name]: url }));
  };
  const onRemove = (name) => {
    if (uploads[name]) URL.revokeObjectURL(uploads[name]);
    setUploads((prev) => {
      const { [name]: _gone, ...rest } = prev;
      return rest;
    });
  };

  return (
    <div className="fav-app">
      <header className="fav-hero">
        <div className="fav-hero-top">
          <span className="fav-orb"><Icon name="heart" size={40} /></span>
          <div>
            <h1 className="fav-hero-title">My Favourites</h1>
            <p className="fav-hero-sub">Choose your favourite people and explore their profiles.</p>
          </div>
          <div className="fav-hero-deco" aria-hidden="true">
            <svg width="30" height="64" viewBox="0 0 30 64" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
              <path d="M22 8L10 16M28 32H14M22 56L10 48" />
            </svg>
            <span className="fav-orb fav-orb--sm"><Icon name="heart" size={32} /></span>
          </div>
        </div>

        <div className="fav-tabs" role="group" aria-label="Choose a category">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`fav-tab fav-tab--${c.tone}` + (open === c.id ? " is-active" : "")}
              aria-pressed={open === c.id}
              onClick={() => setOpen(c.id)}
            >
              <Icon name={c.icon} size={26} />
              {c.id === "actor" ? "Actor" : c.id === "actress" ? "Actress" : "Cricketer"}
            </button>
          ))}
        </div>
      </header>

      {CATEGORIES.map((cat, i) => (
        <FavSection
          key={cat.id}
          cat={cat}
          index={i}
          total={CATEGORIES.length}
          isOpen={open === cat.id}
          picked={picked[cat.id] || ""}
          uploads={uploads}
          selectedCount={selectedCount}
          sectionRef={(el) => { sectionRefs.current[cat.id] = el; }}
          onToggle={() => toggle(cat.id)}
          onGo={goTo}
          onPick={onPick(cat.id)}
          onUpload={onUpload}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}