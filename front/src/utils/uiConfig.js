
import { theme } from "antd";

export const brand = {
  seed: "#71e8a1",
  primary: "#2fbd74",
  primaryDark: "#238d58",
  secondary: "#0f6b78",
  secondaryDark: "#083f49",
  accent: "#f5b84b",
  danger: "#e74c3c",
  success: "#27ae60",
  info: "#2980b9",
};

export const themeModes = {
  light: {
    name: "light",
    appBg: "#f6faf8",
    surface: "#ffffff",
    surfaceMuted: "#eef8f2",
    text: "#12251c",
    textMuted: "#60756b",
    border: "rgba(47,189,116,0.16)",
    sidebarBg: "#07342b",
    headerBg: "#07342b",
    contentBg: "#f6faf8",
  },
  dark: {
    name: "dark",
    appBg: "#071411",
    surface: "#0d1f1a",
    surfaceMuted: "#102d25",
    text: "#e8fff1",
    textMuted: "#9ab7aa",
    border: "rgba(113,232,161,0.18)",
    sidebarBg: "#061b18",
    headerBg: "#061b18",
    contentBg: "#071411",
  },
};

export const getTheme = (mode = "light") =>
  themeModes[mode] ?? themeModes.light;

export const getAntdTheme = (mode = "light") => {
  const selectedTheme = getTheme(mode);

  return {
    algorithm:
      selectedTheme.name === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: brand.primary,
      colorSuccess: brand.success,
      colorInfo: brand.secondary,
      colorWarning: brand.accent,
      colorError: brand.danger,
      colorBgBase: selectedTheme.appBg,
      colorBgContainer: selectedTheme.surface,
      colorText: selectedTheme.text,
      colorTextSecondary: selectedTheme.textMuted,
      colorBorder: selectedTheme.border,
      borderRadius: 8,
      fontFamily: "'Outfit', sans-serif",
    },
    components: {
      Button: {
        primaryShadow: "0 8px 22px rgba(47,189,116,0.28)",
      },
      Layout: {
        bodyBg: selectedTheme.contentBg,
        headerBg: selectedTheme.headerBg,
        siderBg: selectedTheme.sidebarBg,
      },
      Menu: {
        darkItemBg: selectedTheme.sidebarBg,
        darkItemSelectedBg: "rgba(113,232,161,0.14)",
        darkItemHoverBg: "rgba(113,232,161,0.1)",
        darkItemColor: "rgba(255,255,255,0.76)",
        darkItemSelectedColor: brand.seed,
      },
    },
  };
};

export const themeCssVariables = `
  :root,
  [data-theme="light"] {
    --timlink-seed: ${brand.seed};
    --timlink-primary: ${brand.primary};
    --timlink-primary-dark: ${brand.primaryDark};
    --timlink-secondary: ${brand.secondary};
    --timlink-secondary-dark: ${brand.secondaryDark};
    --timlink-accent: ${brand.accent};
    --timlink-danger: ${brand.danger};
    --timlink-bg: ${themeModes.light.appBg};
    --timlink-surface: ${themeModes.light.surface};
    --timlink-surface-muted: ${themeModes.light.surfaceMuted};
    --timlink-text: ${themeModes.light.text};
    --timlink-text-muted: ${themeModes.light.textMuted};
    --timlink-border: ${themeModes.light.border};
    --timlink-sidebar-bg: ${themeModes.light.sidebarBg};
    --timlink-header-bg: ${themeModes.light.headerBg};
    --timlink-content-bg: ${themeModes.light.contentBg};
  }

  [data-theme="dark"] {
    --timlink-bg: ${themeModes.dark.appBg};
    --timlink-surface: ${themeModes.dark.surface};
    --timlink-surface-muted: ${themeModes.dark.surfaceMuted};
    --timlink-text: ${themeModes.dark.text};
    --timlink-text-muted: ${themeModes.dark.textMuted};
    --timlink-border: ${themeModes.dark.border};
    --timlink-sidebar-bg: ${themeModes.dark.sidebarBg};
    --timlink-header-bg: ${themeModes.dark.headerBg};
    --timlink-content-bg: ${themeModes.dark.contentBg};
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --timlink-bg: ${themeModes.dark.appBg};
      --timlink-surface: ${themeModes.dark.surface};
      --timlink-surface-muted: ${themeModes.dark.surfaceMuted};
      --timlink-text: ${themeModes.dark.text};
      --timlink-text-muted: ${themeModes.dark.textMuted};
      --timlink-border: ${themeModes.dark.border};
      --timlink-sidebar-bg: ${themeModes.dark.sidebarBg};
      --timlink-header-bg: ${themeModes.dark.headerBg};
      --timlink-content-bg: ${themeModes.dark.contentBg};
    }
  }
`;

