# SummarizeIQ

**SummarizeIQ** is an **AI-powered text summarization app** built using **React** (frontend) and **Node.js + Express** (backend). It uses **OpenAI GPT-4o-mini** to generate high-quality summaries of any text with options for short, medium, or detailed output.

---

## Features

- Paste text and get **AI-generated summaries**
- Choose summary length: **Short**, **Medium**, or **Detailed**
- Real-time **word & character count**
- Download the summary as a **.txt file**
- Responsive UI built with **Tailwind CSS**
- Markdown rendering for clean summary display

---

## Demo

Since the app is not deployed, a **demo video** is available in the repository.
[Watch the Demo on YouTube](https://youtu.be/pVsfAzyeVDM)
---

## Tech Stack

- **Frontend:** React, Axios, Tailwind CSS
- **Backend:** Node.js, Express, OpenAI API
- **Other:** dotenv, marked

---

## How It Works

1. Enter or paste text into the input area.
2. Select the summary length (**Short**, **Medium**, or **Detailed**).
3. Click **Summarize** to send the request to the backend.
4. Backend uses **OpenAI API** to generate a summary and returns it.
5. View, download, or copy the generated summary.

---

## 🔧 Installation & Setup

```bash
# 1. Clone the Repository
git clone https://github.com/your-username/SummarizeIQ.git
cd SummarizeIQ

# 2. Install Dependencies

# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install

# 3. Add OpenAI API Key
# Create a .env file inside backend/ and add:
OPENAI_API_KEY=your_openai_api_key

# 4. Run the App

# Start backend (port 5000)
cd backend
node server.js

# Start frontend (port 3000)
cd ../frontend
npm start
```

## Future Enhancements

- Add dark mode
- Support for PDF/DOCX file uploads
- Add summary history for logged-in users
- Copy to clipboard feature

## License

This project is licensed under the **MIT License**.
Feel free to use, modify, and distribute for personal and commercial purposes.

---

## Contribution

Contributions, issues, and feature requests are welcome!
Feel free to fork this repo and submit a pull request.

---

## Contact

Created with ❤️ by Sushmitha Shettigar
Reach out via [LinkedIn](https://www.linkedin.com/in/sushmithashettigar/) or [GitHub](https://github.com/sushmithashettigar29)

```
