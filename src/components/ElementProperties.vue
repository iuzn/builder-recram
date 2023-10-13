<script setup lang="ts">
import { ref } from 'vue'
import { useElementsStore } from '@/stores/elements'

const store = useElementsStore()
const selectedElement = ref(store.selectedElement) as any

const updateProperties = (key: string, value: any) => {
  if (selectedElement.value) {
    selectedElement.value.defaultProperties[key] = value
  }
}
</script>
<template>
  <div v-if="selectedElement.value">
    <h2>{{ selectedElement.value.type }} Properties</h2>

    <!-- Text Properties -->
    <div v-if="selectedElement.type === 'Text'">
      <label>
        Value:
        <textarea
          :value="selectedElement.defaultProperties.value"
          @input="updateProperties('value', ($event.target as HTMLInputElement)?.value)"
        ></textarea>
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
    <div v-else-if="selectedElement.value.type === 'Button'">
      <label>
        Text:
        <input
          :value="selectedElement.value.defaultProperties.text"
          @input="updateProperties('text', ($event.target as HTMLInputElement)?.value)"
        />
      </label>
      <label>
        Action:
        <select
          :value="selectedElement.value.defaultProperties.action"
          @input="updateProperties('action', ($event.target as HTMLInputElement)?.value)"
        >
          <option>None</option>
          <option>Redirect to Next Page</option>
        </select>
      </label>
    </div>

    <!-- Input Properties -->
    <div v-else-if="selectedElement.value.type === 'Input'">
      <label>
        Placeholder:
        <input
          :value="selectedElement.value.defaultProperties.placeholder"
          @input="updateProperties('placeholder', ($event.target as HTMLInputElement)?.value)"
        />
      </label>
    </div>

    <!-- Block Properties -->
    <div v-else-if="selectedElement.value.type === 'Block'">
      <label>
        Inner Padding:
        <input
          type="number"
          :value="parseInt(selectedElement.value.defaultProperties.Padding)"
          @input="
            updateProperties('innerPadding', `${($event.target as HTMLInputElement)?.value}px`)
          "
        />
      </label>
      <label>
        Outer Margin:
        <input
          type="number"
          :value="parseInt(selectedElement.value.defaultProperties.Margin)"
          @input="
            updateProperties('outerMargin', `${($event.target as HTMLInputElement)?.value}px`)
          "
        />
      </label>
    </div>
  </div>
</template>
