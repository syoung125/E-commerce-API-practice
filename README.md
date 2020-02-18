# E-commerce-API_practice
[USJ Advanced Technology] final project

## Task
"Amazon" like e-commerce:
There will be administrators (they don't sign up, they already exist in the system).
Many stores will sell through this e-commerce as if they were a single store.

*Administrators can:*
* Manage the categories the whole e-commerce. (Only 1 level of categorization) (Eg Electronics, Videogames, Home, Clothing, Sports, etc ...)
* Consult all sales of a given day
Stores can:
•	Sign up (store name, email, password)
•	Manage the products they sell:
•	Create products (name, description, category, price)
•	Add / remove stock of their products
•	Check their sales for a given day



*Users can:*
*	Sign up (name, email and password)
*	Query products:
1.	By category
2.	By price range
3.	The store is not relevant to the search, it doesn't matter the store that actually sells the products. (Nobody will search products by store)
•	Add reviews to a product
•	Query product reviews
•	Add products to the cart (there is only one cart per user and it is saved until confirmed or canceled)
•	Confirm the purchase.
•	The purchase of a product will trigger the sending of an email (dummy send, you can simulate it by writing on the console). But that dummy send will be programmed in a class called EmailService in the email.service.ts file and that you should use during the purchase confirmation.

