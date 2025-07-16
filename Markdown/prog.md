# Unit: المقدمة وأساسيات الويب
## Slide: 1
### Lesson: لماذا نتعلم برمجة صفحات الإنترنت؟
### Content:
في عالم اليوم الرقمي، تُعدّ مهارات تطوير الويب من أهم المهارات المطلوبة في سوق العمل.  
تتيح لك لغات الويب (HTML, CSS, JavaScript) بناء مواقع تفاعلية، تطبيقات ويب تقدّمية (Progressive Web Apps) وأنظمة إدارة محتوى متكاملة.  
### Note:
تطوير الويب لا يقتصر على المبرمجين فقط؛ فحتى المهتمين بالتسويق أو التصميم يستفيدون من فهم هذه التقنيات.
### Image: web_stack_overview.svg
### Page Reference: 1–2

---
# Unit: المقدمة وأساسيات الويب
## Slide: 2
### Lesson: تاريخ موجز لـ HTML و CSS و JavaScript
### Content:
- **1991**: تيم بيرنرزلي يطلق أول صفحة HTML.  
- **1996**: ظهر CSS ليفصل التصميم عن الهيكل.  
- **1995**: بريندان إيتش يبتكر JavaScript في 10 أيام فقط!  
- **2008**: HTML5 يجلب عناصر جديدة مثل `<video>`, `<canvas>` و APIs قوية.  
### Example:
<!-- أول صفحة HTML في التاريخ -->
<title>World Wide Web</title>
<h1>World Wide Web</h1>
<p>The WorldWideWeb (W3) is a wide-area <a href="...">hypermedia</a> information retrieval initiative...
### Image: web_timeline.svg
### Page Reference: 2–3

---
# Unit: المقدمة وأساسيات الويب
## Slide: 3
### Lesson: مكونات الويب الثلاثة
### Content:
1. **HTML** (الهيكل): العظام والهيكل العظمي للصفحة.  
2. **CSS** (العرض): الجلد والملابس، يتحكّم بالألوان والخطوط والتنسيق.  
3. **JavaScript** (السلوك): العضلات والمخ، تضيف التفاعل والديناميكية.  
### Image: web_triad.svg
### Page Reference: 4

---
# Unit: المقدمة وأساسيات الويب
## Slide: 4
### Lesson: أدوات التطوير الأساسية
### Content:
- **محرر نصوص**: VS Code أو Sublime أو Atom.  
- **متصفح مع أدوات المطوّر**: Chrome DevTools.  
- **Git و GitHub**: لإدارة الإصدارات والتعاون.  
- **Prettier و ESLint**: لفرمتة الكود واكتشاف الأخطاء.  
### MCQ:
أيّ من الأدوات التالية يُستخدم لتصحيح الأخطاء البرمجية في JavaScript؟  
a) Photoshop  
b) ESLint  
c) Figma  
d) Excel  
### Answer: b)
### Page Reference: 5

---
# Unit: HTML5 – البنية والعناصر
## Slide: 5
### Lesson: بنية مستند HTML5
### Content:
كل مستند HTML يجب أن يحتوي على الهيكل التالي:  
<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <title>العنوان</title>
</head>
<body>
  <!-- المحتوى -->
</body>
</html>
### Note:
إعلان `<!DOCTYPE html>` يجعل المتصفح يستخدم وضع المعايير (Standards Mode).
### Page Reference: 6

---
# Unit: HTML5 – البنية والعناصر
## Slide: 6
### Lesson: عناصر النصوص الأساسية
### Content:
- `<h1>` إلى `<h6>`: العناوين التسلسلية.  
- `<p>`: الفقرة.  
- `<strong>` و `<em>`: التأكيد والتشديد.  
- `<br>` و `<hr>`: فاصل سطر وخط أفقي.  
### Example:
<h1>مرحباً بالعالم</h1>
<p>هذه <strong>أول</strong> فقرة في صفحتي.</p>
<hr>
### Page Reference: 7–8

---
# Unit: HTML5 – البنية والعناصر
## Slide: 7
### Lesson: القوائم (Lists)
### Content:
- **مُرتبة** `<ol>`: أرقام أو حروف.  
- **غير مرتبة** `<ul>`: نقاط.  
- **قائمة تعريف** `<dl>`: `<dt>` المصطلح و `<dd>` الوصف.  
### Example:
<h2>مكونات القهوة</h2>
<ul>
  <li>بن محمّص</li>
  <li>ماء ساخن</li>
