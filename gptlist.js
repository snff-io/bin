const blessed = require('blessed');

// Initialize Blessed screen
const screen = blessed.screen({
  smartCSR: true
});

// Create a list widget
const list = blessed.list({
  parent: screen,
  width: '50%',
  height: '50%',
  top: 'center',
  left: 'center',
  align: 'center',
  valign: 'middle',
  border: 'line',
  items: ['Item 1', 'Item 2', 'Item 3'],
  keys: true,
  vi: true,
  mouse: true,
});

list.on('select', (item, index) => {
    const selectedIndex = list.selected;
    const selectedItem = list.getItem(selectedIndex);
  
    console.log(`Selected item: ${selectedItem.content}, Index: ${selectedIndex}`);
  });

// Handling focus event
list.on('focus', () => {
  console.log('List is focused');
});

// Handling blur event
list.on('blur', () => {
  console.log('List is blurred');
});

// Handling cancel event
list.on('cancel', () => {
  console.log('Selection cancelled');
});

// Handling item click event
list.on('item click', (item, index) => {
  console.log(`Clicked on item: ${item.content}, Index: ${index}`);
});

// Handling item mouseover event
list.on('item mouseover', (item, index) => {
  console.log(`Mouse over item: ${item.content}, Index: ${index}`);
});

// Handling item mouseout event
list.on('item mouseout', (item, index) => {
  console.log(`Mouse out from item: ${item.content}, Index: ${index}`);
});

// Handling action event
list.on('action', (item, index) => {
  console.log(`Action performed on item: ${item.content}, Index: ${index}`);
});

// Handling child-mouse event
list.on('child-mouse', (event) => {
  console.log(`Child mouse event: ${event.name}`);
});

// Handling mouse event
list.on('mouse', (event) => {
  console.log(`Mouse event: ${event.name}`);
});

// Handling key event
// Handling key event
list.on('keypress', (ch, key) => {
    console.log(`Keypress event: ${key.full}`);
  });

// Handling resize event
list.on('resize', () => {
  console.log('List resized');
});

// Handling scroll event
list.on('scroll', (offset) => {
  console.log(`List scrolled, offset: ${offset}`);
});

// Focus on the list
list.focus();

// Render the screen
screen.render();
