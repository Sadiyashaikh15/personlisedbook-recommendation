# Quick Start Guide - BookWise MVP

## 🚀 Getting Started

### Prerequisites
- Backend running: `npm start` in `book-recommendation-backend/` (Port 5000)
- Frontend running: `npm run dev` in `book-recommendation-frontend/`

### Files You Need to Know

**New Files:**
- `src/context/UserContext.jsx` - Global user state management
- `src/pages/Dashboard.jsx` - User dashboard with recommendations

**Modified Files:**
- `src/App.jsx` - Wraps app with UserProvider, adds Dashboard route
- `src/pages/Login.jsx` - Now connects to backend API
- `src/components/Navbar.jsx` - Shows logout button when logged in

---

## 🧪 Test The MVP (5 minutes)

### 1️⃣ Test Login
```
1. Go to: http://localhost:5173/login
2. Enter: sadiya@email.com
3. Click: Sign In
4. Expected: Redirected to Dashboard
```

### 2️⃣ Test Dashboard Shows User Info
```
1. You should see:
   - Avatar with "S"
   - "Welcome, Sadiya!" heading
   - Email: sadiya@email.com
   - Genre: Self Help
```

### 3️⃣ Test Recommendations Load
```
1. Below user info, see 3 books:
   - Atomic Habits (Self Help)
   - The Power of Habit (Self Help)
   - Think and Grow Rich (Self Help)
2. Books should show cover images and details
```

### 4️⃣ Test localStorage Persistence
```
1. Open DevTools (F12)
2. Go to: Application → Storage → localStorage
3. Look for key "user" with value containing:
   "Sadiya", "sadiya@email.com", "Self Help"
4. Refresh page (F5)
5. Expected: Still logged in (no redirect to login)
```

### 5️⃣ Test Logout
```
1. Click "Logout" button in Navbar (red button, top right)
2. Expected: Redirected to Home
3. Navbar should now show "Sign In" button
4. In DevTools localStorage: "user" key should be gone
```

### 6️⃣ Test Mobile Menu
```
1. Resize browser to mobile (< 768px)
2. Click hamburger menu
3. Should see: Dashboard link and Logout button
4. Click logout: redirects home, menu closes
```

---

## 📊 Architecture

```
UserContext (Global State)
  ├── user: { id, name, email, favorite_genre }
  ├── login(userData): saves to context + localStorage
  └── logout(): clears context + localStorage

App.jsx (wrapped with UserProvider)
  ├── Navbar (shows logout when user exists)
  ├── Home (public, /api/books)
  ├── Login (connects to /api/login)
  └── Dashboard (protected, /api/recommendations/:userId)
```

---

## 🔌 API Endpoints Used

### Login
- **POST** `/api/login`
- **Request:** `{ email: "sadiya@email.com" }`
- **Response:** `{ success: true, user: { id, name, email, favorite_genre } }`

### Recommendations
- **GET** `/api/recommendations/1`
- **Returns:** Array of books matching user's favorite_genre

---

## 🛠️ If Something Breaks

### Login redirects to login infinitely
- Check backend is running on port 5000
- Check `/api/login` endpoint returns: `{ success: true, user: {...} }`
- Check Network tab in DevTools for error response

### Recommendations don't load
- Verify backend `/api/recommendations/1` returns books
- Check console for fetch error
- Verify user.id is correct (should be `1` for Sadiya)

### localStorage not persisting
- Check in DevTools: Application → Storage → localStorage
- Look for key `user` with JSON value
- If missing, login wasn't successful

### Logout doesn't work
- Check console for errors
- Verify localStorage `user` key is deleted after logout
- Check Navbar imports UserContext correctly

---

## 📝 Key Implementation Details

### Login Flow
```javascript
1. User enters email: "sadiya@email.com"
2. Form submits to: POST /api/login
3. Backend returns: { success: true, user: {...} }
4. Frontend calls: login(data.user)
5. UserContext saves to context + localStorage
6. Redirect to: /dashboard
```

### Dashboard Protected
```javascript
useEffect(() => {
  if (!user) {
    navigate('/login');  // Redirect if not logged in
    return;
  }
  fetchRecommendations();
}, [user]);
```

### Navbar Conditional
```javascript
{user ? (
  <Logout button>
) : (
  <Sign In button>
)}
```

---

## ✅ What's Working

- ✅ Login form connected to backend
- ✅ User stored in localStorage
- ✅ Dashboard displays user info
- ✅ Recommendations fetch and display
- ✅ Logout clears user
- ✅ Mobile responsive
- ✅ Error handling
- ✅ Loading states

## ❌ What's Not Yet (Coming Later)

- ❌ Password hashing
- ❌ JWT tokens
- ❌ User registration
- ❌ Edit profile
- ❌ Favorites
- ❌ Ratings & reviews

---

## 🚨 Important Notes

### Database Users
Currently only 1 user in database:
```
id: 1
name: Sadiya
email: sadiya@email.com
favorite_genre: Self Help
```

### Books in "Self Help" Genre
- Atomic Habits (James Clear)
- The Power of Habit (Charles Duhigg)
- Think and Grow Rich (Napoleon Hill)

### No JWT Yet
- User object is plain JSON in localStorage
- Safe because no password field yet
- Will add JWT after this MVP phase

---

## 📚 File Reference

**Entry Point:**
- `src/main.jsx` - Renders App

**Global:**
- `src/App.jsx` - Router setup, UserProvider wrapper
- `src/context/UserContext.jsx` - User state + localStorage

**Components:**
- `src/components/Navbar.jsx` - Navigation with logout
- `src/components/bookcard/BookCard.jsx` - Book display (unchanged)

**Pages:**
- `src/pages/Home.jsx` - Browse all books (unchanged)
- `src/pages/Login.jsx` - Login form (UPDATED)
- `src/pages/Dashboard.jsx` - User profile + recommendations (NEW)

---

## 🎯 Next Steps

1. **Test everything above** ✅
2. **Test on mobile** ✅
3. **Test localStorage persistence** ✅
4. **Ready for JWT** when needed

---

**Need Help?**
- Check IMPLEMENTATION_SUMMARY.md for detailed changes
- Check PROJECT_ANALYSIS.md for architecture overview
- Check browser console for errors (F12)
- Check Network tab to see API responses
