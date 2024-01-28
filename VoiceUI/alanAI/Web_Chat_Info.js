intent('what can I do on this (website|site)', p => {
  p.play('You can order burgers, sides and drinks on this website')
})

intent('How do I navigate', p => {
  p.play("You can navigate by saying 'Go to' Home, Products or Cart.")
})

intent('Help', p => {
  p.play(
    "You can ask for more information when asking 'How do i navigate' or 'What can i do on this website'",
  )
})
