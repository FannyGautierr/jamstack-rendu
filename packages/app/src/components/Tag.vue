<script setup lang="ts">
import { generateTagStyleFromString } from '~/controllers/colors'
/**
 * @tag : String
 * (The tag content to display, can be overriden by the slot content)
 *
 * @tagClasses : TagClasses
 * (The classes to apply to the tag)
 */
const props = defineProps({
  tag: {
    type: String,
    required: false,
    default: '',
  },
  tagClasses: {
    type: Object, 
    required: false,
    default: null,
  },
})
</script>

<template>

  <div
  :class="[generateTagStyleFromString(props.tag), props.tagClasses?.tag]"
  class="flex items-center gap-1 w-fit px-1.5 py-0.5 text-sm truncate rounded h-6"
>
  <slot>
    <p :class="props.tagClasses?.label" >
      {{ props.tag }}
    </p>
  </slot>
</div>
</template>