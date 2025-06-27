/**
 * Handles all navigation logic including menu clicks, keyboard, and touch gestures.
 * For mouse wheel events, it uses a custom inertia analysis engine (with an optional
 * debug graph) to distinguish between page navigation and scrolling within overflowed content.
 */

export function initNavigation() {
  /* — — — — — — — — VARIABLES — — — — — — — — */

  // --- Core Navigation Elements ---
  const navHome = document.getElementById("nav-home");
  const navProjects = document.getElementById("nav-projects");
  const navContact = document.getElementById("nav-contact");
  const navExplanation = document.getElementById("nav-explanation");
  const containers = document.querySelectorAll(".br_container");

  // --- Input Action Thresholds ---
  const TOUCH_THRESHOLD = 20; // Pixel distance for a swipe action

  // --- Touch Input State ---
  let touchStartY = 0;
  let touchEndY = 0;
  let touchTargetScrollableElement = null;
  let touchStartScrollTop = 0;

  // --- Debug Graph Instance ---
  let scrollDebugGraphInstance = null;

  /* — — — — — — — — NAVIGATION LOGIC — — — — — — — — */

  /**
   * Updates the active state of the main navigation items based on the container with --order: 1.
   */
  function updateActiveNavItem() {
    document.querySelectorAll(".br-minimal-nav a").forEach((item) => {
      item.classList.remove("active");
    });

    let activeContainer = null;
    containers.forEach((container) => {
      const orderValue = parseInt(
        container.style.getPropertyValue("--order") || "0"
      );
      if (orderValue === 1) {
        activeContainer = container;
      }
    });

    if (activeContainer) {
      const navId = activeContainer.getAttribute("data-nav-id");
      if (navId) {
        const navItem = document.getElementById(navId);
        if (navItem) {
          navItem.classList.add("active");
        }
      }
    }
  }

  /**
   * Toggles container classes for visual state changes when crossing the order=0 boundary.
   */
  function updateContainerVisualState(container, currentOrder, newOrder) {
    if (currentOrder > 0 && newOrder < 0) {
      container.classList.remove("br_container--default-state");
      container.classList.add("br_container--above");
    } else if (currentOrder < 0 && newOrder > 0) {
      container.classList.add("br_container--default-state");
      container.classList.remove("br_container--above");
    }
  }

  /**
   * Finds the closest scrollable parent element within a .br_container.
   * @param {EventTarget} target - The target of the user interaction event.
   * @returns {HTMLElement|null} - The scrollable element or null if not found.
   */
  function getScrollableParent(target) {
    let el = target;
    while (el && el !== document.body) {
      const style = window.getComputedStyle(el);
      const overflowY = style.getPropertyValue("overflow-y");
      const isScrollable = overflowY === "auto" || overflowY === "scroll";

      // An element is truly scrollable if its style allows it AND its content is larger than its container.
      if (
        isScrollable &&
        el.scrollHeight > el.clientHeight + 1 &&
        el.closest(".br_container")
      ) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }

  /**
   * Updates the '--order' property for all containers in a specified direction.
   * @param {'increment' | 'decrement'} direction - The direction to shift the order.
   */
  function updateAllContainersOrder(direction) {
    const maxBlocks = containers.length;
    let limitReached = false;
    const limitValue = direction === "decrement" ? -(maxBlocks - 1) : maxBlocks;

    // Check if the movement is blocked by reaching the limit
    for (const container of containers) {
      const orderValue = container.style.getPropertyValue("--order");
      if (orderValue && parseInt(orderValue) === limitValue) {
        limitReached = true;
        break;
      }
    }

    if (limitReached) {
      return;
    }

    // Apply the order change to all containers
    containers.forEach((container) => {
      let order =
        container.style.getPropertyValue("--order") ||
        container.getAttribute("data-order") ||
        "0";
      let currentOrder = parseInt(order);
      let newOrder;

      if (direction === "decrement") {
        newOrder = currentOrder === 1 ? -1 : currentOrder - 1;
      } else {
        // increment
        newOrder = currentOrder === -1 ? 1 : currentOrder + 1;
      }

      container.style.setProperty("--order", newOrder);
      updateContainerVisualState(container, currentOrder, newOrder);
    });
    setTimeout(updateActiveNavItem, 100); // Delay to allow CSS transitions to settle
  }

  /**
   * Navigates directly to a view defined by its target base order.
   * @param {number} targetBaseOrder - The target order to navigate to.
   */
  function navigateToView(targetBaseOrder) {
    let currentBaseOrder = Number.MAX_SAFE_INTEGER;
    containers.forEach((container) => {
      const orderVal = parseInt(
        container.style.getPropertyValue("--order") || "1"
      );
      if (orderVal < currentBaseOrder) {
        currentBaseOrder = orderVal;
      }
    });

    let stepsToMove = targetBaseOrder - currentBaseOrder;
    // Adjust for crossing the -1/1 boundary
    if (currentBaseOrder < 0 && targetBaseOrder > 0) {
      stepsToMove -= 1;
    } else if (currentBaseOrder > 0 && targetBaseOrder < 0) {
      stepsToMove += 1;
    }

    const direction = stepsToMove < 0 ? "decrement" : "increment";
    const numSteps = Math.abs(stepsToMove);

    for (let i = 0; i < numSteps; i++) {
      updateAllContainersOrder(direction);
    }
    setTimeout(updateActiveNavItem, 100);
  }

  /**
   * Handles the logic for a swipe gesture.
   */
  function handleSwipe() {
    const deltaY = touchEndY - touchStartY;
    if (Math.abs(deltaY) > TOUCH_THRESHOLD) {
      if (deltaY > 0) {
        // Swipe Down
        updateAllContainersOrder("increment");
      } else {
        // Swipe Up
        updateAllContainersOrder("decrement");
      }
    }
    touchStartY = 0;
    touchEndY = 0;
  }

  // --- Event Listener Setup ---
  if (navHome)
    navHome.addEventListener("click", (e) => {
      if (window.isModalOpen) return;
      e.preventDefault();
      navigateToView(1);
    });
  if (navProjects)
    navProjects.addEventListener("click", (e) => {
      if (window.isModalOpen) return;
      e.preventDefault();
      navigateToView(-1);
    });
  if (navContact)
    navContact.addEventListener("click", (e) => {
      if (window.isModalOpen) return;
      e.preventDefault();
      navigateToView(-6);
    });
  if (navExplanation)
    navExplanation.addEventListener("click", (e) => {
      if (window.isModalOpen) return;
      e.preventDefault();
      navigateToView(-7);
    });

  document.addEventListener("keydown", (e) => {
    if (window.isModalOpen) return;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      updateAllContainersOrder("decrement");
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      updateAllContainersOrder("increment");
    }
  });

  /**
   * The wheel listener's only job is to prevent the default browser action (to fully
   * control inertia) and feed the raw deltaY and event target to the graph analysis engine.
   * The graph engine is the single source of truth for all wheel-based actions.
   */
  document.addEventListener(
    "wheel",
    (event) => {
      if (window.isModalOpen) return;
      event.preventDefault();
      if (scrollDebugGraphInstance) {
        scrollDebugGraphInstance.plotDeltaY(event.deltaY, event.target);
      }
    },
    { passive: false }
  );

  /**
   * For touch events, we use a simpler, direct logic without the graph engine.
   * It checks if a swipe starts inside a scrollable element and if that element
   * is already at a scroll boundary (top or bottom).
   */
  document.addEventListener(
    "touchstart",
    (event) => {
      touchTargetScrollableElement = getScrollableParent(event.target);
      if (touchTargetScrollableElement) {
        touchStartScrollTop = touchTargetScrollableElement.scrollTop;
      }
      touchStartY = event.changedTouches[0].screenY;
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    (event) => {
      if (window.isModalOpen) return;
      touchEndY = event.changedTouches[0].screenY;

      if (touchTargetScrollableElement) {
        const wasAtTop = touchStartScrollTop === 0;
        const wasAtBottom =
          Math.abs(
            touchTargetScrollableElement.scrollHeight -
              touchTargetScrollableElement.clientHeight -
              touchStartScrollTop
          ) < 1;

        const deltaY = touchEndY - touchStartY;
        if (Math.abs(deltaY) < TOUCH_THRESHOLD) {
          touchTargetScrollableElement = null;
          return; // Ignore minor taps
        }

        const isSwipingDown = deltaY > 0; // Swipe down on screen -> scroll content UP
        const isSwipingUp = deltaY < 0; // Swipe up on screen -> scroll content DOWN

        // If the swipe started at an edge and moved away, allow page navigation.
        // Otherwise, it was an internal scroll, so we block page navigation and allow native scroll.
        if (!((isSwipingDown && wasAtTop) || (isSwipingUp && wasAtBottom))) {
          touchTargetScrollableElement = null;
          return;
        }
      }

      handleSwipe();
      touchTargetScrollableElement = null;
    },
    { passive: true }
  );

  /* — — — — — — — — DEBUG GRAPH & TREND ANALYSIS — — — — — — — — */

  /**
   * Initializes and returns an object to control the scroll debug graph.
   * @returns {{plotDeltaY: function}} - An object with a method to plot data.
   */
  function initializeDebugGraph() {
    // --- Graphing Constants ---
    const Y_AXIS_SCALE = 200;
    const TREND_OBSERVATION_DELAY_MS = 80; // How old a point must be to be analyzed. Ensures a buffer of future points exist.
    const TREND_OBSERVATION_WINDOW_HALF_DURATION_MS = 40; // The time window (before/after a point) for trend calculation. Longer = more stable.
    const TREND_SIGNIFICANCE_THRESHOLD_RATIO = 0.2; // How much speed must change to be a "significant" event.
    const MOVING_AVERAGE_WINDOW_N = 3; // How many points to average for smoothing. Higher = smoother but more lag.
    const HORIZONTAL_PIXELS_PER_POINT = 4;
    const MAX_DATA_POINTS = 300;

    // --- Graph-specific State ---
    const dataPoints = [];
    let isSmoothedAccelerationPhaseActive = false;
    let isSmoothedDecelerationPhaseActive = false;
    let trendScrollLock = false; // Lock to ensure one scroll action per gesture
    let lastGestureDirection = 0; // Stores the direction of the currently locked gesture
    let currentGestureAction = "none"; // Can be 'none', 'navigate', or 'scroll-internal'
    let currentGestureTargetElement = null; // The scrollable element for the current gesture
    let trendScrollLockTimeout = null; // Timeout to prevent a permanently stuck lock

    /**
     * Utility to create and style a DOM element.
     */
    function createStyledElement(
      tag,
      id,
      styles = {},
      attributes = {},
      innerHTML = ""
    ) {
      const element = document.createElement(tag);
      if (id) element.id = id;
      Object.assign(element.style, styles);
      Object.entries(attributes).forEach(([key, value]) =>
        element.setAttribute(key, value)
      );
      if (innerHTML) element.innerHTML = innerHTML;
      return element;
    }

    // --- DOM Setup ---
    const graphWrapper = createStyledElement("div", "scrollDebugGraphWrapper", {
      position: "fixed",
      top: "5px",
      right: "5px",
      width: "1000px",
      height: "400px",
      zIndex: "9999",
      border: "1px solid #888",
      background: "rgba(245, 245, 245, 0.9)",
      display: "none", // Hidden by default
    });
    document.body.appendChild(graphWrapper);

    const graphCanvas = createStyledElement(
      "canvas",
      "scrollDebugGraphCanvas",
      {},
      { width: 1000, height: 400 }
    );
    graphWrapper.appendChild(graphCanvas);
    const ctx = graphCanvas.getContext("2d");

    const closeButton = createStyledElement(
      "div",
      "scrollDebugCloseButton",
      {
        position: "absolute",
        top: "2px",
        right: "2px",
        width: "20px",
        height: "20px",
        backgroundColor: "rgba(200, 0, 0, 0.7)",
        border: "1px solid #500",
        borderRadius: "3px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "bold",
        zIndex: "10001",
      },
      { title: "Close graph" },
      "X"
    );
    closeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      graphWrapper.style.display = "none";
    });
    graphWrapper.appendChild(closeButton);

    /**
     * Analyzes historical data points to identify significant trends in smoothed scroll velocity.
     */
    function analyzeAndSetTrendFlags() {
      const currentTime = Date.now();
      for (let i = 0; i < dataPoints.length; i++) {
        const pointToAnalyze = dataPoints[i];
        if (
          currentTime - pointToAnalyze.timestamp < TREND_OBSERVATION_DELAY_MS ||
          pointToAnalyze.processedForSmoothedTrend
        ) {
          continue;
        }

        const analysisTimestamp = pointToAnalyze.timestamp;
        const beforeWindowStart =
          analysisTimestamp - TREND_OBSERVATION_WINDOW_HALF_DURATION_MS;
        const afterWindowEnd =
          analysisTimestamp + TREND_OBSERVATION_WINDOW_HALF_DURATION_MS;

        const beforeEvents = dataPoints.filter(
          (p) =>
            p.timestamp >= beforeWindowStart && p.timestamp < analysisTimestamp
        );
        const afterEvents = dataPoints.filter(
          (p) =>
            p.timestamp > analysisTimestamp && p.timestamp <= afterWindowEnd
        );

        if (beforeEvents.length > 0 && afterEvents.length > 0) {
          const avgBefore =
            beforeEvents.reduce(
              (sum, e) => sum + Math.abs(e.smoothedDeltaY),
              0
            ) / beforeEvents.length;
          const avgAfter =
            afterEvents.reduce(
              (sum, e) => sum + Math.abs(e.smoothedDeltaY),
              0
            ) / afterEvents.length;

          // Check for significant INCREASE (start of scroll gesture)
          if (avgAfter > avgBefore * (1 + TREND_SIGNIFICANCE_THRESHOLD_RATIO)) {
            const newGestureDirection = Math.sign(pointToAnalyze.deltaY);

            // If a new gesture starts in the opposite direction, force-end the previous one.
            if (
              trendScrollLock &&
              newGestureDirection !== 0 &&
              newGestureDirection !== lastGestureDirection
            ) {
              clearTimeout(trendScrollLockTimeout);
              trendScrollLock = false;
              isSmoothedAccelerationPhaseActive = false; // Allow reprocessing as a new gesture
            }

            if (!isSmoothedAccelerationPhaseActive) {
              pointToAnalyze.flags.isSmoothedSignificantIncrease = true;
              isSmoothedAccelerationPhaseActive = true;
              isSmoothedDecelerationPhaseActive = false;

              // A gesture is detected. Lock it and decide what action to take for its entire duration.
              if (!trendScrollLock) {
                const scrollDirection = newGestureDirection;
                lastGestureDirection = scrollDirection; // Store direction for the new lock

                currentGestureTargetElement = getScrollableParent(
                  pointToAnalyze.target
                );

                // Check if the gesture starts over a scrollable element and if it's at an edge.
                if (currentGestureTargetElement) {
                  const wasAtTop = currentGestureTargetElement.scrollTop === 0;
                  const maxScrollTop =
                    currentGestureTargetElement.scrollHeight -
                    currentGestureTargetElement.clientHeight;
                  const wasAtBottom =
                    currentGestureTargetElement.scrollTop >= maxScrollTop - 1;
                  const isScrollingUp = scrollDirection < 0;
                  const isScrollingDown = scrollDirection > 0;

                  // If scrolling into a container that is not at an edge, this gesture is for internal scroll.
                  if (
                    (isScrollingUp && !wasAtTop) ||
                    (isScrollingDown && !wasAtBottom)
                  ) {
                    currentGestureAction = "scroll-internal";
                  } else {
                    // Otherwise, the gesture is for page navigation.
                    currentGestureAction = "navigate";
                  }
                } else {
                  // Not over a scrollable element, so it's always a page navigation gesture.
                  currentGestureAction = "navigate";
                }

                // If the decided action is navigation, trigger it once at the start of the gesture.
                if (currentGestureAction === "navigate") {
                  if (scrollDirection < 0) {
                    updateAllContainersOrder("increment");
                  } else {
                    updateAllContainersOrder("decrement");
                  }
                }

                // Lock this gesture to prevent conflicting actions until it ends.
                trendScrollLock = true;
                clearTimeout(trendScrollLockTimeout);
                trendScrollLockTimeout = setTimeout(() => {
                  trendScrollLock = false;
                  currentGestureAction = "none";
                  currentGestureTargetElement = null;
                  lastGestureDirection = 0; // Reset on timeout
                }, 500);
              }
            }
            // Check for significant DECREASE (end of scroll gesture)
          } else if (
            avgAfter <
            avgBefore * (1 - TREND_SIGNIFICANCE_THRESHOLD_RATIO)
          ) {
            if (!isSmoothedDecelerationPhaseActive) {
              pointToAnalyze.flags.isSmoothedSignificantDecrease = true;
              isSmoothedDecelerationPhaseActive = true;
              isSmoothedAccelerationPhaseActive = false;

              // A deceleration marks the end of the gesture. Unlock for the next one.
              clearTimeout(trendScrollLockTimeout);
              trendScrollLock = false;
              currentGestureAction = "none";
              currentGestureTargetElement = null;
              lastGestureDirection = 0; // Reset on deceleration
            }
          }
        }
        pointToAnalyze.processedForSmoothedTrend = true;
      }
    }

    /**
     * Applies a moving average to the deltaY values to create a smoothed data series.
     */
    function calculateAndApplyMovingAverage() {
      if (dataPoints.length === 0) return;
      for (let i = 0; i < dataPoints.length; i++) {
        let sum = 0;
        let count = 0;
        for (
          let j = -MOVING_AVERAGE_WINDOW_N;
          j <= MOVING_AVERAGE_WINDOW_N;
          j++
        ) {
          const dataIndex = i + j;
          if (dataIndex >= 0 && dataIndex < dataPoints.length) {
            sum += dataPoints[dataIndex].deltaY;
            count++;
          }
        }
        dataPoints[i].smoothedDeltaY =
          count > 0 ? sum / count : dataPoints[i].deltaY;
      }
    }

    /**
     * Draws a line on the canvas for a given dataset.
     * @param {string} color - The color of the line.
     * @param {function} yValueAccessor - A function to get the Y value from a data point.
     */
    function drawDataLine(color, yValueAccessor) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      let hasMovedTo = false;
      for (let i = 0; i < dataPoints.length; i++) {
        const point = dataPoints[i];
        const x =
          graphCanvas.width -
          (dataPoints.length - 1 - i) * HORIZONTAL_PIXELS_PER_POINT;

        if (
          x < -HORIZONTAL_PIXELS_PER_POINT ||
          x > graphCanvas.width + HORIZONTAL_PIXELS_PER_POINT
        ) {
          if (hasMovedTo) {
            ctx.stroke();
            hasMovedTo = false;
          }
          continue;
        }

        const y =
          graphCanvas.height / 2 -
          (yValueAccessor(point) / Y_AXIS_SCALE) * (graphCanvas.height / 2);
        const clampedY = Math.max(0, Math.min(graphCanvas.height, y));

        if (!hasMovedTo) {
          ctx.beginPath();
          ctx.moveTo(x, clampedY);
          hasMovedTo = true;
        } else {
          ctx.lineTo(x, clampedY);
        }
      }
      if (hasMovedTo) ctx.stroke();
    }

    /**
     * Redraws the entire graph, including axes, labels, and data lines.
     */
    function redrawGraph() {
      ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
      const zeroY = graphCanvas.height / 2;

      // Draw axis
      ctx.beginPath();
      ctx.moveTo(0, zeroY);
      ctx.lineTo(graphCanvas.width, zeroY);
      ctx.strokeStyle = "#ccc";
      ctx.stroke();

      // Draw labels
      ctx.font = "11px Arial";
      ctx.fillStyle = "#333";
      ctx.fillText(
        `Inertia graph: Raw (Blue) & Smoothed (Green), MaxY: ${Y_AXIS_SCALE}`,
        5,
        12
      );
      ctx.fillText(`Trend markers: ▲ (start) & ▼ (end) trigger scroll, -MaxY: ${Y_AXIS_SCALE}`, 5, graphCanvas.height - 5);

      if (dataPoints.length < 1) return;

      // Draw data lines
      ctx.globalAlpha = 0.5;
      drawDataLine("#007bff", (p) => p.deltaY); // Raw data
      ctx.globalAlpha = 1.0;
      drawDataLine("#28a745", (p) => p.smoothedDeltaY); // Smoothed data

      // Draw trend indicators
      for (let i = 0; i < dataPoints.length; i++) {
        const point = dataPoints[i];
        const x =
          graphCanvas.width -
          (dataPoints.length - 1 - i) * HORIZONTAL_PIXELS_PER_POINT;
        if (x < 0 || x > graphCanvas.width) continue;

        const yValSmoothed = Math.max(
          0,
          Math.min(
            graphCanvas.height,
            zeroY -
              (point.smoothedDeltaY / Y_AXIS_SCALE) * (graphCanvas.height / 2)
          )
        );
        const triangleSize = 5;

        if (
          point.flags.isSmoothedSignificantIncrease ||
          point.flags.isSmoothedSignificantDecrease
        ) {
          ctx.beginPath();
          const isIncrease = point.flags.isSmoothedSignificantIncrease;
          const yOffset = isIncrease ? -triangleSize - 3 : triangleSize + 3;
          const yDir = isIncrease ? 1 : -1;
          ctx.moveTo(x, yValSmoothed + yOffset);
          ctx.lineTo(
            x - triangleSize,
            yValSmoothed + yOffset + yDir * triangleSize * 2
          );
          ctx.lineTo(
            x + triangleSize,
            yValSmoothed + yOffset + yDir * triangleSize * 2
          );
          ctx.closePath();
          ctx.fillStyle = isIncrease ? "purple" : "teal";
          ctx.fill();
        }
      }
    }

    /**
     * Shows the debug graph.
     */
    function showDebugGraph() {
      graphWrapper.style.display = "block";
    }

    /**
     * Public method to add a new data point and trigger a redraw.
     * @param {number} currentDeltaY - The latest deltaY value from the wheel event.
     * @param {EventTarget} target - The element that received the wheel event.
     */
    function plotDeltaY(currentDeltaY, target) {
      // If the current gesture is an internal scroll, perform it here.
      // This runs for every point in the gesture, ensuring smooth scrolling.
      if (
        currentGestureAction === "scroll-internal" &&
        currentGestureTargetElement
      ) {
        currentGestureTargetElement.scrollTop += currentDeltaY;
      }

      dataPoints.push({
        timestamp: Date.now(),
        deltaY: currentDeltaY,
        target: target,
        smoothedDeltaY: currentDeltaY,
        flags: {},
        processedForSmoothedTrend: false,
      });

      if (dataPoints.length > MAX_DATA_POINTS) {
        dataPoints.shift();
      }

      calculateAndApplyMovingAverage();
      analyzeAndSetTrendFlags();
      redrawGraph();
    }

    redrawGraph(); // Initial draw
    return { plotDeltaY, showDebugGraph };
  }

  // --- Final Initialization ---
  updateActiveNavItem();
  scrollDebugGraphInstance = initializeDebugGraph();

  const openGraphLinks = document.querySelectorAll(".open-debug-graph");
  if (openGraphLinks.length > 0) {
    openGraphLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (scrollDebugGraphInstance) {
          scrollDebugGraphInstance.showDebugGraph();
        }
      });
    });
  }
}
