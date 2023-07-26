document$.subscribe(function () {
  const tables = document.querySelectorAll('article table')
  tables.forEach(function (table) {
    new Tablesort(table)
  })
})
