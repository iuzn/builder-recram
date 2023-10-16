<!--SideBar.vue-->
<script setup lang="ts">
import ElementProperties from '@/components/ElementProperties.vue'
import { useElementsStore } from '@/stores/elements'
import IconText from '@/components/icons/IconText.vue'
import IconButton from '@/components/icons/IconButton.vue'
import IconInput from '@/components/icons/IconInput.vue'
import IconBlock from '@/components/icons/IconBlock.vue'

const store = useElementsStore()

function dragStart(element: any, event: DragEvent) {
  event.dataTransfer?.setData('application/json', JSON.stringify(element))
  console.log('Drag başladı:', element)
}
const icons: { [key: string]: any } = {
  button: IconButton,
  text: IconText,
  input: IconInput,
  block: IconBlock
}

function getIconComponent(type: keyof typeof icons) {
  return icons[type] || null
}
</script>

<template>
  <div
    class="w-[300px] h-[calc(100vh-66px)] min-h-full flex flex-col shadow-base bg-white p-3 gap-3 text-gray-950"
  >
    <ElementProperties
      v-if="store.selectedElement !== null"
      :selectedElement="store.selectedElement"
      :key="store.selectedElement.id"
    />
    <button
      v-else
      v-for="element in store.sidebarElements"
      :key="element.type"
      @dragstart="dragStart(element, $event)"
      draggable="true"
      class="flex px-3 py-2 gap-3.5 items-center justify-start hover:text-primary cursor-grab active:cursor-grabbing group hover:shadow-base rounded"
    >
      <component :is="getIconComponent(element.icon)" class="group-hover:fill-primary" />
      {{ element.type }}
    </button>
  </div>
</template>