</ul>
### Image: list_types.svg
### Page Reference: 9

---
# Unit: HTML5 – البنية والعناصر
## Slide: 8
### Lesson: الروابط والصور
### Content:
- **الرابط** `<a href="…">نص الرابط</a>`  
  - `target="_blank"` لفتح في تبويب جديد.  
- **الصورة** `<img src="…" alt="…">`  
  - السمة `alt` ضرورية لإمكانية الوصول.  
### Question:
اكتب الكود الذي ينشئ رابطاً يفتح موقع Google في تبويب جديد.
### Answer:
<a href="https://google.com" target="_blank" rel="noopener">Google</a>
### Page Reference: 10–11

---
# Unit: HTML5 – البنية والعناصر
## Slide: 9
### Lesson: الجداول
### Content:
بنية الجدول:  
<table>
  <thead>
    <tr><th>الاسم</th><th>العمر</th></tr>
  </thead>
  <tbody>
    <tr><td>سارة</td><td>25</td></tr>
  </tbody>
</table>
### Note:
- `<th>` لعناوين الخلايا، `<td>` للبيانات.  
- خصائص `colspan` و `rowspan` لدمج الخلايا.
### Image: table_structure.svg
### Page Reference: 12–13

---
# Unit: HTML5 – البنية والعناصر
## Slide: 10
### Lesson: النماذج (Forms) – الجزء 1
### Content:
النموذج `<form>` يُستخدم لإرسال البيانات إلى الخادم.  
العناصر الأساسية:  
- `<input type="text|email|password|number|date">`  
- `<textarea>` للنصوص الطويلة.  
- `<label>` لربط النص بالحقل.
### Example:
<form action="/register" method="post">
  <label for="email">البريد:</label>
  <input id="email" type="email" name="email" required>
  <button type="submit">إرسال</button>
</form>
### Page Reference: 14–15

---
# Unit: HTML5 – البنية والعناصر
## Slide: 11
### Lesson: النماذج (Forms) – الجزء 2
### Content:
عناصر إضافية:  
- `<select>` و `<option>` لقوائم منسدلة.  
- `<input type="radio">` و `checkbox` للاختيارات.  
- `required`, `minlength`, `pattern` للتحقق من صحة الإدخال.
### MCQ:
أي من الأنواع التالية يُستخدم لاختيار تاريخ؟  
a) `type="color"`  
b) `type="date"`  
c) `type="range"`  
d) `type="week"`
### Answer: b)
### Page Reference: 16–17

---
# Unit: HTML5 – البنية والعناصر
## Slide: 12
### Lesson: Activity (من كتاب النشاط): تمرين عملي – بناء بطاقة تعريف شخصية
### Content:
استخدم عناصر HTML فقط لإنشاء بطاقة تعريف تتضمّن:  
- صورة شخصية (`<img>`).  
- اسمك في `<h1>`.  
- بريدك ورقم هاتفك في فقرة واحدة.  
- قائمة غير مرتبة بمهاراتك.
### Question:
ارفع ملف `index.html` إلى GitHub Pages وارسل الرابط.
### Page Reference: Activity Book ص 3–4

---
# Unit: CSS3 – التنسيق والتصميم
## Slide: 13
### Lesson: مقدمة إلى CSS
### Content:
CSS (Cascading Style Sheets) تُستخدم لتنسيق HTML.  
طرق إضافة CSS:  
1. **Inline**: `<h1 style="color:red;">`  
2. **Internal**: `<style>` داخل `<head>`  
3. **External**: ملف منفصل `styles.css` مرتبط بـ `<link rel="stylesheet" href="styles.css">`
### Note:
الطريقة الثالثة (External) هي الأنسب لمشاريع حقيقية.
### Page Reference: 18–19

---
# Unit: CSS3 – التنسيق والتصميم
## Slide: 14
### Lesson: المحددات (Selectors)
### Content:
- **Type**: `p { … }`  
- **Class**: `.btn { … }`  
- **ID**: `#header { … }`  
- **Attribute**: `input[type="email"] { … }`  
- **Pseudo-class**: `a:hover { … }`
### Example:
/* تغيير لون الروابط عند المرور */
a:hover {
  color: teal;
}
### Page Reference: 20–21

