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
}
let dropIndex: number | null = null

function drop(event: DragEvent) {
  event.preventDefault()
  const elementData = event.dataTransfer?.getData('application/json')
  if (elementData) {
    const element = JSON.parse(elementData)
    if (dropIndex !== null) {
      store.insertElementToCanvas(element, dropIndex) // Use the new store action
      dropIndex = null // Reset dropIndex
    } else {
      store.addElementToCanvas(element)
    }
    store.selectedElement = element

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
  dropIndex = index // Update dropIndex
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
  dropIndex = null
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
      class="w-[680px] h-[460px] bg-white rounded-lg flex flex-col items-start justify-start p-7 gap-3 overflow-y-scroll z-10"
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
        class="w-full flex items-start justify-center gap-1"
        :class="element.type === 'Block' ? 'h-full' : ''"
      >
        <span
          v-if="element.type === 'Text'"
          :style="{
            fontSize: element.defaultProperties.fontSize,
            fontWeight: element.defaultProperties.fontWeight,
            fontStyle: element.defaultProperties.fontStyle,
            textDecoration: element.defaultProperties.textDecoration,
            textAlign: element.defaultProperties.textAlign
          }"
          v-html="
            DOMPurify.sanitize(element.defaultProperties.text.replace(/\n/g, '<br/>')) ||
            'Text Here'
          "
          @input="onInput($event, element.id)"
          class="w-full h-auto min-h-[120px] decoration-none text-sm p-1.5 rounded-md"
          :class="{
            'ring-1 ring-gray-200': store.selectedElement?.id === element.id,
            'italic font-light text-gray-300': element.defaultProperties.text === ''
          }"
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
          :style="{
            fontSize: element.defaultProperties.fontSize,
            paddingLeft: element.defaultProperties.paddingLeft,
            paddingRight: element.defaultProperties.paddingRight,
            paddingTop: element.defaultProperties.paddingTop,
            paddingBottom: element.defaultProperties.paddingBottom,
            marginLeft: element.defaultProperties.marginLeft,
            marginRight: element.defaultProperties.marginRight,
            marginTop: element.defaultProperties.marginTop,
            marginBottom: element.defaultProperties.marginBottom,
            borderColor: store.selectedElement?.id === element.id ? '#81CAFF' : 'transparent',
            borderStyle: store.selectedElement?.id === element.id ? 'dashed' : 'none'
          }"
          class="flex w-full h-full gap-3 justify-center items-center border"
        >
          <div
            v-for="(_, index) in Array.from({ length: element.defaultProperties.children })"
            :key="index"
            class="border w-full h-full min-h-[120px]"
            :class="{
              'border-[#81CAFF] border-dashed': store.selectedElement?.id === element.id
            }"
          ></div>
        </div>
      </div>
    </div>
    <div
      class="absolute top-0 bottom-0 left-0 right-0 z-0 w-full h-full"
      @click="store.selectElement(null)"
    ></div>
  </div>
</template>
