let text = document.getElementById("enterText");
let qr = document.getElementById("qr");
let download = document.getElementById("download");
let share = document.getElementById("share");


let type = document.getElementById("types");
let bgcolor = document.getElementById("bgcolor");
let color = document.getElementById("color");

let title = document.getElementById("title");
let dis = document.getElementById("dis");
let exten = document.getElementById("exten");


let csCode = new QRCodeStyling({
  width: 240,
  height: 240,
  type: "canvas",
  dotsOptions: {
    color: "#000"
  },
  cornersSquareOptions: {
    type: `rounded`
  },
  backgroundOptions: {
    color: "#fff"
  }
})

type.addEventListener("change", (e) => {
  csCode.update({
    cornersSquareOptions: {
      type: e.target.value
    }
  })
  generateQR()
})

bgcolor.addEventListener("input", () => {
  csCode.update({
    backgroundOptions: {
      color: bgcolor.value
    }
  })
  generateQR()
})

color.addEventListener("input", () => {
  csCode.update({
    dotsOptions: {
      color: color.value
    }
  })
  generateQR()
})



function generateQR() {
  const input = text.value.trim();
  
  if (input) {
    csCode.update({ data: input });
    qr.innerHTML = "";
    csCode.append(qr);
  }
}

if (text.value.trim() !== "") {
  generateQR()
}

function down() {
  let rawTitle = title.value.trim() || "stylish-qr";
  rawTitle = rawTitle.replace(/\.[^/.]+$/, "");
  const extension = exten.value;
  
  csCode.download({
    name: rawTitle,
    extension: extension
  });
  generateQR()
}

async function shar() {
  const blob = await csCode.getRawData(`${exten.value || "png"}`);
  const file = new File([blob], `${title.value.trim() || "stylish-qr"}.${exten.value || "png"}`, { type: `image/${exten.value || "png"}` });
  
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: `${title.value.trim() || "stylish-qr"}`,
        text: `${dis.value.trim() || "Here is your stylish QR code!"}`
      });
    } catch (err) {
      alert("Sharing failed: " + err);
    }
  } else {
    alert("Your browser does not support sharing.");
  }
}

text.addEventListener("input", () => {
  generateQR()
})
download.addEventListener("click", () => {
  down()
})
share.addEventListener("click", () => {
  shar()
})