---
# Unit: CSS3 – التنسيق والتصميم
## Slide: 15
### Lesson: نموذج الصندوق (Box Model)
### Content:
كل عنصر عبارة عن مستطيل يتكوّن من:  
Margin → Border → Padding → Content
### Image: box_model.svg
### Question:
ماذا يحدث للمساحة الكلية للعنصر إذا زدنا `padding` من 10px إلى 30px؟
### Answer:
تزداد المساحة الكلية بمقدار 40px (20px من كل جانب).
### Page Reference: 22–23

---
# Unit: CSS3 – التنسيق والتصميم
## Slide: 16
### Lesson: Flexbox – المحور الرئيسي والثانوي
### Content:
Flexbox يُستخدم لتصميم تخطيطات مرنة.  
محاوره:  
- **Main Axis**: الاتجاه الأفقي (افتراضياً).  
- **Cross Axis**: الاتجاه العمودي.  
### Example:
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
### Image: flexbox_axes.svg
### Page Reference: 24–25

---
# Unit: CSS3 – التنسيق والتصميم
## Slide: 17
### Lesson: Grid Layout – تعريف الشبكة
### Content:
CSS Grid يُنشئ شبكة ثنائية الأبعاد.  
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
}
### Step-by-step:
**الخطوة 1:** نحدد الحاوية `display: grid`.  
---
**الخطوة 2:** نعيّن عدد الأعمدة وعرضها `grid-template-columns`.  
---
**الخطوة 3:** نضبط الفجوة بين العناصر `gap`.
### Image: grid_3cols.svg
### Page Reference: 26–27

---
# Unit: CSS3 – التنسيق والتصميم
## Slide: 18
### Lesson: التحويلات والانتقالات (Transforms & Transitions)
### Content:
- **Transform**: `rotate()`, `scale()`, `translate()`, `skew()`.  
- **Transition**: تُنعش التغيّرات بمرور الزمن.
### Example:
.btn {
  transition: transform 0.3s ease;
}
.btn:hover {
  transform: scale(1.1);
}
### Image: button_hover.svg
### Page Reference: 28–29

---
# Unit: CSS3 – التنسيق والتصميم
## Slide: 19
### Lesson: Activity (من كتاب النشاط): تمرين – تصميم بطاقة عمل
### Content:
باستخدام CSS فقط، صمّم بطاقة عمل تحتوي على:  
- خلفية متدرجة (gradient).  
- ظل (shadow).  
- زرّ يكبر عند المرور (scale).
### Question:
ارفع الملف `card.html` مع `styles.css` إلى CodePen وشارك الرابط.
### Page Reference: Activity Book ص 5–6

---
# Unit: JavaScript – البرمجة الديناميكية
## Slide: 20
### Lesson: مقدمة إلى JavaScript
### Content:
JavaScript لغة برمجة تُنفذ في المتصفح.  
تُستخدم من أجل:  
- التحقق من صحة الإدخال قبل الإرسال.  
- تغيير محتوى الصفحة ديناميكياً (DOM Manipulation).  
- إرسال طلبات غير متزامنة (AJAX).
### Example:
<script>
  alert('مرحباً من JavaScript!');
</script>
### Page Reference: 30–31

---
# Unit: JavaScript – البرمجة الديناميكية
## Slide: 21
### Lesson: المتغيّرات والأنواع
### Content:
let name = 'سارة';        // String
const age = 25;           // Number
let isStudent = true;     // Boolean
let hobbies = ['قراءة', 'برمجة']; // Array
### Note:
استخدم `const` افتراضياً، و `let` إذا أردت إعادة التعيين.
### Page Reference: 32–33

---
# Unit: JavaScript – البرمجة الديناميكية
## Slide: 22
### Lesson: الدوال (Functions)
### Content:
// تعريف الدالة
function greet(user) {
  return `مرحباً ${user}`;
}

// سهم الدالة (Arrow)
const add = (a, b) => a + b;
### Question:
اكتب دالة تُحوّل درجة الحرارة من فهرنهايت إلى مئوية.
### Answer:
const toCelsius = f => (f - 32) * 5/9;
### Page Reference: 34–35

---
# Unit: JavaScript – البرمجة الديناميكية
## Slide: 23
### Lesson: التلاعب بالـ DOM
### Content:
// اختيار عنصر
const title = document.querySelector('#title');
// تغيير النص
title.textContent = 'عنوان جديد';
// إضافة صفة
title.classList.add('highlight');
### Image: dom_tree.svg
### Page Reference: 36–37

