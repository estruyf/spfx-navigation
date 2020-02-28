
export class Navigation {

  /**
   * Navigate to the provided link
   * 
   * @param {string} link - Link to navigate to
   * @param {boolean} fullPageReload - (optional) partial page reload - false / or full page reload - true
   */
  public static navigate(link: string, fullPageReload: boolean = false) {
    const isLayoutPage = location.href.toLowerCase().indexOf("/_layouts/");
    // Check if we can bind into the SPFx navigation APIs
    if (!fullPageReload && history && (window["PopStateEvent"] || window["Event"]) && window["dispatchEvent"]) {
      // Create the new navigation state
      const navState = { url: link };

      // Adds the new navigation state to the browser history
      history.pushState(navState, null, link);

      // Check to trigger SharePoint navigation handler to partially reload the page
      let newPopState = null;
      const popStateString = "popstate";
      const eventString = "Event";
      const stateString = "state";
      try {
        if (window["PopStateEvent"]) {
          newPopState = new PopStateEvent(popStateString, { state: navState });
        }

        if (window[eventString] && !newPopState) {
          newPopState = new Event(popStateString);
          newPopState[stateString] = navState;
        }

        if (!newPopState) {
          newPopState = new PopStateEvent(popStateString, {
            bubbles: false,
            cancelable: true,
            state: navState
          });
        }
      } catch (e) {
        newPopState = document.createEvent(eventString);
        newPopState.initEvent(popStateString, false, true);
        newPopState[stateString] = navState;
      }

      if (newPopState) {
        const isDispatched = window.dispatchEvent(newPopState);
        if (isDispatched) {
          // Check if browser was loaded on the layouts page, if that was the case, trigger history go API
          if (isLayoutPage) {
            history.go();
          }
          return;
        }
      }
    }

    // Worst case, redirect the old way
    location.href = link;
  }
}