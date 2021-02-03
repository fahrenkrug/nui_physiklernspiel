export const resizeMixin = {
  methods: {
    registerResizeEvent() {
      // document.addEventListener("resize", debounce(this.onResize, 400));
      document.addEventListener("resize", this.onResize);
      const canvas = document.getElementsByTagName("canvas")[0];
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    },
    onResize() {
      console.log("onResize");
      const element = document.getElementById("matterJsElement");
      this.render.canvas.width = element.innerWidth; //- 400;
      this.render.canvas.height = element.innerHeight; // - 310;
    }
  }
};
