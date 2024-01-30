<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";


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

const statuses = [
  { value: "request_sent", label: "Request sent" },
  { value: "confirmed", label: "Confirmed" },
  { value: "pickup_confirmed", label: "Pickup Confirmed" },
  { value: "has_incident", label: "Has Incident" },
  { value: "no_incident", label: "No Incident" },
  { value: "wr_weighting", label: "WR Weighting" },
  { value: "is_weighted", label: "Is Weighted" },
  { value: "wr_cancel", label: "WR Cancel" },
  { value: "wp_cancel", label: "WP Cancel"},
  { value: "pickup_fail_wr_fault", label: "Pickup fail Wr fault"},
  { value: "pickup_fail_wp_fault", label: "Pickup fail Wp fault"}
];

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
      class="btn-secondary gap-1.5 px-2 py-1 h-full text-sm"
      :class="open ? '!border-[#373FEF]' : '!hover:text-secondary'"
    >
      <div
        i="ph-funnel-duotone"
        class="text-[#40403F]"
      />
      <div class="flex items-center gap-1 text-[#262626]">
        <p class="font-semibold">
          {{ `Filters : ${data.status.length} :` }}
        </p>
        <p>
          {{ data.status.length === 0 ? 'All' : data.status.length  }}
        </p>
      </div>
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
          <div class="flex flex-col py-2">
            <template v-for="status in statuses" :key="status.value">
              
              <input
                :value="isStatusFiltered(status.value)"
                :label='`collect.status_${status.value}`'
                type="checkbox"
                decorator-icon="ph-check-bold"
                @click="addStatusToFilteredStatuses(status.value)"
              />
          </template>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>