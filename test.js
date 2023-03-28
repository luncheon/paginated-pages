import { deepEqual } from "node:assert/strict";
import { it } from "node:test";
import { paginatedPages } from "./index.js";

it(undefined, () => {
	deepEqual(paginatedPages(0, 0, 7), [[1]]);
	deepEqual(paginatedPages(1, 0, 7), [[1]]);
	deepEqual(paginatedPages(1, 1, 7), [[1]]);

	deepEqual(paginatedPages(1, 2, 7), [[1, 2]]);
	deepEqual(paginatedPages(2, 2, 7), [[1, 2]]);
	deepEqual(paginatedPages(3, 2, 7), [[1, 2]]);

	deepEqual(paginatedPages(1, 7, 7), [[1, 2, 3, 4, 5, 6, 7]]);
	deepEqual(paginatedPages(4, 7, 7), [[1, 2, 3, 4, 5, 6, 7]]);
	deepEqual(paginatedPages(7, 7, 7), [[1, 2, 3, 4, 5, 6, 7]]);

	deepEqual(paginatedPages(1, 8, 7), [[1, 2, 3, 4, 5], [8]]);
	deepEqual(paginatedPages(2, 8, 7), [[1, 2, 3, 4, 5], [8]]);
	deepEqual(paginatedPages(3, 8, 7), [[1, 2, 3, 4, 5], [8]]);
	deepEqual(paginatedPages(4, 8, 7), [[1, 2, 3, 4, 5], [8]]);
	deepEqual(paginatedPages(5, 8, 7), [[1], [4, 5, 6, 7, 8]]);
	deepEqual(paginatedPages(6, 8, 7), [[1], [4, 5, 6, 7, 8]]);
	deepEqual(paginatedPages(7, 8, 7), [[1], [4, 5, 6, 7, 8]]);
	deepEqual(paginatedPages(8, 8, 7), [[1], [4, 5, 6, 7, 8]]);

	deepEqual(paginatedPages(1, 9, 7), [[1, 2, 3, 4, 5], [9]]);
	deepEqual(paginatedPages(2, 9, 7), [[1, 2, 3, 4, 5], [9]]);
	deepEqual(paginatedPages(3, 9, 7), [[1, 2, 3, 4, 5], [9]]);
	deepEqual(paginatedPages(4, 9, 7), [[1, 2, 3, 4, 5], [9]]);
	deepEqual(paginatedPages(5, 9, 7), [[1], [4, 5, 6], [9]]);
	deepEqual(paginatedPages(6, 9, 7), [[1], [5, 6, 7, 8, 9]]);
	deepEqual(paginatedPages(7, 9, 7), [[1], [5, 6, 7, 8, 9]]);
	deepEqual(paginatedPages(8, 9, 7), [[1], [5, 6, 7, 8, 9]]);
	deepEqual(paginatedPages(9, 9, 7), [[1], [5, 6, 7, 8, 9]]);

	deepEqual(paginatedPages(1, 12, 8), [[1, 2, 3, 4, 5, 6], [12]]);
	deepEqual(paginatedPages(2, 12, 8), [[1, 2, 3, 4, 5, 6], [12]]);
	deepEqual(paginatedPages(3, 12, 8), [[1, 2, 3, 4, 5, 6], [12]]);
	deepEqual(paginatedPages(4, 12, 8), [[1, 2, 3, 4, 5, 6], [12]]);
	deepEqual(paginatedPages(5, 12, 8), [[1], [4, 5, 6, 7], [12]]);
	deepEqual(paginatedPages(6, 12, 8), [[1], [5, 6, 7, 8], [12]]);
	deepEqual(paginatedPages(7, 12, 8), [[1], [6, 7, 8, 9], [12]]);
	deepEqual(paginatedPages(8, 12, 8), [[1], [7, 8, 9, 10, 11, 12]]);
	deepEqual(paginatedPages(9, 12, 8), [[1], [7, 8, 9, 10, 11, 12]]);
	deepEqual(paginatedPages(10, 12, 8), [[1], [7, 8, 9, 10, 11, 12]]);
	deepEqual(paginatedPages(11, 12, 8), [[1], [7, 8, 9, 10, 11, 12]]);
	deepEqual(paginatedPages(12, 12, 8), [[1], [7, 8, 9, 10, 11, 12]]);

	deepEqual(paginatedPages(1, 12, 9), [[1, 2, 3, 4, 5, 6, 7], [12]]);
	deepEqual(paginatedPages(2, 12, 9), [[1, 2, 3, 4, 5, 6, 7], [12]]);
	deepEqual(paginatedPages(3, 12, 9), [[1, 2, 3, 4, 5, 6, 7], [12]]);
	deepEqual(paginatedPages(4, 12, 9), [[1, 2, 3, 4, 5, 6, 7], [12]]);
	deepEqual(paginatedPages(5, 12, 9), [[1, 2, 3, 4, 5, 6, 7], [12]]);
	deepEqual(paginatedPages(6, 12, 9), [[1], [4, 5, 6, 7, 8], [12]]);
	deepEqual(paginatedPages(7, 12, 9), [[1], [5, 6, 7, 8, 9], [12]]);
	deepEqual(paginatedPages(8, 12, 9), [[1], [6, 7, 8, 9, 10, 11, 12]]);
	deepEqual(paginatedPages(9, 12, 9), [[1], [6, 7, 8, 9, 10, 11, 12]]);
	deepEqual(paginatedPages(10, 12, 9), [[1], [6, 7, 8, 9, 10, 11, 12]]);
	deepEqual(paginatedPages(11, 12, 9), [[1], [6, 7, 8, 9, 10, 11, 12]]);
	deepEqual(paginatedPages(12, 12, 9), [[1], [6, 7, 8, 9, 10, 11, 12]]);
});
