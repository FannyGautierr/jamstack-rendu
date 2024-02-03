<script lang="ts" setup>
import FilterPopOver from "~/components/FilterPopOver.vue";
import {onMounted, computed, watch} from "vue";
import { useMarkdown } from '@/composables/useMarkdown'; 
import Fuse from "fuse.js";



const { find, findOne, create, update, delete: remove } = useStrapi();
const client = useStrapiClient();
const { parse } = useMarkdown();


const state = reactive({
  recipes: [],
  tags: [],
  filters:[],
  searchResults: [],
  search:'',
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

let fuse; 

async function loadData(){
  state.loading = true

  const recipes = await find('recipes',{populate:'*'})
  const tags = await find('tags')

  state.recipes = recipes.data || []
  state.tags = tags.data || []
  state.loading = false
}


function previewFile(e: any) {
  const file = e.target.files[0];
  state.file = file
  if (file) {
    const file =  URL.createObjectURL(e.target.files[0]);
    state.blob = file
  }
}
async function createRecipe(){
  state.recipe.slug = state.recipe.title.toLowerCase().replace(/ /g, '-')
  const formData = new FormData()
    formData.append('files.images', state.file)
    formData.append('data', JSON.stringify(state.recipe))
    try{
      const { data } = await client(`/recipes`, {
      method: 'POST',
      body: formData
    })
    console.log(data)
    // data.images.url = state.blob
    state.recipes.push(data)

    }catch(e){
      console.error(e)
    }
  
  state.modalIsOpen = false
}


const services = computed(() => {
  if (state.filters.length === 0) return state.recipes;
  return state.recipes.filter(service => {
    return service.tags.some(tag => {
      console.log(tag);
      const isIncluded = state.filters.includes(tag.tag);
      return isIncluded;
    });
  });
});

watch(() => services.value, (newRecipes) => {
  fuse = new Fuse(newRecipes, {
    keys: ['title'],
    includeScore: false,
  });
}, {
  immediate: true,
});

const filteredRecipes = computed(() => {
  if (!state.search.trim()) return services.value;

  return fuse.search(state.search).map(result => result.item);
});

onMounted(() => {
  loadData()
})
</script>

<template>


    <div class="flex flex-col items-center gap-y-4 w-full">
      <div class="flex flex-col gap-4 w-full items-start">      
        <div class="flex flex-row items-center gap-4">
          <h1 class="text-2xl font-bold">All recipes</h1>
          <FilterPopOver  
            v-model="state.filters"
            class="h-8 border-none"
          />
        </div>
        <div class="flex flex-col gap-2 w-full" role="search">
          <label for="search" class="text-zinc-800 italic  underline">Search for a recipe:</label>
          <input
            id="search"
            v-model="state.search"
            class="px-4 py-2 border-2 rounded border border-solid border-zinc-300 outline-none shadow-none w-full"
            type="search"
            placeholder="Enter search term..."
          />
        </div>
        <button @click="state.modalIsOpen = !state.modalIsOpen" class="btn-primary w-fit !border-none m-auto outline-none decoration-none">New recipe +</button>
        <template v-if="!state.loading">
            <!-- <div class="grid grid-cols-3 gap-4 w-full"> -->
              <transition-group name="recipe-transition" tag="div" class="grid grid-cols-3 gap-4 w-full">
                <div v-for="recipe in filteredRecipes" class=" p-4 flex flex-col border border-zinc-200 bg-white rounded-lg gap-2">
                  <NuxtLink :to="`/recipes/${recipe.slug}`" class="no-underline text-base font-normal flex flex-col gap-2 text-black">
                    <div class="h-[50%] w-fit">
                      <div v-if="recipe.images" v-for="recipeImage in recipe.images " >
                        <img :alt="recipeImage.name" :src="recipeImage.url" class="h-50 w-100 object-cover rounded"/>
                      </div>
                    </div>
                    <p class="text-black text-3xl font-bold whitespace-nowrap">{{ recipe.title }}</p>
              
                  <!-- <div v-html="parse(recipe.content)" class="markdown-content"></div> -->
                    <div class="flex items-center gap-2">
                      <div v-for="tag in recipe.tags" >
                        <Tag :tag="tag.tag" />
                      </div>
                    </div>
                  </NuxtLink> 
                </div>
              </transition-group>
            <!-- </div> -->
        </template>
      </div>
    </div>

    <div v-if="state.modalIsOpen" class="flex gap-5 flex-col absolute top-20 w-50% m-auto left-25%  shadow-lg">
      <div class="flex flex-col items-start bg-white p-5 rounded-lg ">
        <div class="bg-red-200 rounded p-1 w-fit h-fit ">
          <div class="text-red-700" @click="state.modalIsOpen = !state.modalIsOpen">X</div>
        </div>
        <p class="text-2xl font-bold text-center m-auto mb-5">Add a new recipe</p>
        <div class="flex justify-between items-center w-full">
      </div>
        <div class="flex flex-col m-auto gap-5">
          <div class="flex flex-col items-start gap-1">
          <label for="title" class="font-normal text-sm text-zinc-800">Title</label>
          <FormKit v-model="state.recipe.title" placeholder="title"  class="w-full" type="text"/>
        </div>
        <div class="flex flex-col items-start gap-1">
          <label for="title" class="font-normal text-sm text-zinc-800">Content</label>
          <FormKit v-model="state.recipe.content" placeholder="content"  class="w-full" type="text"/>
        </div>
        <div class="flex flex-col items-start gap-1">
          <label for="title" class="font-normal text-sm text-zinc-800">Tag</label>
          <select v-model="state.recipe.tags"  class="w-full">
            <option disabled value="">Choisissez</option>
            <option v-for="tag in state.tags" :key="tag.id" :value="tag.id">{{tag.tag}}</option>
          </select>
        </div>

        <div class="flex flex-col items-start gap-1">
          <input type="file" @change="previewFile" class="w-full">
          <img v-if="state.blob" :src="state.blob" alt="" class="h-20 w-20"/>
        </div>
        <button class="btn-secondary  border border-black " @click="createRecipe">Create</button>
        </div>
      </div>
    </div>



</template>

<style scoped>
.recipe-transition-enter-active, .recipe-transition-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.recipe-transition-enter-from, .recipe-transition-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

</style>