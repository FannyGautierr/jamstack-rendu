<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
const { find, findOne, create, update, delete: remove } = useStrapi();


const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const data = reactive({
  status: [] as string[],
});


const isStatusFiltered  = computed(() => {
  return (status: string) => {
    return data.status.includes(status);
  };
});
const tags = await find('tags')

const statuses = computed(()=>{
  return tags.data.map((item)=>{
    return {
      value: item.tag,
      label: `#${item.tag}`
    }
  })

})
console.log(statuses.value)

// const statuses = [
//   { value: "request_sent", label: "Request sent" },
//   { value: "confirmed", label: "Confirmed" },
//   { value: "pickup_confirmed", label: "Pickup Confirmed" },
// ];

const emit = defineEmits<{
  "update:model-value": [value: string];
}>();

function updateModelValue() {
  emit("update:model-value", data.status);
}

function addStatusToFilteredStatuses(status: string) {
  if (data.status.includes(status)) {
    data.status = data.status.filter((s) => s !== status);
    updateModelValue();
    return;
  }
  data.status.push(status);
  updateModelValue();
}

onMounted(() => {
  data.status = props.modelValue
});

</script>

<template>
  <Popover v-slot="{ open }" class="relative flex-shrink-0">
    <PopoverButton
      class="btn-secondary gap-1.5 px-2 py-1 h-full text-sm outline-none"
      :class="open ? '!border-[#373FEF]' : '!hover:text-secondary'"
    >
    <Icon name="mdi:funnel" color="black" />
     
        <p class="font-semibold">
          {{ `Filters : ` }}
        </p>
        <p>
          {{ data.status.length === 0 ? 'All' : data.status.length  }}
        </p>

    </PopoverButton>
  
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <PopoverPanel class="absolute top-9 z-10 flex left-0 w-screen max-w-50">
        <div
          class="w-50 flex-auto overflow-hidden rounded bg-white text-sm leading-2 ring-1 ring-gray-900/5 px-3 py-1"
          style="box-shadow: 0 2px 6px 2px rgba(60, 64, 67, 0.15)"
        >
          <div class="flex flex-col py-2 gap-2">
            <template v-for="status in statuses" :key="status.value">
              
              <FormKit
                :value="isStatusFiltered(status.value)"
                :label='`${status.value}`'
                wrapper-class='flex gap-3 items-center'
                type="checkbox"
                @click="addStatusToFilteredStatuses(status.value)"
              />
          </template>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>