---
# Unit: JavaScript – البرمجة الديناميكية
## Slide: 24
### Lesson: الأحداث (Events)
### Content:
const btn = document.querySelector('#submit');
btn.addEventListener('click', () => {
  alert('تم النقر!');
});
### MCQ:
أيّ من الأحداث التالية يُطلق عند تحميل الصفحة؟  
a) click  
b) load  
c) hover  
d) scroll
### Answer: b)
### Page Reference: 38–39

---
# Unit: JavaScript – البرمجة الديناميكية
## Slide: 25
### Lesson: Activity (من كتاب النشاط): تمرين – آلة حاسبة بسيطة
### Content:
أنشئ صفحة HTML تحتوي على:  
- حقلي إدخال (`<input type="number">`).  
- قائمة منسدلة (`<select>`) لاختيار العملية (+ − × ÷).  
- زر “احسب”.  
استخدم JavaScript لحساب النتيجة وعرضها في عنصر `<output>`.
### Question:
اضف التحقق من صحة الإدخال بحيث لا يُقبل القسمة على صفر.
### Page Reference: Activity Book ص 7–8

---
# Unit: التكامل والنشر
## Slide: 26
### Lesson: ربط HTML و CSS و JavaScript
### Content:
<!DOCTYPE html>
<html lang="ar">
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1 id="title">مرحباً</h1>
  <script src="app.js"></script>
</body>
</html>
### Note:
يجب أن يأتي `<script>` قبل وسم الإغلاق `</body>` أو بخاصية `defer`.
### Page Reference: 40–41

---
# Unit: التكامل والنشر
## Slide: 27
### Lesson: التخزين المحلي (LocalStorage)
### Content:
// حفظ
localStorage.setItem('theme', 'dark');
// قراءة
const theme = localStorage.getItem('theme');
// حذف
localStorage.removeItem('theme');
### Example:
استخدم `localStorage` لتذكّر اسم المستخدم بعد إدخاله في نموذج.
### Page Reference: 42–43

---
# Unit: التكامل والنشر
## Slide: 28
### Lesson: AJAX و Fetch API
### Content:
fetch('https://api.example.com/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
### Image: fetch_flow.svg
### Page Reference: 44–45

---
# Unit: التكامل والنشر
## Slide: 29
### Lesson: GitHub Pages – النشر المجاني
### Content:
خطوات رفع مشروعك:  
1. أنشئ مستودعاً باسم `username.github.io`.  
2. ارفع ملفاتك (index.html, css, js).  
3. اذهب إلى Settings > Pages واختر الفرع main.  
4. انتظر دقيقة؛ سيكون الرابط `https://username.github.io`.
### Question:
ما اسم الفرع الافتراضي الذي يستخدمه GitHub Pages؟  
a) dev  
b) master  
c) main  
d) gh-pages
### Answer: c)
### Page Reference: 46–47

---
# Unit: التكامل والنشر
## Slide: 30
### Lesson: Activity (من كتاب النشاط): مشروع ختامي – موقع سيرة ذاتية
### Content:
ادمج ما تعلّمته لبناء موقع شخصي يتضمّن:  
- صفحة رئيسية مع صورة ونبذة.  
- صفحة اتصال تحتوي نموذجاً بسيطاً.  
- تنسيقات متجاوبة باستخدام Flexbox/Grid.  
- تفاعلية بسيطة (تبديل السمة المظلمة).
### Question:
ارفع المشروع إلى GitHub Pages وشارك الرابط مع المدرب.
### Page Reference: Activity Book ص 9–10

---
# Unit: التكامل والنشر
## Slide: 31
### Lesson: فحص الأداء باستخدام Lighthouse
### Content:
Lighthouse أداة مدمجة في Chrome لتقييم:  
- الأداء (Performance).  
- إمكانية الوصول (Accessibility).  
- أفضل الممارسات (Best Practices).  
- SEO.  
### Step-by-step:
**الخطوة 1:** افتح Chrome DevTools → تبويب Lighthouse.  
---  
**الخطوة 2:** اختر الفئات ثم اضغط Analyze.  
---  
**الخطوة 3:** استخدم التقرير لتحسين الصور، الضغط، والـ Caching.  
### Image: lighthouse_report.svg  
### Page Reference: 48–49

