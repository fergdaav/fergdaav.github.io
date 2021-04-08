AFRAME.registerComponent("env-map-component", {
    init: function() {
      var targetCube = new THREE.WebGLRenderTargetCube(1024, 1024);
      var renderer = this.el.sceneEl.renderer;
    //   "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Goat_Peak%2C_Cascades.jpg/1920px-Goat_Peak%2C_Cascades.jpg",

      this.el.addEventListener("model-loaded", e => {
          let mesh = this.el.getObject3D("mesh");
          
        //   const path = "./maps/venice_sunset_1k.hdr"
        //   const path = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Goat_Peak%2C_Cascades.jpg/1920px-Goat_Peak%2C_Cascades.jpg";
          const path = "data:image/jpeg;base64,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"
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