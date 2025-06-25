import sqlite3

conn = sqlite3.connect('orders.db')  # This will create the file if it doesn't exist
c = conn.cursor()

# Create table query example
c.execute('''
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dish_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL
)
''')

conn.commit()
conn.close()
print("Database initialized successfully.")
