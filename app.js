(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const langSelect = $("#language");
  let lang = localStorage.getItem("ug-lang") || "uk";
  let category = "all", query = "", quizIndex = 0, score = 0, answered = false;
  const t = (uk,en) => lang === "uk" ? uk : en;
  const translations = {
    navGuide:["Довідник","Guide"],navSteps:["Як почати","Getting started"],navMarks:["Маркування","Markings"],navGame:["Гра","Game"],
    eyebrow:["МЕНШЕ СМІТТЯ — БІЛЬШЕ МАЙБУТНЬОГО","LESS WASTE — MORE FUTURE"],
    heroTitle:["Сортувати —<br><em>це просто.</em>","Sorting —<br><em>made simple.</em>"],
    heroText:["Знайди, куди здати річ, і зроби перший крок до чистішого міста.","Find where to take an item and make your first step toward a cleaner city."],
    heroCta:["Знайти контейнер","Find a collection point"],heroNote:["Локальні поради для Дніпра та України","Local guidance for Dnipro and Ukraine"],
    guideTitle:["Куди викинути?","Where does it go?"],guideText:["Почни вводити назву предмета — підкажемо, як підготувати його до переробки.","Type an item to learn how to prepare it for recycling."],
    searchPlaceholder:["Наприклад, пластикова пляшка","Try plastic bottle"],suggest:["Не знайшли? Запропонувати предмет ↗","Can't find it? Suggest an item ↗"],
    stepsTitle:["Почни з трьох кроків","Start with three steps"],stepsText:["Не потрібно змінювати все одразу. Обери одну звичку та рухайся у своєму темпі.","You don't need to change everything at once. Pick one habit and go at your own pace."],
    progressLabel:["ТВІЙ ПРОГРЕС","YOUR PROGRESS"],progressText:["Кожна маленька дія має значення.","Every small action matters."],
    marksTitle:["Мова упаковки","Read the packaging"],marksText:["Маркування підкаже тип матеріалу. Воно не завжди гарантує, що річ приймуть у твоєму місті.","Markings identify material, but do not guarantee local acceptance."],
    gameTitle:["Сортувальник","The sorter"],gameText:["Перевір інтуїцію: обери контейнер для предмета на картці.","Test your instincts: choose a bin for the item on the card."],gameStart:["Наступний предмет ↗","Next item ↗"],
    scoreLabel:["РАХУНОК","SCORE"],quizPrompt:["Куди її відсортуєш?","Which bin would you choose?"],
    faqTitle:["Міфи та запитання","Myths & questions"],faqText:["Коротко про те, що найчастіше збиває з пантелику.","Quick answers to common questions."],
    footerLine:["Місто чистіше, коли кожен знає, що робити.","A cleaner city starts with knowing what to do."],backTop:["Нагору ↑","Back to top ↑"],
    modalTitle:["Додати предмет","Suggest an item"],modalText:["Підкажіть, про який предмет варто додати інформацію.","Tell us which item needs sorting guidance."],modalLabel:["Назва предмета","Item name"],modalPlaceholder:["Наприклад, касовий чек","For example, receipt"],modalSend:["Надіслати пропозицію ↗","Send suggestion ↗"]
  };
  function applyLanguage(){
    document.documentElement.lang=lang; langSelect.value=lang; localStorage.setItem("ug-lang",lang);
    document.querySelectorAll("[data-i18n]").forEach(el=>{const pair=translations[el.dataset.i18n];if(pair)el.innerHTML=pair[lang==="uk"?0:1]});
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{const pair=translations[el.dataset.i18nPlaceholder];if(pair)el.placeholder=pair[lang==="uk"?0:1]});
    renderFilters();renderChips();renderItems();renderSteps();renderMarks();renderQuiz();renderFaq();
  }
  function renderFilters(){ $("#category-filters").innerHTML=APP_DATA.categories.map(c=>'<button class="filter '+(category===c.id?'active':'')+'" data-category="'+c.id+'">'+c[lang]+'</button>').join(""); }
  function renderChips(){ $("#quick-tags").innerHTML=APP_DATA.quickTags.map((x,i)=>'<button class="chip" data-tag="'+i+'">'+x+'</button>').join(""); }
  function renderItems(){
    const found=APP_DATA.items.filter(x=>(category==="all"||x[2]===category)&&(!query||(x[lang==="uk"?0:1]+" "+x[6]+x[5]).toLowerCase().includes(query)));
    $("#result-count").textContent=lang==="uk"?found.length+" предметів у довіднику":found.length+" items in guide";
    $("#item-results").innerHTML=found.length?found.map(x=>'<article class="item-card"><div class="item-top"><span class="item-emoji">'+x[3]+'</span><span class="badge '+(x[4]==="station"?"station":x[4]==="no"?"no":"")+'">'+APP_DATA.status[x[4]][lang]+'</span></div><h3>'+x[lang==="uk"?0:1]+'</h3><p>'+x[lang==="uk"?5:6]+'</p></article>').join(""):'<div class="empty-state">'+(lang==="uk"?"Нічого не знайшли. Спробуй інший запит або запропонуй предмет.":"No matches. Try another search or suggest an item.")+'</div>';
  }
  function renderSteps(){const saved=JSON.parse(localStorage.getItem("ug-steps")||"[]");$("#checklist").innerHTML=APP_DATA.steps.map((s,i)=>'<label class="step '+(saved.includes(i)?"done":"")+'"><span class="step-num">0'+(i+1)+'</span><input type="checkbox" data-step="'+i+'" '+(saved.includes(i)?"checked":"")+'><span>'+s[lang]+'</span></label>').join("");updateProgress();}
  function updateProgress(){const checks=[...document.querySelectorAll("[data-step]")],n=checks.filter(c=>c.checked).length,p=Math.round(n/checks.length*100);$("#progress-number").textContent=p+"%";$("#progress-bar").style.width=p+"%";}
  function renderMarks(){$("#mark-grid").innerHTML=APP_DATA.marks.map(m=>'<article class="mark-card"><div class="mark-code" style="border-color:'+m[5]+';color:'+m[5]+'">'+m[0]+'</div><h3>'+m[lang==="uk"?1:3]+'</h3><p>'+m[lang==="uk"?2:4]+'</p></article>').join("");}
  function renderQuiz(){const q=APP_DATA.quiz[quizIndex%APP_DATA.quiz.length];$("#quiz-count").textContent=String(quizIndex%APP_DATA.quiz.length+1).padStart(2,"0")+" / 05";$("#quiz-emoji").textContent=q.emoji;$("#quiz-item").textContent=q[lang];$("#quiz-feedback").textContent=answered?(lang==="uk"?q.whyUk:q.whyEn):(lang==="uk"?"Куди її відсортуєш?":"Which bin would you choose?");$("#score").textContent=score;$("#bin-buttons").innerHTML=APP_DATA.categories.filter(c=>c.id!=="all").map(c=>'<button class="bin-button" data-bin="'+c.id+'" '+(answered?"disabled":"")+'>'+c[lang]+'</button>').join("");}
  function renderFaq(){$("#faq-list").innerHTML=APP_DATA.faq.map((f,i)=>'<article class="faq-item"><button class="faq-question" aria-expanded="false">'+f[lang==="uk"?0:2]+'<span>＋</span></button><div class="faq-answer">'+f[lang==="uk"?1:3]+'</div></article>').join("");}
  $("#search-input").addEventListener("input",e=>{query=e.target.value.trim().toLowerCase();renderItems()});
  $("#category-filters").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(b){category=b.dataset.category;renderFilters();renderItems()}});
  $("#quick-tags").addEventListener("click",e=>{const b=e.target.closest("[data-tag]");if(b){const item=APP_DATA.quickTags[+b.dataset.tag];$("#search-input").value=item;query=item.toLowerCase();category="all";renderFilters();renderItems();$("#search-input").focus()}});
  $("#checklist").addEventListener("change",e=>{if(e.target.matches("[data-step]")){const ids=[...document.querySelectorAll("[data-step]:checked")].map(x=>+x.dataset.step);localStorage.setItem("ug-steps",JSON.stringify(ids));e.target.closest(".step").classList.toggle("done",e.target.checked);updateProgress()}});
  $("#mark-grid").addEventListener("click",()=>{});
  $("#faq-list").addEventListener("click",e=>{const b=e.target.closest(".faq-question");if(b){const row=b.parentElement;row.classList.toggle("open");b.setAttribute("aria-expanded",row.classList.contains("open"));b.querySelector("span").textContent=row.classList.contains("open")?"−":"＋"}});
  $("#bin-buttons").addEventListener("click",e=>{const b=e.target.closest("[data-bin]");if(!b||answered)return;const q=APP_DATA.quiz[quizIndex%APP_DATA.quiz.length];answered=true;if(b.dataset.bin===q.answer)score++;renderQuiz();$("#quiz-feedback").textContent=(b.dataset.bin===q.answer?(lang==="uk"?"Правильно! ":"Correct! "):(lang==="uk"?"Не зовсім. ":"Not quite. "))+(lang==="uk"?q.whyUk:q.whyEn)});
  $("#next-question").addEventListener("click",()=>{quizIndex++;answered=false;renderQuiz()});
  $("#suggest-open").addEventListener("click",()=>$("#suggest-dialog").showModal());
  $("#suggest-form").addEventListener("submit",e=>{e.preventDefault();const name=$("#suggest-item").value.trim();if(name){$("#form-note").textContent=lang==="uk"?"Дякуємо! Пропозицію збережено для цієї сесії.":"Thanks! Your suggestion has been recorded for this session.";$("#suggest-item").value="";setTimeout(()=>$("#suggest-dialog").close(),1200)}});
  $("#theme-toggle").addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("ug-theme",document.body.classList.contains("dark")?"dark":"light")});
  if(localStorage.getItem("ug-theme")==="dark")document.body.classList.add("dark");
  langSelect.addEventListener("change",()=>{lang=langSelect.value;applyLanguage()});
  const menu=$(".menu-toggle");menu.addEventListener("click",()=>{const open=$("#navigation").classList.toggle("open");menu.setAttribute("aria-expanded",open)});
  $("#navigation").addEventListener("click",e=>{if(e.target.closest("a")){$("#navigation").classList.remove("open");menu.setAttribute("aria-expanded","false")}});
  $(".search-shortcut").addEventListener("click",()=>{$("#guide").scrollIntoView();$("#search-input").focus()});
  document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#guide").scrollIntoView();$("#search-input").focus()}});
  applyLanguage();
})();