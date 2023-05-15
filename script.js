const data = [
  {
    title: "Day of the Dragon",
    author: "Richard A. Knaak",
    quantity: 10,
    unit_price: 9,
    total_value: null,
  },
  {
    title: "A Wizard of Earthsea",
    author: "Ursula K. Le Guin",
    quantity: null,
    unit_price: 10,
    total_value: 40,
  },
  {
    title: "Homeland",
    author: "Robert A. Salvatore",
    quantity: 8,
    unit_price: null,
    total_value: 96,
  },
  {
    title: "Canticle",
    author: "Robert A. Salvatore",
    quantity: 13,
    unit_price: 23,
    total_value: null,
  },
  {
    title: "Gamedec. Granica rzeczywistości",
    author: "Marcin Przybyłek",
    quantity: null,
    unit_price: 25,
    total_value: 50,
  },
  {
    title: "The Night Has Come",
    author: "Stephen King",
    quantity: 30,
    unit_price: null,
    total_value: 900,
  },
  {
    title: "The Sphinx",
    author: "Graham Masterton",
    quantity: 3,
    unit_price: null,
    total_value: 300,
  },
  {
    title: "Charnel House",
    author: "Graham Masterton",
    quantity: null,
    unit_price: 20,
    total_value: 60,
  },
  {
    title: "The Devils of D-Day",
    author: "Graham Masterton",
    quantity: 10,
    unit_price: 16,
    total_value: null,
  },
];

const metadata = [
  {
    id: "title",
    type: "string",
    label: "Title",
  },
  {
    id: "author",
    type: "string",
    label: "Author",
  },
  {
    id: "quantity",
    type: "number",
    label: "Quantity",
  },
  {
    id: "unit_price",
    type: "number",
    label: "Unit price",
  },
  {
    id: "total_value",
    type: "number",
    label: "Total (Quantity * Unit price)",
  },
];

const additionalDataFromBooksDB = [
  {
    title: "Day of the Dragon",
    author: "Richard A. Knaak",
    genre: "fantasy",
    pages: 378,
    rating: 3.81,
  },
  {
    title: "A Wizard of Earthsea",
    author: "Ursula K. Le Guin",
    genre: "fantasy",
    pages: 183,
    rating: 4.01,
  },
  {
    title: "Homeland",
    author: "Robert A. Salvatore",
    genre: "fantasy",
    pages: 343,
    rating: 4.26,
  },
  {
    title: "Canticle",
    author: "Robert A. Salvatore",
    genre: "fantasy",
    pages: 320,
    rating: 4.03,
  },
  {
    title: "Gamedec. Granica rzeczywistości",
    author: "Marcin Przybyłek",
    genre: "cyberpunk",
    pages: 364,
    rating: 3.89,
  },
  {
    title: "The Night Has Come",
    author: "Stephen King",
    genre: "post apocalyptic",
    pages: 186,
    rating: 4.55,
  },
  {
    title: "The Sphinx",
    author: "Graham Masterton",
    genre: "horror",
    pages: 207,
    rating: 3.14,
  },
  {
    title: "Charnel House",
    author: "Graham Masterton",
    genre: "horror",
    pages: 123,
    rating: 3.61,
  },
  {
    title: "The Devils of D-Day",
    author: "Graham Masterton",
    genre: "horror",
    pages: 243,
    rating: "3.62",
  },
];

const additionalMetadataFromBooksDB = [
  {
    id: "title",
    type: "string",
    label: "Title",
  },
  {
    id: "author",
    type: "string",
    label: "Author",
  },
  {
    id: "genre",
    type: "string",
    label: "Genre",
  },
  {
    id: "pages",
    type: "number",
    label: "Pages",
  },
  {
    id: "rating",
    type: "number",
    label: "Rating",
  },
];

const summaryMetadata = [
  {
    id: "author",
    type: "string",
    label: "Author",
  },
  {
    id: "titles",
    type: "number",
    label: "Titles",
  },
  {
    id: "total_quantity",
    type: "number",
    label: "Total Quantity",
  },
  {
    id: "total_revenue",
    type: "number",
    label: "Total Revenue",
  },
  {
    id: "avg_quantity",
    type: "number",
    label: "Avg Quantity",
  },
  {
    id: "avg_unit_price",
    type: "number",
    label: "Avg Unit Price",
  },
];

