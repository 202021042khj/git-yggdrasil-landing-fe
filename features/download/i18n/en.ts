import { APP_PRODUCT_NAME, APP_VERSION, WINDOWS_SETUP_FILE } from "../constants";
import type { DownloadDictionary } from "../types";

/** Download page copy (English). macOS / Windows UI names follow the English OS wording */
const en: DownloadDictionary = {
  metadata: {
    title: "Download — Yggdrasil for Git",
    description:
      "Get the Yggdrasil for Git installer for macOS, Windows, or Linux, and learn how to open an unsigned app for the first time.",
  },
  intro: { eyebrow: `v${APP_VERSION}`, title: "Free download" },
  detect: {
    pending: "Finding the right file for this computer…",
    "mac-arm64": "This computer: macOS · Apple Silicon",
    "mac-x64": "This computer: macOS · Intel",
    "mac-unknown": "This computer: macOS · couldn’t tell the chip, so both files are shown",
    windows: "This computer: Windows",
    "windows-arm64": "This computer: Windows (ARM) · the x64 build runs under emulation",
    linux: "This computer: Linux",
    mobile: "Phones and tablets aren’t supported. Open this page on a computer.",
    unknown: "Couldn’t detect your operating system. Pick a file below.",
  },
  recommendedTag: "Recommended · this computer",
  recommendedTagShort: "Recommended",
  downloadLabel: "Download",
  downloadAria: "Download {file} for {label}",
  releasesLink: {
    label: "All files · older versions · checksums → GitHub Releases",
    note: "The .zip and .blockmap files for auto-update are there too",
  },
  platforms: {
    mac: {
      meta: "macOS 12 Monterey or later · disk image (.dmg)",
      hint: 'Not sure which chip you have? Open the Apple menu in the top-left corner › About This Mac. "Chip Apple M…" means Apple Silicon; "Processor … Intel" means Intel.',
    },
    windows: {
      meta: "Windows 10 · 11 (64-bit) · installer (.exe)",
      hint: "You can choose the install location during setup. There’s no portable version yet.",
    },
    linux: { meta: "AppImage (x64) · run chmod +x after downloading, then launch it" },
  },
  files: {
    "mac-arm64": "Apple Silicon",
    "mac-x64": "Intel",
    "win-x64": "Installer (x64)",
    "linux-x64": "Linux · AppImage (x64)",
  },
  firstRunHead: { title: "Help with first launch" },
  firstRunGuides: [
    {
      id: "mac",
      title: "macOS — 15 Sequoia or later",
      shape: "circle",
      steps: [
        {
          title: "Move it to Applications",
          body: `Open the downloaded .dmg and drag the ${APP_PRODUCT_NAME} icon into the Applications folder.`,
        },
        {
          title: "The first launch is blocked",
          body: `When the “${APP_PRODUCT_NAME}” Not Opened dialog appears, click Done. Don’t move it to the Trash.`,
          ui: "Done",
        },
        {
          title: "Open Anyway",
          body: `Open System Settings › Privacy & Security. Under Security, next to “${APP_PRODUCT_NAME}” was blocked to protect your Mac, click Open Anyway. Confirm with your password or Touch ID.`,
          ui: "System Settings › Privacy & Security › Open Anyway",
        },
        {
          title: "Open it once more",
          body: "In the confirmation dialog that follows, click Open Anyway and the app opens. From then on it opens right away.",
          ui: "Open Anyway",
        },
      ],
      note: "Starting with macOS 15, Control-click › Open in Finder no longer skips this check. On macOS 12 – 14 that shortcut still works.",
    },
    {
      id: "windows",
      title: "Windows 10 · 11",
      shape: "square",
      steps: [
        {
          title: "Run the installer",
          body: `Open ${WINDOWS_SETUP_FILE}. If your browser says it “isn’t commonly downloaded,” choose ⋯ › Keep.`,
        },
        {
          title: "Windows protected your PC",
          body: "When the blue SmartScreen window appears, don’t close it — click More info.",
          ui: "More info",
        },
        {
          title: "Run anyway",
          body: `Check that the app is ${APP_PRODUCT_NAME} and the publisher is Unknown publisher, then click Run anyway.`,
          ui: "Run anyway",
        },
        {
          title: "Choose where to install",
          body: `Pick an install location and install. When it’s done, open ${APP_PRODUCT_NAME} from the Start menu.`,
        },
      ],
      note: "SmartScreen always shows this window for new unsigned apps. The warning doesn’t mean something is wrong with the app — but make sure the file came from GitHub Releases.",
    },
  ],
  quarantineTip: {
    tag: "Advanced · optional",
    title: 'If you see “is damaged and can’t be opened”',
    body: "If the steps above don’t work and this message appears, clear the download quarantine flag in Terminal. Only do this for a file you downloaded directly from GitHub Releases.",
  },
  copy: { idle: "Copy", done: "Copied", aria: "Copy command" },
};

export default en;
