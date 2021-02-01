import debounce from "lodash.debounce";

export const resizeMixin = {
  methods: {
    registerResizeEvent() {
      document.addEventListener("resize", debounce(this.onResize, 400));
    },
    onResize() {
      const element = document.getElementById("matterJsElement");
      const canvas = document.getElementsByTagName("canvas");
      canvas.width = element.clientWidth;
      canvas.height = element.clientHeight;
      this.render.canvas.width = element.clientWidth;
      this.render.canvas.height = element.clientHeight;
    }
  }
};
