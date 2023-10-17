<!--ElementProperties.vue-->
<script setup lang="ts">
import { useElementsStore } from '@/stores/elements'
import { ref, watchEffect } from 'vue'
import DropDown from '@/components/common/DropDown.vue'
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import tagToTextType, { tags } from '@/utils/textType'

const store = useElementsStore()
const selectedElement = ref(
  store.selectedElement ? store.selectedElement : { defaultProperties: {} }
) as any
watchEffect(() => {
  if (store.selectedElement !== null) {
    let selectedItemIndex = store.canvasElements.findIndex((el) => {
      return el.id === store.selectedElement?.id
    })

    if (selectedItemIndex !== -1) {
      store.canvasElements[selectedItemIndex].defaultProperties = {
        ...store.selectedElement.defaultProperties
      }
      if (store.currentPage) {
        store.updatePage(store.currentPage)
      }
    }
  }
})

watchEffect(() => {
  if (store.selectedElement) {
    selectedElement.value = { ...store.selectedElement }
  }
})
function updateProperties(key: string, value: any) {
  if (selectedElement.value) {
    selectedElement.value.defaultProperties[key] = value

    let selectedItemIndex = store.canvasElements.findIndex((el) => {
      return el.id == store.selectedElement?.id
    })

    if (selectedItemIndex !== -1) {
      store.canvasElements[selectedItemIndex].defaultProperties[key] = value

      if (store.currentPage) {
        const name = store.currentPage.name || 'default'

        store.currentPage = { ...store.currentPage, name }
        store.updatePage(store.currentPage)
      }
    }
  }
}
const clearSelectedElement = () => {
  store.selectedElement = null
}
</script>
<template>
  <div class="flex h-full flex-col justify-between">
    <div class="flex flex-col">
      <h2
        class="text-center w-full flex h-10 items-center justify-center border-b border-main text-sm"
      >
        {{ selectedElement.type }}
      </h2>

      <!-- Text Properties -->
      <div v-if="selectedElement.type === 'Text'" class="flex flex-col gap-4 px-5 py-3">
        <DropDown
          :value="selectedElement.defaultProperties.type"
          @update:value="updateProperties('textType', $event)"
          trigger-class-name="h-10 border-gray-200 border w-full flex justify-between items-center px-3 rounded text-sm"
          :close-when-click-content="true"
        >
          <template #trigger
            ><span> {{ tagToTextType(store.selectedElement?.defaultProperties.type) }}</span>
            <IconArrowDown />
          </template>
          <template #content>
            <div class="flex flex-col w-full bg-white rounded-md border-main shadow-base divide-y">
              <button
                v-for="(type, index) in tags"
                :key="index"
                :value="type"
                @click="updateProperties('type', type)"
                class="text-center py-1 hover:bg-gray-50"
              >
                <!-- Converts 'h1' to 'Heading 1', 'p' to 'Paragraph' -->
                {{ type.replace(/^h/, 'Heading ').replace(/^p$/, 'Paragraph') }}
              </button>
            </div>
          </template>
        </DropDown>
        <label>
          Value:
          <textarea v-model="selectedElement.defaultProperties.text"></textarea>
        </label>

        <label>
          Font Size:
          <input
            type="number"
            :value="parseInt(selectedElement.defaultProperties.fontSize)"
            @input="updateProperties('fontSize', `${($event.target as HTMLInputElement)?.value}px`)"
          />
        </label>
      </div>
      <!-- Button Properties -->
      <div v-else-if="selectedElement.type === 'Button'" class="flex flex-col gap-4">
        <label>
          Text:
          <input
            :value="selectedElement.defaultProperties.text"
            @input="updateProperties('text', ($event.target as HTMLInputElement)?.value)"
          />
        </label>
        <label>
          Action:
          <select
            :value="selectedElement.defaultProperties.action"
            @input="updateProperties('action', ($event.target as HTMLInputElement)?.value)"
          >
            <option>None</option>
            <option>Redirect to Next Page</option>
          </select>
        </label>
      </div>

      <!-- Input Properties -->
      <div v-else-if="selectedElement.type === 'Input'" class="flex flex-col gap-4">
        <label>
          Placeholder:
          <input
            :value="selectedElement.defaultProperties.placeholder"
            @input="updateProperties('placeholder', ($event.target as HTMLInputElement)?.value)"
          />
        </label>
      </div>

      <!-- Block Properties -->
      <div v-else-if="selectedElement.type === 'Block'" class="flex flex-col gap-4 px-5 py-3">
        <span class="text-gray-400 text-xs">Block Style</span>
        <div class="flex flex-col gap-2.5">
          <button
            class="w-full h-[60px] bg-gray-50 border border-gray-200 rounded flex items-center p-3.5"
          >
            <span class="w-full h-8 bg-white border border-dashed border-gray-200 rounded"></span>
          </button>
          <button
            class="w-full h-[60px] bg-gray-50 border border-gray-200 rounded flex items-center p-3.5 gap-3.5"
          >
            <span class="w-full h-8 bg-white border border-dashed border-gray-200 rounded"></span>
            <span class="w-full h-8 bg-white border border-dashed border-gray-200 rounded"></span>
          </button>
          <button
            class="w-full h-[60px] bg-gray-50 border border-gray-200 rounded flex items-center p-3.5 gap-3.5"
          >
            <span class="w-full h-8 bg-white border border-dashed border-gray-200 rounded"></span>
            <span class="w-full h-8 bg-white border border-dashed border-gray-200 rounded"></span>
            <span class="w-full h-8 bg-white border border-dashed border-gray-200 rounded"></span>
          </button>
        </div>

        <span class="text-gray-400 text-xs">Padding</span>
        <div class="flex gap-1.5">
          <span class="relative flex items-center justify-center border rounded w-full h-10">
            <span class="absolute -left-[1px] border-l h-7 border-gray-950 rounded"></span>
            <input
              type="number"
              class="border-none outline-none text-center text-sm"
              min="0"
              max="100"
              :value="parseInt(selectedElement.defaultProperties.paddingLeft)"
              @input="
                updateProperties('paddingLeft', `${($event.target as HTMLInputElement)?.value}px`)
              "
            />
            <span class="text-xs text-gray-300">px.</span>
          </span>
          <span class="relative flex items-center justify-center border rounded w-full h-10">
            <span class="absolute -top-[1px] border-t w-12 border-gray-950 rounded"></span>
            <input
              type="number"
              class="border-none outline-none text-center text-sm"
              min="0"
              max="100"
              :value="parseInt(selectedElement.defaultProperties.paddingTop)"
              @input="
                updateProperties('paddingTop', `${($event.target as HTMLInputElement)?.value}px`)
              "
            />
            <span class="text-xs text-gray-300">px.</span>
          </span>
          <span class="relative flex items-center justify-center border rounded w-full h-10">
            <span class="absolute -right-[1px] border-r h-7 border-gray-950 rounded"></span>
            <input
              type="number"
              class="border-none outline-none text-center text-sm"
              min="0"
              max="100"
              :value="parseInt(selectedElement.defaultProperties.paddingRight)"
              @input="
                updateProperties('paddingRight', `${($event.target as HTMLInputElement)?.value}px`)
              "
            />
            <span class="text-xs text-gray-300">px.</span>
          </span>
          <span class="relative flex items-center justify-center border rounded w-full h-10">
            <span class="absolute -bottom-[1px] border-b w-12 border-gray-950 rounded"></span>
            <input
              type="number"
              class="border-none outline-none text-center text-sm"
              min="0"
              max="100"
              :value="parseInt(selectedElement.defaultProperties.paddingBottom)"
              @input="
                updateProperties('paddingBottom', `${($event.target as HTMLInputElement)?.value}px`)
              "
            />
            <span class="text-xs text-gray-300">px.</span>
          </span>
        </div>
        <span class="text-gray-400 text-xs">Margin</span>
        <div class="flex gap-1.5">
          <span class="relative flex items-center justify-center border rounded w-full h-10">
            <span class="absolute -left-[1px] border-l h-7 border-gray-950 rounded"></span>
            <input
              type="number"
              class="border-none outline-none text-center text-sm"
              min="0"
              max="100"
              :value="parseInt(selectedElement.defaultProperties.marginLeft)"
              @input="
                updateProperties('marginLeft', `${($event.target as HTMLInputElement)?.value}px`)
              "
            />
            <span class="text-xs text-gray-300">px</span>
          </span>
          <span class="relative flex items-center justify-center border rounded w-full h-10">
            <span class="absolute -top-[1px] border-t w-12 border-gray-950 rounded"></span>
            <input
              type="number"
              class="border-none outline-none text-center text-sm"
              min="0"
              max="100"
              :value="parseInt(selectedElement.defaultProperties.marginTop)"
              @input="
                updateProperties('marginTop', `${($event.target as HTMLInputElement)?.value}px`)
              "
            />
            <span class="text-xs text-gray-300">px</span>
          </span>
          <span class="relative flex items-center justify-center border rounded w-full h-10">
            <span class="absolute -right-[1px] border-r h-7 border-gray-950 rounded"></span>
            <input
              type="number"
              class="border-none outline-none text-center text-sm"
              min="0"
              max="100"
              :value="parseInt(selectedElement.defaultProperties.marginRight)"
              @input="
                updateProperties('marginRight', `${($event.target as HTMLInputElement)?.value}px`)
              "
            />
            <span class="text-xs text-gray-300">px</span>
          </span>
          <span class="relative flex items-center justify-center border rounded w-full h-10">
            <span class="absolute -bottom-[1px] border-b w-12 border-gray-950 rounded"></span>
            <input
              type="number"
              class="border-none outline-none text-center text-sm"
              min="0"
              max="100"
              :value="parseInt(selectedElement.defaultProperties.marginBottom)"
              @input="
                updateProperties('marginBottom', `${($event.target as HTMLInputElement)?.value}px`)
              "
            />
            <span class="text-xs text-gray-300">px</span>
          </span>
        </div>
      </div>
    </div>

    <button @click="clearSelectedElement" class="bg-black text-white w-full h-9">Done</button>
  </div>
</template>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
