export const resizeMixin = {
  methods: {
    registerResizeEvent() {
      console.log("onResizeEvent");
      // document.addEventListener("resize", debounce(this.onResize, 400));
      window.addEventListener("resize", this.onResize);
      const canvas = document.getElementsByTagName("canvas")[0];
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    },
    onResize() {
      console.log("onResize");
      const element = document.getElementById("matterJsElement");
      console.log(element);
      this.render.element.width = "80vw"; //- 400;
      this.render.element.height = "80vh"; // - 310;
    }
  }
};
