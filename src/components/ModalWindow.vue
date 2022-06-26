<template>
  <div class="simple-modal">
    <div class="simple-modal-backdrop" @click="this.closeModal">
      <div class="simple-modal-container">
        <div class="simple-modal-content" @click.stop>
          <header class="simple-modal-header">
            <slot name="header">Modal title</slot>
          </header>
          <section class="simple-modal-body">
            <slot name="body">Modal body</slot>
          </section>
          <footer class="simple-modal-footer">
            <div class="d-flex justify-content-between">
              <slot name="footer"></slot>
              <button
                class="btn btn-success"
                type="button"
                @click="this.closeModal"
              >
                Закрыть
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalWindow",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    window.addEventListener("keydown", this.escCloseModal);
  },
  destroy() {
    window.removeEventListener("keydown", this.escCloseModal);
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    escCloseModal(e) {
      if (this.show && e.key === "Escape") {
        this.closeModal();
      }
    },
  },
};
</script>

<style>
.simple-modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  transition: opacity 0.3s ease;
  z-index: 9999;
}

.simple-modal-container {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: auto;
  margin: 16px;
}

.simple-modal-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  margin: 1.75rem auto;
  padding: 20px 30px;
  border-radius: 5px;
  color: #000;
  background-color: #fff;
  transform: translate(0, 0);
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.simple-modal-header {
  padding-bottom: 16px;
  font-size: 25px;
  text-align: center;
}

.simple-modal-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
  text-align: center;
}
</style>
