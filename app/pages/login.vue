<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="flex flex-col items-center gap-2">
          <UIcon name="i-heroicons-lock-closed" class="w-8 h-8 text-primary-500" />
          <h1 class="text-2xl font-bold">Admin Girişi</h1>
          <p class="text-sm text-gray-500">Sadece yetkili erişim</p>
        </div>
      </template>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <UFormGroup label="E-posta" name="email">
          <UInput 
            v-model="email" 
            type="email" 
            placeholder="admin@example.com" 
            icon="i-heroicons-envelope" 
          />
        </UFormGroup>

        <UFormGroup label="Şifre" name="password">
          <UInput 
            v-model="password" 
            type="password" 
            placeholder="••••••••" 
            icon="i-heroicons-key" 
          />
        </UFormGroup>

        <UButton 
          type="submit" 
          block 
          :loading="loading" 
          color="primary"
          label="Giriş Yap"
        />
      </form>

      <UNotifications />
    </UCard>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const toast = useToast()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  if (!email.value || !password.value) return

  loading.value = true
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) throw error

    toast.add({ title: 'Giriş başarılı!', color: 'green' })
    
    // Girişten sonra direkt admin paneline yönlendir
    router.push('/panel')
  } catch (error) {
    toast.add({ 
      title: 'Hata', 
      description: error.message || 'Giriş yapılamadı', 
      color: 'red' 
    })
  } finally {
    loading.value = false
  }
}
</script>