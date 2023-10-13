<script setup lang="ts">
import IconBack from '@/components/icons/IconBack.vue'
import IconHelp from '@/components/icons/IconHelp.vue'
import IconRedo from '@/components/icons/IconRedo.vue'
import IconUndo from '@/components/icons/IconUndo.vue'
</script>

<template>
  <div class="flex justify-between p-3 bg-white border-b border-main sticky z-10">
    <div class="flex gap-2">
      <button class="w-8 h-8 base-button pr-0.5">
        <IconBack />
      </button>
      <button class="w-36 h-8 base-button text-gray-400 gap-2">
        <IconHelp /><span>Help</span>
      </button>
      <button class="w-8 h-8 base-button pb-0.5">
        <IconUndo />
      </button>
      <button class="w-8 h-8 base-button pb-0.5">
        <IconRedo />
      </button>
    </div>

    <div class="flex">
      <button class="px-4 py-2">Design</button>
      <button class="px-4 py-2 text-gray-400">Trigger</button>
      <button class="px-4 py-2 text-gray-400">Complete</button>
    </div>
    <div class="flex gap-2">
      <button class="px-4 py-2 text-gray-950 border border-gray-950 rounded-md">Preview</button>
      <button class="px-4 py-2 text-white bg-gray-950 border border-transparent rounded-md">
        Publish
      </button>
    </div>
  </div>
</template>
