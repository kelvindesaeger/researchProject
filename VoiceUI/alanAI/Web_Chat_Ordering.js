// Web page corpus
corpus({ url: 'https://alan-ai.github.io/website-chat-demo/', depth: 1 })

/*
    burgers info
*/

intent('What burgers do you have?', p => {
  p.play(
    { command: 'scrollToSection', section: 'burgers' },
    opts({ force: true }),
  )
  p.play(
    "If you're wondering about our burgers, let me tell you, we've got some mouthwatering choices. How about trying our classic Bacon Burger, or maybe the cheesy goodness of our Cheeseburger Deluxe? Oh, and if you're into mushrooms, our Mushroom Swiss Burger is a must-try. Feeling adventurous? Give our Spicy Jalapeño Burger a shot! And for all the BBQ lovers, don't miss out on our BBQ Ranch Burger.",
  )
})

intent('What is on the $(p:websiteProducts)', p => {
  const productName = p.websiteProducts.value.toLowerCase()
  p.play(productName)
  const product = PRODUCTS.find(
    product => product.name.toLowerCase() == productName,
  )
  p.play('The ' + product.name + ' consists of ' + product.description)
})

intent('What drinks do you offer?', p => {
  p.play(
    { command: 'scrollToSection', section: 'drinks' },
    opts({ force: true }),
  )
  p.play('We offer Cola, Fanta, and Sprite - classic and refreshing choices!')
})

intent('What sides do you have?', p => {
  p.play(
    { command: 'scrollToSection', section: 'sides' },
    opts({ force: true }),
  )
  p.play(
    "We offer 2 different sides. Our French Fries are crispy perfection, and our Onion Rings? Let's just say they're crunch-tastic!",
  )
})

/*
    custom burger info
*/

intent('What buns (do you|are) (have|offer|there)', p => {
  p.play('We have a' + INGREDIENTS.buns.join(', ') + ' bun.')
})

intent('What proteins (do you|are) (have|offer|there)', p => {
  p.play('We have ' + INGREDIENTS.protein.join(', '))
})

intent('What toppings (do you|are) (have|offer|there)', p => {
  p.play('We have ' + INGREDIENTS.toppings.join(', '))
})

intent('What sauce (do you|is) (have|offer|there)', p => {
  p.play('We have ' + INGREDIENTS.protein.join(', ') + ' bun.')
})

// buy burgers drinks and sides

const PRODUCTS = [
  {
    id: '1',
    type: 'burger',
    name: 'Bacon Burger',
    description: 'A classic burger topped with crispy bacon.',
    img: 'burger.jpg',
    price: 6.99,
  },
  {
    id: '2',
    type: 'burger',
    name: 'Cheeseburger Deluxe',
    description: 'A juicy burger with melted cheese and fresh vegetables.',
    img: 'burger.jpg',
    price: 7.49,
  },
  {
    id: '3',
    type: 'burger',
    name: 'Mushroom Swiss Burger',
    description:
      'A flavorful burger topped with sautéed mushrooms and Swiss cheese.',
    img: 'burger.jpg',
    price: 8.29,
  },
  {
    id: '4',
    type: 'burger',
    name: 'Spicy Jalapeño Burger',
    description: 'A fiery burger with jalapeño slices and spicy mayo.',
    img: 'burger.jpg',
    price: 7.99,
  },
  {
    id: '5',
    type: 'burger',
    name: 'BBQ Ranch Burger',
    description:
      'A tangy burger with BBQ sauce, crispy onion rings, and ranch dressing.',
    img: 'burger.jpg',
    price: 8.49,
  },

  {
    id: '6',
    type: 'side',
    name: 'French Fries',
    description: 'Crispy golden fries seasoned to perfection.',
    img: 'fries.jpg',
    price: 2.99,
  },
  {
    id: '7',
    type: 'side',
    name: 'Onion Rings',
    description: 'Crunchy battered onion rings with a savory flavor.',
    img: 'onionRings.jpg',
    price: 3.49,
  },

  {
    id: '8',
    type: 'drink',
    name: 'Cola',
    description: 'Classic cola flavor with a hint of vanilla.',
    img: 'cola.jpg',
    price: 2.49,
  },
  {
    id: '9',
    type: 'drink',
    name: 'Fanta',
    description: 'Bright and bubbly orange soda.',
    img: 'fanta.png',
    price: 2.49,
  },
  {
    id: '10',
    type: 'drink',
    name: 'Sprite',
    description: 'Refreshing lemon-lime soda.',
    img: 'sprite.png',
    price: 2.49,
  },
]

