import type { HomeCopy } from "../types";

/** Home + shared chrome copy (English) */
const en: HomeCopy = {
  metadata: {
    title: "Yggdrasil — Manage git with ease",
    description:
      "A desktop app that lets you fix git history by dragging and dropping on the commit graph. Manage git with ease, in Yggdrasil.",
  },
  chrome: {
    homeLabel: "Yggdrasil home",
    navLabel: "Main menu",
    nav: { features: "Features", news: "News", docs: "Docs" },
    download: "Download",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    languageLabel: "Language",
    footerLinks: { github: "GitHub", license: "License", privacy: "Privacy", contact: "Contact" },
  },
  hero: {
    title: "Manage git with ease, in Yggdrasil.",
    secondaryCta: "GitHub",
    videoCaption: "demo.mp4 · app demo",
  },
  demoVideo: {
    label:
      "Yggdrasil demo: dragging a commit onto the release/1.0 label to copy it (cherry-pick), undoing with ⌘Z, then searching with ⌘K",
    play: "Play demo video",
  },
  featuresHead: { title: "Explore the features" },
  featureMore: "See details",
  features: {
    drag: {
      alt: "A commit dragged onto the release/1.0 branch label, with action pills and a ghost preview of the resulting graph",
      title: "Git by drag and drop",
      description:
        "Drag a commit onto another branch label and the actions you can take pop up as pills, with a ghost preview of the resulting graph. The git command it will run is shown too.",
    },
    menu: {
      alt: "Action menu shown after dropping: move, copy, or merge branches",
      title: "Pick an action after the drop",
      description:
        "Drop, then choose to move, copy (cherry-pick), or merge. Every item lists the git command it maps to.",
    },
    diff: {
      alt: "Diff view comparing a commit's file changes side by side",
      title: "Side-by-side diff",
      description:
        "Click a file in a commit to see its changes in unified or side-by-side view. History and blame tabs open in the same place.",
    },
    conflict: {
      alt: "Conflict editor letting you pick A, B, or both for each merge conflict hunk",
      title: "Conflict editor",
      description:
        "When a merge conflicts, a banner appears. Pick A, B, or both for each hunk, check the result, and resolve. Continue or abort in one click.",
    },
    rebase: {
      alt: "Rebase view where commits are reordered by dragging and squashed, reworded, or dropped",
      title: "Clean up commits (rebase -i)",
      description:
        "Drag a branch's commits to reorder them, choose squash, reword, or drop, and tidy everything up in one go.",
    },
  },
  checklistHead: { title: "Before you install" },
  checklist: [
    {
      title: "Requires Git 2.38 or later",
      description: "Yggdrasil uses the git already installed on your system. Check with git --version in a terminal.",
    },
    {
      title: "macOS · Windows · Linux",
      description: "Built with Electron, so it works the same on all three operating systems.",
    },
    {
      title: "First launch before signing",
      description:
        "The app isn't code-signed yet, so your OS may show a security warning the first time you open it. Follow the steps to allow it.",
    },
    {
      title: "Uses your system credentials",
      description:
        "Remote credentials stay in the OS credential store that git already uses. The app never stores them itself.",
    },
  ],
  newsHead: { title: "Latest news" },
  releaseNotesTitle: "Release notes",
  changeLogTitle: "Changelog",
  seeAll: "See all →",
  noReleases: "No releases yet.",
  releaseDefault: "A new version is out",
  noChanges: "Couldn't load the changelog.",
  noDetail: "This commit has no description.",
  viewOnGithub: "View on GitHub ↗",
  help: {
    title: ["Questions?", "We’re on the branch."],
    description: "Stuck somewhere? Check the docs or let us know in a GitHub issue.",
    docs: "Read the docs",
    issue: "Open an issue",
  },
};

export default en;