---
# Unit: التكامل والنشر
## Slide: 32
### Lesson: Progressive Web Apps – مقدمة
### Content:
PWA تطبيقات ويب تعمل كتطبيقات أصلية عبر:  
- **Service Worker** للعمل حتى بدون إنترنت.  
- **Manifest** لتثبيت على الجهاز.  
- HTTPS إجباري.  
### Example:
ملف manifest.json
{
  "name": "ملاحظاتي",
  "short_name": "ملاحظات",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff"
}
### Page Reference: 50–51

---
# Unit: التكامل والنشر
## Slide: 33
### Lesson: Service Worker – التسجيل
### Content:
// app.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registered'))
    .catch(err => console.error(err));
}
### Note:
يجب أن يكون Service Worker في نفس النطاق أو أعلى (scope).
### Page Reference: 52–53

---
# Unit: التكامل والنشر
## Slide: 34
### Lesson: Caching Strategies – Cache First
### Content:
// sw.js
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(res => res || fetch(event.request))
  );
});
### Image: cache_first.svg
### Page Reference: 54–55

---
# Unit: التكامل والنشر
## Slide: 35
### Lesson: إشعارات الدفع (Push Notifications)
### Content:
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    new Notification('مرحباً من PWA!');
  }
});
### MCQ:
أيّ واجهة برمجة تُستخدم لطلب إذن الإشعارات؟  
a) Notification.request()  
b) Notification.permission()  
c) Notification.requestPermission()  
d) PushManager.subscribe()
### Answer: c)
### Page Reference: 56–57

---
# Unit: التكامل والنشر
## Slide: 36
### Lesson: Activity (من كتاب النشاط): تحويل موقعك إلى PWA
### Content:
1. أنشئ ملف `manifest.json` وأضفه إلى `<head>`:  
   `<link rel="manifest" href="manifest.json">`  
2. اكتب Service Worker بسيط يخزّن الصفحة الرئيسية و CSS و JS.  
3. أضف أيقونات متعددة الحجم (192×192, 512×512).  
4. اختبر التثبيت على جهاز محمول.  
### Question:
شارك لقطة شاشة للأيقونة على شاشة الهاتف.
### Page Reference: Activity Book ص 11–12

---
# Unit: أفضل الممارسات وتحسين الأداء
## Slide: 37
### Lesson: Semantic HTML وفوائده
### Content:
استخدام عناصر ذات معنى مثل:  
- `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`  
يفيد محركات البحث وقارئات الشاشة.  
### Example:
<article>
  <h2>مقالتي الأولى</h2>
  <p>...</p>
</article>
### Page Reference: 58–59

---
# Unit: أفضل الممارسات وتحسين الأداء
## Slide: 38
### Lesson: أهمية الصور المضغوطة
### Content:
- استخدم تنسيق WebP لأقل حجم مع أعلى جودة.  
- أبعاد الصورة = الأبعاد المعروضة × نسبة الـ DPR (Device Pixel Ratio).  
- أضف `loading="lazy"` لتحميل الصور أثناء التمرير.
### Example:
<img src="hero-800w.webp"
     srcset="hero-400w.webp 400w, hero-800w.webp 800w"
     sizes="(max-width: 600px) 400px, 800px"
     loading="lazy" alt="صورة البطل">
### Page Reference: 60–61

---
# Unit: أفضل الممارسات وتحسين الأداء
## Slide: 39
### Lesson: Minification و Bundling
### Content:
- **Minify**: أزل المسافات والتعليقات.  
- **Bundle**: دمج عدة ملفات في ملف واحد لتقليل الطلبات.  
أدوات شائعة: Webpack, Vite, Parcel.
### Image: bundle_flow.svg
### Page Reference: 62–63

---
# Unit: أفضل الممارسات وتحسين الأداء
## Slide: 40
### Lesson: أمان الويب – أساسيات
### Content:
- استخدم HTTPS دائماً.  
- صلّب رؤوس الأمان (CSP, X-Content-Type-Options).  
- لا تثق بأي إدخال من المستخدم (XSS).  
### Example:
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'">
### Page Reference: 64–65

---
# Unit: أفضل الممارسات وتحسين الأداء
## Slide: 41
### Lesson: Activity (من كتاب النشاط): تدقيق أمان بسيط
### Content:
1. افحص موقعك باستخدام https://securityheaders.com.  
2. أضف رؤوس الأمان الناقصة في ملف .htaccess أو إعدادات الخادم.  
3. اختبر إدخال نص برمجي خبيث في حقل تعليقات.
### Question:
شارك تقرير الأمان بعد التحسين.
### Page Reference: Activity Book ص 13–14