const INGREDIENTS = {
  buns: ['Classic', 'Whole Wheat', 'Gluten Free'],
  protein: ['Beef', 'Pork', 'Chicken', 'Tofu'],
  toppings: [
    'Lettuce',
    'Tomato',
    'Onion',
    'Pickles',
    'Cheese',
    'Bacon',
    'Mushrooms',
    'Jalapenos',
    'Avocado',
    'Fried Egg',
  ],
  sauce: ['BBQ', 'Mayonnaise', 'Cocktail'],
}

let arrProductAliases = PRODUCTS.map(product => product.name.toLowerCase())

project.websiteProducts = arrProductAliases.join('|')

project.websiteBuns = INGREDIENTS.buns.join('|')

project.websiteProteins = INGREDIENTS.protein.join('|')

project.websiteToppings = INGREDIENTS.toppings.join('|')

project.websiteSauce = INGREDIENTS.sauce.join('|')

intent('(Add) $(NUMBER) $(p:websiteProducts)', p => {
  const quantity = p.NUMBER.number
  const productName = p.websiteProducts.value.toLowerCase()
  const product = PRODUCTS.find(
    product => product.name.toLowerCase() === productName,
  )

  console.log(product)
  p.play(
    { command: 'addProduct', product: product, quantity: quantity },
    opts({ force: true }),
  )
  console.log('test')

  p.play('Adding ' + productName + ' to shoppingcart')
})

intent('(Add) $(p:websiteProducts)', p => {
  const productName = p.websiteProducts.value.toLowerCase()
  const product = PRODUCTS.find(
    product => product.name.toLowerCase() === productName,
  )

  console.log(product)
  p.play(
    { command: 'addProduct', product: product, quantity: 1 },
    opts({ force: true }),
  )
  console.log('test')

  p.play('Adding ' + productName + ' to shoppingcart')
})

/*
    start custom burger
*/
intent('(Start|Begin|Add) custom burger', async p => {
  p.play({ command: 'makeCustomBurger' }, opts({ force: true }))

  p.play("Welcome to the custom burger builder! Let's get started.")

  p.play(
    'To select an item please say "Add or Select" folowed by the item name',
  )

  p.play(
    'Pleas choose a burger bun. We offer A clasic bun, Whole wheat bun and a Gluten Free bun',
  )
})

intent('(Add|Select|I want) $(p:websiteBuns)', p => {
  const productName = p.websiteBuns.value

  p.play({ command: 'addBun', bun: productName })
})

intent('(Add|Select|I want) $(p:websiteProteins)', p => {
  const productName = p.websiteProteins.value.toLowerCase()

  p.play({ command: 'addProtein', protein: productName })
  return
})

intent('(Add|Select|I want|Remove) $(p:websiteToppings)', p => {
  const productName = p.websiteToppings.value

  p.play({ command: 'addTopping', topping: productName })
  return
})

intent('(Add|Select|I want) $(p:websiteSauce)', p => {
  const productName = p.websiteSauce.value

  p.play({ command: 'addSauce', sauce: productName })
  return
})

intent('(Add|Complete) Burger', p => {
  p.play({ command: 'addCustomBurgerToCart' })
})

/*
    end custom burger
*/

intent('checkout', 'end shopping', p => {
  p.play({ command: 'checkout' }, opts({ force: true }))
})

intent('(Clear | Empty | Delete) (Cart | Basket | Shopping Basket)', p => {
  p.play({ command: 'clearCart' }, opts({ force: true }))
  p.play('Clearing shoppingcart')
})

intent('(Delete | Remove) $(p:websiteProducts)', p => {
  const productName = p.websiteProducts.value.toLowerCase()
  const product = PRODUCTS.find(
    product => product.name.toLowerCase() === productName,
  )

  p.play({ command: 'removeFromCart', product: product }, opts({ force: true }))

  p.play('Deleting ' + productName + ' from basket.')
})
