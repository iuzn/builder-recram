<script setup lang="ts">
import SideBar from './components/SideBar.vue'
import BuilderCanvas from './components/BuilderCanvas.vue'
import PageTabs from './components/PageTabs.vue'
import TopBar from '@/components/TopBar.vue'
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
    <PageTabs />
  </div>
</template>
