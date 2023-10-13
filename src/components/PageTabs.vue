<script setup lang="ts">
import { useElementsStore } from '@/stores/elements'
import IconPlusCircle from '@/components/icons/IconPlusCircle.vue'

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
</script>

<template>
  <div class="bg-white flex p-6 gap-5">
    <div
      class="flex flex-col w-36 h-32 items-center justify-center gap-2 text-gray-300 border-gray-200 border border-dashed rounded-md relative"
      v-for="page in store.pages"
      :key="page.name"
    >
      <span class="absolute -top-4 left-0 text-[9px]">
        {{ page.name }}
      </span>
      <button @click="removePage(page.name)">Delete</button>
    </div>

    <button
      class="flex flex-col w-36 h-32 items-center justify-center gap-2 text-gray-300 border-gray-200 border border-dashed rounded-md"
      @click="addPage"
    >
      <IconPlusCircle />
      <span> New Page </span>
    </button>
  </div>
</template>
