const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

const startTarget = '/* 1. TOP HERO SHOWCASE CARD (FITS 100% IN VIEWPORT ON PAGE OPEN) */';
const endTarget = '.work-branding-video {\r\n  border-radius: 14px;\r\n}';
const endTargetLF = '.work-branding-video {\n  border-radius: 14px;\n}';

const startIdx = css.indexOf(startTarget);
let endIdx = css.indexOf(endTarget);
let targetLen = endTarget.length;

if (endIdx === -1) {
  endIdx = css.indexOf(endTargetLF);
  targetLen = endTargetLF.length;
}

if (startIdx === -1 || endIdx === -1) {
  console.error('Target not found!', { startIdx, endIdx });
  process.exit(1);
}

const before = css.substring(0, startIdx);
const after = css.substring(endIdx + targetLen);

const newSection = `/* 1. TOP HERO SHOWCASE CARD (FITS 100% IN VIEWPORT ON PAGE OPEN) */
.work-hero-showcase-card {
  background: #F8F5F0;
  border-radius: 28px;
  padding: 32px 42px 20px !important;
  margin: 14px 0 50px;
  border: 1px solid rgba(224, 216, 203, 0.85);
  box-shadow: 0 16px 45px rgba(40, 30, 20, 0.05);
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 105px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

/* Subtle warm radial ambient glow */
.work-hero-showcase-card::before,
.work-showcase-section::before {
  content: "";
  position: absolute;
  top: -120px;
  right: -120px;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(217, 160, 102, 0.09) 0%, transparent 70%);
  pointer-events: none;
}

/* Header Grid - Expands edge-to-edge inside the showcase card */
.work-hero-showcase-card .work-header-grid,
.work-showcase-section .work-header-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) clamp(280px, 26vw, 325px);
  gap: clamp(32px, 3.8vw, 56px);
  align-items: center;
  margin: 0 !important;
  max-width: 100% !important;
  width: 100% !important;
  position: relative;
}

.work-hero-showcase-card .work-header-content {
  max-width: 100%;
  width: 100%;
}

.work-hero-showcase-card .work-header-video-col {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

/* Dark charcoal typography for high legibility on cream */
.work-hero-title {
  color: #18110b;
  font-weight: 800;
  font-size: clamp(30px, 3.2vw, 42px);
  line-height: 1.15;
  letter-spacing: -1.2px;
  margin-bottom: 12px;
}

.highlight-coral {
  color: #c2782b;
  background: linear-gradient(135deg, #d97706 0%, #c2782b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.work-hero-description {
  color: #475569;
  font-size: 15px;
  line-height: 1.6;
  margin: 0 0 18px 0;
  max-width: 700px;
}

.work-eyebrow-pill {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: #ffffff !important;
  border: 1px solid #e2dbcf !important;
  border-radius: 999px !important;
  padding: 5px 14px !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  color: #8c5b28 !important;
  box-shadow: 0 2px 8px rgba(35, 25, 15, 0.04) !important;
  margin-bottom: 14px !important;
  width: fit-content !important;
  max-width: max-content !important;
  white-space: nowrap !important;
}

.work-badge-spark {
  color: #d97706 !important;
  font-size: 11px !important;
  line-height: 1 !important;
}

.work-badge-text {
  font-weight: 700 !important;
  letter-spacing: 0.5px !important;
}

.work-badge-status {
  display: inline-flex !important;
  align-items: center !important;
  gap: 4px !important;
  background: #ecfdf5 !important;
  color: #059669 !important;
  border: 1px solid #a7f3d0 !important;
  padding: 2px 8px !important;
  border-radius: 999px !important;
  font-size: 9.5px !important;
  font-weight: 800 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  line-height: 1.2 !important;
  margin-left: 2px !important;
}

/* 3 Pillars Cards */
.work-pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
  max-width: 720px;
  margin-bottom: 18px;
}

.work-pillar-card {
  background: #ffffff;
  border: 1px solid #e7dfd4;
  border-radius: 14px;
  box-shadow: 0 3px 10px rgba(35, 25, 15, 0.04);
  padding: 10px 13px;
  gap: 7px;
  transition: all 0.25s ease;
}

.work-pillar-card:hover {
  border-color: #d9a066;
  box-shadow: 0 6px 18px rgba(35, 25, 15, 0.08);
  transform: translateY(-1px);
}

.work-pillar-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  min-width: 28px;
}

.work-pillar-icon svg {
  width: 15px;
  height: 15px;
}

.work-pillar-title {
  color: #18110b;
  font-size: 12px;
  font-weight: 700;
}

.work-pillar-desc {
  color: #64748b;
  font-size: 10.5px;
  line-height: 1.25;
}

/* Action Buttons in Cream Section */
.work-hero-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.work-btn-primary {
  background: #18110b;
  color: #ffffff;
  border: none;
  box-shadow: 0 6px 18px rgba(24, 17, 11, 0.2);
  padding: 11px 22px;
  font-size: 14px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
}

.work-btn-primary:hover {
  background: #2b1f14;
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(24, 17, 11, 0.28);
}

.work-btn-secondary {
  background: #ffffff;
  color: #18110b;
  border: 1px solid #ded6c8;
  box-shadow: 0 2px 8px rgba(35, 25, 15, 0.04);
  padding: 11px 18px;
  font-size: 14px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
}

.work-btn-secondary:hover {
  background: #fdfcfb;
  border-color: #c9bea9;
}

.work-trust-strip {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  flex-wrap: wrap;
}

.work-trust-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
}

.work-trust-item svg {
  color: #10b981;
}

/* Right Branding Video Card: Scaled to fit comfortably on all viewports */
.work-hero-showcase-card .work-branding-video-wrap,
.work-showcase-section .work-branding-video-wrap {
  background: #ffffff;
  padding: 7px;
  border-radius: 24px;
  border: 1px solid #e8e1d6;
  box-shadow: 0 20px 48px rgba(35, 25, 15, 0.11), 0 4px 12px rgba(35, 25, 15, 0.04);
  max-width: clamp(280px, 26vw, 325px);
  width: 100%;
  aspect-ratio: 9 / 16;
  margin-left: auto;
}

.work-branding-video {
  border-radius: 16px;
}`;

let updated = before + newSection + after;

// Update mobile .work-eyebrow-pill margin
updated = updated.replace(
  /\.work-eyebrow-pill\s*\{\s*font-size:\s*10\.5px\s*!important;\s*padding:\s*5px\s*12px\s*!important;\s*margin-bottom:\s*10px\s*!important;\s*\}/,
  `.work-eyebrow-pill {
    font-size: 10.5px !important;
    padding: 5px 12px !important;
    margin: 0 auto 12px !important;
  }`
);

fs.writeFileSync('src/index.css', updated, 'utf8');
console.log('src/index.css updated successfully!');

