<script setup lang="ts">
import { useElementsStore } from '@/stores/elements'

const store = useElementsStore()

function allowDrop(event: DragEvent) {
  event.preventDefault()
  console.log('allowDrop')
}

function drop(event: DragEvent) {
  event.preventDefault()
  const elementData = event.dataTransfer?.getData('application/json')
  if (elementData) {
    const element = JSON.parse(elementData)
    element.position = { x: event.clientX, y: event.clientY }
    store.addElementToCanvas(element)
    console.log('Element eklendi:', element)
  }
}

function selectElement(element: any) {
  store.selectElement(element)
  console.log('Element seçildi:', element)
}
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div
      class="w-[680px] h-[460px] bg-white rounded-lg flex flex-col items-start justify-start p-7 gap-3"
      @drop="drop"
      @dragover="allowDrop"
      id="canvas"
    >
      <div
        v-for="element in store.canvasElements"
        :key="element.type"
        @click="selectElement(element)"
        class="w-full flex items-start justify-center"
        :class="element.type === 'Block' ? 'h-full' : ''"
      >
        <!-- Render elements here -->
        <textarea
          v-if="element.type === 'Text'"
          :style="{ fontSize: element.defaultProperties.fontSize }"
          :value="element.defaultProperties.text"
          class="w-full h-20 decoration-none text-sm border-dashed p-1.5 placeholder:italic placeholder:font-light focus:outline-none focus:ring-0 focus:border-gray-200 border border-transparent resize-y"
          :placeholder="element.defaultProperties.placeholder"
          rows="40"
        />

        <button
          v-else-if="element.type === 'Button'"
          :style="{
            fontSize: element.defaultProperties.fontSize,
            backgroundColor: element.defaultProperties.backgroundColor,
            color: element.defaultProperties.color
          }"
          class="py-2 rounded-md px-4 w-80 h-10"
        >
          {{ element.defaultProperties.text }}
        </button>
        <input
          v-else-if="element.type === 'Input'"
          :style="{ fontSize: element.defaultProperties.fontSize }"
          :value="element.defaultProperties.text"
          class="w-full decoration-none text-center text-sm"
        />
        <div
          v-else-if="element.type === 'Block'"
          :style="{ fontSize: element.defaultProperties.fontSize }"
          class="flex w-full h-full gap-3 justify-center items-center"
        >
          <div class="border w-full h-full"></div>
          <div class="border w-full h-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>
