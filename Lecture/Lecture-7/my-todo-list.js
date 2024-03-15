// TODO: Write your code here
function addNewItem(content) {
    const parent = document.querySelector('#items');
    const newItem = document.createElement("li");
    newItem.innerText = content;
    newItem.classList.add('item');

    // Toggle 'done' class when the item is clicked
    newItem.addEventListener('click', () => {
        newItem.classList.toggle('done');
    });

    parent.appendChild(newItem);
}
const inputElement = document.querySelector('#my-inp');
inputElement.addEventListener('keydown', (event) => {
    const key = event.key;
    if(key === 'Enter') {
        const content = inputElement.value;
        addNewItem(content);
        inputElement.value = '';
    }
});
//addNewItem("Print documents")