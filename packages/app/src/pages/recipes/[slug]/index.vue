<script setup lang="ts">

import {onMounted} from "vue";
const { find, findOne, create, update, delete: remove } = useStrapi()


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
  
  state.recipes = recipes.data 
  state.tags = tags.data || []
  state.loading = false
}

onMounted(() => {
  loadData()
})
</script>
<template>
  <NuxtLink to="/">Back</NuxtLink>
  <div class="bg-neutral-50 h-screen">
  <div class=" p-4 flex flex-col border border-zinc-200 bg-white rounded-lg m-10">
    <p class="text-2xl text-bold">{{ state.recipes.title }}</p>
    <div v-for="recipeImage in state.recipes.images " >
      <img :alt="recipeImage.name" :src="recipeImage.url" class="h-20 w-20"/>
    </div>

    <p class="text-xl">{{ state.recipes.content }}</p>
    <div v-for="tag in state.recipes.tags">
      {{ tag.tag }}
      <!-- <Tag :tags="tag.tag" /> -->
    </div>
  </div>
</div>
</template>