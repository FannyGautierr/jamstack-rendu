<script setup lang="ts">
import { useMarkdown } from '@/composables/useMarkdown'; 
import {onMounted} from "vue";

const { find, findOne, create, update, delete: remove } = useStrapi()

const { parse } = useMarkdown();

const route = useRoute()


const state = reactive({
  recipes: {},
  tags: [],
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

  const slug = route.params.slug

  const recipes = await findOne('recipes',slug,{populate:'*'})
  const tags = await find('tags')
  console.log(recipes)
  console.log(state.recipes)
  state.recipes = recipes.data 
console.log(state.recipes)
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
  <div v-if="!state.loading && Object.keys(state.recipes).length !== 0 " class="bg-neutral-100 h-screen">
    <div class=" p-4 flex flex-col border border-zinc-200 bg-white rounded-lg m-20">
      <div class="h-100 relative">
        <div v-for="recipeImage in state.recipes.images" :key="recipeImage.name" class="w-full h-auto">
          <img :alt="recipeImage.url " :src="recipeImage.url" class="absolute object-cover w-full h-100 "/>
        </div>
        <div class="absolute top-85 left-0 right-200 bottom-0 flex justify-center items-center">
          <p class="text-black text-3xl font-bold whitespace-nowrap">{{ state.recipes.title }}</p>
        </div>
        
      </div>
      <div class="flex items-center gap-2 mt-5">
        <div v-for="tag in state.recipes.tags" >
          <Tag :tag="tag.tag" />
        </div>
      </div>
      <div v-html="parse(state.recipes.content)" class="markdown-content"></div>
    </div>
</div>
<div v-else  class="flex items-center justify-center h-full text-5xl font-bold text-gray-700 ">Loading...</div>
</template>