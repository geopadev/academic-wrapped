export function showElement(el, className) {
  el.classList.remove(className);
}

export function hideElement(el, className) {
  el.classList.add(className);
}
