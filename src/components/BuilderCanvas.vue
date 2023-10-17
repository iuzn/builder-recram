<!--BuilderCanvas.vue-->
<script setup lang="ts">
import { useElementsStore } from '@/stores/elements'
import IconDesktop from '@/components/icons/IconDesktop.vue'
import IconMobile from '@/components/icons/IconMobile.vue'
import { watchEffect } from 'vue'
import DOMPurify from 'dompurify'

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
    store.addElementToCanvas(element)
    store.selectedElement = element
    console.log('Element eklendi:', element)

    if (store.currentPage) {
      store.currentPage.elements = [...store.canvasElements]
      store.updatePage(store.currentPage)
    }
  }
}
watchEffect(() => {
  if (store.selectedElement) {
    const elementIndex = store.canvasElements.findIndex(
      (element) => element.id === store.selectedElement?.id
    )

    if (elementIndex != -1) {
      store.canvasElements[elementIndex].defaultProperties.text =
        store.selectedElement.defaultProperties.text
    }
  }
})
let draggedElement: any = null

function dragStart(index: number) {
  draggedElement = index
}

function dragOver(event: DragEvent, index: number) {
  event.preventDefault()
  if (draggedElement === null) return
  if (draggedElement === index) return
  if (store.currentPage) {
    store.reorderElements({
      oldIndex: draggedElement,
      newIndex: index
    })
    store.canvasElements = store.currentPage.elements || []
    draggedElement = index
  }
}

function dragEnd() {
  draggedElement = null
}

function onInput(event: Event, elementId: string) {
  if (event.target instanceof HTMLInputElement) {
    const updatedText = event.target.value
    store.updateElementProperties(elementId, { text: updatedText })

    if (store.selectedElement && store.selectedElement.id === elementId) {
      store.selectedElement.defaultProperties.text = updatedText
    }
  }
}
</script>

<template>
  <div class="relative w-full h-full flex items-center justify-center">
    <div class="absolute top-3 flex gap-5">
      <button><IconDesktop /></button>
      <button><IconMobile /></button>
    </div>
    <div
      class="w-[680px] h-[460px] bg-white rounded-lg flex flex-col items-start justify-start p-7 gap-3"
      @drop="drop"
      @dragover="allowDrop"
      id="canvas"
    >
      <div
        v-for="(element, index) in store.currentPage?.elements || []"
        :key="element.id"
        @click="store.selectElement(element)"
        @dragstart="dragStart(index)"
        @dragover="dragOver($event, index)"
        @dragend="dragEnd"
        draggable="true"
        class="w-full flex items-start justify-center"
        :class="element.type === 'Block' ? 'h-full' : ''"
      >
        <!-- Render elements here -->
        <span
          v-if="element.type === 'Text'"
          :style="{ fontSize: element.defaultProperties.fontSize }"
          v-html="DOMPurify.sanitize(element.defaultProperties.text.replace(/\n/g, '<br/>'))"
          @input="onInput($event, element.id)"
          class="w-full h-20 decoration-none text-sm border-dashed p-1.5 placeholder:italic placeholder:font-light focus:outline-none focus:ring-0 focus:border-gray-200 border border-transparent"
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
