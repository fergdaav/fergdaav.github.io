AFRAME.registerComponent("env-map-component", {
    init: function() {
      var targetCube = new THREE.WebGLRenderTargetCube(1024, 1024);
      var renderer = this.el.sceneEl.renderer;

      this.el.addEventListener("model-loaded", e => {
          let mesh = this.el.getObject3D("mesh");
          
        const path = "./map.jpeg";
        // const path = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Goat_Peak%2C_Cascades.jpg/1920px-Goat_Peak%2C_Cascades.jpg";

          new THREE.TextureLoader().load(
            path,
          (texture) => {
            var cubeTex = targetCube.fromEquirectangularTexture(renderer, texture);
            mesh.traverse((el) => {
              if (el.material) {
                el.material.envMap = cubeTex.texture;
                el.material.envMap.intensity = 3;
                el.material.needsUpdate = true;
              }
            });
              this.envMap = cubeTex;
              
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.outputEncoding = THREE.sRGBEncoding;
          }
        );
      });
    }
  });