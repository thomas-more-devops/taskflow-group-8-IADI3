# TaskFlow Setup Guide

> Everything you need to install, run, develop and deploy TaskFlow on your own machine.

TaskFlow is a **static, client-side web application** written in plain HTML5, CSS3 and JavaScript (ES6+). There is **no backend, no database server, no package manager and no build step**. Installing it means getting the files onto your computer and opening them in a browser.

---

## 📑 Table of Contents

1. [Requirements](#-requirements)
2. [Quick Start (2 minutes)](#-quick-start-2-minutes)
3. [Step 1: Get the Source Code](#-step-1-get-the-source-code)
4. [Step 2: Run the Application](#-step-2-run-the-application)
5. [Step 3: Verify the Installation](#-step-3-verify-the-installation)
6. [Project Structure](#-project-structure)
7. [How the App Works at Runtime](#-how-the-app-works-at-runtime)
8. [Development Setup](#-development-setup)
9. [Git Workflow for Team Members](#-git-workflow-for-team-members)
10. [Deploying to GitHub Pages](#-deploying-to-github-pages)
11. [Managing Your Data](#-managing-your-data)
12. [Troubleshooting](#-troubleshooting)
13. [Uninstalling](#-uninstalling)

---

## ✅ Requirements

### Required

| Tool | Version | Why you need it |
|------|---------|-----------------|
| A modern web browser | Chrome, Edge, Firefox or Safari (any current release) | Runs the application |
| Git | 2.x or newer | Cloning the repository and contributing changes |

Check that Git is installed:

```bash
git --version
# git version 2.x.x
```

If it is missing, download it from [git-scm.com/downloads](https://git-scm.com/downloads).

### Optional

| Tool | Used for |
|------|----------|
| [Visual Studio Code](https://code.visualstudio.com/) | Recommended code editor |
| VS Code extension **Live Server** (Ritwick Dey) | Local server with automatic reload on save |
| Python 3 | Serving the app over `http://localhost` with one command |
| Node.js 18+ | Alternative local server via `npx serve` |
| A GitHub account | Pushing changes, opening pull requests, GitHub Pages |

> **Note:** Node.js is **not** a project dependency. There is no `package.json` and nothing to `npm install`. It is only listed as one of several ways to start a local web server.

### Internet connection

The app itself works offline. The only external resource is the **Inter** font, loaded from Google Fonts in `index.html`. Without internet, the browser falls back to its default sans-serif font and everything else keeps working.

---

## ⚡ Quick Start (2 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/thomas-more-devops/taskflow-group-8-IADI3.git

# 2. Enter the project folder
cd taskflow-group-8-IADI3

# 3. Start a local web server (pick one)
python3 -m http.server 8000      # Python 3
# or
npx serve .                      # Node.js
```

Then open **http://localhost:8000** in your browser (for `npx serve`, use the URL it prints, usually http://localhost:3000).

Prefer not to use a terminal? Simply double-click `index.html`. See [Option A](#option-a-open-the-file-directly) below.

---

## 📥 Step 1: Get the Source Code

Choose the method that fits your role.

### Option 1: Clone with HTTPS (recommended for team members)

```bash
git clone https://github.com/thomas-more-devops/taskflow-group-8-IADI3.git
cd taskflow-group-8-IADI3
```

When you push for the first time, GitHub asks you to authenticate. Use a [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) or sign in through Git Credential Manager; your GitHub password will not work.

### Option 2: Clone with SSH

Requires an SSH key added to your GitHub account ([guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)).

```bash
git clone git@github.com:thomas-more-devops/taskflow-group-8-IADI3.git
cd taskflow-group-8-IADI3
```

### Option 3: Download as ZIP (no Git needed)

1. Open the repository page on GitHub.
2. Click the green **Code** button, then **Download ZIP**.
3. Extract the archive to any folder.

> ZIP downloads are not connected to Git. Use this only to try the app, not to contribute.

### Option 4: Fork (external contributors)

If you are not a member of the organization, click **Fork** on GitHub, then clone **your fork**:

```bash
git clone https://github.com/<your-username>/taskflow-group-8-IADI3.git
cd taskflow-group-8-IADI3
git remote add upstream https://github.com/thomas-more-devops/taskflow-group-8-IADI3.git
```

---

## 🚦 Step 2: Run the Application

Because TaskFlow is a static site, any of the methods below will work. They only differ in convenience.

### Option A: Open the file directly

Double-click `index.html`, or drag it into a browser window. The address bar will show a `file://` path.

- ✅ Zero setup
- ⚠️ Tasks saved here are stored separately from tasks saved when running via `http://localhost` (see [Managing Your Data](#-managing-your-data))

### Option B: Python built-in server

```bash
# From the project root
python3 -m http.server 8000
```

Open **http://localhost:8000**. Stop the server with `Ctrl + C`.

> On Windows, the command may be `python -m http.server 8000` or `py -m http.server 8000`.

### Option C: Node.js (`npx serve`)

```bash
# From the project root
npx serve .
```

`npx` downloads `serve` temporarily on first run; nothing is added to the project. Open the URL printed in the terminal.

### Option D: VS Code Live Server (best for development)

1. Open the project folder in VS Code (`File → Open Folder…`).
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **Open with Live Server**.

The page opens at `http://127.0.0.1:5500` and **reloads automatically** whenever you save a file.

### Which option should I use?

| Goal | Recommended |
|------|-------------|
| Just try the app | Option A |
| Develop and edit code | Option D |
| Test in an environment close to GitHub Pages | Option B or C |

---

## 🔍 Step 3: Verify the Installation

After the page loads, check the following:

- [ ] The header shows **📋 TaskFlow** and the subtitle *"Streamline your productivity"*.
- [ ] The empty state *"No tasks yet"* is visible and the input field is focused.
- [ ] Typing a task and pressing **Enter** (or clicking **Add Task**) adds it to the list and shows a green notification.
- [ ] Clicking the checkbox marks the task as completed, and the statistics cards update.
- [ ] ✏️ opens an edit prompt; 🗑️ asks for confirmation and deletes the task.
- [ ] After **reloading the page**, your tasks are still there.

Open the browser Developer Tools (`F12` or `Ctrl + Shift + I` / `Cmd + Option + I`) and look at the **Console** tab. You should see:

```
TaskFlow initialized successfully!
```

and no red error messages. If all boxes are ticked, the installation is complete. 🎉

---

## 📁 Project Structure

```
taskflow-group-8-IADI3/
├── index.html          # Entry point: page markup, loads CSS, font and script
├── styles/
│   └── main.css        # All styling, animations and responsive breakpoints
├── scripts/
│   └── app.js          # TaskFlow class: task logic, rendering, storage
├── docs/
│   ├── SETUP.md        # This guide
│   └── FEATURES.md     # Feature documentation
├── .gitignore          # Files Git should not track
├── LICENSE.txt         # MIT License
└── README.md           # Project overview
```

All paths inside `index.html` are **relative** (`styles/main.css`, `scripts/app.js`), so the project runs correctly from any folder or sub-path, including GitHub Pages.

---

## 🧠 How the App Works at Runtime

Understanding this helps when debugging:

1. The browser loads `index.html`, which links `styles/main.css`, the Inter font and `scripts/app.js`.
2. On `DOMContentLoaded`, the script creates a single instance: `window.taskFlow = new TaskFlow()`.
3. The constructor reads existing tasks from **`localStorage`**, binds the button and Enter-key events, renders the list and updates the statistics.
4. Every change (add, toggle, edit, delete) is written back to `localStorage` immediately.

### Configuration

There are **no environment variables or configuration files**. The only persistent settings are two `localStorage` keys:

| Key | Content |
|-----|---------|
| `taskflow_tasks` | JSON array of task objects: `id`, `text`, `completed`, `createdAt`, `completedAt` |
| `taskflow_counter` | Next numeric ID to assign to a new task |

### Responsive breakpoints

Defined in `styles/main.css`:

| Screen width | Layout |
|--------------|--------|
| > 768px | Desktop layout |
| ≤ 768px | Tablet: input and button stack vertically |
| ≤ 480px | Mobile: compact spacing |

Use the device toolbar in Developer Tools (`Ctrl + Shift + M` / `Cmd + Shift + M`) to test them.

---

## 💻 Development Setup

1. **Clone** the repository (see [Step 1](#-step-1-get-the-source-code)).
2. **Open** the folder in your editor.
3. **Start** Live Server (or any option from [Step 2](#-step-2-run-the-application)).
4. **Edit** the files:
   - Markup → `index.html`
   - Styles → `styles/main.css`
   - Behaviour → `scripts/app.js`
5. **Save** and refresh the browser (automatic with Live Server).

### Tips

- **Hard refresh** after changing CSS or JS if you do not see your changes: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (macOS).
- **Disable the cache** while Developer Tools are open: *Network* tab → tick **Disable cache**.
- **Inspect saved data**: Developer Tools → *Application* (Chrome/Edge) or *Storage* (Firefox) → *Local Storage*.
- **Use the console**: the app instance is available globally as `taskFlow`:

  ```javascript
  taskFlow.tasks            // current task array
  taskFlow.getTaskStats()   // totals plus tasks created/completed today
  taskFlow.exportTasks()    // download tasks as taskflow_backup.json
  taskFlow.clearAllTasks()  // delete all tasks (asks for confirmation)
  ```

### Testing

The project has no automated test suite. Use the manual checklist in [Step 3](#-step-3-verify-the-installation) and the *Testing* section of the [README](../README.md) before opening a pull request. Test at least one Chromium-based browser and Firefox, and check the mobile layout.

---

## 🔀 Git Workflow for Team Members

Configure your identity once per machine:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Daily workflow:

```bash
git checkout main
git pull origin main                     # 1. Get the latest changes
git checkout -b feature/short-name       # 2. Create a feature branch
# ... edit files and test in the browser ...
git add .                                # 3. Stage your changes
git commit -m "feat: short description"  # 4. Commit (Conventional Commits)
git push -u origin feature/short-name    # 5. Push the branch
# 6. Open a Pull Request on GitHub and ask a teammate for review
```

Commit message prefixes used in this project:

| Prefix | Use for |
|--------|---------|
| `feat:` | A new feature |
| `fix:` | A bug fix |
| `docs:` | Documentation only |
| `style:` | Formatting, no logic change |
| `refactor:` | Code restructuring |
| `test:` | Adding or updating tests |
| `chore:` | Maintenance tasks |

Fork users keep their fork up to date with:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

---

## 🚀 Deploying to GitHub Pages

TaskFlow needs no build, so it can be published straight from the repository.

1. Go to the repository on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Select branch **`main`** and folder **`/ (root)`**, then click **Save**.
4. Wait a minute or two. The site will be published at:

   ```
   https://thomas-more-devops.github.io/taskflow-group-8-IADI3/
   ```

Every push to `main` redeploys the site automatically.

> **Permissions:** changing Pages settings requires admin rights on the repository. If you do not see the **Pages** menu, ask your instructor or the organization owner. Pages availability for private repositories also depends on the organization's GitHub plan.

---

## 💾 Managing Your Data

Tasks live **only in your browser's `localStorage`**. Nothing is sent to a server.

Things to know:

- Data is stored **per browser and per origin**. Tasks created at `file://…/index.html`, `http://localhost:8000`, `http://127.0.0.1:5500` and the GitHub Pages URL are four separate lists.
- Private/incognito windows start empty and forget everything when closed.
- Clearing browsing data or site data deletes your tasks.

**Back up your tasks** (in the browser console):

```javascript
taskFlow.exportTasks()   // saves taskflow_backup.json to your Downloads folder
```

**Reset the app** to a clean state:

```javascript
localStorage.removeItem('taskflow_tasks');
localStorage.removeItem('taskflow_counter');
location.reload();
```

---

## 🧯 Troubleshooting

| Problem | Likely cause | Solution |
|---------|--------------|----------|
| Page has no styling | `styles/` folder missing or the file was moved | Keep the folder structure intact; open `index.html` from the project root |
| Buttons do nothing | `scripts/app.js` failed to load or threw an error | Open the Console (`F12`) and read the error; check the file path |
| Tasks disappear after reload | Private window, cleared site data, or a different URL/port | Use a normal window and always the same address (see [Managing Your Data](#-managing-your-data)) |
| *"Failed to save tasks…"* notification | Storage is full or blocked by browser privacy settings | Allow site data for this page, or free up storage |
| Font looks different | No internet; Google Fonts could not load | Expected offline; the fallback font is used |
| Changes to CSS/JS not visible | Browser cache | Hard refresh (`Ctrl/Cmd + Shift + R`) |
| `python3: command not found` | Python not installed or named differently | Try `python` or `py`, or use another option from [Step 2](#-step-2-run-the-application) |
| `Address already in use` | Port 8000 is busy | Use another port: `python3 -m http.server 8080` |
| `git push` asks for a password and fails | GitHub no longer accepts account passwords | Use a Personal Access Token, SSH, or Git Credential Manager |
| `403 Permission denied` on push | You are not a collaborator on the repository | Ask to be added, or work from a fork |

Still stuck? Open an issue on GitHub with your browser, operating system, the steps you followed and any console errors.

---

## 🧹 Uninstalling

TaskFlow installs nothing system-wide. To remove it:

1. Delete the project folder.
2. Optionally clear its saved tasks (see [Reset the app](#-managing-your-data)) or remove site data for the address you used.

---

## 📚 Related Documentation

- [README](../README.md): project overview and usage
- [FEATURES.md](FEATURES.md): detailed feature documentation
- [LICENSE.txt](../LICENSE.txt): MIT License
