const inputEl = document.getElementById("input");
const buttonEl = document.getElementById("button");
const errorMessageEl = document.getElementById("error_message");
const listEl = document.getElementById("list");

async function handleClick() {
  const siteUrl = inputEl.value;
  const res = await fetch(
    `${document.location.href}files-parser/${encodeURIComponent(siteUrl)}`
  );

  if (!res.ok) {
    listEl.style.display = "none";
    errorMessageEl.style.display = "block";
    errorMessageEl.textContent = await res.text();
  } else {
    const { scripts, stylesheets } = await res.json();
    listEl.style.display = "block";
    errorMessageEl.style.display = "none";

    scripts.forEach(addToList);
    stylesheets.forEach(addToList);
  }
}

function addToList(el) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(el));
  listEl.appendChild(li);
}

buttonEl.onclick = handleClick;
