const generateJerseyCards = function(jerseysArray) {
  const row = document.getElementById('jerseys-row');
  jerseysArray.forEach((jersey) => {
    const newCol = document.createElement('div');
    newCol.classList.add('col');
    newCol.innerHTML = `
      <div class="card h-100 d-flex flex-column">
        <div class="card-header">
        <a href="card.html?jerseyId=${jersey._id}" class="btn btn-info">INFO</a>
        </div>
        <img src="${jersey.imageUrl}" class="card-img-top" alt="Jersey Image">
        <div class="card-body d-flex flex-column justify-content-around">
          <h5 class="card-title">${jersey.name}</h5>
          <p class="card-text">${jersey.description}</p>
          <p class="card-text">${jersey.brand}</p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-primary">${jersey.price}€</button>
            <button class="btn btn-info edit-btn" data-product-id="${jersey._id}" >Modifica</button>
            <button class="btn btn-info delete-btn" data-product-id="${jersey._id}">Elimina</button>
          </div>
        </div>
      </div>
    `;
    const deleteButton = newCol.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      const productId = deleteButton.dataset.productId;
      deleteProduct(productId);
      newCol.remove(); // Rimuove l'elemento dalla pagina quando il bottone viene cliccato
    });
    const editButton = newCol.querySelector('.edit-btn');
    editButton.addEventListener('click', () => {
      editCard(jersey, newCol); // Funzione per modificare la card
    });


    row.appendChild(newCol);
  });
};

const expandImage = function(imageUrl) {
  // Apro un popup o un modale per visualizzare l'immagine ingrandita
  alert("Immagine ingrandita: " + imageUrl);
};


const editCard = function(jersey, cardElement) {
  // Sostituisco i valori della card con campi di input editabili
  cardElement.innerHTML = `
    <div class="card h-100 d-flex flex-column">
      <img src="${jersey.imageUrl}" class="card-img-top" alt="Jersey Image">
      <a href="details.html?jerseyId=${jersey._id}" class="btn btn-info">INFO</a>
      <div class="card-body d-flex flex-column justify-content-around">
        <input type="text" class="form-control" value="${jersey.name}" id="edit-name" placeholder="Nome">
        <input type="text" class="form-control" value="${jersey.description}" id="edit-description" placeholder="Descrizione">
        <input type="text" class="form-control" value="${jersey.brand}" id="edit-brand" placeholder="Brand">
        <input type="text" class="form-control" value="${jersey.price}" id="edit-price" placeholder="Prezzo">
        <div class="d-flex justify-content-between mt-2">
          <button class="btn btn-success save-btn" data-product-id="${jersey._id}">Salva</button>
          <button class="btn btn-secondary cancel-btn">fine</button>
        </div>
      </div>
    </div>
  `;

  // Aggiungi event listener per il pulsante "Salva"
  const saveButton = cardElement.querySelector('.save-btn');
  saveButton.addEventListener('click', () => {
    const updatedJersey = {
      name: document.getElementById('edit-name').value,
      description: document.getElementById('edit-description').value,
      brand: document.getElementById('edit-brand').value,
      price: document.getElementById('edit-price').value,

    };
    const productId = saveButton.dataset.productId;
    saveChanges(updatedJersey, productId); 
    // Passo la cardElement per ricaricare la card originale
  });

  // Aggiungo event listener per il pulsante "Annulla"
  const cancelButton = cardElement.querySelector('.cancel-btn');
  cancelButton.addEventListener('click', () => {
    window.location.reload(); // Ricarica la card con i valori originali
  });
};

const saveChanges = function(updatedJersey, productId) {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGYzNTgxODQ0MjAwMTUzNzU4YjMiLCJpYXQiOjE3MTUzMzA4NjksImV4cCI6MTcxNjU0MDQ2OX0.XPFeqd8sjuqxnbN9GblNt5TrM997zihJTJj8eO55b2E'
    },
    body: JSON.stringify(updatedJersey)
  })
  .then((response) => {
    if (response.ok) {
      // Aggiorna la lista dei prodotti e le card
      getJerseys();
    } else {
      throw new Error('Errore durante il salvataggio delle modifiche');
    }
  })
  .catch((err) => {
    console.error('Errore durante il salvataggio delle modifiche:', err);
  });
};

const getJerseys = function() {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGYzNTgxODQ0MjAwMTUzNzU4YjMiLCJpYXQiOjE3MTUzMzA4NjksImV4cCI6MTcxNjU0MDQ2OX0.XPFeqd8sjuqxnbN9GblNt5TrM997zihJTJj8eO55b2E'
    }
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Errore nella risposta del server');
    }
  })
  .then((array) => {
    generateJerseyCards(array);
  })
  .catch((err) => {
    console.log('ERRORE!', err);
  });
};

const deleteProduct = function(productId) {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGYzNTgxODQ0MjAwMTUzNzU4YjMiLCJpYXQiOjE3MTUzMzA4NjksImV4cCI6MTcxNjU0MDQ2OX0.XPFeqd8sjuqxnbN9GblNt5TrM997zihJTJj8eO55b2E'
    }
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Errore nella cancellazione del prodotto');
    }
  })
  .catch((err) => {
    console.error('ERRORE nella cancellazione del prodotto:', err);
  });
};

getJerseys();