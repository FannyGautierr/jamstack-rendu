<script setup lang="ts">
import { useMarkdown } from '@/composables/useMarkdown'; 
import {onMounted} from "vue";

const { find, findOne, create, update, delete: remove } = useStrapi()

const { parse } = useMarkdown();

const route = useRoute()


const state = reactive({
  recipes: {} as any,
  tags: [] as any[],
  recipe: {
    title: '',
    content: '',
    tags: '',
    slug: '',
  },
  file: '',
  blob: '',
  loading: false,
  error: null,
  modalIsOpen: false
})

async function loadData(){
  state.loading = true

  const slug: any = route.params.slug
  const recipes = await findOne('recipes', slug, {populate:'*'})
  const tags = await find('tags')

  state.recipes = recipes.data 
  state.tags = tags.data || []

  state.loading = false
}

onMounted(() => {
  loadData()
})

</script>
<template>
  <NuxtLink to="/" class="flex items-center">
    <Icon name="uil:arrow-left" color="black" class="h-8 w-8 hover:text-green-500" />
    <p class=" decoration-none text-zinc-900 hover:text-green-500">Home page</p>
  </NuxtLink>
  <template v-if="!state.loading && Object.keys(state.recipes).length !== 0 " class="">
    <div class=" p-4 flex flex-col border border-zinc-200 bg-white rounded-lg m-20">
      <div class="h-100 relative">
        <div v-for="recipeImage in state.recipes.images" :key="recipeImage.name" class="w-full h-auto ">
          <img :alt="recipeImage.url " :src="recipeImage.url" class="absolute object-cover w-full h-100  "/>
        </div>
        <div class="absolute  flex justify-center items-center backdrop-blur-sm w-full h-full">
          <p class="text-white text-3xl font-bold whitespace-nowrap">{{ state.recipes.title }}</p>
        </div>
        
      </div>
      <div class="flex items-center gap-2 mt-5">
        <div v-for="tag in state.recipes.tags" >
          <Tag :tag="tag.tag" />
        </div>
      </div>
      <div v-html="parse(state.recipes.content)" class="markdown-content"></div>
    </div>
  </template>
  <div v-else  class="flex items-center justify-center h-full text-5xl font-bold text-gray-700 "> 
    <Icon name="uil:spinner" color="black" class="animate-spin"/>
  </div>
</template>