<template>
<div class="Toast" v-show="toastshow">
  <div >{{message}}</div>
</div>
</template>

<script>
export default {
name: "Toast",
  props:{
    message:{
      type:String
    },
    toastshow:{
      type:Boolean,
      default(){
        return false
      }
    }
  }
}
</script>

<style scoped>
.Toast{
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px 10px;

  transform: translate(-50%,-50%);
  background-color: rgba(0,0,0,.5);
  color: #f6f6f6;
}
</style>
