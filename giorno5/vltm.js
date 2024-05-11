class Jersey {
  constructor(_name,_description,_price,_imageUrl,_brand) {
    this.name =_name;
    this.description =_description;
    this.price =_price;
    this.imageUrl =_imageUrl;
    this.brand =_brand;
  }
}

document.getElementById('jersey-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const imageUrl = document.getElementById('imageUrl').value;
  const brand = document.getElementById('brand').value;

  const jersey = new Jersey(name, description, price, imageUrl, brand);

  let url = 'https://striveschool-api.herokuapp.com/api/product/';
  let method = 'POST';

  const eventId = new URLSearchParams(location.search).get('eventId');
  if (eventId) {
    url += `/${eventId}`;
    method = 'PUT';
  }

  fetch(url, {
    method: method,
    body: JSON.stringify(jersey),
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGYzNTgxODQ0MjAwMTUzNzU4YjMiLCJpYXQiOjE3MTUzMzA4NjksImV4cCI6MTcxNjU0MDQ2OX0.XPFeqd8sjuqxnbN9GblNt5TrM997zihJTJj8eO55b2E'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Errore nella richiesta!');
    }
    return response.json();
  })
  .then(data => {
    console.log('Dati dei prodotti:', data);
  })
  .then(data => {
    console.log('Dati dei prodotti:', data);
    window.location.href = 'index.html'; // Reindirizza alla pagina index.html
  })
  .catch(error => {
    console.error('Errore:', error);
  });
});