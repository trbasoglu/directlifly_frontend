<template>
  <UContainer class="py-8">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Ülke Listesi
          </h2>
          <UBadge color="primary" variant="soft">
            {{ filteredRows.length }} Kayıt
          </UBadge>
        </div>
      </template>

      <div class="mb-4">
        <UInput 
          v-model="search" 
          icon="i-heroicons-magnifying-glass" 
          placeholder="Ülke veya kod ara..." 
          class="max-w-xs"
          size="sm"
        />
      </div>
<ClientOnly>

      <UTable 
        :data="filteredRows" 
        :columns="columns" 
        :loading="pending"
        class="w-full"
      >
        <template #empty-state>
          <div class="flex flex-col items-center justify-center py-6 gap-3">
            <span class="italic text-sm text-gray-500">Veri bulunamadı.</span>
          </div>
        </template>
      </UTable>
</ClientOnly>

    </UCard>
  </UContainer>
</template>

<script setup>
// Ensure the user is an admin
// definePageMeta({
//   middleware: 'admin-only'
// })

const client = useSupabaseClient()
const search = ref('')

// Define columns with unique IDs to satisfy Nuxt UI requirements
const columns = [
  { id: 'id', accessorKey: 'id', header: 'ID', sortable: true },
  { id: 'name', accessorKey: 'name', header: 'Ülke Adı', sortable: true },
  { id: 'iso_code', accessorKey: 'iso_code', header: 'ISO Kodu', sortable: true }
]

// Fetching data with a unique key 'countrylist'
const { data: countries, pending } = await useAsyncData('countrylist', async () => {
  const { data, error } = await client
    .from('country')
    .select('id, name, iso_code')
    .order('name', { ascending: true })

  if (error) {
    console.error('Supabase Error:', error.message)
    return []
  }
  return data || []
})

// Reactive Filtering Logic
const filteredRows = computed(() => {
  // Always check if .value exists because useAsyncData is a Ref
  const list = countries.value || []
  if (!search.value) return list
  
  const query = search.value.toLowerCase()

  return list.filter((row) => {
    return (
      String(row.name || '').toLowerCase().includes(query) ||
      String(row.iso_code || '').toLowerCase().includes(query)
    )
  })
})
</script>