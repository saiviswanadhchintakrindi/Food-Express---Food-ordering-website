from flask import Flask, render_template, request

app = Flask(__name__)

restaurant_data = {
    "pizza_house": {
        "name": "Pizza House",
        "dishes": [
            {"name": "Cheese Pizza", "price": "12.99", "img": "cheese_pizza.jpg"},
            {"name": "Veggie Pizza", "price": "11.49", "img": "veggie_pizza.jpg"},
        ]
    },
    "burger_king": {
        "name": "Burger King",
        "dishes": [
            {"name": "Beef Burger", "price": "9.99", "img": "beef_burger.jpg"},
            {"name": "Chicken Burger", "price": "8.49", "img": "chicken_burger.jpg"},
        ]
    },
    # Add more restaurants
}

@app.route("/restaurant/<name>")
def restaurant(name):
    data = restaurant_data.get(name)
    if not data:
        return "Restaurant not found", 404
    return render_template("restaurant.html", restaurant=data)
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/pizza_house')
def pizza_house():
    return render_template('pizza_house.html')

@app.route('/burger_king')
def burger_king():
    return render_template('burger_king.html')

@app.route('/sushi_master')
def sushi_master():
    return render_template('sushi_master.html')

@app.route('/placeorder', methods=['GET','POST'])
def placeorder():
    
    cart_data = request.form.get('cart')
    return render_template('confirm.html', cart=cart_data)
@app.route('/thankyou')
def thankyou():
    return render_template('thank_you.html')

@app.route('/orders')
def orders():
    return "My Orders Page (To be implemented)"

if __name__ == '__main__':
    app.run(debug=False)
