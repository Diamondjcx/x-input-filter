class xInputFilter {
  constructor(regs) {
    this.name = "x-input-filter";
    this.inputHandler = () => {};
    this.regs = {
      number: /[^\d]/,
      en: /[^a-z]/,
      no_percent: /%/,
      special_character: /['"%<>\\]/,
      ...regs,
    };
  }
  getInput = (el) => {
    let el_input;
    if (el.tagName.toLowerCase() !== "input") {
      el_input =
        el.getElementsByTagName("input")[0] ||
        el.getElementsByTagName("textarea")[0];
    } else {
      el_input = el;
    }
    return el_input;
  };
  dispatchEvent = (el, type) => {
    const ev = new Event(type, { bubbles: false, cancelable: false });
    document.dispatchEvent(ev);
    el.dispatchEvent(ev);
  };
  directive = () => {
    return {
      mounted: (el, binding) => {
        const el_input = this.getInput(el);
        if (!el_input) return;
        let keyCode = [8, 17, 27, 91, 18];
        let reg;
        Object.keys(binding.modifiers).forEach((key) => {
          if (binding.modifiers[key]) {
            reg = new RegExp(this.regs[key], "g");
          }
        });
        const inputHandler = (e) => {
          if (reg && !keyCode.includes(e?.keyCode)) {
            el_input.value = el_input.value.replace(reg, "").trim();
            const selectStart = el_input.selectionStart;
            const selectEnd = el_input.selectionEnd;
            const elCursorPos =
              el_input.selectionStart || el_input.value?.length;
            const regExpStringLength = (el_input.value.match(reg) || []).length;
            if (selectStart === selectEnd) {
              el_input.setSelectionRange(
                elCursorPos - regExpStringLength,
                elCursorPos - regExpStringLength
              );
            }
            this.dispatchEvent(el_input, "input");
          }
        };
        const blurHandler = (e) => {
          if (reg && !keyCode.includes(e?.keyCode)) {
            el_input.value = el_input.value.trim().replace(reg, "");
            this.dispatchEvent(el_input, "input");
          }
        };
        el._inputHandler = inputHandler;
        el._blurHandler = blurHandler;
        el_input.addEventListener("keyup", inputHandler, true);
        el_input.addEventListener("blur", blurHandler, true);
      },
      unmounted: (el) => {
        const el_input = this.getInput(el);
        if (el_input) {
          el_input.removeEventListener("keyup", el._inputHandler, true);
          el_input.removeEventListener("blur", el._blurHandler, true);
        }
      },
    };
  };
}
export default xInputFilter;
