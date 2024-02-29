# app.py
from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Database setup
def create_db():
    conn = sqlite3.connect('chatbot.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS responses
                 (id INTEGER PRIMARY KEY, query TEXT, response TEXT)''')
    conn.commit()
    conn.close()

create_db()

# Route to handle user queries
@app.route('/query', methods=['POST'])
def handle_query():
    data = request.get_json()
    user_query = data['query']
    response = get_response(user_query)
    return jsonify({'response': response})

# Function to fetch response from the database
def get_response(query):
    conn = sqlite3.connect('chatbot.db')
    c = conn.cursor()
    c.execute("SELECT response FROM responses WHERE query=?", (query,))
    row = c.fetchone()
    conn.close()
    return row[0] if row else "Sorry, I don't understand that."

if __name__ == '__main__':
    app.run(debug=True)
