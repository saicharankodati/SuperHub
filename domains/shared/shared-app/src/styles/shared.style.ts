export function Style(): void {
  const style = document.createElement('style');
  style.innerHTML = `
    h1 {
        color: red;
    }
  `;
  document.head.appendChild(style);
}