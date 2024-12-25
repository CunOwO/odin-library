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

function addNewBook(book, imgUrl="./book-covers/default.png") {
  const card = document.createElement("div");
  card.classList.toggle("card");
  card.classList.toggle("book");
  const bookInfo = document.createElement("div");
  bookInfo.classList.toggle("book-info");
  const bookCover = document.createElement("div");
  bookCover.classList.toggle("img-container");

  const p1 = document.createElement("p");
  p1.textContent = book.title;
  const p2 = document.createElement("p");
  p2.textContent = book.author;
  const p3 = document.createElement("p");
  p3.textContent = `Pages: ${book.pages}`;
  bookInfo.appendChild(p1);
  bookInfo.appendChild(p2);
  bookInfo.appendChild(p3);

  const btnContainer = document.createElement("div");
  btnContainer.classList.toggle("btn-container");

  const p4 = document.createElement("p");
  p4.textContent = "Read";
  btnContainer.appendChild(p4);

  const readBtnLabel = document.createElement("label");
  readBtnLabel.classList.toggle("switch");
  const readBtn = document.createElement("input");
  readBtn.setAttribute("type", "checkbox");
  readBtn.checked = book.read;
  const readBtnSlider = document.createElement("span");
  readBtnSlider.classList.toggle("slider");
  readBtnLabel.appendChild(readBtn);
  readBtnLabel.appendChild(readBtnSlider);
  btnContainer.appendChild(readBtnLabel);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.toggle("deleteBtn");
  const deleleIcon = document.createElement("img");
  deleleIcon.setAttribute("src", "./book-icons/delete.svg");
  deleteBtn.appendChild(deleleIcon);
  btnContainer.appendChild(deleteBtn);

  bookInfo.appendChild(btnContainer);

  const img = document.createElement("img");
  img.setAttribute("src", imgUrl);

  bookCover.appendChild(img);
  card.appendChild(bookCover);
  card.appendChild(bookInfo);
  main.appendChild(card);

  deleteBtn.addEventListener("click", () => {
    myLibrary.splice(card.dataset.indexNumber, 1);
    card.remove();
    updateCardIndex();
  });
}

addNewBook(hobbit, "./book-covers/the-hobbit.jpg");
addNewBook(mockingbird, "./book-covers/to-kill-a-mocking-bird.jpg");
addNewBook(warAndPeace, "./book-covers/war-and-peace.jpg");
updateCardIndex();

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
  updateCardIndex();
  dialog.close();
  form.reset();
});

function updateCardIndex() {
  let cards = document.querySelectorAll(".card.book");
  for (let i = 0, length = myLibrary.length; i < length; i++) {
    cards[i].setAttribute("data-index-number", i);
  }
}