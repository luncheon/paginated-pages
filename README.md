# paginated-pages

Calculate paginated visible pages. [Demo](https://luncheon.github.io/paginated-pages/)

```ts
import paginatedPages from "paginated-pages";

const pageCount = 20;
const maxVisibleCount = 9;

let currentPage = 1;
console.log(paginatedPages(currentPage, pageCount, maxVisibleCount));
// => [[1, 2, 3, 4, 5, 6, 7], [20]]

currentPage = 10;
console.log(paginatedPages(currentPage, pageCount, maxVisibleCount));
// => [[1], [8, 9, 10, 11, 12], [20]]

currentPage = 20;
console.log(paginatedPages(currentPage, pageCount, maxVisibleCount));
// => [[1], [14, 15, 16, 17, 18, 19, 20]]
```

## License

[WTFPL](http://www.wtfpl.net)
