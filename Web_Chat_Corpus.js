// {Name: Web_Chat_Corpus}
// {Description: Contains a text corpus for a web chat.}

// This example demonstrates how to add a text AI chat to your web page, website or web app.
// In this example, you can find corpus for Q&A answering and commands to navigate in the web page.
// Get the web page with the text AI chat for this example here: https://github.com/alan-ai/website-chat-demo
// Check out a live demo at: https://alan-ai.github.io/website-chat-demo/

// Web page corpus
corpus(
    {url: "https://alan-ai.github.io/website-chat-demo/", depth: 1},
);

intent(
    "What burgers do you have?",
    p => {
        p.play("Hey there! 🍔 If you're wondering about our burgers, let me tell you, we've got some mouthwatering choices. How about trying our classic Bacon Burger, or maybe the cheesy goodness of our Cheeseburger Deluxe? Oh, and if you're into mushrooms, our Mushroom Swiss Burger is a must-try. Feeling adventurous? Give our Spicy Jalapeño Burger a shot! And for all the BBQ lovers, don't miss out on our BBQ Ranch Burger.");
    }
);

intent(
    "What drinks do you offer?",
    p => {
        p.play("For drinks 🥤, we've got a variety to keep you refreshed. Fancy some lemony goodness? Our Classic Lemonade's got you covered. Or perhaps a cool Iced Tea is more your style? And for all you mango fans, our Mango Smoothie is a tropical treat. Plus, we've got the classics: Cola, Fanta, and Sprite, always a hit!");
    }
);

intent(
    "What sides do you have?",
    p => {
        p.play("Lastly, sides 🍟. Because what's a burger without some tasty sides, right? Our French Fries are crispy perfection, and our Onion Rings? Let's just say they're crunch-tastic!");
    }
);

// buy burgers drinks and sides

const PRODUCTS = [
  { id: "1", type: "burger", name: 'Bacon Burger', description: 'A classic burger topped with crispy bacon.', img: 'burger.jpg', price: 6.99 },
  { id: "2", type: "burger", name: 'Cheeseburger Deluxe', description: 'A juicy burger with melted cheese and fresh vegetables.', img: 'burger.jpg', price: 7.49 },
  { id: "3", type: "burger", name: 'Mushroom Swiss Burger', description: 'A flavorful burger topped with sautéed mushrooms and Swiss cheese.', img: 'burger.jpg', price: 8.29 },
  { id: "4", type: "burger", name: 'Spicy Jalapeño Burger', description: 'A fiery burger with jalapeño slices and spicy mayo.', img: 'burger.jpg', price: 7.99 },
  { id: "5", type: "burger", name: 'BBQ Ranch Burger', description: 'A tangy burger with BBQ sauce, crispy onion rings, and ranch dressing.', img: 'burger.jpg', price: 8.49 },
  
  { id: "6", type: "side", name: 'French Fries', description: 'Crispy golden fries seasoned to perfection.', img: 'fries.jpg', price: 2.99 },
  { id: "7", type: "side", name: 'Onion Rings', description: 'Crunchy battered onion rings with a savory flavor.', img: 'onionRings.jpg', price: 3.49 },
  
  { id: "8", type: "drink", name: 'Cola', description: 'Classic cola flavor with a hint of vanilla.', img: 'cola.jpg', price: 2.49 },
  { id: "9", type: "drink", name: 'Fanta', description: 'Bright and bubbly orange soda.', img: 'fanta.png', price: 2.49 },
  { id: "10", type: "drink", name: 'Sprite', description: 'Refreshing lemon-lime soda.', img: 'sprite.png', price: 2.49 }
];


let arrProductAliases = PRODUCTS.map(product => product.name.toLowerCase());

project.websiteProducts = arrProductAliases.join('|');

intent(
    "(Add) $(NUMBER) $(p:websiteProducts)",
    p => {
        const quantity = p.NUMBER.number;
        const productName = p.websiteProducts.value.toLowerCase();
        const product = PRODUCTS.find(product => product.name.toLowerCase() === productName);

       
        console.log(product);
        p.play({command: "addProduct", product: product, quantity: quantity}, opts({force:true}));
        console.log("test");
        
        p.play("Adding "+productName+" to shoppingcart");
    }
);

intent(
    "(Clear | Empty | Delete) (Cart | Basket | Shopping Basket)",
    p => {
        p.play({command: "clearCart"}, opts({force:true}));
        p.play("Clearing shoppingcart");
    }
)

intent(
    "(Delete | Remove) $(p:websiteProducts)",
    p => {
        const productName = p.websiteProducts.value.toLowerCase();
        const product = PRODUCTS.find(product => product.name.toLowerCase() === productName);
        
        p.play({command: "removeFromCart", product: product}, opts({force:true}));
        
        p.play("Deleting "+productName+" from basket.");
    }
)

