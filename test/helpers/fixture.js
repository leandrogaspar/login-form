function fixture(tag) {
  function fixtureContainer() {
    const div = document.createElement("div");
    div.classList.add("fixture");
    return div;
  }

  const fixture =
    document.body.querySelector(".fixture") ||
    document.body.appendChild(fixtureContainer());
  fixture.innerHTML = tag;
  return fixture.children[0];
}