---
# Unit: مراجعة عامة واستكشاف المسارات المستقبلية
## Slide: 42
### Lesson: استعراض سريع لكل الوحدات
### Content:
- HTML: الهيكل، العناصر الدلالية، النماذج.  
- CSS: Selectors، Box Model، Flexbox، Grid، Animations.  
- JavaScript: Variables, Functions, DOM, Events, Fetch.  
- PWA: Service Worker, Manifest, Notifications.  
- Best Practices: Performance, Security, Accessibility.
### Image: mind_map.svg
### Page Reference: 66–67

---
# Unit: مراجعة عامة واستكشاف المسارات المستقبلية
## Slide: 43
### Lesson: مسارات التعلم التالية
### Content:
- **Frontend Frameworks**: React, Vue, Angular.  
- **Backend**: Node.js, Express, databases.  
- **DevOps**: Docker, CI/CD, Cloud.  
- **Testing**: Jest, Cypress.  
### Note:
أفضل طريقة للتعلم هي بناء مشاريع حقيقية وحلّ المشكلات.
### Page Reference: 68–69

---
# Unit: مراجعة عامة واستكشاف المسارات المستقبلية
## Slide: 44
### Lesson: Final Quiz
### MCQ:
أيّ خاصية CSS تُستخدم لمحاذاة عنصر عمودياً داخل حاوية Flex؟  
a) align-content  
b) justify-items  
c) align-items  
d) vertical-align
### Answer: c)

---
# Unit: مراجعة عامة واستكشاف المسارات المستقبلية
## Slide: 45
### Lesson: Certification Project
### Content:
قم ببناء موقع متكامل يحقق المتطلبات التالية:  
- صفحة رئيسية بتصميم متجاوب.  
- صفحة اتصال مع نموذج يُرسل البيانات إلى https://formspree.io/f/{id}.  
- تثبيت PWA (manifest + service worker).  
- نقاط Lighthouse لا تقل عن 90 في كل فئة.  
### Question:
ارفع المشروع النهائي على GitHub Pages وأرسل الرابط مع ملف README يوضح المميزات.
### Page Reference: 70–71

---
# Unit: مراجعة عامة واستكشاف المسارات المستقبلية
## Slide: 46
### Lesson: التقييم الذاتي – قائمة المراجعة
### Content:
قبل تسليم المشروع النهائي تأكد من:  
- [ ] صحة الـ HTML عبر https://validator.w3.org.  
- [ ] عدم وجود أخطاء في وحدة التحكم بالمتصفح.  
- [ ] تجاوب التصميم على شاشات 320px إلى 1440px.  
- [ ] توافق JavaScript مع المتصفحات الحديثة (ES6+).  
- [ ] وجود ملف README يشرح كيفية تشغيل الموقع محلياً.
### Image: checklist.svg
### Page Reference: 72–73

---
# Unit: مراجعة عامة واستكشاف المسارات المستقبلية
## Slide: 47
### Lesson: التعامل مع الأخطاء الشائعة
### Content:
| الخطأ | الحل |
|-------|------|
| الصور لا تظهر | تحقق من المسار (Case-sensitive). |
| CSS لا يُطبّق | تأكد من صحة الـ Selector أو وجود خطأ syntax. |
| JavaScript لا يعمل | افحص وحدة التحكم (Console) للأخطاء. |
| PWA لا يثبّت | تأكد من وجود HTTPS وmanifest صالح. |
### Page Reference: 74–75

---
# Unit: مراجعة عامة واستكشاف المسارات المستقبلية
## Slide: 48
### Lesson: عرض المشاريع المميزة
### Content:
استعراض سريع لأفضل ثلاثة مشاريع طلابية:  
1. **متجر إلكتروني صغير** يستخدم LocalStorage لسلة التسوق.  
2. **مدونة شخصية** مع نظام تعليقات AJAX.  
3. **لوحة معلومات Covid-19** تستخرج البيانات من API عام.
### Image: students_showcase.svg
### Page Reference: 76–77

---
# Unit: مراجعة عامة واستكشاف المسارات المستقبلية
## Slide: 49
### Lesson: مصادر ومراجع إضافية
### Content:
- **كتب**:  
  - *Eloquent JavaScript* (مجاناً بالعربية والإنجليزية).  
  - *CSS Secrets* – Lea Verou.  
