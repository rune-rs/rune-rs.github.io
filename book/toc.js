// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="foreword.html"><strong aria-hidden="true">1.</strong> Foreword</a></li><li class="chapter-item expanded "><a href="introduction.html"><strong aria-hidden="true">2.</strong> Introduction</a></li><li class="chapter-item expanded "><a href="getting_started.html"><strong aria-hidden="true">3.</strong> Getting Started</a></li><li class="chapter-item expanded "><a href="concepts.html"><strong aria-hidden="true">4.</strong> Concepts</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="items_imports.html"><strong aria-hidden="true">4.1.</strong> Items and imports</a></li><li class="chapter-item expanded "><a href="functions.html"><strong aria-hidden="true">4.2.</strong> Functions</a></li><li class="chapter-item expanded "><a href="control_flow.html"><strong aria-hidden="true">4.3.</strong> Control flow</a></li><li class="chapter-item expanded "><a href="variables.html"><strong aria-hidden="true">4.4.</strong> Variables and memory</a></li><li class="chapter-item expanded "><a href="loops.html"><strong aria-hidden="true">4.5.</strong> Loops</a></li><li class="chapter-item expanded "><a href="pattern_matching.html"><strong aria-hidden="true">4.6.</strong> Pattern matching</a></li><li class="chapter-item expanded "><a href="template_literals.html"><strong aria-hidden="true">4.7.</strong> Template literals</a></li><li class="chapter-item expanded "><a href="instance_functions.html"><strong aria-hidden="true">4.8.</strong> Instance functions</a></li><li class="chapter-item expanded "><a href="field_functions.html"><strong aria-hidden="true">4.9.</strong> Field functions</a></li><li class="chapter-item expanded "><a href="traits.html"><strong aria-hidden="true">4.10.</strong> Traits</a></li></ol></li><li class="chapter-item expanded "><a href="types.html"><strong aria-hidden="true">5.</strong> Built-in types</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="primitives.html"><strong aria-hidden="true">5.1.</strong> Primitives and references</a></li><li class="chapter-item expanded "><a href="vectors.html"><strong aria-hidden="true">5.2.</strong> Vectors</a></li><li class="chapter-item expanded "><a href="objects.html"><strong aria-hidden="true">5.3.</strong> Objects</a></li><li class="chapter-item expanded "><a href="tuples.html"><strong aria-hidden="true">5.4.</strong> Tuples</a></li></ol></li><li class="chapter-item expanded "><a href="dynamic_types.html"><strong aria-hidden="true">6.</strong> Dynamic types</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="structs.html"><strong aria-hidden="true">6.1.</strong> Structs</a></li><li class="chapter-item expanded "><a href="enums.html"><strong aria-hidden="true">6.2.</strong> Enums</a></li></ol></li><li class="chapter-item expanded "><a href="external_types.html"><strong aria-hidden="true">7.</strong> External types</a></li><li class="chapter-item expanded "><a href="try_operator.html"><strong aria-hidden="true">8.</strong> Try operator</a></li><li class="chapter-item expanded "><a href="generators.html"><strong aria-hidden="true">9.</strong> Generators</a></li><li class="chapter-item expanded "><a href="closures.html"><strong aria-hidden="true">10.</strong> Closures</a></li><li class="chapter-item expanded "><a href="async.html"><strong aria-hidden="true">11.</strong> Asynchronous programming</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="streams.html"><strong aria-hidden="true">11.1.</strong> Streams</a></li></ol></li><li class="chapter-item expanded "><a href="multithreading.html"><strong aria-hidden="true">12.</strong> Multithreading</a></li><li class="chapter-item expanded "><a href="hot_reloading.html"><strong aria-hidden="true">13.</strong> Hot reloading</a></li><li class="chapter-item expanded "><a href="macros.html"><strong aria-hidden="true">14.</strong> Macros</a></li><li class="chapter-item expanded "><a href="advanced.html"><strong aria-hidden="true">15.</strong> Advanced</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="drop_order.html"><strong aria-hidden="true">15.1.</strong> Drop order</a></li><li class="chapter-item expanded "><a href="safety.html"><strong aria-hidden="true">15.2.</strong> Safety</a></li><li class="chapter-item expanded "><a href="sandboxing.html"><strong aria-hidden="true">15.3.</strong> Sandboxing</a></li><li class="chapter-item expanded "><a href="the_stack.html"><strong aria-hidden="true">15.4.</strong> The stack</a></li><li class="chapter-item expanded "><a href="call_frames.html"><strong aria-hidden="true">15.5.</strong> Call frames</a></li><li class="chapter-item expanded "><a href="compiler_guide.html"><strong aria-hidden="true">15.6.</strong> Compiler guide</a></li></ol></li><li class="chapter-item expanded "><li class="spacer"></li><li class="chapter-item expanded "><a href="deprecated.html"><strong aria-hidden="true">16.</strong> Deprecated</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="string_literals.html"><strong aria-hidden="true">16.1.</strong> String literals</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