const searchInputElement = document.body.querySelector("input.search-input");
const searchButtonElement = document.body.querySelector("button.search-go");
const searchResetElement = document.body.querySelector("button.search-reset");

const columnHideElement = document.body.querySelector("button.column-hide");
const columnShowElement = document.body.querySelector("button.column-show");
const columnResetElement = document.body.querySelector("button.column-reset");

const markButtonElement = document.body.querySelector("button.function-mark");
const fillButtonElement = document.body.querySelector("button.function-fill");
const countButtonElement = document.body.querySelector("button.function-count");
const computeTotalsButtonElement = document.body.querySelector(
  "button.function-totals"
);
const resetFunctionButtonElement = document.body.querySelector(
  "button.function-reset"
);

class Grid {
  constructor() {
    this.data = this.prepareData(data, additionalDataFromBooksDB);
    this.metadata = this.prepareMetadata(
      metadata,
      additionalMetadataFromBooksDB
    );
    this.visibleData = this.data;
    this.visibleMetadata = this.metadata;

    // HINT: below map can be useful for view operations ;))
    this.dataViewRef = new Map();
    this.summaryDataViewRef = new Map();

    Object.freeze(this.data);
    Object.freeze(this.metadata);

    this.renderMainTable();
    this.live();
    this.renderSummaryTable();
  }

  prepareData(data, additionalData) {
    return data.map((item, i) => {
      const { genre, pages, rating } = additionalData[i];
      return {
        ...item,
        genre,
        pages,
        rating,
      };
    });
  }

  prepareMetadata(metadata, additionalMetadada) {
    var ids = new Set(metadata.map((md) => md.id));
    return [...metadata, ...additionalMetadada.filter((am) => !ids.has(am.id))];
  }

  renderMainTable() {
    this.mainTable = document.createElement("table");

    this.mainTableHead = this.mainTable.createTHead();
    this.mainTableBody = this.mainTable.createTBody();

    this.renderMainTableHead(this.metadata);
    this.renderMainTableBody(this.data, this.metadata);

    document.body.append(this.mainTable);
  }

  renderSummaryTable() {
    this.summaryTable = document.createElement("table");

    this.summaryTableHead = this.summaryTable.createTHead();
    this.summaryTableBody = this.summaryTable.createTBody();

    this.renderSummaryTableHead();
    this.renderSummaryTableBody();

    document.body.append(this.summaryTable);
  }

  renderMainTableHead(metadata) {
    const row = this.mainTableHead.insertRow();

    metadata.forEach(({ label }) => {
      const cell = row.insertCell();
      cell.innerText = label;
    });
  }

  renderSummaryTableHead() {
    const row = this.summaryTableHead.insertRow();

    summaryMetadata.forEach(({ label }) => {
      const cell = row.insertCell();
      cell.innerText = label;
    });
  }

  renderMainTableBody(data, metadata) {
    for (const dataRow of data) {
      const row = this.mainTableBody.insertRow();

      for (const column of metadata) {
        const cell = row.insertCell();

        cell.classList.add(column.type);
        cell.innerText = dataRow[column.id];
      }

      // connect data row reference with view row reference
      this.dataViewRef.set(dataRow, row);
    }
  }

  renderSummaryTableBody() {
    const groupedData = this.visibleData.reduce((acc, curr) => {
      (acc[curr["author"]] = acc[curr["author"]] || []).push(curr);
      return acc;
    }, {});

    Object.entries(groupedData).forEach(([author, books]) => {
      const row = this.summaryTableBody.insertRow();
      const summaryData = {
        author: author,
        titles: books.length,
        total_quantity: books.reduce((acc, { quantity }) => acc + quantity, 0),
        total_revenue: books.reduce(
          (acc, { total_value }) => acc + total_value,
          0
        ),
        avg_quantity:
          Math.round(
            (books.reduce((acc, { quantity }) => acc + quantity, 0) /
              books.length +
              Number.EPSILON) *
              100
          ) / 100,
        avg_unit_price:
          Math.round(
            (books.reduce((acc, { unit_price }) => acc + unit_price, 0) /
              books.length +
              Number.EPSILON) *
              100
          ) / 100,
      };

      summaryMetadata.forEach(({ id, type }) => {
        const cell = row.insertCell();

        cell.classList.add(type);
        cell.innerText = summaryData[id];
      });

      this.summaryDataViewRef.set(books, row);
    });
  }

