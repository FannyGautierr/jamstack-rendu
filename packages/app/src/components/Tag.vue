<script setup lang="ts">

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
    :class="[props.tagClasses?.tag]"
    class="flex items-center gap-1 w-fit px-1.5 py-0.5 text-sm truncate rounded"
  >
  {{ props.tag }}
    <slot>
      <p :class="props.tagClasses?.label">
        {{ props.tag }}
      </p>
    </slot>
  </div>
</template>