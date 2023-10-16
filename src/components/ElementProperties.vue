<script setup lang="ts">
import { useElementsStore } from '@/stores/elements'
import { ref } from 'vue'

const store = useElementsStore()
const selectedElement = ref(store.selectedElement) as any
const updateProperties = (key: string, value: any) => {
  if (selectedElement.value) {
    selectedElement.defaultProperties[key] = value
  }
}
</script>
<template>
  <div id="element-properties">
    <div>Element Properties</div>
    <div>
      <h2>{{ selectedElement.type }} Properties</h2>

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
      <div v-else-if="selectedElement.type === 'Button'">
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
      <div v-else-if="selectedElement.type === 'Input'">
        <label>
          Placeholder:
          <input
            :value="selectedElement.defaultProperties.placeholder"
            @input="updateProperties('placeholder', ($event.target as HTMLInputElement)?.value)"
          />
        </label>
      </div>

      <!-- Block Properties -->
      <div v-else-if="selectedElement.type === 'Block'">
        <label>
          Inner Padding:
          <input
            type="number"
            :value="parseInt(selectedElement.defaultProperties.Padding)"
            @input="
              updateProperties('innerPadding', `${($event.target as HTMLInputElement)?.value}px`)
            "
          />
        </label>
        <label>
          Outer Margin:
          <input
            type="number"
            :value="parseInt(selectedElement.defaultProperties.Margin)"
            @input="
              updateProperties('outerMargin', `${($event.target as HTMLInputElement)?.value}px`)
            "
          />
        </label>
      </div>
    </div>
  </div>
</template>
