class book {
    constructor(title, author, isbn) {
        (this.title = title), (this.author = author), (this.isbn = isbn);
    }
}

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
            alert("Book removed successfully!","green")
        });

        bookList.appendChild(row);
        alert("Book added!", "green")

    } else {
        alert("Please fill all the inputs!", "red")
    }
});


function alert(msg, color) {
    const div = document.createElement("div");
    div.className = `alert ${color}`;
    div.textContent = `${msg}`;

    container.insertBefore(div, form);

    setTimeout(() => {
        div.remove();
    }, 2000);
}



// <td>Title</td>
// <td>Autdor</td>
// <td>ISBN</td>
// <td id="x-btn"><i class="fas fa-trash"></i></td>
