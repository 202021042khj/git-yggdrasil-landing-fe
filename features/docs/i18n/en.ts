import { MAC_QUARANTINE_COMMAND } from "../constants";
import type { DocsDictionary } from "../types";

/** Docs (English). App screen names follow the app's src/shared/i18n/en.ts. Topic ids match the landing "See details" links. */
const en: DocsDictionary = {
  metadata: {
    title: "Docs — Yggdrasil for Git",
    description:
      "How to use Yggdrasil: open a repository, drag and drop, resolve conflicts, clean up commits, find lost commits, and troubleshoot.",
  },
  title: "Docs",
  tocLabel: "Contents",
  sections: [
    {
      id: "start",
      title: "Getting started",
      topics: [
        {
          id: "install",
          title: "Install",
          blocks: [
            { kind: "p", text: "Get the file for your computer from the download page and install it. You need git 2.38 or later on your system." },
            { kind: "p", text: "The app isn’t signed yet, so your OS blocks it the first time. See “Troubleshooting” below for how to open it." },
          ],
        },
        {
          id: "open",
          title: "Open a repository",
          blocks: [
            {
              kind: "list",
              items: [
                "Choose a git repository folder with “Open repository folder” or [[⌘O]], and the commit graph appears right away.",
                "If the folder isn’t a git repository yet, a “Start git” button appears. It runs `git init` in that folder and opens it.",
                "To get a remote repository, use “Clone from URL” ([[⌘⇧O]]), or sign in to GitHub and use “Clone from my GitHub”.",
                "Reopen folders from “Recent repositories” on the start screen. The last repository you opened opens automatically next time.",
              ],
            },
          ],
        },
        {
          id: "undo",
          title: "Undo",
          blocks: [
            { kind: "p", text: "Every operation is logged with the git command it ran. Press [[⌘Z]] to undo one step at a time and [[⇧⌘Z]] to redo." },
            { kind: "note", text: "Working-tree changes thrown away with “Discard changes” or “Reset here, discard changes” (reset --hard) can’t be brought back with undo. The app asks before running them." },
          ],
        },
      ],
    },
    {
      id: "basics",
      title: "Basics",
      topics: [
        {
          id: "drag",
          title: "Drag and drop",
          blocks: [
            { kind: "p", text: "You can drag commits, branch labels, groups of changes, files, stash cards and remote labels." },
            {
              kind: "steps",
              items: [
                "As soon as you start dragging, every place you can drop shows a label saying what will happen.",
                "Move close to a label and it snaps; the resulting graph is drawn over the canvas, along with the git commands that will run.",
                "Let go to run it. Press [[Esc]] before letting go to cancel.",
              ],
            },
            { kind: "p", text: "Dragging a branch label moves its commits along with it (rebase). Merge and moving only the pointer are in the menu." },
            { kind: "note", text: "Operations that rewrite pushed commits (filled nodes) ask first, and need a force push afterwards." },
          ],
        },
        {
          id: "menu",
          title: "The menu after you drop",
          blocks: [
            { kind: "p", text: "When more than one thing can happen, a menu appears. For example, dropping a commit on another branch label lets you move it, copy it (cherry-pick) or merge the branch. Each item shows the git command it runs." },
            { kind: "list", items: ["Pick with a number key, or the arrow keys and [[Enter]].", "Press [[Esc]] to close without doing anything."] },
          ],
        },
        {
          id: "click",
          title: "Right-click and double-click",
          blocks: [
            {
              kind: "list",
              items: [
                "You don’t have to drag: right-click any item to pick the same operations from a menu. On the keyboard, press [[Shift]] [[F10]].",
                "Double-click a branch label to check it out, or a commit to edit its message.",
              ],
            },
          ],
        },
        {
          id: "multi",
          title: "Several commits at once",
          blocks: [
            {
              kind: "steps",
              items: [
                "[[⌘]]-click to add or remove commits; [[Shift]]-click to select a range on the same branch.",
                "Drag one of them onto another branch label, or right-click it, to copy them all (cherry-pick), oldest first.",
                "Press [[Esc]] to clear the selection.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "how-to",
      title: "How-to",
      topics: [
        {
          id: "diff",
          title: "See what changed",
          blocks: [
            {
              kind: "steps",
              items: [
                "Click a commit in the graph to see its author, parents and changed files in the details panel.",
                "Click a file to open its diff. Switch between “Unified” and “Split”, and turn on “Ignore whitespace”. Images are shown before and after, side by side.",
                "In the same place, the history tab follows the file across renames, and the blame tab shows which commit last changed each line.",
              ],
            },
            { kind: "p", text: "For files in the working tree, click “Stage hunk”, or click +/- lines (or press [[Space]]) to stage just those lines." },
          ],
        },
        {
          id: "conflict",
          title: "Resolve conflicts",
          blocks: [
            { kind: "p", text: "When a merge, rebase, cherry-pick, revert or pull on the current branch hits a conflict, it stops there and a banner appears at the top." },
            {
              kind: "steps",
              items: [
                "Open a conflicted file from the panel on the right.",
                "For each hunk, choose A, B, “A then B” or “B then A”. The result is shown below, and you can edit it directly.",
                "Click “Resolve with this”. For a whole file, use “Use A”, “Use B” or “External editor”.",
                "When every file is resolved, click “Continue” in the banner. “Skip this commit” and “Abort (back to start)” are there too.",
              ],
            },
            { kind: "note", text: "During a rebase, git’s --ours is the target (the branch receiving commits) and --theirs is your commit. A and B in the app follow the same order." },
            { kind: "p", text: "If the conflict would happen on a branch you haven’t checked out, nothing changes and the app asks whether to check it out and continue. Operations you started in a terminal and that stopped can be finished in the app too." },
          ],
        },
        {
          id: "rebase",
          title: "Clean up commits (rebase -i)",
          blocks: [
            {
              kind: "steps",
              items: [
                "Right-click a branch label and choose “Clean up commits (rebase -i)…”.",
                "The oldest commit is at the top. Drag rows or use [[↑]] [[↓]] to reorder them.",
                "For each row, choose “Keep”, “Edit message”, “Squash into previous”, “Fixup into previous (drop message)” or “Drop”.",
                "Check the result and click “Run”. Click “Reset” to start over.",
              ],
            },
            { kind: "p", text: "It works on branches you haven’t checked out. If the current branch hits a conflict, it stops as a real rebase -i and you continue the same way as resolving conflicts." },
            { kind: "note", text: "Branches that contain a merge commit can’t be cleaned up yet. Cleaning up pushed commits needs a force push afterwards." },
          ],
        },
        {
          id: "recover",
          title: "Find lost commits",
          blocks: [
            { kind: "p", text: "Deleted a branch, or a reset made commits disappear? You can usually get them back." },
            {
              kind: "steps",
              items: [
                "Click “Find lost commits” next to the activity log on the right. It lists the HEAD history (reflog) and the backups the app keeps before each operation, and marks commits no branch can reach.",
                "Use “Show in graph” to check a commit.",
                "Choose “Rescue as a new branch…”, “Copy just this commit (cherry-pick)” or “Reset to this commit…”.",
              ],
            },
          ],
        },
        {
          id: "github",
          title: "GitHub and other remotes",
          blocks: [
            {
              kind: "list",
              items: [
                "Click “Sign in to GitHub” and an approval page opens in your browser. Enter the code shown in the app and approve.",
                "Once signed in, it’s used for fetch, pull, push and clone on github.com repositories. You can also use “Clone from my GitHub” and “Publish as a new GitHub repository” in the remotes section.",
                "To open a pull request, right-click a branch label and choose “Create GitHub pull request…”.",
                "For HTTPS remotes outside GitHub (GitLab, Bitbucket, self-hosted), the app asks for a username and access token when needed and saves them in your system git credential helper (such as the macOS keychain).",
                "SSH remotes use the keys in your system SSH agent.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "reference",
      title: "Reference",
      topics: [
        {
          id: "shortcuts",
          title: "Shortcuts",
          blocks: [
            {
              kind: "keys",
              rows: [
                { keys: ["⌘O"], action: "Open repository folder" },
                { keys: ["⌘⇧O"], action: "Clone from URL" },
                { keys: ["⌘K"], action: "Search commits and files" },
                { keys: ["⌘,"], action: "Settings" },
                { keys: ["⌘Z"], action: "Undo" },
                { keys: ["⇧⌘Z"], action: "Redo" },
                { keys: ["⌘Enter"], action: "Commit" },
                { keys: ["Esc"], action: "Cancel drag · close menu · clear selection" },
                { keys: ["←", "→", "↑", "↓"], action: "Move through the graph" },
                { keys: ["Shift", "F10"], action: "Menu for the focused item" },
              ],
            },
            { kind: "p", text: "On Windows and Linux, use [[Ctrl]] instead of [[⌘]]." },
          ],
        },
        {
          id: "safety",
          title: "Is it safe?",
          blocks: [
            {
              kind: "list",
              items: [
                "History edits are worked out first with `git merge-tree`, without touching your working folder. If something would conflict, nothing changes and you’re told which files.",
                "When the current branch moves, the working folder is updated with `git reset --keep`. Local changes stay; git refuses if they’d be overwritten.",
                "Branch positions before each operation are kept under `refs/yggdrasil/backup/`, so “Find lost commits” can find them again.",
              ],
            },
          ],
        },
        {
          id: "privacy",
          title: "Privacy and security",
          blocks: [
            {
              kind: "list",
              items: [
                "Yggdrasil runs your installed git. It doesn’t send your code anywhere.",
                "GitHub tokens are encrypted with your OS keychain and passed to git only through an environment variable, only for github.com — never as a command argument.",
                "Passwords and tokens for other hosts go straight into your system git credential helper. The app keeps no copy.",
                "This website collects no personal information. It stores one cookie in your browser to remember your language (Korean or English); it expires after a year and you can delete it anytime.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      topics: [
        {
          id: "mac-blocked",
          title: "macOS: the app won’t open",
          blocks: [
            {
              kind: "steps",
              items: [
                "When “Yggdrasil” Not Opened appears, click “Done”. Don’t move it to the Trash.",
                "Open System Settings › Privacy & Security, and under Security click “Open Anyway” next to Yggdrasil.",
                "Confirm with your password or Touch ID. From then on it opens normally.",
              ],
            },
            { kind: "p", text: "If it says the app “is damaged and can’t be opened”, run this once in Terminal and open it again." },
            { kind: "command", command: MAC_QUARANTINE_COMMAND },
          ],
        },
        {
          id: "windows-blocked",
          title: "Windows: “Windows protected your PC”",
          blocks: [{ kind: "steps", items: ["Click “More info”.", "Check the app name is Yggdrasil, then click “Run anyway”."] }],
        },
        {
          id: "keychain",
          title: "macOS: it asks for my keychain password",
          blocks: [
            { kind: "p", text: "If you’re signed in to GitHub and update the app, macOS may say Yggdrasil wants to use “Yggdrasil Safe Storage” in your keychain. Enter your Mac login password and click “Always Allow”." },
            { kind: "p", text: "Because the app isn’t signed yet, this can happen once after each update." },
          ],
        },
        {
          id: "git-missing",
          title: "It says git can’t be found",
          blocks: [
            { kind: "p", text: "Check the version in Terminal. You need 2.38 or later. If it’s missing or older, install it from git-scm.com and reopen the app." },
            { kind: "command", command: "git --version" },
          ],
        },
        {
          id: "remote-errors",
          title: "Push or pull fails",
          blocks: [
            { kind: "p", text: "The app shows the cause and how to fix it. The common cases:" },
            {
              kind: "list",
              items: [
                "SSH key not set up: create a key, add it to GitHub (or your server) and to your SSH agent. The app runs SSH without prompts so it never hangs waiting for a passphrase.",
                "Unknown host key: connect to that address once in Terminal to accept the host key.",
                "Permission denied: check that the account can push to the repository and that the token has repository access.",
                "Diverged from the remote: pull first. Pushing as is would overwrite it, so the app asks again.",
              ],
            },
          ],
        },
      ],
    },
  ],
  help: { text: "Still stuck? Let us know in a GitHub issue.", link: "Open a GitHub issue ↗" },
};

export default en;