- **منصات**:  
  - freeCodeCamp.org  
  - MDN Web Docs  
- **مجتمعات**:  
  - Stack Overflow  
  - r/webdev  
### Note:
خصص 30 دقيقة يومياً لقراءة مقال أو مشاهدة فيديو تقني.
### Page Reference: 78–79

---
# Unit: مراجعة عامة واستكشاف المسارات المستقبلية
## Slide: 50
### Lesson: رسالة ختامية
### Content:
تهانينا! لقد أكملت رحلة أساسيات تطوير الويب.  
تذكّر:  
> “البرمجة ليست فقط كتابة سطور، بل حلّ لمشكلات حقيقية.”  
استمر في التعلم، وشارك إنجازاتك مع مجتمعك، ولا تتوقف عن البناء.
### Image: graduation.svg
### Page Reference: 80

---
# Unit: الإضافات والتطبيقات المتقدمة
## Slide: 51
### Lesson: تكامل خرائط Google
### Content:
إضافة خريطة تفاعلية بسيطة عبر Google Maps JavaScript API:
<script async defer
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&callback=initMap">
</script>
<script>
function initMap() {
  new google.maps.Map(document.getElementById('map'), {
    center: { lat: 24.7136, lng: 46.6753 },
    zoom: 12
  });
}
</script>
### Note:
يجب تفعيل الفاتورة لاستخدام API (يوجد رصيد مجاني شهرياً).
### Image: google_map_embed.svg
### Page Reference: 81–82

---
# Unit: الإضافات والتطبيقات المتقدمة
## Slide: 52
### Lesson: Chart.js – تمثيل بيانات بصرية
### Content:
مثال خطي لعرض مبيعات 3 أشهر:
<canvas id="salesChart"></canvas>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
new Chart(document.getElementById('salesChart'), {
  type: 'line',
  data: {
    labels: ['يناير', 'فبراير', 'مارس'],
    datasets: [{
      label: 'المبيعات',
      data: [120, 190, 300],
      borderColor: 'teal'
    }]
  }
});
</script>
### Image: chartjs_line.svg
### Page Reference: 83–84

---
# Unit: الإضافات والتطبيقات المتقدمة
## Slide: 53
### Lesson: Web Animations API
### Content:
أنيميشن مخصص بدون CSS:
const box = document.querySelector('.box');
box.animate([
  { transform: 'translateX(0px)', opacity: 1 },
  { transform: 'translateX(200px)', opacity: 0.3 }
], {
  duration: 800,
  iterations: Infinity,
  direction: 'alternate'
});
### Image: web_animations_api.svg
### Page Reference: 85–86

---
# Unit: الإضافات والتطبيقات المتقدمة
## Slide: 54
### Lesson: Activity (من كتاب النشاط): لوحة تحكم صغيرة
### Content:
استخدم Chart.js لبناء لوحة تحكم تُظهر:  
- عدد الزيارات اليومية (بيانات عشوائية).  
- نسبة التحميل على الأجهزة المختلفة (Pie chart).  
- أضف زر “تحديث” لإعادة رسم الرسوم دون تحديث الصفحة.
### Question:
ارفع اللوحة على CodePen وشارك الرابط.
### Page Reference: Activity Book ص 15–16

