import { useState, useEffect, useRef } from "react";

// ─── Inject Google Fonts ───────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap";
document.head.appendChild(fontLink);

const faLink = document.createElement("link");
faLink.rel = "stylesheet";
faLink.href =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
document.head.appendChild(faLink);

// ─── Data ──────────────────────────────────────────────────────────────────
const CREATORS = [
  { id: 1, name: "Aria M.", handle: "@aria_m", avatar: "https://picsum.photos/seed/c1/80/80", cover: "https://picsum.photos/seed/c1bg/600/200", verified: true, subscribers: "24.1K", price: "9.99", tag: "🔥 Trending", online: true },
  { id: 2, name: "Lena K.", handle: "@lena_k", avatar: "https://picsum.photos/seed/c2/80/80", cover: "https://picsum.photos/seed/c2bg/600/200", verified: false, subscribers: "8.3K", price: "Free", tag: "⭐ New", online: false },
  { id: 3, name: "Zoe V.", handle: "@zoe_v", avatar: "https://picsum.photos/seed/c3/80/80", cover: "https://picsum.photos/seed/c3bg/600/200", verified: true, subscribers: "51.7K", price: "14.99", tag: "💎 Top", online: true },
  { id: 4, name: "Mia R.", handle: "@mia_r", avatar: "https://picsum.photos/seed/c4/80/80", cover: "https://picsum.photos/seed/c4bg/600/200", verified: true, subscribers: "18.9K", price: "6.99", tag: "🔥 Hot", online: true },
  { id: 5, name: "Jade T.", handle: "@jade_t", avatar: "https://picsum.photos/seed/c5/80/80", cover: "https://picsum.photos/seed/c5bg/600/200", verified: false, subscribers: "3.1K", price: "Free", tag: "🌟 Rising", online: false },
  { id: 6, name: "Vera S.", handle: "@vera_s", avatar: "https://picsum.photos/seed/c6/80/80", cover: "https://picsum.photos/seed/c6bg/600/200", verified: true, subscribers: "97.2K", price: "24.99", tag: "👑 Elite", online: true },
];

const STORIES = [
  { id: 1, name: "Aria", avatar: "https://picsum.photos/seed/s1/60/60", new: true },
  { id: 2, name: "Lena", avatar: "https://picsum.photos/seed/s2/60/60", new: true },
  { id: 3, name: "Zoe", avatar: "https://picsum.photos/seed/s3/60/60", new: false },
  { id: 4, name: "Mia", avatar: "https://picsum.photos/seed/s4/60/60", new: true },
  { id: 5, name: "Jade", avatar: "https://picsum.photos/seed/s5/60/60", new: false },
  { id: 6, name: "Vera", avatar: "https://picsum.photos/seed/s6/60/60", new: true },
  { id: 7, name: "Nova", avatar: "https://picsum.photos/seed/s7/60/60", new: false },
];

const FEED_POSTS = [
  { id: 1, creator: "Aria M.", handle: "@aria_m", avatar: "https://picsum.photos/seed/c1/80/80", time: "2h ago", text: "New exclusive content just dropped for my VIP subscribers 🔥✨", img: "https://picsum.photos/seed/p1/600/400", likes: 1842, comments: 93, tips: 212, locked: false },
  { id: 2, creator: "Zoe V.", handle: "@zoe_v", avatar: "https://picsum.photos/seed/c3/80/80", time: "4h ago", text: "Behind the scenes from today's photoshoot 📸 Who wants to see more?", img: "https://picsum.photos/seed/p2/600/420", likes: 3201, comments: 147, tips: 441, locked: true },
  { id: 3, creator: "Vera S.", handle: "@vera_s", avatar: "https://picsum.photos/seed/c6/80/80", time: "6h ago", text: "Good morning everyone 💋 Starting the week with good vibes only", img: "https://picsum.photos/seed/p3/600/380", likes: 5430, comments: 298, tips: 876, locked: false },
  { id: 4, creator: "Mia R.", handle: "@mia_r", avatar: "https://picsum.photos/seed/c4/80/80", time: "9h ago", text: "Special surprise for all subscribers this week 👀🎁", img: "https://picsum.photos/seed/p4/600/410", likes: 2104, comments: 115, tips: 330, locked: true },
];

