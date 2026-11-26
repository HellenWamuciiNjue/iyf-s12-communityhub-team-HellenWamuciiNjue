# MtaaConnect

**MtaaConnect** is a neighbourhood community platform where residents can connect with each other, share news, ask questions, post local issues, recommend services, and advertise what they offer.

Examples of what people can do on MtaaConnect:

- Ask "Does anyone know a reliable plumber near Bypass?"
- Share news and notices with their neighbourhood
- Report a local issue (lost pet, broken streetlight, security alert)
- Advertise a skill or service (tailoring, tutoring, deliveries)
- Build a profile that lists their neighbourhood, estate, skills and services

This README is the source of truth for the team: what we are building, who owns what, how the code is organised, and how to contribute.

---

## 1. Features

| Feature | Description | Status |
|---|---|---|
| Posts | Create, read, update and delete community posts (news, questions, issues, adverts), grouped by neighbourhood | Posts API merged (PR #18) |
| User profiles | Name, email, neighbourhood, estate, skills, services and contact info, with protected GET/PUT endpoints | Profile API merged (PR #19) |
| Authentication | Register, login, JWT tokens and route protection | JWT middleware merged; register/login routes in progress (Slice 4) |
| Comments | Residents can comment on posts | Planned (Slice 9) |
| Frontend pages | Layout, navigation, responsive design, register/login, profile page | In progress (Slices 1, 2, 3, 5) |

---

## 2. Project Slices and Owners

Work is split into numbered slices, each tracked as a GitHub Issue. **The Issues tab is the live source of truth.** Each issue lists its Owner, Reviewer and Backup.

| Slice | Issue | Scope | Owner | Reviewer | Backup |
|---|---|---|---|---|---|
| 1 | #8 | Project setup, layout and navigation (frontend) | Hellen Wamucii Njue (@HellenWamuciiNjue) | Florence Gitau (@gitau0076-cpu) | Yugi Ochieng Michael (@michael-yugi) |
| 2 | #9 | Responsive design and shared UI components | Florence Gitau (@gitau0076-cpu) | Stephen Githaiga Muriu (@Stephen-Dev254) | Lynnet Njoki (@lynnet-njangiru) |
| 3 | #10 | Register / login UI and protected routes | Yugi Ochieng Michael (@michael-yugi) | Hellen Wamucii Njue (@HellenWamuciiNjue) | Florence Gitau (@gitau0076-cpu) |
| 4 | #11 | Auth API: register, login, JWT, middleware | Nicodemus Muriuki (@RealNicdee) | Chukwuma Ndukwu (@chukwuma-n) | Kevin Shema (@ShemaKevin970) |
| 5 | #12 | Profile page UI | Stephen Githaiga Muriu (@Stephen-Dev254) | Aladin Sawe (@aladineesawe-GENKEMBOI) | Isaac Okach (@isaacokach) |
| 9 | #15 | Comments UI | Aladin Sawe (@aladineesawe-GENKEMBOI) | Yugi Ochieng Michael (@michael-yugi) | Lynnet Njoki (@lynnet-njangiru) |
| 11 | #16 | Database connection, env setup, deployment | Nicodemus Muriuki (@RealNicdee) | Hellen Wamucii Njue (@HellenWamuciiNjue) | Florence Gitau (@gitau0076-cpu) |
| 12 | #17 | Tests and API documentation | Hellen Wamucii Njue (@HellenWamuciiNjue) | Yugi Ochieng Michael (@michael-yugi) | Aladin Sawe (@aladineesawe-GENKEMBOI) |

Completed slices: Posts API (#14, by Kevin Shema), Profile API (by Chukwuma Ndukwu).

**Team leader and integrator:** Hellen Wamucii Njue (@HellenWamuciiNjue) manages the repository, reviews and merges pull requests, and keeps the pieces working together.

---

## 3. Tech Stack

- **Frontend:** HTML, CSS and JavaScript
- **Backend:** Node.js and Express
- **Database:** MongoDB Atlas, using Mongoose
- **Authentication:** JSON Web Tokens (JWT) with bcrypt password hashing
- **Client-side storage:** `localStorage` (the Posts API stores posts under the key `mtaaconnect_posts`)

---

## 4. Repository Structure

```
iyf-s12-communityhub-team-HellenWamuciiNjue/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   └── profileController.js # getProfile, updateProfile
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT "protect" middleware
│   ├── models/
│   │   └── User.js              # User schema (hashed password)
│   ├── routes/
│   │   └── profileRoutes.js     # Profile routes
│   ├── .gitignore               # Ignores .env and node_modules/
│   ├── package.json
│   └── server.js                # Express entry point
├── post.js                      # Posts API (CRUD on localStorage)
├── (frontend pages and css/js folders: see note below)
├── LICENSE
└── README.md
```

> **Team note:** the frontend files are still being set up. Update this tree as pages and folders are added, and move `post.js` into a `js/` folder if the team agrees.

---

## 5. Key Conventions

### Posts API (`post.js`)

Exposed globally as `window.PostsAPI`:

`getPosts()`, `getPostById(id)`, `createPost({ title, content, neighborhood, authorId, authorName })`, `updatePost(id, updates, currentUserId)`, `deletePost(id, currentUserId)`, `seedPostsIfEmpty()`

Only a post's author can edit or delete it.

### Profile API

All profile endpoints are **protected**: requests must send `Authorization: Bearer <token>`.

- `GET` returns the logged-in user's profile (the password is never returned).
- `PUT` updates only these fields: `name`, `email`, `neighborhood`, `estate`, `skills`, `services`, `contactInfo`.

### Security rules

- **Never commit secrets.** `.env` and `node_modules/` must stay out of Git.
- Passwords are hashed with bcrypt before saving. Any future "change password" feature must go through `save()`, not `findByIdAndUpdate`.

---

## 6. Running the Backend Locally

1. Clone the repository and go to the backend folder:

   ```bash
   git clone https://github.com/HellenWamuciiNjue/iyf-s12-communityhub-team-HellenWamuciiNjue.git
   cd iyf-s12-communityhub-team-HellenWamuciiNjue/backend
   npm install
   ```

2. Create a file called `.env` inside `backend/`. **Ask the team leader or Chukwuma privately for the values; never share them in the repo or a group chat.**

   ```
   MONGODB_URI=<your MongoDB Atlas connection string>
   JWT_SECRET=<a long random secret>
   ```

3. Start the server:

   ```bash
   node server.js
   ```

---

## 7. Git Workflow (mandatory for everyone)

The `main` branch is protected. **Nobody pushes directly to `main`.** Every change goes through a Pull Request that needs at least **1 approving review** before it can be merged.

**Step 1: Clone and open the project**

```bash
git clone https://github.com/HellenWamuciiNjue/iyf-s12-communityhub-team-HellenWamuciiNjue.git
cd iyf-s12-communityhub-team-HellenWamuciiNjue
code .
```

**Step 2: Create your feature branch**

```bash
git checkout -b feature-your-slice-name
```

**Step 3: Save your work**

```bash
git add .
git commit -m "Describe clearly what you added"
```

**Step 4: Push your branch**

```bash
git push origin feature-your-slice-name
```

**Step 5: Open a Pull Request on GitHub**

- Write a clear title and description.
- Write `Closes #<issue number>` (for example `Closes #11`) so the issue closes automatically when the PR is merged.
- Request a review from the reviewer named on the issue.

**If your branch is out of date or has conflicts:**

```bash
git checkout main
git pull origin main
git checkout feature-your-slice-name
git merge main
```

Fix any conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) in your editor, then `git add .`, commit, and push again.

---

## 8. Team Communication

- Comment on the issue you are working on so everyone can see who is active.
- If you are blocked, say so early and tag the team leader or the issue's Backup person.
- Push unfinished work to your branch regularly so others can help.

---

## 9. License

This project is released under the MIT License. See the `LICENSE` file.
