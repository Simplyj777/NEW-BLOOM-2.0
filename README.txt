New Bloom 2.0 starter files

Files included:
- index.html
- dashboard.html
- style.css
- firebase.js
- numerology.js
- zodiac.js
- script.js

Before running:
1. Put your real Firebase config into firebase.js
2. Turn on Firebase Authentication -> Email/Password
3. Turn on Firestore Database
4. Use VS Code Live Server or another local server

Testing Firestore rules:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /readings/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
