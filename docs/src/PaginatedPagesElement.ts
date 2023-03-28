import { paginatedPages } from "../../index";

export class PaginatedPagesElement extends HTMLElement {
	static get observedAttributes() {
		return ["current-page", "page-count", "max-visible-count"];
	}

	readonly #pages: HTMLElement;
	readonly #onPopState = () => {
		this.#render();
	};

	constructor() {
		super();
		this.#pages = this.attachShadow({ mode: "open" }).appendChild(document.createElement("div"));
		this.#pages.part.add("pages");
		this.#pages.addEventListener("click", (event) => {
			if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
				const href = ((event.target as Element).closest("a") as HTMLAnchorElement | null)?.href;
				if (href) {
					event.preventDefault();
					history.pushState(0, "", href);
					this.#render();
					this.dispatchEvent(new CustomEvent("page:changed", { bubbles: true, cancelable: true }));
				}
			}
		});
	}

	connectedCallback() {
		addEventListener("popstate", this.#onPopState);
		this.#render();
	}

	disconnectedCallback() {
		removeEventListener("popstate", this.#onPopState);
	}

	attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
		if (this.#isAttributeChangedCallbackEnabled && _oldValue !== newValue) {
			switch (name) {
				case "page-count":
					this.pageCount = +newValue;
					return;
				case "current-page-param-name":
					this.currentPageParamName = newValue;
					return;
				case "max-visible-count":
					this.maxVisibleCount = +newValue;
					return;
			}
		}
	}

	#isAttributeChangedCallbackEnabled = 1;
	#renderRequest?: number;
	#render() {
		this.#isAttributeChangedCallbackEnabled = 0;
		this.setAttribute("page-count", this.#pageCount as string & number);
		this.setAttribute("max-visible-count", this.#maxVisibleCount as string & number);
		this.#isAttributeChangedCallbackEnabled = 1;

		this.#renderRequest ??= requestAnimationFrame(() => {
			this.#renderRequest = undefined;
			const root = this.#pages;
			const paramsBase = new URLSearchParams(location.search);
			const currentPage = +paramsBase.get(this.currentPageParamName)! || 1;
			paramsBase.delete(this.currentPageParamName);

			const href = (page: number) => {
				if (page === currentPage || page < 1 || page > this.pageCount) {
					return "";
				}
				const params = new URLSearchParams(paramsBase);
				params.set(this.currentPageParamName, page as string & number);
				return ` href="?${params.toString()}"`;
			};
			root.innerHTML = `<a draggable=false part="page icon${currentPage === 1 ? " disabled" : ""}"${href(currentPage - 1)}>‹</a>`;
			paginatedPages(currentPage, this.pageCount, this.maxVisibleCount).forEach((pages, i) => {
				if (i !== 0) {
					root.innerHTML += "<span part=dots>...</span>";
				}
				for (const page of pages) {
					root.innerHTML += `<a draggable=false part="page${page === currentPage ? " active" : ""}"${href(page)}>${page}</a>`;
				}
			});
			root.innerHTML += `<a draggable=false part="page icon${currentPage === this.pageCount ? " disabled" : ""}"${href(
				currentPage + 1,
			)}>›</a>`;
		});
	}

	#currentPageParamName = "page";
	get currentPageParamName() {
		return this.#currentPageParamName;
	}
	set currentPageParamName(currentPageParamName) {
		if (this.#currentPageParamName !== currentPageParamName) {
			this.#currentPageParamName = currentPageParamName;
			this.#render();
		}
	}

	#pageCount = 0;
	get pageCount() {
		return this.#pageCount;
	}
	set pageCount(pageCount) {
		if (this.#pageCount !== pageCount && pageCount > 0) {
			this.#pageCount = pageCount;
			this.#render();
		}
	}

	#maxVisibleCount = 9;
	get maxVisibleCount() {
		return this.#maxVisibleCount;
	}
	set maxVisibleCount(maxVisibleCount) {
		if (this.#maxVisibleCount !== maxVisibleCount && maxVisibleCount > 0) {
			this.#maxVisibleCount = maxVisibleCount;
			this.#render();
		}
	}
}

customElements.define("paginated-pages", PaginatedPagesElement);