---
# Unit: الإضافات والتطبيقات المتقدمة
## Slide: 55
### Lesson: Web Components – مقدمة
### Content:
Web Components تتيح إنشاء عناصر مخصصة قابلة لإعادة الاستخدام عبر 3 تقنيات:
1. **Custom Elements**  
2. **Shadow DOM**  
3. **HTML Templates**
### Example:
class MyCounter extends HTMLElement {
  constructor() {
    super();
    this.count = 0;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <button>عدّاد: <span id="val">0</span></button>
    `;
    this.shadowRoot.querySelector('button').onclick = () => {
      this.count++;
      this.shadowRoot.getElementById('val').textContent = this.count;
    };
  }
}
customElements.define('my-counter', MyCounter);
### Image: web_component_counter.svg
### Page Reference: 87–88

---
# Unit: الإضافات والتطبيقات المتقدمة
## Slide: 56
### Lesson: التوافق مع المتصفحات القديمة
### Content:
- استخدم **Polyfills** لدعم خصائص ES6+ في IE11.  
- أداة Babel لتحويل الكود الحديث إلى ES5.  
- موقع Can I Use لتقييم الدعم.
### Example:
npm i core-js
import 'core-js/stable';
import 'regenerator-runtime/runtime';
### Page Reference: 89–90

---
# Unit: الإضافات والتطبيقات المتقدمة
## Slide: 57
### Lesson: إضافة أنماط متعددة (Dark Mode)
### Content:
:root {
  --bg: #ffffff;
  --text: #000000;
}
[data-theme="dark"] {
  --bg: #121212;
  --text: #ffffff;
}
body {
  background: var(--bg);
  color: var(--text);
}
const toggle = document.querySelector('#themeToggle');
toggle.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
});
### Image: dark_mode_toggle.svg
### Page Reference: 91–92

---
# Unit: الإضافات والتطبيقات المتقدمة
## Slide: 58
### Lesson: Final Project Showcase Checklist
### Content:
قبل عرض المشروع النهائي على الحضور تأكد من:  
- [ ] تشغيل الموقع على هاتفك المحمول بدون أخطاء.  
- [ ] تشغيله بدون إنترنت (Service Worker).  
- [ ] عرض رسوم بيانية حية.  
- [ ] التنقل السلس بين الصفحات.  
- [ ] وجود زر تبديل الوضع الليلي.  
### Page Reference: 93–94

---
# Unit: الإضافات والتطبيقات المتقدمة
## Slide: 59
### Lesson: Graduation & Next Steps
### Content:
**ما تعلمت:**  
- بناء صفحات ويب متجاوبة ومتقدمة.  
- تفعيل PWA وتحسين الأداء والأمان.  
- دمج مكتبات خارجية (Maps, Charts, Animations).  

**الخطوات المقبلة:**  
- تعلم إطار عمل Frontend (React أو Vue).  
- استكشاق Node.js للـ Backend.  
- المساهمة في مشاريع مفتوحة المصدر على GitHub.  

### Note:
انضم إلى قناة Slack الخاصة بالدورة لمتابعة التحديثات والتعاون المستمر.
### Image: next_steps_roadmap.svg
### Page Reference: 95–96

---
# Unit: الخلاصة والتقييم النهائي
## Slide: 60
### Lesson: ملخص سريع لكل الوحدات
### Content:
| الوحدة | أهم ما تعلمناه |
|---|---|
| المقدمة | أهمية الويب، مكوناته، أدوات التطوير |
| HTML5 | الهيكل، العناصر الدلالية، النماذج، الجداول |
| CSS3 | Selectors، Flexbox، Grid، Transitions، Responsiveness |
| JavaScript | Variables, Functions, DOM, Events, Fetch, LocalStorage |
| PWA | Service Worker, Manifest, Notifications, Offline Mode |
| أفضل الممارسات | Performance, Security, Accessibility, SEO |
| الإضافات | Maps, Charts, Dark Mode, Web Components |

### Image: summary_infographic.svg
### Page Reference: 97

---
# Unit: الخلاصة والتقييم النهائي
## Slide: 61
### Lesson: التقييم النهائي – نظري
### MCQ:
أيّ من العبارات التالية تصف **Shadow DOM** بشكل صحيح؟  
a) نموذج صندوق CSS لإخفاء العنصر بالكامل  
b) تقنية لعزل الأنماط والبنية داخل عنصر مخصص  
c) وسيلة لتحسين أداء JavaScript  
d) طريقة لإضافة إطارات إلى الصور  
### Answer: b)

---
# Unit: الخلاصة والتقييم النهائي
## Slide: 62
### Lesson: التقييم النهائي – عملي
### Question:
في مشروعك النهائي:  
1. أضف صفحة جديدة `stats.html` تُظهر:  
   - عدد مرات النقر على زر “أعجبني”.  
   - متوسط درجات 5 طلاب (مُدخل يدوياً).  
2. استخدم Chart.js لرسم بيان عمودي للدرجات.  
3. احفظ عدد النقرات في LocalStorage واسترجعه عند التحميل.
### Step-by-step:
**الخطوة 1:** انسخ ملف index.html إلى stats.html.  
---  
**الخطوة 2:** أضف canvas `<canvas id="gradesChart"></canvas>`.  
---  
**الخطوة 3:** استخدم كود Chart.js لرسم البيانات المُدخلة.  
---  
**الخطوة 4:** اربط زر “أعجبني” بزيادة متغير `likes` وحفظه في LocalStorage.  
### Image: stats_page_preview.svg
### Page Reference: 98–99