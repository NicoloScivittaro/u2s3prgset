// Funzione per ottenere e visualizzare i dettagli della maglia
const getJerseyData = function() {
    const addressBarContent = new URLSearchParams(location.search);
    const jerseyId = addressBarContent.get('jerseyId');
  
    fetch(`https://striveschool-api.herokuapp.com/api/product/${jerseyId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGYzNTgxODQ0MjAwMTUzNzU4YjMiLCJpYXQiOjE3MTUzMzA4NjksImV4cCI6MTcxNjU0MDQ2OX0.XPFeqd8sjuqxnbN9GblNt5TrM997zihJTJj8eO55b2E'
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dettagli della maglia");
      }
    })
    .then((jersey) => {
      console.log('DETTAGLI RECUPERATI', jersey);
      // Aggiungi i dettagli della maglia al DOM
      document.getElementById('name').innerText = jersey.name;
      document.getElementById('description').innerText = jersey.description;
      document.getElementById('brand').innerText = jersey.brand;
      document.getElementById('price').innerText = jersey.price + '€';
      document.getElementById('jersey-image').src = jersey.imageUrl;
    })
    .catch((err) => {
      console.log('ERRORE', err);
    });
  };
  
  // Funzione per eliminare una maglia
  const deleteJersey = function() {
    const addressBarContent = new URLSearchParams(location.search);
    const jerseyId = addressBarContent.get('jerseyId');
  
    fetch(`https://striveschool-api.herokuapp.com/api/product/${jerseyId}`, {
      method: 'DELETE'
    })
    .then((response) => {
      if (response.ok) {
        alert('Maglia eliminata con successo');
        location.assign('index.html'); // Reindirizza alla pagina principale dopo l'eliminazione
      } else {
        throw new Error('Errore durante l\'eliminazione della maglia');
      }
    })
    .catch((err) => {
      console.log('ERRORE', err);
      alert('Si è verificato un errore durante l\'eliminazione della maglia');
    });
  };
  
  // Event listener per il pulsante di modifica
  const editButton = document.getElementById('edit-button');
  editButton.addEventListener('click', function() {
    const addressBarContent = new URLSearchParams(location.search);
    const jerseyId = addressBarContent.get('jerseyId');
    location.assign(`vltm.html?jerseyId=${jerseyId}`);
  });
  
    getJerseyData();
