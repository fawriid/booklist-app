class book {
    constructor(title, author, isbn) {
        (this.title = title), (this.author = author), (this.isbn = isbn);
    }
}
window.addEventListener("DOMContentLoaded", () => {
    const books = JSON.parse(localStorage.getItem("books"));
    books.forEach((e) => {
        const book1 = new book(e.title, e.author, e.isbn);

        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${book1.title}</td>
        <td>${book1.author}</td>
        <td>${book1.isbn}</td>
        <td id="x-btn"><i class="fas fa-trash"></i></td>
    `;
        const xbtn = row.querySelector("#x-btn");
        xbtn.addEventListener("click", (e) => {
            e.target.parentElement.parentElement.remove();
            removeFromStore(book1.isbn);
            alert("Book removed successfully!", "green");
        });
        bookList.appendChild(row);
    });
});

const container = document.querySelector(".container");

const form = document.getElementById("form");

const title = document.getElementById("title");
const author = document.getElementById("author");
const isbn = document.getElementById("isbn");

const bookList = document.getElementById("book-list");

form.addEventListener("submit", (eve) => {
    eve.preventDefault();

    let bookTitle = title.value;
    let bookAuthor = author.value;
    let bookIsbn = isbn.value;

    const book1 = new book(bookTitle, bookAuthor, bookIsbn);

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book1.title}</td>
        <td>${book1.author}</td>
        <td>${book1.isbn}</td>
        <td id="x-btn"><i class="fas fa-trash"></i></td>
    `;

    if (bookTitle && bookAuthor && bookIsbn) {
        title.value = "";
        author.value = "";
        isbn.value = "";

        const xbtn = row.querySelector("#x-btn");
        xbtn.addEventListener("click", (e) => {
            e.target.parentElement.parentElement.remove();
            removeFromStore(book1.isbn);
            alert("Book removed successfully!", "green");
        });

        bookList.appendChild(row);
        alert("Book added!", "green");

        addToStore(book1);
    } else {
        alert("Please fill all the inputs!", "red");
    }
});
function addToStore(book) {
    if (localStorage.getItem("books")) {
        let books = JSON.parse(localStorage.getItem("books"));
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    } else {
        let books = [];
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }
}
function removeFromStore(isbn) {
    let books = JSON.parse(localStorage.getItem("books"));
    books.forEach((e, index) => {
        if (e.isbn === isbn) {
            books.splice(index, 1);
        }
    });
    localStorage.setItem("books", JSON.stringify(books));
}

function alert(msg, color) {
    const div = document.createElement("div");
    div.className = `alert ${color}`;
    div.textContent = `${msg}`;

    container.insertBefore(div, form);

    setTimeout(() => {
        div.remove();
    }, 2000);
}
