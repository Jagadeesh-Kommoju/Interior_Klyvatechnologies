const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

const modalCSS = `
/* ==========================================================================
   GLOBAL INTERACTIVE MODALS (BOOKING, SERVICES, VIDEO SHOWCASE)
   ========================================================================== */
.modal-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  background: rgba(12, 19, 39, 0.72) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 999999 !important;
  padding: 24px !important;
  box-sizing: border-box !important;
  overflow-y: auto !important;
  animation: modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.modal-card {
  background: #ffffff !important;
  border-radius: 28px !important;
  padding: 36px 32px 30px !important;
  box-shadow: 0 25px 65px -12px rgba(12, 19, 39, 0.35) !important;
  border: 1px solid rgba(226, 232, 240, 0.9) !important;
  position: relative !important;
  width: 100% !important;
  max-width: 620px !important;
  box-sizing: border-box !important;
  max-height: 90vh !important;
  overflow-y: auto !important;
  animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.contact-accent-bar {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 5px !important;
  background: linear-gradient(90deg, #0b63f6, #d946ef, #f97316) !important;
}

.modal-close-btn {
  position: absolute !important;
  top: 18px !important;
  right: 18px !important;
  width: 36px !important;
  height: 36px !important;
  border-radius: 50% !important;
  background: #f1f5f9 !important;
  border: 1px solid #e2e8f0 !important;
  color: #64748b !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 15px !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  z-index: 15 !important;
}

.modal-close-btn:hover {
  background: #e2e8f0 !important;
  color: #0c1327 !important;
  transform: rotate(90deg) !important;
}

.modal-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 24px !important;
  font-weight: 800 !important;
  color: #0c1327 !important;
  margin: 0 0 6px !important;
  line-height: 1.25 !important;
}

.modal-desc {
  font-size: 13.5px !important;
  color: #64748b !important;
  line-height: 1.6 !important;
  margin: 0 0 20px !important;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
`;

// Insert modalCSS right before "/* -------------------------------------------------------------\n   COMPREHENSIVE FULL-WEBSITE MOBILE RESPONSIVENESS SUITE"
const marker = '/* -------------------------------------------------------------\r\n   COMPREHENSIVE FULL-WEBSITE MOBILE RESPONSIVENESS SUITE';
const markerLF = '/* -------------------------------------------------------------\n   COMPREHENSIVE FULL-WEBSITE MOBILE RESPONSIVENESS SUITE';

if (css.includes(marker)) {
  css = css.replace(marker, modalCSS + '\r\n' + marker);
} else if (css.includes(markerLF)) {
  css = css.replace(markerLF, modalCSS + '\n' + markerLF);
} else {
  css = modalCSS + '\n' + css;
}

fs.writeFileSync('src/index.css', css);
console.log('Modal base CSS added successfully');

