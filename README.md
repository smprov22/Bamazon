# bamazon

For this application, I created an Amazon-like storefront called "bamazon".  This is a CLI app, so there are screenshows below to see how it works. I used node, mysql, and javascript to complete this application. 

You can take two different paths in this app.  In the first path, you are the customer.  When running the app, a list of products is displayed for you. You choose which product you want to buy, and then choose the quantity you want.  If there is enough stock, the purchase is successful and you are given a total.   If there is not enough stock, you are given an error message and asked to try again.  In the second path, you are the manager.  As manager you have 4 options; view the products, view products with low inventory (less than 20 products in stock), add to inventory, and add products.  


This is the table that displays all the available products and their prices.  

![BamazonCustomer-viewproducts](/screenshots/bamazonCustomer-viewproducts.PNG)

Once a product and quantity are selected the app sends a confirmation that the sale was successful, displays the total price for the products, and then re-displays the table so the customer can make additional purchases.

![BamazonCustomer-salesuccessful](/screenshots/bamazonCustomer-selectproduct-amount-displaycost.PNG)

Here is another example of a successful sale.

![BamazonCustomer-salesuccessful2](/screenshots/bamazonCustomer-secondproduct.PNG)

This is what happens when a sale is unsuccessful due to lack of stock in the selected product.  The sale does not go through and the table is re-displayed so the customer can adjust their order.

![BamazonCustomer-unsuccessful](/screenshots/bamazonCustomer-notenoughproduct.PNG)

The next set of screenshots shows the manager pathway.  This first one shows the initial menu that pops up when the manager app is run.

![BamazonManager-menu](/screenshots/bamazonManager-menuoptions.PNG)

This is what is shown when the manager selects the view products option.  I included a menu to pop up after so the manager can take an additional action directly after viewing the products.

![BamazonManager-menu](/screenshots/bamazonManager-viewproducts-secondmenu.PNG)

This next screenshot is what is shown when the manager selects the low inventory option.  This table displays all products with an inventory less than 20.  Again, I included a menu for further action once the table is displayed.

![BamazonManager-menu](/screenshots/bamazonManager-lowinventory.PNG)

Next is what is shown when the manager selects the add inventory option.  The manager selects which product she/he would like to add inventory to, and how much she/he would like to add.  Then a menu with further actions comes up.

![BamazonManager-menu](/screenshots/bamazonManager-addinventory.PNG)

Lastly, this is the add product option.  The manager types in the name, department, price, and quantity of the new product.  After those are added a menu pops up again.  You can then view your products and verify that the new product was correctly added as the second screenshot shows.

![BamazonManager-menu](/screenshots/bamazonManager-addproduct1.PNG)

![BamazonManager-menu](/screenshots/bamazonManager-addproduct2.PNG)
