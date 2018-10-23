function fixture(tag) {
  function fixtureContainer() {
    const div = document.createElement('div');
    div.classList.add('fixture');
    return div;
  }

  const fixtureElement = document.body.querySelector('.fixture')
    || document.body.appendChild(fixtureContainer());
  fixtureElement.innerHTML = tag;
  return fixtureElement.children[0];
}
