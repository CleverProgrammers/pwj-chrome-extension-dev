let itemsList = document.querySelector('.actionItems');
let addItemForm = document.querySelector('#addItemForm');
let storage = chrome.storage.local;
let circle;
let totalItems;
let completedItems 

const actionItemChanges = (changes) => {
  console.log(changes);
  changes.forEach(change => {
    if(change.type == 'added'){
      // check if the same element doesn't exist
      if(!document.querySelector(`[data-id="${change.doc.id}"]`)){
        renderActionItem(change.doc);
      }
    } else if (change.type == 'removed'){
      const element = document.querySelector(`[data-id="${change.doc.id}"]`);
      if(element) element.remove();
    }
  })
  chrome.storage.local.set({
    itemsHtml: itemsList.innerHTML
  })
}

storage.get(['itemsHtml'], (data)=>{
  if(data.itemsHtml){
    itemsList.innerHTML = data.itemsHtml;
    createCompletedListener();
    createDeleteListener();
  }
  ActionItems.get(actionItemChanges);
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

const handleCompletedEventListener = (e) => {
  const id = e.target.parentElement.getAttribute('data-id');
  const parent = e.target.parentElement;
  if(parent.classList.contains('completed')){
    ActionItems.markUnmarkCompleted(id, null);
    parent.classList.remove('completed');
    console.log("remove");
  } else {
    ActionItems.markUnmarkCompleted(id, new Date());
    parent.classList.add('completed');
    console.log('add');
  }
}

const createCompletedListener = () => {
  const elements = document.querySelectorAll('.actionItem__check');
  elements.forEach((element)=>{
    element.addEventListener('click', handleCompletedEventListener)
  })
}

const handleDeleteEventListener = (e) => {
  const id = e.target.parentElement.getAttribute('data-id');
  ActionItems.remove(id);
}

const createDeleteListener = () => {
  const elements = document.querySelectorAll('.actionItem__delete');
  elements.forEach((element)=>{
    element.addEventListener('click', handleDeleteEventListener);
  })
}

const renderActionItem = (item) => {
    const data = item.data();
    let element = document.createElement('div');
    let deleteEl = document.createElement('div');
    let checkEl = document.createElement('div');
    let textEl = document.createElement('div');
    element.classList.add('actionItem__item');
    deleteEl.classList.add('actionItem__delete');
    checkEl.classList.add('actionItem__check');
    textEl.classList.add('actionItem__text');
    if(data.completed){
      element.classList.add('completed');
    }
    checkEl.addEventListener('click', handleCompletedEventListener);
    element.setAttribute('data-id', item.id );
    deleteEl.innerHTML = `<i class="fas fa-times"></i>`;
    checkEl.innerHTML = ` 
      <div class="actionItem__checkBox">
        <i class="fas fa-check"></i>
      </div>`
    deleteEl.addEventListener('click', handleDeleteEventListener);
    textEl.textContent = data.text;
    element.appendChild(checkEl);
    element.appendChild(textEl);
    element.appendChild(deleteEl);
    itemsList.prepend(element);
}

const getProgress = (circleProgress) => {
  
}

circle = new ProgressBar.Circle('#progress-bar', {
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

circle.animate(0.5);  
