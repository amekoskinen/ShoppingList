document.querySelector('[data-bs-target="#addItemsVerify"]').addEventListener('click', function () {
  const checked = document.querySelectorAll('input[type="checkbox"]:checked');
  const modalBody = document.querySelector('#addItemsVerify .modal-body');

  modalBody.innerHTML = ""; // clear previous content

  if (checked.length === 0) {
    modalBody.innerHTML = "<p>No items selected.</p>";
    return;
  }

  const ul = document.createElement('ul');

  checked.forEach(item => {
    const product = document.querySelector(`p[id="product${item.id}"]`).innerText.trim();
    const price = document.querySelector(`p[id="price${item.id}"]`).innerText.trim();
    const li = document.createElement('li');
    li.textContent = product+" / "+price;
    li.classList.add('listNoStyling')
    li.classList.add('mb-3')
    ul.appendChild(li);
  });

  modalBody.appendChild(ul);
});
