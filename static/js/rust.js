function run_rust_code(code_block) {
  let result_block = code_block.querySelector(".result");
  if (!result_block) {
    result_block = document.createElement("code");
    result_block.className = "result hljs language-bash";

    code_block.append(result_block);
  }

  let text = code_block; // playpen_text(code_block);
  let classes = code_block.querySelector("code").classList;
  let has_2018 = classes.contains("edition2018");
  let edition = has_2018 ? "2018" : "2015";

  var params = {
    version: "stable",
    optimize: "0",
    code: text,
    edition: edition
  };

  if (text.indexOf("#![feature") !== -1) {
    params.version = "nightly";
  }

  result_block.innerText = "Running...";

  fetch_with_timeout("https://play.rust-lang.org/evaluate.json", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params)
  })
    .then(response => response.json())
    .then(response => (result_block.innerText = response.result))
    .catch(error => (result_block.innerText = "Playground Communication: " + error.message));
}

function run_rust(code, callback) {
  let params = {
    version: "stable",
    optimize: "0",
    code: text,
    edition: "2018"
  };

  console.log("running...");

  fetch("https://play.rust-lang.org/evaluate.json", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params)
  })
    .then(response => response.json())
    .then(response => callback(response.result))
    .catch(error => console.log(error));
}
