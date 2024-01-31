<script lang="ts" setup>
import FilterPopOver from "~/components/FilterPopOver.vue";
import {onMounted, computed, watch} from "vue";
import fuse from "fuse.js";


const { find, findOne, create, update, delete: remove } = useStrapi();
const client = useStrapiClient();
const search = useSearchStore()

const state = reactive({
  recipes: [],
  tags: [],
  filters:[],
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

onMounted(() => {
  loadData()
})
</script>

<template>

  <div class="bg-neutral-50 h-screen" >
    <div class="flex flex-col items-center gap-y-4">
      <div class="flex flex-col gap-4">
        <!-- <NuxtLink to="/start">
          Documentation
        </NuxtLink>
        <NuxtLink to="/exemple-recherche">
          Exemple de recherche
        </NuxtLink> -->
    
        
         <!-- Serch bar -->
         <!-- <div class="form-group flex flex-col gap-2" role="search">
          <label for="search">Chercher une recette :</label>
          <input
            id="search" v-model="search.query"
            class="px-4 py-2 border-2 rounded-lg border-gray-500 drop-shadow-none"
            type="search"
          >
        </div> -->



        <template v-if="!state.loading">

          <div class="flex flex-row items-center gap-4">
          <h1 class="text-2xl font-bold">All recipes</h1>
          <FilterPopOver  
            v-model="state.filters"
            class="h-8 border-none"
          />
      </div>
          <button @click="state.modalIsOpen = !state.modalIsOpen" class="btn-primary w-fit !border-none m-auto outline-none decoration-none">New recipe +</button>
          <div class="grid grid-cols-3 gap-4">
         
              <div v-for="recipe in services" class=" p-4 flex flex-col border border-zinc-200 bg-white rounded-lg">
                <NuxtLink :to="`/recipes/${recipe.slug}`" class="no-underline text-base font-normal text-black">
                  <div>
                    <div v-if="recipe.images" v-for="recipeImage in recipe.images " >
                      <img :alt="recipeImage.name" :src="recipeImage.url" class="h-20 w-20"/>
                    </div>
                  </div>
                <p class="text-2xl text-bold">{{ recipe.title }}</p>

             

                <p class="text-xl">{{ recipe.content }}</p>
                <div v-for="tag in recipe.tags">
                  {{ tag.tag }}
                  <!-- <Tag :tags="tag.tag" /> -->
                </div>
                </NuxtLink> 
              </div>
          
          </div>
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


  </div>
</template>
