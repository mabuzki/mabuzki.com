<template id="modal">
<div class="modal-mask" v-if="show" transition="modal" @click="close">
    <div class="modal-container" @click.stop>
        <slot></slot>
    </div>
</div>
</template>

<script>

export default {
  
}
</script>
