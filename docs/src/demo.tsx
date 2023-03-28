import { paginatedPages } from "../../index";
import "./demo.css";
import "./PaginatedPagesElement";
import { PaginatedPagesElement } from "./PaginatedPagesElement";
import "./PaginatedPagesElement.css";

import { computed, Signal, signal } from "@preact/signals";
import { render } from "preact";

declare module "preact" {
	namespace JSX {
		interface IntrinsicElements {
			"paginated-pages": HTMLAttributes<PaginatedPagesElement> & {
				"current-page": number | Signal<number>;
				"page-count": number | Signal<number>;
				"max-visible-count": number | Signal<number>;
			};
		}
	}
}

const currentPage = signal(+new URLSearchParams(location.search).get("page")! || 1);
const pageCount = signal(20);
const maxVisibleCount = signal(9);
const pages = computed(() =>
	JSON.stringify(paginatedPages(currentPage.value, pageCount.value, maxVisibleCount.value)).replaceAll(",", ", "),
);

const App = () => {
	return (
		<>
			<div style="font-size: 40px; letter-spacing: -1px">
				<div style="display: flex; align-items: flex-end">
					paginatedPages(
					<label>
						<span>currentPage:</span>
						<input name="currentPage" type="number" value={currentPage} readonly />
					</label>
					,&nbsp;
					<label>
						<span>pageCount:</span>
						<input
							name="pageCount"
							type="number"
							min="0"
							max="9999"
							value={pageCount}
							onInput={(event) => (pageCount.value = event.currentTarget.valueAsNumber)}
						/>
					</label>
					,&nbsp;
					<label>
						<span>maxVisibleCount:</span>
						<input
							name="maxVisibleCount"
							type="number"
							min="5"
							max="20"
							value={maxVisibleCount}
							onInput={(event) => (maxVisibleCount.value = event.currentTarget.valueAsNumber)}
						/>
					</label>
					)
				</div>
				<div style="text-align: right">=&gt; {pages}</div>
			</div>
			<paginated-pages page-count={pageCount} current-page={currentPage} max-visible-count={maxVisibleCount} />
			<a style="font-size: 24px" href="https://github.com/luncheon/paginated-pages">
				GitHub
			</a>
		</>
	);
};

render(<App />, document.body.appendChild(document.createElement("main")));

addEventListener("page:changed", () => (currentPage.value = +new URLSearchParams(location.search).get("page")! || 1));
// const setCurrentPage = () => document.querySelector("input[name=currentPage]").value = +new URLSearchParams(location.search).get("page") || 1;
// const setPaginatedPagesResult = () => ;
// setCurrentPage();
