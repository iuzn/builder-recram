<!--DropDown.vue-->
<template>
  <div>
    <div class="relative inline-block text-left z-30 w-full">
      <button
        class="flex w-full"
        @click="toggleOpen"
        :disabled="disabled"
        :class="triggerClassName"
      >
        <slot name="trigger"></slot>
      </button>
      <div
        :class="[
          'absolute z-30 w-full rounded-xl bg-transparent duration-300 transition-all',
          positionClasses,
          open ? 'visible' : 'invisible',
          align
        ]"
        :style="{
          transform: openUpward ? 'translateY(-10px) scale(120%)' : 'translateY(0) scale(100%)',
          minWidth: 'max-content'
        }"
        @click="closeWhenClick"
        ref="contentRef"
      >
        <slot name="content"></slot>
      </div>
    </div>
    <div
      class="fixed z-20 h-screen w-screen overflow-hidden"
      :class="{ block: open, hidden: !open }"
      @click="open = false"
      style="top: 0; left: 0"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  trigger: { type: Object, required: false },
  content: { type: Object, required: false },
  disabled: { type: Boolean, default: false },
  align: { type: String, default: 'left' },
  triggerClassName: String,
  closeWhenClickContent: { type: Boolean, default: false },
  openUpward: { type: Boolean, default: false }
})

let open = ref(false)
let contentRef = ref<HTMLElement | null>(null)

let positionClasses = computed(() => {
  return props.openUpward ? 'bottom-full' : 'mt-2'
})

const stopWatch = watch(open, (newOpenValue) => {
  if (newOpenValue && contentRef.value) {
    contentRef.value.style.transform = props.openUpward
      ? 'translateY(-10px) scale(95%)'
      : 'translateY(0) scale(100%)'
    contentRef.value.style.opacity = '1'
  } else if (contentRef.value) {
    contentRef.value.style.transform = props.openUpward
      ? 'translateY(0) scale(100%)'
      : 'translateY(-10px) scale(95%)'
    contentRef.value.style.opacity = '0'
  }
})

const closeWhenClick = () => {
  if (props.closeWhenClickContent) {
    open.value = false
  }
}
onBeforeUnmount(() => {
  stopWatch()
})
const toggleOpen = () => {
  open.value = !open.value
}
</script>
