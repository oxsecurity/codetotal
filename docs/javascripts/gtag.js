var gtag_id = "G-PMP0RQ4L7Q"; //"G-9B8BSP0VV7"; replace by GTAG if you want stats

var script = document.createElement("script");
script.src = "https://www.googletagmanager.com/gtag/js?id=" + gtag_id;
document.head.appendChild(script);

location$.subscribe(function (url) {
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  gtag("js", new Date());
  gtag("config", gtag_id);
});