function highlight(json) {
  return json
    .replace(/"([^"]+)":/g, '<span class="key">"$1"</span>:')
    .replace(/: "((?:[^"\\]|\\.)*)"/g, ': <span class="string">"$1"</span>')
    .replace(/: (true|false)/g, ': <span class="bool">$1</span>')
    .replace(/: (null)/g, ': <span class="null">$1</span>')
    .replace(/: (\d+\.?\d*)/g, ': <span class="num">$1</span>');
}

function copyBtn(btnId, json) {
  document.getElementById(btnId).onclick = function () {
    var btn = document.getElementById(btnId);
    navigator.clipboard.writeText(json).then(function () {
      btn.textContent = "Copied!";
      setTimeout(function () { btn.textContent = "Copy JSON"; }, 2000);
    });
  };
}

function openInBrowser(url) {
  var android = /Android/i.test(navigator.userAgent);
  var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (android) {
    window.location.href = "intent://" + url.replace(/^https?:\/\//, "") +
      "#Intent;scheme=https;action=android.intent.action.VIEW;end";
    return;
  }
  if (ios) {
    window.location.href = "x-safari-https://" + url.replace(/^https?:\/\//, "");
    setTimeout(function () { window.open(url, "_blank"); }, 500);
    return;
  }
  window.open(url, "_blank");
}

function showWarning(label) {
  document.getElementById("inappWarning").classList.add("show");
  document.getElementById("appName").textContent = label;
  document.getElementById("openBrowserBtn").onclick = function (e) {
    e.preventDefault();
    openInBrowser(window.location.href);
  };
  document.getElementById("copyUrlBtn").onclick = function () {
    navigator.clipboard.writeText(window.location.href).then(function () {
      document.getElementById("copyUrlBtn").textContent = "Copied!";
      setTimeout(function () { document.getElementById("copyUrlBtn").textContent = "Copy URL"; }, 2000);
    });
  };
}
