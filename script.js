const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  myLibrary.push(this);
}

const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
const mockingbird = new Book("To Kill a Mockingbird", "Harper Lee", 324, false);
const warAndPeace = new Book("War and Peace", "Leo Tolstoy", 1225, true);

const main = document.querySelector(".main");

function addNewBook(book, imgUrl="./book-images/default.png") {
  const card = document.createElement("div");
  card.classList.toggle("card");
  const bookInfo = document.createElement("div");
  bookInfo.classList.toggle("book-info");
  const bookImg = document.createElement("div");
  bookImg.classList.toggle("img-container");

  for (const prop in book) {
    const p = document.createElement("p");
    p.textContent = book[prop];
    bookInfo.appendChild(p);
  }

  const img = document.createElement("img");
  img.setAttribute("src", imgUrl);

  bookImg.appendChild(img);
  card.appendChild(bookImg);
  card.appendChild(bookInfo);
  main.appendChild(card);
}

addNewBook(hobbit, "./book-images/the-hobbit.jpg");
addNewBook(mockingbird, "./book-images/to-kill-a-mocking-bird.jpg");
addNewBook(warAndPeace, "./book-images/war-and-peace.jpg");

const dialog = document.querySelector("dialog");
const addBtn = document.querySelector(".addBtn");
const form = document.querySelector('form');
const confirmBtn = document.querySelector(".confirmBtn");

addBtn.addEventListener("click", () => {
  dialog.showModal();
});

confirmBtn.addEventListener("click", (e) => {
  if (!form.checkValidity()) { 
    form.reportValidity(); 
    return; 
  }
  
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const isTrue = (data.read === "true");
  if (data.pages === "") {
    data.pages = "Unknow";
  }
  else {
    data.pages = parseInt(data.pages);
  }
  const newBook = new Book(data.title, data.author, data.pages, isTrue);
  
  addNewBook(newBook);
  dialog.close();
  form.reset();
});