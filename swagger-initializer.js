window.onload = function () {
  //<editor-fold desc="Changeable Configuration Block">

  // بررسی وجود Authorization در localStorage
  let token = localStorage.getItem('LocalAuthorization');
  if (!token) {
    token = prompt("لطفاً توکن خود را وارد کنید (فقط توکن بدون Bearer):");
    if (token) {
      localStorage.setItem('LocalAuthorization', 'Bearer ' + token);
    } else {
      alert("توکن وارد نشد. بارگذاری متوقف شد.");
      return;
    }
  }

  // بررسی وجود URL در localStorage
  let apiUrl = localStorage.getItem('SwaggerAPIUrl');
  if (!apiUrl) {
    apiUrl = "http://127.0.0.1:8000/api/v1/document"; // آدرس پیش‌فرض
    localStorage.setItem('SwaggerAPIUrl', apiUrl); // ذخیره برای دفعات بعد
  }

  // بارگذاری Swagger با توکن و URL سفارشی یا پیش‌فرض
  window.ui = SwaggerUIBundle({
    url: apiUrl,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout",
    docExpansion: true,
    persistAuthorization: true,
    filter:true,
    requestInterceptor: (req) => {
      req.headers['Authorization'] = localStorage.getItem('LocalAuthorization');
      return req;
    }
  });

  //</editor-fold>
};