const SUGGESTED = [
  { id: 1, name: "Nova X.", handle: "@nova_x", avatar: "https://picsum.photos/seed/sg1/60/60", price: "Free" },
  { id: 2, name: "Isla F.", handle: "@isla_f", avatar: "https://picsum.photos/seed/sg2/60/60", price: "$7.99" },
  { id: 3, name: "Cleo D.", handle: "@cleo_d", avatar: "https://picsum.photos/seed/sg3/60/60", price: "$12.99" },
  { id: 4, name: "Demi W.", handle: "@demi_w", avatar: "https://picsum.photos/seed/sg4/60/60", price: "Free" },
];

// ─── Styles ────────────────────────────────────────────────────────────────
const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:       #0c0c0e;
    --surface:  #141416;
    --surface2: #1c1c1f;
    --border:   rgba(255,255,255,0.07);
    --accent:   #e8305a;
    --accent2:  #ff6b8a;
    --gold:     #f5c842;
    --teal:     #00e5c3;
    --text:     #f0f0f0;
    --muted:    #888;
    --radius:   14px;
    --sidebar-w: 240px;
    --right-w:  280px;
    --font:     'DM Sans', sans-serif;
    --font-h:   'Syne', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font);
    font-size: 15px;
    line-height: 1.5;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── Layout ── */
  .app {
    display: flex;
    min-height: 100vh;
  }

  /* ── Sidebar ── */
  .sidebar {
    width: var(--sidebar-w);
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 0 0 24px;
    position: fixed;
    top: 0; left: 0;
    height: 100vh;
    z-index: 100;
    transition: transform .3s cubic-bezier(.4,0,.2,1);
    overflow-y: auto;
  }
  .sidebar::-webkit-scrollbar { width: 0; }

  .sidebar-logo {
    padding: 22px 24px 20px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 12px;
  }
  .logo-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, var(--accent), #b5225a);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }
  .logo-text {
    font-family: var(--font-h);
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -.3px;
    color: var(--text);
  }
  .logo-text span { color: var(--accent); }

  .nav-section {
    padding: 0 12px;
    flex: 1;
  }
  .nav-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    padding: 8px 12px 6px;
  }
  .nav-item {
    display: flex; align-items: center; gap: 13px;
    padding: 11px 12px;
    border-radius: 10px;
    cursor: pointer;
    color: var(--muted);
    font-size: 14px;
    font-weight: 500;
    transition: all .18s;
    position: relative;
    user-select: none;
  }
  .nav-item:hover, .nav-item.active {
    background: rgba(232,48,90,0.1);
    color: var(--text);
  }
  .nav-item.active { color: var(--accent); }
  .nav-item i { width: 18px; text-align: center; font-size: 15px; }
  .nav-badge {
    margin-left: auto;
    background: var(--accent);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 20px;
    min-width: 20px;
    text-align: center;
  }

  .sidebar-user {
    margin: 12px;
    padding: 14px;
    background: var(--surface2);
    border-radius: var(--radius);
    display: flex; align-items: center; gap: 10px;
    cursor: pointer;
    transition: background .18s;
  }
  .sidebar-user:hover { background: rgba(255,255,255,0.06); }
  .sidebar-user img {
    width: 38px; height: 38px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--accent);
  }
  .sidebar-user-info { flex: 1; min-width: 0; }
  .sidebar-user-name {
    font-size: 13px; font-weight: 600;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .sidebar-user-handle {
    font-size: 11px; color: var(--muted);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  /* ── Main ── */
  .main {
    flex: 1;
    margin-left: var(--sidebar-w);
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  /* ── Header ── */
  .header {
    position: sticky; top: 0; z-index: 90;
    background: rgba(12,12,14,0.88);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--border);
    padding: 0 24px;
    height: 62px;
    display: flex; align-items: center; gap: 16px;
  }
  .header-search {
    flex: 1; max-width: 460px;
    position: relative;
  }
  .header-search i {
    position: absolute; left: 14px; top: 50%;
    transform: translateY(-50%);
    color: var(--muted); font-size: 13px;
  }
  .header-search input {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 40px;
    padding: 9px 16px 9px 38px;
    color: var(--text);
    font-family: var(--font);
    font-size: 14px;
    outline: none;
    transition: border .18s, box-shadow .18s;
  }
  .header-search input::placeholder { color: var(--muted); }
  .header-search input:focus {
    border-color: rgba(232,48,90,0.5);
    box-shadow: 0 0 0 3px rgba(232,48,90,0.1);
  }

  .header-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
  .header-btn {
    width: 38px; height: 38px;
    border-radius: 50%;
    border: none;
    background: var(--surface2);
    color: var(--muted);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
    transition: all .18s;
    position: relative;
  }
  .header-btn:hover { background: var(--surface); color: var(--text); }
  .header-btn .dot {
    position: absolute; top: 7px; right: 7px;
    width: 7px; height: 7px;
    background: var(--accent);
    border-radius: 50%;
    border: 1.5px solid var(--bg);
  }
  .header-avatar {
    width: 36px; height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--accent);
    cursor: pointer;
  }

  .mobile-menu-btn {
    display: none;
    width: 38px; height: 38px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface2);
    color: var(--text);
    cursor: pointer;
    align-items: center; justify-content: center;
    font-size: 16px;
  }

  /* ── Feed area ── */
  .feed-wrap {
    display: flex;
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 24px 24px 40px;
    gap: 28px;
    align-items: flex-start;
  }

  /* ── Center feed ── */
  .center-feed {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* ── Stories ── */
  .stories-bar {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 16px;
    display: flex;
    gap: 14px;
    overflow-x: auto;
  }
  .stories-bar::-webkit-scrollbar { height: 0; }
  .story-item {
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    cursor: pointer;
    flex-shrink: 0;
    transition: transform .18s;
  }
  .story-item:hover { transform: scale(1.06); }
  .story-ring {
    width: 58px; height: 58px;
    border-radius: 50%;
    padding: 2.5px;
    background: var(--surface2);
  }
  .story-ring.new-story {
    background: linear-gradient(135deg, var(--accent), var(--gold));
  }
  .story-ring img {
    width: 100%; height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2.5px solid var(--surface);
    display: block;
  }
  .story-name {
    font-size: 11px;
    color: var(--muted);
    text-align: center;
    max-width: 60px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  /* ── Tabs ── */
  .feed-tabs {
    display: flex; gap: 4px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 5px;
  }
  .feed-tab {
    flex: 1;
    padding: 9px 14px;
    border-radius: 9px;
    border: none;
    background: none;
    color: var(--muted);
    font-family: var(--font);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all .18s;
    white-space: nowrap;
  }
  .feed-tab.active {
    background: var(--accent);
    color: #fff;
    box-shadow: 0 4px 16px rgba(232,48,90,0.35);
  }
  .feed-tab:not(.active):hover { color: var(--text); background: var(--surface2); }

  /* ── Post card ── */
  .post-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    transition: border-color .18s, box-shadow .18s;
    animation: fadeUp .4s ease both;
  }
  .post-card:hover {
    border-color: rgba(232,48,90,0.3);
    box-shadow: 0 8px 40px rgba(0,0,0,0.35);
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .post-header {
    display: flex; align-items: center; gap: 12px;
    padding: 16px 16px 12px;
  }
  .post-avatar {
    width: 44px; height: 44px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--accent);
    flex-shrink: 0;
  }
  .post-meta { flex: 1; }
  .post-name {
    font-size: 14px; font-weight: 700;
    display: flex; align-items: center; gap: 6px;
  }
  .verified-badge {
    display: inline-flex; align-items: center; justify-content: center;
    width: 16px; height: 16px;
    background: var(--teal);
    border-radius: 50%;
    font-size: 9px;
    color: #000;
    flex-shrink: 0;
  }
  .post-sub { font-size: 12px; color: var(--muted); display: flex; gap: 8px; align-items: center; }
  .post-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--muted); }

  .post-menu-btn {
    width: 32px; height: 32px;
    border-radius: 8px;
    border: none;
    background: none;
    color: var(--muted);
    cursor: pointer;
    font-size: 15px;
    display: flex; align-items: center; justify-content: center;
    transition: all .15s;
  }
  .post-menu-btn:hover { background: var(--surface2); color: var(--text); }

  .post-text {
    padding: 0 16px 14px;
    font-size: 14px;
    line-height: 1.6;
    color: rgba(240,240,240,0.88);
  }

  .post-media { position: relative; }
  .post-media img {
    width: 100%;
    display: block;
    max-height: 480px;
    object-fit: cover;
  }
  .post-media .locked-overlay {
    position: absolute; inset: 0;
    background: rgba(10,10,12,0.72);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 14px;
  }
  .locked-overlay i { font-size: 32px; color: var(--gold); }
  .locked-overlay p { font-size: 14px; color: rgba(255,255,255,0.7); }
  .unlock-btn {
    padding: 10px 28px;
    background: linear-gradient(135deg, var(--accent), #c0234f);
    border: none;
    border-radius: 40px;
    color: #fff;
    font-family: var(--font);
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: transform .15s, box-shadow .15s;
    box-shadow: 0 4px 20px rgba(232,48,90,0.45);
  }
  .unlock-btn:hover { transform: scale(1.04); box-shadow: 0 6px 28px rgba(232,48,90,0.55); }

  .post-actions {
    display: flex; align-items: center; gap: 6px;
    padding: 14px 16px 16px;
    border-top: 1px solid var(--border);
  }
  .action-btn {
    display: flex; align-items: center; gap: 7px;
    padding: 8px 14px;
    border-radius: 40px;
    border: none;
    background: var(--surface2);
    color: var(--muted);
    font-family: var(--font);
    font-size: 13px;
    cursor: pointer;
    transition: all .18s;
    user-select: none;
  }
  .action-btn:hover { background: rgba(232,48,90,0.12); color: var(--accent); }
  .action-btn.liked { color: var(--accent); background: rgba(232,48,90,0.12); }
  .action-btn i { font-size: 14px; }
  .tip-btn {
    margin-left: auto;
    background: rgba(245,200,66,0.1);
    color: var(--gold);
  }
  .tip-btn:hover { background: rgba(245,200,66,0.2); color: var(--gold); }

  /* ── Creator Cards Grid ── */
  .section-title {
    font-family: var(--font-h);
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -.2px;
    margin-bottom: 14px;
    display: flex; align-items: center; gap: 10px;
  }
  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .creators-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 14px;
  }

  .creator-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    cursor: pointer;
    transition: all .22s;
    animation: fadeUp .4s ease both;
  }
  .creator-card:hover {
    transform: translateY(-4px);
    border-color: rgba(232,48,90,0.35);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
  }
  .creator-card-cover {
    height: 90px;
    position: relative;
    overflow: hidden;
  }
  .creator-card-cover img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform .4s;
  }
  .creator-card:hover .creator-card-cover img { transform: scale(1.06); }
  .creator-tag {
    position: absolute; top: 8px; left: 8px;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(6px);
    border-radius: 20px;
    padding: 3px 9px;
    font-size: 11px;
    font-weight: 600;
  }
  .online-dot {
    position: absolute; top: 8px; right: 8px;
    width: 9px; height: 9px;
    background: #3edc8c;
    border-radius: 50%;
    border: 2px solid var(--surface);
    box-shadow: 0 0 6px #3edc8c;
  }
  .creator-body { padding: 12px; }
  .creator-avatar-wrap {
    margin-top: -26px;
    margin-bottom: 8px;
    position: relative;
    width: fit-content;
  }
  .creator-avatar {
    width: 48px; height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--surface);
  }
  .creator-verify {
    position: absolute; bottom: 0; right: -2px;
    width: 18px; height: 18px;
    background: var(--teal);
    border-radius: 50%;
    border: 2px solid var(--surface);
    display: flex; align-items: center; justify-content: center;
    font-size: 8px;
    color: #000;
  }
  .creator-name {
    font-size: 14px; font-weight: 700;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .creator-handle { font-size: 11px; color: var(--muted); margin-bottom: 8px; }
  .creator-stats {
    display: flex; gap: 8px;
    font-size: 11px; color: var(--muted);
    margin-bottom: 10px;
  }
  .creator-sub-btn {
    width: 100%;
    padding: 9px;
    background: linear-gradient(135deg, var(--accent), #c0234f);
    border: none;
    border-radius: 8px;
    color: #fff;
    font-family: var(--font);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: opacity .15s, transform .15s;
    box-shadow: 0 3px 14px rgba(232,48,90,0.35);
  }
  .creator-sub-btn:hover { opacity: 0.9; transform: scale(1.02); }
  .creator-sub-btn.free {
    background: var(--surface2);
    color: var(--teal);
    box-shadow: none;
  }

  /* ── Right panel ── */
  .right-panel {
    width: var(--right-w);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: sticky;
    top: 86px;
    max-height: calc(100vh - 110px);
    overflow-y: auto;
  }
  .right-panel::-webkit-scrollbar { width: 0; }

  .panel-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 18px;
  }
  .panel-title {
    font-family: var(--font-h);
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 14px;
    letter-spacing: -.1px;
  }

  .suggest-item {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    transition: opacity .15s;
  }
  .suggest-item:last-child { border-bottom: none; padding-bottom: 0; }
  .suggest-item:hover { opacity: 0.8; }
  .suggest-avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--surface2);
    flex-shrink: 0;
  }
  .suggest-meta { flex: 1; min-width: 0; }
  .suggest-name { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .suggest-handle { font-size: 11px; color: var(--muted); }
  .suggest-price {
    font-size: 11px;
    font-weight: 700;
    padding: 3px 9px;
    border-radius: 20px;
    background: rgba(232,48,90,0.12);
    color: var(--accent);
    white-space: nowrap;
  }
  .suggest-price.free-price { background: rgba(0,229,195,0.1); color: var(--teal); }

  .stats-card { display: flex; flex-direction: column; gap: 12px; }
  .stat-row {
    display: flex; justify-content: space-between; align-items: center;
  }
  .stat-label { font-size: 13px; color: var(--muted); display: flex; align-items: center; gap: 7px; }
  .stat-value { font-size: 13px; font-weight: 700; }
  .stat-bar-wrap {
    height: 3px;
    background: var(--surface2);
    border-radius: 2px;
    overflow: hidden;
    margin-top: 5px;
  }
  .stat-bar {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--accent), var(--gold));
    transition: width 1s ease;
  }

  .promo-card {
    background: linear-gradient(135deg, rgba(232,48,90,0.15), rgba(181,34,90,0.08));
    border: 1px solid rgba(232,48,90,0.25);
  }
  .promo-title {
    font-family: var(--font-h);
    font-size: 15px; font-weight: 800;
    margin-bottom: 6px;
  }
  .promo-sub { font-size: 12px; color: rgba(240,240,240,0.6); margin-bottom: 14px; line-height: 1.5; }
  .promo-btn {
    width: 100%;
    padding: 11px;
    background: linear-gradient(135deg, var(--accent), #c0234f);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-family: var(--font);
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: opacity .15s;
  }
  .promo-btn:hover { opacity: 0.9; }

  /* ── Toast ── */
  .toast {
    position: fixed; bottom: 28px; left: 50%;
    transform: translateX(-50%) translateY(0);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 40px;
    padding: 12px 22px;
    font-size: 13px;
    font-weight: 500;
    display: flex; align-items: center; gap: 9px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.5);
    z-index: 9999;
    animation: toastIn .25s ease;
    white-space: nowrap;
  }
  .toast i { color: var(--accent); }
  @keyframes toastIn {
    from { opacity: 0; transform: translateX(-50%) translateY(12px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }

  /* ── Mobile overlay ── */
  .sidebar-overlay {
    display: none;
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.55);
    z-index: 99;
  }

  /* ── Responsive ── */
  @media (max-width: 1100px) {
    :root { --right-w: 240px; }
  }
  @media (max-width: 920px) {
    .right-panel { display: none; }
    .feed-wrap { padding: 16px; }
  }
  @media (max-width: 700px) {
    :root { --sidebar-w: 0px; }
    .sidebar {
      width: 260px;
      transform: translateX(-100%);
      box-shadow: 4px 0 30px rgba(0,0,0,0.5);
    }
    .sidebar.open { transform: translateX(0); }
    .sidebar-overlay.open { display: block; }
    .main { margin-left: 0; }
    .mobile-menu-btn { display: flex; }
    .header { padding: 0 16px; }
    .feed-wrap { padding: 12px 12px 32px; }
    .creators-grid { grid-template-columns: repeat(2, 1fr); }
    .header-search { max-width: none; }
    .feed-tab { padding: 8px 10px; font-size: 12px; }
  }
  @media (max-width: 420px) {
    .creators-grid { grid-template-columns: 1fr 1fr; }
    .post-actions { gap: 4px; }
    .action-btn { padding: 7px 10px; font-size: 12px; }
  }
`;

// ─── Component ─────────────────────────────────────────────────────────────
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [activeTab, setActiveTab] = useState("For You");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [subscribedCreators, setSubscribedCreators] = useState({});
  const toastTimer = useRef(null);

  // Inject styles once
  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = css;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  const notify = (msg) => {
    clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  };

  const toggleLike = (postId, e) => {
    e.stopPropagation();
    setLikedPosts((p) => ({ ...p, [postId]: !p[postId] }));
    if (!likedPosts[postId]) notify("❤️ Post liked!");
  };

  const toggleSub = (creatorId, name, price) => {
    setSubscribedCreators((p) => ({ ...p, [creatorId]: !p[creatorId] }));
    if (!subscribedCreators[creatorId]) {
      notify(price === "Free" ? `🎉 Subscribed to ${name} for free!` : `💳 Subscribed to ${name} for ${price}/mo`);
    } else {
      notify(`Unsubscribed from ${name}`);
    }
  };

  const tabs = ["For You", "Subscriptions", "Trending", "New"];

  const filteredCreators = CREATORS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.handle.toLowerCase().includes(search.toLowerCase())
  );

  const navItems = [
    { icon: "fa-house", label: "Home", badge: null },
    { icon: "fa-fire", label: "Trending", badge: "99+" },
    { icon: "fa-magnifying-glass", label: "Explore", badge: null },
    { icon: "fa-bookmark", label: "Saved", badge: "3" },
    { icon: "fa-message", label: "Messages", badge: "12" },
    { icon: "fa-bell", label: "Notifications", badge: "5" },
    { icon: "fa-wallet", label: "Wallet", badge: null },
    { icon: "fa-gear", label: "Settings", badge: null },
  ];

  return (
    <div className="app">
      {/* Sidebar overlay (mobile) */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── Sidebar ── */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">✦</div>
          <div className="logo-text">Hot<span>Girl</span>4xxx</div>
        </div>

        <div className="nav-section">
          <div className="nav-label">Menu</div>
          {navItems.slice(0, 6).map((item) => (
            <div
              key={item.label}
              className={`nav-item ${activeNav === item.label ? "active" : ""}`}
              onClick={() => { setActiveNav(item.label); setSidebarOpen(false); notify(`📁 ${item.label}`); }}
            >
              <i className={`fas ${item.icon}`} />
              {item.label}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </div>
          ))}
          <div className="nav-label" style={{ marginTop: 10 }}>Account</div>
          {navItems.slice(6).map((item) => (
            <div
              key={item.label}
              className={`nav-item ${activeNav === item.label ? "active" : ""}`}
              onClick={() => { setActiveNav(item.label); setSidebarOpen(false); notify(`📁 ${item.label}`); }}
            >
              <i className={`fas ${item.icon}`} />
              {item.label}
            </div>
          ))}
        </div>

        <div className="sidebar-user" onClick={() => notify("👤 Profile page (démo)")}>
          <img src="https://picsum.photos/seed/me/80/80" alt="Me" />
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">You</div>
            <div className="sidebar-user-handle">@yourhandle</div>
          </div>
          <i className="fas fa-ellipsis" style={{ color: "var(--muted)", fontSize: 13 }} />
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="main">
        {/* Header */}
        <header className="header">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <i className="fas fa-bars" />
          </button>

          <div className="header-search">
            <i className="fas fa-magnifying-glass" />
            <input
              type="text"
              placeholder="Search creators, content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="header-actions">
            <button className="header-btn" onClick={() => notify("🔔 3 new notifications")}>
              <i className="fas fa-bell" />
              <span className="dot" />
            </button>
            <button className="header-btn" onClick={() => notify("💬 12 new messages")}>
              <i className="fas fa-message" />
              <span className="dot" />
            </button>
            <img
              className="header-avatar"
              src="https://picsum.photos/seed/me/80/80"
              alt="Profile"
              onClick={() => notify("👤 Your profile")}
            />
          </div>
        </header>

        {/* Feed */}
        <div className="feed-wrap">
          {/* Center */}
          <div className="center-feed">
            {/* Stories */}
            <div className="stories-bar">
              {STORIES.map((s) => (
                <div
                  key={s.id}
                  className="story-item"
                  onClick={() => notify(`👁️ Viewing ${s.name}'s story`)}
                >
                  <div className={`story-ring ${s.new ? "new-story" : ""}`}>
                    <img src={s.avatar} alt={s.name} />
                  </div>
                  <span className="story-name">{s.name}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="feed-tabs">
              {tabs.map((t) => (
                <button
                  key={t}
                  className={`feed-tab ${activeTab === t ? "active" : ""}`}
                  onClick={() => setActiveTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Posts */}
            {FEED_POSTS.map((post, i) => (
              <div
                key={post.id}
                className="post-card"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="post-header">
                  <img className="post-avatar" src={post.avatar} alt={post.creator} />
                  <div className="post-meta">
                    <div className="post-name">
                      {post.creator}
                      <span className="verified-badge"><i className="fas fa-check" /></span>
                    </div>
                    <div className="post-sub">
                      <span>{post.handle}</span>
                      <span className="post-dot" />
                      <span>{post.time}</span>
                    </div>
                  </div>
                  <button className="post-menu-btn" onClick={() => notify("⚙️ Post options")}>
                    <i className="fas fa-ellipsis" />
                  </button>
                </div>

                <div className="post-text">{post.text}</div>

                <div className="post-media">
                  <img src={post.img} alt="post" />
                  {post.locked && (
                    <div className="locked-overlay">
                      <i className="fas fa-lock" />
                      <p>Subscribe to unlock this content</p>
                      <button
                        className="unlock-btn"
                        onClick={() => notify(`🔓 Unlocking ${post.creator}'s content...`)}
                      >
                        <i className="fas fa-crown" style={{ marginRight: 6 }} />
                        Subscribe Now
                      </button>
                    </div>
                  )}
                </div>

                <div className="post-actions">
                  <button
                    className={`action-btn ${likedPosts[post.id] ? "liked" : ""}`}
                    onClick={(e) => toggleLike(post.id, e)}
                  >
                    <i className={`fa${likedPosts[post.id] ? "s" : "r"} fa-heart`} />
                    {likedPosts[post.id] ? post.likes + 1 : post.likes}
                  </button>
                  <button className="action-btn" onClick={() => notify("💬 Opening comments...")}>
                    <i className="far fa-comment" />
                    {post.comments}
                  </button>
                  <button className="action-btn" onClick={() => notify("📤 Share link copied!")}>
                    <i className="fas fa-share-nodes" />
                  </button>
                  <button className="action-btn tip-btn" onClick={() => notify(`💰 Tipping ${post.creator}...`)}>
                    <i className="fas fa-dollar-sign" />
                    Tip · {post.tips}
                  </button>
                </div>
              </div>
            ))}

            {/* Creators Grid */}
            <div className="section-title">Featured Creators</div>
            <div className="creators-grid">
              {filteredCreators.map((c, i) => (
                <div
                  key={c.id}
                  className="creator-card"
                  style={{ animationDelay: `${i * 0.05}s` }}
                  onClick={() => notify(`✨ Viewing ${c.name}'s profile`)}
                >
                  <div className="creator-card-cover">
                    <img src={c.cover} alt={c.name} />
                    <span className="creator-tag">{c.tag}</span>
                    {c.online && <span className="online-dot" />}
                  </div>
                  <div className="creator-body">
                    <div className="creator-avatar-wrap">
                      <img className="creator-avatar" src={c.avatar} alt={c.name} />
                      {c.verified && (
                        <span className="creator-verify"><i className="fas fa-check" /></span>
                      )}
                    </div>
                    <div className="creator-name">{c.name}</div>
                    <div className="creator-handle">{c.handle}</div>
                    <div className="creator-stats">
                      <span>👥 {c.subscribers}</span>
                    </div>
                    <button
                      className={`creator-sub-btn ${c.price === "Free" ? "free" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSub(c.id, c.name, c.price);
                      }}
                    >
                      {subscribedCreators[c.id]
                        ? "✓ Subscribed"
                        : c.price === "Free"
                        ? "Subscribe Free"
                        : `Subscribe · $${c.price}/mo`}
                    </button>
                  </div>
                </div>
              ))}
              {filteredCreators.length === 0 && (
                <div style={{ gridColumn: "1/-1", textAlign: "center", color: "var(--muted)", padding: "28px 0" }}>
                  No creators found for "{search}"
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <aside className="right-panel">
            {/* Promo */}
            <div className="panel-card promo-card">
              <div className="promo-title">👑 Go Premium</div>
              <div className="promo-sub">Unlock all exclusive content and get priority access to your favorite creators.</div>
              <button className="promo-btn" onClick={() => notify("💎 Premium page coming soon!")}>
                Upgrade Now · $9.99/mo
              </button>
            </div>

            {/* Suggested */}
            <div className="panel-card">
              <div className="panel-title">Suggested for You</div>
              {SUGGESTED.map((s) => (
                <div
                  key={s.id}
                  className="suggest-item"
                  onClick={() => notify(`✨ Viewing ${s.name}'s profile`)}
                >
                  <img className="suggest-avatar" src={s.avatar} alt={s.name} />
                  <div className="suggest-meta">
                    <div className="suggest-name">{s.name}</div>
                    <div className="suggest-handle">{s.handle}</div>
                  </div>
                  <span className={`suggest-price ${s.price === "Free" ? "free-price" : ""}`}>
                    {s.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Platform Stats */}
            <div className="panel-card">
              <div className="panel-title">Platform Stats</div>
              <div className="stats-card">
                {[
                  { label: "🔥 Active Creators", value: "12,500", pct: "78" },
                  { label: "⭐ Avg Rating", value: "4.9 / 5", pct: "98" },
                  { label: "🚀 New This Week", value: "340", pct: "55" },
                  { label: "💬 Messages Today", value: "1.2M", pct: "91" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="stat-row">
                      <span className="stat-label">{s.label}</span>
                      <span className="stat-value">{s.value}</span>
                    </div>
                    <div className="stat-bar-wrap">
                      <div className="stat-bar" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast">
          <i className="fas fa-circle-check" />
          {toast}
        </div>
      )}
    </div>
  );
}