export const sidebarBg = themeModes.light.sidebarBg;
export const primary = brand.primary;
export const primaryGlow = "rgba(47,189,116,0.35)";
export const primaryDim = "rgba(47,189,116,0.12)";
export const primaryMid = "rgba(47,189,116,0.25)";
export const accent = brand.accent;
export const accentDim = "rgba(245,184,75,0.12)";
export const accentMid = "rgba(245,184,75,0.25)";
export const green = brand.success;
export const greenDim = "rgba(39,174,96,0.1)";
export const blue = brand.info;
export const blueDim = "rgba(41,128,185,0.1)";
export const dark = themeModes.light.sidebarBg;

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
  ${themeCssVariables}

  html,
  body,
  #root,
  [data-theme] {
    min-height: 100%;
    background: var(--timlink-bg);
    color: var(--timlink-text);
  }

  [data-theme] {
    min-height: 100vh;
    color-scheme: light;
  }

  [data-theme="dark"] {
    color-scheme: dark;
  }

  [data-theme] .ant-layout,
  [data-theme] .ant-layout-content {
    background: var(--timlink-content-bg) !important;
    color: var(--timlink-text);
  }

  [data-theme] .ant-typography,
  [data-theme] .ant-table,
  [data-theme] .ant-form,
  [data-theme] .ant-card,
  [data-theme] .ant-collapse,
  [data-theme] .ant-input,
  [data-theme] .ant-select,
  [data-theme] .ant-tag {
    font-family: 'Outfit', sans-serif !important;
  }

  [data-theme] .ant-typography,
  [data-theme] .ant-table,
  [data-theme] .ant-form,
  [data-theme] .ant-card,
  [data-theme] .ant-collapse,
  [data-theme] .ant-table-cell,
  [data-theme] .ant-empty-description {
    color: var(--timlink-text) !important;
  }

  [data-theme] .ant-typography-secondary,
  [data-theme] .ant-table-thead > tr > th,
  [data-theme] .ant-form-item-label > label {
    color: var(--timlink-text-muted) !important;
  }

  [data-theme] .ant-table-wrapper,
  [data-theme] .ant-table,
  [data-theme] .ant-table-container,
  [data-theme] .ant-table-content,
  [data-theme] .ant-table-thead > tr > th,
  [data-theme] .ant-table-tbody > tr > td,
  [data-theme] .ant-collapse,
  [data-theme] .ant-collapse-header,
  [data-theme] .ant-collapse-content,
  [data-theme] .ant-input,
  [data-theme] .ant-input-affix-wrapper,
  [data-theme] .ant-select-selector,
  [data-theme] .ant-picker,
  [data-theme] .ant-card {
    background: var(--timlink-surface) !important;
    border-color: var(--timlink-border) !important;
  }

  [data-theme] .ant-table-thead > tr > th,
  [data-theme] .ant-collapse-header {
    background: var(--timlink-surface-muted) !important;
  }

  [data-theme] .ant-table-tbody > tr:hover > td,
  [data-theme] .ant-table-tbody > tr.ant-table-row:hover > td {
    background: var(--timlink-surface-muted) !important;
  }

  [data-theme] .ant-tag {
    background: var(--timlink-surface-muted);
    border-color: var(--timlink-border);
    color: var(--timlink-text);
  }

  [data-theme] .ant-tag-checkable {
    border: 1px solid var(--timlink-border);
    border-radius: 999px;
    padding: 3px 12px;
    transition: all 0.2s ease;
  }

  [data-theme] .ant-tag-checkable:hover {
    color: ${primary};
    border-color: ${primaryMid};
    background: ${primaryDim};
  }

  [data-theme] .ant-tag-checkable-checked {
    background: ${primary} !important;
    border-color: ${primary} !important;
    color: #fff !important;
  }

  [data-theme] .ant-input::placeholder,
  [data-theme] .ant-select-selection-placeholder {
    color: var(--timlink-text-muted) !important;
  }

  .media-card-wrap { position: relative; border-radius: 10px; overflow: hidden; cursor: pointer; break-inside: avoid; margin-bottom: 14px; }
  .media-card-wrap img,
  .media-card-wrap video { display: block; width: 100%; transition: transform 0.4s ease; border-radius: 10px; }
  .media-card-wrap:hover img,
  .media-card-wrap:hover video { transform: scale(1.04); }

  .media-overlay {
    position: absolute; inset: 0; border-radius: 10px;
    background: linear-gradient(to top, rgba(5,3,15,0.92) 0%, rgba(5,3,15,0.4) 50%, transparent 100%);
    opacity: 0; transition: opacity 0.3s ease;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 16px;
  }
  .media-card-wrap:hover .media-overlay { opacity: 1; }

  .media-action-btn {
    width: 30px; height: 30px;
    border-radius: 7px;
    border: 1px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.8);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 14px;
    transition: all 0.2s ease;
    padding: 0;
  }
  .media-action-btn:hover { background: ${primary}; border-color: ${primary}; color: #fff; }
  .delete-btn:hover { background: #e74c3c !important; border-color: #e74c3c !important; }

  .upload-btn:hover { background: #238d58 !important; transform: translateY(-1px) !important; box-shadow: 0 6px 18px rgba(47,189,116,0.4) !important; }

  .stat-card:hover { border-color: ${primaryMid} !important; transform: translateY(-2px) !important; box-shadow: 0 8px 24px rgba(47,189,116,0.2) !important; }

  .media-tabs .ant-tabs-tab { font-family: 'Outfit', sans-serif !important; font-weight: 500 !important; font-size: 13px !important; }
  .media-tabs .ant-tabs-tab-active .ant-tabs-tab-btn { color: ${primary} !important; }
  .media-tabs .ant-tabs-ink-bar { background: ${primary} !important; }
  .media-tabs .ant-tabs-nav::before { border-color: rgba(47,189,116,0.12) !important; }

  .filter-select .ant-select-selector { border-color: rgba(47,189,116,0.2) !important; border-radius: 8px !important; font-family: 'Outfit', sans-serif !important; }
  .filter-select .ant-select-selector:hover { border-color: ${primary} !important; }

  .search-input .ant-input { font-family: 'Outfit', sans-serif !important; font-size: 13px !important; }
  .search-input .ant-input-prefix { color: rgba(47,189,116,0.5) !important; }
  .search-input .ant-input-affix-wrapper { border-radius: 8px !important; border-color: rgba(47,189,116,0.2) !important; }
  .search-input .ant-input-affix-wrapper:focus-within { border-color: ${primary} !important; box-shadow: 0 0 0 2px ${primaryDim} !important; }

  .cm-form .ant-form-item-label > label {
      font-family: 'Outfit', sans-serif !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      letter-spacing: 0.06em !important;
      text-transform: uppercase !important;
      color: #555 !important;
    }
    .cm-form .ant-input,
    .cm-form .ant-input-affix-wrapper,
    .cm-form textarea.ant-input,
    .cm-form .ant-select-selector {
      font-family: 'Outfit', sans-serif !important;
      font-size: 14px !important;
      border-color: rgba(47,189,116,0.2) !important;
      border-radius: 8px !important;
      transition: all 0.25s ease !important;
    }
    .cm-form .ant-input:focus,
    .cm-form .ant-input-affix-wrapper-focused,
    .cm-form .ant-select-focused .ant-select-selector {
      border-color: ${primary} !important;
      box-shadow: 0 0 0 3px ${primaryDim} !important;
    }
    .cm-form .ant-input-prefix { color: rgba(47,189,116,0.5) !important; }
    .cm-form .ant-form-item-explain-error {
      font-family: 'Outfit', sans-serif !important;
      font-size: 12px !important;
    }
    .cm-form .ant-select-selector {
      border-radius: 8px !important;
    }
    .cm-form .ant-select:hover .ant-select-selector {
      border-color: ${primary} !important;
    }
  
    /* Dragger */
    .cm-dragger .ant-upload-drag {
      border: 2px dashed rgba(47,189,116,0.28) !important;
      border-radius: 12px !important;
      background: ${primaryDim} !important;
      transition: all 0.25s ease !important;
    }
    .cm-dragger .ant-upload-drag:hover,
    .cm-dragger .ant-upload-drag-hover {
      border-color: ${primary} !important;
      background: rgba(47,189,116,0.15) !important;
    }
    .cm-dragger .ant-upload-drag-icon { margin-bottom: 8px !important; }
  
    .submit-btn:hover {
      background: #238d58 !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 24px ${primaryGlow} !important;
    }
    .reset-btn:hover {
      border-color: ${primary} !important;
      color: ${primary} !important;
    }
    .preview-remove:hover {
      background: rgba(231,76,60,0.12) !important;
      border-color: #e74c3c !important;
      color: #e74c3c !important;
    }

      /* Sidebar menu item hover & selected */
  .admin-menu .ant-menu-item:hover,
  .admin-menu .ant-menu-submenu-title:hover {
    background: ${accentDim} !important;
  }
  .admin-menu .ant-menu-item-selected {
    background: ${accentDim} !important;
    border-radius: 4px !important;
    border-left: 3px solid ${accent} !important;
  }
  .admin-menu .ant-menu-submenu-selected > .ant-menu-submenu-title {
    color: ${accent} !important;
  }
  .admin-menu .ant-menu-sub {
    background: rgba(0,0,0,0.2) !important;
    border-radius: 1px !important;
    margin: 2px 4px !important;
  }
  .admin-menu .ant-menu-item,
  .admin-menu .ant-menu-submenu-title {
    border-radius: 1px !important;
    margin: 2px 1px !important;
    padding-top: 3px !important;
    padding-bottom: 3px !important;
  }
  .admin-menu .ant-menu-item .ant-menu-item-icon,
  .admin-menu .ant-menu-submenu-title .ant-menu-item-icon {
    min-width: 18px !important;
    font-size: 18px !important;
    color: rgba(255,255,255,0.7) !important;
    vertical-align: middle !important;
    line-height: 1 !important;
  }
  .admin-menu .ant-menu-item-selected .ant-menu-item-icon,
  .admin-menu .ant-menu-item:hover .ant-menu-item-icon {
    color: ${accent} !important;
  }
  .admin-menu .ant-menu-submenu-arrow {
    color: rgba(255,255,255,0.4) !important;
  }
  .admin-menu .ant-menu-inline.ant-menu-sub .ant-menu-item {
    padding-left: 36px !important;
  }

  .plus-btn:hover {
    background: ${accentMid} !important;
    border-color: ${accent} !important;
    color: ${accent} !important;
    transform: scale(1.1) !important;
  }

  .header-icon-btn:hover {
    background: rgba(255,255,255,0.1) !important;
    color: #fff !important;
  }

  .logout-btn:hover {
    transform: scale(1.05) !important;
  }

  .collapse-toggle:hover {
    background: ${accentDim} !important;
    border-color: ${accentMid} !important;
    color: ${accent} !important;
  }

   .mp-copy-btn:hover { background: ${primaryDim} !important; border-color: ${primaryMid} !important; color: ${primary} !important; }
  .mp-edit-btn:hover { background: ${primaryDim} !important; border-color: ${primaryMid} !important; color: ${primary} !important; transform: translateY(-1px) !important; }
  .mp-delete-btn:hover { background: rgba(231,76,60,0.1) !important; border-color: #e74c3c !important; color: #e74c3c !important; transform: translateY(-1px) !important; }
  .mp-open-btn:hover { background: #238d58 !important; transform: translateY(-1px) !important; box-shadow: 0 6px 18px rgba(47,189,116,0.4) !important; }
  .mp-meta-row:hover { background: ${primaryDim} !important; border-radius: 8px !important; }

  /* Make scrollbar paper-thin and minimal */
::-webkit-scrollbar {    
  height: 2px; /* Use height for horizontal scrolling */
  width: 2px;  /* Keep this too, for vertical scroll areas */
}

::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.2);
}

::-webkit-scrollbar-thumb {
  background: rgb(144, 137, 137);
  border-radius: 1px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0);
}

::-webkit-scrollbar-button {
  display: none;
}

 .vol-table .ant-table { font-family: 'Outfit', sans-serif !important; overflow: hidden !important; }
  .vol-table .ant-table-thead > tr > th {
    font-family: 'Outfit', sans-serif !important;
    font-size: 11px !important; font-weight: 700 !important;
    letter-spacing: 0.1em !important; text-transform: uppercase !important;
    color: #888 !important;
    background: #faf8fc !important;
    border-bottom: 1px solid rgba(47,189,116,0.1) !important;
    padding: 14px 16px !important;
  }
  .vol-table .ant-table-tbody > tr > td {
    font-family: 'Outfit', sans-serif !important;
    font-size: 13px !important;
    padding: 6px 16px !important;
    border-bottom: 1px solid rgba(47,189,116,0.06) !important;
    transition: background 0.2s ease !important;
  }
  .vol-table .ant-table-tbody > tr:hover > td { background: ${primaryDim} !important; }
  .vol-table .ant-table-tbody > tr.unread-row > td { background: rgba(47,189,116,0.04) !important; }
  .vol-table .ant-table-tbody > tr.unread-row:hover > td { background: ${primaryDim} !important; }
  .vol-table .ant-pagination { font-family: 'Outfit', sans-serif !important;  }
  .vol-table .ant-pagination-item-active { border-color: ${primary} !important; }
  .vol-table .ant-pagination-item-active a { color: ${primary} !important; }

  .mark-read-btn:hover { background: rgba(39,174,96,0.1) !important; border-color: #27ae60 !important; color: #27ae60 !important; }

  .stat-card:hover { border-color: ${primaryMid} !important; transform: translateY(-2px) !important; box-shadow: 0 8px 24px rgba(47,189,116,0.15) !important; }

  .filter-select .ant-select-selector { border-color: rgba(47,189,116,0.2) !important; border-radius: 8px !important; font-family: 'Outfit', sans-serif !important; }
  .filter-select .ant-select-selector:hover,
  .filter-select.ant-select-focused .ant-select-selector { border-color: ${primary} !important; }

  .search-wrap .ant-input-affix-wrapper { border-radius: 8px !important; border-color: rgba(47,189,116,0.2) !important; font-family: 'Outfit', sans-serif !important; }
  .search-wrap .ant-input-affix-wrapper:focus-within { border-color: ${primary} !important; box-shadow: 0 0 0 3px ${primaryDim} !important; }
  .search-wrap .ant-input-prefix { color: rgba(47,189,116,0.45) !important; }


   .vol-collapse .ant-collapse-item {
    border-bottom: 1px solid rgba(47,189,116,0.08) !important;
  }
  .vol-collapse .ant-collapse-item:last-child {
    border-bottom: none !important;
  }
  .vol-collapse .ant-collapse-header {
    background: #faf8fc !important;
    transition: background 0.2s ease !important;
  }
  .vol-collapse .ant-collapse-header:hover {
    background: ${primaryDim} !important;
  }
  .vol-collapse .ant-collapse-item-active .ant-collapse-header {
    background: ${primaryDim} !important;
    border-bottom: 1px solid ${primaryMid} !important;
  }
  .vol-collapse .ant-collapse-arrow {
    color: ${primary} !important;
  }

  .vol-table .ant-pagination {
  font-size: 12px;
}

.vol-table .ant-pagination-item {
  min-width: 16px;
  height: 16px;
  line-height: 16px;
  font-size: 10px;
}

.vol-table .ant-pagination-prev,
.vol-table .ant-pagination-next {
  min-width: 26px;
  height: 26px;
  line-height: 24px;
}

.vol-table .ant-pagination-options {
  font-size: 12px;
}

.vol-table .ant-select-selector {
  height: 12px !important;
}

 .don-table .ant-table { font-family: 'Outfit', sans-serif !important; }
  .don-table .ant-table-thead > tr > th {
    font-family: 'Outfit', sans-serif !important;
    font-size: 11px !important; font-weight: 700 !important;
    letter-spacing: 0.1em !important; text-transform: uppercase !important;
    color: #888 !important; background: #faf8fc !important;
    border-bottom: 1px solid rgba(47,189,116,0.1) !important;
    padding: 12px 16px !important;
  }
  .don-table .ant-table-tbody > tr > td {
    font-family: 'Outfit', sans-serif !important;
    font-size: 13px !important; padding: 12px 16px !important;
    border-bottom: 1px solid rgba(47,189,116,0.06) !important;
    transition: background 0.2s ease !important;
  }
  .don-table .ant-table-tbody > tr:hover > td { background: ${primaryDim} !important; }
  .don-table .ant-table-tbody > tr.unread-row > td { background: rgba(47,189,116,0.03) !important; }
  .don-table .ant-table-tbody > tr.unread-row:hover > td { background: ${primaryDim} !important; }
  .don-table .ant-pagination { font-family: 'Outfit', sans-serif !important; padding: 12px 16px !important; }
  .don-table .ant-pagination-item-active { border-color: ${primary} !important; }
  .don-table .ant-pagination-item-active a { color: ${primary} !important; }

  .don-collapse .ant-collapse-item {
    border-bottom: 1px solid rgba(47,189,116,0.08) !important;
  }
  .don-collapse .ant-collapse-item:last-child { border-bottom: none !important; }
  .don-collapse .ant-collapse-header {
    background: #faf8fc !important;
    transition: background 0.2s ease !important;
  }
  .don-collapse .ant-collapse-header:hover { background: ${primaryDim} !important; }
  .don-collapse .ant-collapse-item-active .ant-collapse-header {
    background: ${primaryDim} !important;
    border-bottom: 1px solid ${primaryMid} !important;
  }
  .don-collapse .ant-collapse-arrow { color: ${primary} !important; }

  .don-search .ant-input-affix-wrapper {
    border-radius: 8px !important;
    border-color: rgba(47,189,116,0.2) !important;
    font-family: 'Outfit', sans-serif !important;
  }
  .don-search .ant-input-affix-wrapper:focus-within {
    border-color: ${primary} !important;
    box-shadow: 0 0 0 3px ${primaryDim} !important;
  }
  .don-search .ant-input-prefix { color: rgba(47,189,116,0.45) !important; }
  .don-filter .ant-select-selector {
    border-color: rgba(47,189,116,0.2) !important;
    border-radius: 8px !important;
    font-family: 'Outfit', sans-serif !important;
  }
  .don-filter.ant-select-focused .ant-select-selector,
  .don-filter .ant-select-selector:hover { border-color: ${primary} !important; }

   @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1); }
  }

  .dash-stat-card { transition: all 0.25s ease !important; animation: fadeUp 0.5s ease both; }
  .dash-stat-card:hover { transform: translateY(-3px) !important; box-shadow: 0 12px 32px rgba(0,0,0,0.1) !important; }
  .dash-activity-row { transition: background 0.2s ease; border-radius: 8px; }
  .dash-activity-row:hover { background: ${primaryDim} !important; }
  .dash-bar { transition: filter 0.2s ease, opacity 0.2s ease; }
  .dash-bar:hover { filter: brightness(1.15) !important; opacity: 0.9; }
  .media-thumb:hover .media-thumb-overlay { opacity: 1 !important; }

  .album-card { transition: all 0.25s ease; cursor: pointer; }
    .album-card:hover { transform: translateY(-4px) !important; box-shadow: 0 16px 40px rgba(47,189,116,0.18) !important; border-color: ${primaryMid} !important; }
    .album-card:hover .album-cover { transform: scale(1.04); }
    .album-card:hover .album-overlay { opacity: 1 !important; }
  
    .album-action-btn:hover { background: ${primaryDim} !important; border-color: ${primaryMid} !important; color: ${primary} !important; }
    .album-delete-btn:hover { background: rgba(231,76,60,0.1) !important; border-color: #e74c3c !important; color: #e74c3c !important; }
    .add-album-btn:hover { background: #238d58 !important; transform: translateY(-1px) !important; box-shadow: 0 8px 20px rgba(47,189,116,0.4) !important; }
  
    .don-search .ant-input-affix-wrapper { border-radius: 8px !important; border-color: rgba(47,189,116,0.2) !important; font-family: 'Outfit', sans-serif !important; }
    .don-search .ant-input-affix-wrapper:focus-within { border-color: ${primary} !important; box-shadow: 0 0 0 3px ${primaryDim} !important; }
    .don-search .ant-input-prefix { color: rgba(47,189,116,0.45) !important; }
    .don-filter .ant-select-selector { border-color: rgba(47,189,116,0.2) !important; border-radius: 8px !important; font-family: 'Outfit', sans-serif !important; }
    .don-filter.ant-select-focused .ant-select-selector,
    .don-filter .ant-select-selector:hover { border-color: ${primary} !important; }
  
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .album-grid-item { animation: fadeUp 0.4s ease both; }


     @keyframes fadeUp {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
    
      .ap-media-card { break-inside: avoid; margin-bottom: 12px; cursor: pointer; }
      .ap-media-card .ap-img { display: block; width: 100%; border-radius: 10px; transition: transform 0.35s ease; }
      .ap-media-card:hover .ap-img { transform: scale(1.03); }
      .ap-media-card:hover .ap-overlay { opacity: 1 !important; }
    
      .ap-filter-select .ant-select-selector { border-radius: 8px !important; border-color: rgba(47,189,116,0.2) !important; font-family: 'Outfit', sans-serif !important; }
      .ap-filter-select.ant-select-focused .ant-select-selector,
      .ap-filter-select .ant-select-selector:hover { border-color: ${primary} !important; }
      .ap-search .ant-input-affix-wrapper { border-radius: 8px !important; border-color: rgba(47,189,116,0.2) !important; font-family: 'Outfit', sans-serif !important; }
      .ap-search .ant-input-affix-wrapper:focus-within { border-color: ${primary} !important; box-shadow: 0 0 0 3px ${primaryDim} !important; }
      .ap-search .ant-input-prefix { color: rgba(47,189,116,0.4) !important; }
    
      .ap-back-btn:hover { background: ${primaryDim} !important; border-color: ${primaryMid} !important; color: ${primary} !important; }
      .ap-action-btn:hover { background: ${primaryDim} !important; border-color: ${primaryMid} !important; color: ${primary} !important; }
      .ap-delete-btn:hover { background: rgba(231,76,60,0.1) !important; border-color: #e74c3c !important; color: #e74c3c !important; }
    
      .view-toggle-btn { transition: all 0.2s ease; }
      .view-toggle-btn:hover { color: ${primary} !important; }
  `;

