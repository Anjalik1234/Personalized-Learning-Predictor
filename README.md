# Personalized-Learning-Predictor
# Smart Learning Platform

An intelligent educational platform that helps students identify their learning styles and provides personalized learning recommendations based on their engineering background and quiz responses.

---

## 📋 Project Overview

This platform combines modern web technologies with machine learning to create an interactive learning environment that:
- Assesses students' learning styles
- Tracks educational background
- Creates personalized learning profiles
- Provides learning recommendations based on assessment results

## 🧮 Dataset Fields

| Field                    | Description                                 |
|--------------------------|---------------------------------------------|
| `user_id`               | Unique identifier                           |
| `academic_year`         | Year of engineering (FE, SE, TE, BE)        |
| `branch`                | Engineering branch                          |
| `skills`                | Random selected skills                      |
| `quiz_q1_response`-`q10`| Quiz answers (A/B/C)                        |
| `visual_percent`        | Visual learning score                       |
| `auditory_percent`      | Auditory learning score                     |
| `kinesthetic_percent`   | Kinesthetic learning score                  |
| `recommended_format`    | Suggested format (Videos, Podcasts, etc.)   |
| `recommended_courses`   | Personalized course suggestions             |
| `recommended_books`     | Personalized book suggestions               |
| `recommended_blogs`     | Personalized blog suggestions               |

---

## 🧠 Learning Styles Explained

| Style        | Behavior                        | Recommended Format |
|--------------|----------------------------------|---------------------|
| **Visual**   | Learns via diagrams, watching    | 🎥 Videos            |
| **Auditory** | Learns by listening & discussions| 🎧 Podcasts          |
| **Kinesthetic** | Learns by doing, hands-on     | 🧪 Projects           |

---

## 🛠️ How It Works

1. **Data Generation**
   - Random quiz combinations (3¹⁰ = 59,049) simulate student behavior
   - Each student is assigned:
     - A random branch
     - A random skill set
     - A quiz response pattern (A/B/C)

2. **Learning Style Analysis**
   - Based on quiz responses:
     - Percentages for V/A/K styles are calculated
     - Dominant style is determined
     - Relevant learning resources are fetched live from the web

3. **Resource Generation**
   - Data is saved into a `.csv` file
   - Recommendations are branch-specific and learning-style filtered

---

## 🌐 Live Resource Fetching

The platform uses real-time scraping from trusted educational websites:
- **Courses**: Udemy, Coursera, freeCodeCamp, etc.
- **Books**: Goodreads, GitHub curated lists
- **Blogs**: Medium, Dev.to, freeCodeCamp blogs

---

## 🛠️ Tech Stack

- **Frontend**: React.js with modern UI components
- **Backend**: Node.js, Express.js
- **AI API**: Google Generative Language API (Gemini Pro)
- **Environment Management**: dotenv
- **Middleware**: CORS, JSON body parser
- **ML Integration**: Flask for ML API

---

## 📁 Project Structure

```
SUPERNova/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── login.jsx
│   │   │   ├── EducationalBackground.jsx
│   │   │   ├── LearningStyleAssessment.jsx
│   │   │   └── LearningProfile.jsx
│   │   └── App.js
│   ├── public/
│   └── package.json
├── backend/
│   ├── server.js
│   └── package.json
└── ml/
    ├── model.pkl
    ├── feature_columns.pkl
    └── training datasets
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/smart-learning-api.git
cd smart-learning-api
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Install ML dependencies
cd ../ml
pip install -r requirements.txt
```

### 3. Set Up Environment Variables

Create a `.env` file in the backend directory:

```ini
GEMINI_API_KEY=AIzaSyXXXXXXX-YOUR-GEMINI-API-KEY
```

### 4. Running the Application

1. Start the backend server:
```bash
cd backend
node server.js
```

2. Start the ML API:
```bash
cd ml
python app.py
```

3. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

---

## 🧪 Example Output

```csv
user_id,academic_year,branch,skills,...,recommended_format,recommended_courses,recommended_books,recommended_blogs
100001,Third Year (TE),Computer Science Engineering,"Python, SQL, Linux",...,Visual,"HTML5 Crash Course","Designing Interfaces","frontenddesign.blog"
```

---

## 📝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---


## 🙏 Acknowledgments

- Thanks to the React and Node.js communities
- Thanks to scikit-learn for the ML capabilities
- Thanks to Google for the Gemini API
- Thanks to all contributors who have helped improve this project
