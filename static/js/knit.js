let srcChunks = document.querySelectorAll("pre.javascript");
for (let i = 0; i < srcChunks.length; i++) {
  const src = srcChunks[i];
  const res = eval(src.innerText);
  src.after(createResult(res));
}

function createResult(result) {
  let pre = document.createElement("pre");
  pre.setAttribute("class", "js-result");
  let code = document.createElement("code");
  code.setAttribute("class", "hljs javascript");
  code.textContent = JSON.stringify(result);
  pre.appendChild(code);
  return pre;
}
