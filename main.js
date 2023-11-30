const books = [];
const RENDER_EVENT = "render-book";

document.addEventListener("DOMContentLoaded", function () {
  const inputBook = document.getElementById("inputBook");
  inputBook.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });
});

// menambahkan buku
function addBook() {
  const titleBook = document.getElementById("inputBookTitle").value;
  const authorBook = document.getElementById("inputBookAuthor").value;
  const yearBook = document.getElementById("inputBookYear").value;
  const completedBook = document.getElementById("inputBookIsComplete").value;
  const generatedID = generatedId();
  const bookObject = generateBookObject(
    generatedID,
    titleBook,
    authorBook,
    yearBook,
    false
  );
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function generatedId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

// menampilkan di console browser
document.addEventListener(RENDER_EVENT, function () {
  console.log(books);
});

// tampilkan books

function makeBook(bookObject) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = bookObject.title;
  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = bookObject.author;
  const bookYear = document.createElement("p");
  bookYear.innerText = bookObject.year;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(bookTitle, bookAuthor, bookYear);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);
  container.setAttribute("id", `book-${bookObject.id}`);

  return container;
}

document.addEventListener(RENDER_EVENT, function () {
  console.log(books);
  const unCompleteBookList = document.getElementById("books");
  unCompleteBookList.innerHTML = "";

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    unCompleteBookList.append(bookElement);
  }
});
