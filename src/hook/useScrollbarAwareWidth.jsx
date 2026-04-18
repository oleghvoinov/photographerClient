import { useState, useEffect, useRef } from "react";

// Функция для вычисления ширины скроллбара
function getScrollbarWidth() {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.msOverflowStyle = "scrollbar";
  outer.style.width = "100px";
  document.body.appendChild(outer);

  const inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
}

// Debounce для оптимизации
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export function useScrollbarAwareWidth(containerRef) {
  const [containerWidth, setContainerWidth] = useState(null);
  const scrollbarWidthRef = useRef(getScrollbarWidth());

  useEffect(() => {
    if (!containerRef.current) return;

    function updateWidth() {
      const el = containerRef.current;
      const baseWidth = el.offsetWidth;
      const hasVerticalScrollbar = el.scrollHeight > el.clientHeight;
      const width = hasVerticalScrollbar
        ? baseWidth - scrollbarWidthRef.current
        : baseWidth;
      setContainerWidth(width);
    }

    const debouncedUpdate = debounce(updateWidth, 50);

    updateWidth();

    const resizeObserver = new ResizeObserver(debouncedUpdate);
    resizeObserver.observe(containerRef.current);

    window.addEventListener("resize", debouncedUpdate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", debouncedUpdate);
    };
  }, [containerRef]);

  return containerWidth;
}
