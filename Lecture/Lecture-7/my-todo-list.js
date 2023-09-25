// TODO: Write your code here
function addNewItem(content) {
    const L = document.createElement("li");
    L.innerText = content;
    L.classList.add('#item');

    const parent = document.querySelector('#items');
    parent.append(L);
    

}
addNewItem("Print documents")