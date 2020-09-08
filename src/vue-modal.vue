<script>
export default {
  name: 'VueModal',
  data() {
    return {
     visible :  false,
      params : {}
    };
  },
  props: {
    name :{
      required: true,
      type: String
    }
  },

  beforeMount() {
    this.$modal.$event.$on('show', this.showModal)

    this.$modal.$event.$on('hide', this.closeModal)
  },

  mounted() {
    document.addEventListener('keydown', ev => {
      if(this.visible && ev.keyCode === 27){
        this.setHidden()
      }
    })
  },

  methods: {
    setVisible(){
      this.visible =true
    },

    setHidden(){
      this.visible =false
    },

    closeModal(modal){
      if(this.name  !== modal){
        return
      }

      this.setHidden()

      this.$emit('before-close')
    },

    showModal(modal, params){

      if(this.name  !== modal) {
        return
      }

      this.params = params

      if(!this.$listeners['before-open']){
        this.setVisible()
        return
      }

      this.$emit('before-open', () =>{
        this.setVisible()
      })
    }
  },
};
</script>

<template>
  <transition name="modal">
    <div v-if="visible">
      <div class="app-modal" @click.prevent="$modal.hide(name)" ></div>
      <div class="app-modal-inner">
<!--        <a href="#" @click.prevent="visible = false">Close</a>-->
        <slot name="header" :params="params" />
        <slot name="body" :params="params" />
        <slot name="footer" :params="params" />
      </div>
    </div>

  </transition>
</template>

<style scoped>
  .app-modal {
   background-color: #141420;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9999;
  }
  .app-modal-inner{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    width: 90%;
    max-width: 500px;
    background-color: #FFF;
    z-index: 9999;
  }

  .modal-enter-active, .modal-leave-active {
    transition: all 200ms;
  }

  .modal-enter, .modal-leave-active {
    opacity: 0;
  }
</style>
