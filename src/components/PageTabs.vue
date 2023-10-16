<script setup lang="ts">
import { useElementsStore } from '@/stores/elements'
import IconPlusCircle from '@/components/icons/IconPlusCircle.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconCopy from '@/components/icons/IconCopy.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import type { Ref } from 'vue'
import { ref } from 'vue'

const store = useElementsStore()

const generateUniquePageName = () => {
  let count = store.pages.length + 1
  let newPageName = 'Page ' + count

  while (store.pages.some((page) => page.name === newPageName)) {
    count++
    newPageName = 'Page ' + count
  }

  return newPageName
}

const addPage = () => {
  const newPageName = generateUniquePageName()
  store.addPage(newPageName)
  console.log('Page eklendi:', newPageName)
}
const removePage = (name: string) => {
  store.removePage(name)
}
const showJSON = ref(false)
const currentPageJSON = ref('')

const showPageJSON = (pageName: string) => {
  const page = store.pages.find((p) => p.name === pageName)
  if (page) {
    currentPageJSON.value = JSON.stringify(page.elements, null, 2)
    showJSON.value = true
  }
  console.log('Page JSON:', page)
  console.log('Page JSON:', currentPageJSON.value)
}
const popup: Ref<HTMLElement | null> = ref(null)

const checkClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  if (popup.value && !popup.value.contains(target)) {
    closeJSONPopup()
  }
}
const closeJSONPopup = () => {
  showJSON.value = false
}

const copyToClipboard = (textToCopy: string): void => {
  const textarea = document.createElement('textarea')
  textarea.value = textToCopy
  document.body.appendChild(textarea)

  textarea.select()
  document.execCommand('copy')

  // Clean up after copying
  document.body.removeChild(textarea)
}
</script>

<template>
  <div
    class="bg-white flex p-6 gap-5"
    :class="{
      'overflow-hidden': showJSON
    }"
  >
    <div
      class="group flex w-36 h-32 items-center justify-center text-gray-300 border-gray-200 border border-dashed relative rounded-md"
      :class="{
        'p-[1px] bg-gradient-to-tr from-[#46BDC5] to-[#5EDE99] border-none shadow-base':
          store.currentPage?.name === page.name
      }"
      v-for="page in store.pages"
      :key="page.name"
      @click="store.setCurrentPage(page.name)"
    >
      <div
        class="bg-white w-full h-full rounded-[5px] flex items-center justify-center"
        :class="{
          'border border-transparent': store.currentPage?.name === page.name
        }"
      >
        <span class="absolute -top-4 left-0 text-[9px]">
          {{ page.name }}
        </span>
        <div class="invisible group-hover:visible flex gap-1">
          <button class="p-2 rounded-md"><IconEdit /></button>
          <button
            @click="showPageJSON(page.name)"
            class="p-2 rounded-md hover:bg-primary/20 hover:fill-primary fill-gray-300"
          >
            <IconCopy />
          </button>
          <button
            @click="removePage(page.name)"
            class="hover:bg-red-50 p-2 rounded-md hover:fill-red-500 fill-gray-300"
          >
            <IconDelete />
          </button>
        </div>
      </div>
    </div>

    <button
      class="flex flex-col w-36 h-32 items-center justify-center gap-2 text-gray-300 border-gray-200 border border-dashed rounded-md"
      @click="addPage"
    >
      <IconPlusCircle />
      <span> New Page </span>
    </button>
  </div>
  <!-- JSON Popup -->
  <div
    v-if="showJSON"
    class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    @click="checkClickOutside"
  >
    <div
      ref="popup"
      class="relative bg-white w-full p-4 rounded overflow-auto max-w-[calc(100vw-120px)] max-h-[calc(100vh-132px)]"
    >
      <pre class="select-all">{{ currentPageJSON }}</pre>
      <div class="sticky flex justify-between -bottom-4 inset-0 bg-white h-20 px-4">
        <button @click="copyToClipboard(currentPageJSON)">Copy to Clipboard</button>
        <button @click="closeJSONPopup">Close</button>
      </div>
    </div>
  </div>
</template>