  live() {
    searchButtonElement.addEventListener("click", this.onSearchGo.bind(this));
    searchInputElement.addEventListener(
      "keydown",
      this.onSearchChange.bind(this)
    );
    searchResetElement.addEventListener("click", this.onSearchReset.bind(this));

    columnHideElement.addEventListener(
      "click",
      this.onColumnHideClick.bind(this)
    );
    columnShowElement.addEventListener(
      "click",
      this.onColumnShowClick.bind(this)
    );
    columnResetElement.addEventListener("click", this.onColumnReset.bind(this));

    markButtonElement.addEventListener(
      "click",
      this.onMarkEmptyClick.bind(this)
    );
    fillButtonElement.addEventListener(
      "click",
      this.onFillTableClick.bind(this)
    );
    countButtonElement.addEventListener(
      "click",
      this.onCountEmptyClick.bind(this)
    );
    computeTotalsButtonElement.addEventListener(
      "click",
      this.onComputeTotalsClick.bind(this)
    );
    resetFunctionButtonElement.addEventListener(
      "click",
      this.onFunctionsResetClick.bind(this)
    );
  }

  rerenderView() {
    this.dataViewRef.forEach((ref) => ref.remove());
    this.summaryDataViewRef.forEach((ref) => ref.remove());
    this.renderMainTableBody(this.visibleData, this.visibleMetadata);
    this.renderSummaryTableBody();
  }

  onSearchGo(event) {
    this.visibleData = this.data.filter(({ title }) =>
      title.toUpperCase().includes(searchInputElement.value.toUpperCase())
    );
    this.rerenderView();
  }

  onSearchChange(event) {
    this.visibleData = this.data.filter(({ title }) =>
      title.toUpperCase().includes(event.target.value.toUpperCase())
    );
    this.rerenderView();
  }

  onSearchReset(event) {
    searchInputElement.value = "";
    this.visibleData = this.data;
    this.rerenderView();
  }

  onColumnHideClick(event) {
    this.mainTableHead.firstChild.remove();
    this.visibleMetadata = this.visibleMetadata.slice(1);
    this.renderMainTableHead(this.visibleMetadata);
    this.rerenderView();
  }

  onColumnShowClick(event) {
    if (this.visibleMetadata.length === this.metadata.length) return;
    this.mainTableHead.firstChild.remove();
    const foundMetadata = this.metadata.find(
      ({ id }) => !this.visibleMetadata.map(({ id }) => id).includes(id)
    );
    this.visibleMetadata.splice(
      this.metadata.findIndex(({ id }) => id === foundMetadata.id),
      0,
      foundMetadata
    );
    this.renderMainTableHead(this.visibleMetadata);
    this.rerenderView();
  }

  onColumnReset(event) {
    this.mainTableHead.firstChild.remove();
    this.visibleMetadata = this.metadata;
    this.renderMainTableHead(this.visibleMetadata);
    this.rerenderView();
  }

  onMarkEmptyClick(event) {
    this.dataViewRef.forEach((ref) => {
      [...ref.children].forEach((child) => {
        if (!child.innerHTML) child.style.border = "2px solid red";
      });
    });
  }

  onFillTableClick(event) {
    this.visibleData = this.visibleData.map(
      ({ quantity, unit_price, total_value, ...rest }) => ({
        ...rest,
        quantity: quantity || total_value / unit_price,
        unit_price: unit_price || total_value / quantity,
        total_value: total_value || quantity * unit_price,
      })
    );
    this.rerenderView();
  }

  onCountEmptyClick(event) {
    const count = this.visibleData.reduce(
      (acc, { quantity, unit_price, total_value }) =>
        acc +
        [quantity, unit_price, total_value].filter((value) => !value).length,
      0
    );
    alert(`Found ${count} empty cells`);
  }

  onComputeTotalsClick(event) {
    const sum = this.visibleData.reduce(
      (acc, { total_value }) => acc + total_value,
      0
    );
    alert(`Sum of Total (Quantity * Unit price) equals ${sum}`);
  }

  onFunctionsResetClick(event) {
    this.visibleData = this.data;
    this.rerenderView();
  }
}

new Grid();
