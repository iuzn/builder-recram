<script setup lang="ts">
import SideBar from './components/SideBar.vue'
import BuilderCanvas from './components/BuilderCanvas.vue'
import PageTabs from './components/PageTabs.vue'
import TopBar from '@/components/TopBar.vue'
import { onMounted, onUnmounted } from 'vue'
import { useElementsStore } from '@/stores/elements'

const store = useElementsStore()
// Inside your setup()
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target) return

  const id = target.id
  const isSidebarButton = Boolean(id && id.startsWith('button-'))
  const isElementProperties = id === 'element-properties'

  if (!isSidebarButton && !isElementProperties) {
    store.selectElement(null)
  }
}
document.title = 'RecRam'
//Page icon
const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
favicon.href = '/favicon.ico'
</script>

<template>
  <div id="app" class="bg-main">
    <TopBar />
    <div class="flex">
      <SideBar />
      <div class="flex flex-col h-[calc(100vh-66px)] min-h-full w-full">
        <BuilderCanvas />
        <PageTabs />
      </div>
    </div>
  </div>
</template>
