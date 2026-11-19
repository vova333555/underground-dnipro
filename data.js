const APP_DATA = {
  categories: [
    { id: "all", uk: "Усе", en: "All" }, { id: "plastic", uk: "Пластик", en: "Plastic" },
    { id: "paper", uk: "Папір", en: "Paper" }, { id: "glass-metal", uk: "Скло / метал", en: "Glass / metal" },
    { id: "hazardous", uk: "Небезпечне", en: "Hazardous" }, { id: "other", uk: "Залишкове", en: "Residual" }
  ],
  status: { recycle: {uk:"Переробляється",en:"Recyclable"}, station:{uk:"Лише на станцію",en:"Station only"}, no:{uk:"Залишкові відходи",en:"Residual waste"} },
  items: [
    ["Пластикова пляшка (PET)","Plastic bottle (PET)","plastic","♻️","recycle","Сполосни, зніми кришку й зімни. Перевір місцеві правила приймання.","Rinse, remove the cap and crush. Check local collection rules."],
    ["Пляшка з-під олії","Cooking oil bottle","plastic","🧴","station","Брудну тару з-під олії приймають не всюди — уточни на станції.","Oily packaging is not accepted everywhere; check with a local station."],
    ["Пакет / плівка","Plastic bag / film","plastic","🛍️","station","Чисту суху плівку здавай окремо на станції сортування.","Take clean, dry film separately to a sorting station."],
    ["Йогуртова склянка","Yogurt cup","plastic","🥣","station","Сполосни від залишків. Тип пластику й правила приймання різняться.","Rinse clean. Polymer type and acceptance rules vary."],
    ["Пінопласт","Polystyrene foam","plastic","📦","station","Зазвичай приймають лише спеціалізовані пункти.","Usually accepted only at specialized collection points."],
    ["Кришечка від пляшки","Bottle cap","plastic","🔵","station","Збирай окремо: кришки можуть мати окрему програму збору.","Collect separately; caps may have a dedicated program."],
    ["Картонна коробка","Cardboard box","paper","📦","recycle","Зроби сухою та пласкою; прибери залишки їжі й скотч.","Keep dry and flatten; remove food residue and tape."],
    ["Газета / журнал","Newspaper / magazine","paper","📰","recycle","Здай сухими. Глянцеві обкладинки приймають за місцевими правилами.","Keep dry. Check local rules for glossy covers."],
    ["Паперовий чек","Thermal receipt","paper","🧾","no","Термопапір часто не переробляється як звичайний папір.","Thermal paper often cannot be recycled with regular paper."],
    ["Паперовий стаканчик","Paper coffee cup","paper","☕","station","Має внутрішній шар пластику; потрібен спеціальний збір.","Has a plastic lining and needs special collection."],
    ["Піца-коробка","Pizza box","paper","🍕","station","Чисту частину можна здати з картоном; жирну — ні.","Recycle clean parts with cardboard; discard greasy parts."],
    ["Книжка","Book","paper","📚","station","У доброму стані краще передати іншому; зіпсовані книги — на станцію.","Pass on books in good condition; take damaged ones to a station."],
    ["Скляна банка","Glass jar","glass-metal","🫙","recycle","Спорожни й сполосни. Кришку сортуй окремо.","Empty and rinse. Sort the lid separately."],
    ["Скляна пляшка","Glass bottle","glass-metal","🍾","recycle","Спорожни; не розбивай. Кольорове скло може збиратися окремо.","Empty it; do not break. Colored glass may be collected separately."],
    ["Алюмінієва банка","Aluminum can","glass-metal","🥫","recycle","Сполосни та зімни, якщо цього вимагає пункт збору.","Rinse and crush if your collection point requests it."],
    ["Металева консервна банка","Tin can","glass-metal","🥫","recycle","Прибери залишки їжі, сполосни та висуши.","Remove food, rinse and dry."],
    ["Батарейка","Battery","hazardous","🔋","station","Не викидай у змішані відходи. Здай у спеціальний контейнер.","Never put it in mixed waste. Use a dedicated drop-off box."],
    ["Лампочка","Light bulb","hazardous","💡","station","Люмінесцентні лампи — небезпечні; уточни тип і пункт приймання.","Fluorescent bulbs are hazardous; check bulb type and drop-off."],
    ["Електроніка","Small electronics","hazardous","🎧","station","Здай у пункт збору електроніки або на станцію.","Take to an e-waste collection point or sorting station."],
    ["Ліки","Expired medicine","hazardous","💊","station","Не зливай у каналізацію. Шукай аптеку чи пункт, що приймає ліки.","Do not flush. Find a pharmacy or point that accepts medicines."],
    ["Залишки їжі","Food scraps","other","🍌","station","Компостуй, якщо маєш таку можливість; інакше — змішані відходи.","Compost if possible; otherwise use residual waste."],
    ["Брудна серветка","Used tissue","other","🧻","no","Не підлягає переробці разом із чистим папером.","Not recyclable with clean paper."],
    ["Керамічна чашка","Ceramic mug","other","☕","no","Кераміка не є тарним склом — загорни уламки перед викиданням.","Ceramic is not packaging glass; wrap broken pieces before disposal."],
    ["Підгузок","Disposable diaper","other","🧷","no","Залишкові відходи. Не клади у вторсировину.","Residual waste. Keep out of recyclables."],
    ["Тетрапак","Drink carton / Tetra Pak","paper","🧃","station","Спорожни, сполосни й сплюсни. Приймання залежить від міста.","Empty, rinse and flatten. Acceptance depends on your city."]
  ],
  quickTags: ["Пляшка","Батарейка","Тетрапак","Чек","Стаканчик"],
  steps: [
    {uk:"Знайди вдома місце для сортування",en:"Set up a sorting spot at home"},
    {uk:"Почни з паперу, скла та пластику",en:"Start with paper, glass and plastic"},
    {uk:"Знайди найближчу точку приймання",en:"Find your nearest collection point"}
  ],
  marks: [
    ["1 PET","Поліетилентерефталат","Пляшки для напоїв. Часто приймається окремо.","Polyethylene terephthalate","Drink bottles. Often collected separately.","#4caf50"],
    ["2 HDPE","Поліетилен високої щільності","Флакони та каністри. Уточни місцеве приймання.","High-density polyethylene","Bottles and containers. Check local acceptance.","#74b94e"],
    ["3 PVC","Полівінілхлорид","Рідко приймається у звичайному потоці.","Polyvinyl chloride","Rarely accepted in regular recycling.","#d89535"],
    ["4 LDPE","Поліетилен низької щільності","Пакети та плівка — часто лише на станціях.","Low-density polyethylene","Bags and film, often station-only.","#d89535"],
    ["5 PP","Поліпропілен","Кришки й контейнери; залежить від пункту.","Polypropylene","Caps and tubs; depends on the collection point.","#74b94e"],
    ["6 PS","Полістирол","Пінопласт та одноразовий посуд.","Polystyrene","Foam and disposable tableware.","#d89535"],
    ["7 OTHER","Інші полімери","Складні суміші. Перевіряй у приймального пункту.","Other polymers","Complex mixes. Ask the collection point.","#d89535"],
    ["20 PAP","Картон","Сухий і чистий картон зазвичай приймають.","Cardboard","Dry, clean cardboard is commonly accepted.","#4caf50"]
  ],
  quiz: [
    {uk:"Банка з-під напою",en:"Drink can",emoji:"🥫",answer:"glass-metal",whyUk:"Металеву банку спорожни й сполосни.",whyEn:"Empty and rinse the metal can."},
    {uk:"Батарейка",en:"Battery",emoji:"🔋",answer:"hazardous",whyUk:"Батарейки здають у спеціальні пункти.",whyEn:"Batteries go to dedicated collection points."},
    {uk:"Скляна банка",en:"Glass jar",emoji:"🫙",answer:"glass-metal",whyUk:"Скляну тару спорожни й сполосни.",whyEn:"Empty and rinse glass packaging."},
    {uk:"Паперовий чек",en:"Thermal receipt",emoji:"🧾",answer:"other",whyUk:"Термочеки зазвичай не переробляють із папером.",whyEn:"Thermal receipts usually do not go with paper."},
    {uk:"Картонна коробка",en:"Cardboard box",emoji:"📦",answer:"paper",whyUk:"Сухий картон — у папір.",whyEn:"Dry cardboard goes with paper."}
  ],
  faq: [
    ["Потрібно мити кожну упаковку до ідеалу?","Ні. Достатньо прибрати залишки їжі та сполоснути тару. Чиста вторсировина не забруднює інші матеріали.","Do I need to wash every package perfectly?","No. Remove food residue and give packaging a quick rinse. Clean recyclables help prevent contamination."],
    ["Усе з позначкою переробки приймуть?","Ні. Позначка вказує на матеріал, а доступність переробки залежить від місцевої інфраструктури та пункту збору.","Will every item with a recycling symbol be accepted?","No. The symbol identifies the material; recycling access depends on local infrastructure and collection points."],
    ["Можна змішувати різні матеріали?","Краще розділяти складові, якщо це легко: наприклад, кришку й пляшку. Орієнтуйся на правила конкретного пункту.","Can I mix different materials?","Separate components when easy, such as a cap from a bottle. Follow your collection point's rules."],
    ["Куди здавати батарейки та лампи?","Лише у спеціальні контейнери або пункти приймання небезпечних відходів. Не клади їх у звичайний контейнер.","Where do batteries and bulbs go?","Use dedicated hazardous-waste collection points. Never put them in regular bins."]
  ]
};