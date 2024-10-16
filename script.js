// Google Books API Key
const apiKey = "AIzaSyADGOJhYuyNW0giKVualamYVZkT9u46PSc";

// Function to fetch and display books from Google Books API
function fetchBooks(searchQuery) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const books = data.items || []; // Store the fetched books data
      displayBooks(books); // Display books based on the search
    })
    .catch((error) => {
      console.error("Error fetching books:", error);
      document.getElementById("books").innerHTML = "<p>Error loading books.</p>";
    });
}

// Display books on the page
function displayBooks(books) {
  const booksContainer = document.getElementById("books");
  booksContainer.innerHTML = ""; // Clear previous content

  if (books.length > 0) {
    books.forEach((book) => {
      const title = book.volumeInfo.title || "No Title Available";
      const authors = book.volumeInfo.authors
        ? book.volumeInfo.authors.join(", ")
        : "Unknown Author";
      const thumbnail = book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : "no-image.png"; // Placeholder if no image available
      const price = (Math.random() * 100).toFixed(2); // Random price for demo

      const bookItem = document.createElement("div");
      bookItem.className = "book-item";
      bookItem.innerHTML = `
        <img src="${thumbnail}" alt="${title}">
        <h3>${title}</h3>
        <p>Author(s): ${authors}</p>
        <p>Price: $${price}</p>
        <button onclick="addToCart('${title}', '${authors}', ${price}, '${thumbnail}')">Add to Cart</button>
      `;

      booksContainer.appendChild(bookItem);
    });
  } else {
    booksContainer.innerHTML = "<p>No books found.</p>";
  }
}

// Search books based on the user's input
function searchBooks() {
  const searchQuery = document.getElementById("searchInput").value;
  if (searchQuery) {
    fetchBooks(searchQuery); // Fetch books from API based on search query
  } else {
    alert("Please enter a search term.");
  }
}

// Add book to cart
function addToCart(title, author, price, image) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.push({ title, author, price, image });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Show alert that the book has been added to the cart
  alert(`${title} has been added to your cart!`);

  // Redirect to the cart page
  window.location.href = 'cart.html'; // Make sure this path points to your actual cart page
}





