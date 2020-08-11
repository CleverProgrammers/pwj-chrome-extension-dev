let itemsList = document.querySelector('.actionItems');
let addItemForm = document.querySelector('#addItemForm');
let storage = chrome.storage.local;

storage.get(['itemsHtml'], (data)=>{
  if(data.itemsHtml){
    itemsList.innerHTML = data.itemsHtml;
  } else {
    ActionItems.get().then((actionItems)=>{
      renderActionItems(actionItems);
      chrome.storage.local.set({
        itemsHtml: itemsList.innerHTML
      })
    });
  }
})

addItemForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  ActionItems.add({
    added: new Date(),
    completed: null,
    text: addItemForm.itemText.value,
    website_link: null
  })
  addItemForm.itemText.value = '';
})  

const renderActionItems = (items) => {
  items.forEach((item)=>{
    const data = item.data();
    let element = document.createElement('div');
    element.classList.add('actionItem__item');
    if(data.completed){
      element.classList.add('completed');
    }
    element.setAttribute('item-id', data.id);
    element.innerHTML = `
      <div class="actionItem__check">
        <div class="actionItem__checkBox">
          <i class="fas fa-check"></i>
        </div>
      </div>
      <div class="actionItem__text">
        ${data.text}
      </div>
      <div class="actionItem__delete">
        <i class="fas fa-times"></i>
      </div>
    `
    itemsList.appendChild(element);
  })
}

var circle = new ProgressBar.Circle('#progress-bar', {
    color: '#010101',
    strokeWidth: 6,
    trailWidth: 2,
    easing: 'easeInOut',
    duration: 1400,
    text: {
        autoStyleContainer: false
      },
      from: { color: '#7fdf67', width: 2 },
      to: { color: '#7fdf67', width: 6 },
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
    
        var value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value);
        }
    
      }
});

circle.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
circle.text.style.fontSize = '2rem';

circle.animate(1.0);  
