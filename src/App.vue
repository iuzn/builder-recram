<!--App.vue-->
<script setup lang="ts">
import SideBar from './components/SideBar.vue'
import BuilderCanvas from './components/BuilderCanvas.vue'
import PageTabs from './components/PageTabs.vue'
import TopBar from '@/components/TopBar.vue'

document.title = 'RecRam'
const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
favicon.href = '/favicon.ico'
</script>

<template>
  <div id="app" class="bg-main relative">
    <TopBar />
    <div class="flex">
      <SideBar />
      <div class="flex flex-col h-[calc(100vh-66px)] min-h-full w-full overflow-hidden">
        <BuilderCanvas />
        <PageTabs />
      </div>
    </div>
  </div>
</template>
